import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiArrowLeft,
  FiCheck,
  FiMail,
  FiMessageSquare,
  FiSend,
  FiTrash2,
  FiUser,
} from "react-icons/fi";

import API_URL from "../../config/api";

type Reply = {
  _id: string;
  message: string;
  sender: "admin";
  createdAt: string;
};

type Contact = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read";
  replies?: Reply[];
  createdAt: string;
  updatedAt: string;
};

const AdminMessages = () => {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [selectedMessage, setSelectedMessage] =
    useState<Contact | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadingConversation, setLoadingConversation] =
    useState(false);

  const [replyMessage, setReplyMessage] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const redirectToLogin = () => {
    window.location.replace("/admin");
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `${API_URL}/contact`,
        {
          credentials: "include",
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load messages",
        );
      }

      const normalizedMessages = data.map(
        (message: Contact) => ({
          ...message,
          replies: message.replies ?? [],
        }),
      );

      setMessages(normalizedMessages);
    } catch (error) {
      console.error(
        "Failed to load messages:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load messages",
      );
    } finally {
      setLoading(false);
    }
  };

  const openConversation = async (id: string) => {
    // Same conversation click করলে close হবে
    if (selectedMessage?._id === id) {
      setSelectedMessage(null);
      setReplyMessage("");
      return;
    }

    try {
      setLoadingConversation(true);

      const response = await fetch(
        `${API_URL}/contact/${id}`,
        {
          credentials: "include",
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load conversation",
        );
      }

      const normalizedContact: Contact = {
        ...data,
        replies: data.replies ?? [],
      };

      setSelectedMessage(normalizedContact);

      setMessages((currentMessages) =>
        currentMessages.map((item) =>
          item._id === id
            ? {
                ...item,
                status: "read",
                replies: item.replies ?? [],
              }
            : item,
        ),
      );

      if (data.status === "unread") {
        const readResponse = await fetch(
          `${API_URL}/contact/${id}/read`,
          {
            method: "PATCH",
            credentials: "include",
          },
        );

        if (readResponse.status === 401) {
          redirectToLogin();
          return;
        }
      }
    } catch (error) {
      console.error(
        "Failed to load conversation:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load conversation",
      );
    } finally {
      setLoadingConversation(false);
    }
  };

  const handleReply = async () => {
    if (!selectedMessage) {
      return;
    }

    const trimmedReply = replyMessage.trim();

    if (!trimmedReply) {
      toast.error("Please write a reply");
      return;
    }

    if (trimmedReply.length > 5000) {
      toast.error("Reply is too long");
      return;
    }

    try {
      setSendingReply(true);

      const response = await fetch(
        `${API_URL}/contact/${selectedMessage._id}/reply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            message: trimmedReply,
          }),
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to send reply",
        );
      }

      const updatedContact: Contact = {
        ...data.contact,
        replies: data.contact.replies ?? [],
      };

      setSelectedMessage(updatedContact);

      setMessages((currentMessages) =>
        currentMessages.map((item) =>
          item._id === updatedContact._id
            ? updatedContact
            : item,
        ),
      );

      setReplyMessage("");

      toast.success("Reply sent successfully");
    } catch (error) {
      console.error("Reply error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send reply",
      );
    } finally {
      setSendingReply(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedMessage) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this conversation?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      const response = await fetch(
        `${API_URL}/contact/${selectedMessage._id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete message",
        );
      }

      setMessages((currentMessages) =>
        currentMessages.filter(
          (item) =>
            item._id !== selectedMessage._id,
        ),
      );

      setSelectedMessage(null);
      setReplyMessage("");

      toast.success("Conversation deleted");
    } catch (error) {
      console.error("Delete error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete conversation",
      );
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchMessages();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const unreadCount = messages.filter(
    (message) => message.status === "unread",
  ).length;

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Header */}
      <header className="border-b border-white/[0.07] bg-[#070707]">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <FiMessageSquare
                size={16}
                className="text-cyan-400"
              />

              <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-600">
                Portfolio inbox
              </p>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight">
                Messages
              </h1>

              {unreadCount > 0 && (
                <span className="rounded-full border border-cyan-400/15 bg-cyan-400/[0.07] px-2.5 py-1 text-[11px] font-medium text-cyan-400">
                  {unreadCount} unread
                </span>
              )}
            </div>
          </div>

          <a
            href="/admin/dashboard"
            className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-gray-400 transition hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
          >
            Dashboard
          </a>
        </div>
      </header>

      {/* Inbox */}
      <div className="mx-auto max-w-[1400px] p-3 sm:p-5 lg:p-8">
        <div className="flex min-h-[calc(100vh-150px)] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#080808] shadow-2xl shadow-black/20">
          {/* Conversation List */}
          <aside
            className={`w-full shrink-0 border-r border-white/[0.07] md:w-[380px] lg:w-[410px] ${
              selectedMessage
                ? "hidden md:block"
                : "block"
            }`}
          >
            {/* Inbox Header */}
            <div className="border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    Inbox
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {loading
                      ? "Loading conversations..."
                      : `${messages.length} conversation${
                          messages.length !== 1
                            ? "s"
                            : ""
                        }`}
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-gray-500">
                  <FiMail size={15} />
                </div>
              </div>
            </div>

            {/* Conversation Items */}
            <div className="max-h-[calc(100vh-240px)] overflow-y-auto">
              {loading ? (
                <div className="flex min-h-[350px] flex-col items-center justify-center px-8 text-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.04]">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />
                  </div>

                  <p className="mt-4 text-sm text-gray-400">
                    Loading messages
                  </p>

                  <p className="mt-1.5 max-w-[220px] text-xs leading-5 text-gray-700">
                    Please wait while your inbox loads.
                  </p>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center px-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03]">
                    <FiMessageSquare
                      size={22}
                      className="text-gray-600"
                    />
                  </div>

                  <p className="mt-5 text-sm font-medium text-gray-400">
                    No messages yet
                  </p>

                  <p className="mt-2 max-w-[240px] text-xs leading-5 text-gray-700">
                    Messages from visitors will appear
                    here when someone contacts you.
                  </p>
                </div>
              ) : (
                messages.map((message) => {
                  const isSelected =
                    selectedMessage?._id ===
                    message._id;

                  const replies = message.replies ?? [];

                  const latestMessage =
                    replies.length > 0
                      ? replies[replies.length - 1]
                          .message
                      : message.message;

                  return (
                    <button
                      key={message._id}
                      type="button"
                      onClick={() =>
                        openConversation(
                          message._id,
                        )
                      }
                      className={`group relative w-full border-b border-white/[0.05] px-5 py-4 text-left transition ${
                        isSelected
                          ? "bg-white/[0.065]"
                          : "hover:bg-white/[0.025]"
                      }`}
                    >
                      {/* Active indicator */}
                      {isSelected && (
                        <span className="absolute inset-y-0 left-0 w-[2px] bg-cyan-400" />
                      )}

                      <div className="flex gap-3.5">
                        {/* Avatar */}
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition ${
                            message.status ===
                            "unread"
                              ? "border-cyan-400/20 bg-cyan-400/[0.08] text-cyan-400"
                              : "border-white/[0.07] bg-white/[0.035] text-gray-500"
                          }`}
                        >
                          <FiUser size={16} />
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* Name + Date */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-2">
                              <p
                                className={`truncate text-sm ${
                                  message.status ===
                                  "unread"
                                    ? "font-semibold text-white"
                                    : "font-medium text-gray-300"
                                }`}
                              >
                                {message.name}
                              </p>

                              {message.status ===
                                "unread" && (
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                              )}
                            </div>

                            <span className="shrink-0 pt-0.5 text-[10px] text-gray-600">
                              {formatDate(
                                message.createdAt,
                              )}
                            </span>
                          </div>

                          {/* Email */}
                          <p className="mt-1 truncate text-[11px] text-gray-600">
                            {message.email}
                          </p>

                          {/* Subject */}
                          <div className="mt-2.5 flex items-center gap-2">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-cyan-400/50" />

                            <p
                              className={`truncate text-xs ${
                                message.status ===
                                "unread"
                                  ? "font-medium text-gray-300"
                                  : "text-gray-500"
                              }`}
                            >
                              {message.subject}
                            </p>
                          </div>

                          {/* Latest Message */}
                          <p
                            className={`mt-1.5 line-clamp-2 text-xs leading-5 ${
                              message.status ===
                              "unread"
                                ? "text-gray-400"
                                : "text-gray-700"
                            }`}
                          >
                            {latestMessage}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </aside>

          {/* Conversation */}
          <section
            className={`min-w-0 flex-1 ${
              selectedMessage
                ? "block"
                : "hidden md:block"
            }`}
          >
            {!selectedMessage ? (
              <div className="flex h-full min-h-[600px] items-center justify-center p-8 text-center">
                <div className="max-w-sm">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025] text-gray-600">
                    <FiMessageSquare size={25} />
                  </div>

                  <h2 className="mt-6 text-lg font-medium text-gray-300">
                    Select a conversation
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-700">
                    Choose a visitor message from your
                    inbox to view the conversation and
                    reply.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[600px] flex-col">
                {/* Conversation Header */}
                <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-4 sm:px-5 md:px-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMessage(null);
                        setReplyMessage("");
                      }}
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-white/[0.05] hover:text-white md:hidden"
                    >
                      <FiArrowLeft size={18} />
                    </button>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-400">
                      <FiUser size={16} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-sm font-semibold text-white">
                        {selectedMessage.name}
                      </h2>

                      <p className="mt-0.5 truncate text-xs text-gray-600">
                        {selectedMessage.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={deleting}
                    className="rounded-lg border border-transparent p-2 text-gray-600 transition hover:border-red-400/10 hover:bg-red-400/[0.05] hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Delete conversation"
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>

                {/* Conversation Body */}
                <div className="flex-1 overflow-y-auto">
                  <div className="space-y-6 p-5 sm:p-6 md:p-8">
                    {/* Conversation Subject */}
                    <div className="flex flex-col items-center">
                      <span className="rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-gray-600">
                        {selectedMessage.subject}
                      </span>

                      <p className="mt-2 text-[10px] text-gray-700">
                        {formatDate(
                          selectedMessage.createdAt,
                        )}
                      </p>
                    </div>

                    {/* Visitor Message */}
                    <div className="flex justify-start">
                      <div className="max-w-[88%] sm:max-w-[75%]">
                        <div className="rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.035] px-4 py-3.5">
                          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-300">
                            {selectedMessage.message}
                          </p>
                        </div>

                        <p className="mt-1.5 px-1 text-[10px] text-gray-700">
                          {selectedMessage.name}
                        </p>
                      </div>
                    </div>

                    {/* Loading */}
                    {loadingConversation ? (
                      <div className="flex flex-col items-center justify-center py-6">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400" />

                        <p className="mt-3 text-xs text-gray-600">
                          Loading conversation...
                        </p>
                      </div>
                    ) : (
                      (selectedMessage.replies
                        ?.length ?? 0) === 0
                    ) ? (
                      <div className="flex justify-center py-2">
                        <p className="rounded-full border border-white/[0.05] bg-white/[0.02] px-4 py-2 text-[10px] text-gray-700">
                          No replies yet
                        </p>
                      </div>
                    ) : (
                      selectedMessage.replies?.map(
                        (reply) => (
                          <div
                            key={reply._id}
                            className="flex justify-end"
                          >
                            <div className="max-w-[88%] sm:max-w-[75%]">
                              <div className="rounded-2xl rounded-br-md bg-white px-4 py-3.5 text-black shadow-lg shadow-black/10">
                                <p className="whitespace-pre-wrap text-sm leading-6">
                                  {reply.message}
                                </p>
                              </div>

                              <div className="mt-1.5 flex items-center justify-end gap-1 px-1 text-[10px] text-gray-700">
                                <span>
                                  {formatDate(
                                    reply.createdAt,
                                  )}
                                </span>

                                <FiCheck size={10} />
                              </div>
                            </div>
                          </div>
                        ),
                      )
                    )}
                  </div>
                </div>

                {/* Reply Area */}
                <div className="border-t border-white/[0.07] bg-[#070707] p-4 sm:p-5">
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] transition focus-within:border-white/[0.14]">
                    <textarea
                      value={replyMessage}
                      onChange={(event) =>
                        setReplyMessage(
                          event.target.value,
                        )
                      }
                      rows={3}
                      maxLength={5000}
                      placeholder="Write a reply..."
                      className="w-full resize-none bg-transparent px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-gray-700"
                    />

                    <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-2">
                      <span className="text-[10px] text-gray-700">
                        {replyMessage.length}/5000
                      </span>

                      <button
                        type="button"
                        onClick={handleReply}
                        disabled={
                          sendingReply ||
                          !replyMessage.trim()
                        }
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <FiSend size={14} />

                        {sendingReply
                          ? "Sending..."
                          : "Reply"}
                      </button>
                    </div>
                  </div>

                  <p className="mt-2 text-center text-[10px] text-gray-700">
                    Replies are saved in your inbox and
                    sent to the visitor's email.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default AdminMessages;