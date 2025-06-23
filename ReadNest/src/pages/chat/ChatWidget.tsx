'use client';

import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircleMoreIcon, MoveLeftIcon, SendIcon, XCircle, XIcon } from 'lucide-react';
import { HubConnectionBuilder, HubConnection } from "@microsoft/signalr";
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { fetchOldMessagesRequested, fetchRecentChattersRequested, receiveMessageOnSignalR } from '@/features/chat/chatMessageSlice';
import { useNavigate } from 'react-router-dom';
import type { ChatMessageCacheModel } from '@/api/@types';

export function ChatWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newChatUser, setNewChatUser] = useState('');
  const [connection, setConnection] = useState<HubConnection | null>(null);

  const auth = useSelector((state: RootState) => state.auth);
  const chat = useSelector((state: RootState) => state.chatMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isConnected = connection?.state === 'Connected';

  useEffect(() => {
    const conn = new HubConnectionBuilder()
      .withUrl(import.meta.env.VITE_BASE_URL_SIGNALR)
      .withAutomaticReconnect()
      .build();

    setConnection(conn);
    conn.start().catch(console.error);
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      dispatch(fetchRecentChattersRequested(auth.user?.userId ?? ""));
    }
  }, [auth.isAuthenticated, auth.user?.userId, dispatch]);

  const activeChatUser = useMemo(() =>
    chat.recentChatters.find(u => u.userId === activeChat), [chat.recentChatters, activeChat]
  );

  const startNewChat = (username: string) => {
    const user = chat.recentChatters.find(u => u.userName === username);
    if (user) setActiveChat(user.userId ?? "");
    setIsExpanded(true);
  };

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('message') as HTMLInputElement;
    const message = input.value.trim();

    if (message && isConnected && auth.user?.userId && activeChat) {
      try {
        await connection?.invoke("SendMessage", {
          senderId: auth.user.userId,
          receiverId: activeChat,
          message,
        });
        input.value = '';
      } catch (err) {
        console.error("Send message error:", err);
      }
    }
  };

  useEffect(() => {
    if (!connection) return;

    const handleReceiveMessage = (message: ChatMessageCacheModel) => {
      // console.log("New message received:", message);
      dispatch(receiveMessageOnSignalR(message));
    };

    connection.on("ReceiveMessage", handleReceiveMessage);

    return () => {
      connection.off("ReceiveMessage", handleReceiveMessage); // cleanup
    };
  }, [connection, dispatch]);

  const handleOpenChatClick = (userAId: string, userBId: string) => {
    dispatch(fetchOldMessagesRequested({ userAId, userBId }));
  };

  if (!auth.isAuthenticated) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-2">
      {isExpanded && (
        <div className="w-80 bg-white rounded-lg shadow-xl border flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeChatUser?.avatarUrl ?? ""} />
                    <AvatarFallback>{activeChatUser?.fullName?.charAt(0) ?? ''}</AvatarFallback>
                  </Avatar>
                  <span
                    className="font-medium hover:underline cursor-pointer"
                    onClick={() => navigate(`/profile/${activeChatUser?.userName}`)}
                  >
                    {activeChatUser?.fullName}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:text-white hover:bg-purple-800"
                  onClick={() => setActiveChat(null)}
                >
                  <MoveLeftIcon className="h-5 w-5" />
                </Button>
              </div>

              {/* Chat Messages */}
              <ScrollArea className="flex-1 p-3"
                style={{ minHeight: '256px', maxHeight: '256px', height: '256px', overflowY: 'auto' }}>
                <div className="space-y-2">
                  {chat.oldMessagesHistory.map((message) => (
                    <div key={message.id || `${message.senderId}-${message.sentAt}`}>
                      <div className={`flex ${message.senderId === auth.user?.userId ? 'justify-end' : 'justify-start'}`}>
                        <div className={`rounded-lg p-2 max-w-[80%] ${message.senderId === auth.user?.userId ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
                          {message.message}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Chat Input */}
              <div className="p-3 border-t">
                <form className="flex gap-2" onSubmit={handleSendMessage}>
                  <Input
                    name="message"
                    placeholder="Nhập tin nhắn..."
                    className="flex-1"
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-400 hover:bg-purple-700 mt-1"
                    size="sm"
                    disabled={!isConnected}
                  >
                    <SendIcon className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : !chat.isLoading ? (
            <>
              <div className="flex justify-between items-center p-3 border-b">
                <h3 className="font-medium">Tin nhắn gần đây</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-white hover:bg-red-700"
                  onClick={() => { setActiveChat(null); setIsExpanded(false); }}
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-3">
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

              <ScrollArea style={{ height: '256px', overflowY: 'auto' }}>
                {chat.recentChatters.map((user) => (
                  <div
                    key={user.userId}
                    className="flex items-center p-3 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setActiveChat(user.userId ?? "");
                      handleOpenChatClick(auth.user?.userId ?? "", user.userId ?? "");
                    }}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={user.avatarUrl ?? ""} />
                      <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.fullName}</div>
                        <div className="text-sm text-gray-500 truncate">
                        {user.userId === auth.user?.userId
                          ? <>Bạn: {user.lastMessage}</>
                          : user.lastMessage}
                        </div>
                    </div>
                    {user.unreadMessagesCount ? (
                      <div className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                        {user.unreadMessagesCount}
                      </div>
                    ) : null}
                  </div>
                ))}
              </ScrollArea>
            </>
          ) : (
            <div className="p-3 text-center text-gray-500">Đang tải tin nhắn...</div>
          )}
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsExpanded(prev => !prev)}
        className="rounded-full w-12 h-12 p-0 shadow-lg bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
      >
        {isExpanded ? (
          <XCircle width={48} height={48} className="bg-white text-red-500 rounded-full"
            style={{ minWidth: '3rem', minHeight: '3rem' }} />
        ) : (
          <MessageCircleMoreIcon width={48} height={48}
            style={{ minWidth: '3rem', minHeight: '3rem' }} />
        )}
      </Button>
    </div>
  );
}
export default ChatWidget;