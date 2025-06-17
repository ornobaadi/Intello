import { ChatDemo } from "~/components/chat-demo";

export default function HomePage() {
  return (
    <div className="h-screen w-full min-w-0 overflow-hidden bg-background">
      {/* Full-width chat container */}
      <div className="h-full w-full min-w-0 overflow-hidden">
        <ChatDemo />
      </div>
    </div>
  );
}
