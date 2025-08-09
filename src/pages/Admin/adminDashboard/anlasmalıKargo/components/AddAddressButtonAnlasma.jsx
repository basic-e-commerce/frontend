import AddIcon from "@mui/icons-material/Add";

const AddAddressButtonAnlasma = ({ onClick }) => {
  return (
    <div className="add paper">
      <button onClick={onClick}>
        <AddIcon />
        <strong>Anlaşma Ekle</strong>
      </button>
    </div>
  );
};

export default AddAddressButtonAnlasma;
