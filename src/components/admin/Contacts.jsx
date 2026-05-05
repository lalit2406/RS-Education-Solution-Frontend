import { useEffect, useState } from "react";
import { socket } from "../../socket";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../common/ConfirmModal";

export default function Contacts({ showControls = true }) {
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchContacts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/contact/all`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const data = await res.json();
        setFilteredContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();

    const handleNewContact = (contact) => {
      setFilteredContacts((prev) => [contact, ...prev]);
      setCurrentPage(1);

      toast.success("New Contact Message 📩");
    };

    socket.on("new-contact", handleNewContact);

    const handleDelete = (id) => {
      setFilteredContacts((prev) => prev.filter((c) => c._id !== id));

      toast.success("Contact Deleted 🗑️");
    };

    socket.on("contact-deleted", handleDelete);
    socket.on("contact-updated", (updated) => {
      setFilteredContacts((prev) =>
        prev.map((c) => (c._id === updated._id ? updated : c)),
      );
    });

    return () => {
      socket.off("new-contact", handleNewContact);
      socket.off("contact-deleted", handleDelete);
      socket.off("contact-updated");
    };
  }, [token]);

  const searched = filteredContacts
    .filter((c) => (c.name || "").toLowerCase().includes(search.toLowerCase()))
    .filter((c) => {
      if (filter === "Read") return c.read === true;
      if (filter === "Unread") return c.read === false;
      return true; // All
    });

  const indexOfLast = currentPage * itemsPerPage;

  const currentContacts = showControls
    ? searched.slice(indexOfLast - itemsPerPage, indexOfLast)
    : searched.slice(0, 4);

  const totalPages = Math.max(1, Math.ceil(searched.length / itemsPerPage));

  const deleteContact = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const toggleRead = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/mark/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const sendReply = async (id) => {
    if (!replyText) {
      toast.error("Reply cannot be empty");
      return;
    }

    await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/contact/reply/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply: replyText }),
      },
    );

    setReplyText("");
    setActiveReplyId(null);

    toast.success("Reply sent 📩");
  };

  return (
    <>
      <h2 className="section-title">Contacts</h2>
      {showControls && (
        <div className="category-tabs">
          {["All", "Read", "Unread"].map((f) => (
            <button
              key={f}
              className={filter === f ? "active" : ""}
              onClick={() => {
                setFilter(f);
                setCurrentPage(1);
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      {showControls && (
        <input
          className="search-input"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      )}

      <div className="admin-grid">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="admin-card skeleton-card">
                <div>
                  <div className="skeleton skeleton-header">
                    <div className="skeleton skeleton-avatar"></div>
                    <div className="skeleton skeleton-line medium"></div>
                  </div>

                  <div className="skeleton skeleton-line short"></div>
                  <div className="skeleton skeleton-line long"></div>
                </div>

                <div className="skeleton-actions">
                  <div className="skeleton skeleton-btn"></div>
                  <div className="skeleton skeleton-btn"></div>
                </div>
              </div>
            ))
          : currentContacts.map((c) => (
              <div key={c._id} className="admin-card">
                <h3>{c.name}</h3>
                <p className="email">{c.email}</p>
                <p>
                  <b>Subject:</b> {c.subject}
                </p>
                <p
                  style={{
                    color: c.read ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {c.read ? "✅ Read" : "🔵 Unread"}
                </p>
                <p className="desc">{c.message}</p>

                {activeReplyId === c._id && (
                  <div className="reply-box">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write reply..."
                    />
                    <button onClick={() => sendReply(c._id)}>Send Reply</button>
                  </div>
                )}

                {c.replied && (
                  <p className="desc" style={{ color: "green" }}>
                    ✅ Replied
                  </p>
                )}

                <div className="actions">
                  <button onClick={() => toggleRead(c._id)}>
                    {c.read ? "Mark Unread" : "Mark Read"}
                  </button>

                  <button onClick={() => setActiveReplyId(c._id)}>Reply</button>

                  <button
                    onClick={() => {
                      setSelectedId(c._id);
                      setShowConfirm(true);
                    }}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
      </div>

      {showControls && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span>
            {currentPage}/{totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => {
          deleteContact(selectedId);
          setShowConfirm(false);
        }}
      />
    </>
  );
}
