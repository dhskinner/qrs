import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";

const StyleBlue = { fillColor: "blue" };

const StyleGray = {
  stroke: true,
  color: "white",
  weight: 2,
  opacity: 0.8,
  fill: true,
  fillColor: "white",
  fillOpacity: 0.2,
};

const StyleBlack = { color: "black" };

const StyleLime = { color: "lime" };

const StylePurple = { color: "purple" };

const StyleRed = { color: "red" };

const StyleTbc = {
  color: "yellow",
  weight: 2,
  opacity: 0.8,
  fill: false,
};

const StyleWhite = {
  stroke: true,
  color: "white",
  weight: 2,
  opacity: 0.5,
  fill: false,
};

const StyleAirspace = {
  stroke: false,
  color: "red",
  weight: 2,
  opacity: 0.8,
  fill: true,
  fillColor: "red",
  fillOpacity: 0.05,
  fillRule: "nonzero",
};

const StyleCTZ = {
  stroke: true,
  color: "blue",
  weight: 2,
  opacity: 0.8,
  fill: false,
  fillColor: "blue",
  fillOpacity: 0.05,
  fillRule: "nonzero",
};

export function PositionLabel(latlon) {
  const p1 = new LatLon(latlon[0], latlon[1]);
  return p1.toString("dm");
}

export function RoundTo(num, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(num * factor) / factor;
}

export function NumberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function GetStyle(name) {
  switch (name) {
    case "blue":
      return StyleBlue;
    case "gray":
      return StyleGray;
    case "white":
      return StyleWhite;
    case "black":
      return StyleBlack;
    case "lime":
      return StyleLime;
    case "purple":
      return StylePurple;
    case "red":
      return StyleRed;
    case "marker":
      return StyleLime;
    case "airspace":
      return StyleAirspace;
    case "ctz":
      return StyleCTZ;
    case "airspace_buffer":
      return GetDashedStyle("airspace");
    case "tbc":
      return StyleTbc;
    default:
      return StyleGray;
  }
}

export function GetDashedStyle(name) {
  const base = GetStyle(name);
  return {
    stroke: true,
    color: base.color,
    weight: base.weight,
    opacity: base.opacity,
    fill: false,
    dashArray: "2 8",
  };
}

// https://www.tripoli.org/content.aspx?page_id=22&club_id=795696&module_id=520420  clause 13-16
export function SafetyRange(feet) {
  let metres = FeetToMetres(feet) * 0.25;
  return metres > 457 ? metres : 457;
}

export const FeetToMetres = (val) => {
  return val * 0.3048;
};

export const MetresToFeet = (val) => {
  return val * 3.28084;
};

export const NmToMetres = (val) => {
  return val * 1852;
};

export const AltitudeFeetToAirspaceNm = (val) => {
  // convert feet to nm
  let nm = val / 6076;

  // round to nearest half mile
  return Math.floor(nm * 2) / 2;
};

export const AirspaceNm = (altitude, nm) => {
  if (nm == null) {
    return AltitudeFeetToAirspaceNm(altitude);
  } else {
    return nm;
  }
};

export const NmToFeet = (val) => {
  return val * 6076;
};

export const DecimalCoordinates = (val) => {
  var out = [DecimalDegrees(val[1]), DecimalDegrees(val[0])];
  return out;
};

export const DecimalLatLon = (val) => {
  var out = [DecimalDegrees(val[0]), DecimalDegrees(val[1])];
  return out;
};

// must be in a format of ddmmss[S/E]
export const DecimalDegrees = (val) => {
  let index = 0;
  let dd = 0;

  const hh = val.substring(val.length - 1, val.length);
  if (hh == "E" || hh == "W") {
    dd = parseInt(val.substring(index, index + 3));
    index += 3;
  } else {
    dd = parseInt(val.substring(index, index + 2));
    index += 2;
  }

  let mm = parseInt(val.substring(index, index + 2));
  index += 2;
  let ss = parseInt(val.substring(index, index + 2));

  let result = dd + mm / 60 + ss / (60 * 60);
  if (hh == "S" || hh == "W") {
    result = result * -1;
  }
  // console.log("input: ", val, " output: ", result);
  return result;
};

// helper to fix negative or multiples of angles
export function ClampAngle(angle, min = 0, max = 360, span = 360) {
  while (angle < min) {
    angle += span;
  }
  while (angle > max) {
    angle -= span;
  }
  return angle;
}

export function PositionToString(lat, lon) {
  return LatToString(lat) + " " + LonToString(lon);
}

// 'value' is decimal degrees e.g. -27.56789
// 'digits' is the number of digits to display for minutes (including the dot)
export function DegreesToDecimalString(value, digits) {
  var str;
  var mins = 0;
  var deg = 0;

  mins = Math.abs(value % 1) * 60;
  if (digits === 0) {
    // display degrees only
    deg = Math.round(Math.abs(value));
    str = `${deg.toFixed(0)}\u00B0`;
  } else {
    // display n digits for mins
    deg = Math.floor(Math.abs(value));
    digits = digits <= 3 ? 0 : digits - 3;
    mins = RoundToPrecision(mins, digits);
    if (mins === 60) {
      deg += 1;
      mins = 0;
    }
    str = mins.toFixed(digits);

    // mins are always 2 digit numbers
    if (str.length < 2 || (digits > 0 && str.substr(2, 1) !== "."))
      str = "0" + str;
    str = `${deg.toFixed(0)}\u00B0` + str;
  }
  //console.log(`val: ${value} deg: ${deg} min: ${mins} str: ${str}`);
  return str;
}

export function LatToString(lat, digits = 6) {
  lat = ClampAngle(lat, -90, 90, 180);
  return DegreesToDecimalString(lat, digits) + (lat >= 0 ? "N" : "S");
}

export function LonToString(lon, digits = 6) {
  lon = ClampAngle(lon, -180, 180, 360);
  return DegreesToDecimalString(lon, digits) + (lon >= 0 ? "E" : "W");
}

// round a value to a specified precision
export function RoundToPrecision(value, precision) {
  return parseFloat(value.toFixed(precision));
}
