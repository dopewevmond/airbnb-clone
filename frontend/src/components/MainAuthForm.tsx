import styled from "styled-components";
import STYLES from "../Styles";
import { FC, useState, ChangeEvent, FormEvent } from "react";

type AuthFormProps = {
  inputTouched: boolean;
  emailValidated: boolean;
};
const AuthFormContainer = styled.div<AuthFormProps>`
  width: 90%;
  margin: ${STYLES.elementSpacing * 2 + "em"} auto
    ${STYLES.elementSpacing + "em"};
  max-width: ${STYLES.maxWidthMediumContainer + "em"};
  border: 1px solid ${STYLES.borderColor};
  border-radius: 20px;

  .border-bottom {
    border-bottom: 1px solid ${STYLES.borderBottomColor};
    padding: ${STYLES.elementSpacing * 0.5 + "em"};
  }
  .form-content {
    padding: ${STYLES.elementSpacing + "em"};
  }
  .vertically-padded {
    padding: ${STYLES.elementPadding + "em"} 0;
  }
  .input-container {
    position: relative;
    width: 100%;
  }
  .input-field {
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    width: 100%;
    border: 1.5px solid ${(props) => (props.inputTouched && !props.emailValidated) ? STYLES.mainBackgroundColor : STYLES.borderColor};
    border-radius: ${STYLES.smallBorderRadius + "em"};
    padding: ${STYLES.elementSpacing * 0.5 + "em"};
    &:focus ~ .input-label,
    &:not(:placeholder-shown) ~ .input-label {
      top: 5px;
      left: ${STYLES.elementSpacing * 0.7 + "em"};
      font-size: 0.8em;
      opacity: 0.6;
      font-weight: bold;
    }
  }
  .input-label {
    position: absolute;
    pointer-events: none;
    left: ${STYLES.elementSpacing * 0.55 + "em"};
    top: 18px;
    transition: 0.2s ease all;
    opacity: 0.3;
    color: ${(props) => (props.inputTouched && !props.emailValidated) ? 'red' : STYLES.borderColor};
  }
  .styled-button {
    background: ${STYLES.mainBackgroundColor};
    color: white;
    border: none;
    border-radius: ${STYLES.smallBorderRadius + "em"};
    padding-top: ${STYLES.elementSpacing * 0.5 + "em"};
    padding-bottom: ${STYLES.elementSpacing * 0.5 + "em"};
    font: inherit;
    cursor: pointer;
    outline: inherit;
    width: 100%;
    -webkit-transition: 0.2s ease all;
    transition: 0.2s ease all;
    &:hover {
      background: ${STYLES.hoverBackgroundColor};
    }
  }
`;

const MainAuthForm: FC = () => {
  const [value, setValue] = useState("");
  const [isValidEmail, setValidEmail] = useState(false);
  const [touched, setTouched] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!touched) {
      setTouched(!touched);
    }
    setValue(e.target.value);
    setValidEmail(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        value
      )
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    console.log({ value })
  }

  return (
    <AuthFormContainer inputTouched={touched} emailValidated={isValidEmail}>
      <div className="border-bottom">
        <p className="font-bold text-center">Log in or sign up</p>
      </div>
      <div className="form-content">
        <div className="vertically-padded">
          <h4>Welcome to Airbnb</h4>
        </div>
        <form noValidate onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              id="email"
              name="email"
              value={value}
              onChange={handleChange}
            />
            <span className="input-label">Email</span>
          </div>
          <div className="vertically-padded w-100">
            <button className="styled-button" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </AuthFormContainer>
  );
};

export default MainAuthForm;
