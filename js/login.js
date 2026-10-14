const loginBox   = document.getElementById("loginBox");
const welcomeBox = document.getElementById("welcomeBox");
const msg        = document.getElementById("msg");

function show(text, type) {
  msg.textContent = text;
  msg.className = "msg " + type;
}

function showWelcome(user) {
  document.getElementById("welcomeText").textContent = "Welcome, " + user.name + "!";
  loginBox.classList.add("hidden");
  welcomeBox.classList.remove("hidden");
}

function showLogin() {
  welcomeBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem("users")) || []; }
  catch (err) { return []; }
}

// Start: pehle login dikhao, phir check karo
showLogin();
try {
  const current = JSON.parse(localStorage.getItem("currentUser"));
  const stillExists = current && getUsers().some(u => u.username === current.username);
  if (stillExists) showWelcome(current);
  else localStorage.removeItem("currentUser");
} catch (err) {}

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (!username || !password)
    return show("Username aur Password dono daalo.", "error");

  const users = getUsers();
  if (users.length === 0)
    return show("Koi user registered nahi hai. Pehle Registration karo.", "error");

  const user = users.find(u =>
    u.username.toLowerCase() === username.toLowerCase() && u.password === password);

  if (!user)
    return show("Username ya Password galat hai.", "error");

  localStorage.setItem("currentUser", JSON.stringify(user));
  show("", "");
  showWelcome(user);
});

document.getElementById("resetBtn").addEventListener("click", () => show("", ""));

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("currentUser");
  document.getElementById("loginForm").reset();
  show("", "");
  showLogin();
});