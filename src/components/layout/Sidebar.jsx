import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Brain, Folder, Headphones } from "lucide-react";
import {FaUniversity,FaRobot} from "react-icons/fa";

import "../../styles/layout/sidebar.css";

import { useUser } from "../../context/UserContext";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const { user, loading } = useUser();


  // 🔹 Blur content when sidebar opens
  useEffect(() => {
    const content = document.querySelector(".dashboard-content");

    if (content) {
      if (open) {
        content.classList.add("blur");
      } else {
        content.classList.remove("blur");
      }
    }
  }, [open]);

  return (
    <>
      {/* 🔥 MOBILE HAMBURGER (below navbar) */}
      <div className={`sidebar-toggle ${open ? "active" : ""}`} onClick={() => setOpen(!open)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* 🔥 OVERLAY */}
      {open && (
        <div className="sidebar-overlay" onClick={() => setOpen(false)}></div>
      )}

      {/* SIDEBAR */}
      <aside className={`rs-sidebar ${open ? "open" : ""}`}>
        {/* MENU */}
        <nav className="rs-sidebar-menu">
          <NavLink
            to="/dashboard"
            end
            className="rs-menu-item"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          {/* <NavLink
            to="/dashboard/ai-tools"
            className="rs-menu-item"
            onClick={() => setOpen(false)}
          >
            <FaRobot size={18} />
            <span>AI Tools</span>
          </NavLink> */}

          <NavLink to="/dashboard/college-recommendation" className="rs-menu-item" onClick={() => setOpen(false)}>
            <FaUniversity size={18} />
            <span>College Recommendations</span>
          </NavLink>

          <NavLink to="/dashboard/task-manager" className="rs-menu-item" onClick={() => setOpen(false)}>
            <Brain size={18} />
            <span>Task Manager</span>
          </NavLink>


          <NavLink to="/dashboard/documents" className="rs-menu-item" onClick={() => setOpen(false)}>
            <Folder size={18} />
            <span>Documents</span>
          </NavLink>


          <NavLink to="/dashboard/customer-support" className="rs-menu-item" onClick={() => setOpen(false)}>
            <Headphones size={18} />
            <span>Customer Support</span>
          </NavLink>
        </nav>

        {/* USER */}
        <NavLink
          to="/dashboard/profile"
          className="rs-sidebar-user"
          onClick={() => setOpen(false)}
        >
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=8b5e3c&color=fff`}
            alt="user"
          />

          <div>
            <h4>{loading ? "Loading..." : user?.name || "User"}</h4>
            <p>{user?.email ? "Student" : ""}</p>
          </div>
        </NavLink>
      </aside>
    </>
  );
}
