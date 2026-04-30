const phrases = [
  {
    title: "Presença",
    line: "Eu gosto da sua presença.",
    sub: "Tem coisas que a gente percebe antes de saber explicar.",
  },
  {
    title: "Cuidado",
    line: "Quero te tratar com mais cuidado, de verdade.",
    sub: "Sem pressa. Sem peso. Só com atenção.",
  },
  {
    title: "Verdades",
    line: "Eu continuo admirando quem você é.",
    sub: "Tem algo em você que segue sendo especial pra mim.",
  },
  {
    title: "Agora",
    line: "Eu quero construir algo bonito no agora.",
    sub: "Com calma. Com leveza. Com verdade.",
  },
];

const steps = [
  ["Presença", "Eu gosto da sua presença."],
  ["Cuidado", "Você merece verdade, atenção e respeito."],
  ["Agora", "Eu quero estar presente do jeito certo."],
  ["Sinceridade", "O que eu sinto hoje é mais maduro."],
  ["Leveza", "Sem pressa. Sem peso. Só com sinceridade."],
  ["Convite", "Se fizer sentido pra você, eu quero te conhecer de novo."],
];

const railText = [
  "presença",
  "cuidado",
  "verdade",
  "leveza",
  "atenção",
  "calma",
  "respeito",
  "carinho",
].join("  •  ");

const mainLine = document.getElementById("mainLine");
const subLine = document.getElementById("subLine");
const closingLine = document.getElementById("closingLine");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");
const phraseRail = document.getElementById("phraseRail");
const stepsContainer = document.getElementById("steps");
const miniButtons = [...document.querySelectorAll(".mini")];
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const pages = [...document.querySelectorAll(".page")];

let activeIndex = 0;
let revealStarted = false;
let pageIndex = 0;

function typeLine(el, text) {
  el.textContent = "";
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, i);
    i += 1;
    if (i <= text.length) {
      window.setTimeout(tick, 22);
    }
  };
  tick();
}

function updateView(index) {
  activeIndex = index;
  const item = phrases[index];
  mainLine.textContent = item.line;
  subLine.textContent = item.sub;
  progressLabel.textContent = `${String(index + 1).padStart(2, "0")}/${String(phrases.length).padStart(2, "0")}`;
  progressFill.style.width = `${((index + 1) / phrases.length) * 100}%`;
  miniButtons.forEach((btn) => btn.classList.toggle("active", Number(btn.dataset.step) === index));
}

function renderSteps() {
  stepsContainer.innerHTML = steps
    .map(
      ([kicker, text], index) => `
        <div class="step" style="animation-delay:${index * 80}ms">
          <strong>${kicker}</strong>
          <p>${text}</p>
        </div>
      `
    )
    .join("");
}

function renderRail() {
  phraseRail.innerHTML = `<span>${railText}</span><span>${railText}</span><span>${railText}</span>`;
}

function startExperience() {
  if (revealStarted) return;
  revealStarted = true;
  startBtn.textContent = "Começar";
  window.setTimeout(() => {
    updateView(0);
    typeLine(closingLine, "Quero te tratar com mais cuidado, de verdade.");
  }, 300);
}

function showPage(index) {
  pageIndex = Math.max(0, Math.min(index, pages.length - 1));
  pages.forEach((page, i) => page.classList.toggle("active", i === pageIndex));
  nextBtn.textContent = pageIndex === pages.length - 1 ? "Recomeçar" : "Próxima página";
}

miniButtons.forEach((btn) => {
  btn.addEventListener("click", () => updateView(Number(btn.dataset.step)));
});

startBtn.addEventListener("click", () => {
  startExperience();
  showPage(1);
});

nextBtn.addEventListener("click", () => {
  if (pageIndex === pages.length - 1) {
    showPage(0);
    updateView(0);
    return;
  }

  showPage(pageIndex + 1);
  if (pageIndex === 1) {
    updateView(0);
  }
  if (pageIndex === 3) {
    typeLine(closingLine, "Quero te tratar com mais cuidado, de verdade.");
  }
});

restartBtn.addEventListener("click", () => {
  showPage(0);
  updateView(0);
});

renderSteps();
renderRail();
updateView(0);
typeLine(mainLine, phrases[0].line);

const bg = document.getElementById("bg");
const ctx = bg.getContext("2d");
const particles = [];
let w = 0;
let h = 0;
let pointer = { x: 0.5, y: 0.5 };

function resize() {
  w = bg.width = window.innerWidth * devicePixelRatio;
  h = bg.height = window.innerHeight * devicePixelRatio;
  bg.style.width = `${window.innerWidth}px`;
  bg.style.height = `${window.innerHeight}px`;
}

function spawnParticles() {
  const isMobile = window.matchMedia("(max-width: 780px)").matches;
  const count = isMobile ? Math.min(42, Math.floor(window.innerWidth / 26)) : Math.min(92, Math.floor(window.innerWidth / 14));
  particles.length = 0;
  for (let i = 0; i < count; i += 1) {
    particles.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * (isMobile ? 0.00028 : 0.00045),
      vy: (Math.random() - 0.5) * (isMobile ? 0.00028 : 0.00045),
      r: (isMobile ? 0.7 : 0.8) + Math.random() * (isMobile ? 1.2 : 1.8),
      hue: 28 + Math.random() * 36,
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  ctx.scale(devicePixelRatio, devicePixelRatio);

  const gradient = ctx.createRadialGradient(
    window.innerWidth * pointer.x,
    window.innerHeight * pointer.y,
    20,
    window.innerWidth * pointer.x,
    window.innerHeight * pointer.y,
    Math.max(window.innerWidth, window.innerHeight) * 0.7
  );
  gradient.addColorStop(0, "rgba(215, 164, 111, 0.11)");
  gradient.addColorStop(0.35, "rgba(143, 211, 199, 0.07)");
  gradient.addColorStop(1, "rgba(11, 15, 23, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < -0.05) p.x = 1.05;
    if (p.x > 1.05) p.x = -0.05;
    if (p.y < -0.05) p.y = 1.05;
    if (p.y > 1.05) p.y = -0.05;

    const x = p.x * window.innerWidth;
    const y = p.y * window.innerHeight;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, 0.55)`;
    ctx.arc(x, y, p.r, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.restore();
  requestAnimationFrame(draw);
}

window.addEventListener("pointermove", (event) => {
  pointer.x = event.clientX / window.innerWidth;
  pointer.y = event.clientY / window.innerHeight;
});

window.addEventListener("resize", () => {
  resize();
  spawnParticles();
});

resize();
spawnParticles();
draw();
showPage(0);
