import moment from "moment-timezone";
import numeral from "numeral";

export const parseLiteralDate = (d: moment.MomentInput) => (d ? moment(d).format("DD MMM YYYY") : "");
export const parseLiteralDateTime = (d: moment.MomentInput) => (d ? moment(d).tz(moment.tz.guess()).format("D MMM YYYY, h:mm A") : "");
export const parseDayOfWeek = (d: moment.MomentInput) => (d ? moment(d).format("LLLL").substring(0, 3) : "");

export const parseMoney = (amount: number) => numeral(amount).format("0,0.00");

interface SecondDetails {
  day: number;
  hour: number;
  minute: number;
  second: number;
}
export const parseSeconds = (seconds: number): SecondDetails => {
  seconds = Number(seconds);
  const day = Math.floor(seconds / (3600 * 24));
  const hour = Math.floor((seconds % (3600 * 24)) / 3600);
  const minute = Math.floor((seconds % 3600) / 60);
  const second = Math.floor(seconds % 60);
  return { day, hour, minute, second };
};
