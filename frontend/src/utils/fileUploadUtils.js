export function sendFiles(all_files, setDataLoaded){
    const message_files = extractMessageFiles(all_files);
    postFiles(message_files, setDataLoaded);
}

function extractMessageFiles(all_files){
    return all_files.filter(filterOnlyMessageFiles);
}

function filterOnlyMessageFiles(file) {
    return (file.name.substr(0, 7) === "message" && file.name.substr(-5) === ".json");
}

function postFiles(files, setDataLoaded){
    var formData = new FormData();

    for (var i = 0; i < files.length; i++){
        formData.append(files[i].name, files[i]);
    }

    fetch('/api/upload_data', {
        method: 'POST',
        body: formData,
      }
    )
    .then(response => response.json())
    .then(() => {setDataLoaded(true)});
}