import styled from "styled-components";
import STYLES from "../Styles";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
const InputLabel = styled.span`
  position: absolute;
  pointer-events: none;
  left: ${STYLES.sectionPadding * 1.1 + 'em'};
  top: 18px;
  transition: 0.2s ease all;
  opacity: 0.3;
`;
const InputField = styled.input`
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
  padding: ${STYLES.sectionPadding + "em"};

  &:focus ~ .floating-label, &:not(:placeholder-shown) ~ .floating-label {
    top: 5px;
    left: ${STYLES.sectionPadding * 1.25 + 'em'};
    font-size: 0.8em;
    opacity: 0.6;
  }
`;
type InputProps = {
  placeholder: string;
};
const StyledInput = ({ placeholder }: InputProps) => {
  return (
    <InputContainer>
      <InputField placeholder={placeholder} />
      <InputLabel className="floating-label">{placeholder}</InputLabel>
    </InputContainer>
  );
};

export default StyledInput;
