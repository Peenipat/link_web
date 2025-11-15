import { useEffect, useState } from "react";
import { ramdomChallenge, ramdomHerChallenge, type RandomResult } from "../api/challenges";
import { addNodeToChain, getChain, startChain } from "../api/chain";
import { Link } from "react-router-dom";
import WordChainGraphFromApi from "../component/WordGraph";
import { searchWord } from "../api/search";
import Modal from "../component/Modal";
type GamePageProps = { mode?: string };
const GamePage = ({ mode }: GamePageProps) => {
    const [challenge, setChallenge] = useState<RandomResult | null>(null);
    const [chainId, setChainId] = useState<number | null>(null);
    const useId = 1

    const [term, setTerm] = useState<string>("");

    const [reloadGraph, setReloadGraph] = useState<(() => void) | null>(null);
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(false);
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
    const handleAddNode = async () => {
        if (!term.trim()) return alert("กรุณาพิมพ์คำก่อน");
        if (!chainId) return alert("ยังไม่ได้สร้าง chain");

        setLoading(true);
        try {
            const minWaitNext = delay(1200);
            const data = await searchWord(term);
            const wordId = data.matches?.[0]?.id;
            if (!wordId) {
                alert("ไม่พบคำที่ต้องการ");
                return;
            }

            const addNodePromise = addNodeToChain(chainId, wordId);
            await Promise.all([addNodePromise, minWaitNext]);
            const chain = await getChain(chainId);

            setOpen(chain.completed);
            if (reloadGraph) reloadGraph();
        } catch (err) {
            console.error("Add node failed:", err);
        } finally {
            setLoading(false);
            setTerm("");
        }
    };


    useEffect(() => {
        const init = async () => {
            try {
                if (mode === "random") {
                    const c = await ramdomChallenge();
                    setChallenge(c);
                    const res = await startChain(c.id, useId);
                    setChainId(res.id);
                } else if (mode === "her") {
                    const c = await ramdomHerChallenge();
                    setChallenge(c);
                    const res = await startChain(c.id, useId);
                    setChainId(res.id);
                }
            } catch (err) {
                console.error(err);
            }
        };

        init();
    }, []);


    return (
        <main className="min-h-screen bg-linear-to-b from-pink-50 to-pink-100 flex flex-col  pt-10  px-6">
            <h1 className="text-4xl font-bold text-pink-700 mb-2 text-center">
                เชื่อมคำนี้ให้ถึงเธอ
            </h1>
            <div className="my-4">
                <Link
                    to="/"
                    className="py-2 px-4 rounded-full font-semibold transition-all duration-300 shadow-md bg-pink-100 text-pink-700">
                    กลับไปที่หน้าแรก
                </Link>
            </div>
            <div className="flex gap-4">
                <section className="w-1/3 bg-white rounded-2xl shadow-lg p-6 text-gray-800">
                    <h2 className="text-md">เพิ่มคำลงบนกระดาน</h2>
                    <div className="flex gap-2 mt-2">
                        <input
                            type="text"
                            name="word"
                            id=""
                            className="border rounded-md p-1"
                            value={term}
                            onChange={(e) => setTerm(e.target.value)} />
                        <button
                            onClick={handleAddNode}
                            disabled={loading}
                            className={`w-full rounded-lg px-3 py-2 text-sm font-medium text-white 
              ${loading ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700"}`}
                        >
                            {loading ? "กำลังคำนวณ..." : "เพิ่มคำ"}
                        </button>
                    </div>
                    <div className="mt-2">
                        บนกระดานมีคำเริ่มต้น 2 คำ คือ <span className="font-bold">{challenge?.start.text}</span> และ <span className="font-bold">{challenge?.end.text}</span> จงหาคำเพื่อเป็นสะพานเชื่อมคำทั้งสองให้ได้
                    </div>
                </section>
                <div className="w-2/3 p-0">
                    {chainId && (
                        <WordChainGraphFromApi
                            chainId={chainId}
                            height={430}
                            onReady={(fn) => setReloadGraph(() => fn)}
                        />
                    )}

                </div>
            </div>


            <Modal
                isOpen={open}
                onClose={() => setOpen(false)}
                title="ตัวอย่าง Modal กลาง"
                size="md"
                footer={
                    <>
                        <button
                            onClick={() => setOpen(false)}
                            className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm md:text-base hover:bg-gray-100"
                        >
                            ยกเลิก
                        </button>
                        <button
                            onClick={() => {

                                setOpen(false);
                            }}
                            className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm md:text-base hover:bg-blue-700"
                        >
                            ตกลง
                        </button>
                    </>
                }
            >
                <p className="text-gray-700 text-sm md:text-base">
                    ยินดีด้วยคุณชนะเกมนี้ไปแล้ว!
                </p>


            </Modal>

            <Modal
                isOpen={loading}
                // ไม่อยากให้ปิดเองก็ให้ onClose เป็น no-op ไป
                onClose={() => { }}
                title="กำลังคำนวณความคล้ายของคำ"
                size="sm"
                closeOnBackdrop={false}
                showCloseIcon={false}
            >
                <div className="flex flex-col items-center gap-3 py-2">
                    {/* วงกลมหมุน ๆ แบบง่าย ๆ */}
                    <div className="h-10 w-10 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin" />
                    <p className="text-gray-700 text-sm text-center">
                        ระบบกำลังค้นหาคำที่ใกล้เคียงที่สุด
                        <br />
                        โปรดรอสักครู่...
                    </p>
                </div>
            </Modal>
        </main>

    );
};

export default GamePage;