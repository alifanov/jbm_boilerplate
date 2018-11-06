import color from "color";

const primaryBlue = "#374A67";
const primaryWhite = "#eee";

const lineColor = color(primaryBlue).lighten(0.8);
const secondaryBlue = color(primaryBlue).darken(0.2);
const underlaySecondaryBlue = color(primaryBlue).lighten(0.2);

const inactiveTabColor = color(primaryBlue).lighten(0.9);
const activeTabColor = color(primaryWhite);

export {
  inactiveTabColor,
  activeTabColor,
  primaryBlue,
  lineColor,
  secondaryBlue,
  underlaySecondaryBlue,
  primaryWhite
};
