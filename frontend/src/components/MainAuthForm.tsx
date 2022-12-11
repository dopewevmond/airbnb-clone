import styled from "styled-components";
import STYLES from "../Styles";

const AuthFormContainer = styled.div`
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
    border: 1.5px solid ${STYLES.borderColor};
    border-radius: ${STYLES.smallBorderRadius + "em"};
    padding: ${STYLES.elementSpacing * 0.5 + "em"};
    &:focus ~ .input-label,
    &:not(:placeholder-shown) ~ .input-label {
      top: 5px;
      left: ${STYLES.elementSpacing * 0.7 + "em"};
      font-size: 0.8em;
      opacity: 0.6;
    }
  }
  .input-label {
    position: absolute;
    pointer-events: none;
    left: ${STYLES.elementSpacing * 0.55 + "em"};
    top: 18px;
    transition: 0.2s ease all;
    opacity: 0.3;
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
const MainAuthForm = () => {
  return (
    <AuthFormContainer>
      <div className="border-bottom">
        <p className="font-bold text-center">Log in or sign up</p>
      </div>
      <div className="form-content">
        <div className="vertically-padded">
          <h4>Welcome to Airbnb</h4>
        </div>
        <form noValidate>
          <div className="input-container">
            <input type="text" className="input-field" placeholder="Email" />
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
