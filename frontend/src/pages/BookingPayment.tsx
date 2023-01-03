import { setRange, setDuration, selectRange, selectDuration } from "../redux/bookingSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { Link,useParams } from "react-router-dom";

export const BookingPayment = () => {
  const { id } = useParams()

  return (
    <div className="container">
      <Link to={`/listings/${id}`}>&lt; Back</Link> <p className="display-4 fw-bolder">Confirm and pay</p>

      <h5>Your trip</h5>
    </div>
  )
}
