import { useEffect } from "react";
import { DateRangePicker } from "rsuite";
import moment from "moment";
import {
  setRange,
  setDuration,
  selectRange,
  selectDuration,
} from "../redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { createSearchParams, useNavigate } from "react-router-dom";

type Props = {
  id: number;
  night_rate: number;
  min_nights_stay: number;
};

const BookingForm = ({ id, night_rate, min_nights_stay }: Props) => {
  const navigate = useNavigate();
  const range = useAppSelector(selectRange);
  const duration = useAppSelector(selectDuration);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      setRange([
        new Date(),
        new Date(moment(new Date()).add(min_nights_stay, "days").toISOString()),
      ])
    );
  }, [dispatch, min_nights_stay]);
  useEffect(() => {
    dispatch(setDuration(range));
  }, [range, dispatch]);

  const { beforeToday } = DateRangePicker;

  return (
    <>
      <div className="mb-2">
        <span className="display-6">
          <strong> ${night_rate}</strong>
        </span>{" "}
        / night
      </div>
      <div>
        <span className="text-secondary">
          Accepting bookings for a minimum of {min_nights_stay} nights
        </span>
        {beforeToday && (
          <DateRangePicker
            block
            className="my-2"
            placeholder="Duration for booking"
            value={range}
            showOneCalendar
            onChange={(e) => {
              dispatch(setRange(e));
            }}
            disabledDate={beforeToday()}
          />
        )}

        {(duration == null || duration < min_nights_stay) && (
          <div className="text-danger mb-2" style={{ fontSize: "0.8em" }}>
            The duration of stay has to be at least {min_nights_stay} nights for
            this listing
          </div>
        )}
      </div>

      <button
        onClick={() => {
          const urlParams = (range) ? new URLSearchParams({
            checkInDate: range[0].toISOString(),
            checkOutDate: range[1].toISOString()
          }) : new URLSearchParams({})
          
          navigate({
            pathname: `/book/${id}`,
            search: `?${createSearchParams(urlParams)}`
          });
        }}
        className="btn btn-danger w-100 d-block cs-button"
        disabled={duration == null || duration < min_nights_stay}
      >
        Book
      </button>

      {duration && (
        <div className="mt-3">
          <div className="d-flex flex-row justify-content-between mb-2">
            <div className="text-decoration-underline">
              <span>
                ${night_rate} x {duration} nights
              </span>
            </div>
            <div className="text-decoration-underline">
              <span>${night_rate * duration}</span>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-between">
            <div className="text-decoration-underline">
              <span>Service fee</span>
            </div>
            <div className="text-decoration-underline">
              <span>$0</span>
            </div>
          </div>
          <hr />

          <div className="d-flex flex-row justify-content-between fs-5">
            <div>Total</div>
            <div>
              <span>${night_rate * duration}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingForm;
