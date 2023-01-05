import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import { AxiosError } from "axios";
import { Alert } from "react-bootstrap";
import { useLoginMessage } from "../hooks/useLoginMessage";

interface FormValues {
  email: string;
  password: string;
}

const formValidationSchema = yup.object().shape({
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
  email: "",
  password: "",
};

const LoginPage = () => {
  const { login, setLoggedIn } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const { loginMessage } = useLoginMessage();
  useEffect(() => {
    setLoggedIn(false);
  }, []);

  const handleSubmit = async (
    { email, password }: FormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      await login(email, password);
    } catch (err: any) {
      const { response } = err as AxiosError<{ message: string }>;
      setError(response?.data.message ?? err);
      setSubmitting(false);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <div className="border my-5 px-5 pb-3 pt-0 rounded">
            <div className="border-bottom py-2">
              <p className="text-bold text-center m-0">Log in</p>
            </div>
            <div className="">
              <div className="py-2">
                {error ? (
                  <Alert variant="danger">
                    <span> {error} </span>
                  </Alert>
                ) : (
                  <></>
                )}
                {loginMessage ? (
                  <Alert variant="danger">
                    <span> {loginMessage} </span>
                  </Alert>
                ) : (
                  <></>
                )}
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

                      <div className="pb-4 input-group">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          className={
                            touched.password && errors.password
                              ? "border border-danger form-control rounded w-100"
                              : "form-control rounded w-100"
                          }
                          type="password"
                          placeholder="Password"
                          name="password"
                          id="password"
                        />
                        {touched.password && errors.password && (
                          <div className="small text-danger">
                            {errors.password}
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="btn btn-danger btn-block w-100 d-flex align-items-center justify-content-center"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? <Loader /> : "Log in"}
                      </button>
                    </Form>
                  )}
                </Formik>
                <p className="mt-4">
                  Don&apos;t have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
