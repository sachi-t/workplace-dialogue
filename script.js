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
  document.getElementById("scenario").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("feedback").textContent = feedback;
}

function restart() {
  currentScenario = (currentScenario + 1) % scenarioData[currentScene].length;
  document.getElementById("result").style.display = "none";
  document.getElementById("scenario").style.display = "block";
  loadScenario(currentScenario);
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