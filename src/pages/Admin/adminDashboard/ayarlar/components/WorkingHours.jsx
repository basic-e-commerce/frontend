import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./WorkingHours.scss";

const WorkingHours = ({ isOpen, onToggle, formik }) => {
  const openCloseHours = formik.values?.openCloseHours;

  const handleHourChange = (index, field, value) => {
    const updatedHours = [...openCloseHours];
    updatedHours[index][field] = value;
    formik.setFieldValue("openCloseHours", updatedHours);
  };

  return (
    <div className="workingHoursSection">
      <div className="workingHoursHeader" onClick={onToggle}>
        <h4>Çalışma Saatleri</h4>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>

      {isOpen && (
        <div className="workingHoursContent">
          {openCloseHours?.map((day, index) => (
            <div key={day.day} className="dayRow">
              <div className="dayLabel">{day.day}</div>
              <div className="timeInputs">
                <input
                  type="time"
                  value={day.hour}
                  onChange={(e) =>
                    handleHourChange(index, "hour", e.target.value)
                  }
                />
                <span>-</span>
                <input
                  type="time"
                  value={day.endHour}
                  onChange={(e) =>
                    handleHourChange(index, "endHour", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkingHours;
