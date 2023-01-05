import { IReview } from "../interfaces";
import { DEFAULT_AVI } from "../utils/constants";
import moment from "moment";

type Props = {
  reviews: IReview[];
};

export const Reviews = ({ reviews }: Props) => (
  <div className="row">
    {reviews.map((review) => (
      <div
        className="col-12 col-md-6 col-lg-4"
        key={"listingReview" + review.id}
      >
        <div className="d-flex flex-wrap">
          <div style={{ width: "4em", height: "4em" }}>
            <img
              className="rounded-circle img-fluid"
              src={review.reviewer.profile_photo ?? DEFAULT_AVI}
              alt="pfp"
            />
          </div>
          <div className="align-self-center ps-3">
            <p className="m-0">{review.reviewer.first_name}</p>
            <p className="m-0 text-secondary" style={{ fontSize: "0.8em" }}>
              {" "}
              {moment(review.created_at).format("MMMM YYYY")}{" "}
            </p>
          </div>
        </div>
        <div>{review.comment}</div>
      </div>
    ))}
  </div>
);
