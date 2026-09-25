import Topbar from "@/components/dashboard/Topbar";
import MessagesManager from "@/components/dashboard/MessagesManager";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

async function getMessages() {
  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(messages));
}

export default async function MessagesDashboardPage() {
  const messages = await getMessages();

  return (
    <div>
      <Topbar
        title="Messages"
        description="Messages envoyés depuis le formulaire de contact du site."
      />
      <div className="p-8">
        <MessagesManager initialMessages={messages} />
      </div>
    </div>
  );
}
