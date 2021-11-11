class millzLib
{
    static julianDate()
    {
        //Orignal function by Suprotim Agarwal, founder and contributor
        //for DevCurry, DotNetCurry and SQLServerCurry.
        var timeStamp = new Date().setFullYear(new Date().getFullYear(), 0, 2);
        var yearFirstDay = Math.floor(timeStamp / 86400000);
        var today = Math.ceil( ( new Date().getTime() ) / 86400000);
        var year = new Date().getFullYear().toString().substr(-2);
        var day = today - yearFirstDay;
        return year + day.toString();
    }
}

module.exports = millzLib;