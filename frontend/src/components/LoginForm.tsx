import styled from "styled-components";
import STYLES from "../Styles";
import StyledInput from "./Input";
import StyledButton from "./Button";

const LoginFormContainer = styled.div`
  width: 90%;
  margin: ${STYLES.sectionMarginTopBottom + "em"} auto
    ${STYLES.sectionMarginTopBottom + "em"};
  max-width: ${STYLES.maxWidthMediumContainer + "em"};
  border: 1px solid ${STYLES.borderColor};
  border-radius: 20px;
`;
const HasBorderBottom = styled.div`
  border-bottom: 1px solid ${STYLES.borderBottomColor};
  padding: ${STYLES.sectionPadding + "em"};
`;
const FormContent = styled.div`
  padding: ${STYLES.sectionPadding * 2 + "em"};
`;
const VerticallyPadded = styled.div`
  padding: ${STYLES.elementPadding + "em"} 0;
`;
const LoginForm = () => {
  return (
    <LoginFormContainer>
      <HasBorderBottom>
        <p className="font-bold text-center">Log in or sign up</p>
      </HasBorderBottom>
      <FormContent>
        <VerticallyPadded>
          <h2>Welcome to Airbnb</h2>
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

export default LoginForm;
