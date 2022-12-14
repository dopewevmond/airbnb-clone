import axios from "axios";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import { ToastContainer, toast } from "react-toastify";

interface FormValues {
  firstName: string;
  lastName: string;
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
        <label htmlFor="email" className="form-label">
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
          <div className="small text-danger">{errors.lastName}</div>
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
        Create an account
      </button>
    </Form>
  );
};

interface MyFormProps {
  email?: string;
}

type SignupResponse = {
  message: string
};

const MyForm = withFormik<MyFormProps, FormValues>({
  mapPropsToValues: (props) => {
    return {
      firstName: "",
      lastName: "",
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
    if (!values.firstName) {
      errors.firstName = "First name is required";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required";
    }
    if (values.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    }
    return errors;
  },
  handleSubmit: async (values) => {
    try {
      const { data } = await axios.post<SignupResponse>(
        "http://127.0.0.1:5000/auth/signup",
        {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      toast.success(data.message);
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "An error occurred while logging in"
      );
    }
  },
})(InnerForm);

const SignupPage = () => {
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
              <p className="text-bold text-center m-0">Sign up</p>
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

export default SignupPage;
