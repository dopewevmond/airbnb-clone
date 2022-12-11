import styled from "styled-components";
import STYLES from "../Styles";
import StyledInput from "./Input";
import StyledButton from "./Button";

const LoginFormContainer = styled.div`
  width: 90%;
  margin: ${STYLES.elementSpacing * 2 + "em"} auto
    ${STYLES.elementSpacing + "em"};
  max-width: ${STYLES.maxWidthMediumContainer + "em"};
  border: 1px solid ${STYLES.borderColor};
  border-radius: 20px;
`;
const HasBorderBottom = styled.div`
  border-bottom: 1px solid ${STYLES.borderBottomColor};
  padding: ${STYLES.elementSpacing * 0.5 + "em"};
`;
const FormContent = styled.div`
  padding: ${STYLES.elementSpacing + "em"};
`;
const VerticallyPadded = styled.div`
  padding: ${STYLES.elementPadding + "em"} 0;
`;
const MainAuthForm = () => {
  return (
    <LoginFormContainer>
      <HasBorderBottom>
        <p className="font-bold text-center">Log in or sign up</p>
      </HasBorderBottom>
      <FormContent>
        <VerticallyPadded>
          <h4>Welcome to Airbnb</h4>
        </VerticallyPadded>
        <form noValidate>
          <StyledInput placeholder="Email" />
          <VerticallyPadded className="w-100">
            <StyledButton
              background={STYLES.mainBackgroundColor}
              color="#fff"
              value="Continue"
              hoverBackground={STYLES.hoverBackgroundColor}
            />
          </VerticallyPadded>
        </form>
      </FormContent>
    </LoginFormContainer>
  );
};

export default MainAuthForm;
