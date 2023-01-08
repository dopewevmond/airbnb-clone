import { Formik, Field, Form } from "formik";
import * as yup from "yup";

interface FormValues {
  name: string;
  numKingSizeBeds: string;
  numQueenSizeBeds: string;
  numSingleBeds: string;
  numDoubleBeds: string;
}

interface Props {
  handleSubmit: (values: any) => void;
}

const formValidationSchema = yup.object().shape({
  name: yup.string().required("Name of room is required"),
  numKingSizeBeds: yup
    .number()
    .typeError("Number of king size beds has to be a number")
    .required("No. of king size beds is required"),
  numQueenSizeBeds: yup
    .number()
    .typeError("Number of queen size beds has to be a number")
    .required("No. of queen size beds is required"),
  numSingleBeds: yup
    .number()
    .typeError("Number of single beds has to be a number")
    .required("No. of single beds is required"),
  numDoubleBeds: yup
    .number()
    .typeError("Number of double beds has to be a number")
    .required("No. of double beds is required"),
});

const initialFormValues: FormValues = {
  name: "Bedroom",
  numKingSizeBeds: "",
  numQueenSizeBeds: "",
  numSingleBeds: "",
  numDoubleBeds: "",
};

export const AddRoomForm = ({ handleSubmit }: Props) => {
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={formValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <div className="pb-4 input-group">
            <label htmlFor="name" className="form-label">
              Name of room
            </label>
            <Field
              className={`form-control rounded w-100 ${
                touched.name && errors.name ? "border-danger" : ""
              }`}
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
            <label htmlFor="numKingSizeBeds" className="form-label">
              Number of king size beds
            </label>
            <Field
              className={`form-control rounded w-100 ${
                touched.numKingSizeBeds && errors.numKingSizeBeds
                  ? "border-danger"
                  : ""
              }`}
              type="text"
              placeholder="Number of king size beds"
              name="numKingSizeBeds"
              id="numKingSizeBeds"
              autoComplete="false"
            />
            {touched.numKingSizeBeds && errors.numKingSizeBeds && (
              <div className="small text-danger">{errors.numKingSizeBeds}</div>
            )}
          </div>
          <div className="pb-4 input-group">
            <label htmlFor="numQueenSizeBeds" className="form-label">
              Number of queen size beds
            </label>
            <Field
              className={`form-control rounded w-100 ${
                touched.numQueenSizeBeds && errors.numQueenSizeBeds
                  ? "border-danger"
                  : ""
              }`}
              type="text"
              placeholder="Number of queen size beds"
              name="numQueenSizeBeds"
              id="numQueenSizeBeds"
              autoComplete="false"
            />
            {touched.numQueenSizeBeds && errors.numQueenSizeBeds && (
              <div className="small text-danger">{errors.numQueenSizeBeds}</div>
            )}
          </div>
          <div className="pb-4 input-group">
            <label htmlFor="numSingleBeds" className="form-label">
              Number of single beds
            </label>
            <Field
              className={`form-control rounded w-100 ${
                touched.numSingleBeds && errors.numSingleBeds
                  ? "border-danger"
                  : ""
              }`}
              type="text"
              placeholder="Number of single beds"
              name="numSingleBeds"
              id="numSingleBeds"
              autoComplete="false"
            />
            {touched.numSingleBeds && errors.numSingleBeds && (
              <div className="small text-danger">{errors.numSingleBeds}</div>
            )}
          </div>
          <div className="pb-4 input-group">
            <label htmlFor="numDoubleBeds" className="form-label">
              Number of double beds
            </label>
            <Field
              className={`form-control rounded w-100 ${
                touched.numDoubleBeds && errors.numDoubleBeds
                  ? "border-danger"
                  : ""
              }`}
              type="text"
              placeholder="Number of double beds"
              name="numDoubleBeds"
              id="numDoubleBeds"
              autoComplete="false"
            />
            {touched.numDoubleBeds && errors.numDoubleBeds && (
              <div className="small text-danger">{errors.numDoubleBeds}</div>
            )}
          </div>

          <button className="btn btn-primary btn-sm" type="submit">
            Add room
          </button>
        </Form>
      )}
    </Formik>
  );
};
