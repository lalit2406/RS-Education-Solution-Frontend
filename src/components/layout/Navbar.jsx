import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/layout/navbar.css";

import Logo from "../../components/common/Logo";

// ✅ CONTEXT
import { useUser } from "../../context/UserContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, logoutUser } = useUser(); // ✅ ONLY SOURCE

  const navigate = useNavigate();

  // 🔹 LOGOUT
  const handleLogout = () => {
    logoutUser(); // 🔥 clean logout
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* OVERLAY */}
      {menuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}

      <nav className="navbar">
        {/* LEFT */}
        <div className="nav-left">
          <NavLink to="/" onClick={closeMenu}>
            <Logo className="rs-main-logo" width="55px" />
          </NavLink>
        </div>

        {/* CENTER */}
        <div className="nav-center">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/programs">Programs</NavLink>
          <NavLink to="/ai-tools">AI Tools</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/find-college">Find College</NavLink>

          {/* 🔥 ADMIN BUTTON */}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
        </div>

        {/* RIGHT */}
        <div className="nav-right">
          {user ? (
            <>

              <button className="btn-primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login">
              <button className="btn-primary">Login</button>
            </NavLink>
          )}
        </div>

        {/* HAMBURGER */}
        <div
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* DRAWER */}
        <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
          <div className="drawer-top">
            <span onClick={closeMenu}></span>
          </div>

          <div className="drawer-links">
            <NavLink to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink to="/services" onClick={closeMenu}>
              Services
            </NavLink>
            <NavLink to="/programs" onClick={closeMenu}>
              Programs
            </NavLink>
            <NavLink to="/ai-tools" onClick={closeMenu}>
              AI Tools
            </NavLink>
            <NavLink to="/contact" onClick={closeMenu}>
              Contact
            </NavLink>
            <NavLink to="/dashboard" onClick={closeMenu}>
              Dashboard
            </NavLink>
             {user?.role === "admin" && <NavLink to="/admin" onClick={closeMenu} >Admin</NavLink>}
          </div>

          <div className="drawer-actions">
            {user ? (
              <>
                <span className="rs-user-name">{user?.name || "User"}</span>

                <button className="btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" onClick={closeMenu}>
                <button className="btn-primary">Login</button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
