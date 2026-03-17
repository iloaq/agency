/* eslint-disable no-console */
// GLB inspection (meshes + triangles + bounding box), without loading textures.
// Source (GLB spec): https://github.com/KhronosGroup/glTF/tree/main/specification/2.0#glb-file-format-specification

const fs = require("fs");
const path = require("path");

const arg = process.argv[2];
const file = arg
  ? path.isAbsolute(arg)
    ? arg
    : path.join(process.cwd(), arg)
  : path.join(
      process.cwd(),
      "public",
      "uploads_files_4455536_Infinite+Loop+in+Geo+Nodes+.glb"
    );

function readUInt32LE(buf, offset) {
  return buf.readUInt32LE(offset);
}

function isNumber(n) {
  return typeof n === "number" && Number.isFinite(n);
}

function mergeBounds(bounds, min, max) {
  if (!bounds.min) bounds.min = [min[0], min[1], min[2]];
  else {
    bounds.min[0] = Math.min(bounds.min[0], min[0]);
    bounds.min[1] = Math.min(bounds.min[1], min[1]);
    bounds.min[2] = Math.min(bounds.min[2], min[2]);
  }
  if (!bounds.max) bounds.max = [max[0], max[1], max[2]];
  else {
    bounds.max[0] = Math.max(bounds.max[0], max[0]);
    bounds.max[1] = Math.max(bounds.max[1], max[1]);
    bounds.max[2] = Math.max(bounds.max[2], max[2]);
  }
}

function parseGlb(buf) {
  // Header: magic, version, length
  const magic = readUInt32LE(buf, 0);
  const version = readUInt32LE(buf, 4);
  const length = readUInt32LE(buf, 8);

  // 'glTF' magic = 0x46546C67
  if (magic !== 0x46546c67) throw new Error("Not a GLB (bad magic)");
  if (version !== 2) throw new Error(`Unsupported GLB version: ${version}`);
  if (length !== buf.length) {
    // Some tools may set length differently, but usually should match.
  }

  let offset = 12;
  let json = null;

  while (offset + 8 <= buf.length) {
    const chunkLength = readUInt32LE(buf, offset);
    const chunkType = readUInt32LE(buf, offset + 4);
    offset += 8;

    const chunk = buf.slice(offset, offset + chunkLength);
    offset += chunkLength;

    // 'JSON' = 0x4E4F534A
    if (chunkType === 0x4e4f534a) {
      json = JSON.parse(chunk.toString("utf8"));
    }
  }

  if (!json) throw new Error("GLB: missing JSON chunk");
  return json;
}

const buf = fs.readFileSync(file);
const gltf = parseGlb(buf);

const meshesCount = Array.isArray(gltf.meshes) ? gltf.meshes.length : 0;
const nodesCount = Array.isArray(gltf.nodes) ? gltf.nodes.length : 0;

let primitives = 0;
let triangles = 0;
const bounds = { min: null, max: null };

const accessors = Array.isArray(gltf.accessors) ? gltf.accessors : [];

function accessorTriangles(prim) {
  const mode = prim.mode ?? 4;
  if (mode !== 4) return 0;
  if (isNumber(prim.indices) && accessors[prim.indices]) {
    return (accessors[prim.indices].count ?? 0) / 3;
  }
  if (prim.attributes && isNumber(prim.attributes.POSITION)) {
    return (accessors[prim.attributes.POSITION]?.count ?? 0) / 3;
  }
  return 0;
}

function accessorBounds(prim) {
  if (prim.attributes && isNumber(prim.attributes.POSITION)) {
    const a = accessors[prim.attributes.POSITION];
    if (a?.min?.length === 3 && a?.max?.length === 3) return { min: a.min, max: a.max };
  }
  return null;
}

for (const mesh of gltf.meshes ?? []) {
  for (const prim of mesh.primitives ?? []) {
    primitives += 1;
    const mode = prim.mode ?? 4; // TRIANGLES default
    if (mode !== 4) continue;

    // Triangle count
    triangles += accessorTriangles(prim);

    // Bounds from POSITION accessor min/max (if present)
    const b = accessorBounds(prim);
    if (b) {
      mergeBounds(bounds, b.min, b.max);
    }
  }
}

let size = null;
let center = null;
if (bounds.min && bounds.max) {
  size = [
    bounds.max[0] - bounds.min[0],
    bounds.max[1] - bounds.min[1],
    bounds.max[2] - bounds.min[2],
  ];
  center = [
    (bounds.min[0] + bounds.max[0]) / 2,
    (bounds.min[1] + bounds.max[1]) / 2,
    (bounds.min[2] + bounds.max[2]) / 2,
  ];
}

console.log("file:", file);
console.log("meshes:", meshesCount);
console.log("nodes:", nodesCount);
console.log("primitives:", primitives);
console.log("triangles:", Math.round(triangles));
if (size) console.log("size:", size);
if (center) console.log("center:", center);
if (bounds.min) console.log("min:", bounds.min);
if (bounds.max) console.log("max:", bounds.max);

// Mesh breakdown (names + bounds + triangles)
if (Array.isArray(gltf.meshes)) {
  console.log("\nmeshes breakdown:");
  gltf.meshes.forEach((m, i) => {
    const name = m.name ?? `(mesh ${i})`;
    let mt = 0;
    const mb = { min: null, max: null };
    for (const prim of m.primitives ?? []) {
      mt += accessorTriangles(prim);
      const b = accessorBounds(prim);
      if (b) mergeBounds(mb, b.min, b.max);
    }
    let msize = null;
    if (mb.min && mb.max) {
      msize = [mb.max[0] - mb.min[0], mb.max[1] - mb.min[1], mb.max[2] - mb.min[2]];
    }
    console.log(
      `- #${i} ${name} | tris=${Math.round(mt)} | size=${msize ? JSON.stringify(msize) : "n/a"}`
    );
  });
}

// Node -> mesh mapping
if (Array.isArray(gltf.nodes)) {
  console.log("\nnodes breakdown:");
  gltf.nodes.forEach((n, i) => {
    const name = n.name ?? `(node ${i})`;
    const mesh = isNumber(n.mesh) ? n.mesh : null;
    const t = n.translation ?? null;
    const s = n.scale ?? null;
    const r = n.rotation ?? null;
    if (mesh !== null) {
      console.log(
        `- #${i} ${name} -> mesh #${mesh} | t=${t ? JSON.stringify(t) : "n/a"} s=${s ? JSON.stringify(s) : "n/a"}`
      );
    }
  });
}


