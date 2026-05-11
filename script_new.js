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

const nav = document.querySelector('nav'); // Select your navbar

window.addEventListener('scroll', () => {
  if (window.scrollY < 50) {
    // Top of the page: Transparent & Dynamic
    nav.classList.add('nav-transparent');
  } else {
    // Scrolled down: Solid & Smaller
    nav.classList.remove('nav-transparent');
  }
});



window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const ts = document.getElementById("timestamp");
  if (ts) ts.value = Date.now();

  if (params.get("success")) {
    showSuccess();
  }

  if (params.get("error") === "exists") {
    alert("User already registered!");
  }

  if (params.get("error") === "invalid") {
    alert("Please fill all fields correctly!");
  }

  if (params.get("error") === "rate") {
    showError("Too many attempts. Try again later.");
  }

  if (params.get("error") === "bot") {
    showError("Something went wrong. Please try again.");
  }

  // Clean URL
  if (params.toString()) {
    window.history.replaceState({}, document.title, "/");
  }
});

function showSuccess() {

  // Open modal
  document.getElementById('modal').classList.add('open');

  // Show success UI
  document.getElementById('modal-form').style.display = 'none';
  document.getElementById('modal-success').style.display = 'block';

  // Disable all inputs
  document.querySelectorAll('input').forEach(inp => {
    inp.disabled = true;
    inp.placeholder = "You're on the list";
  });

  // Update submit buttons
  document.querySelectorAll('button[type="submit"]').forEach(btn => {
    btn.textContent = "✓ Registered";
    btn.disabled = true;
  });
}

function updateNav() {
  if (window.scrollY < 50) {
    nav.classList.add('nav-transparent');
  } else {
    nav.classList.remove('nav-transparent');
  }
}

window.addEventListener('scroll', updateNav);
window.addEventListener('DOMContentLoaded', updateNav); 


function showError(msg) {
  const modal = document.getElementById('modal');
  modal.classList.add('open');

  const errorBox = document.getElementById('modal-error');
  errorBox.innerText = msg;
  errorBox.style.display = "block";
}