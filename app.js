const lidOne = document.querySelector(".lid.one");
const lidTwo = document.querySelector(".lid.two");

const envelope = document.querySelector(".envelope");
const back = document.querySelector(".back");

const letter = document.querySelector(".letter");

const topText = document.querySelector(".intro-text.top");
const bottomText = document.querySelector(".intro-text.bottom");

let target = 0;
let current = 0;

const ease = 0.08;

/* ORIGINAL LETTER SIZE */
const startWidth = 240;
const startHeight = 160;

window.addEventListener("scroll", () => {
  const maxScroll = window.innerHeight;

  target = Math.max(0, Math.min(window.scrollY / maxScroll, 1));
});

function animate() {
  current += (target - current) * ease;

  /* =====================================
     1. OPEN ENVELOPE (0 → 50%)
  ===================================== */
  const openProgress = Math.min(current / 0.5, 1);

  lidOne.style.transform = `rotateX(${openProgress * 90}deg)`;

  lidTwo.style.transform = `rotateX(${90 + openProgress * 90}deg)`;

  /* =====================================
     2. PULL LETTER (50 → 75%)
  ===================================== */
  let pullProgress = 0;

  if (current > 0.5) {
    pullProgress = Math.min((current - 0.5) / 0.25, 1);
  }

  const easedPull = Math.pow(pullProgress, 1.6);

  const letterY = 20 + -140 * easedPull;

  /* =====================================
     3. EXPAND LETTER (75 → 100%)
  ===================================== */
  let expandProgress = 0;

  if (current > 0.75) {
    expandProgress = Math.min((current - 0.75) / 0.25, 1);
  }

  const easedExpand = Math.pow(expandProgress, 1.4);

  const targetWidth = window.innerWidth * 0.92;

  const targetHeight = window.innerHeight * 0.92;

  const width = startWidth + (targetWidth - startWidth) * easedExpand;

  const height = startHeight + (targetHeight - startHeight) * easedExpand;

  /* =====================================
     LETTER POSITION
  ===================================== */

  letter.classList.remove("fullscreen");

  letter.style.left = "50%";
  letter.style.top = "50%";

  letter.style.width = `${width}px`;
  letter.style.height = `${height}px`;

  letter.style.transform = `
    translate(-50%, -50%)
    translateY(${letterY}px)
  `;

  /* =====================================
     FULLSCREEN FINISH
  ===================================== */

  if (current > 0.99) {
    letter.classList.add("fullscreen");

    letter.style.width = "100vw";
    letter.style.height = "100vh";

    letter.style.left = "50%";
    letter.style.top = "50%";

    letter.style.transform = "translate(-50%, -50%)";
  }

  /* =====================================
     ENVELOPE FADE + DROP
  ===================================== */

  let fadeProgress = 1;

  if (current > 0.75) {
    fadeProgress = 1 - Math.min((current - 0.75) / 0.25, 1);
  }

  const fade = Math.pow(fadeProgress, 1.3);

  const dropY = (1 - fadeProgress) * 200;

  envelope.style.opacity = fade;
  back.style.opacity = fade;

  lidOne.style.opacity = fade;
  lidTwo.style.opacity = fade;

  envelope.style.transform = `translateY(${dropY}px)`;

  back.style.transform = `translateY(${dropY}px)`;

  /* =====================================
     INTRO TEXT
  ===================================== */

  if (topText) {
    topText.style.opacity = fade;
  }

  if (bottomText) {
    bottomText.style.opacity = fade;
  }

  requestAnimationFrame(animate);
}

animate();
