import React, { useState } from "react";
 import axios from "axios";
// Images
import bg from "./assets/img/bg.jpg";
import img1 from "./assets/img/img-1.jpg";
import img2 from "./assets/img/img-2.jpg";
import img3 from "./assets/img/img-3.jpg";
import img4 from "./assets/img/img-4.jpg";
import img5 from "./assets/img/img-5.jpg";
import img6 from "./assets/img/img-6.jpg";
import img7 from "./assets/img/img-7.jpg";
import img8 from "./assets/img/img-8.jpg";

// Movie array
const movies = [img1, img2, img3, img4, img5, img6, img7, img8];

// Reusable Movie Row Component
const MovieRow = ({ title }) => (
  <div className="px-5 mt-10">
    <h3 className="text-2xl mb-4 font-semibold">{title}</h3>

    <div className="flex gap-5 overflow-x-scroll scrollbar-hide pb-4">
      {movies.map((movie, index) => (
        <img
          key={index}
          src={movie}
          alt="movie"
          className="w-48 rounded-lg hover:scale-110 transition duration-300 cursor-pointer"
        />
      ))}
    </div>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Login function


const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password,
    });

    console.log("SUCCESS:", res.data); 

    if (res.data.success) {
      setIsLoggedIn(true);
      setError("");
    }
  } catch (err) {
    console.log("ERROR:", err.response || err.message); // ✅ DEBUG

    setError(
      err.response?.data?.message || "Server not reachable"
    );
  }
};
  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
  };

  // ================= LOGIN PAGE =================
  if (!isLoggedIn) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="w-full max-w-md bg-black/80 p-8 rounded-lg border border-gray-800 shadow-2xl">
          
          <h1 className="text-4xl text-red-600 font-bold text-center mb-6">
            MyFlix
          </h1>

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 bg-gray-800 text-white rounded outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 bg-gray-800 text-white rounded outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <button className="w-full bg-red-600 p-3 rounded hover:bg-red-700 transition">
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ================= HOME PAGE =================
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black/90 p-5 flex justify-between items-center z-50">
        <h1 className="text-3xl text-red-600 font-bold">MyFlix</h1>

        <div>
          <span className="mr-4">{email}</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Banner */}
      <header
        className="h-[400px] flex flex-col justify-center pl-10 mt-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Unlimited Movies, TV Shows & More
        </h2>
        <p className="text-gray-300 mb-4">
          Watch anywhere. Cancel anytime.
        </p>
        <button className="bg-red-600 px-6 py-3 w-32 rounded hover:bg-red-700 transition">
          Play
        </button>
      </header>

      {/* Movie Sections */}
      <MovieRow title="Trending Now" />
      <MovieRow title="Popular Movies" />
      <MovieRow title="Top Rated" />

    </div>
  );
}

export default App;