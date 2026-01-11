import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-8xl md:text-9xl font-extrabold text-blue-600 tracking-widest">
            404
          </h1>

          <h2 className="mt-4 text-2xl md:text-4xl font-bold text-gray-800">
            Oops! Page not found
          </h2>
          <p className="mt-4 text-gray-600 max-w-md mx-auto md:mx-0">
            The page you are looking for doesn’t exist or has been moved. Let’s
            get you back on track.
          </p>

          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              ⬅ Back to Page
            </button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
            alt="Page not found"
            className="w-72 md:w-96 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
