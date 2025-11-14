// types/chain.ts
export interface ChainNodeApi {
  id: number;           // <-- นี่คือ "node id" ในระบบ chain
  word_id: number;
  word_text: string;    // ใช้เป็น label
  status: "confirmed" | "drafted" | string;
  created_at: string;
}

export interface ChainEdgeApi {
  id: number;
  from_node_id: number; // อ้างถึง ChainNodeApi.id
  to_node_id: number;   // อ้างถึง ChainNodeApi.id
  relation_type?: string;
  strength?: number;
  status: "confirmed" | "drafted" | string;
  created_at: string;
}

export interface ChainPathNodeApi {
  id: number;
  node_id: number;            // อ้างถึง ChainNodeApi.id
  prev_path_node_id: number | null;
  next_path_node_id: number | null;
  position: number;
  created_at: string;
}

export interface ChainPathApi {
  id: number;
  name: string;
  is_main: boolean;
  status: string;
  created_at: string;
  nodes: ChainPathNodeApi[];
}

export interface ChainResponse {
  id: number;
  user_id: number;
  challenge_id: number;
  created_at: string;

  start_word_id: number;
  start_word_text: string;
  end_word_id: number;
  end_word_text: string;
  completed: boolean
  nodes: ChainNodeApi[];
  edges: ChainEdgeApi[];
  paths: ChainPathApi[];
}
import type { Node as VisNode, Edge as VisEdge } from "vis-network";

type GroupKey = "blue" | "purple" | "rose" | "gray";

export function statusToGroup(status: string): GroupKey {
  if (status === "confirmed") return "blue";
  if (status === "drafted")   return "purple";
  return "gray";
}

// ✅ 2) ปรับ buildVisFromChain ให้ทำสีเฉพาะ start / end และที่เหลือพื้นขาว
export function buildVisFromChain(chain: ChainResponse) {
  const isStartWord = (n: ChainNodeApi) => n.word_id === chain.start_word_id;
  const isEndWord   = (n: ChainNodeApi) => n.word_id === chain.end_word_id;

  const visNodes: VisNode[] = chain.nodes.map((n) => {
    // สไตล์พื้นฐาน
    const base: VisNode = {
      id: n.id,
      label: n.word_text || String(n.word_id),
      shape: "ellipse",
      margin: { top: 10, bottom: 10, left: 16, right: 16 },
      // ปล่อย font/color ให้อิงค่า default จาก network options เว้นแต่จะ override ด้านล่าง
    };

    if (isStartWord(n)) {
      // node เริ่ม: เขียว
      return {
        ...base,
        font: { color: "#fff", size: 16, face: "Inter" },
        color: {
          background: "#22C55E",
          border: "#15803D",
          highlight: { background: "#22C55E", border: "#15803D" },
          hover: { background: "#22C55E", border: "#166534" },
        },
      };
    }

    if (isEndWord(n)) {
      // node จบ: ส้ม/แดงอ่อน
      return {
        ...base,
        font: { color: "#fff", size: 16, face: "Inter" },
        color: {
          background: "#F97316",
          border: "#C2410C",
          highlight: { background: "#F97316", border: "#C2410C" },
          hover: { background: "#F97316", border: "#9A3412" },
        },
      };
    }

    // node อื่น ๆ: พื้นขาว ขอบเทา ตัวอักษรดำ
    return {
      ...base,
      font: { color: "#111827", size: 16, face: "Inter" },
      color: {
        background: "#FFFFFF",
        border: "#CBD5E1",
        highlight: { background: "#FFFFFF", border: "#64748B" },
        hover: { background: "#FFFFFF", border: "#334155" },
      },
    };
  });

  const visEdges: VisEdge[] = chain.edges.map((e) => ({
    id: e.id,
    from: e.from_node_id,
    to: e.to_node_id,
    smooth: { enabled: true, type: "dynamic", roundness: 0.5 },
    width: e.status === "confirmed" ? 2.2 : 1.2,
    color: { opacity: 0.8 },
    arrows: "to",
  }));

  // เน้น main path ถ้ามี
  const mainPath = chain.paths.find((p) => p.is_main) ?? chain.paths[0];
  if (mainPath?.nodes?.length) {
    const seq = mainPath.nodes.slice().sort((a, b) => a.position - b.position);
    for (let i = 0; i < seq.length - 1; i++) {
      const a = seq[i].node_id;
      const b = seq[i + 1].node_id;
      const found = visEdges.find(
        (ed) => (ed.from === a && ed.to === b) || (ed.from === b && ed.to === a)
      );
      if (found) {
        found.width = 3.5;
        // อยากให้เด่นขึ้นนิด
        found.color = { color: "#F59E0B" };
      } else {
        visEdges.push({
          id: `path-${a}-${b}`,
          from: a,
          to: b,
          dashes: true,
          width: 2.2,
          color: { color: "#F59E0B", opacity: 0.9 },
          smooth: { enabled: true, type: "dynamic", roundness: 0.5 },
          arrows: "to",
        });
      }
    }
  }

  return { visNodes, visEdges };
}


import { useCallback, useEffect, useRef, useState } from "react";
import { DataSet } from "vis-network/standalone";
import { getChain } from "../api/chain";        


export function useChainGraph(chainId: number | null) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [data,    setData]    = useState<ChainResponse | null>(null);

  const nodesRef = useRef(new DataSet<VisNode>([]));
  const edgesRef = useRef(new DataSet<VisEdge>([]));

  const reload = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getChain(chainId);
      setData(res as ChainResponse);

      const { visNodes, visEdges } = buildVisFromChain(res as ChainResponse);
      nodesRef.current.clear();
      edgesRef.current.clear();
      nodesRef.current.add(visNodes);
      edgesRef.current.add(visEdges);
    } catch (e: any) {
      setError(e?.message ?? "Load chain failed");
    } finally {
      setLoading(false);
    }
  }, [chainId]);

  useEffect(() => {
    reload();
  }, [reload]);

  return {
    loading,
    error,
    data,
    nodes: nodesRef.current,
    edges: edgesRef.current,
    reload,
  };
}

import { Network } from "vis-network/standalone";


type Props = {
  chainId: number;         
  height?: number;         
  onReady?: (reloadFn: () => void) => void; 
};


export default function WordChainGraphFromApi({ chainId, height = 360, onReady }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const networkRef = useRef<Network | null>(null);

  const {  nodes, edges, reload } = useChainGraph(chainId);

  // ⬅️ parent จะใช้ reload ได้
  useEffect(() => {
    if (onReady) onReady(reload);
  }, [reload, onReady]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!networkRef.current) {
      networkRef.current = new Network(
        containerRef.current,
        { nodes, edges },
        {
          physics: { solver: "barnesHut" },
        }
      );
    } else {
      networkRef.current.setData({ nodes, edges });
    }

    networkRef.current?.fit({ animation: true });
  }, [nodes, edges]);

  return (
    <div className="mt-4">
      <div ref={containerRef} className="bg-white rounded-xl" style={{ height }}></div>
    </div>
  );
}