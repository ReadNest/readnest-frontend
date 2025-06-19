'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircleMoreIcon, XCircle } from 'lucide-react';
import type { HubConnection } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  unreadCount?: number;
}

export function ChatWidget() {
  // Chat widget state
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newChatUser, setNewChatUser] = useState('');
  const [recentUsers, setRecentUsers] = useState<ChatUser[]>([]);
  // SignalR connection state
  const [connection, setConnection] = useState<HubConnection | null>(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BASE_URL_SIGNALR)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    // newConnection
    // .start()
    // .then(() => {
    //   console.log("SignalR connected:", newConnection.state); // Connected
    // })
    // .catch(err => console.error("SignalR connection error:", err));
  }, []);

  // Mock data - thay bằng API call thực tế
  useEffect(() => {
    setRecentUsers([
      { id: '1', name: 'Nguyễn Văn A', lastMessage: 'Xin chào!', unreadCount: 2 },
      { id: '2', name: 'Trần Thị B', lastMessage: 'Bạn khỏe không?' },
      { id: '3', name: 'Phạm Văn C', lastMessage: 'Cảm ơn bạn!' },
    ]);
  }, []);

  const startNewChat = (username: string) => {
    const existingUser = recentUsers.find(user => user.name === username);

    if (existingUser) {
      setActiveChat(existingUser.id);
    } else {
      const newUser = { id: Date.now().toString(), name: username };
      setRecentUsers(prev => [newUser, ...prev]);
      setActiveChat(newUser.id);
    }
    setIsExpanded(true);
  };

  const toggleWidget = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setActiveChat(null);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-2">
      {/* Chat Widget */}
      {isExpanded && (
        <div className="w-80 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {recentUsers.find(u => u.id === activeChat)?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {recentUsers.find(u => u.id === activeChat)?.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveChat(null)}
                >
                  ←
                </Button>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-3 h-64">
                <div className="space-y-2">
                  <div className="flex justify-end">
                    <div className="bg-blue-500 text-white rounded-lg p-2 max-w-[80%]">
                      Xin chào!
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
                      Chào bạn! Mình có thể giúp gì cho bạn?
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập tin nhắn..."
                    className="flex-1"
                  />
                  <Button size="sm">Gửi</Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Recent Chats Header */}
              <div className="flex justify-between items-center p-3 border-b">
                <h3 className="font-medium">Tin nhắn gần đây</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleWidget}
                >
                  ×
                </Button>
              </div>

              {/* New Chat Input */}
              <div className="p-3">
                <div className="flex gap-2">
                  <Input
                    placeholder="Nhập username"
                    value={newChatUser}
                    onChange={(e) => setNewChatUser(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newChatUser.trim()) {
                        startNewChat(newChatUser.trim());
                        setNewChatUser('');
                      }
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Recent Chats List */}
              <ScrollArea className="h-64">
                {recentUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      setActiveChat(user.id);
                      setIsExpanded(true);
                    }}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {user.lastMessage}
                      </div>
                    </div>
                    {user.unreadCount && (
                      <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {user.unreadCount}
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </>
          )}
        </div>
      )}

      {/* Chat Button */}
      <Button
        onClick={toggleWidget}
        className="rounded-full w-12 h-12 p-0 shadow-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        {isExpanded ? (
          <span className="flex items-center justify-center w-20 h-20">
            <XCircle width={48}
              height={48}
              className='bg-white text-red-500 rounded-full'
              style={{ minWidth: '3rem', minHeight: '3rem' }} />
          </span>
        ) : (
          <MessageCircleMoreIcon width={48}
            height={48}
            style={{ minWidth: '3rem', minHeight: '3rem' }} />
        )}
      </Button>

    </div>
  );
}