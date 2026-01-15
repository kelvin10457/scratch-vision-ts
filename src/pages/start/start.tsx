import { Link } from "react-router-dom"

export default function Start() {

    return (
        <div className="flex flex-col justify-center items-center h-dvh bg-amber-700 gap-8">
            <h1 className="text-3xl font-bold text-white text-center">Start Creating with Scratch</h1>
            <Link to="/takeImages" className="px-4 py-2 bg-white text-white rounded hover:bg-amber-800 transition-all">Start Creating</Link>
        </div>
    )
}