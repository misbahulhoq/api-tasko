"use strict";
// This utility function is used to generate formatted date for taskServices.
Object.defineProperty(exports, "__esModule", { value: true });
exports.daySummary = daySummary;
function daySummary(startDate, endDate) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    const daysRemaining = endDate.getDate() - new Date().getDate();
    const startMonth = months[startDate.getMonth()];
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const endMonth = months[endDate.getMonth()];
    let daySummary;
    if (startMonth === endMonth) {
        daySummary = `${startMonth} ${startDay} - ${endDay}`;
    }
    else {
        daySummary = `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    }
    return { daysRemaining, daySummary };
}
