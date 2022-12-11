import styled from "styled-components";
import STYLES from "../Styles";
import { useState, useEffect } from "react";

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`;
const InputLabel = styled.span`
  position: absolute;
  pointer-events: none;
  left: ${STYLES.elementSpacing * 0.55 + "em"};
  top: 18px;
  transition: 0.2s ease all;
  opacity: 0.3;
`;
const ToggleInputType = styled.span`
  position: absolute;
  right: 0.7em;
  top: 1.75em;
  font-size: 0.7em;
  text-decoration: underline;
  cursor: pointer;
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
  padding: ${STYLES.elementSpacing * 0.5 + "em"};

  &:focus ~ .floating-label,
  &:not(:placeholder-shown) ~ .floating-label {
    top: 5px;
    left: ${STYLES.elementSpacing * 0.7 + "em"};
    font-size: 0.8em;
    opacity: 0.6;
  }
`;
type InputProps = {
  placeholder: string;
  hidden?: boolean;
};
const StyledInput = ({ placeholder, hidden }: InputProps) => {
  const [inputType, toggleInputType] = useState("text");
  useEffect(() => {
    if (hidden === true) {
      toggleInputType("password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function toggleInput() {
    if (inputType === "text") {
      toggleInputType("password");
    } else {
      toggleInputType("text");
    }
  }
  return (
    <InputContainer>
      <InputField placeholder={placeholder} type={inputType} />
      <InputLabel className="floating-label">{placeholder}</InputLabel>
      {hidden ? (
        <ToggleInputType onClick={toggleInput}>
          {inputType === "text" ? <>hide</> : <>show</>}
        </ToggleInputType>
      ) : (
        <></>
      )}
    </InputContainer>
  );
};

export default StyledInput;
