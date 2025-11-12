// components/HeroImage.tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type PartHoverInfo = {
  title: string;
  company: string;
  partNumber: string;
  url: string;
  specs?: Record<string, string | number>;
} | null;

// helpers (place near the top, after imports)
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");

type Origin =
  | "fuyu-generic" // generic FUYU library under /fuyutechnology/<repo>/<item>
  | "build" // build-specific under /fuyutechnology/LPS-42/components/<item>
  | "standard" // /metric/fasteners/bolts/<spec>
  | "supplierStd" // /<org>/metric/fasteners/bolts/<spec>
  | "oem"; // default: /<org>/<repo>

type PieceDef = {
  name: string;
  title: string;
  partNumber: string;
  company: string;
  color: string;
  depth: string;
  url: string;
  specs?: Record<string, string | number>;
  origin?: Origin;
  supplierOrg?: string; // for supplierStd
  standardSpec?: string; // for standard/supplierStd (e.g., "m6x25-iso7380-t30")
  fuyuRepo?: string; // for fuyu-generic (e.g., "railplates")
};

// central URL builder
const makePartUrl = (p: PieceDef): string => {
  const org = slug(p.company || "");
  const repo = slug(p.title || p.partNumber);

  if (p.origin === "fuyu-generic") {
    const libraryRepo = slug(p.fuyuRepo || "library");
    const item = slug(p.title || p.partNumber);
    return `/fuyutechnology/${libraryRepo}/${item}`;
  }

  if (p.origin === "build") {
    const item = slug(p.title || p.partNumber);
    return `/fuyutechnology/LPS-42/components/${item}`;
  }

  if (p.origin === "standard") {
    const spec = slug(p.standardSpec || repo);
    return `/metric/fasteners/bolts/${spec}`;
  }

  if (p.origin === "supplierStd" && p.supplierOrg) {
    const spec = slug(p.standardSpec || repo);
    return `/${slug(p.supplierOrg)}/metric/fasteners/bolts/${spec}`;
  }

  // default external OEM/brand
  return `/${org}/${repo}`;
};

type Props = {
  onHoverPart?: (info: PartHoverInfo) => void;
};

// ---------- Assembly/image wiring ----------
const PRODUCT = "FUYU_FSK40_LG";
const partImg = (folder: string) => ({
  color: `/images/${PRODUCT}/${folder}/${folder}.png`,
  depth: `/images/${PRODUCT}/${folder}/${folder}_depth.png`,
});

const PIECES: PieceDef[] = [
  // Standards (generic + supplier-hosted libraries)
  { name: "iso7380-m6x25-t30", title: "Button Head Screw ISO 7380 M6×25 T30", partNumber: "ISO7380-M6-1.0X25-T30", company: "BoltCo", ...partImg("ISO 7380 M6-1.0X25__ T30 TORX"), url: "", origin: "supplierStd", supplierOrg: "boltco", standardSpec: "m6x25-iso7380-t30" },

    // External OEMs -> /<org>/<repo>
  { name: "ballscrew", title: "Ballscrew C7 10mm", partNumber: "BALLSCREW", company: "PrecisionDrive", color: `/images/${PRODUCT}/ballscrew/ballscrew_masked.png`, depth: `/images/${PRODUCT}/ballscrew/ballscrew_masked_depth.png`, url: "", origin: "oem", specs: { type: "C7", pitch_mm: 10 } },
  { name: "rail", title: "Linear Guide Rail MGNR15 • 1100mm", partNumber: "MGNR15R110CM-Rail", company: "RailCore", ...partImg("MGNR15R110CM-Rail"), url: "", origin: "oem", specs: { width_mm: 15, length_mm: 1100, material: "Stainless" } },

  // FUYU generic library parts (not build-specific)
  { name: "motorrail", title: "Motor Rail", partNumber: "MOTORRAIL", company: "FUYU", ...partImg("motorrail"), url: "", origin: "fuyu-generic", fuyuRepo: "rails", specs: { length_mm: 300 } },
  { name: "ballscrewplate", title: "Ballscrew Plate", partNumber: "BALLSCREWPLATE", company: "FUYU", ...partImg("ballscrewplate"), url: "", origin: "fuyu-generic", fuyuRepo: "railplates", specs: { material: "Aluminum" } },
  { name: "motorplate", title: "Motor Plate", partNumber: "MOTORPLATE", company: "FUYU", ...partImg("motorplate"), url: "", origin: "fuyu-generic", fuyuRepo: "motor-plates", specs: { material: "Steel", finish: "Powder coat" } },
  { name: "carriage", title: "Endplate", partNumber: "ENDPLATE", company: "FUYU", ...partImg("endplate"), url: "", origin: "fuyu-generic", fuyuRepo: "endplates", specs: { material: "Aluminum 6061-T6", finish: "Anodized" } },

  // Build-specific under the product repo
  { name: "linear-carriage", title: "Linear Carriage", partNumber: "LINEAR_CARRIAGE", company: "FUYU", ...partImg("Linear_carriage"), url: "", origin: "build", specs: { width_mm: 40 } },


  // Motor by Transmotec -> /transmotec/nema23-57s
  { name: "motor", title: "NEMA23 57S Stepper", partNumber: "57HS", company: "Transmotec", ...partImg("Stepping Motor 57HS"), url: "", origin: "oem", specs: { frame: "NEMA23", step_deg: 1.8, voltage_V: 24 } },

  // Standards (generic + supplier-hosted libraries)
  { name: "m3x30", title: "Socket Head Cap Screw M3×30", partNumber: "M3X30", company: "Metric Standard", ...partImg("M3X30"), url: "", origin: "standard", standardSpec: "m3x30-iso4762" },
  { name: "m4x10", title: "Socket Head Cap Screw M4×10", partNumber: "M4X10", company: "BoltCo", ...partImg("M4X10"), url: "", origin: "supplierStd", supplierOrg: "boltco", standardSpec: "m4x10-iso4762" },
  { name: "m4-washer", title: "Washer ISO 7380 M4 Ø2.5", partNumber: "M4-0.7x10-S2.5-ISO7380", company: "BoltCo", ...partImg("M4-0.7 x 10__ S 2.5 ISO 7380"), url: "", origin: "supplierStd", supplierOrg: "boltco", standardSpec: "m4-iso7380-s2p5" },
  { name: "din-471-1", title: "Circlip DIN 471-1", partNumber: "DIN-471-1", company: "BoltCo", ...partImg("DIN-471-1"), url: "", origin: "supplierStd", supplierOrg: "boltco", standardSpec: "din-471-1" },
  { name: "t-slot-nut", title: "T-Slot Nut Hammer Head M5", partNumber: "TSlotNut_HammerHead_M5", company: "FastenAll", ...partImg("TSlotNut_HammerHead_M5_2020Series"), url: "", origin: "supplierStd", supplierOrg: "fastenall", standardSpec: "m5-hammer-head" },
];

// assign URLs once
PIECES.forEach((p) => {
  if (!p.url) p.url = makePartUrl(p);
});


type GroupFollower = { name: string; dx?: number; dy?: number; drot?: number };
const GROUPS: { leader: string; followers: GroupFollower[] }[] = [
  { leader: "motor", followers: [{ name: "m4-washer" }] },
  { leader: "rail", followers: [{ name: "t-slot-nut" }] },
  {
    leader: "motorplate",
    followers: [{ name: "carriage" }, { name: "iso7380-m6x25-t30" }],
  },
  {
    leader: "motorrail",
    followers: [
      { name: "ballscrew" },
      { name: "ballscrewplate" },
      { name: "linear-carriage" },
    ],
  },
];

// ---------- Motion config ----------
const SCENE_MOTION = {
  ampX: 3.0,
  ampY: 4.0,
  rot: 0.01,
  sx: 0.4,
  sy: 0.35,
  sr: 0.25,
};

const GROUP_MOTION: Record<
  string,
  {
    ampX?: number;
    ampY?: number;
    rot?: number;
    sx?: number;
    sy?: number;
    sr?: number;
    phase?: number;
  }
> = {
  motorrail: {
    ampX: 8,
    ampY: 6,
    rot: 0.025,
    sx: 0.55,
    sy: 0.47,
    sr: 0.35,
    phase: 0.3,
  },
  motorplate: {
    ampX: 6,
    ampY: 5,
    rot: 0.02,
    sx: 0.5,
    sy: 0.42,
    sr: 0.32,
    phase: 1.1,
  },
  rail: {
    ampX: 5,
    ampY: 4,
    rot: 0.018,
    sx: 0.46,
    sy: 0.38,
    sr: 0.28,
    phase: 2.0,
  },
  motor: {
    ampX: 4,
    ampY: 3,
    rot: 0.016,
    sx: 0.43,
    sy: 0.35,
    sr: 0.26,
    phase: 2.6,
  },
};

const LEADERS = new Set(GROUPS.map((g) => g.leader));
const FOLLOWER_TO_LEADER = new Map<string, string>();
GROUPS.forEach((g) =>
  g.followers.forEach((f) => FOLLOWER_TO_LEADER.set(f.name, g.leader))
);

// ---------- TS-friendly shader uniform types ----------
type Uniforms = {
  uTexture: { value: THREE.Texture | null };
  uDepth: { value: THREE.Texture | null };
  uMouse: { value: THREE.Vector2 };
  uStrength: { value: number };
  uTime: { value: number };
  uLightDir: { value: THREE.Vector3 };
  uAmbient: { value: number };
  uLightTint: { value: THREE.Vector3 };
  uTexelSize: { value: THREE.Vector2 };
  uParallax: { value: number };
  uGrainAmt: { value: number };
  uPieceOffset: { value: THREE.Vector2 };
  uPieceRotate: { value: number };
  uHoverUv: { value: THREE.Vector2 };
  uHoverAmt: { value: number };
  uHoverRadius: { value: number };
  uGridScale: { value: number };
  uGridWidth: { value: number };
  uGridIntensity: { value: number };
  uGridWarp: { value: number };
  uGridDepthScale: { value: number };
};

// For CPU-side alpha testing
type MeshWithAlpha = THREE.Mesh & {
  __alphaMap?: { data: Uint8ClampedArray; width: number; height: number };
};

type ColorBendsSync = {
  time: number;
  rot: { x: number; y: number };
  pointer: THREE.Vector2;
  speed: number;
  scale: number;
  warpStrength: number;
  frequency: number;
  colors: THREE.Vector3[];
};

// ---------- Rendering/interaction ----------
export default function HeroImage({ onHoverPart }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    });
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 180ms ease";

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    const setTexCommon = (t: THREE.Texture, srgb = true) => {
      t.minFilter = THREE.LinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      t.generateMipmaps = false;
      if (srgb) t.colorSpace = THREE.SRGBColorSpace;
    };

    // Keep uniforms but hard-disable parallax
    const uMouse = new THREE.Vector2(0, 0);
    const uStrength = { value: 0.0 }; // stays 0
    const PARALLAX_OFF = 0.0;

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform sampler2D uTexture;
      uniform sampler2D uDepth;

      uniform vec2  uMouse;
      uniform float uStrength;
      uniform float uTime;
      uniform vec3  uLightDir;
      uniform float uAmbient;
      uniform vec3  uLightTint;
      uniform vec2  uTexelSize;
      uniform float uParallax;
      uniform float uGrainAmt;

      uniform vec2  uPieceOffset;
      uniform float uPieceRotate;

      uniform vec2  uHoverUv;
      uniform float uHoverAmt;
      uniform float uHoverRadius;

      uniform float uGridScale;
      uniform float uGridWidth;
      uniform float uGridIntensity;
      uniform float uGridWarp;
      uniform float uGridDepthScale;

      varying vec2 vUv;

      float grain(vec2 uv, float t){
        uv += vec2(t * 0.05, -t * 0.043);
        float n = dot(uv, vec2(127.1, 311.7));
        return fract(sin(n) * 43758.5453) * 2.0 - 1.0;
      }

      vec3 depthNormal(vec2 uv){
        vec2 ts = uTexelSize;
        float tl = texture2D(uDepth, uv + ts * vec2(-1.0, -1.0)).r;
        float  l = texture2D(uDepth, uv + ts * vec2(-1.0,  0.0)).r;
        float bl = texture2D(uDepth, uv + ts * vec2(-1.0,  1.0)).r;
        float  t = texture2D(uDepth, uv + ts * vec2( 0.0, -1.0)).r;
        float  b = texture2D(uDepth, uv + ts * vec2( 0.0,  1.0)).r;
        float tr = texture2D(uDepth, uv + ts * vec2( 1.0, -1.0)).r;
        float  r = texture2D(uDepth, uv + ts * vec2( 1.0,  0.0)).r;
        float br = texture2D(uDepth, uv + ts * vec2( 1.0,  1.0)).r;

        float gx = (tr + 2.0*r + br) - (tl + 2.0*l + bl);
        float gy = (bl + 2.0*b + br) - (tl + 2.0*t + tr);
        return normalize(vec3(-gx, -gy, 0.75));
      }

      vec2 clampUv(vec2 uv){ return clamp(uv, vec2(0.001), vec2(0.999)); }
      vec2 rotate2D(vec2 p, float a){
        float s = sin(a), c = cos(a);
        mat2 m = mat2(c,-s,s,c);
        return m * p;
      }

      float gridMask(vec2 uv, float scale, float width){
        vec2 g = uv * scale;
        vec2 r = abs(fract(g) - 0.5);
        vec2 d = 0.5 - r;
        float m = min(d.x, d.y);
        return smoothstep(width, 0.0, m);
      }

      void main() {
        vec2 uv = vUv + uPieceOffset * uTexelSize;
        vec2 centered = uv - 0.5;
        uv = rotate2D(centered, uPieceRotate) + 0.5;

        vec2 huv = uHoverUv + uPieceOffset * uTexelSize;
        vec2 hcentered = huv - 0.5;
        huv = rotate2D(hcentered, uPieceRotate) + 0.5;

        float d = texture2D(uDepth, uv).r;
        float depthCentered = d - 0.5;
        vec3 n = depthNormal(uv);

        float hoverMask = smoothstep(uHoverRadius, 0.0, distance(uv, huv));
        float alphaAtHover = texture2D(uTexture, huv).a;
        hoverMask *= step(0.001, alphaAtHover) * uHoverAmt;

        // Parallax disabled by uParallax = 0.0 and uStrength = 0.0
        float localStrength = uStrength + hoverMask * 0.35;
        vec2 shift = uMouse * depthCentered * localStrength * uParallax;
        uv = clampUv(uv + shift);

        vec4 col = texture2D(uTexture, uv);
        if (col.a < 0.001) discard;

        float lambert = max(dot(normalize(uLightDir), n), 0.0);
        float rim = pow(1.0 - max(dot(n, vec3(0.0,0.0,1.0)), 0.0), 2.0);
        float light = uAmbient + (1.0 - uAmbient) * lambert + 0.25 * rim;

        float g = grain(uv * 1200.0, uTime) * uGrainAmt;
        float darkBoost = smoothstep(0.0, 0.6, 1.0 - dot(col.rgb, vec3(0.333)));
        g *= mix(0.3, 1.0, darkBoost);

        vec3 lit = (col.rgb * light + g) * uLightTint;

        vec2 gridUV = uv + n.xy * uGridWarp;
        float gridScale = uGridScale * (1.0 + depthCentered * uGridDepthScale);
        float grid = gridMask(gridUV, gridScale, uGridWidth) * hoverMask;
        vec3 gridColor = normalize(uLightTint + vec3(0.001)) * uGridIntensity;

        lit += gridColor * grid;

        gl_FragColor = vec4(lit, col.a);
      }
    `;

    const displayMeshes: MeshWithAlpha[] = [];
    const metaByName = new Map(PIECES.map((p) => [p.name, p]));

    // Aspect from first loaded image; default fallback
    let aspect = 800 / 1200;

    // CPU-side alpha map (built once per piece)
    const getWH = (img: unknown): { w?: number; h?: number } => {
      const anyImg = img as { width?: number; height?: number };
      return { w: anyImg?.width, h: anyImg?.height };
    };

    const attachAlphaMap = (mesh: MeshWithAlpha, tex: THREE.Texture) => {
      const wh = getWH(tex.image);
      if (!wh.w || !wh.h) return;

      const cvs = document.createElement("canvas");
      cvs.width = wh.w;
      cvs.height = wh.h;
      const ctx = cvs.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Draw image regardless of element/bitmap type
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ctx.drawImage(tex.image as any, 0, 0, wh.w, wh.h);
      const imageData = ctx.getImageData(0, 0, wh.w, wh.h);
      mesh.__alphaMap = { data: imageData.data, width: wh.w, height: wh.h };
    };

    const isOpaqueAtUV = (
      mesh: MeshWithAlpha,
      uv: THREE.Vector2,
      threshold = 2
    ) => {
      const amap = mesh.__alphaMap;
      if (!amap) return true;
      const x = Math.max(
        0,
        Math.min(amap.width - 1, Math.floor(uv.x * (amap.width - 1)))
      );
      const y = Math.max(
        0,
        Math.min(amap.height - 1, Math.floor((1 - uv.y) * (amap.height - 1)))
      );
      const idx = (y * amap.width + x) * 4 + 3;
      return amap.data[idx] >= threshold;
    };

    const makeUniforms = (): Uniforms => ({
      uTexture: { value: null },
      uDepth: { value: null },
      uMouse: { value: uMouse },
      uStrength,
      uTime: { value: 0.0 },
      uLightDir: { value: new THREE.Vector3(-0.2, 0.5, 0.85).normalize() },
      uAmbient: { value: 0.45 },
      uLightTint: { value: new THREE.Vector3(1, 1, 1) },
      uTexelSize: { value: new THREE.Vector2(1 / 1200, 1 / 800) },
      uParallax: { value: PARALLAX_OFF }, // hard-off
      uGrainAmt: { value: 0.035 },
      uPieceOffset: { value: new THREE.Vector2(0, 0) },
      uPieceRotate: { value: 0.0 },
      uHoverUv: { value: new THREE.Vector2(0.5, 0.5) },
      uHoverAmt: { value: 0.0 },
      uHoverRadius: { value: 0.08 },
      uGridScale: { value: 25.0 },
      uGridWidth: { value: 0.02 },
      uGridIntensity: { value: 0.38 },
      uGridWarp: { value: 0.03 },
      uGridDepthScale: { value: 0.8 },
    });

    // Build meshes and load textures
    const loadingManager = new THREE.LoadingManager();
    let firstTextureSet = false;

    loadingManager.onLoad = () => {
      requestAnimationFrame(() => {
        renderer.domElement.style.opacity = "1";
      });
    };

    const pieceLoader = new THREE.TextureLoader(loadingManager);

    PIECES.forEach((p) => {
      const uniforms = makeUniforms();
      const mat = new THREE.ShaderMaterial({
        uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
        transparent: true,
        vertexShader,
        fragmentShader,
      });

      const mesh = new THREE.Mesh(geometry, mat) as MeshWithAlpha;
      mesh.name = p.name;
      scene.add(mesh);
      displayMeshes.push(mesh);

      pieceLoader.load(p.color, (tex) => {
        setTexCommon(tex, true);
        uniforms.uTexture.value = tex;
        const { w, h } = getWH(tex.image);
        if (!firstTextureSet && w && h) {
          aspect = h / w;
          firstTextureSet = true;
          forceResize();
        }
        if (w && h) uniforms.uTexelSize.value.set(1 / w, 1 / h);
        attachAlphaMap(mesh, tex);
      });

      pieceLoader.load(p.depth, (tex) => {
        setTexCommon(tex, false);
        uniforms.uDepth.value = tex;
      });
    });

    // ---------- Resize ----------
    const forceResize = () => {
      const cr = container.getBoundingClientRect();
      const w = Math.max(1, cr.width);
      const h = Math.max(1, Math.round(w * aspect));

      container.style.height = `${h}px`;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);

      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();

      for (const m of displayMeshes) m.scale.set(w, h, 1);
    };

    const ro = new ResizeObserver(forceResize);
    ro.observe(container);
    forceResize();

    // ---------- Interaction (hover/click only; parallax OFF) ----------
    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let currentHoverMesh: MeshWithAlpha | null = null;

    const pickOpaqueHit = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      ndc.set(x * 2 - 1, -(y * 2 - 1));
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObjects(displayMeshes, false);

      for (const h of hits) {
        if (!h.uv) continue;
        const mesh = h.object as MeshWithAlpha;
        if (isOpaqueAtUV(mesh, h.uv)) return { mesh, uv: h.uv.clone() };
      }
      return null;
    };

    const onMove = (e: PointerEvent) => {
      // Only drives hover highlight; does NOT affect uMouse/uStrength
      for (const m of displayMeshes) {
        const u = (m.material as THREE.ShaderMaterial).uniforms as Uniforms;
        u.uHoverAmt.value = Math.max(0.0, u.uHoverAmt.value - 0.12);
      }

      const picked = pickOpaqueHit(e.clientX, e.clientY);
      if (picked) {
        const u = (picked.mesh.material as THREE.ShaderMaterial)
          .uniforms as Uniforms;
        u.uHoverUv.value.copy(picked.uv);
        u.uHoverAmt.value = Math.min(1.0, u.uHoverAmt.value + 0.25);

        if (currentHoverMesh !== picked.mesh) {
          currentHoverMesh = picked.mesh;
          if (onHoverPart) {
            const meta = metaByName.get(picked.mesh.name);
            if (meta) {
              onHoverPart({
                title: meta.title,
                company: meta.company,
                partNumber: meta.partNumber,
                url: meta.url,
                specs: meta.specs,
              });
            }
          }
        }
      } else if (currentHoverMesh) {
        currentHoverMesh = null;
        if (onHoverPart) onHoverPart(null);
      }
    };

    const onClick = (e: MouseEvent) => {
      const picked = pickOpaqueHit(e.clientX, e.clientY);
      if (!picked) return;
      const meta = metaByName.get(picked.mesh.name);
      if (meta?.url) window.open(meta.url, "_blank", "noopener,noreferrer");
    };

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("click", onClick);

    // ---------- Animation ----------
    const clock = new THREE.Clock();
    let raf = 0;

    const groupOffset = new Map<string, THREE.Vector2>();
    const groupRot = new Map<string, number>();
    for (const leader of LEADERS) {
      groupOffset.set(leader, new THREE.Vector2());
      groupRot.set(leader, 0);
    }

    const tmpLightDir = new THREE.Vector3(-0.2, 0.5, 0.85).normalize();
    const tmpLightTint = new THREE.Vector3(1, 1, 1);

    const paletteToTint = (colors: THREE.Vector3[]) => {
      if (!colors || colors.length === 0) return tmpLightTint.set(1, 1, 1);
      let r = 0,
        g = 0,
        b = 0,
        wSum = 0;
      for (const c of colors) {
        const lum = 0.2126 * c.x + 0.7152 * c.y + 0.0722 * c.z;
        const w = 0.6 + lum;
        r += c.x * w;
        g += c.y * w;
        b += c.z * w;
        wSum += w;
      }
      r /= wSum;
      g /= wSum;
      b /= wSum;
      return tmpLightTint
        .set(r, g, b)
        .multiplyScalar(1.05)
        .clampScalar(0.1, 1.6);
    };

    const tick = () => {
      const t = clock.getElapsedTime();

      // lighting sync
      const sync = (window as unknown as { __colorBendsSync?: ColorBendsSync })
        .__colorBendsSync;

      let lightDir = tmpLightDir.set(-0.2, 0.5, 0.85).normalize();
      let lightTint = tmpLightTint.set(1, 1, 1);
      let ambient = 0.45;

      if (sync) {
        const rx = sync.rot.x,
          ry = sync.rot.y;
        const tiltX = THREE.MathUtils.clamp(sync.pointer.x * 0.6, -0.8, 0.8);
        const tiltY = THREE.MathUtils.clamp(sync.pointer.y * 0.6, -0.8, 0.8);
        lightDir = tmpLightDir
          .set(-ry * 0.9 + tiltX * 0.7, rx * 0.9 + tiltY * 0.7, 0.9)
          .normalize();
        const breath =
          Math.sin(sync.time * (0.5 + 0.3 * (sync.frequency || 0))) * 0.04;
        ambient = THREE.MathUtils.clamp(
          0.42 + breath + (sync.warpStrength || 0) * 0.03,
          0.32,
          0.62
        );
        lightTint = paletteToTint(sync.colors || []);
      }

      // scene sway
      const sX = Math.sin(t * SCENE_MOTION.sx) * SCENE_MOTION.ampX;
      const sY = Math.cos(t * SCENE_MOTION.sy) * SCENE_MOTION.ampY;
      const sR = Math.sin(t * SCENE_MOTION.sr) * SCENE_MOTION.rot;

      // group transforms (leaders)
      for (const leader of LEADERS) {
        const cfg = GROUP_MOTION[leader] || {};
        const ampX = cfg.ampX ?? 6,
          ampY = cfg.ampY ?? 5,
          rotA = cfg.rot ?? 0.02;
        const sx = cfg.sx ?? 0.5,
          sy = cfg.sy ?? 0.45,
          sr = cfg.sr ?? 0.33;
        const ph = cfg.phase ?? 0;

        const go = groupOffset.get(leader)!;
        go.set(
          Math.sin(t * sx + ph) * ampX,
          Math.cos(t * sy + ph * 1.3) * ampY
        );
        groupRot.set(leader, Math.sin(t * sr + ph * 0.7) * rotA);
      }

      // apply uniforms
      displayMeshes.forEach((m, i) => {
        const mat = m.material as THREE.ShaderMaterial;
        const u = mat.uniforms as Uniforms;

        const off = u.uPieceOffset.value;
        off.set(sX, sY);
        let rot = sR;

        const leader =
          FOLLOWER_TO_LEADER.get(m.name) ||
          (LEADERS.has(m.name) ? m.name : null);
        if (leader) {
          const go = groupOffset.get(leader)!;
          off.add(go);
          rot += groupRot.get(leader)!;

          const g = GROUPS.find((gg) => gg.leader === leader);
          const f = g?.followers.find((ff) => ff.name === m.name);
          if (f) {
            off.x += f.dx ?? 0;
            off.y += f.dy ?? 0;
            rot += f.drot ?? 0;
          }
        } else {
          off.x += Math.sin(t * 0.6 + i * 0.9) * 1.2;
          off.y += Math.cos(t * 0.5 + i * 1.1) * 1.0;
          rot += Math.sin(t * 0.4 + i * 0.7) * 0.008;
        }

        u.uPieceRotate.value = rot;

        u.uLightDir.value.copy(lightDir);
        u.uAmbient.value = ambient;
        u.uLightTint.value.copy(lightTint);

        const ct = u.uTexture.value;
        const wh = getWH(ct?.image);
        if (wh.w && wh.h) u.uTexelSize.value.set(1 / wh.w, 1 / wh.h);
        u.uTime.value = t;
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointermove", onMove as EventListener);
      container.removeEventListener("click", onClick as EventListener);
      displayMeshes.forEach((m) => {
        (m.material as THREE.ShaderMaterial).dispose();
      });
      geometry.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onHoverPart]);

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-full max-w-5xl overflow-hidden"
      aria-label="Interactive parts hero"
    />
  );
}
