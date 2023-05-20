export function addTimes(time1: string, time2: string) {
    const minutes = timeToMins(time1) + timeToMins(time2);
    const hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;

    // Add leading zero if minutes are less than 10
    if (remainingMinutes < 10) {
        remainingMinutes = 0 + remainingMinutes;
    }

    return hours + ":" + remainingMinutes;
}

// Convert a time in hh:mm format to minutes
export function timeToMins(time: string) {
    const b = time.split(":");
    return +b[0] * 60 + +b[1];
}
