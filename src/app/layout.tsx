import "../app/globals.css";
import Navbar from "../components/Navbar";

export const metadata = { title: "Hybrid Master", description: "Séances & Analytics" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
