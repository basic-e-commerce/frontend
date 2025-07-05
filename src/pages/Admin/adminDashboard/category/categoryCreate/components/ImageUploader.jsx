import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import PropTypes from "prop-types";

const ImageUploader = ({ formik, onImageChange }) => {
  return (
    <div className="avatar">
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        className="upload-input"
        id="kapakFoto"
        onChange={onImageChange}
        style={{ display: "none" }}
      />

      <label htmlFor="kapakFoto" className="kapsayiciButton">
        {formik.values.coverImage ? (
          <img
            className="kapakImgg"
            src={
              typeof formik.values.coverImage === "string"
                ? formik.values.coverImage
                : URL.createObjectURL(formik.values.coverImage)
            }
            alt="kapakResmi"
          />
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
