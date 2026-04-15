import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../../styles/admin/adminDashboard.css";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return (
      <div style={{ padding: "30px", color: "#5a4634" }}>
        <h2>Access Denied 🚫</h2>
        <p>You are not authorized to view this page.</p>
      </div>
    );
  }
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const token = localStorage.getItem("token");

  // ===============================
  // 📦 FETCH TICKETS
  // ===============================
  const fetchTickets = async () => {
    try {
      const res = await fetchaxios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/tickets/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setTickets(data);
      setFilteredTickets(data);
    } catch (err) {
      toast.error("Failed to load tickets ❌");
    }
  };

  // ===============================
  // 📞 FETCH BOOKINGS
  // ===============================
  const fetchBookings = async () => {
    try {
      const res = await fetchaxios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setBookings(data);
    } catch (err) {
      toast.error("Failed to load bookings ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchBookings();
  }, []);

  // ===============================
  // 🔄 UPDATE STATUS
  // ===============================
  const updateStatus = async (id, status) => {
    try {
      await fetchaxios.get(
              `${import.meta.env.VITE_API_BASE_URL}/api/tickets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      toast.success("Status updated ✅");
      fetchTickets();
    } catch (err) {
      toast.error("Update failed ❌");
    }
  };

  // ===============================
  // 🎯 FILTER LOGIC
  // ===============================
  const handleFilter = (type) => {
    setFilter(type);

    if (type === "All") {
      setFilteredTickets(tickets);
    } else {
      setFilteredTickets(tickets.filter((t) => t.status === type));
    }
  };

  // 📊 STATS CALCULATION
  const totalTickets = tickets.length;
  const pendingTickets = tickets.filter((t) => t.status === "Pending").length;
  const resolvedTickets = tickets.filter((t) => t.status === "Resolved").length;
  const totalBookings = bookings.length;

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* ===============================
    📊 ANALYTICS CARDS
================================ */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{totalTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{resolvedTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Bookings</h3>
          <p>{totalBookings}</p>
        </div>
      </div>

      {/* ===============================
          📊 FILTER BUTTONS
      =============================== */}
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

      {/* ===============================
          🎫 TICKETS
      =============================== */}
      <h2 className="section-title">Tickets</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="admin-grid">
          {filteredTickets.map((ticket) => (
            <div key={ticket._id} className="admin-card">
              <h3>{ticket.name}</h3>
              <p className="email">{ticket.email}</p>

              <div className="tag">{ticket.category}</div>

              <p className="desc">{ticket.description}</p>

              <p className={`status ${ticket.status}`}>{ticket.status}</p>

              <div className="actions">
                <button onClick={() => updateStatus(ticket._id, "Resolved")}>
                  Resolve
                </button>

                <button onClick={() => updateStatus(ticket._id, "Pending")}>
                  Pending
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ===============================
          📞 BOOKINGS
      =============================== */}
      <h2 className="section-title">Bookings</h2>

      <div className="admin-grid">
        {bookings.map((b) => (
          <div key={b._id} className="admin-card">
            <h3>{b.name}</h3>
            <p className="email">{b.email}</p>
            <p className="desc">📞 {b.phone}</p>

            <p className="desc">📅 {b.date}</p>
            <p className="desc">⏰ {b.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
