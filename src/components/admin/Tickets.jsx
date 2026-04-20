import { useEffect, useState } from "react";
import { socket } from "../../socket";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../common/ConfirmModal";

export default function Tickets({ showControls = true }) {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchTickets();

    const handleNewTicket = (newTicket) => {
      setTickets((prev) => {
        const exists = prev.some((t) => t._id === newTicket._id);
        if (exists) return prev;
        return [newTicket, ...prev];
      });

      setFilteredTickets((prev) => {
        const exists = prev.some((t) => t._id === newTicket._id);
        if (exists) return prev;

        if (filter !== "All" && newTicket.status !== filter) {
          return prev;
        }

        return [newTicket, ...prev];
      });

      setCurrentPage(1);

      toast.success("New Ticket Received 🎉");
    };

    socket.on("new-ticket", handleNewTicket);

    const handleTicketUpdated = (updatedTicket) => {
      setTickets((prev) =>
        prev.map((t) => (t._id === updatedTicket._id ? updatedTicket : t)),
      );

      setFilteredTickets((prev) => {
        const updatedList = prev.map((t) =>
          t._id === updatedTicket._id ? updatedTicket : t,
        );

        if (filter === "All") return updatedList;

        return updatedList.filter((t) => t.status === filter);
      });

      toast.success("Ticket Updated ⚡");
    };

    socket.on("ticket-updated", handleTicketUpdated);

    const handleTicketDeleted = (id) => {
      setTickets((prev) => prev.filter((t) => t._id !== id));

      setFilteredTickets((prev) => {
        const updated = prev.filter((t) => t._id !== id);

        if (filter === "All") return updated;
        return updated.filter((t) => t.status === filter);
      });

      toast.success("Ticket Deleted 🗑️");
    };

    socket.on("ticket-deleted", handleTicketDeleted);

    return () => {
      socket.off("new-ticket", handleNewTicket);
      socket.off("ticket-updated", handleTicketUpdated);
      socket.off("ticket-deleted", handleTicketDeleted);
    };
  }, [filter]);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/tickets/all`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (!res.ok) {
        toast.error("Failed to fetch tickets ❌");
        return;
      }

      const data = await res.json();
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      toast.error("Failed to fetch tickets ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (type) => {
    setFilter(type);
    setCurrentPage(1);

    if (type === "All") setFilteredTickets(tickets);
    else setFilteredTickets(tickets.filter((t) => t.status === type));
  };

  const searched = filteredTickets.filter((t) =>
    (t.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLast = currentPage * itemsPerPage;

  const currentTickets = showControls
    ? searched.slice(indexOfLast - itemsPerPage, indexOfLast)
    : searched.slice(0, 4);

  const totalPages = Math.max(1, Math.ceil(searched.length / itemsPerPage));

  const updateStatus = async (id, status) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });

    toast.success("Updated");
  };

  const deleteTicket = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Deleted");
  };

  return (
    <>
      <h2 className="section-title">Tickets</h2>
      {showControls && (
        <>
          <input
            className="search-input"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="filter-bar">
            {["All", "Pending", "Resolved"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => handleFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </>
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

                  <div className="skeleton skeleton-tag"></div>

                  <div className="skeleton skeleton-line long"></div>
                  <div className="skeleton skeleton-line medium"></div>
                </div>

                <div className="skeleton-actions">
                  <div className="skeleton skeleton-btn"></div>
                  <div className="skeleton skeleton-btn"></div>
                  <div className="skeleton skeleton-btn"></div>
                </div>
              </div>
            ))
          : currentTickets.map((t) => (
              <div key={t._id} className="admin-card">
                <div className="card-content">
                  <h3>{t.name}</h3>
                  <p className="email">{t.email}</p>
                  <div className="tag">{t.category}</div>
                  <p className="desc">{t.description}</p>
                  <p className={`status ${t.status}`}>{t.status}</p>
                </div>

                <div className="actions">
                  <button onClick={() => updateStatus(t._id, "Resolved")}>
                    Resolve
                  </button>
                  <button onClick={() => updateStatus(t._id, "Pending")}>
                    Pending
                  </button>
                  <button
                    onClick={() => {
                      setSelectedId(t._id);
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
          deleteTicket(selectedId);
          setShowConfirm(false);
        }}
      />
    </>
  );
}
