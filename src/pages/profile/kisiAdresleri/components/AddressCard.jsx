import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const AddressCard = ({ adres, onEdit, onDelete }) => {
  return (
    <div className="kayitliAdres paper">
      <div className="top">
        <h4 className="adressTitle">{adres.title}</h4>
        <div className="icons">
          <button onClick={() => onEdit(adres.id)}>
            <ModeEditIcon className="icon" />
          </button>
          <button onClick={() => onDelete(adres.id)}>
            <DeleteIcon className="icon" />
          </button>
        </div>
      </div>
      <div className="phone">
        <p className="name">{adres.phoneNo}</p>
      </div>
      <div className="section">
        <p className="name">{adres.name}</p>
        <p className="adres">
          {adres.addressLine1} {adres.postalCode} <br />
          {`${adres.countryName} / ${adres.city}`}
        </p>
      </div>
    </div>
  );
};

export default AddressCard;
