export default class helpers {
  static colorFromName = name => {
    const getHash = str =>
      str
        ? str.split("").reduce((a, b) => {
            a = (a << 5) - a + b.charCodeAt(0);
            return a & a;
          }, 0)
        : "";
    const num = Math.floor(15239017 * Math.abs(getHash(name))) % 16777215;
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
    const ms = helpers.parseDate(end) - helpers.parseDate(start);
    let sec = Math.floor(ms / 1000);
    const hour = Math.floor(sec / 3600);
    sec -= hour * 3600;
    const min = Math.floor(sec / 60);
    sec -= min * 60;
    const h_s = hour > 0 ? `${hour} hour${hour > 1 ? "s" : ""}` : ``;
    const m_s = min > 0 ? `${min} minute${min > 1 ? "s" : ""}` : ``;
    const s_s =
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

  static secondsFromInterval = (start, end) =>
    Math.floor((helpers.parseDate(end) - helpers.parseDate(start)) / 1000);

  static findByCoords = (lat, lng, coords) => {
    const sq = x => x * x;
    const dst = x => sq(x.lat - lat) + sq(x.lng - lng);
    return coords.reduce(
      (prev, next) => (dst(prev) < dst(next) ? prev : next),
      coords[0]
    );
  };
}
