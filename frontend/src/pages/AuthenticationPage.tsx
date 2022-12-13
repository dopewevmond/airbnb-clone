/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from "../components/Navbar";
import MainAuthForm from "../components/MainAuthForm";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import Footer from "../components/Footer";

function AuthenticationPage() {
  return (
    <>
      <Navbar />
      {/* <SignupForm /> */}
      {/* <LoginForm /> */}
      <MainAuthForm />
      <Footer />
    </>
  );
}

export default AuthenticationPage;
