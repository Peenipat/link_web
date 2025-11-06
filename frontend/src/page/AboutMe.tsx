import { Link } from "react-router-dom";

export default function AboutMe() {
    return (
        <main className="min-h-screen bg-linear-to-b from-pink-50 to-pink-100 flex flex-col items-center  text-center px-6 py-3">
            <section className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 text-gray-800">
                <h2 className="text-2xl font-semibold mb-4">ข้อมูลผู้พัฒนา</h2>

                <div className="grid sm:grid-cols-[160px,1fr] gap-6 items-center text-left">
                    <div className="justify-self-center h-50 w-40 ">
                        <img
                            src="/me.png"  
                            alt="Pryor"
                            className="h-full w-full rounded-2xl object-cover object-[center_10%]  border-pink-200 shadow-inner"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <p className="mb-3">
                            สวัสดีครับ ผมชื่อ <span className="font-semibold">นิพัทธ์ </span>
                            ผมเองก็เป็นเพียงนักศึกษาธรรมดา ๆ คนหนึ่งที่พอทำเว็บได้เท่านั้นเอง
                        </p>

                        <p className="text-gray-600">
                            โปรเจกต์ผมนี้ได้แรงบันดาลใจมาจากเว็บไซต์ <a href="https://linxicon.com/" className="text-blue-600 underline">Linxicon</a>  ซึ่งเป็นเว็บแนวเดียวกันแต่ใช้คำภาษาอังกฤษ 
                            ผมจึงคิดว่า ถ้ามีเวอร์ชันภาษาไทยก็คงจะดีไม่น้อยเลยและเมื่อมองให้ลึกลงไป ผมเห็นว่าเว็บไซต์แบบนี้น่าจะสามารถสร้างชุดข้อมูล (Dataset) ที่มีคุณค่าให้กับงาน NLP ได้ด้วย
                            เพราะทุกครั้งที่มีผู้คนพยายามเชื่อมโยงคำสองคำที่ดูไม่เกี่ยวข้องกันเลย นั่นคือการสร้างชุดข้อมูลสำคัญที่ช่วยให้ AI เข้าใจภาษาไทยได้ดีขึ้น
                            ผมอยากเป็นส่วนหนึ่งในการช่วยผลักดันสิ่งนั้น แม้จะไม่ใช่ในฐานะนักวิจัยหรือผู้พัฒนา AI โดยตรง
                            แต่อย่างน้อยผมก็รวบรวมข้อมูลเหล่านี้เตรียมไว้ให้ และทุกคนที่เข้ามาเล่นหรือใช้งานเว็บไซต์นี้
                            ก็ถือได้ว่าเป็นส่วนหนึ่งในการพัฒนา AI ให้เข้าใจภาษาไทยมากขึ้นเช่นกันครับ
                        </p>
                        <p className="mt-4 text-red-600 font-bold">*** เรื่องสำคัญมาก ๆ อ่านหน่อยเฮอะ!</p>
                        <p >ไหน ๆ ก็ไหน ๆ แล้ว ตอนนี้ผมหางาน freelace อยู่นะครับ งานประจำได้ก็ดีนะ บริษัทไหนสนใจส่ง Resume มาได้นะครับ เริ่มงานได้ทันทีจะพิจารณาเป็นพิเศษ 555 สนับสนุนค่ากาแฟ ค่า server ผมด้วยก็ดีนะครับ อันไหนเป็นเงิน เอาหมดอะตอนนี้</p>
                    </div>
                </div>

                <div className="mt-6 border-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                   
                    <div className="text-gray-600 text-sm">
                        ติดต่อ:  <span className="text-pink-700">nipatchapakdee@gmail.com</span>
                    </div>

                    <div className="flex gap-3">
                        <a
                            href="https://github.com/Peenipat"
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-full border border-pink-200 hover:border-pink-300 text-pink-700 bg-pink-50 hover:bg-pink-100 transition"
                        >
                            GitHub
                        </a>
                        <a
                            href="https://drive.google.com/file/d/1aqYtG6jkGyHlnysSHa5KGjrzrD2XUgfY/view?usp=sharing"
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2 rounded-full border border-pink-200 hover:border-pink-300 text-pink-700 bg-pink-50 hover:bg-pink-100 transition"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </section>

            {/* Back / CTA */}
            <div className="mt-8 flex gap-3">
                <Link
                    to="/"
                    className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all duration-300"
                >
                    กลับไปหน้าแรก
                </Link>
                <Link
                    to="/donate"
                    className="bg-white hover:bg-pink-50 text-pink-700 font-semibold py-3 px-6 rounded-full shadow border border-pink-200 transition"
                >
                    สนับสนุนค่ากาแฟ
                </Link>
            </div>
        </main>
    );
}
