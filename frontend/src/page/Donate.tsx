import { Link } from "react-router-dom";

export default function Donate() {
    return (
        <main className="min-h-screen bg-linear-to-b from-pink-50 to-pink-100 flex flex-col items-center  text-center px-6 py-3">
            <section className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6 text-gray-800">
                <h2 className="text-2xl font-semibold mb-2">สนับสนุนค่ากาแฟ</h2>
                <div className="flex  flex-col justify-center gap-4 items-center">
                    <p>โอนได้เลย ไม่มีคนละครึ่ง ขอบคุณครับสำหรับค่ากาแฟครับ</p>
                </div>
                <div className="flex justify-center mt-5">
                    <img src="./donate.jpeg" alt="" className="h-150" />
                </div>

                <div className="p-4">
                    <Link
                        to="/"
                        className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-3 rounded-full shadow-lg transition-all duration-300"
                    >
                        กลับไปหน้าแรก
                    </Link>

                </div>

            </section>
        </main>
    );
}
