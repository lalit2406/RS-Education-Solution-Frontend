import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { BsRobot } from "react-icons/bs";
import "../../styles/common/floatingChat.css";

const FloatingChatButton = ({ setShowChat, showChat }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const isLoggedIn = !!user;

  // ✅ allowed routes
  const allowedRoutes = ["/", "/programs", "/services"];

  const isHome = location.pathname === "/";

  // ❌ hide on other routes
  if (!allowedRoutes.includes(location.pathname)) return null;

  // ✅ click handler
  const handleClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

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
