import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./Hospital.scss";

interface Hospital {
  name: string;
  phone_number: string;
  address: string;
}

function HospitalLoading() {
  return (
    <div className="hospital-loading">
      <span className="spinner"></span>
      <span className="spinner"></span>
      <span className="spinner"></span>
    </div>
  );
}

function HospitalList() {
  const fetchHospitalWithCurLocation = async () => {
    let location: string = "서울 강남";
    let [lat, lon] = [0, 0];
    await new Promise((resolve: PositionCallback) =>
      navigator.geolocation.getCurrentPosition(resolve)
    ) //비동기 Geolocation API 정보 - 위도/경도 GET
      .then((pos: GeolocationPosition) => {
        [lat, lon] = [pos.coords.latitude, pos.coords.longitude];
      });
    await axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
        {
          //카카오맵 주소 API GET
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
          },
        }
      )
      .then((res) => {
        location = res.data.documents[0].address.address_name.split(" ")[2];
        console.log("location:", location);
      });
    return await axios.get(`/api/hospital/${location}`).then((res) => res.data); // 백엔드 웹크롤링 결과 GET
  };

  const {
    data: hospitalList,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["hospital"],
    queryFn: fetchHospitalWithCurLocation,
  });

  return isPending ? (
    <HospitalLoading />
  ) : isError ? (
    <h1>오류가 발생했습니다. 나중에 다시 시도해 주세요</h1>
  ) : (
    hospitalList.map((v: Hospital) => {
      return (
        <div className="hospital" key={v.name}>
          <h2>{v.name}</h2>
          <span>{v.address}</span>
          <p>
            ℡ <strong>{v.phone_number}</strong>
          </p>
        </div>
      );
    })
  );
}

export default function Hostpital() {
  return (
    <section>
      <div className="hospital-container">
        <div className="hospital">
          <h1>
            당신이 힘들 때, 우리는 여기 있어요.
            <br />
            어떤 어려움이든 함께 극복해 나가요.
          </h1>
        </div>
        <HospitalList />
      </div>
    </section>
  );
}
