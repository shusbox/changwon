// header.js
window.addEventListener("load", () => {
  localStorage.removeItem("user_email");
});

const loginText = document.getElementById("login");
const userEmail = localStorage.getItem("user_email");

if (userEmail && loginText) {
  loginText.textContent = `${userEmail}`;
  loginText.style.cursor = "default";
  loginText.onclick = null;

  // 로그아웃도 원하면
  loginText.addEventListener("click", () => {
    localStorage.removeItem("user_email");
    location.reload();
  });
}