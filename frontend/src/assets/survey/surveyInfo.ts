const surveyList = {
  경제: [
    "나는 돈을 쓰는 일에 만족한다.",
    "지금 내가 갖고 있는 돈의 절대적인 액수에 상관없이 나는 부자라고 생각한다.",
    "내 인생의 여건은 아주 좋은 편인다.",
    "나의 현재 경제적 상태는 안정적이다.",
    "나의 경제적 상태에 대해 만족한다.",
    "나는 매달 정기적으로 저축을 하고 있다.",
    "나는 현재의 수입으로 생활에 만족하고 있다.",
    "나는 불확실한 경제 상황에도 불구하고 미래에 대한 경제적인 기대를 가지고 있다.",
    "나는 미래에 대한 경제적인 계획이 있다.",
  ],
  관계: [
    "나는 가족과의 관계에 있어서 서로 돕는 동반자라 여긴다.",
    "나는 갈등이 생겼을 때 시간이 걸리더라도 대화로 풀려고 애쓴다.",
    "나는 부모, 부부 관계에 있어 아주 만족한다.",
    "나는 친구, 동료 관계에 있어 아주 만족한다.",
    "나는 가족들의 생일과 결혼기념일 등을 꼬박꼬박 챙기며 외식과 선물을 잘주고 받는다.",
    "나는 가족들과 자주 대화하는 것을 즐겨한다.",
    "가족 중 한 사람이 불의의 사고를 당했을 때 최선을 다해 도움을 줄 것이다.",
    "나는 주변에 마음을 나누고 도움을 주고받을 수 있는 친구나 동료들이 있다.",
    "나는 일주일에 한 번 꼴로 이웃들을 초대하며 그들과 교제하는 것이 즐겁다.",
    "나는 다른 사람과 즐겁게 지낸다.",
    "사람들이 나에게 일어나는 일에 대해 관심이 있다고 생각된다.",
    "나는 사람들과 어울리는 일이 재미있고 내 생활은 활기차 있다.",
    "나는 주위 환경 변화에 대해서 별 거부감 없는 편이다.",
    "나는 다른 사람들에 대해 크게 흥미가 있다.",
    "나는 거의 모든 사람들에게 아주 따뜻한 감정을 느낀다.",
    "나는 언제나 다른 사람들에게 유쾌한 영향을 미친다.",
  ],
  자유: [
    "나는 가정 안에서 가정예배와 기도를 정기적인 기도와 가정예배를 드리고 있다.",
    "나는 나의 삶에 대한 통제권이 있다.",
    "정말로 노력한다면, 나는 내 문제의 대부분을 극복할 수 있다.",
    "다른 사람들이 좋아하지 않는 내 모습도 사랑할 수 있다.",
    "할 수만 있다면 나 자신에 대해 변하고 싶은 것들이 많이 있다.",
    "나의 인생관은 긍정적이어서 실패하더라도 오뚝이처럼 일어난다.",
    "내 자신이 삶의 주인공이라는 믿음으로 어떤 상황에서도 자기조절을 잘하는 편이다.",
    "나는 신체적으로 그리고/혹은 정신적으로 건강하며 하루하루가 즐거운 편이다.",
    "내가 무언가에 성공한다면, 운이 따라준 결과라고 생각한다.",
    "나는 좋아하는 취미나 여가 활동을 규칙적으로 하고 있다.",
    "나는 현재의 교육 수준에 만족하고 있다.",
    "나는 일상생활에서 벗어나 자유롭게 행동하고 싶은 때가 자주 있다.",
  ],
  감정: [
    "나는 지금, 얼마나 스트레스를 받고 있다.",
    "나는 지금 지루한 감정을 느끼고 있다. ",
    "나는 지금 짜증나고 스트레스를 받고 있다.",
    "나는 지금 즐겁고 행복한 감정을 가지고 있다.",
    "나는 지금 평안한 감정을 느끼고 있다. ",
    "나는 지금 우울하지 않고 즐겁다",
    "나는 요즘 불안한 감정이 거의 없다.",
    "나는 다른 사람들보다 행복하다고 생각된다.",
    "나는 자주 우울한 기분에 빠져도 잘 극복할 수 있다.",
    "나는 하루 중 대부분의 시간이 평안하고 즐겁다.",
    "나는 잘 잤다는 기분으로 일어난다.",
    "나는 언제나 헌신하며 참여한다.",
    "나는 많이 웃는다.",
    "나는 매우 행복하다.",
    "나는 가끔 어떤 것들에서 아름다움을 발견하다.",
    "나는 큰 에너지를 가지고 있다고 느낀다.",
    "나는 기쁨과 환희를 자주 느낀다.",
    "나는 외롭다고 느껴져서 고통을 받을 때가 거의 없다.",
    "이 세상에 나를 진실로 사랑하는 사람이 많다.",
    "나는 목표나 목적을 달성하는데 성공한 경험이 많다.",
    "나는 뚜렷한 이유 없이 신이난다.",
    "나는 매사에 즐거움이 느껴지는 때가 자주 있다.",
    "나는 대부분의 사람들만큼 자주 미소 짓거나 웃는다.",
  ],
  "삶의 만족도": [
    "나는 의미 있는 삶을 살고 있다고 느낀다.",
    "나의 생활이 대체로 만족스럽다.",
    "나의 미래를 생각하면 희망차게 느껴진다.",
    "나는 세상에서 특별한 의미있는 존재라고 느껴진다.",
    "나는 삶에 특별한 의미나 목적을 가지고 있을 것이라 생각한다.",
    "나 스스로 돌이켜 보면 이 세상에 태어나길 잘했다고 생각한다.",
    "인생에 대한 분명한 비전과 희망이 있으며 그 꿈을 이루기 위해 최선을 다한다.",
    "다시 태어난다 해도, 나는 지금처럼 살아갈 것이다.",
    "나는 자신에 별로 만족하지 않는다.나는 삶이 아주 보람 있다고 느낀다.",
    "나는 미래에 대해서 별로 낙관적이다.",
    "나는 매사가 재미있다고 생각한다.",
    "나는 사는게 좋다.",
    "나는 삶 속에서 모든 일에 만족하다.",
    "나는 내 모습이 매력적이라고 생각하지 않는다.",
    "나는 과거에 대해서 특별히 행복한 기억을 갖고 있다.",
    "나는 내 삶을 별로 통제할 수 있다고 느낀다.",
    "나는 하고 싶은 모든 일에 시간을 할애할 수 있다.",
    "나의 삶은 항상 재미있는 생활의 연속이다.",
    "이 세상은 나의 삶과 의미 있게 조화를 잘 이루고 있다.",
    "나는 인생의 의의와 목적을 지닌 아주 가치 있는 존재이다.",
    "나는 인생목표를 달성하기 위하여 모든 것을 만족하게 추진하고 있다.",
    "나는 평소 삶의 의욕이 넘친다.",
    "나는 다시 태어나도 지금과 같은 인생이고 싶다.",
    "나는 죽을 각오도 되어있고 두렵지 않다.",
    "나는 뚜렷한 인생의 목표를 가지고 있다.",
    "나의 인생은 내 손에 달려있고 내가 조정하는 것이다.",
    "나는 인생의 목적을 발견할 수 있는 능력을 충분히 가지고 있다.나는 하루 생활이 날마다 새로워짐을 느낀다.",
    "나는 뚜렷하고 만족스러운 인생의 사명감이 있다.",
    "나는 이 세상에 살고 있는 이유를 항상 잘 알고 있다.",
    "나는 자살에 대해 생각해 본 적이 없다.",
    "나는 대단히 책임성이 강한 사람이다.",
    "나의 생활은 아주 즐겁고 행복한 일로 가득 차 있다.",
    "오늘 내가 죽더라도 내 인생은 대단히 보람이 있었다고 생각한다.",
    "나는 매일 할 일을 대할 때마다 즐거움과 만족감을 느낀다.",
    "인간은 자신의 인생에서 절대적인 선택의 자유를 가지고 있다.",
    "나이가 들어 직장을 그만두면 내가 평소에 하고 싶은 일을 하고 싶다.",
  ],
};

export const scoreMean = [
  {
    age: "20",
    total: "52",
    life_satisfaction: "58", //삶의 만족도
    meaning_of_life: "55", //관계
    stress: "60", //자유
    emotional_balance: "53", //감정
  },
  {
    age: "30",
    total: "54",
    life_satisfaction: "58",
    meaning_of_life: "56",
    stress: "61",
    emotional_balance: "54",
  },
  {
    age: "40",
    total: "54",
    life_satisfaction: "60",
    meaning_of_life: "58",
    stress: "63",
    emotional_balance: "54",
  },
  {
    age: "50",
    total: "58",
    life_satisfaction: "63",
    meaning_of_life: "62",
    stress: "58",
    emotional_balance: "58",
  },
  {
    age: "60",
    total: "55",
    life_satisfaction: "62",
    meaning_of_life: "57",
    stress: "57",
    emotional_balance: "55",
  },
];

const pickRandomList = (arr: string[], pickNum: number) => {
  //arr : 뽑는 대상 배열
  //pickNum : 뽑는 개수
  const randomIndex: number[] = [];
  for (let pickCnt = 0; pickCnt < pickNum; ) {
    const random = Math.floor(Math.random() * arr.length); // 0 ~ arr.length-1 사이의 정수 출력
    if (randomIndex.includes(random))
      //중복되면 다시 뽑음
      continue;
    randomIndex.push(random);
    pickCnt++;
  }
  const randomList: string[] = [];
  randomIndex.forEach((v) => randomList.push(arr[v]));
  return randomList;
};

export const createSurvey = () => {
  const surveyResult: string[] = [];
  for (const [key, value] of Object.entries(surveyList)) {
    let pickNum: number;
    if (key === "economy" || key === "relationship" || key === "freedom")
      //경제, 관계, 자유는 2개 랜덤 선별
      pickNum = 2;
    // 감정, 삶의 만족도는 4개 랜덤 선별
    else pickNum = 4;
    pickRandomList(value, pickNum).forEach((v) => surveyResult.push(v));
  }
  console.log("createSurvey: ", surveyResult);
  return surveyResult; //14개의 설문 반환
};

// const surveyCoef = [2.06, 0.88, 2.5, 2, 5, 1.55];
const coefs = [0.879583, 1.547087, 2.059342, 1.4042];

export interface SurveyResult {
  totalScore: number;
  olsResult: number;
  economy: number; //0.879583
  relationship: number; //1.547087
  freedom: number; //2.059342
  emotion: number;
  life: number;
}

export const calculateResult = (answer: number[]) => {
  const result: SurveyResult = {
    totalScore: 0,
    olsResult: 0,
    economy: 0,
    relationship: 0,
    freedom: 0,
    emotion: 0,
    life: 0,
  };
  result.totalScore = answer.reduce((prev, cur, i) => {
    if (i < 2) result.economy += cur / 2;
    else if (i < 4) result.relationship += cur / 2;
    else if (i < 6) result.freedom += cur / 2;
    else if (i < 10) result.emotion += cur / 4;
    else result.life += cur / 4;
    return prev + cur;
  }, 0);
  result.olsResult =
    ((result.economy / 10) * coefs[0] +
      (result.relationship / 10) * coefs[1] +
      (result.freedom / 10) * coefs[2] +
      coefs[3]) *
    10;
  console.table(result);
  return result;
};
