import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Maximize2, RotateCcw, Sun, Eye, Layers, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

interface ThreeMaterialViewerProps {
  onPinCurrentFinish?: (finishName: string) => void;
}

type MaterialPresetKey = 'limestone' | 'bronze' | 'champagne' | 'basalt' | 'travertine';
type LightingPresetKey = 'dawn' | 'noon' | 'dusk';
type CameraViewKey = 'perspective' | 'elevation' | 'detail';

interface MaterialConfig {
  name: string;
  code: string;
  color: number;
  roughness: number;
  metalness: number;
  clearcoat?: number;
  description: string;
  category: string;
  lrv: number;
}

const MATERIAL_PRESETS: Record<MaterialPresetKey, MaterialConfig> = {
  limestone: {
    name: 'Vaucluse Honed Fluted Limestone',
    code: 'STN-VAU-09',
    color: 0xd6cdc0,
    roughness: 0.88,
    metalness: 0.02,
    description: 'Natural French quarried limestone with velvet honed texture and crisp fluted relief.',
    category: 'Stone Cladding',
    lrv: 58,
  },
  bronze: {
    name: 'Nocturne Hand-Patinated Bronze',
    code: 'MTL-BRZ-44',
    color: 0x2b2520,
    roughness: 0.42,
    metalness: 0.85,
    clearcoat: 0.1,
    description: 'Hand-oxidized architectural bronze alloy with warm copper specular sheen.',
    category: 'Architectural Metals',
    lrv: 11,
  },
  champagne: {
    name: 'Aurelia Brushed Champagne Aluminum',
    code: 'MTL-ALU-18',
    color: 0xc5a880,
    roughness: 0.28,
    metalness: 0.82,
    description: 'Anodized 25-micron architectural alloy with satin directional micro-brushing.',
    category: 'Facade Profiles',
    lrv: 42,
  },
  basalt: {
    name: 'Valser Smoked Volcanic Basalt',
    code: 'STN-BST-72',
    color: 0x36373a,
    roughness: 0.75,
    metalness: 0.08,
    description: 'Metamorphic alpine basalt with silk-touch honed surface and dark quartzite grains.',
    category: 'Monolithic Stone',
    lrv: 16,
  },
  travertine: {
    name: 'Navona Vein-Cut Cross Travertine',
    code: 'STN-TRV-15',
    color: 0xe2d9c8,
    roughness: 0.82,
    metalness: 0.04,
    description: 'Warm sedimentary calcium travertine with subtle longitudinal mineral veins.',
    category: 'Interior & Facade',
    lrv: 64,
  },
};

export const ThreeMaterialViewer: React.FC<ThreeMaterialViewerProps> = ({ onPinCurrentFinish }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialPresetKey>('limestone');
  const [lightingPreset, setLightingPreset] = useState<LightingPresetKey>('noon');
  const [cameraView, setCameraView] = useState<CameraViewKey>('perspective');
  const [explosionProgress, setExplosionProgress] = useState<number>(0);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);
  const [pinnedNotification, setPinnedNotification] = useState<string | null>(null);

  // Mutable refs to decouple Three.js animation loop from React renders
  const stateRef = useRef({
    materialKey: selectedMaterial,
    explosionTarget: explosionProgress,
    currentExplosion: 0,
    cameraViewTarget: cameraView,
    lightingPreset: lightingPreset,
  });

  stateRef.current.materialKey = selectedMaterial;
  stateRef.current.explosionTarget = explosionProgress;
  stateRef.current.lightingPreset = lightingPreset;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as mandated by Three.js skill
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 560;

    // 1. Scene & Renderer setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f11);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(3.2, 2.2, 3.8);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Studio Environment reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 3. Lighting Rig: Warm key directional light + cool hemisphere fill + rim
    const keyLight = new THREE.DirectionalLight(0xffecd6, 2.6);
    keyLight.position.set(4, 5, 3);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.shadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 15;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
      const d = 3.5;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
    }
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x76889b, 0x1f1b18, 1.2);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const rimLight = new THREE.DirectionalLight(0x90a8c2, 1.0);
    rimLight.position.set(-4, 3, -4);
    scene.add(rimLight);

    // 4. Ground Contact Shadow grounding plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    // Procedural radial shadow canvas texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const ctx = shadowCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
      grad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
      grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.7,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.01;
    scene.add(shadowPlane);

    // Subtle studio floor grid line
    const gridHelper = new THREE.GridHelper(6, 12, 0x2e2f33, 0x1a1a1d);
    gridHelper.position.y = 0;
    scene.add(gridHelper);

    // 5. Build Procedural Composite 3–12 Part Architectural Monolith (THREE.Group)
    // Assembly parts:
    // 1. Plinth Base (honed stone pedestal)
    // 2. Left Architectural Reveal Column (blackened bronze)
    // 3. Right Architectural Reveal Column (blackened bronze)
    // 4. Central Fluted Panel (main facade surface with 8 vertical flutes)
    // 5. Rear Structural Core
    // 6. Top Architectural Coping Crown (brushed metal profile)
    // 7. Specimen Inset Badge / Reveal Notch
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    // PBR Materials
    const activeMatConfig = MATERIAL_PRESETS[stateRef.current.materialKey];
    const facadeMaterial = new THREE.MeshPhysicalMaterial({
      color: activeMatConfig.color,
      roughness: activeMatConfig.roughness,
      metalness: activeMatConfig.metalness,
      clearcoat: activeMatConfig.clearcoat || 0,
      clearcoatRoughness: 0.1,
    });

    const bronzeMullionMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x221e1a,
      roughness: 0.38,
      metalness: 0.88,
    });

    const champagneCopingMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xc5a880,
      roughness: 0.25,
      metalness: 0.85,
    });

    const plinthMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x1d1e20,
      roughness: 0.92,
      metalness: 0.05,
    });

    // Part 1: Plinth Base (bottom-center flush with ground)
    const plinthGeo = new THREE.BoxGeometry(2.0, 0.22, 1.2);
    const plinthMesh = new THREE.Mesh(plinthGeo, plinthMaterial);
    plinthMesh.position.set(0, 0.11, 0);
    plinthMesh.castShadow = !isSoftwareGl;
    plinthMesh.receiveShadow = !isSoftwareGl;
    monolithGroup.add(plinthMesh);

    // Part 2: Rear Structural Backing Core
    const coreGeo = new THREE.BoxGeometry(1.6, 2.0, 0.3);
    const coreMesh = new THREE.Mesh(coreGeo, plinthMaterial);
    coreMesh.position.set(0, 1.22, -0.2);
    coreMesh.castShadow = !isSoftwareGl;
    coreMesh.receiveShadow = !isSoftwareGl;
    monolithGroup.add(coreMesh);

    // Part 3 & 4: Left & Right Bronze Mullion Rails (explodable)
    const mullionGeo = new THREE.BoxGeometry(0.08, 2.05, 0.55);
    const leftMullion = new THREE.Mesh(mullionGeo, bronzeMullionMaterial);
    leftMullion.position.set(-0.84, 1.24, 0.05);
    leftMullion.castShadow = !isSoftwareGl;
    monolithGroup.add(leftMullion);

    const rightMullion = new THREE.Mesh(mullionGeo, bronzeMullionMaterial);
    rightMullion.position.set(0.84, 1.24, 0.05);
    rightMullion.castShadow = !isSoftwareGl;
    monolithGroup.add(rightMullion);

    // Part 5: Central Fluted Facade Panel (Group of flutes for high architectural relief)
    const flutedFacadeGroup = new THREE.Group();
    flutedFacadeGroup.position.set(0, 1.22, 0.15);

    // Backer plate
    const plateGeo = new THREE.BoxGeometry(1.56, 1.95, 0.08);
    const plateMesh = new THREE.Mesh(plateGeo, facadeMaterial);
    plateMesh.castShadow = !isSoftwareGl;
    plateMesh.receiveShadow = !isSoftwareGl;
    flutedFacadeGroup.add(plateMesh);

    // 9 Precision Fluted Vertical Ribs
    const numFlutes = 9;
    const fluteWidth = 0.12;
    const fluteSpacing = 0.165;
    const startX = -((numFlutes - 1) * fluteSpacing) / 2;

    for (let i = 0; i < numFlutes; i++) {
      const ribGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.94, 16, 1, false, 0, Math.PI);
      const ribMesh = new THREE.Mesh(ribGeo, facadeMaterial);
      ribMesh.position.set(startX + i * fluteSpacing, 0, 0.045);
      ribMesh.rotation.y = -Math.PI / 2;
      ribMesh.castShadow = !isSoftwareGl;
      ribMesh.receiveShadow = !isSoftwareGl;
      flutedFacadeGroup.add(ribMesh);
    }
    monolithGroup.add(flutedFacadeGroup);

    // Part 6: Top Architectural Crown Coping (Champagne anodized metal profile)
    const crownGeo = new THREE.BoxGeometry(1.8, 0.09, 0.65);
    const crownMesh = new THREE.Mesh(crownGeo, champagneCopingMaterial);
    crownMesh.position.set(0, 2.28, 0);
    crownMesh.castShadow = !isSoftwareGl;
    monolithGroup.add(crownMesh);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2.0;
    controls.maxDistance = 8.0;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Do not go below floor plane
    controls.target.set(0, 1.15, 0);

    // Animation & Pacing Loop
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          animationFrameId = window.setTimeout(poll, 6);
        } else {
          gl.deleteSync(sync);
          animationFrameId = window.setTimeout(cb, 60);
        }
      };
      animationFrameId = window.setTimeout(poll, 6);
    }

    const targetCamPos = new THREE.Vector3(3.2, 2.2, 3.8);

    function animate() {
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth material color and roughness update
      const currentConfig = MATERIAL_PRESETS[stateRef.current.materialKey];
      facadeMaterial.color.set(currentConfig.color);
      facadeMaterial.roughness = currentConfig.roughness;
      facadeMaterial.metalness = currentConfig.metalness;
      if (currentConfig.clearcoat !== undefined) {
        facadeMaterial.clearcoat = currentConfig.clearcoat;
      }

      // Smooth explosion damping (separating facade panel from core and rails)
      const explosionSpeed = 4.0;
      stateRef.current.currentExplosion = THREE.MathUtils.damp(
        stateRef.current.currentExplosion,
        stateRef.current.explosionTarget,
        explosionSpeed,
        delta
      );

      const exp = stateRef.current.currentExplosion;
      flutedFacadeGroup.position.z = 0.15 + exp * 0.75;
      leftMullion.position.x = -0.84 - exp * 0.35;
      rightMullion.position.x = 0.84 + exp * 0.35;
      crownMesh.position.y = 2.28 + exp * 0.45;
      coreMesh.position.z = -0.2 - exp * 0.25;

      // Lighting preset adjustments
      const currentLight = stateRef.current.lightingPreset;
      if (currentLight === 'dawn') {
        keyLight.color.setHex(0xffaa66);
        keyLight.intensity = 2.0;
        keyLight.position.set(5, 2.5, 3);
        hemiLight.intensity = 0.9;
      } else if (currentLight === 'noon') {
        keyLight.color.setHex(0xffffff);
        keyLight.intensity = 2.8;
        keyLight.position.set(3, 6, 4);
        hemiLight.intensity = 1.3;
      } else if (currentLight === 'dusk') {
        keyLight.color.setHex(0xff7744);
        keyLight.intensity = 1.8;
        keyLight.position.set(4, 1.8, 4);
        hemiLight.intensity = 0.7;
      }

      // Camera preset transitions
      const camTargetKey = stateRef.current.cameraViewTarget;
      if (camTargetKey === 'perspective') {
        targetCamPos.set(3.2, 2.2, 3.8);
      } else if (camTargetKey === 'elevation') {
        targetCamPos.set(0, 1.25, 4.4);
      } else if (camTargetKey === 'detail') {
        targetCamPos.set(0.9, 1.35, 1.4);
      }
      camera.position.lerp(targetCamPos, delta * 2.5);

      controls.update();
      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        animationFrameId = requestAnimationFrame(animate);
      }
    }

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(animationFrameId);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleResetCamera = useCallback(() => {
    setCameraView('perspective');
  }, []);

  const handlePin = useCallback(() => {
    const active = MATERIAL_PRESETS[selectedMaterial];
    if (onPinCurrentFinish) {
      onPinCurrentFinish(active.name);
    }
    setPinnedNotification(`Pinned ${active.name} to creative moodboard`);
    setTimeout(() => setPinnedNotification(null), 3000);
  }, [selectedMaterial, onPinCurrentFinish]);

  const activeMaterialData = MATERIAL_PRESETS[selectedMaterial];

  return (
    <section id="visualizer" className="relative w-full bg-[#0D0D0E] border-t border-b border-[#232328] py-16 overflow-hidden">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C5A880] mb-2">
            <span>Interactive 3D Monolith</span>
            <span aria-hidden="true">·</span>
            <span>Studio PBR Tactile Simulation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-editorial font-light tracking-tight text-[#ECEAE5]">
            Architectural Facade & Detail Monolith
          </h2>
          <p className="mt-3 text-sm md:text-base text-[#9A9894] max-w-2xl font-light">
            Inspect precision 18mm fluted limestone reliefs, blackened bronze structural mullions, and champagne anodized coping under shifting daylight angles.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePin}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] text-[#0D0D0E] text-xs font-medium tracking-wide uppercase hover:bg-[#d6ba94] transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pin Current Finish</span>
          </button>
          <button
            onClick={handleResetCamera}
            className="p-2.5 border border-[#303036] text-[#A5A39E] hover:text-[#ECEAE5] hover:border-[#52525C] transition-colors"
            title="Reset Perspective Angle"
            aria-label="Reset 3D camera to default perspective"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3D Canvas Viewport */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="relative w-full h-[580px] md:h-[640px] bg-[#0A0A0C] border border-[#232328] overflow-hidden">
          {/* WebGL Canvas Mount Container */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Top-Left Minimalist Spec Overlay */}
          <div className="absolute top-5 left-5 pointer-events-none z-10 bg-[#121215]/90 border border-[#282830] p-4 max-w-xs backdrop-blur-xs">
            <div className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880] mb-1">
              Active Specimen // {activeMaterialData.code}
            </div>
            <div className="text-sm font-editorial font-medium text-[#ECEAE5] mb-1">
              {activeMaterialData.name}
            </div>
            <div className="text-xs text-[#8F8D88] leading-relaxed mb-2 font-light">
              {activeMaterialData.description}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-[#B3B1AC] pt-2 border-t border-[#232328]">
              <span>LRV: {activeMaterialData.lrv}%</span>
              <span>·</span>
              <span>Roughness: {Math.round(activeMaterialData.roughness * 100)}%</span>
            </div>
          </div>

          {/* Toast feedback when pinned */}
          {pinnedNotification && (
            <div className="absolute top-5 right-5 z-20 bg-[#1A1A1E] border border-[#C5A880] text-[#ECEAE5] px-4 py-2.5 text-xs flex items-center gap-2 shadow-xl animate-fade-in">
              <Check className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{pinnedNotification}</span>
            </div>
          )}

          {/* Viewport instruction badge */}
          <div className="absolute bottom-24 right-5 pointer-events-none hidden md:flex items-center gap-2 text-[11px] font-mono text-[#6A6966] bg-[#121215]/80 px-3 py-1.5 border border-[#232328]">
            <span>Drag to rotate</span>
            <span>·</span>
            <span>Scroll to zoom</span>
            <span>·</span>
            <span>Shift+Drag to pan</span>
          </div>

          {/* Collapsible Unified Bottom Control Dock (Follows Three.js Ergonomic Dock standard) */}
          <div
            className={`absolute bottom-3 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-10 transition-transform duration-300 ease-out ${
              isControlsCollapsed ? 'translate-y-[calc(100%-36px)]' : 'translate-y-0'
            }`}
          >
            {/* Collapse / Expand Tab Button */}
            <div className="flex justify-center mb-1">
              <button
                onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
                className="flex items-center gap-1.5 bg-[#151518] hover:bg-[#1E1E22] text-[#A5A39E] hover:text-[#ECEAE5] text-[11px] font-mono tracking-wider uppercase px-4 py-1.5 border border-[#2B2B32] border-b-0 transition-colors"
                aria-expanded={!isControlsCollapsed}
              >
                {isControlsCollapsed ? (
                  <>
                    <ChevronUp className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Expand Material Console</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Hide Console (Zen Mode)</span>
                  </>
                )}
              </button>
            </div>

            {/* Dock Container */}
            <div className="bg-[#121215] border border-[#2B2B32] p-4 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* 1. Material Finish Swatches */}
                <div className="md:col-span-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#7E7C77] mb-2 flex items-center justify-between">
                    <span>Facade Material Swatch</span>
                    <span className="text-[#C5A880]">{activeMaterialData.category}</span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {(Object.keys(MATERIAL_PRESETS) as MaterialPresetKey[]).map((key) => {
                      const item = MATERIAL_PRESETS[key];
                      const isSelected = selectedMaterial === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setSelectedMaterial(key)}
                          className={`group flex items-center gap-2 px-2.5 py-1.5 border text-xs transition-all shrink-0 ${
                            isSelected
                              ? 'border-[#C5A880] bg-[#1E1D19] text-[#ECEAE5]'
                              : 'border-[#26262B] bg-[#0E0E10] text-[#908F8B] hover:border-[#42424A]'
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-none border border-black/40 shrink-0"
                            style={{ backgroundColor: `#${item.color.toString(16).padStart(6, '0')}` }}
                          />
                          <span className="truncate max-w-[85px] text-[11px]">{item.name.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Exploded View Slider */}
                <div className="md:col-span-3 border-t md:border-t-0 md:border-l md:border-r border-[#232328] md:px-3 pt-2 md:pt-0">
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#7E7C77] mb-1.5">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3 h-3 text-[#C5A880]" />
                      <span>Exploded Reveal</span>
                    </span>
                    <span className="text-[#ECEAE5]">{Math.round(explosionProgress * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={explosionProgress}
                    onChange={(e) => setExplosionProgress(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#232328] accent-[#C5A880] rounded-none appearance-none cursor-pointer"
                    aria-label="Adjust exploded reveal separation"
                  />
                </div>

                {/* 3. Lighting & Camera Presets */}
                <div className="md:col-span-4 flex items-center justify-between gap-2 border-t md:border-t-0 border-[#232328] pt-2 md:pt-0">
                  {/* Daylight selector */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#7E7C77] mb-1.5 flex items-center gap-1">
                      <Sun className="w-3 h-3 text-[#C5A880]" />
                      <span>Solar Angle</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {(['dawn', 'noon', 'dusk'] as LightingPresetKey[]).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setLightingPreset(mode)}
                          className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors ${
                            lightingPreset === mode
                              ? 'bg-[#2B2822] text-[#C5A880] border border-[#C5A880]/60'
                              : 'bg-[#161619] text-[#7E7C77] hover:text-[#ECEAE5] border border-transparent'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Camera view selector */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#7E7C77] mb-1.5 flex items-center gap-1">
                      <Eye className="w-3 h-3 text-[#C5A880]" />
                      <span>View</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {(['perspective', 'elevation', 'detail'] as CameraViewKey[]).map((cam) => (
                        <button
                          key={cam}
                          onClick={() => setCameraView(cam)}
                          className={`px-2 py-1 text-[10px] font-mono uppercase transition-colors ${
                            cameraView === cam
                              ? 'bg-[#2B2822] text-[#C5A880] border border-[#C5A880]/60'
                              : 'bg-[#161619] text-[#7E7C77] hover:text-[#ECEAE5] border border-transparent'
                          }`}
                        >
                          {cam === 'perspective' ? '3D' : cam === 'elevation' ? 'Front' : 'Macro'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
