import { useSelector } from "react-redux";
import "./SifreDegistir.scss";
import { SifreDegistirForm, SifreDegistirSkeleton } from "./components";
import { useSifreDegistir } from "./hooks";

const SifreDegistir = () => {
  const { handleSubmit } = useSifreDegistir();
  const { isLoading } = useSelector((state) => state.loading);

  if (isLoading) {
    return <SifreDegistirSkeleton />;
  }

  return (
    <div className="sifreDegistir">
      <div className="title">
        <h3>Şifre İşlemleri</h3>
      </div>

      <hr />
      <SifreDegistirForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
};

export default SifreDegistir;
