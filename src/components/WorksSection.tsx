import { useState } from "react";
import { artworks, artworkCategories, Artwork } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Layers, Eye, MoveRight } from "lucide-react";

interface WorksSectionProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export default function WorksSection({ onSelectArtwork }: WorksSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "dot" | "line" | "biomatrix">("all");

  const filteredArtworks = selectedCategory === "all" 
    ? artworks 
    : artworks.filter((art) => art.category === selectedCategory);

  // Render highly specific SVG artwork abstractions according to their visual nature
  const renderArtworkAbstraction = (type: Artwork["visualType"], colors: string[]) => {
    switch (type) {
      case "dots":
        return (
          <svg className="w-full h-full bg-[#141414] wu-silicon-dot-grid transition-transform duration-1000 group-hover:scale-110" viewBox="0 0 100 150">
            {/* Base gradient paper bleed */}
            <radialGradient id="grad-dots" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#2c2c2a" stopOpacity="1" />
              <stop offset="100%" stopColor="#141414" stopOpacity="0.4" />
            </radialGradient>
            <rect width="100" height="150" fill="url(#grad-dots)" />
            
            {/* Nested cells matrix representing the "Genetic Coding" */}
            <circle cx="50" cy="70" r="28" fill="none" stroke={colors[1]} strokeWidth="0.5" strokeDasharray="2 2" />
            <circle cx="50" cy="70" r="20" fill={colors[0]} fillOpacity="0.85" />
            <circle cx="50" cy="70" r="14" fill={colors[1]} fillOpacity="0.9" />
            <circle cx="50" cy="70" r="6" fill={colors[2]} />
            
            {/* Satellites */}
            <circle cx="25" cy="40" r="10" fill={colors[0]} fillOpacity="0.4" />
            <circle cx="25" cy="40" r="5" fill={colors[1]} />
            <circle cx="75" cy="50" r="12" fill={colors[2]} fillOpacity="0.6" />
            <circle cx="75" cy="50" r="4" fill={colors[0]} />
            <circle cx="45" cy="115" r="14" fill={colors[0]} fillOpacity="0.7" />
            
            {/* Drip tails */}
            <line x1="50" y1="70" x2="50" y2="130" stroke={colors[0]} strokeWidth="1.2" strokeLinecap="round" />
            <line x1="25" y1="40" x2="25" y2="100" stroke={colors[1]} strokeWidth="0.8" />
            <line x1="75" y1="50" x2="75" y2="110" stroke={colors[2]} strokeWidth="0.7" />
            
            {/* Fine grain matrix texturing */}
            <circle cx="50" cy="70" r="3" fill="#ffffff" />
          </svg>
        );
      case "vertical-fluid":
        return (
          <svg className="w-full h-full bg-[#181818] transition-transform duration-1000 group-hover:scale-110" viewBox="0 0 100 150">
            {/* Ground */}
            <rect width="100" height="150" fill="#111111" />
            <path d="M 0 100 Q 50 140 100 100 L 100 150 L 0 150 Z" fill={colors[1]} fillOpacity="0.9" />
            
            {/* Golden or colorful pine tree skeleton */}
            <path d="M 50 150 Q 42 100 48 50 Q 55 20 45 10" fill="none" stroke={colors[0]} strokeWidth="2.5" strokeLinecap="round" />
            {/* Branch cluster coordinates */}
            <path d="M 47 70 Q 20 60 15 50" fill="none" stroke={colors[0]} strokeWidth="1.2" />
            <path d="M 48 90 Q 75 80 85 75" fill="none" stroke={colors[0]} strokeWidth="1.2" />
            <path d="M 48 110 Q 25 105 18 100" fill="none" stroke={colors[0]} strokeWidth="1.5" />
            
            {/* Intensive fluid-flow rainfall line masking */}
            <g opacity="0.75">
              {Array.from({ length: 15 }).map((_, idx) => {
                const x = 10 + idx * 6;
                const length = 110 + Math.sin(idx) * 30;
                return (
                  <line 
                    key={idx}
                    x1={x} 
                    y1="5" 
                    x2={x} 
                    y2={length} 
                    stroke={idx % 3 === 0 ? colors[0] : idx % 3 === 1 ? colors[2] : colors[3]} 
                    strokeWidth="0.65" 
                    strokeDasharray="40 5 10 2"
                    strokeLinecap="round"
                  />
                );
              })}
            </g>
          </svg>
        );
      case "cells-veins":
        return (
          <svg className="w-full h-full bg-stone-900 transition-transform duration-1000 group-hover:scale-110" viewBox="0 0 100 150">
            <rect width="100" height="150" fill="#181816" />
            
            {/* Multi-layered cellular clusters representing paper capillaries */}
            <g opacity="0.8">
              <circle cx="50" cy="75" r="35" fill="none" stroke={colors[2]} strokeWidth="0.5" />
              <circle cx="35" cy="65" r="22" fill="#121210" stroke={colors[2]} strokeWidth="0.8" />
              <circle cx="65" cy="85" r="24" fill="#2d2d2a" stroke={colors[2]} strokeWidth="0.8" />
              <circle cx="50" cy="95" r="18" fill="#1c1c1a" stroke={colors[2]} strokeWidth="0.6" />
            </g>

            {/* Glowing yellow cells bleeding */}
            <circle cx="35" cy="65" r="8" fill={colors[3]} fillOpacity="0.7" />
            <circle cx="65" cy="85" r="10" fill={colors[3]} fillOpacity="0.5" />
            
            {/* Heavy ink vectors crossing */}
            <path d="M 10 10 C 35 40, 65 110, 90 140" fill="none" stroke="#000000" strokeWidth="8" strokeOpacity="0.8" strokeLinecap="round" />
            <path d="M 90 20 C 60 50, 40 100, 10 130" fill="none" stroke="#222220" strokeWidth="6" strokeOpacity="0.6" strokeLinecap="round" />
            
            {/* White dendritic nerve network on top */}
            <path d="M 10 10 C 35 40, 65 110, 90 140" fill="none" stroke={colors[2]} strokeWidth="0.75" strokeLinecap="round" />
            <path d="M 24 28 L 15 40" fill="none" stroke={colors[2]} strokeWidth="0.5" />
            <path d="M 43 54 L 55 45" fill="none" stroke={colors[2]} strokeWidth="0.5" />
            <path d="M 58 90 L 48 105" fill="none" stroke={colors[2]} strokeWidth="0.5" />
            <path d="M 76 118 L 88 110" fill="none" stroke={colors[2]} strokeWidth="0.5" />
          </svg>
        );
      case "purple-bamboo":
        return (
          <svg className="w-full h-full bg-[#3d244c] transition-transform duration-1000 group-hover:scale-110" viewBox="0 0 100 150">
            {/* Night moon gradient aura */}
            <radialGradient id="grad-purple" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f4f6f7" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3d244c" stopOpacity="0" />
            </radialGradient>
            <circle cx="50" cy="60" r="30" fill="url(#grad-purple)" />
            
            {/* Vertical green bamboo */}
            <g stroke={colors[1]} strokeLinecap="round" fill="none">
              {/* Stem 1 */}
              <path d="M 30 150 L 30 110" strokeWidth="2" />
              <path d="M 30 107 L 30 65" strokeWidth="1.8" />
              <path d="M 30 62 L 30 10" strokeWidth="1.6" />
              {/* Bamboo Segment Rings */}
              <circle cx="30" cy="110" r="2.5" fill={colors[1]} stroke="none" />
              <circle cx="30" cy="65" r="2.2" fill={colors[1]} stroke="none" />
              
              {/* Stem 2 */}
              <path d="M 70 150 L 72 90" strokeWidth="1.5" />
              <path d="M 72 87 L 75 20" strokeWidth="1.3" />
            </g>

            {/* Bamboo leaves with carbon wash */}
            <path d="M 30 65 Q 15 45 5 48" fill={colors[3]} opacity="0.6" />
            <path d="M 30 65 Q 45 55 55 60" fill={colors[1]} />
            <path d="M 72 87 Q 85 75 92 82" fill={colors[1]} />
            <path d="M 72 87 Q 55 80 48 70" fill={colors[3]} opacity="0.6" />
          </svg>
        );
      case "pine-shadow":
        return (
          <svg className="w-full h-full bg-[#1c140e] transition-transform duration-1000 group-hover:scale-110" viewBox="0 0 100 150">
            {/* Sun disk */}
            <circle cx="50" cy="65" r="35" fill="#2d251d" />
            
            {/* Dense Pine Canopy branch */}
            <path d="M 10 120 Q 40 100 65 110 T 95 90" fill="none" stroke={colors[3]} strokeWidth="4" strokeLinecap="round" />
            <path d="M 40 108 Q 50 70 65 65" fill="none" stroke={colors[3]} strokeWidth="2.5" />
            
            {/* Gnarled pine needles (deep green cellular clouds) */}
            <g fill={colors[1]} fillOpacity="0.85">
              <circle cx="35" cy="110" r="10" />
              <circle cx="65" cy="112" r="12" />
              <circle cx="58" cy="65" r="9" />
              <circle cx="70" cy="62" r="8" />
              <circle cx="85" cy="95" r="11" />
            </g>

            {/* Gravity droplets white flow lines */}
            <line x1="35" y1="110" x2="35" y2="140" stroke="#f4f6f7" strokeWidth="0.8" />
            <line x1="65" y1="112" x2="65" y2="145" stroke="#f4f6f7" strokeWidth="0.8" />
            <line x1="58" y1="65" x2="58" y2="120" stroke="#f4f6f7" strokeWidth="0.6" />
          </svg>
        );
      default:
        return <div className="w-full h-full bg-stone-100" />;
    }
  };

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
              {/* Outer image placeholder frame container with micro Xuan paper bleach filter and zoom transition */}
              <div className="relative aspect-[3/4.2] w-full overflow-hidden mb-6 bg-silk border border-stonegrey/10 shadow-xs">
                {renderArtworkAbstraction(art.visualType, art.colorPalette)}
                
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
                  <h3 className="font-display font-medium text-base text-charcoal tracking-tight group-hover:text-stonegrey transition-colors mb-1">
                    {art.title}
                  </h3>
                  <p className="font-sans italic text-xs text-stonegrey/60">
                    {art.titleEn}
                  </p>
                </div>
                <div className="flex flex-col items-end text-right font-mono text-[10px] text-stonegrey">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-stonegrey/50" />
                    <span>{art.year}</span>
                  </div>
                  <span className="text-stonegrey/50 text-[9px] mt-0.5">{art.mediumEn}</span>
                </div>
              </div>

              {/* Quick teaser of the micro-scale logic */}
              <div className="mt-4 pt-4 border-t border-stonegrey/10 flex items-center justify-between text-[10px] text-stonegrey/50 font-mono tracking-widest uppercase">
                <span>VIEW MATERIALS BIOLOGY</span>
                <MoveRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform text-stonegrey/70" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
