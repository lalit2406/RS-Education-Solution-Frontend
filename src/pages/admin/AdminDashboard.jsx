import { useEffect, useState } from "react";
import "../../styles/admin/adminDashboard.css";
import Tickets from "../../components/admin/Tickets";
import Bookings from "../../components/admin/Bookings";
import { socket } from "../../socket";
import Contacts from "../../components/admin/Contacts";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <h2 style={{ padding: "30px" }}>Access Denied 🚫</h2>;
  }

  const [activeTab, setActiveTab] = useState("all");

  const [stats, setStats] = useState({
    totalTickets: 0,
    pending: 0,
    resolved: 0,
    bookings: 0,
  });

  useEffect(() => {
    const handleNewTicket = (ticket) => {
      // 🔥 update instantly
      setStats((prev) => ({
        ...prev,
        totalTickets: prev.totalTickets + 1,
        pending: ticket.status === "Pending" ? prev.pending + 1 : prev.pending,
        resolved:
          ticket.status === "Resolved" ? prev.resolved + 1 : prev.resolved,
      }));
    };

    const handleNewBooking = () => {
      setStats((prev) => ({
        ...prev,
        bookings: prev.bookings + 1,
      }));
    };

    const handleTicketUpdated = () => {
      fetchStats();
    };

    const handleTicketDeleted = () => {
      fetchStats();
    };

    socket.on("new-ticket", handleNewTicket);
    socket.on("new-booking", handleNewBooking);
    socket.on("ticket-updated", handleTicketUpdated);
    socket.on("ticket-deleted", handleTicketDeleted);
    socket.on("new-contact", () => {
      toast.success("New Contact Message 📩");
    });

    return () => {
      socket.off("new-ticket", handleNewTicket);
      socket.off("new-booking", handleNewBooking);
      socket.off("ticket-updated", handleTicketUpdated);
      socket.off("ticket-deleted", handleTicketDeleted);
      socket.off("new-contact");
    };
  }, []);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      const [tRes, bRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/tickets/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const tickets = await tRes.json();
      const bookings = await bRes.json();

      setStats({
        totalTickets: tickets.length,
        pending: tickets.filter((t) => t.status === "Pending").length,
        resolved: tickets.filter((t) => t.status === "Resolved").length,
        bookings: bookings.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tickets</h3>
          <p>{stats.totalTickets}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>

        <div className="stat-card">
          <h3>Bookings</h3>
          <p>{stats.bookings}</p>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="category-tabs">
        {["all", "tickets", "bookings", "contacts"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= CONTENT ================= */}
      {activeTab === "all" && (
        <>
          <Tickets showControls={false} />
          <Bookings showControls={false} />
          <Contacts showControls={false} />
        </>
      )}

      {activeTab === "tickets" && <Tickets showControls={true} />}
      {activeTab === "bookings" && <Bookings showControls={true} />}
      {activeTab === "contacts" && <Contacts showControls={true} />}
    </div>
  );
}
