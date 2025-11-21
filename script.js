let scenarioData = {};
let currentScene = "";
let currentScenario = 0;

// JSONファイルからシナリオデータを読み込む
async function loadJSON() {
  const response = await fetch("scenarios.json");
  scenarioData = await response.json();
}

// 業種（シーン）を開始する処理
function startScene(sceneName) {
  currentScene = sceneName;
  currentScenario = 0;

  // 画面表示の切り替え
  document.getElementById("scene-select").style.display = "none";
  document.getElementById("scenario").style.display = "block";
  document.getElementById("result").style.display = "none";

  // 職員向け設定ガイドボタンを非表示にする
  const guideButton = document.getElementById("guide-button");
  if (guideButton) {
    guideButton.style.display = "none";
  }
  
  // 最初のシナリオを読み込む
  loadScenario(currentScenario);
}

function loadScenario(index) {
  const s = scenarioData[currentScene][index];
  const total = scenarioData[currentScene].length;

  // 進行状況を表示（例：1 / 3）
  document.getElementById("progress").textContent = `${index + 1} / ${total}`;
  // 質問文を表示
  document.getElementById("question").textContent = s.question;

  // 選択肢ボタンを生成
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  s.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectChoice(i);
    choicesDiv.appendChild(btn);
  });
}

// 選択肢が選ばれたときの処理
function selectChoice(index) {
  const feedback = scenarioData[currentScene][currentScenario].feedbacks[index];
  const total = scenarioData[currentScene].length;

  // 画面表示の切り替え
  document.getElementById("scenario").style.display = "none";
  document.getElementById("result").style.display = "block";

    // 結果画面に進行状況とフィードバックを表示
  document.getElementById("progress-result").textContent = `${currentScenario + 1} / ${total}`;
  document.getElementById("feedback").textContent = feedback;

  // 最後の問題かどうかで「次へ」ボタンの表示を切り替え
  const nextBtn = document.getElementById("next-button");
  if (currentScenario + 1 >= total) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-block";
  }
}

// 「次のシナリオへ」ボタンが押されたときの処理
function restart() {
  currentScenario++;
  const total = scenarioData[currentScene].length;

  if (currentScenario < total) {
    document.getElementById("result").style.display = "none";
    document.getElementById("scenario").style.display = "block";
    loadScenario(currentScenario);
  } else {
    goBack(); // 最後の問題が終わったら職種選択に戻る
  }
}

// 業種選択画面に戻る処理
function goBack() {
  document.getElementById("result").style.display = "none";
  document.getElementById("scenario").style.display = "none";
  document.getElementById("scene-select").style.display = "block";

  // 職員向け設定ガイドボタンを再表示する
  const guideButton = document.getElementById("guide-button");
  if (guideButton) {
    guideButton.style.display = "block";
  }
}

// ページ読み込み時の初期処理
window.onload = async () => {
  await loadJSON();
  document.getElementById("scene-select").style.display = "block";

  // 初期表示時に職員向け設定ガイドボタンを表示
  const guideButton = document.getElementById("guide-button");
  if (guideButton) {
    guideButton.style.display = "block";
  }
};