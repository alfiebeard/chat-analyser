export function formatSeconds(seconds){
    // In seconds
    if (seconds < 60){
        return Math.round(seconds) + " seconds";
    }
    // In minutes
    else if (seconds < 3600){
        return Math.round(seconds / 60) + " minutes";
    }
    else if (seconds < 86400){
        return Math.round(seconds / 3600) + " hours";
    }
    else {
        return Math.round(seconds / 86400) + " days";
    }
}