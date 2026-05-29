"use client";

import React, { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Sparkles, Award } from "lucide-react";

interface SkillGraphCanvasProps {
  parentSkills: any[];
  selectedSkill: any;
  setSelectedSkill: (skill: any) => void;
  fetchCareerProgress: () => void;
  careerGoal: string | null;
}

export default function SkillGraphCanvas({
  parentSkills,
  selectedSkill,
  setSelectedSkill,
  fetchCareerProgress,
  careerGoal,
}: SkillGraphCanvasProps) {
  const [hoveredNode, setHoveredNode] = useState<any | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isGoalHovered, setIsGoalHovered] = useState(false);

  const [zoom, setZoom] = useState(1.0);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  const [nodeOffsets, setNodeOffsets] = useState<Record<string, { dx: number; dy: number }>>({});
  const [draggedNode, setDraggedNode] = useState<{ id: string; startX: number; startY: number } | null>(null);

  const centerX = 550;
  const centerY = 400;
  const parentRadius = 265; // Spacious orbit far away from center Goal
  const childRadius = 125;  // Ample radial distance for sub-skills

  const goalName = careerGoal || parentSkills[0]?.category || "Software Practitioner";
  const averageProgress = parentSkills.length > 0 
    ? Math.round(parentSkills.reduce((acc, curr) => acc + (curr.progress || 0), 0) / parentSkills.length)
    : 0;

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setDraggedNode({
      id,
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    setDraggedNode({
      id: "canvas",
      startX: e.clientX,
      startY: e.clientY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNode) return;
    e.preventDefault();

    const deltaX = e.clientX - draggedNode.startX;
    const deltaY = e.clientY - draggedNode.startY;

    setDraggedNode({
      id: draggedNode.id,
      startX: e.clientX,
      startY: e.clientY,
    });

    if (draggedNode.id === "canvas") {
      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
    } else {
      setNodeOffsets((prev) => {
        const current = prev[draggedNode.id] || { dx: 0, dy: 0 };
        return {
          ...prev,
          [draggedNode.id]: {
            dx: current.dx + deltaX / zoom, // Drag proportionally to zoom
            dy: current.dy + deltaY / zoom,
          },
        };
      });
    }
  };

  const handleMouseUp = () => {
    setDraggedNode(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    const zoomIntensity = 0.05;
    let newZoom = zoom;
    if (e.deltaY < 0) {
      newZoom = Math.min(zoom + zoomIntensity, 3.0);
    } else {
      newZoom = Math.max(zoom - zoomIntensity, 0.4);
    }
    setZoom(newZoom);
  };

  // For mobile touch gestures
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [touchStartZoom, setTouchStartZoom] = useState<number>(1.0);
  const [lastTouchPos, setLastTouchPos] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      setLastTouchPos({ x: touch.clientX, y: touch.clientY });
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setTouchStartDist(dist);
      setTouchStartZoom(zoom);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && lastTouchPos) {
      const touch = e.touches[0];
      const deltaX = touch.clientX - lastTouchPos.x;
      const deltaY = touch.clientY - lastTouchPos.y;
      setPanOffset((prev) => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      setLastTouchPos({ x: touch.clientX, y: touch.clientY });
    } else if (e.touches.length === 2 && touchStartDist !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (touchStartDist > 0) {
        const factor = dist / touchStartDist;
        const newZoom = Math.max(0.4, Math.min(3.0, touchStartZoom * factor));
        setZoom(newZoom);
      }
    }
  };

  const handleTouchEnd = () => {
    setLastTouchPos(null);
    setTouchStartDist(null);
  };


  const parentNodes = parentSkills.map((skill, i) => {
    const angle = (i * 2 * Math.PI) / parentSkills.length - Math.PI / 2;
    const baseX = centerX + parentRadius * Math.cos(angle);
    const baseY = centerY + parentRadius * Math.sin(angle);

    const offset = nodeOffsets[skill.id] || { dx: 0, dy: 0 };
    const x = baseX + offset.dx;
    const y = baseY + offset.dy;

    const color = skill.progress >= 70 ? "#059669" : skill.progress >= 30 ? "#2563eb" : "#3b82f6";
    return {
      ...skill,
      baseX,
      baseY,
      x,
      y,
      angle,
      color,
    };
  });

  const childNodes: any[] = [];
  parentNodes.forEach((parent) => {
    const children = parent.children || [];
    const M = children.length;
    if (M === 0) return;

    children.forEach((child: any, j: number) => {
      let childAngle = parent.angle;
      if (M > 1) {
        const span = 0.85; 
        childAngle = parent.angle + span * (j / (M - 1) - 0.5);
      }
      
      const baseX = parent.x + childRadius * Math.cos(childAngle);
      const baseY = parent.y + childRadius * Math.sin(childAngle);

      const childOffset = nodeOffsets[child.id] || { dx: 0, dy: 0 };
      const x = baseX + childOffset.dx;
      const y = baseY + childOffset.dy;

      const color = child.progress >= 70 ? "#059669" : child.progress >= 30 ? "#2563eb" : "#3b82f6";

      childNodes.push({
        ...child,
        parentId: parent.id,
        parentX: parent.x,
        parentY: parent.y,
        x,
        y,
        color,
      });
    });
  });

  const handleHoverGoal = (isEntering: boolean) => {
    setIsGoalHovered(isEntering);
    if (isEntering) {
      setHoveredNode({
        name: goalName,
        type: "Jalur Karir Aktif (Goal Core)",
        progress: averageProgress,
        description: "Sasaran karir terpilih saat ini. Seluruh Sub Skill dan Skill terintegrasi langsung di bawah jalur kompetensi komprehensif ini.",
      });
    } else {
      setHoveredNode(null);
    }
  };

  return (
    <GlassCard hoverGlow={false} className="w-full relative min-h-[500px] md:min-h-[780px] border border-primary-blue/5 bg-white shadow-md rounded-2xl flex flex-col animate-[fadeIn_0.5s_ease-out] overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 p-4 pb-3 mb-1 bg-white z-10 select-none">
        <div>
          <h3 className="text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
            ✦ Peta Graf Kemampuan Interaktif (Spacious Celestial Constellation)
          </h3>
          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
            Cubit layar untuk zoom • Tarik background untuk pan/geser • Drag node untuk memindahkan bintang
          </p>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-blue" /> Unlocked</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Expert</span>
        </div>
      </div>

      <div className="flex-1 relative bg-slate-50/50 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
        {/* Grid Background Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.015)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        {/* Floating Zoom & Pan Controls */}
        <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2 bg-white/95 border border-primary-blue/15 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md select-none">
          <button 
            onClick={() => setZoom(prev => Math.min(prev + 0.15, 3.0))}
            className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-650 hover:bg-primary-blue/10 hover:text-primary-blue font-black flex items-center justify-center transition-colors cursor-pointer shadow-sm text-sm"
            title="Zoom In"
          >
            ＋
          </button>
          <button 
            onClick={() => setZoom(prev => Math.max(prev - 0.15, 0.4))}
            className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-650 hover:bg-primary-blue/10 hover:text-primary-blue font-black flex items-center justify-center transition-colors cursor-pointer shadow-sm text-sm"
            title="Zoom Out"
          >
            －
          </button>
          <button 
            onClick={() => {
              setZoom(1.0);
              setPanOffset({ x: 0, y: 0 });
              setNodeOffsets({});
            }}
            className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-[10px] text-slate-650 hover:bg-primary-blue/10 hover:text-primary-blue font-black flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            title="Reset Zoom & Pan"
          >
            ↺
          </button>
          <div className="w-[1px] h-5 bg-slate-200 mx-1" />
          <span className="text-[9.5px] font-black text-slate-500 w-10 text-center select-none font-outfit">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        <svg 
          className={`w-full h-[450px] md:h-[720px] select-none z-10 ${draggedNode?.id === "canvas" ? "cursor-grabbing" : "cursor-grab"}`} 
          viewBox="0 0 1100 800"
          style={{ touchAction: "none" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {/* Draggable SVG Background Rect to capture canvas panning */}
          <rect 
            width={1100} 
            height={800} 
            fill="transparent" 
            className="canvas-bg cursor-grab active:cursor-grabbing"
            onMouseDown={handleCanvasMouseDown}
          />

          {/* Group container with translation and scaling zoom factor */}
          <g 
            transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoom})`} 
            style={{ transformOrigin: "550px 400px", transition: draggedNode ? "none" : "transform 0.1s ease-out" }}
          >
            {/* Level 2: Child to Parent Connections */}
            {childNodes.map((child) => (
              <line
                key={`line-child-${child.id}`}
                x1={child.parentX}
                y1={child.parentY}
                x2={child.x}
                y2={child.y}
                stroke="rgba(37, 99, 235, 0.16)"
                strokeWidth="2.5"
                strokeDasharray="4 4"
              />
            ))}

            {/* Level 1: Parent to Center Goal Connections */}
            {parentNodes.map((parent) => (
              <line
                key={`line-parent-${parent.id}`}
                x1={centerX}
                y1={centerY}
                x2={parent.x}
                y2={parent.y}
                stroke="rgba(37, 99, 235, 0.25)"
                strokeWidth="3.5"
              />
            ))}

            {/* Concentric Constellation Orbits */}
            <circle
              cx={centerX}
              cy={centerY}
              r={parentRadius}
              fill="transparent"
              stroke="rgba(37, 99, 235, 0.05)"
              strokeWidth="2"
              strokeDasharray="6 12"
              className="pointer-events-none"
            />
            <circle
              cx={centerX}
              cy={centerY}
              r={parentRadius + childRadius}
              fill="transparent"
              stroke="rgba(37, 99, 235, 0.03)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              className="pointer-events-none"
            />

            {/* Level 0 Central Goal Node */}
            <g 
              className="cursor-pointer" 
              onClick={fetchCareerProgress}
              onMouseEnter={() => handleHoverGoal(true)}
              onMouseLeave={() => handleHoverGoal(false)}
            >
              {/* Pulsing Base Ring */}
              <circle
                cx={centerX}
                cy={centerY}
                r={isGoalHovered ? 72 : 62}
                fill="transparent"
                stroke="rgba(37, 99, 235, 0.1)"
                strokeWidth="8"
                className="transition-all duration-300 pointer-events-none"
              />
              {/* Core Circle */}
              <circle
                cx={centerX}
                cy={centerY}
                r={isGoalHovered ? 66 : 62}
                fill="#2563eb"
                stroke={isGoalHovered ? "#60a5fa" : "#93c5fd"}
                strokeWidth={isGoalHovered ? 5.5 : 4}
                className="transition-all duration-300 filter drop-shadow-[0_4px_20px_rgba(37,99,235,0.3)]"
              />
              
              {/* Wrapped Full-Career Text with zero clipping inside foreignObject */}
              <foreignObject 
                x={centerX - 55} 
                y={centerY - 30} 
                width={110} 
                height={60} 
                className="pointer-events-none"
              >
                <div className="w-full h-full flex flex-col items-center justify-center text-center text-white pointer-events-none select-none px-1">
                  <span className="text-[9px] font-black tracking-widest uppercase opacity-75 leading-none mb-0.5">GOAL</span>
                  <span className="text-[10px] font-bold tracking-wide leading-tight select-none font-outfit uppercase break-words line-clamp-3 text-sky-50">
                    {goalName}
                  </span>
                </div>
              </foreignObject>
            </g>

            {/* Level 1: Parent Nodes */}
            {parentNodes.map((node) => {
              const isSelected = selectedSkill?.id === node.id;
              const isHovered = hoveredNodeId === node.id;
              return (
                <g
                  key={`parent-${node.id}`}
                  className="cursor-pointer"
                  onClick={() => setSelectedSkill(node)}
                  onMouseEnter={() => {
                    setHoveredNodeId(node.id);
                    setHoveredNode({ ...node, type: "Skill Node" });
                  }}
                  onMouseLeave={() => {
                    setHoveredNodeId(null);
                    setHoveredNode(null);
                  }}
                >
                  {/* Glow ring */}
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={44}
                      fill="transparent"
                      stroke={node.color}
                      strokeWidth="2"
                      className="animate-ping pointer-events-none"
                      style={{ animationDuration: "2.5s" }}
                    />
                  )}

                  {/* Outer Glow Ring on Hover */}
                  {isHovered && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={41}
                      fill="transparent"
                      stroke="rgba(37, 99, 235, 0.15)"
                      strokeWidth="4.5"
                      className="transition-all duration-300 pointer-events-none"
                    />
                  )}

                  {/* Badge circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isHovered ? 38 : 34}
                    stroke={isSelected ? "#2563eb" : node.color}
                    strokeWidth={isSelected ? 5.5 : 3.5}
                    onMouseDown={(e) => handleMouseDown(e, node.id)}
                    className="transition-all duration-350 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.08)] fill-white dark:fill-slate-800"
                  />

                  {/* Text progress */}
                  <text
                    x={node.x}
                    y={node.y + 4.5}
                    textAnchor="middle"
                    fontSize={isHovered ? 13.5 : 12.5}
                    fontWeight="950"
                    className="font-outfit pointer-events-none transition-all duration-350 fill-slate-850 dark:fill-slate-100"
                  >
                    {Math.round(node.progress)}%
                  </text>

                  {/* Name banner label */}
                  <rect
                    x={node.x - 70}
                    y={node.y + 42}
                    width={140}
                    height={22}
                    rx={6}
                    strokeWidth="1.5"
                    className={`pointer-events-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)] transition-all duration-300 fill-white dark:fill-slate-800 ${
                      isHovered
                        ? "stroke-primary-blue/30 dark:stroke-primary-blue/50"
                        : "stroke-primary-blue/10 dark:stroke-slate-700"
                    }`}
                  />
                  <text
                    x={node.x}
                    y={node.y + 56}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="bold"
                    className={`font-outfit pointer-events-none transition-all duration-300 ${
                      isSelected || isHovered
                        ? "fill-primary-blue dark:fill-sky-400"
                        : "fill-slate-650 dark:fill-slate-200"
                    }`}
                  >
                    {node.name.length > 22 ? `${node.name.substring(0, 19)}..` : node.name}
                  </text>
                </g>
              );
            })}

            {/* Level 2: Child Nodes */}
            {childNodes.map((child) => {
              const isSelected = selectedSkill?.id === child.id;
              const isHovered = hoveredNodeId === child.id;
              return (
                <g
                  key={`child-${child.id}`}
                  className="cursor-pointer"
                  onClick={() => setSelectedSkill(child)}
                  onMouseEnter={() => {
                    setHoveredNodeId(child.id);
                    setHoveredNode({ ...child, type: "Sub Skill Node" });
                  }}
                  onMouseLeave={() => {
                    setHoveredNodeId(null);
                    setHoveredNode(null);
                  }}
                >
                  {/* Glow ring */}
                  {isSelected && (
                    <circle
                      cx={child.x}
                      cy={child.y}
                      r={30}
                      fill="transparent"
                      stroke={child.color}
                      strokeWidth="1.5"
                      className="animate-ping pointer-events-none"
                      style={{ animationDuration: "2s" }}
                    />
                  )}

                  {/* Badge circle */}
                  <circle
                    cx={child.x}
                    cy={child.y}
                    r={isHovered ? 26 : 22}
                    stroke={isSelected ? "#2563eb" : child.color}
                    strokeWidth={isSelected ? 4.5 : 2.5}
                    onMouseDown={(e) => handleMouseDown(e, child.id)}
                    className="transition-all duration-350 filter drop-shadow-[0_1px_5px_rgba(0,0,0,0.06)] fill-white dark:fill-slate-800"
                  />

                  {/* Text progress */}
                  <text
                    x={child.x}
                    y={child.y + 3.5}
                    textAnchor="middle"
                    fontSize={isHovered ? 11 : 9.5}
                    fontWeight="950"
                    className="font-outfit pointer-events-none transition-all duration-350 fill-slate-750 dark:fill-slate-200"
                  >
                    {Math.round(child.progress)}%
                  </text>

                  {/* Child Mini Constellation Label */}
                  <text
                    x={child.x}
                    y={child.y + 32}
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="bold"
                    className={`font-outfit pointer-events-none transition-all duration-300 ${
                      isSelected || isHovered
                        ? "fill-primary-blue dark:fill-sky-400"
                        : "fill-slate-500 dark:fill-slate-350"
                    }`}
                  >
                    {child.name.length > 16 ? `${child.name.substring(0, 14)}..` : child.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover overlay details panel inside canvas container */}
        <AnimatePresence>
          {hoveredNode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="absolute bottom-5 right-5 w-80 bg-white/95 border border-primary-blue/15 shadow-2xl p-5 rounded-2xl z-20 flex flex-col gap-3.5 backdrop-blur-md pointer-events-none select-none"
            >
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-2.5">
                <div className="w-8 h-8 rounded-lg bg-primary-blue/10 flex items-center justify-center text-primary-blue shadow-sm shrink-0">
                  <GitBranch size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[9px] text-primary-blue font-black uppercase tracking-wider block leading-none mb-1">
                    {hoveredNode.type || "Aether Node"}
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-xs truncate leading-tight">
                    {hoveredNode.name}
                  </h4>
                </div>
              </div>
              
              <p className="text-[10px] text-slate-500 font-semibold leading-relaxed">
                {hoveredNode.description || "Node ini melambangkan fondasi keahlian adaptif yang terintegrasi secara dinamis menggunakan AI."}
              </p>

              <div className="flex flex-col gap-1 border-t border-slate-50 pt-2">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-650">
                  <span>Progres Kompetensi</span>
                  <span className="text-primary-blue font-black">{Math.round(hoveredNode.progress || 0)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary-blue to-soft-cyan rounded-full transition-all duration-550"
                    style={{ width: `${hoveredNode.progress || 0}%` }}
                  />
                </div>
              </div>

              <div className="text-[8.5px] text-primary-blue font-bold flex items-center gap-1.5">
                <Sparkles size={10} className="animate-pulse" />
                <span>Level {Math.floor((hoveredNode.progress || 0) / 10) + 1} Kompetensi</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
