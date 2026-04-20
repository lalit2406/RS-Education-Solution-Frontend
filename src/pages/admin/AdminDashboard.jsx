import { useEffect, useState } from "react";
import "../../styles/admin/adminDashboard.css";
import Tickets from "../../components/admin/Tickets";
import Bookings from "../../components/admin/Bookings";
import { socket } from "../../socket";
import Contacts from "../../components/admin/Contacts";
import toast from "react-hot-toast";
import Guidance from "../../components/admin/Guidance";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.role !== "admin") {
    return <h2 style={{ padding: "30px" }}>Access Denied 🚫</h2>;
  }

  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
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
    socket.on("new-guidance", () => {
      toast.success("New Guidance Lead 🎓");
    });

    return () => {
      socket.off("new-ticket", handleNewTicket);
      socket.off("new-booking", handleNewBooking);
      socket.off("ticket-updated", handleTicketUpdated);
      socket.off("ticket-deleted", handleTicketDeleted);
      socket.off("new-contact");
      socket.off("new-guidance");
    };
  }, []);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
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
        {[1, 2, 3, 4].map((i) => (
          <div className="stat-card" key={i}>
            {loading ? (
              <div className="skeleton skeleton-text"></div>
            ) : (
              <>
                <h3>
                  {i === 1
                    ? "Total Tickets"
                    : i === 2
                      ? "Pending"
                      : i === 3
                        ? "Resolved"
                        : "Bookings"}
                </h3>
                <p>
                  {i === 1
                    ? stats.totalTickets
                    : i === 2
                      ? stats.pending
                      : i === 3
                        ? stats.resolved
                        : stats.bookings}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* ================= TABS ================= */}
      <div className="category-tabs">
        {["all", "tickets", "bookings", "contacts", "guidance"].map((tab) => (
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
          <Guidance showControls={false} />
        </>
      )}

      {activeTab === "tickets" && <Tickets showControls={true} />}
      {activeTab === "bookings" && <Bookings showControls={true} />}
      {activeTab === "contacts" && <Contacts showControls={true} />}
      {activeTab === "guidance" && <Guidance showControls={true} />}
    </div>
  );
}
