export interface PortfolioItem {
    id: string;
    title: string;
    category: "Branding" | "Marketing" | "Consulting" | "Website";
    client: string;
    image: string;
    slug: string;
    overview: string;
    background: string;
    strategy: string;
    results: string[];
    detailImages: string[];
}

export const PORTFOLIO_PREVIEWS: PortfolioItem[] = [
    {
        id: "p1",
        title: "성형외과 프리미엄 브랜드 아이덴티티 구축",
        category: "Branding",
        client: "A 성형외과",
        image: "/assets/images/0426453d81.jpg",
        slug: "plastic-surgery-identity",
        overview: "신규 개원하는 럭셔리 성형외과의 차별화된 브랜드 경험 및 아이덴티티 수립",
        background: "강남권에 새롭게 오픈하는 A성형외과는 VVIP 환자를 타겟으로 한 프라이빗하고 고급스러운 공간 설계가 완비되어 있었습니다. 그러나 이를 환자들에게 시각적/경험적으로 전달할 고유의 브랜드 심볼과 디자인 시스템이 부재한 상태로, 기존 병원들의 천편일률적인 이미지와 차별화할 필요가 컸습니다.",
        strategy: "환자의 아름다움을 일방적으로 디자인하는 것이 아닌, '내면의 빛을 끌어올려 조각한다'는 컨셉을 수립했습니다. 메탈릭한 로즈골드와 차분한 딥차콜 색상을 메인 컬러로 사용하여 신뢰와 고급스러움을 동시에 주었으며, 온/오프라인의 일관된 브랜드 경험 가이드라인을 작성했습니다.",
        results: [
            "기존 대비 고객 상담 시 프리미엄 브랜드 인지도 체감 향상",
            "병원의 VVIP 특화 서비스 문의 40% 증가",
            "통합 어플리케이션(봉투, 쇼핑백, 진료권 등) 제작 및 셋업 완료"
        ],
        detailImages: [
            "/assets/images/0426453d81.jpg",
            "/assets/images/2b4e00e7a2.jpg"
        ]
    },
    {
        id: "p2",
        title: "치과 전문 디지털 퍼포먼스 마케팅",
        category: "Marketing",
        client: "B 치과병원",
        image: "/assets/images/0b1667a809.jpg",
        slug: "dental-performance-marketing",
        overview: "임플란트 및 교정 고객 유치를 위한 전방위 온라인 퍼포먼스 마케팅",
        background: "B 치과병원은 뛰어난 의료진과 시설을 보유하고 있으나, 경쟁이 매우 치열한 상권에 속해 있어 신규 환자 유입이 정체되어 있었습니다. 오프라인 광고(지하철/버스)에 의존하던 기존 방식에서 벗어나, 비용 대비 효율성이 뛰어난 디지털 데이터를 바탕으로 한 환자 타겟 마케팅이 시급했습니다.",
        strategy: "광고 시청 후 체스 타임라인을 파악해 고객이탈률이 높은 랜딩 페이지 5곳의 UI/UX를 전면 개선하였습니다. 또한 네이버 파워링크, 브랜드 검색 등의 기본 SA(검색 광고) 세팅은 물론이고, Meta(페이스북/인스타그램) 및 구글 GDN을 통한 스폰서드 타겟팅의 A/B 테스트 최적화를 진행하였습니다.",
        results: [
            "온라인 광고 CPA(고객 유입 단가) 35% 절감",
            "랜딩페이지 전환율(상담 신청) 기존 대비 2.4배 향상",
            "임플란트 고관여 환자군의 병원 방문 및 예약 월평균 30건 이상 증가"
        ],
        detailImages: [
            "/assets/images/0b1667a809.jpg",
            "/assets/images/2e69e5d185.jpg"
        ]
    },
    {
        id: "p3",
        title: "한방병원 통합 경영 및 리브랜딩",
        category: "Consulting",
        client: "C 한방병원",
        image: "/assets/images/0ec143283b.jpg",
        slug: "oriental-medical-management",
        overview: "낡고 전통적인 한방병원의 이미지를 탈피하기 위한 리뉴얼 컨설팅",
        background: "30년 전통의 C 한방병원은 단골 고연령층 위주로 유지되고 있었으나 최근 MZ세대 및 트렌드에 발맞춘 체형교정 및 다이어트 클리닉의 수요를 끌어들이지 못하고 있었습니다. 낙후된 오프라인 채널 및 일원화되지 못한 메시지에 대한 토탈 진단이 필요했습니다.",
        strategy: "단순 로고 스위칭이 아닌 '현대 의료기술과 전통 한의학의 체계적 결합'을 메시지로 삼았습니다. 병원 내부 인테리어 동선 컨설팅 점검부터 의료진 프로필 리뉴얼, 원내 사이니지(간판 및 안내표지판) 교체를 총괄 기획했으며, 모든 디지털 채널의 통일된 매뉴얼을 제안했습니다.",
        results: [
            "2030 영타겟 신규 초진 환자 비율 3배 증가",
            "리브랜딩 이후 체형교정 및 다이어트 프로그램 패키지 결제율 150% 급증",
            "전체적인 원내 시각환경 개선으로 환자 불만 접수 건수 감소"
        ],
        detailImages: [
            "/assets/images/0ec143283b.jpg",
            "/assets/images/266a44e489.jpg"
        ]
    },
    {
        id: "p4",
        title: "안과 전문 병원 신규 웹사이트 구축",
        category: "Website",
        client: "D 안과의원",
        image: "/assets/images/266a44e489.jpg",
        slug: "eye-clinic-website",
        overview: "시력교정술 정보 접근성을 극대화한 사용자 중심(UX) 반응형 웹사이트",
        background: "D 안과의원의 기존 웹페이지는 PC 중심의 오래된 빌더로 제작되어 모바일 환경에서 텍스트가 깨지거나 메뉴 진입이 몹시 불편했습니다. 특히 시력 교정을 목적으로 웹사이트를 찾는 고객의 특성상 눈이 편안한 디자인과 큼직하고 접근성 좋은 UI가 필연적이었습니다.",
        strategy: "어둡거나 난색 계열을 피하고, 시각적 청량감과 투명함을 상징하는 블루/민트 계열의 컬러셋을 도입했습니다. 복잡한 수술 정보(스마일라식, 라섹, 렌즈삽입술)를 인포그래픽 중심의 모션 UI로 쉽게 풀었으며, 원클릭 퀵 메뉴를 우측 하단에 고정해 바로 카카오톡/전화 상담이 가능하게 설계했습니다.",
        results: [
            "웹사이트 체류 시간 평균 1분 20초 -> 3분 10초로 대폭 상승",
            "모바일 웹 통한 당일 상담 예약률 180% 향상",
            "구글/네이버 웹 표준 맞춤형 SEO 최적화로 오가닉 트래픽 유입 확대"
        ],
        detailImages: [
            "/assets/images/266a44e489.jpg",
            "/assets/images/0426453d81.jpg"
        ]
    },
    {
        id: "p5",
        title: "정형외과 오프라인 개원 컨설팅",
        category: "Consulting",
        client: "E 정형외과",
        image: "/assets/images/2b4e00e7a2.jpg",
        slug: "orthopedics-launching",
        overview: "입지 분석부터 장비, 채용, 개원 마케팅까지 아우르는 정형외과 개원 마스터플랜",
        background: "유동 인구가 많은 신도시 상권에 대규모 정형외과를 개원하려는 원장님의 니즈가 있었습니다. 하지만 개원은 건축/인테리어, 의료기기 세팅, 구인, 마케팅에 이르는 방대하고 복잡한 일정이 얽혀있어 총괄 디렉팅이 없다면 일정 지연 및 비용 초과 리스크가 컸습니다.",
        strategy: "개원 D-100일 스케줄러를 담하 컨설턴트 전담팀이 관리하며 단계별 마일스톤을 확립했습니다. 상권 내 거주민 연령층을 분석해 도수치료 및 비수술 척추관리를 메인 무기로 세팅하고, 지역 맘카페 제휴 및 사전 이벤트, 현수막 마케팅을 통합 스케줄대로 동시 다발적으로 전개했습니다.",
        results: [
            "예정된 개원일에 차질 없는 성공적인 오픈 및 오퍼레이션 정상화",
            "오픈 첫 달 손익분기점(BEP) 조기 달성 (지역맘카페 바이럴 포스팅 100건+)",
            "효율적인 동선 컨설팅으로 물리치료실 베드 회전율 극대화"
        ],
        detailImages: [
            "/assets/images/2b4e00e7a2.jpg",
            "/assets/images/0b1667a809.jpg"
        ]
    },
    {
        id: "p6",
        title: "피부과 유튜브 채널 및 바이럴 캠페인",
        category: "Marketing",
        client: "F 피부과",
        image: "/assets/images/2e69e5d185.jpg",
        slug: "dermatology-viral-campaign",
        overview: "원장님의 전문성과 신뢰도를 앞세운 퍼스널 브랜딩 유튜브 기획/제작",
        background: "과도하게 상업적인 병원 마케팅에 지친 소비자들이 점차 '의사가 직접 전달하는 진정성 있는 정보'를 선호하는 트렌드로 변화하고 있었습니다. F 피부과 원장님은 풍부한 임상 경험을 가지고 있으나 카메라 앞에서의 스피치와 영상 기획력이 부족해 채널 성장에 한계를 느끼고 있었습니다.",
        strategy: "원장님의 말투와 장점을 살려 '동네 단골 피부과 원장님의 솔직한 피부 교실'이라는 캐릭터를 구축했습니다. 월 4회의 정기 영상 기획 및 대본 작성, 촬영 디렉팅과 썸네일/컷편집을 일괄 대행하며, 쇼츠(Shorts) 포맷으로 편집본을 추가 발행해 인스타그램 릴스와 연동하는 그로스 전략을 취했습니다.",
        results: [
            "유튜브 채널 구독자 6개월 내 1만명 돌파 및 실버 버튼 획득 가시화",
            "유튜브 시청 후 지정 닥터 상담으로 이어지는 '팬덤형 초진 환자' 비율 30% 증가",
            "상담 실장 배정 없이도 영상만 보고 시술 패키지를 확정하여 방문하는 사례 확보"
        ],
        detailImages: [
            "/assets/images/2e69e5d185.jpg",
            "/assets/images/0ec143283b.jpg"
        ]
    }
];
