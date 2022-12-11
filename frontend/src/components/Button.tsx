import styled from "styled-components";
import STYLES from "../Styles";

type ButtonProps = {
  btnBg: string;
  btnColor: string;
  btnColorHover: string;
};
const Button = styled.button<ButtonProps>`
  background: ${(props) => props.btnBg};
  color: ${(props) => props.btnColor};
  border: none;
  border-radius: ${STYLES.smallBorderRadius + "em"};
  padding-top: ${STYLES.sectionPadding + "em"};
  padding-bottom: ${STYLES.sectionPadding + "em"};
  font: inherit;
  cursor: pointer;
  outline: inherit;
  width: 100%;
  -webkit-transition: 0.2s ease all;
  transition: 0.2s ease all;
  &:hover {
    background: ${(props) => props.btnColorHover};
  }
`;

type StyledButtonProps = {
  color: string;
  background: string;
  hoverBackground: string;
  value: string;
};
const StyledButton = ({
  background,
  color,
  hoverBackground,
  value,
}: StyledButtonProps) => {
  return (
    <Button btnBg={background} btnColor={color} btnColorHover={hoverBackground}>
      {value}
    </Button>
  );
};

export default StyledButton;
