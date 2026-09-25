import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { getProfile } from "@/lib/data";

export default async function SiteLayout({ children }) {
  const profile = await getProfile();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
    </div>
  );
}
