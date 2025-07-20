const card_data = [
  { root: '광암해수욕장', tag_1: '해수욕장', tag_2: '바다', title: '광암해수욕장', description: '창원시의 유일한 해수욕장인 광암해수욕장은 수심이 얕고 바닷물이 깨끗하며 항상 따뜻한 수온을 유지하고 있다. 게다가 물결이 잔잔하고 갯벌이 발달하여 가족 피서지로 적합하다. 다년간 폐쇄되었다가 2018년 재개장하였으며 주변에 해양드라마세트장, 로봇랜드 등 관광명소들이 있어 해수욕과 함께 관광을 겸할 수 있다.' },
  { root: '경화역공원', tag_1: '벚꽃', tag_2: '열치', title: '경화역공원', description: '경남의 벚꽃명소로 유명해진 경화역은 경남 창원시 진해구 경화동에 있는 작은 간이역으로 2006년부터 여객업무는 하지 않고 있다. 성주사역과 진해역 사이에 위치하고 있으며 철길따라 쭉 펼쳐진 벚꽃이 터널을 이루어, 안민고개나 진해 여좌천 다리와 함께 벚꽃 사진명소로도 유명하다.벚꽃이 만발한 철길 위를 자유롭게 거닐 수 있으며, 벚꽃이 떨어질때면 철길에 흩날리는 벚꽃이 환상적인 낭만을 느끼게 해준다. 영화 소년, 천국에 가다와 드라마 봄의 왈츠 촬영지인 경화역에서 세화여고까지 이어지는 약 800ｍ 철로변 벚꽃은 여좌천보다 한가하게 벚꽃을 즐길 수 있어 연인들과 가족단위 관광객들이 많이 찾고 있다. 매년 벚꽃이 필 무렵이면 구경하러 오는 관광객들이 점차 늘어나 2009년에는 군항제 기간에만 일시적으로 여객업무를 재개하기도 하였다. '}
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