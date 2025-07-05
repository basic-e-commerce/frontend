import PropTypes from "prop-types";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const ImageUpload = ({
  images,
  coverImage,
  inputRef,
  handleImageUpload,
  handleRemoveImage,
  handleKapakImageChange,
  isCover,
}) => {
  return isCover ? (
    <div className="avatar">
      <input
        type="file"
        accept="image/*"
        className="upload-input"
        id="kapakFoto"
        onChange={handleKapakImageChange}
        style={{ display: "none" }}
      />
      <label htmlFor="kapakFoto" className="kapsayiciButton">
        {coverImage ? (
          <img
            className="kapakImgg"
            src={URL.createObjectURL(coverImage)}
            alt="kapakResmi"
          />
        ) : (
          <div className="Text">
            <ImageSearchIcon />
            Kapak Resmi
          </div>
        )}
      </label>
    </div>
  ) : (
    <div className="avatarResimler">
      <input
        type="file"
        accept="image/*"
        className="upload-input"
        multiple
        id="file-input"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={inputRef}
      />
      <div
        onClick={(e) => {
          if (
            !e.target.closest(".image-container") &&
            !e.target.closest(".remove-button")
          ) {
            inputRef.current.click();
          }
        }}
        className="kapsayiciButton"
      >
        {images.length > 0 ? (
          <div className="images-preview-container">
            {images.map((image, index) => (
              <div key={index} className="image-container">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded Preview ${index}`}
                />
                <button
                  type="button"
                  className="remove-button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleRemoveImage(index);
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="Text">
            <ImageSearchIcon />
            Ürün Resimleri Ekle
          </div>
        )}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  images: PropTypes.array.isRequired,
  coverImage: PropTypes.any,
  inputRef: PropTypes.object.isRequired,
  handleImageUpload: PropTypes.func.isRequired,
  handleRemoveImage: PropTypes.func.isRequired,
  handleKapakImageChange: PropTypes.func.isRequired,
  isCover: PropTypes.bool,
};

export default ImageUpload;
