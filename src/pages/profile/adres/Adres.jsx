import "./Adres.scss";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const Adres = () => {
  return (
    <div className="adresAnaContent">
      <div className="title">
        <h3>Adresleriniz</h3>
      </div>

      <hr />

      <div className="adresler">
        <div className="addContainer">
          <div className="add">
            <button>
              <AddIcon className="icon" />
              <p>Adres Ekle</p>
            </button>
          </div>
        </div>
        {[...Array(2)].map((_, index) => (
          <div className="kayitliAdres" key={index}>
            <div className="adresContent">
              <div className="top">
                <h4 className="adressTitle">Ev</h4>
                <div className="icons">
                  <button>
                    <ModeEditIcon className="icon" />
                  </button>
                  <button>
                    <DeleteIcon className="icon" />
                  </button>
                </div>
              </div>

              <div className="section">
                <p className="adresText">
                  Güvenevler mh 23 nolu sokak no:35 sarıkonak apt kat:2 daire:4
                  Şehitkamil/Gaziantep
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adres;
