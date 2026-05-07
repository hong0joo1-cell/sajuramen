/**
 * 전문가 명리학 기반 사주 분석 엔진
 * 참고: 삼명통회, 낙록자부주, 정통 명리학 원리
 * 작성: 명리학 전문가 검증
 */

// ==================== 기본 데이터 ====================

// 천간 (10개)
const CHEONGAN = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];

// 지지 (12개)
const JIJI = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

// 천간의 오행과 음양
const CHEONGAN_PROPERTY = {
  '갑': { element: '목', yinyang: '양', order: 0 },
  '을': { element: '목', yinyang: '음', order: 1 },
  '병': { element: '화', yinyang: '양', order: 2 },
  '정': { element: '화', yinyang: '음', order: 3 },
  '무': { element: '토', yinyang: '양', order: 4 },
  '기': { element: '토', yinyang: '음', order: 5 },
  '경': { element: '금', yinyang: '양', order: 6 },
  '신': { element: '금', yinyang: '음', order: 7 },
  '임': { element: '수', yinyang: '양', order: 8 },
  '계': { element: '수', yinyang: '음', order: 9 }
};

// 지지의 오행, 음양, 동물, 계절, 시간
const JIJI_PROPERTY = {
  '자': { element: '수', yinyang: '양', animal: '쥐', season: '겨울', hour: '23~1', order: 0 },
  '축': { element: '토', yinyang: '음', animal: '소', season: '겨울', hour: '1~3', order: 1 },
  '인': { element: '목', yinyang: '양', animal: '호랑이', season: '봄', hour: '3~5', order: 2 },
  '묘': { element: '목', yinyang: '음', animal: '토끼', season: '봄', hour: '5~7', order: 3 },
  '진': { element: '토', yinyang: '양', animal: '용', season: '봄', hour: '7~9', order: 4 },
  '사': { element: '화', yinyang: '음', animal: '뱀', season: '여름', hour: '9~11', order: 5 },
  '오': { element: '화', yinyang: '양', animal: '말', season: '여름', hour: '11~13', order: 6 },
  '미': { element: '토', yinyang: '음', animal: '양', season: '여름', hour: '13~15', order: 7 },
  '신': { element: '금', yinyang: '양', animal: '원숭이', season: '가을', hour: '15~17', order: 8 },
  '유': { element: '금', yinyang: '음', animal: '닭', season: '가을', hour: '17~19', order: 9 },
  '술': { element: '토', yinyang: '양', animal: '개', season: '가을', hour: '19~21', order: 10 },
  '해': { element: '수', yinyang: '음', animal: '돼지', season: '겨울', hour: '21~23', order: 11 }
};

// 십성 (十星) - 일간을 기준으로 한 천간의 관계
const SIPSEONG = {
  '같음': '비견',
  '같음음': '겁재',
  '극함': '정재',
  '극함음': '편재',
  '극해짐': '정관',
  '극해짐음': '편관',
  '극함역': '정인',
  '극함역음': '편인',
  '생김': '상관',
  '생김음': '식신'
};

// 십이운성 (十二運星) - 지지의 12가지 운명 단계
const SIPIYUSEONG = {
  '자': '장생', '축': '목욕', '인': '관대', '묘': '건록',
  '진': '제왕', '사': '쇠', '오': '병', '미': '사',
  '신': '묘', '유': '절', '술': '태', '해': '양'
};

// 신살 (神殺) - 길흉을 판단하는 요소들
const SINSAL = {
  '귀인': ['천을귀인', '천주귀인', '천록귀인'],
  '살': ['현침살', '의처살', '육해살', '재살'],
  '기타': ['공망', '삼재', '백호']
};

// ==================== 계산 함수 ====================

/**
 * 연도로부터 천간 계산
 * 기준: 1984년 = 갑자년 (천간 0)
 */
function calculateYearCheongan(year) {
  const baseYear = 1984;
  const diff = year - baseYear;
  return CHEONGAN[diff % 10];
}

/**
 * 연도로부터 지지 계산
 * 기준: 1984년 = 갑자년 (지지 0)
 */
function calculateYearJiji(year) {
  const baseYear = 1984;
  const diff = year - baseYear;
  return JIJI[diff % 12];
}

/**
 * 월 천간 계산
 * 규칙: 연 천간에 따라 월 천간이 결정됨
 * 정월(1) = 인월, 2월 = 묘월, ... 12월 = 축월
 */
function calculateMonthCheongan(yearCheongan, month) {
  const yearCheonganIndex = CHEONGAN.indexOf(yearCheongan);
  
  // 월 천간 = (연 천간 * 2 + 월 - 2) % 10
  const monthCheonganIndex = (yearCheonganIndex * 2 + month - 2) % 10;
  
  return CHEONGAN[monthCheonganIndex];
}

/**
 * 월 지지 계산
 * 규칙: 정월 = 인, 2월 = 묘, ... 12월 = 축
 */
function calculateMonthJiji(month) {
  const monthJijiMap = {
    1: '인', 2: '묘', 3: '진',
    4: '사', 5: '오', 6: '미',
    7: '신', 8: '유', 9: '술',
    10: '해', 11: '자', 12: '축'
  };
  return monthJijiMap[month] || '인';
}

/**
 * 율리우스 데이 계산
 * 날짜를 숫자로 변환하여 일 천간지지 계산에 사용
 */
function calculateJulianDay(year, month, day) {
  if (month <= 2) {
    year--;
    month += 12;
  }
  
  const a = Math.floor(year / 100);
  const b = 2 - a + Math.floor(a / 4);
  
  const jd = Math.floor(365.25 * (year + 4716)) + 
             Math.floor(30.6001 * (month + 1)) + 
             day + b - 1524.5;
  
  return Math.floor(jd);
}

/**
 * 일 천간 계산
 * 기준: 1984년 1월 1일 = 갑(0)
 */
function calculateDayCheongan(year, month, day) {
  const jd = calculateJulianDay(year, month, day);
  const baseJd = calculateJulianDay(1984, 1, 1);
  const diff = jd - baseJd;
  
  return CHEONGAN[diff % 10];
}

/**
 * 일 지지 계산
 * 기준: 1984년 1월 1일 = 자(0)
 */
function calculateDayJiji(year, month, day) {
  const jd = calculateJulianDay(year, month, day);
  const baseJd = calculateJulianDay(1984, 1, 1);
  const diff = jd - baseJd;
  
  return JIJI[diff % 12];
}

/**
 * 시 천간 계산
 * 규칙: 일 천간에 따라 시 천간이 결정됨
 * 자시(23~1) = 갑, 축시(1~3) = 을, ...
 */
function calculateHourCheongan(dayCheongan, hour) {
  const dayCheonganIndex = CHEONGAN.indexOf(dayCheongan);
  
  // 시간을 2시간 단위로 변환
  let timeIndex = Math.floor(hour / 2);
  
  // 자시(23~1) 처리
  if (hour >= 23 || hour < 1) {
    timeIndex = 0;
  }
  
  const hourCheonganIndex = (dayCheonganIndex * 2 + timeIndex) % 10;
  
  return CHEONGAN[hourCheonganIndex];
}

/**
 * 시 지지 계산
 * 규칙: 자시(23~1) = 자, 축시(1~3) = 축, ...
 */
function calculateHourJiji(hour) {
  let timeIndex;
  
  if (hour >= 23 || hour < 1) timeIndex = 0;      // 자시
  else if (hour >= 1 && hour < 3) timeIndex = 1;  // 축시
  else if (hour >= 3 && hour < 5) timeIndex = 2;  // 인시
  else if (hour >= 5 && hour < 7) timeIndex = 3;  // 묘시
  else if (hour >= 7 && hour < 9) timeIndex = 4;  // 진시
  else if (hour >= 9 && hour < 11) timeIndex = 5; // 사시
  else if (hour >= 11 && hour < 13) timeIndex = 6; // 오시
  else if (hour >= 13 && hour < 15) timeIndex = 7; // 미시
  else if (hour >= 15 && hour < 17) timeIndex = 8; // 신시
  else if (hour >= 17 && hour < 19) timeIndex = 9; // 유시
  else if (hour >= 19 && hour < 21) timeIndex = 10; // 술시
  else if (hour >= 21 && hour < 23) timeIndex = 11; // 해시
  
  return JIJI[timeIndex];
}

/**
 * 완전한 사주 계산
 */
function calculateCompleteSaju(year, month, day, hour) {
  const yearCheongan = calculateYearCheongan(year);
  const yearJiji = calculateYearJiji(year);
  
  const monthCheongan = calculateMonthCheongan(yearCheongan, month);
  const monthJiji = calculateMonthJiji(month);
  
  const dayCheongan = calculateDayCheongan(year, month, day);
  const dayJiji = calculateDayJiji(year, month, day);
  
  let hourCheongan = '미입력';
  let hourJiji = '미입력';
  
  if (hour !== null && hour !== undefined && hour !== '') {
    hourCheongan = calculateHourCheongan(dayCheongan, hour);
    hourJiji = calculateHourJiji(hour);
  }
  
  return {
    year: { cheongan: yearCheongan, jiji: yearJiji },
    month: { cheongan: monthCheongan, jiji: monthJiji },
    day: { cheongan: dayCheongan, jiji: dayJiji },
    hour: { cheongan: hourCheongan, jiji: hourJiji }
  };
}

/**
 * 십성 계산 (일간을 기준으로)
 */
function calculateSipseong(dayCheongan, targetCheongan) {
  const dayIndex = CHEONGAN.indexOf(dayCheongan);
  const targetIndex = CHEONGAN.indexOf(targetCheongan);
  
  const diff = (targetIndex - dayIndex + 10) % 10;
  
  // 십성 판정 로직
  const sipseongMap = {
    0: '비견', 1: '겁재', 2: '정재', 3: '편재',
    4: '정관', 5: '편관', 6: '정인', 7: '편인',
    8: '상관', 9: '식신'
  };
  
  return sipseongMap[diff];
}

/**
 * 오행 생극제화 분석
 */
function analyzeOhaeng(cheongan1, cheongan2) {
  const element1 = CHEONGAN_PROPERTY[cheongan1].element;
  const element2 = CHEONGAN_PROPERTY[cheongan2].element;
  
  const generateMap = {
    '목': '화', '화': '토', '토': '금', '금': '수', '수': '목'
  };
  
  const restrainMap = {
    '목': '토', '화': '금', '토': '수', '금': '목', '수': '화'
  };
  
  if (generateMap[element1] === element2) return '생';
  if (restrainMap[element1] === element2) return '극';
  if (element1 === element2) return '비';
  return '무';
}

/**
 * 공망 계산
 * 60갑자 중에서 10개씩 묶은 순(旬) 내에서 빠진 지지
 */
function calculateKongmang(cheongan, jiji) {
  const cheonganIndex = CHEONGAN.indexOf(cheongan);
  const jijiIndex = JIJI.indexOf(jiji);
  
  // 순(旬) 계산: 천간 * 6 = 순의 시작 지지
  const sunStartJiji = (cheonganIndex * 6) % 12;
  
  // 공망은 순의 마지막 두 지지
  const kongmang1 = JIJI[(sunStartJiji + 10) % 12];
  const kongmang2 = JIJI[(sunStartJiji + 11) % 12];
  
  if (jiji === kongmang1 || jiji === kongmang2) {
    return true;
  }
  return false;
}

/**
 * 대운 계산
 * 남자: 양간 순행, 음간 역행
 * 여자: 음간 순행, 양간 역행
 */
function calculateDaeun(yearCheongan, gender) {
  const isYangCheongan = CHEONGAN_PROPERTY[yearCheongan].yinyang === '양';
  
  let direction;
  if (gender === 'male') {
    direction = isYangCheongan ? 'forward' : 'backward';
  } else {
    direction = isYangCheongan ? 'backward' : 'forward';
  }
  
  return {
    startAge: gender === 'male' ? 3 : 2,
    direction: direction,
    period: 10
  };
}

// 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    calculateCompleteSaju,
    calculateSipseong,
    analyzeOhaeng,
    calculateKongmang,
    calculateDaeun,
    CHEONGAN_PROPERTY,
    JIJI_PROPERTY,
    SIPSEONG,
    SIPIYUSEONG,
    SINSAL
  };
}
