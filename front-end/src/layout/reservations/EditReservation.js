import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { formatAsDate } from "../../utils/date-time";
import { readReservation, updateReservation } from "../../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../ErrorAlert";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [reservationData, setReservationData] = useState(initialFormState);
  const [error, setError] = useState(null);

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
    setReservationData((curr) => ({ ...curr, mobile_number: input }));
  };

  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    async function loadReservation() {
      try {
        const response = await readReservation(
          reservation_id,
          abortController.signal
        );
        setReservationData({
          ...response,
          reservation_date: formatAsDate(response.reservation_date),
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error);
        }
        console.log("Abort");
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    let newReservationDate = reservationData.reservation_date;
    reservationData.people = Number(reservationData.people);
    setError(null);
    try {
      await updateReservation(reservationData);
      setReservationData(initialFormState);
      history.push(`/dashboard?date=${newReservationDate}`);
    } catch (error) {
      setError(error);
    }

    return () => abortController.abort();
  };

  const handleChange = (event) => {
    event.preventDefault();
    setReservationData((currentReservation) => ({
      ...currentReservation,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      <div className="page-head-container">
        <h2> Edit Reservation</h2>
      </div>
      <ErrorAlert error={error} />
      <ReservationForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formData={reservationData}
        formatMobileNumber={formatMobileNumber}
      />
    </div>
  );
}

export default EditReservation;
