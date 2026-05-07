/**
 * 명리학 전문가 기반 분석 데이터
 * 참고: 정통 명리학 원리, 삼명통회, 낙록자부주
 */

// 천간별 상세 분석
const CHEONGAN_ANALYSIS = {
  '갑': {
    name: '갑목(甲木)',
    symbol: '양목(陽木)',
    meaning: '큰 나무, 숲',
    personality: '진취적이고 리더십이 있으며 정직하고 책임감이 강함',
    strength: ['진취성', '정직함', '책임감', '추진력', '용감함'],
    weakness: ['고집', '완고함', '과도한 자신감', '성급함'],
    career: ['경영', '정치', '법률', '교육', '공무원', '건설'],
    love: '진지하고 책임감 있는 연애, 가정을 중시',
    health: '목 건강에 주의, 간 건강 관리 필요',
    wealth: '꾸준한 재물 증가, 부동산 운 좋음',
    fortune: '초년 고생, 중년 발전, 만년 안정'
  },
  '을': {
    name: '을목(乙木)',
    symbol: '음목(陰木)',
    meaning: '작은 나무, 풀',
    personality: '유연하고 감수성 풍부하며 창의적이고 친화력이 좋음',
    strength: ['유연성', '감수성', '창의성', '친화력', '섬세함'],
    weakness: ['우유부단함', '소극성', '감정 기복', '의존성'],
    career: ['예술', '문학', '디자인', '상담', '음악', '교육'],
    love: '감정적이고 섬세한 연애, 로맨틱함',
    health: '신경 건강에 주의, 스트레스 관리 필요',
    wealth: '변동하는 재물, 창의적 수입원 개발',
    fortune: '초년 순탄, 중년 변화, 만년 안정'
  },
  '병': {
    name: '병화(丙火)',
    symbol: '양화(陽火)',
    meaning: '태양, 큰 불',
    personality: '활발하고 열정적이며 명랑하고 추진력이 강함',
    strength: ['열정', '활발함', '명랑함', '추진력', '용감함'],
    weakness: ['성급함', '과열', '충동성', '무분별함'],
    career: ['영업', '마케팅', '공연', '스포츠', '정치', '미디어'],
    love: '열정적이고 솔직한 연애, 표현력 풍부',
    health: '심장 건강에 주의, 혈압 관리 필요',
    wealth: '급격한 재물 변화, 사업 운 좋음',
    fortune: '초년 발전, 중년 성공, 만년 안정'
  },
  '정': {
    name: '정화(丁火)',
    symbol: '음화(陰火)',
    meaning: '촛불, 작은 불',
    personality: '차분하고 신중하며 집중력이 있고 섬세함',
    strength: ['신중함', '차분함', '집중력', '섬세함', '지혜'],
    weakness: ['과도한 신중함', '소극성', '집착', '의심'],
    career: ['연구', '학문', '의료', '공예', '상담', '종교'],
    love: '진지하고 헌신적인 연애, 깊이 있는 감정',
    health: '소화기 건강에 주의, 신경성 질환 주의',
    wealth: '안정적인 재물, 저축 성향 강함',
    fortune: '초년 고생, 중년 발전, 만년 번영'
  },
  '무': {
    name: '무토(戊土)',
    symbol: '양토(陽土)',
    meaning: '높은 산, 큰 흙',
    personality: '안정적이고 신뢰할 수 있으며 포용력이 있고 현실적',
    strength: ['안정성', '신뢰성', '포용력', '현실성', '책임감'],
    weakness: ['변화 거부', '고집', '둔함', '보수성'],
    career: ['부동산', '건설', '농업', '관리', '금융', '공무원'],
    love: '안정적이고 신뢰할 수 있는 연애, 헌신적',
    health: '소화기 건강 양호, 정기적 운동 필요',
    wealth: '부동산 재물, 안정적 수입',
    fortune: '초년 순탄, 중년 번영, 만년 안정'
  },
  '기': {
    name: '기토(己土)',
    symbol: '음토(陰土)',
    meaning: '낮은 땅, 작은 흙',
    personality: '부드럽고 배려심이 있으며 친절하고 적응력이 좋음',
    strength: ['배려심', '부드러움', '친절함', '적응력', '이해심'],
    weakness: ['우유부단함', '의존성', '자신감 부족', '소극성'],
    career: ['간호', '상담', '교육', '서비스', '요리', '미용'],
    love: '헌신적이고 배려하는 연애, 희생정신 강함',
    health: '소화기 건강에 주의, 스트레스 관리 필요',
    wealth: '안정적인 재물, 저축 성향',
    fortune: '초년 고생, 중년 발전, 만년 안정'
  },
  '경': {
    name: '경금(庚金)',
    symbol: '양금(陽金)',
    meaning: '쇠, 도끼',
    personality: '강인하고 결단력이 있으며 정의감이 있고 추진력 강함',
    strength: ['강인함', '결단력', '정의감', '추진력', '용감함'],
    weakness: ['가혹함', '경직됨', '무정함', '고집'],
    career: ['군인', '경찰', '판사', '기술자', '스포츠', '건설'],
    love: '강인하고 보호적인 연애, 신뢰감 강함',
    health: '호흡기 건강에 주의, 정기적 운동 필요',
    wealth: '급격한 재물 변화, 사업 운 좋음',
    fortune: '초년 발전, 중년 성공, 만년 안정'
  },
  '신': {
    name: '신금(辛金)',
    symbol: '음금(陰金)',
    meaning: '보석, 장식품',
    personality: '민첩하고 영리하며 적응력이 있고 창의적',
    strength: ['민첩함', '영리함', '적응력', '창의성', '섬세함'],
    weakness: ['변덕', '신뢰성 부족', '과도한 계산', '이기심'],
    career: ['무역', '금융', '기술', '통신', '디자인', '예술'],
    love: '자유로운 연애, 독립적이고 영리함',
    health: '호흡기 건강에 주의, 피부 건강 관리',
    wealth: '변동하는 재물, 창의적 수입원',
    fortune: '초년 순탄, 중년 변화, 만년 안정'
  },
  '임': {
    name: '임수(壬水)',
    symbol: '양수(陽水)',
    meaning: '큰 물, 강',
    personality: '지혜롭고 통찰력이 있으며 표현력이 좋고 적응력 강함',
    strength: ['지혜', '통찰력', '표현력', '적응력', '포용력'],
    weakness: ['우유부단함', '변덕', '감정 기복', '의존성'],
    career: ['철학', '문학', '교육', '상담', '통신', '여행'],
    love: '지적이고 깊이 있는 연애, 표현력 풍부',
    health: '신장 건강에 주의, 수분 섭취 필요',
    wealth: '변동하는 재물, 창의적 수입',
    fortune: '초년 고생, 중년 발전, 만년 번영'
  },
  '계': {
    name: '계수(癸水)',
    symbol: '음수(陰水)',
    meaning: '작은 물, 이슬',
    personality: '예민하고 민감하며 섬세하고 창의적',
    strength: ['예민함', '민감함', '섬세함', '창의성', '직관력'],
    weakness: ['과도한 걱정', '신경과민', '의심', '소극성'],
    career: ['예술', '연구', '상담', '디자인', '문학', '음악'],
    love: '섬세하고 감정적인 연애, 로맨틱함',
    health: '신장 건강에 주의, 스트레스 관리 필요',
    wealth: '안정적인 재물, 저축 성향',
    fortune: '초년 고생, 중년 발전, 만년 안정'
  }
};

// 지지별 상세 분석
const JIJI_ANALYSIS = {
  '자': {
    name: '쥐',
    element: '수',
    season: '겨울',
    hour: '23~1시',
    personality: '영리하고 민첩하며 사교성이 좋음',
    characteristic: '지혜, 민첩함, 사교성, 영리함'
  },
  '축': {
    name: '소',
    element: '토',
    season: '겨울',
    hour: '1~3시',
    personality: '성실하고 안정적이며 인내심이 강함',
    characteristic: '성실, 안정, 인내, 신뢰'
  },
  '인': {
    name: '호랑이',
    element: '목',
    season: '봄',
    hour: '3~5시',
    personality: '용감하고 진취적이며 리더십이 강함',
    characteristic: '용감, 진취, 리더십, 활발'
  },
  '묘': {
    name: '토끼',
    element: '목',
    season: '봄',
    hour: '5~7시',
    personality: '온화하고 섬세하며 예술적 감각이 좋음',
    characteristic: '온화, 섬세, 예술, 친절'
  },
  '진': {
    name: '용',
    element: '토',
    season: '봄',
    hour: '7~9시',
    personality: '웅대하고 자존심이 강하며 리더십이 있음',
    characteristic: '웅대, 자존, 리더십, 정의'
  },
  '사': {
    name: '뱀',
    element: '화',
    season: '여름',
    hour: '9~11시',
    personality: '지혜롭고 신중하며 직관력이 뛰어남',
    characteristic: '지혜, 신중, 직관, 신비'
  },
  '오': {
    name: '말',
    element: '화',
    season: '여름',
    hour: '11~13시',
    personality: '활발하고 자유로우며 사교성이 뛰어남',
    characteristic: '활발, 자유, 사교, 열정'
  },
  '미': {
    name: '양',
    element: '토',
    season: '여름',
    hour: '13~15시',
    personality: '부드럽고 감정이 풍부하며 예술적 감각이 좋음',
    characteristic: '부드러움, 감정, 예술, 배려'
  },
  '신': {
    name: '원숭이',
    element: '금',
    season: '가을',
    hour: '15~17시',
    personality: '영리하고 민첩하며 재미있는 성격',
    characteristic: '영리, 민첩, 재미, 창의'
  },
  '유': {
    name: '닭',
    element: '금',
    season: '가을',
    hour: '17~19시',
    personality: '솔직하고 정직하며 책임감이 강함',
    characteristic: '솔직, 정직, 책임, 성실'
  },
  '술': {
    name: '개',
    element: '토',
    season: '가을',
    hour: '19~21시',
    personality: '충성스럽고 신뢰할 수 있으며 정의감이 강함',
    characteristic: '충성, 신뢰, 정의, 친절'
  },
  '해': {
    name: '돼지',
    element: '수',
    season: '겨울',
    hour: '21~23시',
    personality: '순진하고 착하며 포용력이 있음',
    characteristic: '순진, 착함, 포용, 친절'
  }
};

// 오행의 특성
const OHAENG_ANALYSIS = {
  '목': {
    name: '목(木)',
    meaning: '나무, 성장',
    color: ['초록색', '파란색'],
    number: [3, 8],
    direction: '동쪽',
    season: '봄',
    organ: '간, 담',
    emotion: '분노, 화남',
    virtue: '인(仁), 자비'
  },
  '화': {
    name: '화(火)',
    meaning: '불, 열정',
    color: ['빨간색', '자주색'],
    number: [2, 7],
    direction: '남쪽',
    season: '여름',
    organ: '심장, 소장',
    emotion: '기쁨, 즐거움',
    virtue: '예(禮), 존경'
  },
  '토': {
    name: '토(土)',
    meaning: '흙, 안정',
    color: ['노란색', '갈색'],
    number: [5, 10],
    direction: '중앙',
    season: '환절기',
    organ: '비장, 위',
    emotion: '생각, 걱정',
    virtue: '신(信), 신뢰'
  },
  '금': {
    name: '금(金)',
    meaning: '금속, 정의',
    color: ['흰색', '은색'],
    number: [4, 9],
    direction: '서쪽',
    season: '가을',
    organ: '폐, 대장',
    emotion: '슬픔, 우울',
    virtue: '의(義), 정의'
  },
  '수': {
    name: '수(水)',
    meaning: '물, 지혜',
    color: ['검은색', '파란색'],
    number: [1, 6],
    direction: '북쪽',
    season: '겨울',
    organ: '신장, 방광',
    emotion: '공포, 두려움',
    virtue: '지(智), 지혜'
  }
};

// 십성의 의미
const SIPSEONG_MEANING = {
  '비견': { name: '비견(比肩)', meaning: '같은 또래, 경쟁자', type: '길' },
  '겁재': { name: '겁재(劫財)', meaning: '빼앗는 것, 손실', type: '흉' },
  '정재': { name: '정재(正財)', meaning: '정당한 재물', type: '길' },
  '편재': { name: '편재(偏財)', meaning: '부정당한 재물, 횡재', type: '길' },
  '정관': { name: '정관(正官)', meaning: '정당한 권력', type: '길' },
  '편관': { name: '편관(偏官)', meaning: '부정당한 권력, 도전', type: '흉' },
  '정인': { name: '정인(正印)', meaning: '정당한 배움', type: '길' },
  '편인': { name: '편인(偏印)', meaning: '부정당한 배움, 이상함', type: '흉' },
  '상관': { name: '상관(傷官)', meaning: '재능 표현, 도전', type: '흉' },
  '식신': { name: '식신(食神)', meaning: '재능 표현, 복', type: '길' }
};

// 십이운성의 의미
const SIPIYUSEONG_MEANING = {
  '장생': '새로운 시작, 탄생, 성장의 시작',
  '목욕': '정화, 시련, 도전',
  '관대': '성장, 발전, 번영',
  '건록': '안정, 성취, 지위',
  '제왕': '최고의 성공, 절정',
  '쇠': '쇠퇴, 변화, 전환',
  '병': '질병, 고통, 시련',
  '사': '죽음, 끝, 변화',
  '묘': '새로운 시작, 부활',
  '절': '끝, 단절, 완성',
  '태': '태어남, 시작, 가능성',
  '양': '성장, 발전, 희망'
};

// 대운의 의미
const DAEUN_MEANING = {
  '길운': '좋은 운, 발전, 성공',
  '흉운': '나쁜 운, 어려움, 도전',
  '평운': '평범한 운, 변화 없음',
  '전환운': '변화의 시기, 전환점'
};
