import React from "react";
import Flags from "country-flag-icons/react/3x2";
import { hasFlag } from "country-flag-icons";

interface Props {
  style?: React.CSSProperties;
  className?: React.HtmlHTMLAttributes<any>["className"];
  iso2: string;
}
const CountryFlag: React.FC<Props> = ({ iso2, style, className }) => {
  // @ts-ignore
  const Flag = hasFlag(iso2) ? Flags[iso2] : null;
  if (!Flag) return null;
  return <Flag style={style} className={`${className || ""} border rounded`} />;
};

export default CountryFlag;
