import React from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useMakeBooking } from "../hooks/useBooking";
import { ErrorIcon, SuccessIcon } from "./Icons";

type Props = {
  listingId: number;
  checkIn: string;
  checkOut: string;
};

export const PaymentStatusModal = ({ listingId, checkIn, checkOut }: Props) => {
  const { bookingId, loading, error } = useMakeBooking(
    listingId,
    checkIn,
    checkOut
  );
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(`/listings/${listingId}`);
  };
  const handleViewBookingDetails = () => {
    navigate(`/bookings/${bookingId}`);
  };

  if (loading)
    return (
      <>
        <Modal.Body>
          <Spinner
            variant="danger"
            className="d-block mx-auto"
            animation="border"
          />
          <div className="text-center fs-5">Processing payment</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </>
    );
  if (error)
    return (
      <>
        <Modal.Body>
          <ErrorIcon />
          <div className="text-center fs-5">
            An error occurred while booking the listing. Please try again.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </>
    );

  return (
    <>
      <Modal.Body>
        <SuccessIcon />
        <div className="fs-5 text-center">Booking was successful!</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" size="sm" onClick={handleViewBookingDetails}>
          View booking details
        </Button>
        <Button variant="secondary" size="sm" onClick={() => navigate("/")}>
          Back to listings
        </Button>
      </Modal.Footer>
    </>
  );
};
