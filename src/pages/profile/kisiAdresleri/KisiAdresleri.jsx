import { Paper } from "@mui/material";
import "./KisiAdresleri.scss";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const KisiAdresleri = () => {
  return (
    <div className="kisiAdresleri">
      <div className="title">
        <h3>Adreslerim</h3>
      </div>

      <hr />
      <div className="papers">
        <Paper className="add">
          <a href="#">
            <AddIcon />
            <strong>Adres Ekle</strong>
          </a>
        </Paper>

        <Paper className="kayitliAdres">
          <div className="top">
            <h4 className="adressTitle">Ev</h4>
            <div className="icons">
              <button href="">
                <ModeEditIcon />
              </button>
              <button href="">
                <DeleteIcon />
              </button>
            </div>
          </div>

          <div className="section">
            <p className="name">Ömer Türkay</p>
            <p className="adres">
              Güvenevler mh 23 nolu sokak no:35 sarıkonak apt kat:2 daire:4
              Şehitkamil/Gaziantep
            </p>
          </div>
        </Paper>

        <Paper
          className="kayitliAdres"
          sx={{
            boxShadow: 4,
            padding: " 2rem 2rem",
            borderRadius: 1,
          }}
        >
          <div className="top">
            <h4 className="adressTitle">Ev</h4>
            <div className="icons">
              <button href="">
                <ModeEditIcon />
              </button>
              <button href="">
                <DeleteIcon />
              </button>
            </div>
          </div>

          <div className="section">
            <p className="name">Ömer Türkay</p>
            <p className="adres">
              Güvenevler mh 23 nolu sokak no:35 sarıkonak apt kat:2 daire:4
              Şehitkamil/Gaziantep
            </p>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default KisiAdresleri;
