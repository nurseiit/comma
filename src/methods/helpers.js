export default class helpers {
  static colorFromName = name => {
    const getHash = str =>
      str
        ? str.split("").reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0)
        : "";
    let num = Math.floor(15239017 * Math.abs(getHash(name))) % 16777215;
    let col_str = num.toString(16);
    while (col_str.length < 6) col_str = "0" + col_str;
    return "#" + col_str;
  };

  static nameFromDate = str =>
    str.substring(0, 10) + " " + str.substring(11).replace("-", ":");

  static parseDate = str =>
    Date.parse(
      str.substring(0, 10) + " " + str.substring(11).replace("-", ":")
    );

  static lengthFromInterval = (start, end) => {
    let ms = helpers.parseDate(end) - helpers.parseDate(start);
    let sec = Math.floor(ms / 1000);
    let hour = Math.floor(sec / 3600);
    sec -= hour * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;
    let h_s = hour > 0 ? `${hour} hour${hour > 1 ? "s" : ""}` : ``;
    let m_s = min > 0 ? `${min} minute${min > 1 ? "s" : ""}` : ``;
    let s_s =
      sec > 0 || (hour === 0 && min === 0)
        ? `${sec} second${min > 1 ? "s" : ""}`
        : ``;
    return (
      h_s +
      (min || sec ? " " : "") +
      m_s +
      (sec && !(hour && min) ? " " : "") +
      (hour && min ? "" : s_s) +
      "."
    );
  };
}
