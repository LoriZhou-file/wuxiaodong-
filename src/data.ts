export interface Artwork {
  id: string;
  title: string;
  titleEn: string;
  category: "dot" | "line" | "biomatrix";
  year: string;
  medium: string;
  mediumEn: string;
  dimensions: string;
  description: string;
  descriptionEn: string;
  visualType: "dots" | "vertical-fluid" | "cells-veins" | "pine-shadow" | "purple-bamboo";
  colorPalette: string[];
  imageUrl?: string;
}

export interface StudioImage {
  id: string;
  title: string;
  titleEn: string;
  imageUrl: string;
}

export const artworkCategories = [
  {
    key: "all" as const,
    name: "All works (全部主軸)",
    desc: "The entire scope of carbon and code dialectic."
  },
  {
    key: "dot" as const,
    name: "Dot (Genetic Coding)",
    desc: "基因式點陣 — Cellular dots and matrix networks undergoing autonomous multiplication."
  },
  {
    key: "line" as const,
    name: "Line (Vertical Flux)",
    desc: "垂直流淌線條 — Paint streams pulled downward under gravity, tracing vertical physical fluidity."
  },
  {
    key: "biomatrix" as const,
    name: "Bio-matrix (Materiality)",
    desc: "生物基質材料 — Organic dialogue of ink diffusion, salt erosion, and Xuan paper cellulose fibers."
  }
];

export const artworks: Artwork[] = [
  {
    id: "stone-pentaptych-1",
    title: "石系列 - 五聯幅 之一",
    titleEn: "Stone Series - Pentaptych I",
    category: "dot",
    year: "2025",
    medium: "紙本綜合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "173cm * 92cm",
    description: "基因式墨色斑點像細胞組織般在宣紙纖維上自主增殖與繁衍，冷峻的秩序中飽含手工質感與無序滲透的物質魅力。",
    descriptionEn: "Genetic dot patterns multiply across raw Xuan paper fibers like cell structures, merging cybernetic matrix layouts with natural ink expansion.",
    visualType: "dots",
    colorPalette: ["#141414", "#d4ac0d", "#85929e", "#e5e7e9"],
    imageUrl: "/images/stone5-1.jpg"
  },
  {
    id: "stone-pentaptych-4",
    title: "石系列 - 五聯幅 之四",
    titleEn: "Stone Series - Pentaptych IV",
    category: "line",
    year: "2025",
    medium: "紙本綜合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "173cm * 92cm",
    description: "垂直流淌的黃色、綠色、紫色與深幽墨線傾瀉而下，精確記錄了重力法則介入時，水色沿紙縫滲行沈降的瞬時痕跡。",
    descriptionEn: "Dripping vertical lines of yellow, green, violet and pure ink fall gracefully, documenting gravitational acceleration through raw paper fiber capillaries.",
    visualType: "vertical-fluid",
    colorPalette: ["#f4d03f", "#27ae60", "#8e44ad", "#141414"],
    imageUrl: "/images/stone5-4.jpg"
  },
  {
    id: "triptych-1",
    title: "石系列 - 三聯幅 之一",
    titleEn: "Stone Series - Triptych I",
    category: "dot",
    year: "2023",
    medium: "紙本綜合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "181cm * 138cm",
    description: "黑灰色墨塊飽潤宣紙後，在碳基大分子間相互侵蝕、退讓而形成骨狀的白色樹突紋路，展現墨暈自癒合與排異規律。",
    descriptionEn: "Deep organic carbon pigment saturates the paper layers, generating a network of bone-like white vectors and dendritic nerve outlines.",
    visualType: "cells-veins",
    colorPalette: ["#0f0f0f", "#424242", "#dedede", "#9a7d0a"],
    imageUrl: "/images/stone3-1.jpg"
  },
  {
    id: "plant-qi",
    title: "植物系列 - 經緯之野 · 虬",
    titleEn: "Plant Series - Latitude and Longitude · Qi",
    category: "line",
    year: "2021",
    medium: "紙本綜合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "181cm * 138cm",
    description: "盤錯扭轉的金黃色松骨虬枝在靜默的黑森林背景中延伸，周圍密佈如細雨流淌、重力干預下垂直奔涌下瀉的水墨流。象徵生命張力對重力抗爭的美學宣言。",
    descriptionEn: "A golden twisted organic pine branch winds against an abyss of dense carbon mist, flanked with hundreds of microscopic vertical rainfall trails.",
    visualType: "vertical-fluid",
    colorPalette: ["#f1c40f", "#1c1c1c", "#566573", "#f8f9f9"],
    imageUrl: "/images/‎dragen.jpg"
  },
  {
    id: "plant-bamboo",
    title: "植物系列 - 竹",
    titleEn: "Plant Series - Bamboo & Moon",
    category: "biomatrix",
    year: "2022",
    medium: "紙本綜合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "181cm * 135cm",
    description: "高貴濃郁的紫羅蘭色夜空包裹著勁挺竹節，一輪巨型月輪在後方浮現。竹葉線條的銳利度與月白墨暈的朦朧，呈現無序物理浸潤對抗人工秩序的詩學對話。",
    descriptionEn: "Vibrant violet and glowing lunar white surround dynamic emerald bamboo stems, tracing ink bleeding borders where control yields to fluid physics.",
    visualType: "purple-bamboo",
    colorPalette: ["#5b2c6f", "#2ecc1e", "#f4f6f7", "#121212"],
    imageUrl: "/images/banboo.jpg"
  },
  {
    id: "plant-pine-shadow",
    title: "植物系列 - 植物园",
    titleEn: "Plant Series - Pine & Sun",
    category: "biomatrix",
    year: "2022",
    medium: "紙本綜合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "230cm * 132cm",
    description: "盤蒼古松凌空，橫陳於巨大的橘紅色日輪之上。大量的墨珠、水痕、白粉淋漓於松針之間，形成了富含微觀顆粒感、重力流淌的繁盛景觀。",
    descriptionEn: "A powerful primeval pine crosses a huge warm orange solar aura, capturing white splashes and black graphite droplets colliding on paper fibers.",
    visualType: "pine-shadow",
    colorPalette: ["#e67e22", "#196f3d", "#f7f9f9", "#111625"],
    imageUrl: "/images/garden.jpg"
  }
];

export const studioImage: StudioImage = {
  id: "studio-workspace",
  title: "工作現場",
  titleEn: "Studio Workspace",
  imageUrl: "/images/event1.jpg"
};

export const academicArticles = [
  {
    title: "在碳與代碼之間：算法視覺時代的材料抵抗",
    titleEn: "Between Carbon and Code: Material Resistance in the Age of Algorithmic Vision",
    author: "Artforum Critic / 藝術論壇批評專欄",
    excerpt: "在數字算法席卷視覺秩序的今天，吳曉東的工作通過逆向引入宣紙、礦物顏料與地球重力的物理阻力，建立了一種『第三條路線』——不是純淨的傳統筆墨秩序，也不是冷漠的硅基計算，而是於兩者之間尋找有機的、有生命力的，能夠自我增殖與變化的藝術語言。",
    excerptEn: "In an era of generic silicon interfaces, Wu's practice reintroduces the visceral resistance of Xuan paper, dry pigments, and gravitational vectors, creating a 'Third Route' that challenges both classical brush tradition and sterile code rendering.",
    date: "2025.11"
  },
  {
    title: "生命自然主義與重力場的墨法重組",
    titleEn: "Carbon-Based Naturalism and Reorganization of Ink in Gravitational Fields",
    author: "Museum Curator / 寶龍美術館學術前言",
    excerpt: "吳曉東的斑點（Genetic Dots）與線條（Vertical Fluidity）擺脫了傳統文人畫的筆墨範式。它們是在紙張纖維（Bio-matrix）這一生物介質上生發出的物理計算——不用矽基晶體，而用重力、毛細作用與顏料分子的化學親和力來完成對複雜計算的類比記錄。",
    excerptEn: "Wu's genetic spots and vertical rainfall drips shake off traditional literati landscape templates. They represent empirical bio-signatures of cellular evolution and geological friction rendered in ink.",
    date: "2025.11"
  }
];

export const exhibitionHistory = [
  {
    year: "2025",
    title: "吳曉東個展：第三條路線 (The Third Route)",
    location: "上海寶龍美術館 (Powerlong Art Museum), 上海",
    scope: "Museum Solo Show (美術館大展廳 - 7號廳特設專場)",
    desc: "全景展示藝術家2021-2025年創作的『石系列』五聯/三聯巨作，全自動垂直流淌線條與基因點陣的劇場化實驗。"
  },
  {
    year: "2025",
    title: "流石飛花 (Flowing Stone · Flying Petal) 當代藝術展",
    location: "Fotile Style Gallery Space, 上海",
    scope: "Selected Trio Exhibition (三人當代藝術精品聯展)",
    desc: "融合當代紙本材料抵抗與空間瓷板繪畫，開創當代新水墨學術對話。"
  },
  {
    year: "2024",
    title: "吳曉東：十年 (Wu Xiaodong's Ten Years Review)",
    location: "上海寶龍藝術中心 (Powerlong Art Center), 上海",
    scope: "Ten-Year Retrospective (十週年階段性綜合媒介回顧個展)",
    desc: "回顧藝術家十年間從傳統陶瓷釉燒、瓷面水合流淌向紙本巨幅綜合材料的進化歷程。"
  }
];
