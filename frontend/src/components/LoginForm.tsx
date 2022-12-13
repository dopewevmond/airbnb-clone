import styled from "styled-components";
import STYLES from "../Styles";

const LoginForm = () => {
  return (
    <LoginFormContainer>
      <div className="border-bottom">
        <p className="font-bold text-center">Welcome back, John</p>
      </div>
      <div className="form-content">
        <form noValidate>
          <div className="input-container">
            <input
              className="input-field"
              placeholder="Password"
              type={"password"}
            />
            <span className="input-label floating-label">Password</span>
            <span className="show-hide-password">{<>show</>}</span>
          </div>

          <div className="vertically-padded w-100">
            <button className="styled-button" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </LoginFormContainer>
  );
};

export default LoginForm;

const LoginFormContainer = styled.div`
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
  .input-label {
    position: absolute;
    pointer-events: none;
    left: ${STYLES.elementSpacing * 0.55 + "em"};
    top: 18px;
    transition: 0.2s ease all;
    opacity: 0.3;
  }
  .show-hide-password {
    position: absolute;
    right: 0.7em;
    top: 1.75em;
    font-size: 0.7em;
    text-decoration: underline;
    cursor: pointer;
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
    border: 1.5px solid ${STYLES.borderColor};
    border-radius: ${STYLES.smallBorderRadius + "em"};
    padding: ${STYLES.elementSpacing * 0.5 + "em"};
    &:focus ~ .floating-label,
    &:not(:placeholder-shown) ~ .floating-label {
      top: 5px;
      left: ${STYLES.elementSpacing * 0.7 + "em"};
      font-size: 0.8em;
      opacity: 0.6;
    }
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
