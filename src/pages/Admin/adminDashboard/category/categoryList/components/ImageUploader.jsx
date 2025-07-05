import PropTypes from "prop-types";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const ImageUploader = ({ renderedImage, handleKapakImageChange, formik }) => {
  return (
    <div className="avatar">
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        id="kapakFoto"
        onChange={handleKapakImageChange}
        style={{ display: "none" }}
      />
      <label htmlFor="kapakFoto" className="kapsayiciButton">
        {renderedImage ? (
          <img className="kapakImgg" src={renderedImage} alt="Kategori Kapak" />
        ) : (
          <div className="Text">
            <ImageSearchIcon />
            Kategori Resmi Ekle
          </div>
        )}
      </label>
      {formik.touched.coverImage && formik.errors.coverImage && (
        <div className="error-message">{formik.errors.coverImage}</div>
      )}
    </div>
  );
};

ImageUploader.propTypes = {
  formik: PropTypes.object.isRequired,
  onImageChange: PropTypes.func.isRequired,
};

export default ImageUploader;
