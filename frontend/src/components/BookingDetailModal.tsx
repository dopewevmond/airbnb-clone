import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import moment from "moment";

type Props = {
  start: string;
  end: string;
  image: string;
  booked_on: string;
  name: string;
  visited: boolean;
  amount: number;
};

const BookingDetailModal = () => {
  const [show, setShow] = useState(true);
  const { start, end, image, booked_on, name, visited, amount } =
    useOutletContext<Props>();
  const navigate = useNavigate();

  const toggleModal = () => {
    setShow(!show);
  };
  return (
    <>
      <Modal
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={toggleModal}
      >
        <Modal.Body>
          <div className="row">
            <div className="col-12 col-sm-5 p-0">
              <img
                className="img-fluid img-thumbnail"
                src={image}
                alt="listing"
              />
            </div>
            <div className="col-12 col-sm-7 px-2">
              <div className="row">
                <div className="col-12 fs-4">
                  {visited ? (
                    <div className="badge bg-success">Visited</div>
                  ) : (
                    <div className="badge bg-warning">Not visited</div>
                  )}
                </div>
                <div className="col-12">
                  <p className="fw-bold fs-3">{name}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <div>
              <strong>Booked on: </strong>
              {moment(booked_on).format("DD MMM YYYY")}
            </div>
            <div>
              <strong>Check-in date: </strong>
              {moment(start).format("DD MMM YYYY")}
            </div>
            <div>
              <strong>Check-out date: </strong>
              {moment(end).format("DD MMM YYYY")}
            </div>
            <div>
              <strong>Total amount paid: </strong>${amount}.00
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/bookings");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default BookingDetailModal;
