"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

const conversations = [
  {
    id: "1",
    name: "Alex Johnson",
    avatarUrl: "https://placehold.co/128x128.png",
    lastMessage: "Hey, did you see the new ergonomic keyboard?",
    timestamp: "10m ago",
    unreadCount: 2,
    isGroup: false,
  },
  {
    id: "2",
    name: "Samantha Bee",
    avatarUrl: "https://placehold.co/128x128.png",
    lastMessage: "Loved your latest photo!",
    timestamp: "1h ago",
    unreadCount: 0,
    isGroup: false,
  },
  {
    id: "3",
    name: "Design Crew",
    avatarUrl: "https://placehold.co/128x128.png",
    lastMessage: "Chris: Let's sync on the new mockups.",
    timestamp: "3h ago",
    unreadCount: 5,
    isGroup: true,
  },
  {
    id: "4",
    name: "Chris Lee",
    avatarUrl: "https://placehold.co/128x128.png",
    lastMessage: "Let's hit the gym tomorrow!",
    timestamp: "1d ago",
    unreadCount: 0,
    isGroup: false,
  },
];


export default function ChatPage() {
  const router = useRouter();

  return (
    <div className="pb-16 sm:pb-0">
      <Card>
        <CardHeader>
          <CardTitle>Chats</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y">
            {conversations.map((convo) => (
              <li
                key={convo.id}
                className="p-4 hover:bg-muted/50 cursor-pointer"
                onClick={() => router.push(`/chat/${convo.id}`)}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={convo.avatarUrl} alt={convo.name} data-ai-hint={convo.isGroup ? "group" : "person"}/>
                    <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <p className="font-semibold">{convo.name}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-xs">
                      {convo.lastMessage}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{convo.timestamp}</p>
                    {convo.unreadCount > 0 && (
                      <Badge className="mt-1">{convo.unreadCount}</Badge>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
