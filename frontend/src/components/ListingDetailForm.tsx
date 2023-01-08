import { Formik, Form, Field } from "formik";
import { Spinner } from "react-bootstrap";
import * as yup from "yup";
import { IListing, regions, listings } from "../interfaces";

export interface ListingDetailFormValues extends Omit<IListing, "id" | "photos" | "night_rate"> {
  name: string;
  description: string;
  address: string;
  street: string;
  state: string;
  region: string;
  isAcceptingBookings: boolean;
  listingType: string;
  isFullyPrivate: boolean;
  minNightsStay: string;
  numBathrooms: string;
  maxNumGuests: string;
  nightlyRate: string;
  timeCheckIn: string;
  timeCheckOut: string;
}

interface Props {
  initialValues: ListingDetailFormValues;
  handleSubmit: (values: any) => void;
  submitButtonValue: string
}

const valMsg = (field: string) =>
  `${field[0].toUpperCase()}${field.slice(1)} is required`;
const typeValMsg = (field: string) =>
  `${field[0].toUpperCase()}${field.slice(1)} should be a number`;

const formValidationSchema = yup.object().shape({
  name: yup.string().required(valMsg("name of listing")),
  description: yup.string().required(valMsg("description")),
  address: yup.string().required(valMsg("address")),
  street: yup.string().required(valMsg("street")),
  city: yup.string().required(valMsg("city")),
  state: yup.string().required(valMsg("state")),
  country: yup.string().required(valMsg("country")),
  region: yup.string().required(valMsg("region")),
  listingType: yup.string().required(valMsg("listingType")),
  minNightsStay: yup
    .number()
    .typeError(typeValMsg("min nights stay"))
    .required(valMsg("min nights stay")),
  numBathrooms: yup
    .number()
    .typeError(typeValMsg("num bathrooms"))
    .required(valMsg("num bathrooms")),
  maxNumGuests: yup
    .number()
    .typeError(typeValMsg("max num guests"))
    .required(valMsg("max num guests")),
  nightlyRate: yup
    .number()
    .typeError(typeValMsg("nightly rate"))
    .required(valMsg("nightly rate")),
});

export const ListingDetailForm = ({ initialValues, handleSubmit, submitButtonValue }: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <div className="pb-4 input-group">
            <label htmlFor="name" className="form-label">
              Name of listing
            </label>
            <Field
              className={
                touched.name && errors.name
                  ? "border border-danger form-control rounded w-100"
                  : "form-control rounded w-100"
              }
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              autoComplete="false"
            />
            {touched.name && errors.name && (
              <div className="small text-danger">{errors.name}</div>
            )}
          </div>
          <div className="pb-4 input-group">
            <label htmlFor="description" className="form-label">
              Listing description
            </label>
            <Field
              className={
                touched.description && errors.description
                  ? "border border-danger form-control rounded w-100"
                  : "form-control rounded w-100"
              }
              type="text"
              placeholder="A short description of the listing"
              name="description"
              id="description"
              autoComplete="false"
            />
            {touched.description && errors.description && (
              <div className="small text-danger">{errors.description}</div>
            )}
          </div>
          <div className="pb-4 input-group">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <Field
              className={
                touched.address && errors.address
                  ? "border border-danger form-control rounded w-100"
                  : "form-control rounded w-100"
              }
              type="text"
              placeholder="Address of listing"
              name="address"
              id="address"
              autoComplete="false"
            />
            {touched.address && errors.address && (
              <div className="small text-danger">{errors.address}</div>
            )}
          </div>
          <div className="pb-4 input-group">
            <label htmlFor="street" className="form-label">
              Street
            </label>
            <Field
              className={
                touched.street && errors.street
                  ? "border border-danger form-control rounded w-100"
                  : "form-control rounded w-100"
              }
              type="text"
              placeholder="Street of listing"
              name="street"
              id="street"
              autoComplete="false"
            />
            {touched.street && errors.street && (
              <div className="small text-danger">{errors.street}</div>
            )}
          </div>
          <div className="pb-4 input-group">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <Field
              className={
                touched.city && errors.city
                  ? "border border-danger form-control rounded w-100"
                  : "form-control rounded w-100"
              }
              type="text"
              placeholder="City of listing"
              name="city"
              id="city"
              autoComplete="false"
            />
            {touched.city && errors.city && (
              <div className="small text-danger">{errors.city}</div>
            )}
          </div>

          <div className="row pb-4 w-100 m-0">
            <div className="col-6 p-0">
              <div className="pb-4 input-group">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <Field
                  className={`form-control rounded-0 rounded-start w-100 ${
                    touched.state && errors.state ? "border-danger" : ""
                  }`}
                  type="text"
                  placeholder="State of listing"
                  name="state"
                  id="state"
                  autoComplete="false"
                />
                {touched.state && errors.state && (
                  <div className="small text-danger">{errors.state}</div>
                )}
              </div>
            </div>
            <div className="col-6 p-0">
              <div className="pb-4 input-group">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <Field
                  className={`form-control rounded-0 rounded-end w-100 ${
                    touched.country && errors.country ? "border-danger" : ""
                  }`}
                  type="text"
                  placeholder="Country"
                  name="country"
                  id="country"
                  autoComplete="false"
                />
                {touched.country && errors.country && (
                  <div className="small text-danger">{errors.country}</div>
                )}
              </div>
            </div>
          </div>

          <div className="row pb-4 w-100 m-0">
            <div className="col-6 p-0">
              <div className="input-group">
                <label htmlFor="region" className="form-label">
                  Region
                </label>
                <Field
                  as="select"
                  name="region"
                  id="region"
                  className={`form-select w-100 rounded-0 rounded-start ${
                    touched.region && errors.region ? "border-danger" : ""
                  }`}
                >
                  <option value=""></option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </Field>
                {touched.region && errors.region && (
                  <div className="small text-danger">{errors.region}</div>
                )}
              </div>
            </div>
            <div className="col-6 p-0">
              <div className="input-group">
                <label htmlFor="listingType" className="form-label">
                  Listing type
                </label>
                <Field
                  as="select"
                  name="listingType"
                  id="listingType"
                  className={`form-select w-100 rounded-0 rounded-end ${
                    touched.listingType && errors.listingType
                      ? "border-danger"
                      : ""
                  }`}
                >
                  <option value=""></option>
                  {listings.map((listing) => (
                    <option key={listing} value={listing}>
                      {listing}
                    </option>
                  ))}
                </Field>
                {touched.listingType && errors.listingType && (
                  <div className="small text-danger">{errors.listingType}</div>
                )}
              </div>
            </div>
          </div>
          <div className="form-check pb-4">
            <Field
              type="checkbox"
              name="isFullyPrivate"
              className="form-check-input"
              id="isFullyPrivate"
            />
            <label htmlFor="isFullyPrivate" className="form-check-label">
              Private (does not share facilities such as washrooms and kitchens)
            </label>
          </div>

          <div className="row pb-4 w-100 m-0">
            <div className="col-4 p-0">
              <div className="input-group">
                <label htmlFor="numBathrooms" className="form-label">
                  No. of bathrooms
                </label>
                <Field
                  className={`form-control rounded-0 rounded-start w-100 ${
                    touched.numBathrooms && errors.numBathrooms
                      ? "border-danger"
                      : ""
                  }`}
                  type="text"
                  placeholder="Number of bathrooms"
                  name="numBathrooms"
                  id="numBathrooms"
                  autoComplete="false"
                />
                {touched.numBathrooms && errors.numBathrooms && (
                  <div className="small text-danger">{errors.numBathrooms}</div>
                )}
              </div>
            </div>
            <div className="col-4 p-0">
              <div className="input-group">
                <label htmlFor="maxNumGuests" className="form-label">
                  Max. num. of guests
                </label>
                <Field
                  className={`form-control rounded-0 w-100 ${
                    touched.maxNumGuests && errors.maxNumGuests
                      ? "border-danger"
                      : ""
                  }`}
                  type="text"
                  placeholder="Max guests"
                  name="maxNumGuests"
                  id="maxNumGuests"
                  autoComplete="false"
                />
                {touched.maxNumGuests && errors.maxNumGuests && (
                  <div className="small text-danger">{errors.maxNumGuests}</div>
                )}
              </div>
            </div>
            <div className="col-4 p-0">
              <div className="input-group">
                <label htmlFor="nightlyRate" className="form-label">
                  Rate (in $) per night
                </label>
                <Field
                  className={`form-control rounded-0 rounded-end w-100 ${
                    touched.nightlyRate && errors.nightlyRate
                      ? "border-danger"
                      : ""
                  }`}
                  type="text"
                  placeholder="Night rate"
                  name="nightlyRate"
                  id="nightlyRate"
                  autoComplete="false"
                />
                {touched.nightlyRate && errors.nightlyRate && (
                  <div className="small text-danger">{errors.nightlyRate}</div>
                )}
              </div>
            </div>
          </div>
          <button
            className="btn btn-danger btn-block w-100 d-flex align-items-center justify-content-center"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner className="d-inline-block mx-auto" />
            ) : (
              <>{submitButtonValue}</>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};
