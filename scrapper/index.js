const axios = require("axios");
const converToJson = require("convert-csv-to-json");
const fs = require("fs");

const scrapper = (req, res) => {
  let jsonData = [];

  console.log(req.route.path);

  const path = req.route.path;
  let url = "";

  if (path == "/province") {
    url =
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-province/dpc-covid19-ita-province-latest.csv";
  } else if (path == "/regione") {
    url =
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-regioni/dpc-covid19-ita-regioni-latest.csv";
  } else if (path == "/stats") {
    url =
      "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale-latest.csv";
  } else {
    return res.json({
      endpoints: {
        regione: "/regione",
        province: "/province",
        stats: "/stats",
      },
    });
  }

  axios
    .get(url)
    .then((file) => {
      fs.writeFile("outputText.csv", file.data, (err) => {
        if (err) {
          return res.status(400).json(err);
        } else {
          let json = converToJson
            .fieldDelimiter(",")
            .getJsonFromCsv("./outputText.csv");
          for (let i = 0; i < json.length; i++) {
            jsonData.push(json[i]);
          }

          res.json(jsonData);
        }
      });
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = scrapper;
