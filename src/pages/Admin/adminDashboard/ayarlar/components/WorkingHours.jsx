import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./WorkingHours.scss";

const WorkingHours = ({
  isOpen,
  onToggle,
  days,
  handleWorkingHoursChange,
  getWorkingHourValue,
}) => {
  return (
    <div className="workingHoursSection">
      <div className="workingHoursHeader" onClick={onToggle}>
        <h4>Çalışma Saatleri</h4>
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </div>

      {isOpen && (
        <div className="workingHoursContent">
          {days.map((day) => (
            <div key={day.key} className="dayRow">
              <div className="dayLabel">{day.label}</div>
              <div className="timeInputs">
                <input
                  type="time"
                  value={getWorkingHourValue(day.key, "hour")}
                  onChange={(e) =>
                    handleWorkingHoursChange(day.key, "hour", e.target.value)
                  }
                />
                <span>-</span>
                <input
                  type="time"
                  value={getWorkingHourValue(day.key, "endHour")}
                  onChange={(e) =>
                    handleWorkingHoursChange(day.key, "endHour", e.target.value)
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
