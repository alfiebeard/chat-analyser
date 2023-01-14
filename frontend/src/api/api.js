export function checkConnection(){
    // Checks connection to backend is working
    fetch("api/check_connection")
        .then(response => response.json())
        .then(data => console.log(data));
}


export function checkDataExists(setDataLoaded){
    // Checks whether the data exists in the session memory at the backend.
    fetch("api/data_exists")
        .then(response => response.json())
        .then((data) => {if (data["message"]) {setDataLoaded(true);} else {setDataLoaded(false);}})
        .catch(() => setDataLoaded(false))
}


export function fetchGeneralStatistics(setData, setError){
    // Fetch the general statistics for a chat
    fetch("api/general_stats")
        .then(response => response.json())
        .then((data) => {setData(data)})
        .catch(() => {setError(true)});
}


export function fetchMessagesOverTime(setData, setError, time, split_by_users=false){
    // TODO: Explain this!
    // Fetch the messages over time
    let params = new URLSearchParams({"interval": time, "split_by_users": split_by_users}).toString();
    fetch("api/messages_over_time?" + params)
        .then(response => response.json())
        .then((data) => {setData(data)})
        .catch(() => {setError(true)});
}


export function fetchMessagesByTime(setData, setError, time, split_by_users=false){
    // TODO: Explain this!
    // Fetch the messages by time
    let params = new URLSearchParams({"interval": time, "split_by_users": split_by_users}).toString();
    fetch("api/messages_by_period?" + params)
        .then(response => response.json())
        .then((data) => {setData(data)})
        .catch(() => {setError(true)});
}


export function fetchTotalMessagesUsers(setData, setError){
    // TODO: Explain this!
    fetch("api/total_messages_users")
        .then(response => response.json())
        .then((data) => {setData(data)})
        .catch(() => setError(true));
}

export function fetchTopWords(setData, setError){
    // TODO: Explain this!
    fetch("api/top_words")
        .then(response => response.json())
        .then((data) => {setData(data["words"])})
        .catch(() => {setError(true)});
}

export function fetchNthMessages(setData, setError, start_message_index, end_message_index){
    // TODO: Explain this!
    let params = new URLSearchParams({"start_message_index": start_message_index, "end_message_index": end_message_index}).toString();
    fetch("api/nth_messages?" + params)
        .then(response => response.json())
        .then((data) => {setData(data["messages"])})
        .catch(() => {setError(true)});
}


export function clearData(setDataLoaded){
    // Clears the data from the session memory at the backend.
    fetch("api/clear_data")
        .then(response => response.json())
        .then(() => {setDataLoaded(false)});
}