document.getElementById("login-btn").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://127.0.0.1:8000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (res.ok) {
    alert("✅ 로그인 성공!");

    // 👉 이메일을 저장하고
    localStorage.setItem("user_email", data.email);  // 또는 user_name

    // 👉 index.html로 이동
    location.href = "/index.html";
  }else {
    alert("❌ 로그인 실패: " + data.detail);
  }
});
