// src/components/sections/admin/AdminMessages.jsx
import { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaSearch,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import LoadingSpinner from "../../common/LoadingSpinner";

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ Load messages from localStorage
  useEffect(() => {
    const loadMessages = () => {
      try {
        const savedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        if (savedMessages.length > 0) {
          setMessages(savedMessages);
        } else {
          // ✅ Add sample messages if no messages exist
          const sampleMessages = [
            {
              id: 1,
              name: "John Doe",
              email: "john@example.com",
              subject: "Project Inquiry",
              message: "I would like to discuss a project with you. We are looking for a React developer for our new e-commerce platform.",
              status: "unread",
              date: new Date(Date.now() - 86400000).toISOString(),
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane@example.com",
              subject: "Job Opportunity",
              message: "We are looking for a front-end developer to join our team at Tech Corp. Your portfolio is impressive!",
              status: "read",
              date: new Date(Date.now() - 172800000).toISOString(),
            },
            {
              id: 3,
              name: "Mike Johnson",
              email: "mike@example.com",
              subject: "Collaboration",
              message: "I would like to collaborate on an open source project. I saw your work on KhanShop Ease and would love to work together.",
              status: "unread",
              date: new Date(Date.now() - 259200000).toISOString(),
            },
          ];
          localStorage.setItem('contactMessages', JSON.stringify(sampleMessages));
          setMessages(sampleMessages);
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages([]);
      }
      setLoading(false);
    };

    loadMessages();
  }, []);

  // ✅ Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const updatedMessages = messages.filter(msg => msg.id !== id);
        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
        toast.success("Message deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete message");
        console.error('Delete error:', error);
      }
    }
  };

  // ✅ Handle mark as read
  const handleMarkAsRead = (id) => {
    try {
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, status: 'read' } : msg
      );
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      toast.success("Marked as read!");
    } catch (error) {
      toast.error("Failed to mark as read");
      console.error('Mark as read error:', error);
    }
  };

  // ✅ Handle mark as unread
  const handleMarkAsUnread = (id) => {
    try {
      const updatedMessages = messages.map(msg => 
        msg.id === id ? { ...msg, status: 'unread' } : msg
      );
      setMessages(updatedMessages);
      localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      toast.success("Marked as unread!");
    } catch (error) {
      toast.error("Failed to mark as unread");
      console.error('Mark as unread error:', error);
    }
  };

  // ✅ Filter messages
  const filteredMessages = messages.filter(
    (msg) =>
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Count unread messages
  const unreadCount = messages.filter((m) => m.status === "unread").length;

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Messages
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage contact form submissions
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
            {unreadCount} Unread
          </span>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
            {messages.length} Total
          </span>
        </div>
      </div>

      <div className="relative mb-6">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <FaSearch size={16} />
        </div>
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <FaEnvelope className="text-4xl text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              {searchTerm ? "No messages found matching your search" : "No messages yet"}
            </p>
            {!searchTerm && (
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Messages from the contact form will appear here
              </p>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${
                  message.status === "unread"
                    ? "bg-blue-50/50 dark:bg-blue-900/10"
                    : ""
                }`}
                onClick={() => {
                  setSelectedMessage(message);
                  setIsModalOpen(true);
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      {message.status === "unread" ? (
                        <FaEnvelope
                          className="text-blue-600 dark:text-blue-400"
                          size={16}
                        />
                      ) : (
                        <FaEnvelopeOpen className="text-gray-400" size={16} />
                      )}
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {message.subject || "No Subject"}
                      </h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          message.status === "unread"
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {message.status || "unread"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      From: {message.name || "Unknown"} ({message.email || "No email"})
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">
                      {message.message || "No message"}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {message.date ? new Date(message.date).toLocaleString() : "Unknown date"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {message.status === "unread" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(message.id);
                        }}
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <FaEye size={14} />
                      </button>
                    )}
                    {message.status === "read" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsUnread(message.id);
                        }}
                        className="p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 rounded-lg transition-colors"
                        title="Mark as unread"
                      >
                        <FaEnvelope size={14} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(message.id);
                      }}
                      className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMessage(null);
        }}
        title="Message Details"
      >
        {selectedMessage && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">From</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedMessage.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedMessage.email || "No email"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Subject</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {selectedMessage.subject || "No Subject"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Message</p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-h-60 overflow-y-auto">
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedMessage.message || "No message"}
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Received</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {selectedMessage.date ? new Date(selectedMessage.date).toLocaleString() : "Unknown"}
              </p>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700 flex-wrap">
              <Button
                variant="secondary"
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedMessage(null);
                }}
              >
                Close
              </Button>
              {selectedMessage.status === "unread" && (
                <Button 
                  onClick={() => {
                    handleMarkAsRead(selectedMessage.id);
                    setSelectedMessage({ ...selectedMessage, status: 'read' });
                  }}
                >
                  Mark as Read
                </Button>
              )}
              {selectedMessage.status === "read" && (
                <Button 
                  variant="warning"
                  onClick={() => {
                    handleMarkAsUnread(selectedMessage.id);
                    setSelectedMessage({ ...selectedMessage, status: 'unread' });
                  }}
                >
                  Mark as Unread
                </Button>
              )}
              <Button 
                variant="danger"
                onClick={() => {
                  handleDelete(selectedMessage.id);
                  setIsModalOpen(false);
                  setSelectedMessage(null);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AdminMessages;