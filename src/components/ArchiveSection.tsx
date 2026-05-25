import { academicArticles, exhibitionHistory } from "../data";
import { BookOpen, MapPin, Award, ArrowUpRight } from "lucide-react";

export default function ArchiveSection() {
  return (
    <section id="archive-section" className="py-24 bg-silk/15 border-t border-stonegrey/20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left column: Academic gravity publications (Artforum lookalike) (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-stonegrey/60 uppercase tracking-widest block mb-2">
              ACADEMIC CRITIQUE // 深度学术期刊
            </span>
            <h2 className="font-display font-semibold text-3xl text-charcoal tracking-tight mb-12">
              BETWEEN CARBON AND CODE: MATERIALS CRITIQUE
            </h2>

            <div className="space-y-12">
              {academicArticles.map((article, idx) => (
                <article 
                  key={idx} 
                  className="border-b border-stonegrey/15 pb-10 last:border-0 group cursor-pointer"
                  id={`academic-article-${idx}`}
                >
                  <div className="flex items-center space-x-3 mb-4 text-stonegrey/50 font-mono text-xs">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.date}</span>
                  </div>

                  {/* Classical Serif Typography reflecting elite status */}
                  <h3 className="font-serif font-semibold text-2xl text-charcoal group-hover:text-stonegrey transition-colors tracking-tight leading-snug mb-2">
                    {article.title}
                  </h3>
                  <h4 className="font-sans italic text-sm text-stonegrey/60 mb-4">
                    {article.titleEn}
                  </h4>

                  <p className="font-serif text-charcoal/80 text-base leading-relaxed mb-4 text-justify">
                    {article.excerpt}
                  </p>
                  <p className="font-serif text-stonegrey/70 text-sm leading-relaxed mb-6 text-justify italic">
                    {article.excerptEn}
                  </p>

                  <div className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest text-charcoal hover:underline uppercase">
                    <span>READ FULL CRITIQUE // 研读全文</span>
                    <ArrowUpRight className="w-4 h-4 text-stonegrey" />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Core credit note */}
          <div className="mt-12 p-6 bg-silk border border-stonegrey/15 rounded-sm">
            <span className="font-mono text-[9px] text-stonegrey/80 tracking-widest block uppercase mb-1">
              CURATORIAL METHOD EXPLAINER
            </span>
            <p className="font-serif text-xs text-stonegrey/80 leading-relaxed">
              *Wu Xiaodong's work avoids mere simulation of landscape codes in computer shaders. Instead, it invites physical ink droplets, natural moisture diffusion, and raw earth gravity to act as analogue registers of computational complexity. This is Naturalism fully localized inside Carbon chemistry.
            </p>
          </div>
        </div>

        {/* Right column: Exhibition Timeline Chronology (5 cols) */}
        <div className="lg:col-span-5">
          <span className="font-mono text-xs text-stonegrey/60 uppercase tracking-widest block mb-2">
            Solo Exhibition records // 历史个展线索
          </span>
          <h2 className="font-display font-semibold text-3xl text-charcoal tracking-tight mb-12">
            MUSEUM LEVEL EXHIBITIONS
          </h2>

          <div className="relative border-l border-stonegrey/20 pl-6 space-y-12">
            {exhibitionHistory.map((exh, idx) => (
              <div key={idx} className="relative group" id={`exhibition-item-${idx}`}>
                {/* Visual marker of index */}
                <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-charcoal border border-moonwhite flex items-center justify-center text-moonwhite font-mono text-[8px] group-hover:bg-yellow-500 transition-colors">
                  {idx + 1}
                </div>

                <div className="font-mono text-xs text-yellow-600 font-semibold mb-2 tracking-widest">
                  {exh.year} // EXHIBITION
                </div>

                <h3 className="font-display font-medium text-lg text-charcoal tracking-tight mb-1">
                  {exh.title}
                </h3>
                
                <div className="flex items-center space-x-1.5 text-stonegrey/60 font-mono text-[10px] mb-3 uppercase tracking-wider">
                  <MapPin className="w-3 h-3 text-stonegrey/40" />
                  <span>{exh.location}</span>
                </div>

                <div className="inline-block px-2 py-0.5 bg-silk text-charcoal text-[9px] font-mono tracking-wider rounded-xs mb-3">
                  {exh.scope}
                </div>

                <p className="font-serif text-sm text-stonegrey/80 leading-relaxed">
                  {exh.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Academic validation card */}
          <div className="mt-12 p-6 border border-stonegrey/15 bg-charcoal text-moonwhite rounded-sm wu-silicon-dot-grid">
            <div className="flex items-center space-x-2.5 mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="font-display text-sm font-medium tracking-widest">
                ACADEMIC ENDORSEMENTS
              </span>
            </div>
            <ul className="space-y-3 font-mono text-[10px] text-stonegrey/80 uppercase tracking-widest">
              <li>• POWERLONG ART MUSEUM // 上海宝龙美术馆</li>
              <li>• POWERLONG ART CENTER // 上海宝龙艺术中心</li>
              <li>• NANJING ACADEMY OF ART // 南京艺术学院</li>
              <li>• XU BEIHONG ART INSTITUTE // 徐悲鸿艺术学院</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
