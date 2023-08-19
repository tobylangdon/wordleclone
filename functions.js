function BornOnDay(DOB) {
    const MonthOffset = [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
    //Decade offset starting from 1900 - 2010
    const YearOffset = [1, 6, 5, 3, 2, 0, 6, 4, 3, 1, 0, 5];
    //Leap year offset
    const LeapYearOffset = {
        0: [0, 0, 0, 0, 1, 1, 1, 1, 2, 2],
        1: [0, 0, 1, 1, 1, 1, 2, 2, 2, 2],
    };

    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    const birthday = DOB.split("/");

    let countingNum = parseInt(birthday[0]);

    countingNum += MonthOffset[Number(birthday[1]) - 1];

    let decade = YearOffset[parseInt(birthday[2].toString()[2])];

    decade = YearOffset[parseInt((birthday[2] % 190) / 10)];
    console.log("decade", decade);

    countingNum = countingNum + decade + 2; //Why 2? Just cause that's what you do apparently

    let leapYearEvenOrOdd = birthday[2] % 2;

    let LeapYearNum = LeapYearOffset[leapYearEvenOrOdd.toString()][decade];

    countingNum += LeapYearNum;
    console.log(countingNum);
    console.log((2020 % 190) / 10);

    return daysOfWeek[countingNum % 7];
}

console.log(BornOnDay("31/12/2000"));
