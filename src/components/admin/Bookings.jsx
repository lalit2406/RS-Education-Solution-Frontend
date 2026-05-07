import { useEffect, useState } from "react";
import { FaWhatsapp, FaTrash } from "react-icons/fa";
import { socket } from "../../socket";
import toast from "react-hot-toast";
import ConfirmModal from "../common/ConfirmModal";

export default function Bookings({ showControls = true }) {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();

    const handleNewBooking = (newBooking) => {
      setBookings((prev) => {
        const exists = prev.some((b) => b._id === newBooking._id);
        if (exists) return prev; // 🔥 prevent duplicate
        return [newBooking, ...prev];
      });

      setCurrentPage(1);

      toast.success("New Booking 📞");
    };

    socket.on("new-booking", handleNewBooking);

    return () => {
      socket.off("new-booking", handleNewBooking);
    };
  },[]);

  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings/all`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Booking deleted");
      fetchBookings();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  const filtered = bookings.filter(
    (b) =>
      (b.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (b.service || "").toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLast = currentPage * itemsPerPage;

  const currentBookings = showControls
    ? filtered.slice(indexOfLast - itemsPerPage, indexOfLast)
    : filtered.slice(0, 4);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  return (
    <>
      <h2 className="section-title">Bookings</h2>
      {showControls && (
        <input
          className="search-input"
          placeholder="Search bookings..."
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

                  <div className="skeleton skeleton-line long"></div>
                  <div className="skeleton skeleton-line short"></div>
                  <div className="skeleton skeleton-line medium"></div>
                </div>

                <div className="skeleton-actions">
                  <div className="skeleton skeleton-btn"></div>
                  <div className="skeleton skeleton-btn"></div>
                </div>
              </div>
            ))
          : currentBookings.map((b) => (
              <div key={b._id} className="admin-card">
                <h3>{b.name}</h3>
                <p className="email">{b.email}</p>
                <p className="desc">📞 {b.phone}</p>

                {/* 🔥 NEW (SERVICE INFO) */}
                {b.service && (
                  <p className="rs-admin-service">🎯 Service: {b.service}</p>
                )}

                <p className="desc">📅 {b.date}</p>
                <p className="desc">⏰ {b.time}</p>

                <a
                  className="whatsapp-link"
                  href={`https://wa.me/91${b.phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>

                <div className="actions">
                  <button
                    onClick={() => {
                      setSelectedId(b._id);
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
          deleteBooking(selectedId);
          setShowConfirm(false);
        }}
      />
    </>
  );
}
