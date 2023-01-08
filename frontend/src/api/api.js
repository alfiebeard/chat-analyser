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
        .then((data) => {if (data["message"]) {setDataLoaded(true);} else {setDataLoaded(false);}});
}


export function fetchGeneralStatistics(){
    // Fetch the general statistics for a chat
    fetch("api/general_stats")
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function fetchMessagesOverTime(time, split_by_users=false){
    // TODO: Explain this!
    // Fetch the messages over time
    let params = new URLSearchParams({"interval": time, "split_by_users": split_by_users}).toString();
    fetch("api/messages_over_time?" + params)
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function fetchTotalMessagesUsers(){
    // TODO: Explain this!
    fetch("api/total_messages_users")
        .then(response => response.json())
        .then((data) => {console.log(data)});
}

export function fetchTopWords(){
    // TODO: Explain this!
    fetch("api/top_words")
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function fetchNthMessages(start_message_index, end_message_index){
    // TODO: Explain this!
    let params = new URLSearchParams({"start_message_index": start_message_index, "end_message_index": end_message_index}).toString();
    fetch("api/nth_messages?" + params)
        .then(response => response.json())
        .then((data) => {console.log(data)});
}


export function clearData(setDataLoaded){
    // Clears the data from the session memory at the backend.
    fetch("api/clear_data")
        .then(response => response.json())
        .then(() => {setDataLoaded(false)});
}