import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({
  handleChange,
  handleSubmit,
  formatMobileNumber,
  formData,
}) {
  const history = useHistory();

  return (
    <div>
      <form onSubmit={handleSubmit} className="form-card">
        <fieldset>
          <div className="form-item">
            <label htmlFor="first_name">First Name:</label>
            <input
              className="form-control"
              id="first_name"
              onChange={handleChange}
              type="text"
              name="first_name"
              required
              placeholder="First name"
              value={formData.first_name}
            />
          </div>
          <div className="form-item">
            <label htmlFor="last_name">Last Name:</label>
            <input
              className="form-control"
              id="last_name"
              onChange={handleChange}
              type="text"
              name="last_name"
              required
              placeholder="Last name"
              value={formData.last_name}
            />
          </div>
          <div className="form-item">
            <label htmlFor="mobile_number">Mobile Number:</label>
            <input
              className="form-control"
              id="mobile_number"
              onChange={formatMobileNumber}
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="mobile_number"
              required
              placeholder="Mobile number"
              value={formData.mobile_number}
            />
          </div>
          <div className="form-item">
            <label htmlFor="reservation_date">Reservation Date:</label>
            <input
              className="form-control"
              id="reservation_date"
              onChange={handleChange}
              type="date"
              name="reservation_date"
              required
              placeholder="Reservation date"
              value={formData.reservation_date}
            />
          </div>
          <div className="form-item">
            <label htmlFor="reservation_time">Reservation Time:</label>
            <input
              className="form-control"
              id="reservation_time"
              onChange={handleChange}
              type="time"
              name="reservation_time"
              required
              placeholder="Reservation time"
              value={formData.reservation_time}
            />
          </div>
          <div className="form-item">
            <label htmlFor="people">Party Size:</label>
            <input
              className="form-control"
              id="people"
              type="number"
              name="people"
              placeholder="Party size"
              value={formData.people}
              min={1}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <div className="form-item mt-3">
          <button
            className="form-button btn btn-block btn-success"
            type="submit"
          >
            Submit
          </button>
          <button
            className="form-button btn btn-block btn-danger"
            type="button"
            onClick={() => history.push("/dashboard")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
