export interface Slide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface ProfileData {
  name: string;
  title: string;
  avatar: string;
  motto: string;
  email: string;
  constellation: string;
  bloodType: string;
  birthday: string;
  age: number;
  socials: {
    linkedin: string;
    instagram: string;
    facebook: string;
    youtube: string;
    github: string;
  };
  warningIntro: string;
  workExperience: {
    period: string;
    company: string;
    description: string[];
    tag: string;
  }[];
  project: {
    title: string;
    subtitle: string;
    date: string;
    slides: Slide[];
  };
  education: {
    period: string;
    school: string;
    department: string;
    degree: string;
  };
  languages: {
    name: string;
    level: string;
    detail: string;
    progress: number;
  }[];
  certifications: {
    name: string;
    issuedBy: string;
  }[];
  autobiography: string;
  tripoLink: string;
  avatar3D: string;
  expertises: string[];
}

export const profileData: ProfileData = {
  name: "陳宥為",
  title: "航海科專業 | 重機旅人 | 多語才俊",
  avatar: "https://cdn.phototourl.com/free/2026-05-25-67542554-0598-4a01-a435-98b1ae5f4f55.jpg",
  avatar3D: "/src/assets/images/profile_3d_render_1779725236653.png",
  motto: "愛你真的沒辦法 你家沒有阿爾法 ｜ 你懂海 海就會幫你，你懂懂猜 神明就會幫你",
  email: "a111182151@nkust.edu.tw",
  constellation: "射手座",
  bloodType: "A型",
  birthday: "2006-12-12",
  age: 19,
  socials: {
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
    github: "https://github.com",
  },
  warningIntro: "少在那邊跟我旋轉、講些五四三的廢話！做人留一線，日後好相見，但如果你把我的尊重當作你不要臉的資本，那我就會讓你知道什麼叫做真正的殘忍。出來混，遲早要還的，今天你怎麼弄我，明天我就加倍奉還。不要考驗我的耐心，我瘋起來的時候，連我自己都會感到害怕！",
  workExperience: [
    {
      period: "2019 ~ 現在",
      company: "緬北企業融資 (雲則) 同事 & 柬埔寨夢想企業",
      description: [
        "專營盛情貸與財富重組，用效率和信任打破傳統界限。",
        "「一通電話，改變你的人生」—— 隨時提供專業財務方向重組規劃與諮詢服務。",
        "實行極致彈性工時：月休看警察心情，高強度應變與抗壓能力的最佳展現。"
      ],
      tag: "融資與重組"
    }
  ],
  project: {
    title: "2026 重機花東慢活之旅",
    subtitle: "蘇花、縱谷與太平洋的湛藍直航",
    date: "2026/04/03(五) ~ 04/06(一) 清明連假行程",
    slides: [
      {
        title: "2026 重機花東慢活之旅",
        subtitle: "蘇花、縱谷與太平洋的湛藍直航",
        description: "開啟為期四天的重機壯遊！沿著臺灣最美麗的一線海岸，聽風、聽浪，享受深度騎乘的奢華自由，與大自然的心靈對話。",
        image: "./src/assets/images/motorcycle_tour_1779725254364.png"
      },
      {
        title: "Day 1: 蘇花巡禮與花蓮昭和風情",
        subtitle: "探訪林蔭小徑與日式氣息",
        description: "上午：蜿蜒的公路上伴隨著深邃的太平洋而行，享受風與速度的奢華對比。下午：尋幽別徑，在舒緩與放慢中，探尋斑駁靜謐的日式昭和老建築，感受時光定格的溫馨風情。",
        image: "./src/assets/images/motorcycle_tour_1779725254364.png"
      },
      {
        title: "Day 2: 縱谷金黃稻香與深山幽谷",
        subtitle: "與微風在縱谷線輕舞飛揚",
        description: "沿著台9線穿梭於中央山脈與海岸山脈之間。春日新稻散散發著田野芬芳，於小徑中探索不為人知的天然溪谷溫泉，將騎乘的疲憊融入山林古林之間。",
        image: "https://picsum.photos/seed/valley/800/450"
      },
      {
        title: "Day 3: 大洋碧海狂飆 & 海天一線",
        subtitle: "騎行於台11線海岸公路",
        description: "伴隨著蔚藍太平洋的一路高歌，迎面而來的強勁海風與澎湃浪濤是最好的背景樂。每一次壓彎與加油，都是對生命底色一次無比肆意的抹彩。",
        image: "https://picsum.photos/seed/oceancoast/800/450"
      },
      {
        title: "Day 4: 漫活慢行與歸途心靈沉澱",
        subtitle: "整理裝備與滿溢的回憶",
        description: "走訪海邊老咖啡廳，聽著海浪享用晨光咖啡。帶上滿滿的旅途收穫與對自然的敬畏，伴著引擎微弱的和弦，沿著夕陽海岸線踩著回歸的韻律前行。",
        image: "https://picsum.photos/seed/sunsetride/800/450"
      }
    ]
  },
  education: {
    period: "2022-09 ~ 現在",
    school: "國立高雄科技大學 (NKUST)",
    department: "航海科 / 美術系",
    degree: "博士班 (跨領域跨界學位研究)"
  },
  languages: [
    { name: "英語 (English)", level: "精通", detail: "TOEIC 900", progress: 90 },
    { name: "日語 (日本語)", level: "精通", detail: "JLPT N1", progress: 88 },
    { name: "義大利語 (Italiano)", level: "精通", detail: "很會講 (實戰會話流)", progress: 65 },
    { name: "臺語 (Tâi-gí)", level: "精通", detail: "幾霸昏 (100分百分百口語)", progress: 100 }
  ],
  certifications: [
    { name: "STCW 基本安全訓練合格證", issuedBy: "交通部航港局" },
    { name: "保全職責基本合格證", issuedBy: "交通部航港局" },
    { name: "保全意識教育訓練合格證", issuedBy: "交通部航港局" },
    { name: "救生艇手、救難艇手合格證", issuedBy: "交通部航港局" },
    { name: "操艇與滅火核心專業技術證", issuedBy: "交通部航港局" }
  ],
  autobiography: "我叫陳宥為，今年十九歲。從小到大，我其實不是那種特別別、什麼都很規規矩矩的人。我常常會想很多事情，會懷疑、會不服氣，但也不會覺得自己就非得走那種被大家認可的生活方式。雖然偶爾會有那種隨意而安的心態，但其實我只是想走自己活得踏實的工作。在成長的過程中，我也曾經對自己沒有自信。當身邊的人對我指指點點，或是對有些事情不看好、不被體諒時，我也會覺得是不是不太對，不習慣慢條斯理地去想，我也慢慢學著把自己的事情做好。我發現如果我一直聽別人的聲音影響，我就永遠走不出來。所以我開始對學科自己負責，練習獨立思考，也學會承受壓力。我很喜歡機車和單車。對我來說，那不只是交通工具，而是一種個性和態度的展現。我喜歡研究不同車款的外型、引擎、改裝，也喜歡動手動腦自己改車，會怎麼去研究自己心中理想的樣子。因為這樣的研究，我也開始接觸外觀設計和改裝相關的想法，希望未來能朝這個方向去發展。除了興趣之外，我也在改變自己，像是養成運動日記。在訓練身體的同時，因為我相信那不只是提升外表，而是整個人變得更有自律和魄力。這也讓我更懂得如何自我克制，不被一些生活誘惑給影響。我未來還在摸索，但我希望可以找到更多元、更有挑戰性的世界，讓我能像這樣自由且有規矩地去想。當然，我希望能提升語文能力，多認識不同的世界，我也知道自己還有很多不足的地方，不過我願意去克服。未來我希望能有更多探索的機會，讓我能繼續朝這個方向去發展，我也希望自己能是有著可以一直進步的力量的人。",
  tripoLink: "https://studio.tripo3d.ai/3d-model/1ad19a3a-7baf-4d33-9884-85eab5d08ccc?invite_code=GIXUE8",
  expertises: [
    "航海大氣與基本安全",
    "重型機車引擎與改裝設計",
    "跨學科美術美學博士研究",
    "多國語文實戰流利應用"
  ]
};
