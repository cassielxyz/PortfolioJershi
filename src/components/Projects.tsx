import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { 
  ArrowUpRight, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { projects } from '../data/portfolioData';
import { GithubIcon } from './Icons';
import { TechLogo } from './TechLogos';

export const Projects: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const mountRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIdx] || projects[0];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleOpenLink = (url?: string) => {
    const target = url || activeProject.liveUrl || activeProject.githubUrl || 'https://github.com/jershika26';
    window.open(target, '_blank', 'noopener,noreferrer');
  };

  // -------------------------------------------------------------
  // THREE.JS: Interactive 3D Tree Diagram with Branching Nodes
  // -------------------------------------------------------------
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0.8, 7.5);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Tree Geometry & Materials
    const trunkGroup = new THREE.Group();
    scene.add(trunkGroup);

    // Main Vertical Organic Trunk
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, -2.6, 0),
      new THREE.Vector3(0.1, -1.2, 0.1),
      new THREE.Vector3(-0.1, 0.2, -0.1),
      new THREE.Vector3(0.05, 1.4, 0.05),
      new THREE.Vector3(0, 2.4, 0)
    ]);
    const trunkGeo = new THREE.TubeGeometry(trunkCurve, 40, 0.08, 12, false);
    const trunkMat = new THREE.MeshBasicMaterial({ color: 0x26242E, transparent: true, opacity: 0.85 });
    const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
    trunkGroup.add(trunkMesh);

    // 4 Project Branches & Nodes
    // Project 0 (LSE): Left-mid
    // Project 1 (Mydoo): Right-mid
    // Project 2 (House of Greens): Left-high
    // Project 3 (Underwater): Right-high
    const branchConfigs = [
      { start: new THREE.Vector3(0.05, -1.2, 0), end: new THREE.Vector3(-1.85, -0.7, 0.4), color: 0x9333EA },
      { start: new THREE.Vector3(-0.05, -0.3, 0), end: new THREE.Vector3(1.95, 0.2, 0.5), color: 0xEC4899 },
      { start: new THREE.Vector3(0.02, 0.6, 0), end: new THREE.Vector3(-1.75, 1.1, 0.3), color: 0x10B981 },
      { start: new THREE.Vector3(0.01, 1.5, 0), end: new THREE.Vector3(1.85, 1.8, 0.4), color: 0x06B6D4 }
    ];

    const nodeMeshes: THREE.Mesh[] = [];
    const ringMeshes: THREE.Mesh[] = [];

    branchConfigs.forEach((b, i) => {
      // Branch curve
      const mid = new THREE.Vector3()
        .addVectors(b.start, b.end)
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(i % 2 === 0 ? -0.2 : 0.2, 0.2, 0));
      const branchCurve = new THREE.CatmullRomCurve3([b.start, mid, b.end]);
      const branchGeo = new THREE.TubeGeometry(branchCurve, 25, 0.045, 10, false);
      const branchMat = new THREE.MeshBasicMaterial({ color: 0x3E3A49, transparent: true, opacity: 0.7 });
      const branchMesh = new THREE.Mesh(branchGeo, branchMat);
      trunkGroup.add(branchMesh);

      // Node Sphere
      const sphereGeo = new THREE.SphereGeometry(0.24, 24, 24);
      const sphereMat = new THREE.MeshBasicMaterial({ 
        color: 0x121118,
        transparent: true,
        opacity: 0.95
      });
      const nodeMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeMesh.position.copy(b.end);
      nodeMesh.userData = { projectIndex: i };
      trunkGroup.add(nodeMesh);
      nodeMeshes.push(nodeMesh);

      // Concentric Orbital Ring
      const ringGeo = new THREE.RingGeometry(0.32, 0.36, 32);
      const ringMat = new THREE.MeshBasicMaterial({ 
        color: 0xF5D0FE, 
        side: THREE.DoubleSide, 
        transparent: true, 
        opacity: 0.4 
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(b.end);
      trunkGroup.add(ringMesh);
      ringMeshes.push(ringMesh);
    });

    // Ambient floating stardust particles
    const particleCount = 75;
    const particleGeo = new THREE.BufferGeometry();
    const posArr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArr[i] = (Math.random() - 0.5) * 6;
      posArr[i + 1] = (Math.random() - 0.5) * 5;
      posArr[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xF5D0FE,
      transparent: true,
      opacity: 0.6
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Raycaster for 3D Node Clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const idx = intersects[0].object.userData.projectIndex;
        if (typeof idx === 'number') {
          setActiveIdx(idx);
        }
      }
    };
    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // 5. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle continuous ambient sway
      trunkGroup.rotation.y = Math.sin(elapsedTime * 0.4) * 0.12;

      // Update Node States based on activeIdx
      nodeMeshes.forEach((node, i) => {
        const isActive = i === activeIdx;
        const scaleTarget = isActive ? 1.35 : 1.0;
        node.scale.lerp(new THREE.Vector3(scaleTarget, scaleTarget, scaleTarget), 0.1);

        const mat = node.material as THREE.MeshBasicMaterial;
        mat.color.set(isActive ? 0xF5D0FE : 0x121118);

        // Orbital ring rotation
        const ring = ringMeshes[i];
        ring.rotation.z += 0.02 * (i % 2 === 0 ? 1 : -1);
        const ringMat = ring.material as THREE.MeshBasicMaterial;
        ringMat.opacity = isActive ? 0.9 : 0.25;
      });

      // Target camera framing toward active node position smoothly
      const targetPos = branchConfigs[activeIdx]?.end || new THREE.Vector3(0, 0, 0);
      const camTargetX = targetPos.x * 0.25;
      const camTargetY = targetPos.y * 0.25 + 0.3;
      camera.position.x += (camTargetX - camera.position.x) * 0.05;
      camera.position.y += (camTargetY - camera.position.y) * 0.05;
      camera.lookAt(0, 0.4, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      trunkGeo.dispose();
      trunkMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [activeIdx]);

  return (
    <section id="projects" className="projects-showcase-section">
      <style>{`
        /* =========================================================
           PROJECTS SHOWCASE: BESPOKE 3D TREE & SLEEK VIEWPORT
           Theme: Black, Ash, Crisp White, Minimal Whisper Lavender
           ========================================================= */
        .projects-showcase-section {
          position: relative;
          width: 100%;
          background: #FAF7FC;
          background-image: 
            radial-gradient(ellipse 55% 45% at 85% 15%, rgba(245, 208, 254, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 45% 40% at 15% 85%, rgba(230, 215, 245, 0.25) 0%, transparent 70%),
            repeating-linear-gradient(42deg, rgba(38, 36, 46, 0.016) 0 1px, transparent 1px 12px),
            linear-gradient(180deg, #FAF7FC 0%, #F5F3F8 50%, #FAF7FC 100%);
          border-top: 1px solid rgba(38, 36, 46, 0.08);
          padding: 5rem 1.5rem 5.5rem 1.5rem;
          box-sizing: border-box;
          color: #121118;
          overflow: hidden;
        }

        .projects-wrapper {
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Section Header: Matching previous fonts */
        .projects-header {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 2.75rem auto;
        }

        .projects-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #63606E;
          backdrop-filter: blur(12px);
          margin-bottom: 0.85rem;
        }

        .projects-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #F5D0FE;
          box-shadow: 0 0 8px rgba(245, 208, 254, 0.9);
        }

        .projects-title {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Plus Jakarta Sans", sans-serif;
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.035em;
          color: #121118;
          margin: 0 0 0.75rem 0;
        }

        .projects-subtitle {
          font-size: 0.9375rem;
          line-height: 1.55;
          color: #63606E;
          margin: 0 auto;
          max-width: 540px;
        }

        /* =========================================================
           SPLIT STAGE: 3D THREE.JS TREE DIAGRAM + SPOTLIGHT CARD
           Fits cleanly inside normal viewport height
           ========================================================= */
        .tree-stage-split {
          display: grid;
          grid-template-columns: minmax(320px, 1fr) minmax(380px, 1.2fr);
          gap: 2.25rem;
          align-items: center;
          min-height: 500px;
          max-height: 540px;
          margin-bottom: 2.5rem;
        }

        /* 3D Tree Canvas Container */
        .threejs-tree-canvas-container {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 
            0 16px 36px -12px rgba(20, 19, 26, 0.06),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
        }

        .tree-canvas-badge {
          position: absolute;
          top: 1rem;
          left: 1.25rem;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.3rem 0.75rem;
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(38, 36, 46, 0.08);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.6875rem;
          font-weight: 600;
          color: #63606E;
          pointer-events: none;
        }

        .tree-nav-controls {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 9999px;
          padding: 0.3rem 0.6rem;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
        }

        .tree-nav-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #121118;
          transition: background 0.2s ease;
        }

        .tree-nav-btn:hover {
          background: rgba(38, 36, 46, 0.08);
        }

        .tree-nav-indicator {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.75rem;
          font-weight: 700;
          color: #121118;
          padding: 0 0.4rem;
        }

        /* Right Column: Project Showcase Window */
        .spotlight-project-dossier {
          position: relative;
          height: 100%;
          min-height: 480px;
          background: rgba(255, 255, 255, 0.88);
          backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(38, 36, 46, 0.12);
          border-radius: 24px;
          padding: 2rem 2.25rem;
          box-shadow: 
            0 20px 48px -12px rgba(20, 19, 26, 0.08),
            inset 0 1.5px 2px rgba(255, 255, 255, 0.95);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .project-dossier-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .project-category-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.75rem;
          background: rgba(245, 208, 254, 0.3);
          border: 1px solid rgba(245, 208, 254, 0.7);
          border-radius: 9999px;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          color: #4A1D96;
        }

        .project-metric-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: #63606E;
        }

        .project-dossier-title {
          font-size: 1.65rem;
          font-weight: 800;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #121118;
          margin: 0 0 0.35rem 0;
        }

        .project-dossier-subtitle {
          font-size: 0.875rem;
          font-weight: 500;
          color: #63606E;
          margin: 0 0 0.85rem 0;
        }

        .project-dossier-desc {
          font-size: 0.875rem;
          line-height: 1.55;
          color: #26242E;
          margin: 0 0 1.25rem 0;
        }

        /* Interactive Viewport Screen Preview (Clickable) */
        .project-preview-mockup-frame {
          position: relative;
          width: 100%;
          height: 160px;
          background: #14131A;
          border: 1px solid rgba(38, 36, 46, 0.2);
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          margin-bottom: 1.25rem;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .project-preview-mockup-frame:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25), 0 0 20px rgba(245, 208, 254, 0.2);
        }

        .preview-chrome-bar {
          background: #1A1922;
          padding: 0.45rem 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .preview-lights {
          display: flex;
          gap: 4px;
        }

        .preview-light {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .preview-light-red { background: #FF5F56; }
        .preview-light-yellow { background: #FFBD2E; }
        .preview-light-green { background: #27C93F; }

        .preview-address-url {
          flex: 1;
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.6875rem;
          color: #A19EB0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preview-screen-body {
          flex: 1;
          position: relative;
          background: #0E0D12;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        /* Hover Overlay on Mockup */
        .preview-screen-overlay {
          position: absolute;
          inset: 0;
          background: rgba(18, 17, 24, 0.45);
          backdrop-filter: blur(3px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .project-preview-mockup-frame:hover .preview-screen-overlay {
          opacity: 1;
        }

        .preview-launch-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 1rem;
          background: #FFFFFF;
          color: #121118;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
        }

        /* Mockup Visual Identity per Project */
        .mockup-inner-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          text-align: center;
        }

        .mockup-brand-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .mockup-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.6875rem;
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          color: #F5D0FE;
        }

        /* Tech Tags */
        .project-tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.25rem;
        }

        .project-tech-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.6rem;
          background: #FFFFFF;
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #26242E;
        }

        /* Action Buttons */
        .project-dossier-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-live-launch {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.25rem;
          background: #121118;
          color: #FFFFFF;
          border: 1px solid #121118;
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(18, 17, 24, 0.15);
        }

        .btn-live-launch:hover {
          background: #26242E;
          transform: translateY(-1px);
        }

        .btn-github-code {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.15rem;
          background: rgba(255, 255, 255, 0.9);
          color: #121118;
          border: 1px solid rgba(38, 36, 46, 0.14);
          border-radius: 10px;
          font-size: 0.8125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-github-code:hover {
          background: #FFFFFF;
          border-color: rgba(38, 36, 46, 0.3);
          transform: translateY(-1px);
        }

        /* =========================================================
           THUMBNAIL PREVIEW SELECTOR STRIP
           ========================================================= */
        .projects-thumbnail-deck {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .thumbnail-card-item {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(38, 36, 46, 0.1);
          border-radius: 16px;
          padding: 1rem 1.15rem;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .thumbnail-card-item:hover {
          transform: translateY(-2px);
          border-color: rgba(38, 36, 46, 0.25);
          background: rgba(255, 255, 255, 0.95);
        }

        .thumbnail-card-item.is-active-thumb {
          background: #FFFFFF;
          border-color: #121118;
          box-shadow: 
            0 10px 24px -8px rgba(18, 17, 24, 0.12),
            0 0 0 2px #121118,
            inset 0 1.5px 2px #FFFFFF;
        }

        .thumbnail-dot-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #D4D1DC;
          flex-shrink: 0;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }

        .thumbnail-card-item.is-active-thumb .thumbnail-dot-indicator {
          background: #F5D0FE;
          box-shadow: 0 0 8px rgba(245, 208, 254, 0.9);
        }

        .thumbnail-content-meta {
          flex: 1;
          min-width: 0;
        }

        .thumbnail-step-num {
          font-family: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
          font-size: 0.65rem;
          font-weight: 700;
          color: #8E8B99;
          display: block;
          margin-bottom: 0.15rem;
        }

        .thumbnail-proj-title {
          font-size: 0.8125rem;
          font-weight: 700;
          color: #121118;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Responsive Breakpoints */
        @media (max-width: 960px) {
          .tree-stage-split {
            grid-template-columns: 1fr;
            max-height: none;
            gap: 2rem;
          }

          .threejs-tree-canvas-container {
            min-height: 360px;
          }

          .projects-thumbnail-deck {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .projects-showcase-section {
            padding: 4rem 1rem 4.5rem 1rem;
          }

          .projects-thumbnail-deck {
            grid-template-columns: 1fr;
          }

          .spotlight-project-dossier {
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>

      <div className="projects-wrapper">
        
        {/* =========================================================
            SECTION HEADER
            ========================================================= */}
        <div className="projects-header">
          <div className="projects-eyebrow">
            <span className="projects-eyebrow-dot" />
            <span>04 // Selected Codebases & Architectures</span>
          </div>

          <h2 className="projects-title">
            Engineered Systems & Production Builds.
          </h2>

          <p className="projects-subtitle">
            Interactive branching showcase featuring full-stack platforms, 
            enterprise web portals, and specialized computer vision pipelines.
          </p>
        </div>

        {/* =========================================================
            SPLIT STAGE: 3D THREE.JS TREE DIAGRAM & PROJECT DOSSIER
            ========================================================= */}
        <div className="tree-stage-split">
          
          {/* LEFT: INTERACTIVE THREE.JS 3D TREE DIAGRAM */}
          <div className="threejs-tree-canvas-container">
            <div className="tree-canvas-badge">
              <Layers size={13} className="text-zinc-600" />
              <span>Interactive 3D Branch Architecture</span>
            </div>

            {/* Three.js Canvas Mount */}
            <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

            {/* Stepper Navigation across Nodes */}
            <div className="tree-nav-controls">
              <button 
                onClick={handlePrev} 
                className="tree-nav-btn" 
                title="Previous Project Node"
                aria-label="Previous Project"
              >
                <ChevronLeft size={16} />
              </button>

              <span className="tree-nav-indicator">
                {String(activeIdx + 1).padStart(2, '0')} / 04
              </span>

              <button 
                onClick={handleNext} 
                className="tree-nav-btn" 
                title="Next Project Node"
                aria-label="Next Project"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* RIGHT: SPOTLIGHT PROJECT DOSSIER & VIEWPORT PREVIEW */}
          <motion.div 
            key={activeProject.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="spotlight-project-dossier"
          >
            <div>
              <div className="project-dossier-top">
                <span className="project-category-chip">
                  <Sparkles size={12} />
                  <span>{activeProject.categoryLabel}</span>
                </span>
                <span className="project-metric-text">
                  {activeProject.metrics}
                </span>
              </div>

              <h3 className="project-dossier-title">
                {activeProject.title}
              </h3>

              <p className="project-dossier-subtitle">
                {activeProject.subtitle}
              </p>

              <p className="project-dossier-desc">
                {activeProject.description}
              </p>

              {/* Clickable Image / Viewport Preview Mockup */}
              <div 
                className="project-preview-mockup-frame"
                onClick={() => handleOpenLink(activeProject.liveUrl || activeProject.githubUrl)}
                title="Click to Open Live Project"
              >
                <div className="preview-chrome-bar">
                  <div className="preview-lights">
                    <span className="preview-light preview-light-red" />
                    <span className="preview-light preview-light-yellow" />
                    <span className="preview-light preview-light-green" />
                  </div>
                  <div className="preview-address-url">
                    {activeProject.liveUrl || activeProject.githubUrl}
                  </div>
                </div>

                <div className="preview-screen-body">
                  <div className="preview-screen-overlay">
                    <div className="preview-launch-pill">
                      <span>Launch Project</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  <div className="mockup-inner-brand">
                    <span className="mockup-brand-title">
                      {activeProject.title}
                    </span>
                    <span className="mockup-brand-badge">
                      <CheckCircle2 size={12} />
                      <span>{activeProject.metrics}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="project-tech-tags">
                {activeProject.techStack.map((tech) => (
                  <span key={tech} className="project-tech-tag">
                    <TechLogo name={tech} size={13} className="text-zinc-600" />
                    <span>{tech}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="project-dossier-actions">
              <button 
                onClick={() => handleOpenLink(activeProject.liveUrl || activeProject.githubUrl)}
                className="btn-live-launch"
              >
                <span>Visit Project ↗</span>
              </button>

              <button 
                onClick={() => handleOpenLink(activeProject.githubUrl)}
                className="btn-github-code"
                title="View GitHub Repository"
              >
                <GithubIcon size={15} />
                <span>Source</span>
              </button>
            </div>
          </motion.div>

        </div>

        {/* =========================================================
            THUMBNAILS SELECTOR STRIP (Shown One by One)
            ========================================================= */}
        <div className="projects-thumbnail-deck">
          {projects.map((proj, idx) => {
            const isSelected = idx === activeIdx;

            return (
              <div 
                key={proj.id}
                onClick={() => setActiveIdx(idx)}
                className={`thumbnail-card-item ${isSelected ? 'is-active-thumb' : ''}`}
              >
                <div className="thumbnail-dot-indicator" />
                <div className="thumbnail-content-meta">
                  <span className="thumbnail-step-num">
                    NODE 0{idx + 1}
                  </span>
                  <div className="thumbnail-proj-title">
                    {proj.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Projects;
