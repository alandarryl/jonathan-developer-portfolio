import Sidebar from "@/components/dashboard/Sidebar";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

export const metadata = {
  title: "Dashboard — Jonathan Okana",
  robots: { index: false, follow: false },
};

async function getUnreadCount() {
  try {
    await connectDB();
    return await Message.countDocuments({ lu: false });
  } catch {
    return 0;
  }
}

export default async function ProtectedDashboardLayout({ children }) {
  const unreadCount = await getUnreadCount();

  return (
    <div className="flex min-h-screen bg-ink-900">
      <Sidebar unreadCount={unreadCount} />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
