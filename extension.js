/**
 * developer: @mohamedSaber
 * desginer: @yahyaTizza
 */
const vscode = require("vscode");

const axios = require("axios").default;

const getRandomHadith = async () => {
  let hadith =
    "✨ إِنَّ اللَّهَ وَمَلائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا";

  try {
    const { data } = await axios.get(
      `https://api.sunnah.com/v1/hadiths/random`,
      {
        headers: {
          "X-API-Key": "SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk",
        },
      }
    );
    // Select Muslim language
    const muslimLanguage = vscode.workspace
      .getConfiguration("hadith")
      .get("language");

    muslimLanguage === "Arabic"
      ? (hadith = `✨ ${data.hadith[1].body.slice(3, -4)}`)
      : (hadith = `✨ ${data.hadith[0].body.slice(3, -4)}`);
  } catch (error) {}

  return hadith;
};

function activate() {
  const repeatedEveryMinute = vscode.workspace
    .getConfiguration("hadith")
    .get("repeatedEveryMinute");

  const convertMinutesToMs = repeatedEveryMinute * 60000;

  setInterval(async function () {
    getRandomHadith()
      .then(function (response) {
        vscode.window.showInformationMessage(response, "X");
      })
      .catch(() => {
        vscode.window.showInformationMessage(
          "✨ إِنَّ اللَّهَ وَمَلائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ يَا أَيُّهَا الَّذِينَ آمَنُوا صَلُّوا عَلَيْهِ وَسَلِّمُوا تَسْلِيمًا"
        );
      });
  }, convertMinutesToMs);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
