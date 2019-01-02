const colorFromName = name => {
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

export default colorFromName;
