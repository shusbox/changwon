const card_data = [
  { root: '진해콩', company: '경화당제과', address: '진해로 충장로321번길 26' },
  { root: '냉동피조개', company: '진해수엽', address: '진해구 태평로 143' },
  { root: '창원단감빵', company: '그린하우스', address: '의창구 원이대로81번길 10' },
  { root: '주남오리빵', company: '그린하우스', address: '의창구 원이대로81번길 10' }
];

async function renderCard(data) {
  const container = document.getElementById('card-container');
  const email = localStorage.getItem("user_email");
  let likedList = [];

  if (email) {
    try {
      const res = await fetch(`http://127.0.0.1:8000/my-likes?email=${email}`);
      likedList = await res.json();
    } catch (err) {
      console.error("찜 목록을 불러오는 데 실패했습니다.");
    }
  }

  data.forEach(item => {
    const isLiked = likedList.includes(item.root);

    const element = document.createElement('div');
    element.classList.add('card');

    element.innerHTML = `
      <div class="card-pick-ico">
        <svg class="card-save" data-root="${item.root}" xmlns="http://www.w3.org/2000/svg" width="16" height="15" fill="none">
          <path fill="${isLiked ? "#44BBBD" : "#E2E2E2"}" d="M11.665.5c-.75.012-1.484.22-2.128.605A4.255 4.255 0 0 0 8 2.69a4.255 4.255 0 0 0-1.537-1.585A4.278 4.278 0 0 0 4.335.5 4.54 4.54 0 0 0 1.2 1.95 4.502 4.502 0 0 0 .003 5.179c0 3.017 3.19 6.313 5.865 8.547a3.323 3.323 0 0 0 4.264 0c2.675-2.234 5.865-5.53 5.865-8.547a4.502 4.502 0 0 0-1.197-3.23A4.54 4.54 0 0 0 11.665.5Z"/>
        </svg>
      </div>
      <img src="/resource/product/${item.root}.png">
      <div class="card-des">
        <h1> ${item.root} </h1>
        <div class="card-des-des">
          <p> <span class="card-des-des-highlight">업체명</span> ${item.company} </p>
          <p> <span class="card-des-des-highlight">주소</span> ${item.address} </p>
        </div>
      </div>
      <div class="card-btn">
        <button class="card-btn-pick"> 찜하기 </button>
        <button class="card-btn-buy"> 구매하기 </button>
      </div>
    `;

    const saveIcon = element.querySelector('.card-save');
    const pickButton = element.querySelector('.card-btn-pick');

    function updateLikeState(isLiked) {
      if (isLiked) {
        saveIcon.classList.add("liked");
        saveIcon.querySelector("path").style.fill = "#44BBBD";
        pickButton.textContent = "찜 취소";
      } else {
        saveIcon.classList.remove("liked");
        saveIcon.querySelector("path").style.fill = "#E2E2E2";
        pickButton.textContent = "찜하기";
      }
    }

    updateLikeState(isLiked);

    const toggleLike = async () => {
      const email = localStorage.getItem("user_email");

      if (!email) {
        alert("로그인 후 이용할 수 있습니다.");
        return;
      }

      const spotRoot = saveIcon.dataset.root;

      try {
        const res = await fetch("http://127.0.0.1:8000/toggle-like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, spot_root: spotRoot })
        });
        const result = await res.json();
        updateLikeState(result.liked);
      } catch (err) {
        alert("찜 요청 중 오류가 발생했습니다.");
      }
    };

    saveIcon.addEventListener('click', toggleLike);
    pickButton.addEventListener('click', toggleLike);

    container.appendChild(element);
  });
}
renderCard(card_data)