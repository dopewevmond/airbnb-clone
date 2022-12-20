import { Formik, Form, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
interface SignupResponse {
  message: string;
}

const formValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: yup
    .string()
    .min(8, "Password must be more than 8 characters")
    .required("Password is required"),
});

const initialFormValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignupPage = () => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (
    { firstName, lastName, email, password }: FormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const { data } = await axios.post<SignupResponse>(
        "http://127.0.0.1:5000/auth/signup",
        { firstName, lastName, email, password },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(data.message);
      setSubmitting(false);
      navigate("/login");
    } catch (err: any) {
      console.log(err);
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <div className="border my-5 px-5 pb-3 pt-0 rounded">
            <div className="border-bottom py-2">
              <p className="text-bold text-center m-0">Sign up</p>
            </div>
            <div className="">
              <div className="py-2">
                <Formik
                  initialValues={initialFormValues}
                  validationSchema={formValidationSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values, setSubmitting);
                  }}
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
                          <div className="small text-danger">
                            {errors.firstName}
                          </div>
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
                          autoComplete="false"
                        />
                        {touched.lastName && errors.lastName && (
                          <div className="small text-danger">
                            {errors.lastName}
                          </div>
                        )}
                      </div>

                      <div className="pb-4 input-group">
                        <label htmlFor="email" className="form-label">
                          Email Address
                        </label>
                        <Field
                          className={
                            touched.email && errors.email
                              ? "border border-danger form-control rounded w-100"
                              : "form-control rounded w-100"
                          }
                          type="text"
                          placeholder="Email address"
                          name="email"
                          id="email"
                          autoComplete="false"
                        />
                        {touched.email && errors.email && (
                          <div className="small text-danger">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div className="pb-4 input-group position-relative">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          className={
                            touched.password && errors.password
                              ? "border border-danger form-control rounded w-100"
                              : "form-control rounded w-100"
                          }
                          type={passwordHidden ? "password" : "text"}
                          placeholder="Password"
                          name="password"
                          id="password"
                        />
                        {touched.password && errors.password && (
                          <div className="small text-danger">
                            {errors.password}
                          </div>
                        )}
                        <button
                          type="button"
                          className="btn p-0"
                          onClick={() => setPasswordHidden(!passwordHidden)}
                          style={{
                            position: "absolute",
                            top: "3.2em",
                            right: "1em",
                            fontSize: "0.8em",
                            cursor: "pointer",
                            zIndex: 10,
                          }}
                        >
                          {passwordHidden ? "SHOW" : "HIDE"}
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-danger btn-block w-100"
                        disabled={isSubmitting}
                      >
                        Sign up
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
