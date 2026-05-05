import { useEffect, useState } from "react";
import { socket } from "../../socket";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import ConfirmModal from "../common/ConfirmModal";

export default function Guidance({ showControls = true }) {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const itemsPerPage = 6;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/guidance/all`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        const data = await res.json();
        setLeads(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();

    const handleNewLead = (lead) => {
      setLeads((prev) => [lead, ...prev]);
      setCurrentPage(1);
      toast.success("New Guidance Request 🎓");
    };

    socket.on("new-guidance", handleNewLead);

    return () => socket.off("new-guidance", handleNewLead);
  }, [token]);

  const filtered = leads.filter((l) =>
    (l.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLast = currentPage * itemsPerPage;

  const currentLeads = showControls
    ? filtered.slice(indexOfLast - itemsPerPage, indexOfLast)
    : filtered.slice(0, 3);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  const deleteLead = async (id) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/guidance/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    toast.success("Lead deleted");
    setLeads((prev) => prev.filter((l) => l._id !== id));
  };

  return (
    <>
      <h2 className="section-title">Guidance Leads</h2>
      {showControls && (
        <input
          className="search-input"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      )}

      <div className="admin-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
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
                </div>
              </div>
            ))
          : currentLeads.map((l) => (
              <div key={l._id} className="admin-card">
                <div className="card-content">
                  <h3>{l.name}</h3>
                  <p className="email">{l.email}</p>
                  <p className="desc">📞 {l.phone}</p>
                  <div className="tag">{l.selectedCourse}</div>
                  <p className="desc">{l.message}</p>
                </div>

                <div className="actions">
                  <button
                    onClick={() => {
                      setSelectedId(l._id);
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
          deleteLead(selectedId);
          setShowConfirm(false);
        }}
      />
    </>
  );
}
