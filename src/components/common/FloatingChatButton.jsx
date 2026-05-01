import { useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { BsRobot } from "react-icons/bs";
import "../../styles/common/floatingChat.css";

const FloatingChatButton = ({ setShowChat, showChat }) => {
  const location = useLocation();
  const { user } = useUser();

  const isLoggedIn = !!user;

  // ✅ allowed routes
  const allowedRoutes = ["/", "/programs", "/services"];

  const isHome = location.pathname === "/";

  // ❌ hide on other routes
  if (!allowedRoutes.includes(location.pathname)) return null;

  // ❌ restrict home if not logged in
  if (isHome && !isLoggedIn) return null;

  // ✅ toggle open/close
  const handleClick = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <div className="chat-float" onClick={handleClick}>
      <div className={`chat-icon ${showChat ? "active" : ""}`}>
        <BsRobot />
      </div>
    </div>
  );
};

export default FloatingChatButton;