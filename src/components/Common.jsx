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
  color: "orange",
  weight: 2,
  opacity: 0.8,
  fill: true,
  fillColor: "orange",
  fillOpacity: 0.2,
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
  return metres > 475 ? metres : 475;
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
