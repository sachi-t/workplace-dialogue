let scenarioData = {};
let currentScene = "";
let currentScenario = 0;

async function loadJSON() {
  const response = await fetch("scenarios.json");
  scenarioData = await response.json();
}

function startScene(sceneName) {
  currentScene = sceneName;
  currentScenario = 0;
  document.getElementById("scene-select").style.display = "none";
  document.getElementById("scenario").style.display = "block";
  document.getElementById("result").style.display = "none";
  loadScenario(currentScenario);
}

function loadScenario(index) {
  const s = scenarioData[currentScene][index];
  const total = scenarioData[currentScene].length;

  // 進行状況を表示（例：1 / 3）
  document.getElementById("progress").textContent = `${index + 1} / ${total}`;
  document.getElementById("question").textContent = s.question;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  s.choices.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectChoice(i);
    choicesDiv.appendChild(btn);
  });
}

function selectChoice(index) {
  const feedback = scenarioData[currentScene][currentScenario].feedbacks[index];
  const total = scenarioData[currentScene].length;

  document.getElementById("scenario").style.display = "none";
  document.getElementById("result").style.display = "block";

  // 結果画面に進行状況を表示
  document.getElementById("progress-result").textContent = `${currentScenario + 1} / ${total}`;
  document.getElementById("feedback").textContent = feedback;

  // 最後の問題かどうかでボタン表示を切り替え
  const nextBtn = document.getElementById("next-button");
  if (currentScenario + 1 >= total) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-block";
  }
}

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

function goBack() {
  document.getElementById("result").style.display = "none";
  document.getElementById("scenario").style.display = "none";
  document.getElementById("scene-select").style.display = "block";
}

window.onload = async () => {
  await loadJSON();
  document.getElementById("scene-select").style.display = "block";
};