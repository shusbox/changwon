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