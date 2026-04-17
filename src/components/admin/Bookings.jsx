import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { socket } from "../../socket";
import toast from "react-hot-toast";

export default function Bookings({ showControls = true }) {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

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
  }, []);

  const fetchBookings = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/bookings/all`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const data = await res.json();
    setBookings(data);
  };

  const filtered = bookings.filter((b) =>
    (b.name || "").toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLast = currentPage * itemsPerPage;

  const currentBookings = showControls
    ? filtered.slice(indexOfLast - itemsPerPage, indexOfLast)
    : filtered.slice(0, 4);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  return (
    <>
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
        {currentBookings.map((b) => (
          <div key={b._id} className="admin-card">
            <h3>{b.name}</h3>
            <p className="email">{b.email}</p>
            <p className="desc">📞 {b.phone}</p>
            <p className="desc">📅 {b.date}</p>
            <p className="desc">⏰ {b.time}</p>

            <a className="whatsapp-link" href={`https://wa.me/91${b.phone}`} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
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
    </>
  );
}
