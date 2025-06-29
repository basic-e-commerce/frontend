import StorefrontIcon from "@mui/icons-material/Storefront";
//import "./StoreInfo.scss";

const StoreInfo = () => {
  return (
    <div className="storeInfo">
      <div className="storeIcon">
        <StorefrontIcon fontSize="large" />
      </div>
      <h3>Mağaza Bilgileri</h3>
      <p>Mağaza ayarlarınızı buradan güncelleyebilirsiniz</p>
    </div>
  );
};

export default StoreInfo;
