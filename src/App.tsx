import { useState } from "react";
import HeroCanvas from "./components/HeroCanvas";
import WorksSection from "./components/WorksSection";
import ArchiveSection from "./components/ArchiveSection";
import ArtworkDetailModal from "./components/ArtworkDetailModal";
import LabAssistant from "./components/LabAssistant";
import { Artwork } from "./data";
import { Eye, BookOpen, Layers, Menu, X, Landmark, Globe, Check, CornerRightDown, ArrowUpRight } from "lucide-react";

export default function App() {
  const [lang, setLang] = useState<"zh" | "en">("zh");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Smooth scroll handler to target IDs
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-moonwhite font-sans text-charcoal flex flex-col relative overflow-x-hidden select-none">
      
      {/* Dynamic paper fiber base class globally loaded */}
      <div className="fixed inset-0 pointer-events-none wu-paper-fiber-bg z-1" />

      {/* Global SVG Ink Bleeding custom filter for physical-render simulation */}
      <svg className="hidden" aria-hidden="true">
        <defs>
          <filter id="wu-ink-bleed">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* High-End Gallery Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-moonwhite/85 backdrop-blur-md border-b border-stonegrey/15 py-4 px-6 md:px-12 flex items-center justify-between select-none">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Landmark className="w-5 h-5 text-stonegrey" />
          <div className="flex flex-col">
            <h1 className="font-display font-medium text-sm tracking-widest text-[#121210]">
              WU XIAODONG // 吴晓东
            </h1>
            <span className="text-[8.5px] font-mono text-stonegrey/60 uppercase tracking-widest">
              OFFICIAL WEBSITE // 艺术家官网
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10 font-mono text-[11px] tracking-widest text-stonegrey/80">
          <button onClick={() => scrollToSection("philosophy-section")} className="hover:text-charcoal cursor-pointer transition-colors">
            {lang === "zh" ? "① 视觉核心" : "① VISUAL PHILOSOPHY"}
          </button>
          <button onClick={() => scrollToSection("portfolio-section")} className="hover:text-charcoal cursor-pointer transition-colors">
            {lang === "zh" ? "② 作品档案" : "② PORTFOLIO ARCHIVES"}
          </button>
          <button onClick={() => scrollToSection("bio-section")} className="hover:text-charcoal cursor-pointer transition-colors">
            {lang === "zh" ? "③ 学术履历" : "③ BIOGRAPHY"}
          </button>
          <button onClick={() => scrollToSection("archive-section")} className="hover:text-charcoal cursor-pointer transition-colors">
            {lang === "zh" ? "④ 批判文献" : "④ CRITICAL RESEARCH"}
          </button>
        </nav>

        {/* LANGUAGE SELECTOR AND QUICK ACTION BUTTONS */}
        <div className="flex items-center space-x-3">
          <div className="flex bg-silk p-0.5 rounded-sm border border-stonegrey/10 font-mono text-[10px]">
            <button
              onClick={() => setLang("zh")}
              className={`px-2.5 py-1 rounded-sm cursor-pointer transition-colors flex items-center space-x-1 ${
                lang === "zh" ? "bg-charcoal text-moonwhite" : "text-stonegrey/70 hover:text-charcoal"
              }`}
            >
              <span>中</span>
              {lang === "zh" && <Check className="w-2.5 h-2.5" />}
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2.5 py-1 rounded-sm cursor-pointer transition-colors flex items-center space-x-1 ${
                lang === "en" ? "bg-charcoal text-moonwhite" : "text-stonegrey/70 hover:text-charcoal"
              }`}
            >
              <span>EN</span>
              {lang === "en" && <Check className="w-2.5 h-2.5" />}
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-1.5 h-8 w-8 hover:bg-silk border border-stonegrey/10 rounded-sm cursor-pointer text-charcoal outline-none transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-moonwhite/95 z-30 flex flex-col p-6 space-y-8 font-mono tracking-widest text-[#F2F2F2] lg:hidden select-none">
          <button onClick={() => scrollToSection("philosophy-section")} className="text-left py-3 border-b border-stonegrey/10 text-sm">
            {lang === "zh" ? "① 视觉核心" : "① VISUAL PHILOSOPHY"}
          </button>
          <button onClick={() => scrollToSection("portfolio-section")} className="text-left py-3 border-b border-stonegrey/10 text-sm">
            {lang === "zh" ? "② 作品档案" : "② PORTFOLIO ARCHIVES"}
          </button>
          <button onClick={() => scrollToSection("bio-section")} className="text-left py-3 border-b border-stonegrey/10 text-sm">
            {lang === "zh" ? "③ 学术履历" : "③ BIOGRAPHY"}
          </button>
          <button onClick={() => scrollToSection("archive-section")} className="text-left py-3 border-b border-stonegrey/10 text-sm">
            {lang === "zh" ? "④ 批判文献" : "④ CRITICAL RESEARCH"}
          </button>
          <div className="pt-6">
            <span className="text-[9px] text-stonegrey/50 block mb-2 uppercase select-none">DIGITAL STUDIO STATUS</span>
            <div className="flex items-center space-x-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>CARBON_CODE_STABLE // 数字美术馆在线</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Container Layout */}
      <main className="flex-1 pt-[64px] z-10 font-sans select-none">
        
        {/* LANDING PAGE - Immersive Visual Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden bg-moonwhite border-b border-stonegrey/15">
          
          {/* Immersive background rendering falling fluid drips & breathing cells */}
          <HeroCanvas />

          {/* Foreground Title elements in contemporary Helvetica / Sans style */}
          <div className="max-w-5xl z-10 px-4">
            <span className="font-mono text-xs text-stonegrey/60 tracking-[0.25em] uppercase block mb-4 animate-fade-in text-justify-center">
              {lang === "zh" ? "第三条路线 // 碳基自然主义" : "THE THIRD ROUTE // CARBON-BASED NATURALISM"}
            </span>
            
            {/* Massive bilingual title to make Wu Xiaodong's Chinese/English name highly eye-catching and clear */}
            <div className="mb-6 flex flex-col items-center justify-center text-center">
              <h1 className="font-display font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tight selection:bg-yellow-500 selection:text-black select-text leading-tight mb-2">
                <span className="text-[#FFFFFF] font-semibold drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] block md:inline tracking-wider">
                  吴晓东
                </span>
                <span className="hidden md:inline text-stonegrey mx-4 font-light">/</span>
                <span className="text-yellow-500 font-light text-3xl md:text-5xl lg:text-6xl tracking-widest block md:inline font-mono uppercase mt-2 md:mt-0">
                  WU XIAODONG
                </span>
              </h1>
              
              <h2 className="font-serif font-light italic text-xl md:text-3xl text-stonegrey tracking-wider select-text mt-3">
                {lang === "zh" ? "—— 介于碳基材质与算法代码之间 ——" : "— between Carbon and Code —"}
              </h2>
            </div>

            <p className="font-serif italic text-base md:text-xl text-charcoal/90 font-medium max-w-3xl mx-auto mb-10 leading-relaxed select-text">
              {lang === "zh" 
                ? "“手工材质的水墨痕迹（碳）对抗数字化芯片的计算（代码）。我用地球重力的自然流淌，在宣纸缝隙中寻找物质抵抗的共振。”"
                : "“Handcrafted carbon traces resisting the sterile calculations of silicon chips. Drawing from gravity fields, I hunt for friction inside raw cellulose fibers.”"}
            </p>

            {/* Micro button trigger to scroll */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
              <button 
                onClick={() => scrollToSection("portfolio-section")}
                className="px-6 py-3 bg-charcoal text-moonwhite hover:bg-stonegrey border border-stonegrey/10 rounded-sm font-mono text-xs tracking-widest cursor-pointer shadow-md transition-all uppercase flex items-center space-x-2"
              >
                <span>ENTER ARCHIVES // 进入作品展厅</span>
                <CornerRightDown className="w-3.5 h-3.5 text-yellow-500" />
              </button>
              
              <button 
                onClick={() => scrollToSection("philosophy-section")}
                className="px-6 py-3 bg-silk text-charcoal hover:bg-neutral-200 border border-stonegrey/15 rounded-sm font-mono text-xs tracking-widest cursor-pointer transition-all uppercase"
              >
                {lang === "zh" ? "研读视觉哲学" : "STUDY PHILOSOPHY"}
              </button>
            </div>
          </div>

          {/* Minimal coordinate footer overlays */}
          <div className="absolute bottom-6 left-12 hidden lg:flex flex-col space-y-1 font-mono text-[9px] text-[#484844]/60 uppercase tracking-widest text-left select-none">
            <span>ARTIST: 吴晓东 // G.1968 SHANGHAI-JINGDEZHEN</span>
            <span>MEDIUM: MIXED MEDIA ON XUAN PAPER // 纸本综合材料</span>
          </div>

          <div className="absolute bottom-6 right-12 hidden lg:flex flex-col space-y-1 font-mono text-[9px] text-[#484844]/60 uppercase tracking-widest text-right select-none">
            <span>CURATOR: POWERLONG MUSEUM RESEARCH GRP // 宝龙学术支持</span>
            <span>SYSTEM_STATUS: LIVE_PARTICLES // 实时重力场</span>
          </div>
        </section>


        {/* PHILOSOPHY SECTION - The dialog between Carbon vs Silicon */}
        <section id="philosophy-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-b border-stonegrey/15 select-text">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-square bg-[#141414] border border-stonegrey/20 p-8 flex flex-col justify-between overflow-hidden shadow-xs">
                
                {/* Micro tech code styling to showcase Carbon vs Silicon */}
                <div className="absolute inset-0 wu-silicon-grid opacity-30" />
                
                <span className="font-mono text-[9px] text-stonegrey tracking-widest uppercase block z-10">
                  VISUAL METRICS // 秩序与物质的博弈
                </span>

                <div className="z-10 py-10 flex flex-col space-y-6">
                  <div className="flex items-end justify-between border-b border-stonegrey/15 pb-2">
                    <span className="font-mono text-xs text-stonegrey/60">CARBON TRACES (纸本墨晕)</span>
                    <span className="font-serif italic text-lg text-charcoal font-semibold">NON-LINEAR</span>
                  </div>
                  <div className="flex items-end justify-between border-b border-stonegrey/15 pb-2">
                    <span className="font-mono text-xs text-stonegrey/60">SILICON ALGORITHMS (代码渲染)</span>
                    <span className="font-mono text-sm text-[#cb6d31] font-bold">PREDICTABLE</span>
                  </div>
                  <div className="flex items-end justify-between border-b border-stonegrey/15 pb-2">
                    <span className="font-mono text-xs text-stonegrey/60">GRAVITY INK STREAM (垂直流淌)</span>
                    <span className="font-mono text-sm text-charcoal">9.81 m/s² FORCE</span>
                  </div>
                </div>

                <div className="flex items-end justify-between border-t border-stonegrey/15 pt-4 z-10 font-mono text-[10px] text-stonegrey/80">
                  <span>BIO-MATRIX CELL: PROLIFERATIVE</span>
                  <span className="text-yellow-600 font-bold">THE THIRD ROUTE</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <span className="font-mono text-xs text-stonegrey/60 uppercase tracking-widest block">
                The Dialogue of Carbon & Silicon // 研读材质思想
              </span>
              
              {/* Filter used on custom title */}
              <h3 className="font-display font-semibold text-3xl md:text-4xl text-charcoal tracking-tight wu-ink-bleed-filter select-text leading-snug">
                {lang === "zh" 
                  ? "在宣纸的有机纤维中对抗算法的虚拟秩序"
                  : "Challenging Virtual Algorithmic Rules inside Cellulose Fibers"}
              </h3>

              <div className="space-y-4 font-serif text-charcoal/80 text-base leading-relaxed text-justify select-text">
                <p>
                  {lang === "zh"
                    ? "当代艺术家吴晓东的实验聚焦于『第三条路线』。他的创作以极其冷峻的数字化秩序组织画面的基础网格体系，然而核心的颗粒呈现却要借由传统水墨颜料由于“毛细孔效应”和“重力渗透”自然形成的微观轨迹。这并非是单纯的手工复归，而是一种针对虚拟屏幕完美控制力的材料学阻力抵抗。"
                    : "Wu Xiaodong's radical framework concentrates on 'The Third Route'. While the composition is locked into precise technical grids embodying cybernetic layout, the actual marks exist only as a physical byproduct of water infiltration and gravity pulling ink downward through raw Xuan paper fibers—constituting an organic form of materials resistance."}
                </p>
                <p>
                  {lang === "zh"
                    ? "他的绘画不仅展现了植物（松、竹、荷）与山石在物理重力（Vertical Fluidity）干预下，颜料自然坠溅下泄的过程，更是将像素点阵升华为基因微观结构（Gene-matrix Dot），在宣纸这一高度亲水、富有生物细胞特性的『生物基质』上吐纳呼吸、自我扩散。"
                    : "His painting operates as a natural computer registry. Spanning organic series of pines, bamboos, and boulders, pigments undergo vertical drainage representing precise fluid dynamics (Vertical Fluidity). Simultaneously, sterile matrix clusters grow and multiply organically as gene-matrix dots over cellular paper cellulose substrates."}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 select-none">
                <div className="px-3.5 py-1.5 bg-silk border border-stonegrey/10 font-mono text-[9px] uppercase tracking-wider text-stonegrey">
                  CELLULAR PULSATION // 细胞自繁衍
                </div>
                <div className="px-3.5 py-1.5 bg-silk border border-stonegrey/10 font-mono text-[9px] uppercase tracking-wider text-stonegrey">
                  GRAV-FIELD INTERVENTION // 重力力场核证
                </div>
                <div className="px-3.5 py-1.5 bg-silk border border-stonegrey/10 font-mono text-[9px] uppercase tracking-wider text-stonegrey">
                  XUAN FIBER COMPOSITE // 宣纸微观组织
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* WORKS GALLERY SECTION */}
        <WorksSection lang={lang} onSelectArtwork={(art) => setSelectedArtwork(art)} />


        {/* ARTIST BIOGRAPHY - Museum Legitimacy & Studio Photos */}
        <section id="bio-section" className="py-24 px-6 md:px-12 bg-silk border-t border-b border-stonegrey/15 select-text">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left section: Curated academic bio notes (7 cols) */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <span className="font-mono text-xs text-stonegrey/60 uppercase tracking-widest block">
                Academic Profile // 学术档案与履历
              </span>
              
              <h2 className="font-display font-semibold text-3xl md:text-4xl text-charcoal tracking-tight leading-tight select-text">
                吴晓东 (WU XIAODONG)
              </h2>

              <p className="font-mono text-xs text-yellow-600 block tracking-widest uppercase">
                WORKS REPRESENTED IN MAJOR ART INSTITUTIONS & BLUE-CHIP SPACES
              </p>

              <div className="space-y-4 font-serif text-charcoal/80 text-base leading-relaxed text-justify select-text">
                <p>
                  {lang === "zh"
                    ? "吴晓东，1968年生，当代艺术家，任教并进行学术探索于上海与陶瓷重镇景德镇。他在南京艺术学院、华东师范大学等核心院校积累了深厚的水墨造诣，并致力于宣纸（纸本综合材料）与高温瓷板绘画的深度探索。"
                    : "Wu Xiaodong was born in 1968 and currently researches, teaches, and produces art in intense dialog between Shanghai and the porcelain capital of Jingdezhen. He refined his masterly control over natural pigment at the Nanjing University of the Arts and East China Normal University."}
                </p>
                <p>
                  {lang === "zh"
                    ? "作为徐悲鸿艺术学院（上海海事大学）等艺术学院的客座教授，他同时出任中国国际环境艺术委员会顾问、陶瓷艺术专业委员会顾问等高端学术教席，积极推动跨越“手绘碳基印迹”与“算法信息逻辑”的跨界实验绘画体系。"
                    : "He serves as an academic leader, holding visiting professorships at the Xu Beihong School of Art (Shanghai Maritime University) and the Jiangxi Ceramic & Craft Institute. In addition, his credentials as an official advisor to the China International Environmental Art Committee place him at the forefront of contemporary art research globally."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 font-sans text-xs text-charcoal/85 select-text">
                <div className="p-4 bg-moonwhite border border-stonegrey/15 rounded-sm flex items-start space-x-3 shadow-xs">
                  <div className="font-mono text-sm text-yellow-500 font-bold">A.</div>
                  <div>
                    <strong className="block mb-1 font-display tracking-wide">{lang === "zh" ? "教授与顾问经历" : "Visiting Professorships"}</strong>
                    <span className="text-[11px] text-stonegrey/70 leading-relaxed block">
                      {lang === "zh" ? "徐悲鸿艺术学院客座教授，江西陶瓷工艺美术职业技术学院客座教授。中国环境艺术委员会学术顾问。" : "Lecturer and official director leading environment art advisory roles across state ministries and art boards."}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-moonwhite border border-stonegrey/15 rounded-sm flex items-start space-x-3 shadow-xs">
                  <div className="font-mono text-sm text-yellow-500 font-bold">B.</div>
                  <div>
                    <strong className="block mb-1 font-display tracking-wide">{lang === "zh" ? "材料综合实验室" : "Materials Laboratory"}</strong>
                    <span className="text-[11px] text-stonegrey/70 leading-relaxed block">
                      {lang === "zh" ? "在景德镇高温窑变釉料、高分子宣纸纤维扩散中建模，创造非凡的『第三条合成路线』。" : "Developing specialized paint formulas that register Earth gravity forces and microscopic physical erosion on paper."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right section: Beautiful structural visual mockup framed elegantly like galleries (5 cols) */}
            <div className="lg:col-span-5 relative group flex justify-center">
              <div className="relative aspect-[3/4] w-full max-w-sm bg-silk p-4 border border-stonegrey/20 shadow-lg">
                <div className="absolute inset-0 wu-silicon-dot-grid opacity-25" />
                
                {/* SVG portrait representation of a working contemporary visual scientist */}
                <div className="relative w-full h-full bg-[#141414] border border-stonegrey/10 overflow-hidden flex flex-col justify-between p-6">
                  <span className="font-mono text-[8.5px] text-stonegrey uppercase tracking-widest block">
                    WU_STUDIO_MONITOR // 工作现场
                  </span>

                  <div className="flex-1 flex flex-col justify-center items-center py-6 text-center space-y-4">
                    {/* Visual schematic of paint dripping gnarled branch */}
                    <svg className="w-24 h-24 stroke-charcoal stroke-[1.2] fill-none" viewBox="0 0 100 100">
                      <line x1="10" y1="10" x2="90" y2="10" strokeDasharray="3 3" />
                      <line x1="50" y1="0" x2="50" y2="100" strokeDasharray="3 3" />
                      
                      {/* Gnarled tree */}
                      <path d="M 50 100 Q 40 70 45 40 T 30 15" strokeLinecap="round" />
                      <path d="M 45 55 Q 65 45 75 35" />
                      
                      {/* Heavy rainwater lines */}
                      <line x1="30" y1="10" x2="30" y2="85" stroke="#cb6d31" strokeWidth="0.8" />
                      <line x1="60" y1="15" x2="60" y2="90" stroke="#2ecc71" strokeWidth="0.8" />
                      <line x1="75" y1="20" x2="75" y2="95" stroke="#9b59b6" strokeWidth="0.8" />
                    </svg>

                    <div className="space-y-1 select-text">
                      <p className="font-display font-medium text-xs text-charcoal">
                        STUDIO PORTRAIT SCHEMATIC // 创作中
                      </p>
                      <p className="font-serif italic text-[11px] text-stonegrey">
                        *Shanghai & Jingdezhen (上海 / 景德镇双向往返材料实验)
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[8.5px] font-mono text-stonegrey/50">
                    <span>COORDINATE_9 // STABLE</span>
                    <span>GRAVITY FORCE // YES</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* LITERATURE & TIMELINE ACADEMIC SECTION */}
        <ArchiveSection />

      </main>

      {/* FOOTER - Tactile & High End Journal Layout */}
      <footer className="bg-charcoal text-moonwhite border-t border-stonegrey/30 pt-16 pb-12 select-none z-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-start gap-12">
          
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center space-x-2.5">
              <Landmark className="w-5 h-5 text-yellow-500" />
              <span className="font-display font-semibold text-sm tracking-widest uppercase">
                WU XIAODONG STUDIO
              </span>
            </div>
            <p className="font-serif text-sm text-stonegrey/70 leading-relaxed">
              Represented internationally for institutions, fine curators, and state museums. Exploring the organic dialogue between Carbon-Based biology and Silicon informatics.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-[11px] font-mono tracking-widest text-stonegrey/80">
            <div className="space-y-3">
              <span className="text-[10px] text-stonegrey/50 block font-bold uppercase select-none">ARCHITECTURE</span>
              <ul className="space-y-2.5">
                <li><button onClick={() => scrollToSection("portfolio-section")} className="hover:text-white transition-colors cursor-pointer text-[10px] uppercase">PORTFOLIO // 作品展厅</button></li>
                <li><button onClick={() => scrollToSection("philosophy-section")} className="hover:text-white transition-colors cursor-pointer text-[10px] uppercase">PHILOSOPHY // 视觉哲学</button></li>
                <li><button onClick={() => scrollToSection("bio-section")} className="hover:text-white transition-colors cursor-pointer text-[10px] uppercase">BIOGRAPHY // 学术背景</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] text-stonegrey/50 block font-bold uppercase select-none">ACADEMICS</span>
              <ul className="space-y-2.5 uppercase">
                <li><a href="#archive-section" className="hover:text-white transition-colors text-[10px]">ARTFORUM REVIEWS // 艺术论坛</a></li>
                <li><a href="#archive-section" className="hover:text-white transition-colors text-[10px]">POWERLONG SOLO TIMELINE // 宝龙个展</a></li>
                <li><a href="#archive-section" className="hover:text-white transition-colors text-[10px]">THE THIRD ROUTE // 第三路线</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1 space-y-3">
              <span className="text-[10px] text-stonegrey/50 block font-bold uppercase select-none">VERIFICATION</span>
              <div className="flex flex-col space-y-2 select-none">
                <div className="flex items-center space-x-2 text-[10px] text-stonegrey/70 uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>C_CODE://STABLE</span>
                </div>
                <div className="text-[10px] text-stonegrey/60 italic lowercase">
                  *CARGO COLLECTIVE & GITHUB PAGES INTEGRATION SANITIZED.
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-stonegrey/15 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-[#484844]/65 select-none">
          <span>ALL BIOLOGICAL AND GRAPHIC CODES REGISTERED UNDER THE THIRD ROUTE.</span>
          <span>© 2026 WU XIAODONG. DESIGN BY DIGITAL LAB AGENT.</span>
        </div>
      </footer>

      {/* Floating curatorial chat assistant */}
      <LabAssistant />

      {/* Selected artwork details suspended magnifying detail modal panel with bleed traces */}
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}

    </div>
  );
}
