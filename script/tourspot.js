const card_data = [
  { root: '광암해수욕장', tag_1: '해수욕장', tag_2: '바다', title: '광암해수욕장', description: '창원시의 유일한 해수욕장인 광암해수욕장은 수심이 얕고 바닷물이 깨끗하며 항상 따뜻한 수온을 유지하고 있다. 게다가 물결이 잔잔하고 갯벌이 발달하여 가족 피서지로 적합하다. 다년간 폐쇄되었다가 2018년 재개장하였으며 주변에 해양드라마세트장, 로봇랜드 등 관광명소들이 있어 해수욕과 함께 관광을 겸할 수 있다.' },
  { root: '경화역공원', tag_1: '벚꽃', tag_2: '열치', title: '경화역공원', description: '경남의 벚꽃명소로 유명해진 경화역은 경남 창원시 진해구 경화동에 있는 작은 간이역으로 2006년부터 여객업무는 하지 않고 있다. 성주사역과 진해역 사이에 위치하고 있으며 철길따라 쭉 펼쳐진 벚꽃이 터널을 이루어, 안민고개나 진해 여좌천 다리와 함께 벚꽃 사진명소로도 유명하다.벚꽃이 만발한 철길 위를 자유롭게 거닐 수 있으며, 벚꽃이 떨어질때면 철길에 흩날리는 벚꽃이 환상적인 낭만을 느끼게 해준다. 영화 소년, 천국에 가다와 드라마 봄의 왈츠 촬영지인 경화역에서 세화여고까지 이어지는 약 800ｍ 철로변 벚꽃은 여좌천보다 한가하게 벚꽃을 즐길 수 있어 연인들과 가족단위 관광객들이 많이 찾고 있다. 매년 벚꽃이 필 무렵이면 구경하러 오는 관광객들이 점차 늘어나 2009년에는 군항제 기간에만 일시적으로 여객업무를 재개하기도 하였다. '},
  { root: '로봇랜드', tag_1: '놀이공원', tag_2: '테마파크', title: '로봇랜드', description: '마산로봇랜드는 경상남도 창원시 마산합포구 구산면 구복리 일원에 조성된 로봇산업과 테마파크가 결합된 복합문화공간으로 2019년 9월 7일에 개장되었다.' },
  { root: '창동예술촌', tag_1: '예술공간', tag_2: '체험', description: '창동은 과거에 경남의 명동으로 불리던 중심가다. 2000년을 전후로 쇠락의 길을 걷다가 창동예술촌을 주축으로 새롭게 태어났다. 창원시는 창동 일대 빈 점포를 예술가들에게 무상으로 제공했고, 이를 중심으로 세계적인 조각가 문신 선생의 이름을 딴 문신예술골목, 마산 예술의 역사를 담은 마산예술흔적골목, 상점과 예술을 접목한 에꼴드창동골목이 차례로 생겨났다. 2012년에는 이들 세 골목을 하나로 묶어 창동예술촌이라 이름 지었다. 창동예술촌은 어울림센터를 중심으로 아고라광장, 창동예술체험관, 갤러리, 그리고 50여 개 공방이 골목 사이사이에 자리한다. 1955년 문을 열어 국내에서 가장 오래된 서점 학문당과 40년이 넘은 헌책방 영록서점은 창동예술촌의 산증인이다. 작가들의 공방은 여행자의 체험공간이 되기도 한다. 도자기 만들기, 민화 그리기, 가훈 쓰기 등 다양한 체험거리가 마련돼 있다. 창동예술촌은 산책을 즐기기에도 좋다. 실핏줄처럼 이어진 좁은 골목이 정겹고, 아기자기한 벽화가 보는 이의 마음을 편하게 만든다.' },
  { root: '돝섬해상유원지', tag_1: '산책', tag_2: '섬', description: '마산만에 그림 같이 자리한 돝섬은 섬 전체가 해상유원지로 조성되어 있으며 다양한 볼거리와 해양레포츠 체험 등을 갖춘 친환경적인 가족공원이다. 돝섬해상유원지는 국내 최초의 해상유원지로 섬의 모양이 돼지 누운 모습이라 하여 돼지의 옛말인 ‘돝’을 따와 돝섬이라 불렀다는 전설이 전해지며 돝섬 내 산책로를 걷다 보면 백합나무와 팽나무 등의 웅장한 교목들을 만날 수 있고 해안산책로에서는 인근의 마산 시가지와 합포만의 전경을 감상할 수 있다.' }
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
      <img src="/resource/tourspot/${item.root}/main.png">
      <div class="card-description">
        <div class="card-tag">
          <p>${item.tag_1}</p>
          <p>${item.tag_2}</p>
        </div>
        <div class="card-txt">
          <div class="card-txt-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" fill="none" class="card-save ${isLiked ? "liked" : ""}" data-root="${item.root}">
              <path d="M11.665.5c-.75.012-1.484.22-2.128.605A4.255 4.255 0 0 0 8 2.69a4.255 4.255 0 0 0-1.537-1.585A4.278 4.278 0 0 0 4.335.5 4.54 4.54 0 0 0 1.2 1.95 4.502 4.502 0 0 0 .003 5.179c0 3.017 3.19 6.313 5.865 8.547a3.323 3.323 0 0 0 4.264 0c2.675-2.234 5.865-5.53 5.865-8.547a4.502 4.502 0 0 0-1.197-3.23A4.54 4.54 0 0 0 11.665.5Z"/>
            </svg>
            <h1>${item.root}</h1>
          </div>
          <p>${item.description}</p>
        </div>
        <button>자세히</button>
      </div>
    `;

    const saveIcon = element.querySelector('.card-save');
    saveIcon.addEventListener('click', async () => {
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

        if (result.liked) {
          saveIcon.classList.add("liked");
          saveIcon.querySelector("path").style.fill = "#44BBBD";
        } else {
          saveIcon.classList.remove("liked");
          saveIcon.querySelector("path").style.fill = "#E2E2E2";
        }
      } catch (err) {
        alert("찜 요청 중 오류가 발생했습니다.");
      }
    });

    container.appendChild(element);
  });
}
renderCard(card_data)