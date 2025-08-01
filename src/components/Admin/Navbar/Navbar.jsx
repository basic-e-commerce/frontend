import "./Navbar.scss";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="navbarWrapper">
          <div className="navbarLeft">
            <button style={{ borderRadius: "20px" }}>
              <MenuIcon
                style={{ color: "rgb(24, 20, 36)" }}
                className="iconn"
              />
            </button>
          </div>

          <div className="navbarRight">
            <div className="avatarTamplate">
              <Avatar alt="Ömer Türkay  " src="/images/userImg/1.jpg" />
              <span>Ömer Türkay</span>
              <ArrowDropDownIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
