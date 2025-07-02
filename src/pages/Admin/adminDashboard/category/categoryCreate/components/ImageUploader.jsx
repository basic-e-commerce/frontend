import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import PropTypes from "prop-types";

const ImageUploader = ({ imgKapak, onImageChange }) => {
  return (
    <div className="avatar">
      <input
        type="file"
        accept="image/*"
        className="upload-input"
        id="kapakFoto"
        onChange={onImageChange}
        style={{ display: "none" }}
      />

      <label htmlFor="kapakFoto" className="kapsayiciButton">
        {imgKapak ? (
          <img
            className="kapakImgg"
            src={URL.createObjectURL(imgKapak)}
            alt="kapakResmi"
          />
        ) : (
          <div className="Text">
            <ImageSearchIcon />
            Kategori Resmi Ekle
          </div>
        )}
      </label>
    </div>
  );
};

ImageUploader.propTypes = {
  imgKapak: PropTypes.object,
  onImageChange: PropTypes.func.isRequired,
};

export default ImageUploader;
