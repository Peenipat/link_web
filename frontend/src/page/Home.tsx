function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-pink-50 to-pink-100 flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold text-pink-700 mb-2">
        เชื่อมคำนี้ให้ถึงเธอ 
      </h1>
      <p className="text-gray-600 italic mb-8">
        เกมที่ไม่ได้แค่เชื่อมคำ... แต่เชื่อมใจเราเข้าด้วยกัน 
      </p>

      <section className="max-w-xl bg-white rounded-2xl shadow-lg p-6 text-gray-800">
        <h2 className="text-2xl font-semibold mb-3">วิธีเล่น</h2>
        <p className="mb-4 leading-relaxed">
          เป้าหมายของคุณคือการเชื่อมคำ 2 คำที่ดูเหมือนไม่เกี่ยวกันเลย
          ด้วยชุดคำใหม่ที่ค่อย ๆ สร้างสะพานของความหมายระหว่างกัน 
        </p>
        <p className="text-sm text-gray-500 mb-4">
          เช่น คำว่า <span className="font-semibold">“แมว”</span> และ{" "}
          <span className="font-semibold">“รัก”</span>  
          อาจเชื่อมกันได้แบบนี้: แมว → อ้อน → นุ่ม → กอด → รัก 
        </p>
      </section>

      <button className="mt-8 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300">
        เริ่มเล่นเลย!
      </button>

    </main>
  );
}

export default Home;
