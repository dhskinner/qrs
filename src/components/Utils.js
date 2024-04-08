// helper to fix negative or multiples of angles
function ClampAngle(angle, min = 0, max = 360, span = 360) {
    while (angle < min) {
        angle += span;
    }
    while (angle > max) {
        angle -= span;
    }
    return angle;
}

function PositionToString(lat, lon) {
    return LatToString(lat) + " " + LonToString(lon);
}

// 'value' is decimal degrees e.g. -27.56789
// 'digits' is the number of digits to display for minutes (including the dot)
function DegreesToDecimalString(value, digits) {

    var str;
    var mins = 0;
    var deg = 0;

    mins = (Math.abs(value % 1) * 60);
    if (digits === 0) {
        // display degrees only
        deg = Math.round(Math.abs(value));
        str = `${deg.toFixed(0)}\u00B0`;
    } else {
        // display n digits for mins
        deg = Math.floor(Math.abs(value));
        digits = digits <= 3 ? 0 : digits - 3;
        mins = RoundToPrecision(mins, digits)
        if (mins === 60) {
            deg += 1;
            mins = 0;
        }
        str = mins.toFixed(digits);

        // mins are always 2 digit numbers
        if (str.length < 2 || (digits > 0 && str.substr(2, 1) !== ".")) str = "0" + str;
        str = `${deg.toFixed(0)}\u00B0` + str;
    }
    //console.log(`val: ${value} deg: ${deg} min: ${mins} str: ${str}`);
    return str;
}

function LatToString(lat, digits = 6) {
    lat = ClampAngle(lat, -90, 90, 180);
    return DegreesToDecimalString(lat, digits) + (lat >= 0 ? "N" : "S");
}

function LonToString(lon, digits = 6) {
    lon = ClampAngle(lon, -180, 180, 360);
    return DegreesToDecimalString(lon, digits) + (lon >= 0 ? "E" : "W");
}

// round a value to a specified precision 
function RoundToPrecision(value, precision) {
    return parseFloat(value.toFixed(precision));
}

export { PositionToString, LatToString, LonToString, ClampAngle }