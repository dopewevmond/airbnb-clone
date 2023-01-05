import moment from "moment";
import { useNavigate } from "react-router-dom";
import { IPhoto } from "../interfaces";

type Props = {
  id: number;
  images: {
    id: number;
    photo: IPhoto;
  }[];
  name: string;
  visited: boolean;
  checkin: string;
  checkout: string;
};

export const BookingCard = ({
  id,
  name,
  images,
  visited,
  checkin,
  checkout,
}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="row">
          <div className="col-12 col-sm-3 p-0">
            <img
              className="img-fluid img-thumbnail"
              src={
                (images && images[0] && images[0].photo.photo_uri) ||
                "https://image.made-in-china.com/155f0j00suqRNGPdSJbj/High-Quality-Low-Price-Transparent-Geodesic-Dome-Mini-Yurt-Tent.jpg"
              }
              alt="listing"
            />
          </div>
          <div className="col-12 col-sm-9">
            <span className="fs-4 fw-bold">{name}</span>{" "}
            {visited ? (
              <div className="badge bg-success">Visited</div>
            ) : (
              <div className="badge bg-warning">Not visited</div>
            )}
            <div className="mb-2">
              <div>
                <span className="fw-bold">Check in:</span>{" "}
                {moment(checkin).format("DD MMMM YYYY")}
              </div>
              <div>
                <span className="fw-bold">Check out:</span>{" "}
                {moment(checkout).format("DD MMMM YYYY")}
              </div>
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => navigate(`/bookings/${id}`)}
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
