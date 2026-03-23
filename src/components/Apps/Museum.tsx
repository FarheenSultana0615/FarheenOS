import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, OrbitControls, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { milestones, type Milestone } from '@/data/MileStone';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronRight, ChevronDown } from 'lucide-react';

/* ── Real color values for Three.js (CSS vars don't work in WebGL) ── */
type CategoryTheme = {
  color: string;       // real HSL string for Three.js meshes
  cssColor: string;    // CSS token for HTML overlays
  icon: string;
  shape: 'box' | 'sphere' | 'octahedron' | 'dodecahedron';
};

const categoryTheme: Record<Milestone['category'], CategoryTheme> = {
  education:     { color: '#00ffff', cssColor: 'hsl(180 100% 50%)',  icon: '🎓', shape: 'octahedron' },
  career:        { color: '#00ff9d', cssColor: 'hsl(157 100% 50%)',  icon: '💼', shape: 'box' },
  certification: { color: '#ff3399', cssColor: 'hsl(320 100% 60%)',  icon: '🏆', shape: 'dodecahedron' },
  project:       { color: '#ff8c1a', cssColor: 'hsl(31 95% 52%)',   icon: '🛠', shape: 'sphere' },
};

/* ── Exhibit Component ── */
function Exhibit({
  milestone,
  position,
  isSelected,
  isMobile,
  onClick,
}: {
  milestone: Milestone;
  position: [number, number, number];
  isSelected: boolean;
  isMobile: boolean;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const theme = categoryTheme[milestone.category];
  const scale = isSelected ? (isMobile ? 1.2 : 1.34) : 1;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += isMobile ? 0.006 : 0.008;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.45) * 0.08;
    }
    if (glowRef.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  const geometry =
    theme.shape === 'box' ? <boxGeometry args={[0.62, 0.62, 0.62]} /> :
    theme.shape === 'sphere' ? <sphereGeometry args={[0.42, 32, 32]} /> :
    theme.shape === 'octahedron' ? <octahedronGeometry args={[0.48]} /> :
    <dodecahedronGeometry args={[0.42]} />;

  return (
    <group position={position}>
      {/* Pedestal */}
      <mesh position={[0, -0.8, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.32, 8]} />
        <meshStandardMaterial color="#0d1f1f" metalness={0.55} roughness={0.3} />
      </mesh>

      {/* Glow ring */}
      <mesh ref={glowRef} position={[0, -0.64, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.36, 0.52, 40]} />
        <meshBasicMaterial color={theme.color} transparent opacity={isSelected ? 0.56 : 0.22} />
      </mesh>

      {/* Sparkles */}
      <Sparkles
        count={isMobile ? 8 : 14}
        scale={isMobile ? 1.25 : 1.45}
        size={isMobile ? 1.4 : 1.8}
        speed={0.45}
        color={theme.color}
      />

      {/* Floating 3D object — COLORED */}
      <Float speed={2.3} rotationIntensity={0.35} floatIntensity={0.75}>
        <mesh
          ref={meshRef}
          scale={scale}
          onClick={(e) => { e.stopPropagation(); onClick(); }}
        >
          {geometry}
          <meshStandardMaterial
            color={theme.color}
            metalness={0.5}
            roughness={0.2}
            emissive={theme.color}
            emissiveIntensity={isSelected ? 0.7 : 0.4}
          />
        </mesh>
        {/* Wireframe overlay */}
        <mesh scale={scale * 1.06}>
          {geometry}
          <meshBasicMaterial color={theme.color} wireframe transparent opacity={0.18} />
        </mesh>
      </Float>

      {/* Emoji icon */}
      <Html position={[0, 0.9, 0]} center style={{ pointerEvents: 'none' }}>
        <div style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: 1, textShadow: '0 0 12px rgba(0,0,0,0.95)' }}>
          {theme.icon}
        </div>
      </Html>

      {/* Label */}
      <Html
        position={[0, -1.16, 0]}
        center
        distanceFactor={isMobile ? 8.5 : 7.4}
        style={{ pointerEvents: 'none' }}
      >
        <div style={{ textAlign: 'center', maxWidth: isMobile ? '132px' : '180px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' }}>
          <p style={{
            margin: 0, padding: '3px 6px', borderRadius: '6px',
            border: `1px solid ${theme.cssColor}`,
            background: 'rgba(5,13,13,0.82)',
            color: '#e5e5e5',
            fontSize: isMobile ? '10px' : '11px',
            lineHeight: 1.35,
          }}>
            {milestone.title}
          </p>
          <p style={{ margin: '4px 0 0', color: theme.cssColor, fontSize: isMobile ? '9px' : '10px' }}>
            {milestone.date}
          </p>
        </div>
      </Html>

      {/* Selection ring */}
      {isSelected && (
        <mesh position={[0, -0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.56, 0.61, 40]} />
          <meshBasicMaterial color={theme.color} transparent opacity={0.86} />
        </mesh>
      )}
    </group>
  );
}

/* ── Scene ── */
function Scene({
  selectedId,
  isMobile,
  onSelect,
}: {
  selectedId: string | null;
  isMobile: boolean;
  onSelect: (id: string) => void;
}) {
  const spacing = isMobile ? 2.35 : 3;
  const cols = isMobile ? 2 : 4;
  const rowCount = Math.ceil(milestones.length / cols);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 8, 5]} intensity={1.4} color="#00ffff" />
      <pointLight position={[-5, 6, -3]} intensity={1.0} color="#00ff9d" />
      <pointLight position={[0, 5, 5]} intensity={0.7} color="#ff3399" />
      <spotLight position={[0, 10, 0]} angle={0.52} penumbra={0.62} intensity={0.9} color="#ffffff" />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} onClick={(e) => e.stopPropagation()}>
        <planeGeometry args={[30, 20]} />
        <meshStandardMaterial color="#0a1a1a" metalness={0.34} roughness={0.76} />
      </mesh>

      {/* Grid lines */}
      {Array.from({ length: 21 }).map((_, i) => (
        <mesh key={`h-${i}`} position={[0, -1.49, i - 10]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 0.01]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.07} />
        </mesh>
      ))}
      {Array.from({ length: 31 }).map((_, i) => (
        <mesh key={`v-${i}`} position={[i - 15, -1.49, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[20, 0.01]} />
          <meshBasicMaterial color="#00ff9d" transparent opacity={0.06} />
        </mesh>
      ))}

      {/* Exhibits */}
      {milestones.map((milestone, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const x = (col - (cols - 1) / 2) * spacing;
        const z = (row - (rowCount - 1) / 2) * spacing;

        return (
          <Exhibit
            key={milestone.id}
            milestone={milestone}
            position={[x, 0, z]}
            isSelected={selectedId === milestone.id}
            isMobile={isMobile}
            onClick={() => onSelect(milestone.id)}
          />
        );
      })}

      <OrbitControls
        makeDefault
        enablePan={!isMobile}
        enableZoom
        enableRotate
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={isMobile ? 0.85 : 0.65}
        zoomSpeed={1}
        panSpeed={0.9}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={isMobile ? 2.8 : 3}
        maxDistance={isMobile ? 13 : 16}
      />
    </>
  );
}

/* ── Museum Component ── */
const Museum = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showExhibits, setShowExhibits] = useState(true);
  const isMobile = useIsMobile();
  const selected = milestones.find((m) => m.id === selectedId);
  const selectedTheme = selected ? categoryTheme[selected.category] : null;

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* 3D Canvas area */}
      <div style={{ position: 'relative', width: '100%', flex: 1, minHeight: 0, background: '#050d0d' }}>
        <Canvas
          shadows
          dpr={[1, 1.8]}
          camera={{ position: isMobile ? [0, 3.4, 8.4] : [0, 4, 10], fov: isMobile ? 54 : 48 }}
          onPointerMissed={() => setSelectedId(null)}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          style={{ background: '#050d0d', touchAction: 'none', width: '100%', height: '100%' }}
        >
          <Scene selectedId={selectedId} isMobile={isMobile} onSelect={setSelectedId} />
        </Canvas>

        {/* Category legend */}
        <div
          style={{
            position: 'absolute', top: isMobile ? 8 : 12, left: 12,
            display: 'flex', flexWrap: 'wrap', gap: 6, zIndex: 10, pointerEvents: 'none',
          }}
        >
          {Object.entries(categoryTheme).map(([cat, theme]) => (
            <div
              key={cat}
              className="glass-panel"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 9px', borderRadius: 8 }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: theme.cssColor, boxShadow: `0 0 10px ${theme.cssColor}` }} />
              <span style={{ fontSize: 9, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: 'rgba(230,230,230,0.84)', textTransform: 'capitalize' }}>
                {cat}
              </span>
            </div>
          ))}
        </div>

        {/* Collapsible exhibits panel — sits OUTSIDE canvas, won't block 3D on zoom */}
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: showExhibits ? (isMobile ? 164 : 196) : 'auto',
            borderRadius: 12,
            padding: showExhibits ? 8 : 6,
            maxHeight: showExhibits ? (isMobile ? 180 : 234) : 'auto',
            overflowY: showExhibits ? 'auto' : 'hidden',
            zIndex: 10,
            transition: 'width 0.2s, max-height 0.2s',
          }}
        >
          <button
            onClick={() => setShowExhibits((p) => !p)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
              cursor: 'pointer', marginBottom: showExhibits ? 6 : 0, padding: 0,
            }}
          >
            {showExhibits ? <ChevronDown size={12} color="#00ffff" /> : <ChevronRight size={12} color="#00ffff" />}
            <span style={{ fontSize: 8, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', color: '#00ffff', letterSpacing: 2 }}>
              EXHIBITS
            </span>
          </button>

          {showExhibits && milestones.map((milestone) => {
            const theme = categoryTheme[milestone.category];
            const isActive = selectedId === milestone.id;
            return (
              <button
                key={milestone.id}
                onClick={() => setSelectedId(milestone.id)}
                style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  fontSize: isMobile ? 11 : 10, lineHeight: 1.3,
                  padding: isMobile ? '6px 8px' : '4px 6px', borderRadius: 6,
                  border: 'none', cursor: 'pointer',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  marginBottom: 2,
                  background: isActive ? `${theme.cssColor}33` : 'transparent',
                  color: isActive ? theme.cssColor : 'rgba(230,230,230,0.78)',
                }}
              >
                {theme.icon} {milestone.title}
              </button>
            );
          })}
        </div>

        {/* Hint bar */}
        <div
          className="glass-panel"
          style={{
            position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
            fontSize: isMobile ? 9 : 10,
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            color: 'rgba(230,230,230,0.72)', padding: '5px 12px', borderRadius: 20, zIndex: 10, whiteSpace: 'nowrap',
          }}
        >
          Drag to orbit · Scroll to zoom · Click an exhibit
        </div>
      </div>

      {/* Detail panel when exhibit selected */}
      {selected && selectedTheme && (
        <div className="border-t border-border/80 bg-card/95 p-3 md:p-4" style={{ flexShrink: 0 }}>
          <div className="mb-2 flex items-start justify-between gap-3">
            <div>
              <h3 className="m-0 text-sm font-semibold text-foreground md:text-base">{selected.title}</h3>
              <span className="font-mono text-[10px] md:text-[11px]" style={{ color: selectedTheme.cssColor }}>{selected.date}</span>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary/70 text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <p className="m-0 text-xs leading-relaxed text-foreground/80 md:text-sm">{selected.description}</p>
          <span
            style={{
              display: 'inline-block', marginTop: 8, padding: '4px 10px', borderRadius: 8,
              fontSize: isMobile ? 10 : 9,
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              backgroundColor: `${selectedTheme.cssColor}33`,
              color: selectedTheme.cssColor,
            }}
          >
            {selectedTheme.icon} {selected.category}
          </span>
        </div>
      )}
    </div>
  );
};

export default Museum;
