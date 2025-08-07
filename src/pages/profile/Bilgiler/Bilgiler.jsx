import { useSelector } from "react-redux";
import "./Bilgiler.scss";
import BilgilerSkeleton from "./BilgilerSkeleton";
import BilgilerForm from "./components/BilgilerForm";
import useBilgiler from "./hooks/useBilgiler";

const KullaniciBilgileri = () => {
  const { isLoading } = useSelector((state) => state.loading);
  const { formData, submitBilgiler } = useBilgiler();

  if (isLoading) {
    return <BilgilerSkeleton />;
  }

  return (
    <div className="kullaniciBilgileri">
      <div className="kullaniciInput">
        <div className="title">
          <h3>Kullanıcı Bilgileriniz</h3>
        </div>

        <hr />

        <BilgilerForm formData={formData} onSubmit={submitBilgiler} />
      </div>
    </div>
  );
};

export default KullaniciBilgileri;
