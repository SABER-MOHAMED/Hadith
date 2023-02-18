const vscode = require("vscode");

const axios = require("axios").default;

async function getRandomAya() {
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

    hadith = `✨ ${data.hadith[1].body.slice(3, -4)}`;
  } catch (error) {}

  return hadith;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "hadith.activate",

    async function () {
      getRandomAya()
        .then(function (response) {
          vscode.window.showInformationMessage(response);
        })
        .catch((error) => {
          console.log("error11: ", error);
          vscode.window.showInformationMessage(
            "Error while activating Hadith :( 111"
          );
        });
    }
  );

  //   let repeatedEveryMinute = vscode.workspace.getConfiguration("ayat").get('repeatedEveryMinute');
  console.log("vscode.workspace: ", vscode.workspace.getConfiguration);
  const repeatedEveryMinute = 1;

  const convertMinutesToMs = repeatedEveryMinute * 60000;

  setInterval(async function () {
    getRandomAya()
      .then(function (response) {
        vscode.window.showInformationMessage(response, "X");
      })
      .catch((error) => {
        vscode.window.showInformationMessage(
          "Error while activating Hadith :( 2222"
        );
      });
  }, convertMinutesToMs);

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
