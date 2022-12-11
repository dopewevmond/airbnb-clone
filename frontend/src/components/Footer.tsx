import styled from "styled-components";
import STYLES from "../Styles";

const FOOTER_BREAKPOINT_LG = "1128px";
const FOOTER_BREAKPOINT_MD = "740px";

const StyledFooter = styled.footer`
  display: none;
  @media (min-width: ${FOOTER_BREAKPOINT_MD}) {
    display: block;
    background-color: #f7f7f7;
    border-top: 1px solid #dddddd;
    padding: ${STYLES.elementSpacing * 2 + "em"} 0;
  }
`;
const Row = styled.div`
  display: none;
  @media (min-width: ${FOOTER_BREAKPOINT_MD}) {
    display: flex;
    flex-flow: column wrap;
    justify-items: flex-start;
  }
  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    flex-direction: row;
    gap: 4%;
    > * {
      flex-basis: 22%;
    }
  }
`;
const UnstyledList = styled.ul`
  @media (min-width: ${FOOTER_BREAKPOINT_MD}) {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-flow: row wrap;
    gap: 0.6em 3.33%;
    > * {
      flex-basis: 30%;
    }
    button {
      color: #222222;
    }
  }
  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    flex-direction: column;
    justify-content: flex-start;
    gap: 1em;
    > * {
      flex-basis: 100%;
    }
  }
`;
const ButtonsAsLinks = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: inherit;
  text-align: left;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const FooterSectionHeader = styled.p`
  font-weight: bold;
  font-size: 0.9em;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
`;
const HideOnLargeDevices = styled.div`
  display: block;
  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    display: none;
  }
`;
const HrLightColor = styled.div`
  border-bottom: 1px solid ${STYLES.borderColor};
  margin: ${STYLES.elementSpacing + 'em'} 0;
`;

const Footer = () => {
  return (
    <StyledFooter>
      <div className="container">
        <Row>
          <div>
            <FooterSectionHeader>Support</FooterSectionHeader>
            <UnstyledList>
              <li>
                <ButtonsAsLinks>Help Center</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Air Cover</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>
                  Supporting people with disabities
                </ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Cancellation Options</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Our Covid-19 Response</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Report a neighborhood concern</ButtonsAsLinks>
              </li>
            </UnstyledList>
            <HideOnLargeDevices>
              <HrLightColor />
            </HideOnLargeDevices>
          </div>
          <div>
            <FooterSectionHeader>Community</FooterSectionHeader>
            <UnstyledList>
              <li>
                <ButtonsAsLinks>
                  Airbnb.org: disaster relief housing
                </ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Combating Discrimination</ButtonsAsLinks>
              </li>
            </UnstyledList>
            <HideOnLargeDevices>
              <HrLightColor />
            </HideOnLargeDevices>
          </div>
          <div>
            <FooterSectionHeader>Hosting</FooterSectionHeader>
            <UnstyledList>
              <li>
                <ButtonsAsLinks>Airbnb your home</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Aircover for Hosts</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Explore hosting resources</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Visit our community forum</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>How to host responsibly</ButtonsAsLinks>
              </li>
            </UnstyledList>
            <HideOnLargeDevices>
              <HrLightColor />
            </HideOnLargeDevices>
          </div>
          <div>
            <FooterSectionHeader>Airbnb</FooterSectionHeader>
            <UnstyledList>
              <li>
                <ButtonsAsLinks>Newsroom</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Learn about new features</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Letter from our founders</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Careers</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Investors</ButtonsAsLinks>
              </li>
              <li>
                <ButtonsAsLinks>Gift cards</ButtonsAsLinks>
              </li>
            </UnstyledList>
            <HideOnLargeDevices>
              <HrLightColor />
            </HideOnLargeDevices>
          </div>
        </Row>
      </div>
    </StyledFooter>
  );
};

export default Footer;
