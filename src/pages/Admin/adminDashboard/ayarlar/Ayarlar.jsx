import "./Ayarlar.scss";
import AyarForm from "./components/AyarForm";
import StoreInfo from "./components/StoreInfo";
import WorkingHours from "./components/WorkingHours";
import { useAyarlar } from "./hooks";

const Ayarlar = () => {
  const {
    isLoading,
    formik,
    cities,
    districts,
    onToggle,
    isOpen,
    initialValues,
  } = useAyarlar();

  return (
    <div className="ayarlar">
      <div className="">
        <div className="ayarlarContent">
          <form onSubmit={formik.handleSubmit}>
            <div className="settingsForm">
              <div className="leftSide">
                <StoreInfo />
              </div>

              <div className="rightSection">
                <WorkingHours
                  isOpen={isOpen}
                  onToggle={onToggle}
                  formik={formik}
                />
                <AyarForm
                  cities={cities}
                  districts={districts}
                  isLoading={isLoading}
                  formik={formik}
                  initialValues={initialValues}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ayarlar;
