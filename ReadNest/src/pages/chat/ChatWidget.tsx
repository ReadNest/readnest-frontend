'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircleMoreIcon, MoveLeftIcon, SendIcon, XCircle, XIcon } from 'lucide-react';
import type { HubConnection } from '@microsoft/signalr';
import * as signalR from "@microsoft/signalr";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { fetchRecentChattersRequested } from '@/features/chat/chatMessageSlice';
import { useNavigate } from 'react-router-dom';

export function ChatWidget() {
  // Chat widget state
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newChatUser, setNewChatUser] = useState('');
  // SignalR connection state
  const [connection, setConnection] = useState<HubConnection | null>(null);

  // Redux State
  const auth = useSelector((state: RootState) => state.auth);
  const chat = useSelector((state: RootState) => state.chatMessage);

  const dispatch = useDispatch();
  const navigate = useNavigate();


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
    if (auth.isAuthenticated) {
      dispatch(fetchRecentChattersRequested(auth.user?.userId ?? ""));
    }
  }, []);

  const startNewChat = (username: string) => {
    const existingUser = chat.recentChatters.find(user => user.userName === username);

    if (existingUser) {
      setActiveChat(existingUser.userId ?? "");
    }
    // else {
    //   const newUser = { id: Date.now().toString(), name: username };
    //   setRecentUsers(prev => [newUser, ...prev]);
    //   setActiveChat(newUser.id);
    // }
    setIsExpanded(true);
  };

  const toggleWidget = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setActiveChat(null);
    }
  };
  if (!auth.isAuthenticated) {
    return null; // Không hiển thị widget nếu người dùng chưa đăng nhập
  }

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
                    <AvatarImage src={chat.recentChatters.find(u => u.userId == activeChat)?.avatarUrl ?? ""} />
                    <AvatarFallback>
                      {chat.recentChatters.find(u => u.userId === activeChat)?.fullName?.charAt(0) ?? ''}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium hover:underline cursor-pointer"
                  onClick={() => navigate(`/profile/${chat.recentChatters.find(u => u.userId === activeChat)?.userName}`)}>
                    {chat.recentChatters.find(u => u.userId === activeChat)?.fullName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size={'sm'}
                  className="hover:text-white hover:bg-purple-800"
                  onClick={() => setActiveChat(null)}
                >
                  <MoveLeftIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Chat Messages */}
              <ScrollArea
                className="flex-1 p-3"
                style={{ minHeight: '256px', maxHeight: '256px', height: '256px', overflowY: 'auto' }}
              >
                {/* Old Messages */}

                {/* New Messages */}
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
                  <Button className='bg-purple-400 hover:bg-purple-700 mt-1' size={'sm'}><SendIcon className='h-5 w-5' /></Button>
                </div>
              </div>
            </>
          ) : chat.isLoading == false ? (
            <>
              {/* Recent Chats Header */}
              <div className="flex justify-between items-center p-3 border-b">
                <h3 className="font-medium">Tin nhắn gần đây</h3>
                <Button
                  variant="ghost"
                  size={'sm'}
                  className='text-red-500 hover:text-white hover:bg-red-700'
                  onClick={toggleWidget}
                >
                  <XIcon className="h-5 w-5" />
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
              <ScrollArea
                style={{ minHeight: '256px', maxHeight: '256px', height: '256px', overflowY: 'auto' }}>
                {chat.recentChatters.map((user) => (
                  <div
                    key={user.userId}
                    className="flex items-center p-3 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setActiveChat(user.userId ?? "");
                      setIsExpanded(true);
                    }}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatarUrl ?? ""} />
                      <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.fullName}</div>
                      <div className="text-sm text-gray-500 truncate">
                        {user.lastMessage}
                      </div>
                    </div>
                    {user.unreadMessagesCount && (
                      <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {user.unreadMessagesCount}
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </>
          ) : (
            <div className="p-3 text-center text-gray-500">
              Đang tải tin nhắn...
            </div>
          )}
        </div>
      )
      }

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

    </div >
  );
}