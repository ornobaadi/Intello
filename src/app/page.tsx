import { ChatDemo } from "~/components/chat-demo";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Main chat area, always centered */}
      <main className="flex-1 flex flex-col w-full">
        <div className="w-full flex justify-center items-stretch flex-1">
          <ChatDemo />
        </div>
      </main>
    </div>
  );
}
