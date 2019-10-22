function niceDate(timestamp) {
  const d = timestamp ? new Date(timestamp) : new Date();
  return [
    d.getFullYear(),
    leftPad(d.getMonth() + 1),
    leftPad(d.getDate())
  ].join("-");
}

module.exports = { niceDate };
