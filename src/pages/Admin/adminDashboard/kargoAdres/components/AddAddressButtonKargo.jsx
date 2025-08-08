import AddIcon from "@mui/icons-material/Add";

const AddAddressButtonKargo = ({ onClick }) => {
  return (
    <div className="add paper">
      <button onClick={onClick}>
        <AddIcon />
        <strong>Adres Ekle</strong>
      </button>
    </div>
  );
};

export default AddAddressButtonKargo;
