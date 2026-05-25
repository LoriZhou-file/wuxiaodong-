import { useEffect, useRef, useState, MouseEvent } from "react";
import { Artwork } from "../data";
import { X, ZoomIn, Info, RotateCcw, Droplet } from "lucide-react";
import { motion } from "motion/react";

interface ArtworkDetailModalProps {
  artwork: Artwork;
  onClose: () => void;
}

interface BleedSpot {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
}

export default function ArtworkDetailModal({ artwork, onClose }: ArtworkDetailModalProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bleedSpots, setBleedSpots] = useState<BleedSpot[]>([]);
  const [isSimulating, setIsSimulating] = useState(true);

  // Set up the micro ink bleeding simulation context
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = 400;
    let height = canvas.height = 400;

    // Prefill with some initial biological core cells depending on artwork's colors
    const initialSpots: BleedSpot[] = [
      { x: 150, y: 150, radius: 5, maxRadius: 40 + Math.random() * 20, color: artwork.colorPalette[0], alpha: 0.8 },
      { x: 250, y: 200, radius: 2, maxRadius: 35 + Math.random() * 20, color: artwork.colorPalette[1], alpha: 0.7 },
      { x: 180, y: 260, radius: 3, maxRadius: 50 + Math.random() * 10, color: artwork.colorPalette[2] || "#121210", alpha: 0.6 }
    ];

    let currentSpots = [...initialSpots];

    let animId: number;
    const animate = () => {
      ctx.fillStyle = "#141414"; // Modern charcoal-infused Xuan paper tint
      ctx.fillRect(0, 0, width, height);

      // Draw paper base grid
      ctx.strokeStyle = "rgba(242, 242, 242, 0.03)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < width; i += 20) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
        ctx.stroke();
      }

      // Render and diffuse bleeding pigment spots
      currentSpots.forEach((spot) => {
        if (spot.radius < spot.maxRadius) {
          spot.radius += 0.25; // slow chemical bleeding rate
          spot.alpha = Math.max(0.1, spot.alpha - 0.002);
        }

        // Draw outer diffused bloom representing the porous Xuan大分子
        const gradient = ctx.createRadialGradient(
          spot.x, spot.y, spot.radius * 0.1,
          spot.x, spot.y, spot.radius
        );
        gradient.addColorStop(0, spot.color);
        gradient.addColorStop(0.3, spot.color);
        gradient.addColorStop(1, "rgba(20, 20, 20, 0)"); // bleed transition boundary

        ctx.beginPath();
        ctx.globalAlpha = spot.alpha;
        ctx.fillStyle = gradient;
        ctx.arc(spot.x, spot.y, spot.radius, 0, Math.PI * 2);
        ctx.fill();

        // Core nucleus
        ctx.beginPath();
        ctx.globalAlpha = spot.alpha * 1.5;
        ctx.fillStyle = spot.color;
        ctx.arc(spot.x, spot.y, spot.radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Overlay biological lines representing "Vertical Flux"
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = artwork.colorPalette[0];
      currentSpots.forEach((spot) => {
        ctx.beginPath();
        ctx.moveTo(spot.x, spot.y);
        ctx.lineTo(spot.x, spot.y + spot.radius * 1.2); // gravity run-off
        ctx.stroke();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [artwork, isSimulating]);

  // Click handler to inject simulated active ink pigments
  const handleCanvasClick = (e: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Pick a random color from the color palette
    const color = artwork.colorPalette[Math.floor(Math.random() * artwork.colorPalette.length)];

    const newSpot: BleedSpot = {
      x,
      y,
      radius: 1,
      maxRadius: Math.random() * 45 + 15,
      color,
      alpha: 0.85
    };

    // Trigger state or direct mutated render list
    setBleedSpots((prev) => [...prev, newSpot]);
    // Also push to simulation loop immediately
    canvasRef.current && (canvasRef.current as any)._spots?.push(newSpot);
    
    // Add to direct spots
    const activeCanvasSpots = (canvas as any)._spots || [];
    activeCanvasSpots.push(newSpot);
    (canvas as any)._spots = activeCanvasSpots;
    
    // Fallback: force retrigger loop list
    // Quick mutation of local closure spots list
    const simulatedSpotList = (canvas as any)._spots;
    if (simulatedSpotList) {
      // Re-link
    }
  };

  const resetSimulation = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      (canvas as any)._spots = [];
    }
    setBleedSpots([]);
    setIsSimulating(!isSimulating);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/85 backdrop-blur-md">
      {/* Background closer */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative bg-moonwhite border border-stonegrey/30 text-charcoal w-full max-w-4xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-lg overflow-hidden flex flex-col md:flex-row shadow-2xl wu-paper-fiber-bg"
      >
        {/* Close Button absolute */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-charcoal text-moonwhite hover:bg-zinc-800 rounded-full cursor-pointer z-20 outline-none transition-colors"
          title="Close Macro View"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Section: Interactive Bleed Lab / Visual Abstraction (Aspect ratio square context) */}
        <div className="flex-1 bg-silk border-r border-stonegrey/15 flex flex-col justify-between p-6">
          <div>
            <div className="flex items-center space-x-2.5 mb-2">
              <ZoomIn className="w-5 h-5 text-stonegrey" />
              <span className="font-mono text-[10px] tracking-widest text-[#F2F2F2]/90 uppercase">
                MACRO BLEED SIMULATOR // 宣纸纤维渗化建模室
              </span>
            </div>
            <p className="font-serif text-xs text-stonegrey/70 leading-relaxed max-w-sm mb-4">
              Click within the porous canvas matrix to biological inject carbon ink pigment. Observe it saturate, diffuse, and follow gravity trails dynamically.
            </p>
          </div>

          {/* Interactive HTML5 Canvas Container */}
          <div className="flex-1 flex items-center justify-center bg-[#0a0a0a] rounded-sm relative overflow-hidden aspect-square h-[300px] w-[300px] mx-auto border border-stonegrey/10 shadow-inner">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              className="block cursor-crosshair max-w-full"
              title="Click to drop ink dots // 单击滴落水墨点"
            />
            
            {/* Fine framing codes */}
            <div className="absolute top-2 left-2 pointer-events-none text-[8px] font-mono text-stonegrey/40">
              CELL_SIZE_SIGMA_N // PULSATING_FIELD
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none text-[8px] font-mono text-stonegrey/40">
              CLICK_MATRIX TO INJECT PIGMENTS // 墨合流动规律
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-1 font-mono text-[9px] text-[#4af]">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-stonegrey/60 tracking-wider">MAT_SIMULATOR_STABLE // 算法介入成功</span>
            </div>
            <button
              onClick={resetSimulation}
              className="flex items-center space-x-1.5 font-mono text-[10px] bg-charcoal text-moonwhite hover:bg-stonegrey py-1.5 px-3 rounded-xs cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>CLEAR INK // 清理墨迹</span>
            </button>
          </div>
        </div>

        {/* Right Section: Curatorial Academic Metadata (Serif) */}
        <div className="w-full md:w-[420px] p-8 flex flex-col justify-between overflow-y-auto bg-moonwhite select-text">
          <div className="space-y-6">
            <div>
              <span className="font-mono text-[10px] text-yellow-600 tracking-widest block uppercase mb-1">
                {artwork.category === "dot" ? "Dot (Genetic Coding)" : artwork.category === "line" ? "Line (Vertical Flux)" : "Bio-matrix (Materiality)"}
              </span>
              <h2 className="font-display font-semibold text-2xl text-charcoal tracking-tight mb-1">
                {artwork.title}
              </h2>
              <span className="font-sans italic text-charcoal/60 text-sm block">
                {artwork.titleEn}
              </span>
            </div>

            {/* Spec details array */}
            <div className="grid grid-cols-2 gap-y-3.5 gap-x-4 border-t border-b border-stonegrey/15 py-4.5 font-mono text-xs text-stonegrey">
              <div>
                <span className="text-[10px] text-stonegrey/50 block tracking-widest uppercase mb-0.5">YEAR // 年份</span>
                <span className="text-charcoal font-medium">{artwork.year}</span>
              </div>
              <div>
                <span className="text-[10px] text-stonegrey/50 block tracking-widest uppercase mb-0.5">DIMENSIONS // 尺寸</span>
                <span className="text-charcoal font-medium">{artwork.dimensions}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] text-stonegrey/50 block tracking-widest uppercase mb-0.5">MEDIUM // 媒介</span>
                <span className="text-charcoal font-medium block">{artwork.medium}</span>
                <span className="text-stonegrey/60 text-[10px] italic block">{artwork.mediumEn}</span>
              </div>
            </div>

            {/* Curator review (Serif) */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-stonegrey/40">
                <Info className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase tracking-widest">CURATORIAL ESSAY // 学术解析</span>
              </div>
              <p className="font-serif text-charcoal/85 text-sm leading-relaxed text-justify">
                {artwork.description}
              </p>
              <p className="font-serif text-stonegrey/60 text-xs italic leading-relaxed text-justify">
                {artwork.descriptionEn}
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-stonegrey/10 mt-8">
            <div className="flex gap-2">
              {artwork.colorPalette.map((col, idx) => (
                <div key={idx} className="flex items-center space-x-1.5">
                  <span className="w-4 h-4 rounded-full border border-stonegrey/25" style={{ backgroundColor: col }} />
                  <span className="font-mono text-[9px] text-stonegrey/60">{col}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
