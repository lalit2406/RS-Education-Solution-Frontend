import { useState, useEffect } from "react";
import "../../styles/dashboard/bookcallmodal.css";
import {
  FaTimes,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

export default function BookCallModal({ isOpen, onClose, service }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFullDate, setSelectedFullDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(""); // 🔥 NEW

  const times = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM"];

  const quickDates = [
    { label: "Today", offset: 0 },
    { label: "Tomorrow", offset: 1 },
    { label: "In 2 Days", offset: 2 },
    { label: "Next Week", offset: 7 },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setPhone("");
      setPhoneError(""); // 🔥 RESET
      setSelectedFullDate(null);
      setSelectedTime(null);
      setShowCalendar(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isPastDate = (day) => {
    if (!day) return true;

    const date = new Date(year, month, day);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today;
  };

  // 🔥 HANDLE BOOKING WITH INLINE VALIDATION
  const handleBooking = async () => {
    // RESET ERROR
    setPhoneError("");

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      return;
    }

    if (!/^[0-9]{10}$/.test(phone.trim())) {
      setPhoneError("Enter valid 10-digit phone number");
      return;
    }

    if (!service) {
      toast.error("Service not selected ❌");
      return;
    }

    if (!selectedFullDate || !selectedTime) {
      toast.error("Please select date & time 📅");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phone,
            date: selectedFullDate.toDateString(),
            time: selectedTime,
            service,
          }),
        },
      );

      if (!res.ok) {
        throw new Error("Booking failed");
      }

      toast.success("Call booked successfully 📞");

      setBookingDone(true);

      setTimeout(() => {
        setBookingDone(false);
        setPhone("");
        setPhoneError("");
        setSelectedFullDate(null);
        setSelectedTime(null);
        setShowCalendar(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      toast.error("Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rs-dashboard-cs-modal-overlay" onClick={onClose}>
      <div
        className="rs-dashboard-cs-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="rs-dashboard-cs-modal-close"
          onClick={() => {
            setPhone("");
            setPhoneError("");
            setSelectedFullDate(null);
            setSelectedTime(null);
            setShowCalendar(false);
            onClose();
          }}
        >
          <FaTimes />
        </button>

        {!bookingDone ? (
          <>
            <div className="rs-dashboard-cs-modal-header">
              <h2>Book a Call</h2>
              {service && (
                <p className="rs-dashboard-cs-service-name">For: {service}</p>
              )}
              <span>Select your preferred schedule</span>
            </div>

            {/* 🔥 PHONE INPUT */}
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setPhoneError(""); // clear error on typing
              }}
              className={`rs-dashboard-cs-ticket-input ${
                phoneError ? "input-error" : ""
              }`}
            />

            {/* 🔥 ERROR MESSAGE */}
            {phoneError && <p className="input-error-text">{phoneError}</p>}

            {/* QUICK DATES */}
            <>
              <div className="rs-dashboard-cs-quick-dates">
                {quickDates.map((item, index) => {
                  const date = new Date();
                  date.setDate(date.getDate() + item.offset);

                  return (
                    <div
                      key={index}
                      className={`rs-dashboard-cs-quick-date ${
                        selectedFullDate?.toDateString() === date.toDateString()
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);

                        if (date < today) return;

                        setSelectedFullDate(date);
                      }}
                    >
                      <span>{item.label}</span>
                      <small>{date.toDateString().slice(0, 10)}</small>
                    </div>
                  );
                })}
              </div>

              <button
                className="rs-dashboard-cs-open-calendar"
                onClick={() => setShowCalendar((prev) => !prev)}
              >
                <FaCalendarAlt /> Pick another date
              </button>
              {showCalendar && (
                <div className="rs-dashboard-cs-calendar">
                  {/* HEADER */}
                  <div className="rs-calendar-header">
                    <button
                      onClick={() => {
                        const prev = new Date(year, month - 1);

                        const today = new Date();

                        if (
                          prev.getFullYear() < today.getFullYear() ||
                          (prev.getFullYear() === today.getFullYear() &&
                            prev.getMonth() < today.getMonth())
                        ) {
                          return; // 🔥 strict month block
                        }

                        setCurrentDate(prev);
                      }}
                    >
                      <FaChevronLeft />
                    </button>

                    <span>
                      {currentDate.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>

                    <button
                      onClick={() => setCurrentDate(new Date(year, month + 1))}
                    >
                      <FaChevronRight />
                    </button>
                  </div>

                  {/* DAYS */}
                  <div className="rs-calendar-grid">
                    {days.map((day, i) => {
                      const isToday =
                        day &&
                        new Date(year, month, day).toDateString() ===
                          new Date().toDateString();

                      return (
                        <div
                          key={i}
                          className={`rs-calendar-day
        ${isToday ? "today" : ""}
        ${
          day &&
          selectedFullDate?.getDate() === day &&
          selectedFullDate?.getMonth() === month
            ? "active"
            : ""
        }
        ${isPastDate(day) ? "disabled" : ""}
      `}
                          onClick={() => {
                            if (!day) return;

                            const selectedDate = new Date(year, month, day);

                            const today = new Date();
                            today.setHours(0, 0, 0, 0);

                            if (selectedDate < today) return;

                            setSelectedFullDate(selectedDate);
                            setShowCalendar(false);
                          }}
                        >
                          {day || ""}
                        </div>
                      );
                    })}
                  </div>

                  {/* BACK BUTTON */}
                  <button
                    className="rs-calendar-back"
                    onClick={() => setShowCalendar(false)}
                  >
                    ← Back
                  </button>
                </div>
              )}
            </>

            {selectedFullDate && (
              <div className="rs-dashboard-cs-times">
                {times.map((t) => (
                  <div
                    key={t}
                    className={`rs-dashboard-cs-time ${
                      selectedTime === t ? "active" : ""
                    }`}
                    onClick={() => setSelectedTime(t)}
                  >
                    {t}
                    {selectedTime === t && <FaCheck />}
                  </div>
                ))}
              </div>
            )}

            {selectedFullDate && selectedTime && (
              <div className="rs-dashboard-cs-summary">
                <p>📅 {selectedFullDate.toDateString()}</p>
                <p>⏰ {selectedTime}</p>
              </div>
            )}

            <button
              className="rs-dashboard-cs-confirm"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm Booking →"}
            </button>
          </>
        ) : (
          <div className="rs-dashboard-cs-success">
            <FaCheck />
            <h3>Booking Confirmed!</h3>
            <p>Your session has been scheduled.</p>
          </div>
        )}
      </div>
    </div>
  );
}
