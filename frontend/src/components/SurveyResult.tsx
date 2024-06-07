import { Bar, Radar } from "react-chartjs-2";
import { useAppSelector } from "../redux/store";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, RadialLinearScale, Filler, BarElement } from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const radarOptions = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      font: { size: 20, family: 'IBM Plex Sans KR' },
      color: '#031224',
      display: true,
      text: '항목 별 지수',
    },
  },
  scales: {
    r: {
      beginAtZero: true, //0에서 시작
      suggestedMax: 10,
      grid: {
        // color: ['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.1)']
      },
      ticks: {
        // color: '#031224',
        backdropColor: 'transparent' //틱 배경 투명
      }
    }
  },
}

const barOptions = {
  plugins: {
    legend: {
      display: false,
    },
    title: {
      font: { size: 20, family: 'IBM Plex Sans KR' },
      color: '#031224',
      display: true,
      text: '평균과 비교하면?',
    },
    scales: {
      y: {
      },
    }
  }
}

export default function SurveyResult() {
  const survey = useAppSelector(state => state.survey);
  const { totalScore, olsResult, ...chartResult } = survey.result;
  const radarData = {
    labels: Object.keys(chartResult),
    datasets: [{
      data: Object.values(chartResult),
      backgroundColor: '#82cdf750',
      borderColor: '#82cdf7',
      borderWidth: 1,
      pointBackgroundColor: '#2259a180',
    }],
  };
  const barData = {
    labels: ['내 지수', '평균'],
    datasets: [{
      data: [olsResult, 52],
      backgroundColor: ['#2259a180', '#82cdf750'],
      borderColor: ['#2259a1','#82cdf7'],
      borderWidth: 1,
    }]
  }
  return (
    <div>
      <h1>당신의 햅비지수는 <strong>'{totalScore}'</strong>점</h1>
      <div className='chart'>
        <Radar data={radarData} options={radarOptions} />
      </div>
      <div className='chart'>
        <Bar data={barData} options={barOptions} />
        <span>평균보다 약 {Math.floor(olsResult - 52)>0?`${Math.floor(olsResult - 52)}점 높습니다.`:`${-Math.floor(olsResult - 52)}점 낮습니다.`}</span>
      </div>
    </div>
  );
}