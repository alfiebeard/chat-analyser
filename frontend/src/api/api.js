export function getNames(){
    fetch("api/print_df")
        .then(response => response.json())
        .then(data => console.log(data));
}


export function dataExists(setDataLoaded){
    fetch("api/data_exists")
        .then(response => response.json())
        .then((data) => {if (data["message"]) {setDataLoaded(true);} else {setDataLoaded(false);}});
}


export function fetchGeneralStatistics(){
    fetch("api/general_stats")
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function fetchMessagesOverTime(time){
    let params = new URLSearchParams({"interval": time}).toString();
    fetch("api/messages_over_time?" + params)
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function fetchTotalMessagesUsers(){
    fetch("api/total_messages_users")
        .then(response => response.json())
        .then((data) => {console.log(data)});
}

export function fetchTopWords(){
    fetch("api/top_words")
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function fetchNthMessages(start_message_index, end_message_index){
    let params = new URLSearchParams({"start_message_index": start_message_index, "end_message_index": end_message_index}).toString();
    fetch("api/nth_messages?" + params)
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function clearData(setDataLoaded){
    fetch("api/clear_data")
        .then(response => response.json())
        .then(() => {setDataLoaded(false)});
}