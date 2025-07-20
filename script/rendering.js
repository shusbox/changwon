// history
const timeline_data = [
  { year: '1910', root: '일제감정기', img: '1910', description1: '창원부를 마산부로', description2: '웅천은 마산부 관할구혁으로 개편되고 일본이 군항 설치공사를 개시' },
  { year: '1916', root: '일제감정기', img: '1916', description1: '진해군항에 요항부 개청', description2: '3·1 운동 등 지역 항일운동 확대' },
  { year: '1923 - 1927', root: '일제감정기', img: '19231927', description1: '철도 경남선 마산 - 군북간 / 진주간 개통', description2: '마산 - 진해사이의 철도가 개통되다.' }
];

function renderTimeLine(data) {
  const container = document.getElementById('history_6');

  data.forEach(item => {
    const element = `
      <div class="timeline">
        <h1> ${item.year} </h1>
        <div class="timeline-description">
          <img src="/resource/history/${item.root}/${item.year}.png">
          <div class="timeline-description-line"></div>
          <div class="timeline-description-txt">
            <p> ${item.description1} </p>
            <p> ${item.description2} </p>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', element);
  });
}
renderTimeLine(timeline_data);

// tourspot
const card_data = [
  { root: '광암해수욕장', tag_1: '해수욕장', tag_2: '바다', title: '광암해수욕장', description: '창원시의 유일한 해수욕장인 광암해수욕장은 수심이 얕고 바닷물이 깨끗하며 항상 따뜻한 수온을 유지하고 있다. 게다가 물결이 잔잔하고 갯벌이 발달하여 가족 피서지로 적합하다. 다년간 폐쇄되었다가 2018년 재개장하였으며 주변에 해양드라마세트장, 로봇랜드 등 관광명소들이 있어 해수욕과 함께 관광을 겸할 수 있다.' }
];

function renderCard(data) {
  const container = document.getElementById('card-container');

  data.forEach(item => {
    const element = `
      <div class="card">
        <img src="/resource/tourspot/${item.root}/main.png">
        <div class="card-description">
          <div class="card-tag">
            <p> ${item.tag_1} </p>
            <p> ${item.tag_2} </p>
          </div>
          <div class="card-txt">
            <h1> ${item.title} </h1>
            <p> ${item.description} </p>
          </div>
          <button> 자세히 </button>        
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', element);
  });
}
renderCard(card_data);