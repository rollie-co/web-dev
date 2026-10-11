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

  try {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current) showWelcome(current);
  } catch (err) {}

  document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password)
      return show("User Name aur Password dono daalo.", "error");

    let users = [];
    try { users = JSON.parse(localStorage.getItem("users")) || []; } catch (err) {}

    if (users.length === 0)
      return show("Koi user registered nahi hai. Pehle Registration karo.", "error");

    const user = users.find(u =>
      u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    if (!user)
      return show("User Name ya Password galat hai.", "error");

    localStorage.setItem("currentUser", JSON.stringify(user));
    showWelcome(user);
  });

  document.getElementById("resetBtn").addEventListener("click", () => show("", ""));

  document.getElementById("logoutBtn").addEventListener("click", function () {
    localStorage.removeItem("currentUser");
    welcomeBox.classList.add("hidden");
    loginBox.classList.remove("hidden");
    document.getElementById("loginForm").reset();
    show("", "");
  });