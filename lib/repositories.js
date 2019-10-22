const { tokens } = require("../config"),
  got = require("got");

exports.getRepositories = (req = {}) => {
  const lang = req.lang || "javascript";
  const ofsQuantity = req.ofsQuantity || 5;

  const url = `https://api.github.com/search/repositories?q=good-first-issues:>${ofsQuantity}+language:${lang}`;
  return new Promise((resolve, reject) => {
    got(url)
      .then(res => resolve(JSON.parse(res.body).items))
      .catch(reject);
  });
};
