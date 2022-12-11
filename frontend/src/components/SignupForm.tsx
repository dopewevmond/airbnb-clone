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

const SignupForm = () => {
  return (
    <LoginFormContainer>
      <HasBorderBottom>
        <p className="font-bold text-center">Finish signing up</p>
      </HasBorderBottom>
      <FormContent>
        <form noValidate>
          <VerticallyPadded>
            <StyledInput placeholder="First name" />
          </VerticallyPadded>
          <VerticallyPadded>
            <StyledInput placeholder="Last name" />
          </VerticallyPadded>
          <VerticallyPadded>
            <StyledInput placeholder="Email" />
          </VerticallyPadded>
          <VerticallyPadded>
            <StyledInput placeholder="Password" hidden={true} />
          </VerticallyPadded>
          <VerticallyPadded className="w-100">
            <StyledButton
              background={STYLES.mainBackgroundColor}
              color="#fff"
              value="Sign up"
              hoverBackground={STYLES.hoverBackgroundColor}
            />
          </VerticallyPadded>
        </form>
      </FormContent>
    </LoginFormContainer>
  );
};

export default SignupForm;
