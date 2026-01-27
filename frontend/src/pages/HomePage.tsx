import React from "react";

export interface HomePageProps {
  authenticated?: boolean;
}

export default function HomePage({ authenticated = false }: HomePageProps) {
  const navItems: { label: string; href: string }[] = authenticated
    ? [
        { label: "Home", href: "/" },
        { label: "Analyze", href: "/analyze" },
        { label: "Profile", href: "/me" },
        { label: "About Us", href: "#" },
      ]
    : [
        { label: "Home", href: "/" },
        { label: "About Us", href: "#" },
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <nav className="w-full bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Resume Analyzer</h1>

          <ul className="flex gap-6 text-lg">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-blue-200 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section
        className="w-full h-[60vh] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-4"
        style={{ backgroundImage: "url('https://wallpaperaccess.com/full/522695.jpg')" }}
      >
        <h2 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          Learn your resume compatibility
        </h2>
        <p className="mt-4 text-xl max-w-2xl drop-shadow-md">
          Resume analyzer helps you compare how well your CV matches the desired job.
        </p>
      </section>

      <section className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Powerful Matching</h3>
          <p>
            Our algorithm scans your resume and compares it with job descriptions to highlight strengths and weaknesses.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Clear Insights</h3>
          <p>
            Get easy-to-understand analytics that help you improve your resume instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-2">Boost Your Chances</h3>
          <p>
            Improve your compatibility score and increase your chances of landing interviews.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-700 text-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-blue-200">Home</a>
            <a href="#" className="hover:text-blue-200">About Us</a>
          </div>
          <p className="text-sm">© {new Date().getFullYear()} Resume Analyzer</p>
        </div>
      </footer>
    </div>
  );
}
