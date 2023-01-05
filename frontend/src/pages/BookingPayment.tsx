import { Link, useParams } from "react-router-dom";
import ProfileTitleDetail from "../components/ProfileTitleDetail";
import { Form, Formik, Field } from "formik";
import * as yup from "yup";
import { useBookingPayment } from "../hooks/useBooking";
import moment from "moment";
import { DEFAULT_AVI } from "../utils/constants";

interface FormValues {
  cardNumber: string;
  expiration: string;
  cvv: string;
}

const formValidationSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Card number must consist of only digits")
    .min(16, "Card number must be exactly 16 digits")
    .max(16, "Card number must be exactly 16 digits")
    .required("Card number is required"),
  expiration: yup
    .string()
    .matches(
      /^[0-9]{2}\/[0-9]{2}$/,
      "Expiration date must be in the format MM/YY"
    )
    .required("Card expiration date is required"),
  cvv: yup
    .string()
    .matches(/^[0-9]+$/, "CVV must consist of only digits")
    .min(3, "CVV must be exactly 3 digits")
    .max(3, "CVV must be exactly 3 digits")
    .required("CVV is required"),
});

const initialFormValues: FormValues = {
  cardNumber: "",
  expiration: "",
  cvv: "",
};

export const BookingPayment = () => {
  const { id } = useParams();
  const { listing, duration, checkInDate, checkOutDate, loading, error } =
    useBookingPayment(Number(id as string));

  const handleSubmit = async (
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    console.log("submitted");
    setSubmitting(false);
  };

  if (loading) return <div className="container"> Loading...</div>;
  if (error != null) return <div className="alert alert-danger">{error}</div>;
  if (
    listing == null ||
    duration == null ||
    checkInDate == null ||
    checkOutDate == null
  )
    return (
      <div className="container"> The listing to be booked was not found </div>
    );

  return (
    <div className="container pt-4">
      <p className="display-6">
        <Link to={`/listings/${id}`} className="text-decoration-none text-body">
          <span style={{ marginRight: "0.6em" }} className="d-inline-block">
            &lt;
          </span>
        </Link>{" "}
        <strong> Confirm and pay</strong>
      </p>

      <div className="d-flex" style={{ gap: "1.2em" }}>
        <div style={{ flexBasis: "100px" }}>
          <img
            className="img-fluid img-thumbnail"
            src={
              listing.photos && listing.photos[0]
                ? listing.photos[0].photo.photo_uri
                : DEFAULT_AVI
            }
            alt=""
          />
        </div>
        <div>
          <div className="d-flex flex-column">
            <h4>{listing.name} </h4>
            <p className="text-decoration-underline mb-1">
              {" "}
              {listing.listing_type}{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="my-4">
        <div>
          <ProfileTitleDetail
            title="Dates"
            detail={`${moment(checkInDate).format("DD MMM")} - ${moment(
              checkOutDate
            ).format("DD MMM")}`}
          />
          <ProfileTitleDetail
            title={`Total ($${listing.night_rate}.00 x ${duration} nights)`}
            detail={`$${listing.night_rate * Number(duration)}.00`}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-8 col-lg-6 px-md-0">
          <hr />
          <Formik
            initialValues={initialFormValues}
            validationSchema={formValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              handleSubmit(setSubmitting);
            }}
          >
            {({ touched, errors, isSubmitting }) => (
              <Form>
                <div className="input-group pb-1">
                  <label htmlFor="cardNumber" className="form-label">
                    Card Number
                  </label>
                  <Field
                    className={`form-control form-control-lg w-100 rounded ${
                      touched.cardNumber && errors.cardNumber
                        ? "border-danger"
                        : ""
                    }`}
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    name="cardNumber"
                    id="cardNumber"
                    autoComplete="false"
                  />
                  {touched.cardNumber && errors.cardNumber && (
                    <div className="small text-danger">{errors.cardNumber}</div>
                  )}
                </div>

                <div className="d-flex">
                  <div style={{ flexBasis: "50%" }}>
                    <div className="input-group pb-4">
                      <label htmlFor="expiration" className="form-label">
                        Expiration date
                      </label>
                      <Field
                        className={`form-control form-control-lg w-100 rounded-0 rounded-start ${
                          touched.expiration && errors.expiration
                            ? "border-danger"
                            : ""
                        }`}
                        type="text"
                        placeholder="MM/YY"
                        name="expiration"
                        id="expiration"
                        autoComplete="false"
                      />
                      {touched.expiration && errors.expiration && (
                        <div className="small text-danger">
                          {errors.expiration}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ flexBasis: "50%" }}>
                    <div className="input-group pb-4">
                      <label htmlFor="cvv" className="form-label">
                        CVV
                      </label>
                      <Field
                        className={`form-control form-control-lg w-100 rounded-end ${
                          touched.cvv && errors.cvv ? "border-danger" : ""
                        }`}
                        type="text"
                        placeholder="***"
                        name="cvv"
                        id="cvv"
                        autoComplete="false"
                      />
                      {touched.cvv && errors.cvv && (
                        <div className="small text-danger">{errors.cvv}</div>
                      )}
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-danger w-100">
                  Confirm and pay {"$" + listing.night_rate * duration + ".00"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
