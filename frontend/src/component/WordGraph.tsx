import { useEffect, useRef, useState } from "react";
import { Network, DataSet } from "vis-network/standalone";
import type { Node, Edge } from "vis-network";

type GroupKey = "blue" | "purple" | "rose";
const groupStyles: Record<GroupKey, { bg: string; border: string }> = {
  blue:   { bg: "#2251FF", border: "#1E40AF" },
  purple: { bg: "#6D28D9", border: "#4C1D95" },
  rose:   { bg: "#BE123C", border: "#881337" },
};

const groupToVisColor = (g: GroupKey) => {
  const { bg, border } = groupStyles[g];
  return {
    background: bg,
    border,
    highlight: { background: bg, border },
    hover: { background: bg, border },
  };
};

const isThaiOnly = (s: string) => !!s && /^[\u0E00-\u0E7F\s]+$/.test(s.trim());

// ✅ คิวคำไทย (เพิ่มให้ยาวขึ้น)
const initialQueue = [
  "อ้อน", "กอด", "อบอุ่น", "ผูกพัน", "คิดถึง", "ห่วงใย",
  
];

export default function WordGraphThaiChain() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const networkRef = useRef<Network | null>(null);

  // ---------- สร้างโหนดเริ่มต้น: แมว (ซ้าย) และ รัก (ขวา) ----------
  const START_ID = 1;
  const END_ID = 2;

  const nodesRef = useRef(new DataSet<Node>([
    { id: START_ID, label: "แมว", group: "purple" },
    { id: END_ID,   label: "ความรัก",  group: "rose"   },
  ]));
  const edgesRef = useRef(new DataSet<Edge>([]));

  // สถานะ/ตัวช่วย
  const [value, setValue] = useState("");
  const [queue, setQueue] = useState<string[]>(initialQueue);

  // โหนดสุดท้ายของ “สายโซ่” (เริ่มจาก แมว)
  const lastIdRef = useRef<number>(START_ID);
  // เชื่อมถึงปลายทางหรือยัง
  const connectedToEndRef = useRef(false);

  // วนสีกลุ่ม
  const nextGroup = useRef<GroupKey>("blue");
  const pickNextGroup = (): GroupKey => {
    const order: GroupKey[] = ["blue", "purple", "rose"];
    const idx = order.indexOf(nextGroup.current);
    nextGroup.current = order[(idx + 1) % order.length];
    return nextGroup.current;
  };

  // ---------- init network ----------
  useEffect(() => {
    if (!containerRef.current) return;

    const network = new Network(
      containerRef.current,
      { nodes: nodesRef.current, edges: edgesRef.current },
      {
        autoResize: true,
        interaction: { hover: true },
        physics: {
          solver: "barnesHut",
          stabilization: { iterations: 120, updateInterval: 25 },
        },
        nodes: {
          shape: "ellipse",
          borderWidth: 2,
          font: { color: "#fff", size: 16, face: "Inter" },
          margin: { top: 10, bottom: 10, left: 16, right: 16 },
        },
        edges: {
          color: { color: "#A78BFA", opacity: 0.7 },
          width: 1.8,
          smooth: { enabled: true, type: "dynamic", roundness: 0.5 },
        },
        groups: {
          blue:   { color: groupToVisColor("blue") },
          purple: { color: groupToVisColor("purple") },
          rose:   { color: groupToVisColor("rose") },
        },
      }
    );
    networkRef.current = network;

    // จัดวาง “แมว” ซ้าย และ “รัก” ขวา ก่อน ยังไม่เชื่อมเส้น
    network.moveNode(START_ID, -280, 0);
    network.moveNode(END_ID,  280,  0);
    network.fit();

    return () => network.destroy();
  }, []);

  // ---------- effect focus + pulse ----------
  function focusPulse(newId: number, group: GroupKey) {
    const net = networkRef.current;
    const nodes = nodesRef.current;
    if (!net) return;

    const original = groupToVisColor(group);
    nodes.update({
      id: newId,
      color: {
        background: "#FDE68A",
        border: "#F59E0B",
        highlight: { background: "#FDE68A", border: "#F59E0B" },
        hover: { background: "#FDE68A", border: "#F59E0B" },
      },
    });

    net.focus(newId, { animation: { duration: 650, easingFunction: "easeInOutQuad" }, scale: 1.2 });
    net.selectNodes([newId]);

    setTimeout(() => {
      nodes.update({ id: newId, color: original });
      net.unselectAll();
      net.fit({ animation: { duration: 500, easingFunction: "easeInOutQuad" } });
    }, 800);
  }

  // ---------- เพิ่มทีละคำ / เชื่อมทีละเส้น ----------
  function addStep() {
    const typed = value.trim();

    // 1) ถ้าไม่มีคำพิมพ์ และคิวหมดแล้ว และยังไม่ได้เชื่อมถึง "รัก"
    //    -> กด Add เพื่อ "เชื่อมสเตปสุดท้าย" (last -> รัก)
    if (!typed && queue.length === 0 && !connectedToEndRef.current) {
      edgesRef.current.add({
        id: `e${lastIdRef.current}-${END_ID}`,
        from: lastIdRef.current,
        to: END_ID,
        smooth: true,
      });
      connectedToEndRef.current = true;

      networkRef.current?.stabilize(30);
      focusPulse(END_ID, "rose");
      return;
    }

    // 2) ดึงคำไทยรายการถัดไป (พิมพ์เอง > คิว)
    const label = typed || (queue[0] ?? "");
    if (!label) return;
    if (!isThaiOnly(label)) {
      setValue("");
      return;
    }
    if (!typed) setQueue(q => q.slice(1));

    const id = Date.now();
    const group = pickNextGroup();

    // เพิ่มโหนดใหม่
    nodesRef.current.add({ id, label, group });
    // เชื่อมจาก last -> โหนดใหม่
    edgesRef.current.add({
      id: `e${lastIdRef.current}-${id}`,
      from: lastIdRef.current,
      to: id,
      smooth: true,
    });
    lastIdRef.current = id; // โหนดล่าสุดเลื่อนไปที่ที่เพิ่ม

    networkRef.current?.stabilize(30);
    focusPulse(id, group);
    setValue("");
  }

  const nextHint = value.trim() ? "" : (queue[0] ?? (connectedToEndRef.current ? "" : "เชื่อมถึง รัก"));

  return (
    <div className="w-full">
      {/* แถวควบคุม */}
      <div className="flex gap-3 items-center mb-3 justify-center">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addStep()}
          placeholder={
            nextHint ? `พิมพ์คำไทย หรือกด Add เพื่อเพิ่ม: ${nextHint}` : "พิมพ์คำไทย..."
          }
          className="w-[560px] max-w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addStep}
          disabled={!value.trim() && queue.length === 0 && connectedToEndRef.current}
          className="rounded-lg border border-gray-300 px-4 py-2 shadow-sm hover:shadow transition disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* แถบคิว */}
      <div className="mb-2 text-center text-sm text-gray-600">
        คิวถัดไป: {queue.length ? queue.join(" → ") : (connectedToEndRef.current ? "— เสร็จสิ้น —" : "กด Add เพื่อเชื่อมถึง รัก")}
      </div>

      {/* กราฟ */}
      <div
        ref={containerRef}
        className="h-[420px] w-full rounded-xl bg-white"
        style={{ border: "1px solid rgba(0,0,0,0.06)" }}
      />
    </div>
  );
}
