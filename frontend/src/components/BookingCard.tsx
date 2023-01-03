import moment from "moment";
import { IPhoto } from "../interfaces";

type Props = {
  id: number;
  booked_on: string;
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
  booked_on,
  checkin,
  checkout,
}: Props) => {
  return (
    <div className="card">
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
                <span className="fw-bold">Booked on:</span>{" "}
                {moment(booked_on).format("DD MMMM YYYY")}
              </div>
              <div>
                <span className="fw-bold">Check in:</span>{" "}
                {moment(checkin).format("DD MMMM YYYY")}
              </div>
              <div>
                <span className="fw-bold">Check out:</span>{" "}
                {moment(checkout).format("DD MMMM YYYY")}
              </div>
            </div>
            <button className="btn btn-sm btn-primary">View details</button>
          </div>
        </div>
      </div>
    </div>
  );
};
