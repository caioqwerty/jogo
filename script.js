let score = 0;
let pointsPerClick = 1;
let autoClickerActive = false;
let level = 1;
let clicks = 0;

// Substitui os alertas por mensagens exibidas na página
function showMessage(message) {
  const messageBox = document.getElementById("messageBox");
  messageBox.textContent = message;
  messageBox.style.display = "block";
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}

// Atualiza o nível com base na pontuação
function updateLevel() {
  const nextLevel = Math.floor(score / 100) + 1;
  if (nextLevel > level) {
    level = nextLevel;
    document.getElementById("level").textContent = `Nível: ${level}`;
    showMessage(`Parabéns! Você alcançou o nível ${level}!`);
  }
}

// Adiciona lógica para as missões
function checkMissions() {
  // Verifica a missão 1
  if (clicks >= 50 && !document.getElementById("mission1").classList.contains("completed")) {
    score += 20;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    document.getElementById("mission1").classList.add("completed");
    document.getElementById("mission1").style.textDecoration = "line-through";
    showMessage("Missão 1 concluída! Você ganhou 20 pontos.");
    document.getElementById("mission2").style.display = "list-item";
  }

  // Verifica a missão 2
  if (level >= 5 && !document.getElementById("mission2").classList.contains("completed")) {
    score += 50;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    document.getElementById("mission2").classList.add("completed");
    document.getElementById("mission2").style.textDecoration = "line-through";
    showMessage("Missão 2 concluída! Você ganhou 50 pontos.");
  }
}

// Lógica para conquistas
function checkAchievements() {
  if (clicks >= 100 && !document.getElementById("achievement1").classList.contains("unlocked")) {
    document.getElementById("achievement1").classList.add("unlocked");
    document.getElementById("achievement1").textContent = "100 cliques (Desbloqueado: Sim)";
    showMessage("Conquista desbloqueada: 100 cliques!");
  }
  if (level >= 10 && !document.getElementById("achievement2").classList.contains("unlocked")) {
    document.getElementById("achievement2").classList.add("unlocked");
    document.getElementById("achievement2").textContent = "Nível 10 (Desbloqueado: Sim)";
    showMessage("Conquista desbloqueada: Nível 10!");
  }
}

// Adiciona um evento de clique ao botão principal
document.getElementById("clicker").addEventListener("click", function () {
  clicks++;
  score += pointsPerClick;
  document.getElementById("score").textContent = `Pontuação: ${score}`;
  updateLevel();
  checkMissions();
  checkAchievements();
  document.getElementById("totalClicks").textContent = `Cliques Totais: ${clicks}`;

  // Habilita os upgrades com base na pontuação
  if (score >= 10) {
    document.getElementById("upgrade1").disabled = false;
  }
  if (score >= 50) {
    document.getElementById("upgrade2").disabled = false;
  }
  if (score >= 100) {
    document.getElementById("upgrade3").disabled = false;
  }
});

// Adiciona eventos de clique para os upgrades
document.getElementById("upgrade1").addEventListener("click", function () {
  if (score >= 10) {
    score -= 10;
    pointsPerClick++;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    showMessage("Upgrade 1 adquirido! Agora você ganha mais pontos por clique.");
  }
});

document.getElementById("upgrade2").addEventListener("click", function () {
  if (score >= 50) {
    score -= 50;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    showMessage("Upgrade 2 adquirido! Clique automático ativado.");
    if (!autoClickerActive) {
      autoClickerActive = true;
      setInterval(() => {
        score += pointsPerClick;
        document.getElementById("score").textContent = `Pontuação: ${score}`;
        updateLevel();
      }, 1000);
    }
  }
});

document.getElementById("upgrade3").addEventListener("click", function () {
  if (score >= 100) {
    score -= 100;
    pointsPerClick *= 2;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    showMessage("Upgrade 3 adquirido! Seus pontos por clique foram dobrados.");
  }
});

// Lógica para a loja
document.getElementById("item1").addEventListener("click", function () {
  if (score >= 30) {
    score -= 30;
    pointsPerClick++;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    showMessage("Item 1 comprado! Seus pontos por clique aumentaram.");
  }
});

document.getElementById("item2").addEventListener("click", function () {
  if (score >= 100) {
    score -= 100;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    showMessage("Item 2 comprado! O custo dos upgrades foi reduzido.");
  }
});

// Estatísticas
let startTime = Date.now();
setInterval(() => {
  const timePlayed = Math.floor((Date.now() - startTime) / 1000);
  document.getElementById("timePlayed").textContent = `Tempo Jogado: ${timePlayed} segundos`;
}, 1000);

// Eventos aleatórios
setInterval(() => {
  const randomEvent = Math.random();
  if (randomEvent < 0.1) {
    const bonus = Math.floor(Math.random() * 50) + 10;
    score += bonus;
    document.getElementById("score").textContent = `Pontuação: ${score}`;
    document.getElementById("eventMessage").textContent = `Evento: Você ganhou ${bonus} pontos!`;
    setTimeout(() => {
      document.getElementById("eventMessage").textContent = "Nenhum evento ativo no momento.";
    }, 5000);
  }
}, 10000);

// Música de fundo
document.getElementById("toggleMusic").addEventListener("click", function () {
  const music = document.getElementById("backgroundMusic");
  if (music.paused) {
    music.play();
    this.textContent = "Desativar Música";
  } else {
    music.pause();
    this.textContent = "Ativar Música";
  }
});

// Configuração do gráfico de pontuação
const ctx = document.getElementById('scoreChart').getContext('2d');
const scoreChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [], // Labels serão preenchidas dinamicamente
    datasets: [{
      label: 'Pontuação ao longo do tempo',
      data: [], // Dados serão preenchidos dinamicamente
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2,
      fill: false
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tempo (segundos)'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Pontuação'
        }
      }
    }
  }
});

// Atualiza o gráfico a cada segundo
setInterval(() => {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);
  scoreChart.data.labels.push(currentTime);
  scoreChart.data.datasets[0].data.push(score);
  scoreChart.update();
}, 1000);