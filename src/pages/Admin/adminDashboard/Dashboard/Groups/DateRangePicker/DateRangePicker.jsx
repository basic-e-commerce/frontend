import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.scss";

const DateRangePicker = ({ startDate, endDate, onChange }) => {
  return (
    <div className="date-range-picker">
      <div className="date-picker-field">
        <label>Başlangıç Tarihi</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => onChange(date, endDate)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
      <div className="date-picker-field">
        <label>Bitiş Tarihi</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => onChange(startDate, date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
