const StyleBlue = { fillColor: "blue" };
const StyleBlack = { color: "black" };
const StyleLime = { color: "lime" };
const StylePurple = { color: "purple" };
const StyleRed = { color: "red" };
const StyleAirspace = {
  stroke: false,
  color: "orange",
  weight: 2,
  opacity: 0.6,
  fill: true,
  fillColor: "orange",
  fillOpacity: 0.2,
  fillRule: "nonzero",
};
const StyleBuffer = {
  color: "orange",
  weight: 2,
  opacity: 0.86,
  fill: false,
  dashArray: "2 8",
};

export function GetStyle(name) {
  switch (name) {
    case "blue":
      return StyleBlue;
    case "black":
      return StyleBlack;
    case "lime":
      return StyleLime;
    case "purple":
      return StylePurple;
    case "red":
      return StyleRed;
    case "airspace":
      return StyleAirspace;
    case "buffer":
      return StyleBuffer;
    default:
      return StyleBlue;
  }
}

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
