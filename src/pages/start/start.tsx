import { Link } from "react-router-dom"

export default function Start() {

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-amber-600 to-amber-800 gap-8 px-6">
            <div className="text-center">
                <img className="w-64 mx-auto mb-8" src="/images/scratch-logo-splash-screen.png" alt="Scratch Logo" />
                <h1 className="text-5xl font-black text-white text-center mb-4 drop-shadow-lg">Start Creating with Scratch</h1>
                <p className="text-lg text-amber-50 text-center mb-8 max-w-lg drop-shadow">Upload or take photos to bring your creative vision to life</p>
            </div>
            <Link to="/takeImages" className="px-8 py-4 bg-white text-amber-800 font-bold text-lg rounded-lg hover:bg-amber-50 shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
                🚀 Let's start creating
            </Link>
        </div>
    )
}