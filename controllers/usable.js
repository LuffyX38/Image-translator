const fs = require("fs");
const path = require("path");
const apiScript = require("../utils/translateText");

  exports.fetchLanguageData = (req, res, next) => {
  fs.readFile(path.join(__dirname, "languages.json"), (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ error: "Error reading data" });
    }
    const languageData = JSON.parse(data);
    req.languageData = languageData;
    next();
  });
};

exports.translate = (req, res, next) => {
    const { data, lang } = req.body;
    apiScript(data, lang)
      .then((translatedData) => {
          res.status(200).json(translatedData);
      })
      .catch((err) => {
          res.status(500).json({ message: "error translating text" });
      });
}

