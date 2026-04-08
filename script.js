// Nav scroll
const navEl = document.getElementById('nav');
window.addEventListener('scroll', () => {
  navEl.classList.toggle('scrolled', window.scrollY > 60);
});

// Reveal
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.08 });
reveals.forEach(r => obs.observe(r));

// Vision cycle
const vlines = document.querySelectorAll('.vision-line');
let vc = 0;
setInterval(() => {
  vlines[vc].classList.remove('active');
  vc = (vc + 1) % vlines.length;
  vlines[vc].classList.add('active');
}, 2000);

// Modal
function openModal() {
  document.getElementById('modal').classList.add('open');
}
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('open');
});
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) this.classList.remove('open');
});

function handleModal() {
  const email = document.getElementById('modal-email').value;
  if (!email || !email.includes('@')) return;
  document.getElementById('modal-form').style.display = 'none';
  document.getElementById('modal-success').style.display = 'block';
}

function handleNotify(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input.value || !input.value.includes('@')) return;
  btn.textContent = '✓';
  btn.style.background = '#d4901a';
  input.value = '';
  input.placeholder = "You're on the list";
  input.disabled = true;
  btn.disabled = true;
}

function handleLaunch() {
  const input = document.getElementById('launch-email');
  if (!input.value || !input.value.includes('@')) return;
  const btn = input.nextElementSibling;
  btn.textContent = "You're On The List ✓";
  btn.style.opacity = '0.7';
  input.value = '';
  input.placeholder = "We'll be in touch";
  input.disabled = true;
  btn.disabled = true;
}
