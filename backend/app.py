from flask import Flask, render_template, request, session
# from flask_wtf.csrf import CSRFProtect
# from flask_talisman import Talisman
from flask_session import Session

from groupchat_analyser.Groupchat import Groupchat
from utils import df_from_dict, nan_to_null


app = Flask(__name__, template_folder='../frontend/build', static_folder='../frontend/build/static')
app.secret_key = 'password'
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
app.config["SESSION_FILE_DIR"] = "backend/flask_session"
Session(app)

# csp = {
#     'default-src': ['\'self\'',
# 	'cdn.jsdelivr.net',
# 	'code.jquery.com'
# 	]
# }
# talisman = Talisman(app, content_security_policy=csp, force_https=False, session_cookie_secure=False)

# csrf = CSRFProtect(app)
# csrf.init_app(app)


@app.route('/')
def index():
	return render_template('index.html')


@app.route('/api/data_exists', methods=['GET'])
def api_data_exists():
    if 'df' in session and 'users' in session and 'name' in session and 'image' in session:
        return {"message": True}
    else:
        return {"message": False}


@app.route('/api/upload_data', methods=['POST'])
def api_upload_data():
    session.update(Groupchat(request.files).to_dict())
    return {"message": "data loaded"}


@app.route('/api/clear_data', methods=['GET'])
def api_clear_data():
    session.pop('df')
    session.pop('users')
    session.pop('name')
    session.pop('image')
    return {"message": "data cleared"}


@app.route('/api/print_df', methods=['GET'])
def api_print_df():
    print(df_from_dict(session['df']))
    return {"a": "a"}


@app.route('/api/general_stats', methods=['GET'])
def api_general_stats():
    g = Groupchat(session)
    return g.summary()


@app.route('/api/messages_over_time', methods=['GET'])
def api_messages_over_time():
    interval = request.args.get('interval')
    g = Groupchat(session)
    return g.messages_over_time(interval)


@app.route('/api/total_messages_users', methods=['GET'])
def api_total_messages_users():
    g = Groupchat(session)
    user_total_messages = g.user_total_messages().to_dict()
    return {"users": list(user_total_messages.keys()), "total_messages": list(user_total_messages.values())}


@app.route('/api/top_words', methods=['GET'])
def api_top_words():
    g = Groupchat(session)
    most_used_words = g.most_used_words(100)
    most_used_words_split = [{"text": word_pair[0], "value": word_pair[1]} for word_pair in most_used_words]
    return {"words": most_used_words_split}


@app.route('/api/nth_messages', methods=['GET'])
def api_nth_messages():
    start_message_index = int(request.args.get('start_message_index'))
    end_message_index = int(request.args.get('end_message_index'))
    g = Groupchat(session)
    nth_messages = g.nth_messages(start_message_index, end_message_index)
    nth_messages['datetime'] = nth_messages['datetime'].dt.strftime('%Y-%m-%dT%H:%M:%SZ')
    nth_messages['id'] = nth_messages.index
    nth_messages = nan_to_null(nth_messages)
    return {"messages": nth_messages.to_dict('records')}


# @app.route('/favicon.ico')
# def favicon():
#     return send_from_directory(app.static_folder, 'favicon.ico', as_attachment=True, mimetype='image/vnd.microsoft.icon') 


if __name__ == "__main__":
	app.run()
