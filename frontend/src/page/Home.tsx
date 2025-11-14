import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getChain } from "../api/chain";
import WordChainGraphFromApi from "../component/WordGraph";
function Home() {
  useEffect(() => {
    getChain(1).then((res) => console.log(res)).catch(console.error);
  }, []);
  return (
    <main className="min-h-screen bg-linear-to-b from-pink-50 to-pink-100 flex flex-col  pt-10 text-center px-6">
      <h1 className="text-4xl font-bold text-pink-700 mb-2">
        เชื่อมคำนี้ให้ถึงเธอ
      </h1>
      <p className="text-gray-600 italic mb-8">
        เกมที่ไม่ได้แค่เชื่อมคำ... แต่เชื่อมใจเราเข้าด้วยกัน
      </p>
      <div className="flex mb-4 gap-4 justify-center">
        <Link
          to="/aboutme"
          className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-4 rounded-full shadow-lg transition-all duration-300">
          ข้อมูลผู้พัฒนา
        </Link>

        <Link
          to="/aboutproject"
          className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-4 rounded-full shadow-lg transition-all duration-300">
          เกี่ยวกับโปรเจกต์นี้
        </Link>

        <Link
          to="/donate"
          className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-4 rounded-full shadow-lg transition-all duration-300">
          สนับสนุนค่ากาแฟ
        </Link>
      </div>

      <div className="flex text-left">
        <section className="max-w-xl bg-white rounded-2xl shadow-lg p-6 text-gray-800 text-sm">
          <h2 className="text-2xl font-semibold mb-3">วิธีเล่น</h2>
          <p className="mb-4">
            เป้าหมายของคุณคือการเชื่อมคำ 2 คำที่ดูเหมือนไม่เกี่ยวกันเลย
            ด้วยชุดคำใหม่ที่ค่อย ๆ สร้างสะพานของความหมายระหว่างกัน
          </p>
          <p className="text-sm text-gray-500 mb-4">
            เช่น คำว่า <span className="font-semibold">“แมว”</span> และ{" "}
            <span className="font-semibold">“รัก”</span>
            อาจเชื่อมกันได้แบบนี้: แมว → อ้อน → นุ่ม → กอด → รัก
          </p>

          <p>เกมนี้ไม่มีแพ้ไม่มีชนะ แต่ถ้าอยากได้ความท้าทายลองเชื่อมคำให้ได้น้อยที่สุดดูสิน่าจะเอาไปขิงเพื่อนได้นะ</p>
          <p className="font-bold mt-6 text-base">เกมมีหลายโหมดให้เลือกเล่น</p>
          <div className="mt-4 flex gap-4 ">

            <Link
              to={"/game-random"}
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-4 rounded-full shadow-lg transition-all duration-300">
              โหมดสุ่ม 2 คำ
            </Link>
            <Link
            to={"/game-her"} className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-1 px-4 rounded-full shadow-lg transition-all duration-300">
              โหมดเชื่อมคำให้ถึงเธอ
            </Link>
          </div>
        </section>
        <div className="p-4 w-full">
          <WordChainGraphFromApi chainId={23} height={420} />
        </div>
      </div>
    </main>
  );
}

export default Home;
