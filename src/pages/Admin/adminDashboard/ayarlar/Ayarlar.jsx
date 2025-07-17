import "./Ayarlar.scss";
import SettingsSkeleton from "./components/SettingsSkeleton";
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
    initialData,
    days,
    fields,
    errors,
    touched,
    handleWorkingHoursChange,
    getWorkingHourValue,
    getNestedValue,
    setIsWorkingHoursOpen,
    handleChange,
    handleSubmit,
  } = useSettingsForm();

  if (isLoading || !formData) {
    return <SettingsSkeleton />;
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
                  errors={errors}
                  touched={touched}
                  getNestedValue={getNestedValue}
                />

                <SubmitButton initialData={initialData} formData={formData} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ayarlar;
