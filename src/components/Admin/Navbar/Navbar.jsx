import "./Navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbarWrapper">
          <div className="navbarRight">
            <div className="avatarTamplate">
              <Avatar alt="Gülce Gıda" />
              <span>Gülce Gıda</span>
            </div>
          </div>

          <div className="navbarLeft">
            {/*<button
              style={{
                background: "transparent",
                borderRadius: "20px",
              }}
            >
              <MenuIcon
                style={{
                  background: "transparent",
                  color: "rgb(24, 20, 36)",
                }}
                className="iconn"
              />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
