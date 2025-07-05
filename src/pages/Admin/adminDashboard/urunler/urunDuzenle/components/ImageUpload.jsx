import ImageSearchIcon from "@mui/icons-material/ImageSearch";

const ImageUpload = ({
  isCover = false,
  coverImage,
  images,
  inputRef,
  handleImageUpload,
  handleRemoveImage,
  handleKapakImageChange,
}) => {
  const handleClick = (e) => {
    if (
      !e.target.closest(".image-container") &&
      !e.target.closest(".remove-button")
    ) {
      inputRef?.current?.click();
    }
  };

  if (isCover) {
    return (
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
              src={
                typeof coverImage === "string"
                  ? coverImage
                  : URL.createObjectURL(coverImage)
              }
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
    );
  }

  return (
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

      <div onClick={handleClick} className="kapsayiciButton">
        {images?.length > 0 ? (
          <div className="images-preview-container">
            {images.map((image, index) => {
              return (
                <div key={index} className="image-container">
                  <img
                    src={
                      image?.url
                        ? image.url
                        : typeof image === "string"
                        ? image
                        : URL.createObjectURL(image)
                    }
                    alt={`Uploaded Preview ${index}`}
                  />
                  <button
                    type="button"
                    className="remove-button"
                    onClick={(event) => {
                      event.stopPropagation(); // silerken input açılmasın
                      handleRemoveImage(index);
                    }}
                  >
                    ✕
                  </button>
                </div>
              );
            })}
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

export default ImageUpload;
