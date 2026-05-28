import { useState } from "react";
import { artworks, artworkCategories, Artwork } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Layers, Eye, MoveRight } from "lucide-react";

interface WorksSectionProps {
  lang: "zh" | "en";
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function WorksSection({ lang, onSelectArtwork }: WorksSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "dot" | "line" | "biomatrix">("all");

  const filteredArtworks = selectedCategory === "all" 
    ? artworks 
    : artworks.filter((art) => art.category === selectedCategory);

  return (
    <section id="portfolio-section" className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-stonegrey/20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <span className="font-mono text-xs text-stonegrey/60 uppercase tracking-widest block mb-2">
            Selected Works Portfolio // 作品档案
          </span>
          <h2 className="font-display font-medium text-3xl md:text-4xl text-charcoal tracking-tight">
            DECONSTRUCTING BIOLOGICAL CODES
          </h2>
        </div>
        
        {/* Curatorial category filters with no-scrollbar wrapper */}
        <div className="flex bg-silk/40 p-1 rounded-sm border border-stonegrey/10 overflow-x-auto select-none no-scrollbar max-w-full">
          {artworkCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 text-xs font-mono tracking-wider cursor-pointer transition-all duration-300 rounded-sm whitespace-nowrap ${
                selectedCategory === cat.key
                  ? "bg-charcoal text-moonwhite shadow-xs"
                  : "text-stonegrey/70 hover:text-charcoal"
              }`}
            >
              {cat.key === "all" ? "ALL" : cat.key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Description of current category */}
      <div className="mb-10 text-xs font-mono text-stonegrey/80 border-l-[3px] border-charcoal pl-3 max-w-4xl py-1">
        {artworkCategories.find((cat) => cat.key === selectedCategory)?.desc}
      </div>

      {/* Irregular Bento Grid of Artworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filteredArtworks.map((art) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 15 }}
              key={art.id}
              className="group flex flex-col bg-silk/25 border border-stonegrey/15 rounded-sm p-4 hover:border-charcoal/60 transition-all cursor-pointer"
              onClick={() => onSelectArtwork(art)}
              id={`artwork-card-${art.id}`}
            >
              {/* 核心改动：这里直接读取你在 data.ts 里替换的高清真实作品图片 URL */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden mb-6 bg-silk border border-stonegrey/10 shadow-xs">
                
                <img 
                  src={art.imageUrl} 
                  alt={lang === "zh" ? art.title : art.titleEn}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Micro hover shadow and code elements overlay */}
                <div className="absolute inset-0 bg-charcoal/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <div className="bg-moonwhite px-3 py-1.5 rounded-sm shadow-md flex items-center space-x-2 text-xs font-mono text-charcoal tracking-widest scale-95 group-hover:scale-100 transition-all">
                    <Eye className="w-3.5 h-3.5 text-stonegrey" />
                    <span>ENTER MACRO VIEW // 微观特写</span>
                  </div>
                </div>

                {/* Subtitle indicators */}
                <div className="absolute top-3 left-3 bg-charcoal/85 border border-moonwhite/20 text-moonwhite/90 text-[8px] font-mono px-1.5 py-0.5 uppercase tracking-widest">
                  {art.category === "dot" ? "DOT_MATRIX" : art.category === "line" ? "LINE_FLUX" : "MATERIAL_MATRIX"}
                </div>
                <div className="absolute bottom-3 right-3 text-stonegrey/60 font-mono text-[9px] bg-moonwhite/80 p-1 rounded-xs backdrop-blur-xs">
                  {art.dimensions}
                </div>
              </div>

              {/* Artwork Metadata */}
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-base text-charcoal tracking-tight group-hover:text-amber-500 transition-colors mb-1">
                    {art.title}
                  </h3>
                  <p className="font-sans italic text-xs text-stonegrey/80">
                    {art.titleEn}
                  </p>
                </div>
                <div className="flex flex-col items-end text-right font-mono text-[10px] text-stonegrey">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-stonegrey/60" />
                    <span>{art.year}</span>
                  </div>
                  <span className="text-stonegrey/70 text-[9px] mt-0.5">{lang === "zh" ? art.medium : art.mediumEn}</span>
                </div>
              </div>

              {/* Dedicated reserved dimensions and medium description display panel */}
              <div className="mt-3.5 pt-2 border-t border-stonegrey/15 grid grid-cols-2 gap-2 text-[10px] font-mono select-text">
                <div className="flex flex-col">
                  <span className="text-stonegrey/60 uppercase tracking-widest">{lang === "zh" ? "尺寸 DIMENSIONS" : "DIMENSIONS"}</span>
                  <span className="text-charcoal font-sans font-medium mt-0.5">{art.dimensions}</span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="text-stonegrey/60 uppercase tracking-widest">{lang === "zh" ? "分类 CATEGORY" : "CATEGORY"}</span>
                  <span className="text-charcoal font-sans font-medium mt-0.5">
                    {lang === "zh" 
                      ? (art.category === "dot" ? "基因点阵" : art.category === "line" ? "重力线条" : "生物纸本基质")
                      : art.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Pre-reserved clean curatorial description paragraph box */}
              <div className="mt-3 bg-moonwhite/30 p-2.5 rounded-xs border border-stonegrey/10 select-text text-[11.5px] font-serif leading-relaxed text-stonegrey/90 text-justify">
                <p className="line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                  {lang === "zh" ? art.description : art.descriptionEn}
                </p>
              </div>

              {/* Quick teaser of the micro-scale logic */}
              <div className="mt-3 pt-3 border-t border-stonegrey/10 flex items-center justify-between text-[10px] text-stonegrey/50 font-mono tracking-widest uppercase">
                <span>{lang === "zh" ? "开启重力渗化实验" : "SIMULATE INK INFILTRATION"}</span>
                <MoveRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-stonegrey/70" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
