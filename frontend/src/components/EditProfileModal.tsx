import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useAppSelector } from "../redux/store";
import { selectProfile, updateProfile } from "../redux/profileSlice";
import { useAppDispatch } from "../redux/store";

type Props = {
  closeModal: () => void;
};

interface FormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
}

const formValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNumber: yup
    .string()
    .min(
      12,
      "Phone number has to be 12 characters in the format (233)XXXXXXXXX"
    )
    .max(
      12,
      "Phone number has to be 12 characters in the format (233)XXXXXXXXX"
    ),
  bio: yup.string().max(255, "Bio cannot be longer than 255 characters"),
});

const EditProfileModal = ({ closeModal }: Props) => {
  const profileDetails = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const initialFormValues: FormValues = {
    firstName: profileDetails?.first_name ?? "",
    lastName: profileDetails?.last_name ?? "",
    phoneNumber: profileDetails?.phone_number ?? "",
    bio: profileDetails?.bio ?? "",
  };

  const handleSubmit = async (values: FormValues) => {
    dispatch(updateProfile(values));
    closeModal();
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>Edit profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form>
              <div className="pb-4 input-group">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <Field
                  className={
                    touched.firstName && errors.firstName
                      ? "border border-danger form-control rounded w-100"
                      : "form-control rounded w-100"
                  }
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  id="firstName"
                  autoComplete="false"
                />
                {touched.firstName && errors.firstName && (
                  <div className="small text-danger">{errors.firstName}</div>
                )}
              </div>

              <div className="pb-4 input-group">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <Field
                  className={
                    touched.lastName && errors.lastName
                      ? "border border-danger form-control rounded w-100"
                      : "form-control rounded w-100"
                  }
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  id="lastName"
                />
                {touched.lastName && errors.lastName && (
                  <div className="small text-danger">{errors.lastName}</div>
                )}
              </div>

              <div className="pb-4 input-group">
                <label htmlFor="bio" className="form-label">
                  Bio
                </label>
                <Field
                  className={
                    touched.bio && errors.bio
                      ? "border border-danger form-control rounded w-100"
                      : "form-control rounded w-100"
                  }
                  type="text"
                  placeholder="Bio"
                  name="bio"
                  id="bio"
                />
                {touched.bio && errors.bio && (
                  <div className="small text-danger">{errors.bio}</div>
                )}
              </div>

              <div className="pb-4 input-group">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <Field
                  className={
                    touched.phoneNumber && errors.phoneNumber
                      ? "border border-danger form-control rounded w-100"
                      : "form-control rounded w-100"
                  }
                  type="text"
                  placeholder="Phone Number"
                  name="phoneNumber"
                  id="phoneNumber"
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <div className="small text-danger">{errors.phoneNumber}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block w-100 d-flex align-items-center justify-content-center"
                disabled={isSubmitting}
              >
                Save changes
              </button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </>
  );
};

export default EditProfileModal;
