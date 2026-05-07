/**
 * 전문가 명리학 기반 사주 분석 애플리케이션
 */

// 페이지 전환
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  document.getElementById(pageName).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  const buttons = document.querySelectorAll('.nav-btn');
  const pageNames = ['home', 'analysis', 'result'];
  const index = pageNames.indexOf(pageName);
  if (index !== -1 && buttons[index]) {
    buttons[index].classList.add('active');
  }

  window.scrollTo(0, 0);
}

// 분석 폼 제출
function handleAnalysis(event) {
  event.preventDefault();

  try {
    const name = document.getElementById('name').value.trim();
    const year = parseInt(document.getElementById('year').value);
    const month = parseInt(document.getElementById('month').value);
    const day = parseInt(document.getElementById('day').value);
    const birthType = document.getElementById('birthType').value;
    const birthTime = document.getElementById('birthTime').value.trim();
    const ampm = document.getElementById('ampm').value;

    // 입력값 검증
    if (!name) {
      alert('이름을 입력해주세요.');
      return;
    }

    if (isNaN(year) || year < 1900 || year > 2024) {
      alert('올바른 연도를 입력해주세요. (1900~2024)');
      return;
    }

    if (isNaN(month) || month < 1 || month > 12) {
      alert('올바른 월을 입력해주세요. (1~12)');
      return;
    }

    if (isNaN(day) || day < 1 || day > 31) {
      alert('올바른 일을 입력해주세요. (1~31)');
      return;
    }

    // 시간 파싱
    let hour = null;
    if (birthTime) {
      const timeParts = birthTime.split(':');
      if (timeParts.length > 0) {
        hour = parseInt(timeParts[0]);
        if (ampm === 'PM' && hour !== 12) {
          hour += 12;
        } else if (ampm === 'AM' && hour === 12) {
          hour = 0;
        }
      }
    }

    // 사주 계산
    const saju = calculateCompleteSaju(year, month, day, hour);
    const dayCheongan = saju.day.cheongan;
    const dayJiji = saju.day.jiji;

    // 분석 데이터
    const cheonganData = CHEONGAN_ANALYSIS[dayCheongan];
    const jijiData = JIJI_ANALYSIS[dayJiji];

    // 결과 HTML 생성
    let html = generateResultHTML({
      name,
      year,
      month,
      day,
      birthType,
      birthTime,
      ampm,
      saju,
      dayCheongan,
      dayJiji,
      cheonganData,
      jijiData
    });

    document.getElementById('resultContent').innerHTML = html;
    showPage('result');
  } catch (error) {
    console.error('분석 오류:', error);
    alert('분석 중 오류가 발생했습니다. 입력값을 확인해주세요.');
  }
}

// 결과 HTML 생성
function generateResultHTML(data) {
  const {
    name, year, month, day, birthType, birthTime, ampm,
    saju, dayCheongan, dayJiji, cheonganData, jijiData
  } = data;

  let html = `
    <div class="result-header">
      <h2>${name}님의 사주 분석</h2>
      <p>${year}년 ${month}월 ${day}일 (${birthType === 'solar' ? '양력' : '음력'}) ${birthTime ? `${ampm === 'AM' ? '오전' : '오후'} ${birthTime}` : ''}</p>
    </div>

    <div class="result-section">
      <h3>📊 기본 정보 (사주팔자)</h3>
      <div class="result-grid">
        <div class="result-item">
          <h5>연주 (年柱)</h5>
          <p><strong>${saju.year.cheongan}${saju.year.jiji}</strong></p>
        </div>
        <div class="result-item">
          <h5>월주 (月柱)</h5>
          <p><strong>${saju.month.cheongan}${saju.month.jiji}</strong></p>
        </div>
        <div class="result-item">
          <h5>일주 (日柱)</h5>
          <p><strong>${saju.day.cheongan}${saju.day.jiji}</strong></p>
        </div>
        <div class="result-item">
          <h5>시주 (時柱)</h5>
          <p><strong>${saju.hour.cheongan}${saju.hour.jiji}</strong></p>
        </div>
      </div>
    </div>

    <div class="result-section">
      <h3>🎭 일간 분석 (日干分析)</h3>
      <div class="result-grid">
        <div class="result-item">
          <h5>일간</h5>
          <p><strong>${dayCheongan}</strong></p>
          <p>${cheonganData.name}</p>
          <p style="font-size: 0.85rem; color: #999; margin-top: 0.5rem;">${cheonganData.symbol}</p>
        </div>
        <div class="result-item">
          <h5>오행</h5>
          <p><strong>${cheonganData.element}</strong></p>
          <p>${CHEONGAN_PROPERTY[dayCheongan].yinyang}</p>
        </div>
        <div class="result-item">
          <h5>일지</h5>
          <p><strong>${dayJiji}</strong></p>
          <p>${jijiData.name}</p>
        </div>
        <div class="result-item">
          <h5>계절</h5>
          <p><strong>${jijiData.season}</strong></p>
          <p>${jijiData.hour}</p>
        </div>
      </div>
    </div>

    <div class="result-section">
      <h3>💭 성격 분석</h3>
      <div class="result-item">
        <h5>핵심 성격</h5>
        <p>${cheonganData.personality}</p>
      </div>
      <div class="result-grid" style="margin-top: 1.5rem;">
        <div class="result-item">
          <h5>강점</h5>
          <ul>
            ${cheonganData.strength.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div class="result-item">
          <h5>약점</h5>
          <ul>
            ${cheonganData.weakness.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
      </div>
    </div>

    <div class="result-section">
      <h3>💼 직업 운세</h3>
      <div class="result-item">
        <h5>적합한 직업</h5>
        <ul>
          ${cheonganData.career.map(job => `<li>${job}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="result-section">
      <h3>❤️ 연애 운세</h3>
      <div class="result-item">
        <p>${cheonganData.love}</p>
      </div>
    </div>

    <div class="result-section">
      <h3>💪 건강 운세</h3>
      <div class="result-item">
        <p>${cheonganData.health}</p>
      </div>
    </div>

    <div class="result-section">
      <h3>💰 재물 운세</h3>
      <div class="result-item">
        <p>${cheonganData.wealth}</p>
      </div>
    </div>

    <div class="result-section">
      <h3>🌍 오행 정보</h3>
      <div class="result-grid">
        <div class="result-item">
          <h5>오행의 의미</h5>
          <p>${OHAENG_ANALYSIS[cheonganData.element].meaning}</p>
        </div>
        <div class="result-item">
          <h5>행운의 색상</h5>
          <p>${OHAENG_ANALYSIS[cheonganData.element].color.join(', ')}</p>
        </div>
        <div class="result-item">
          <h5>행운의 숫자</h5>
          <p>${OHAENG_ANALYSIS[cheonganData.element].number.join(', ')}</p>
        </div>
        <div class="result-item">
          <h5>행운의 방향</h5>
          <p>${OHAENG_ANALYSIS[cheonganData.element].direction}</p>
        </div>
      </div>
    </div>

    <div class="result-section">
      <h3>📋 인생 운세</h3>
      <div class="result-item">
        <p>${cheonganData.fortune}</p>
      </div>
    </div>

    <div style="text-align: center; margin-top: 2rem; display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
      <button class="btn btn-primary" onclick="showPage('analysis')">다시 분석하기</button>
      <button class="btn btn-primary" onclick="window.print()">인쇄하기</button>
    </div>

    <div class="info-box" style="margin-top: 2rem;">
      <p><strong>📌 주의사항:</strong> 본 분석은 전통 명리학을 기반으로 하며 오락 및 참고용입니다. 중요한 결정은 전문가와 상담하시기 바랍니다.</p>
    </div>
  `;

  return html;
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('analysisForm');
  if (form) {
    form.addEventListener('submit', handleAnalysis);
  }

  // 초기 페이지 설정
  showPage('home');
});
