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

export const artworkCategories = [
  {
    key: "all" as const,
    name: "All works (全部主轴)",
    desc: "The entire scope of carbon and code dialectic."
  },
  {
    key: "dot" as const,
    name: "Dot (Genetic Coding)",
    desc: "基因式点阵 — Cellular dots and matrix networks undergoing autonomous multiplication."
  },
  {
    key: "line" as const,
    name: "Line (Vertical Flux)",
    desc: "垂直流淌线条 — Paint streams pulled downward under gravity, tracing vertical physical fluidity."
  },
  {
    key: "biomatrix" as const,
    name: "Bio-matrix (Materiality)",
    desc: "生物基质材料 — Organic dialogue of ink diffusion, salt erosion, and Xuan paper cellulose fibers."
  }
];

export const artworks: Artwork[] = [
  {
    id: "stone-pentaptych-1",
    title: "石系列 - 五联幅 之一",
    titleEn: "Stone Series - Pentaptych I",
    category: "dot",
    year: "2025",
    medium: "纸本综合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "173cm * 92cm",
    description: "基因式墨色斑点像细胞组织般在宣纸纤维上自主增殖与繁衍，冷峻的秩序中饱含手工质感与无序渗透的物质魅力。",
    descriptionEn: "Genetic dot patterns multiply across raw Xuan paper fibers like cell structures, merging cybernetic matrix layouts with natural ink expansion.",
    visualType: "dots",
    colorPalette: ["#141414", "#d4ac0d", "#85929e", "#e5e7e9"],
    imageUrl: "https://imagetourl.cloud/comaxpys.jpg"
  },
  {
    id: "stone-pentaptych-4",
    title: "石系列 - 五联幅 之四",
    titleEn: "Stone Series - Pentaptych IV",
    category: "line",
    year: "2025",
    medium: "纸本综合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "173cm * 92cm",
    description: "垂直流淌的黄色、绿色、紫色与深幽墨线倾泻而下，精确记录了重力法则介入时，水色沿纸缝渗行沉降的瞬时痕迹。",
    descriptionEn: "Dripping vertical lines of yellow, green, violet and pure ink fall gracefully, documenting gravitational acceleration through raw paper fiber capillaries.",
    visualType: "vertical-fluid",
    colorPalette: ["#f4d03f", "#27ae60", "#8e44ad", "#141414"],
    imageUrl: ""
  },
  {
    id: "triptych-1",
    title: "石系列 - 三联幅 之一",
    titleEn: "Stone Series - Triptych I",
    category: "dot",
    year: "2023",
    medium: "纸本综合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "181cm * 138cm",
    description: "黑灰色墨块饱润宣纸后，在碳基大分子间相互侵蚀、退让而形成骨状的白色树突纹路，展现墨晕自愈合与排异规律。",
    descriptionEn: "Deep organic carbon pigment saturates the paper layers, generating a network of bone-like white vectors and dendritic nerve outlines.",
    visualType: "cells-veins",
    colorPalette: ["#0f0f0f", "#424242", "#dedede", "#9a7d0a"],
    imageUrl: ""
  },
  {
    id: "plant-qi",
    title: "植物系列 - 经纬之野 · 虬",
    titleEn: "Plant Series - Latitude and Longitude · Qi",
    category: "line",
    year: "2021",
    medium: "纸本综合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "181cm * 138cm",
    description: "盘错扭转的金黄色松骨虬枝在静默的黑森林背景中延伸，周围密布如细雨流淌、重力干预下垂直奔涌下泻的水墨流。象征生命张力对重力抗争的美学宣言。",
    descriptionEn: "A golden twisted organic pine branch winds against an abyss of dense carbon mist, flanked with hundreds of microscopic vertical rainfall trails.",
    visualType: "vertical-fluid",
    colorPalette: ["#f1c40f", "#1c1c1c", "#566573", "#f8f9f9"],
    imageUrl: ""
  },
  {
    id: "plant-bamboo",
    title: "植物系列 - 竹月",
    titleEn: "Plant Series - Bamboo & Moon",
    category: "biomatrix",
    year: "2022",
    medium: "纸本综合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "218cm * 137cm",
    description: "高贵浓郁的紫罗兰色夜空包裹着劲挺竹节，一轮巨型月轮在后方浮现。竹叶线条的锐利度与月白墨晕的朦胧，呈现无序物理浸润对抗人工秩序的诗学对话。",
    descriptionEn: "Vibrant violet and glowing lunar white surround dynamic emerald bamboo stems, tracing ink bleeding borders where control yields to fluid physics.",
    visualType: "purple-bamboo",
    colorPalette: ["#5b2c6f", "#2ecc1e", "#f4f6f7", "#121212"],
    imageUrl: ""
  },
  {
    id: "plant-pine-shadow",
    title: "植物系列 - 松日",
    titleEn: "Plant Series - Pine & Sun",
    category: "biomatrix",
    year: "2022",
    medium: "纸本综合材料",
    mediumEn: "Mixed media on paper",
    dimensions: "218cm * 137cm",
    description: "盘苍古松凌空，横陈于巨大的橘红色日轮之上。大量的墨珠、水痕、白粉淋漓于松针之间，形成了富含微观颗粒感、重力流淌的繁盛景象。",
    descriptionEn: "A powerful primeval pine crosses a huge warm orange solar aura, capturing white splashes and black graphite droplets colliding on paper fibers.",
    visualType: "pine-shadow",
    colorPalette: ["#e67e22", "#196f3d", "#f7f9f9", "#111625"],
    imageUrl: ""
  }
];

export const academicArticles = [
  {
    title: "在碳与代码之间：算法视觉时代的材料抵抗",
    titleEn: "Between Carbon and Code: Material Resistance in the Age of Algorithmic Vision",
    author: "Artforum Critic / 艺术论坛批评专栏",
    excerpt: "在数字算法席卷视觉秩序的今天，吴晓东的工作通过逆向引入宣纸、矿物颜料与地球重力的物理阻力，建立了一种『第三条路线』——不屈服于代码渲染的虚拟秩序，更不沿袭传统笔墨范式的被动性。",
    excerptEn: "In an era of generic silicon interfaces, Wu's practice reintroduces the visceral resistance of Xuan paper, dry pigments, and gravitational vectors, creating a 'Third Route' that challenges both digital sterility and traditional passivity.",
    date: "2025.11"
  },
  {
    title: "生命自然主义与重力场的墨法重组",
    titleEn: "Carbon-Based Naturalism and Reorganization of Ink in Gravitational Fields",
    author: "Museum Curator / 宝龙美术馆学术前言",
    excerpt: "吴晓东的斑点（Genetic Dots）与线条（Vertical Fluidity）摆脱了传统文人画的笔墨范式。它们是在纸张纤维（Bio-matrix）这一生物介质上生发出来的有机秩序——每一根线条都是9.81m/s²的物理记录。",
    excerptEn: "Wu's genetic spots and vertical rainfall drips shake off traditional literati landscape templates. They represent empirical bio-signatures of cellular evolution and geological friction embedded directly in cellulose.",
    date: "2025.11"
  }
];

export const exhibitionHistory = [
  {
    year: "2025",
    title: "吴晓东个展：第三条路线 (The Third Route)",
    location: "上海宝龙美术馆 (Powerlong Art Museum), 上海",
    scope: "Museum Solo Show (美术馆大展厅 - 7号厅特设专场)",
    desc: "全景展示艺术家2021-2025年创作的『石系列』五联/三联巨作，全自动垂直流淌线条与基因点阵的剧场化实验。"
  },
  {
    year: "2025",
    title: "流石飞花 (Flowing Stone · Flying Petal) 当代艺术展",
    location: "Fotile Style Gallery Space, 上海",
    scope: "Selected Trio Exhibition (三人当代艺术精品联展)",
    desc: "融合当代纸本材料抵抗与空间瓷板绘画，开创当代新水墨学术对话。"
  },
  {
    year: "2024",
    title: "吴晓东：十年 (Wu Xiaodong's Ten Years Review)",
    location: "上海宝龙艺术中心 (Powerlong Art Center), 上海",
    scope: "Ten-Year Retrospective (十周年阶段性综合媒介回顾个展)",
    desc: "回顾艺术家十年间从传统陶瓷釉烧、瓷面水合流淌向纸本巨幅综合材料的进化历程。"
  }
];
