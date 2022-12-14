import axios from "axios";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";
import Hoc from "../components/Hoc";
import { setTokens } from "../helpers/helper.user";
import SignupPage from "./SignupPage";

interface FormValues {
  email: string;
  password: string;
}

function isValidEmail(email: string): boolean {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
}

const InnerForm = (props: FormikProps<FormValues>) => {
  const { touched, errors, isSubmitting } = props;
  return (
    <Form noValidate>
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
          <div className="small text-danger">{errors.email}</div>
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
          <div className="small text-danger">{errors.password}</div>
        )}
      </div>
      <button
        type="submit"
        className="btn btn-danger btn-block w-100"
        disabled={isSubmitting}
      >
        Log in
      </button>
    </Form>
  );
};

interface MyFormProps {
  email?: string;
}

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      email: props.email || "",
      password: "",
    };
  },
  validate: (values: FormValues) => {
    let errors: FormikErrors<FormValues> = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password.length === 0) {
      errors.password = "Password is required";
    }
    return errors;
  },
  handleSubmit: async (values) => {
    try {
      const { data } = await axios.post<LoginResponse>(
        "http://127.0.0.1:5000/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      toast.success("logged in successfully");
      setTokens(data.accessToken, data.refreshToken);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "An error occurred while logging in"
      );
    }
  },
})(InnerForm);

const LoginPage = () => {
  return (
    <div className="container">
      <div className="row">        
        <div className="col offset-md-2 col-md-8 offset-lg-3 col-lg-6">
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
          />
          <div className="border my-5 px-5 pb-3 pt-0 rounded">
            <div className="border-bottom py-2">
              <p className="text-bold text-center m-0">Log in</p>
            </div>
            <div className="">
              <div className="py-2">
                <MyForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
