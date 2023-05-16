import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";
import { createReservation } from "../../utils/api";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [reservationError, setReservationError] = useState(false);

  const handleChange = (event) => {
    event.preventDefault();
    setFormData((newReservation) => ({
      ...newReservation,
      [event.target.name]: event.target.value,
    }));
  };

  const formatMobileNumber = (event) => {
    const prevChar = event.target.value[event.target.value.length - 1];
    let input = event.target.value.replace(/\D/g, "");
    if (input.length === 3 && prevChar === "-") {
      input += "-";
    } else if (input.length === 6 && prevChar === "-") {
      input =
        input.slice(0, 3) + "-" + input.slice(3, 6) + "-" + input.slice(7, 11);
    } else {
      if (input.length > 3) {
        input = input.slice(0, 3) + "-" + input.slice(3, 10);
      }
      if (input.length > 7) {
        input = input.slice(0, 7) + "-" + input.slice(7, 11);
      }
    }
    setFormData((curr) => ({ ...curr, mobile_number: input }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    let newResDate = formData.reservation_date;
    setReservationError(null);
    formData.people = Number(formData.people);

    try {
      await createReservation(formData, abortController.signal);
      setFormData(initialFormState);
      // Use history.replace instead of history.push to avoid creating a new entry in the history stack
      history.replace(`/dashboard?date=${newResDate}`);
    } catch (error) {
      setReservationError(error);
    }
    return () => abortController.abort();
  };

  return (
    <div className="container fluid">
      <h3 className="text-center">Create A New Reservation</h3>
      <ErrorAlert error={reservationError} />

      <ReservationForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formatMobileNumber={formatMobileNumber}
      />
    </div>
  );
}

export default NewReservation;
