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
    localStorage.setItem("user_email", data.email);
    location.href = "/index.html";
  } else if (email === '' || password === '') {
    alert("이메일과 비밀번호를 모두 입력해주세요.")
  } else {
    alert("아이디 혹은 비밀번호가 일치하지 않거나, 존재하지 않는 아이디입니다.");
  }
});
