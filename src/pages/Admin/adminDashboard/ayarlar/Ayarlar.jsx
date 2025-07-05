import "./Ayarlar.scss";
import Loading from "../../../../components/Loading/Loading";
import { useSettingsForm } from "./hooks/useSettingsForm";
import StoreInfo from "./components/StoreInfo";
import FormFields from "./components/FormFields";
import WorkingHours from "./components/WorkingHours";
import SubmitButton from "./components/SubmitButton";

const Ayarlar = () => {
  const {
    isLoading,
    formData,
    isWorkingHoursOpen,
    setIsWorkingHoursOpen,
    days,
    fields,
    handleChange,
    handleSubmit,
    initialData,
    handleWorkingHoursChange,
    getWorkingHourValue,
  } = useSettingsForm();

  if (!formData || isLoading) {
    return <Loading />;
  }

  return (
    <div className="ayarlar">
      <div className="">
        <div className="ayarlarContent">
          <form onSubmit={handleSubmit}>
            <div className="settingsForm">
              <div className="leftSide">
                <StoreInfo />
              </div>

              <div className="rightSection">
                <WorkingHours
                  isOpen={isWorkingHoursOpen}
                  onToggle={() => setIsWorkingHoursOpen(!isWorkingHoursOpen)}
                  days={days}
                  handleWorkingHoursChange={handleWorkingHoursChange}
                  getWorkingHourValue={getWorkingHourValue}
                />

                <FormFields
                  fields={fields}
                  formData={formData}
                  handleChange={handleChange}
                />

                <SubmitButton
                  initialData={initialData}
                  formData={formData}
                  onSubmit={handleSubmit}
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
