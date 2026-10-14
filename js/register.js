const form = document.getElementById("regForm");
const msg  = document.getElementById("msg");

function show(text, type) {
  msg.textContent = text;
  msg.className = "msg " + type;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name     = document.getElementById("name").value.trim();
  const email    = document.getElementById("email").value.trim();
  const phone    = document.getElementById("phone").value.trim();
  const genderEl = document.querySelector('input[name="gender"]:checked');
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const cpass    = document.getElementById("cpassword").value;

  if (!name || !email || !phone || !genderEl || !username || !password || !cpass)
    return show("Sabhi fields bharna zaroori hai.", "error");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return show("Sahi email daalo.", "error");
  if (!/^[0-9]{10}$/.test(phone))
    return show("Phone number 10 digit ka hona chahiye.", "error");
  if (username.length < 4)
    return show("Username kam se kam 4 character ka ho.", "error");
  if (password.length < 6)
    return show("Password kam se kam 6 character ka ho.", "error");
  if (password !== cpass)
    return show("Password match nahi kar raha.", "error");

  let users = [];
  try {
    users = JSON.parse(localStorage.getItem("users")) || [];
  } catch (err) {
    users = [];
  }

  if (users.some(u => u.username.toLowerCase() === username.toLowerCase()))
    return show("Ye username pehle se le liya gaya hai.", "error");

  users.push({ name, email, phone, gender: genderEl.value, username, password });

  try {
    localStorage.setItem("users", JSON.stringify(users));
  } catch (err) {
    return show("Data save nahi ho paya: " + err.message, "error");
  }

  form.reset();                       // pehle reset
  show("Registration ho gaya! Login page par ja rahe hain...", "success"); // phir message
  setTimeout(() => { window.location.href = "login.html"; }, 1500);
});

// Sirf manual reset button dabane par message hatao
document.getElementById("resetBtn").addEventListener("click", () => show("", ""));