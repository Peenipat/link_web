import { useState } from "react";

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState<"inspiration" | "techStack" | "support">("inspiration");

    return (
        <main className="min-h-screen bg-linear-to-b from-pink-50 to-pink-100 flex flex-col items-center text-center px-6 py-3">
            <section className="max-w-7xl w-full bg-white rounded-2xl shadow-lg p-6 text-gray-800">
                <h2 className="text-2xl font-semibold mb-4">เกี่ยวกับโปรเจกต์นี้</h2>

                <div className="flex justify-center mb-6 gap-4 flex-wrap">
                    <button
                        onClick={() => setActiveTab("inspiration")}
                        className={`py-2 px-4 rounded-full font-semibold transition-all duration-300 shadow-md
              ${activeTab === "inspiration"
                                ? "bg-pink-600 text-white"
                                : "bg-pink-100 hover:bg-pink-200 text-pink-700"
                            }`}
                    >
                        แรงบันดาลใจ
                    </button>

                    <button
                        onClick={() => setActiveTab("techStack")}
                        className={`py-2 px-4 rounded-full font-semibold transition-all duration-300 shadow-md
              ${activeTab === "techStack"
                                ? "bg-pink-600 text-white"
                                : "bg-pink-100 hover:bg-pink-200 text-pink-700"
                            }`}
                    >
                        Tech Stack
                    </button>

                    <button
                        onClick={() => setActiveTab("support")}
                        className={`py-2 px-4 rounded-full font-semibold transition-all duration-300 shadow-md
              ${activeTab === "support"
                                ? "bg-pink-600 text-white"
                                : "bg-pink-100 hover:bg-pink-200 text-pink-700"
                            }`}
                    >
                        สนับสนุนค่ากาแฟ
                    </button>
                </div>

                <div className="text-left">
                    {activeTab === "techStack" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-pink-700">Tech Stack</h3>
                            <p>
                                เครื่องมือที่ผมใช้ในการพัฒนาโปรเจกต์นี้เป็นสแต็กทั่วไป เน้นทำให้ใช้งานได้จริง
                                ในเวลาสั้น ๆ โค้ดอาจไม่ใช่ best practice ทั้งหมด ใครสนใจสามารถดูรายละเอียดเพิ่มเติมได้ที่ GitHub profile ผมได้หรือ click ที่ปุ่ม source code ได้เลยครับ
                            </p>

                            <div className="flex gap-3 mt-4">
                                <a
                                    href="https://github.com/Peenipat/link_web.git"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-2 rounded-full border border-pink-200 hover:border-pink-300 text-pink-700 bg-pink-50 hover:bg-pink-100 transition"
                                >
                                    source code
                                </a>
                            </div>

                            {/* Cards */}
                            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {/* Frontend */}
                                <article className="flex items-start gap-4 rounded-xl border border-pink-100 bg-white/70 p-4 shadow-sm hover:shadow-md transition">
                                    <div className="shrink-0 h-12 w-12 grid place-items-center rounded-lg bg-pink-50">
                                        {/* React logo */}
                                        <svg viewBox="0 0 64 64" className="h-8 w-8" aria-label="React logo">
                                            <circle cx="32" cy="32" r="4" fill="#61dafb" />
                                            <g fill="none" stroke="#61dafb" strokeWidth="2">
                                                <ellipse cx="32" cy="32" rx="20" ry="8" />
                                                <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(60 32 32)" />
                                                <ellipse cx="32" cy="32" rx="20" ry="8" transform="rotate(120 32 32)" />
                                            </g>
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-pink-700">Frontend</h4>
                                        <p className="text-sm text-gray-600">React (TypeScript) + Tailwind CSS</p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {/* TypeScript badge */}
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                                                TypeScript
                                            </span>
                                            {/* Tailwind logo as badge */}
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 inline-flex items-center gap-1">
                                                <svg viewBox="0 0 48 28" className="h-3 w-4" aria-hidden="true">
                                                    <path
                                                        d="M24 0c-6.4 0-10.4 3.2-12 9.6 2.4-3.2 5.2-4.4 8.4-3.6 1.8.4 3.1 1.8 4.5 3.3 2.3 2.4 4.9 5.1 10.1 5.1 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.4-3.1-1.8-4.5-3.3C31.8 2.7 29.2 0 24 0zM12 14.6c-6.4 0-10.4 3.2-12 9.6 2.4-3.2 5.2-4.4 8.4-3.6 1.8.4 3.1 1.8 4.5 3.3 2.3 2.4 4.9 5.1 10.1 5.1 6.4 0 10.4-3.2 12-9.6-2.4 3.2-5.2 4.4-8.4 3.6-1.8-.4-3.1-1.8-4.5-3.3-2.3-2.4-4.9-5.1-10.1-5.1z"
                                                        fill="#14b8a6"
                                                    />
                                                </svg>
                                                Tailwind
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                                                React
                                            </span>
                                        </div>
                                    </div>
                                </article>

                                {/* Backend */}
                                <article className="flex items-start gap-4 rounded-xl border border-pink-100 bg-white/70 p-4 shadow-sm hover:shadow-md transition">
                                    <div className="shrink-0 h-12 w-12 grid place-items-center rounded-lg bg-pink-50">
                                        {/* Python logo */}
                                        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-label="Python logo">
                                            <path d="M23 4c-7 0-7 5-7 5v4h7v2H12S4 15 4 23 12 33 12 33h4v-5s0-7 7-7h5s7 0 7-7-7-10-12-10h0z" fill="#3776ab" />
                                            <path d="M25 44c7 0 7-5 7-5v-4h-7v-2h11s8 0 8-8-8-9-8-9h-4v5s0 7-7 7h-5s-7 0-7 7 7 9 12 9z" fill="#ffd343" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-pink-700">Backend</h4>
                                        <p className="text-sm text-gray-600">Python FastAPI </p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                                Python
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200">
                                                REST API
                                            </span>
                                        </div>
                                    </div>
                                </article>

                                {/* Infra */}
                                <article className="flex items-start gap-4 rounded-xl border border-pink-100 bg-white/70 p-4 shadow-sm hover:shadow-md transition">
                                    <div className="shrink-0 h-12 w-12 grid place-items-center rounded-lg bg-pink-50">
                                        {/* AWS logo (simple) */}
                                        <svg viewBox="0 0 64 32" className="h-8 w-8" aria-label="AWS logo">
                                            <text x="0" y="22" fontSize="18" fontFamily="monospace" fill="#111827">aws</text>
                                            <path d="M6 26c8 4 20 4 32 0" stroke="#ff9900" strokeWidth="3" fill="none" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-pink-700">Infrastructure</h4>
                                        <p className="text-sm text-gray-600">AWS Service</p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                                EC2
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                                                S3
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                                                Deploy
                                            </span>
                                        </div>
                                    </div>
                                </article>

                                {/* AI Model / Service (placeholder) */}
                                <article className="flex items-start gap-4 rounded-xl border border-dashed border-pink-200 bg-white/50 p-4 shadow-sm">
                                    <div className="shrink-0 h-12 w-12 grid place-items-center rounded-lg bg-pink-50">
                                        {/* Placeholder spark icon */}
                                        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-label="AI logo">
                                            <path d="M24 6l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" fill="#ec4899" />
                                        </svg>
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-semibold text-pink-700">Service / AI Model</h4>
                                        <p className="text-sm text-gray-600">— ใส่รายละเอียดโมเดล/บริการภายหลัง —</p>
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                                                AI
                                            </span>
                                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-50 text-gray-700 border border-gray-200">
                                                TBD
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        </div>
                    )}


                    {activeTab === "inspiration" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-pink-700">แรงบันดาลใจ</h3>
                            <p>
                                <span className="font-semibold mb-2 text-pink-700">เชื่อมคำนี้ให้ถึงเธอ</span> — จะเรียกว่า “เกม” ก็ได้ หรือ “การทดลองเล็ก ๆ” ก็ได้
                                แต่สิ่งที่ผมอยากให้มันเป็นจริง ๆ คือพื้นที่สำหรับ “การเชื่อมต่อคำสองคำที่ดูเหมือนไม่เกี่ยวข้องกันเลย”
                                ให้สามารถเชื่อมถึงกันได้ ผ่านสะพานคำที่ผู้เล่นสร้างขึ้นเอง สะพานจะสั้นหรือยาวแค่ไหน ก็ขึ้นอยู่กับความคิดสร้างสรรค์ของผู้เล่นแต่ละคน
                                ซึ่งผมไม่ใช่คนที่คิดไอเดียนี้เป็นคนแรกนะ แรงบันดาลใจมาจากเว็บไซต์ <a href="https://linxicon.com/" className="text-blue-600 underline">Linxicon</a>  ที่ผมได้รู้จักจากคลิปของเพจ

                                <a href="https://www.facebook.com/TheOzzy213?locale=th_TH" className="text-blue-600 underline">TheOzzy</a> ใน
                                <a href="https://www.facebook.com/share/v/14W2dDDSN8U/" className="text-blue-600 underline">คลิปนี้</a>
                            </p>
                            <div className="flex flex-col items-center justify-center my-5">
                                <img src="./videoClip.png" alt="" className="h-100" />
                            </div>
                            <p>
                                หลังจากดูคลิปนั้นจบ ความคิดในหัวผมก็เริ่มทำงานทันที —
                                “ถ้ามันมีเวอร์ชันภาษาไทยล่ะ จะออกมาเป็นยังไง?”
                                ผมเริ่มจินตนาการต่อว่าข้อมูลที่ผู้เล่นเชื่อมคำกันแบบนี้
                                น่าจะมีคุณค่ามากพอที่จะนำมาวิเคราะห์ต่อยอดอะไรได้อีกบ้างรึเปล่านะ?
                                ทั้งการออกแบบฐานข้อมูล โครงสร้างข้อมูล หรือแม้แต่ใช้ในการพัฒนา AI ให้เข้าใจภาษาไทย
                                ตอนแรกก็คิดว่าจะปล่อยผ่านไปเฉย ๆ แต่คิดไปคิดมา ผมนอนไม่หลับ
                                สุดท้ายเลยลุกขึ้นมาทำมันจริง ๆ — และนั่นคือจุดเริ่มต้นของโปรเจกต์นี้ครับ
                            </p>
                        </div>
                    )}

                    {activeTab === "support" && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-pink-700">สนับสนุนค่ากาแฟ ☕</h3>
                            <p>หากชอบผลงานนี้ สามารถสนับสนุนค่ากาแฟได้ที่:</p>
                            <p className="mt-2 font-mono bg-pink-50 p-2 rounded-lg">PromptPay: 081-xxx-xxxx</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
