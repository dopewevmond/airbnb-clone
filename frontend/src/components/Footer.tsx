import styled from "styled-components";

const Row = styled.div`
  display: none;
  @media (min-width: 740px) {
    display: flex;
    flex-flow: column wrap;
  }
  @media (min-width: 1128px) {
    flex-direction: row;
    gap: 4%;
    > * {
      flex-grow: 1;
      flex-basis: 22%;
    }
  }
`;
const UnstyledList = styled.ul`
  @media (min-width: 740px) {
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-flow: row wrap;
    gap: 3.33%;
    > * {
      flex-basis: 30%;
    }
  }
  @media (min-width: 1128px) {
    flex-direction: column;
    justify-content: flex-start;
    gap: unset;
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
`;
const FooterSectionHeader = styled.p`
  font-weight: bold;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
`;

const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#d7d7d7" }}>
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
          </div>
        </Row>
        <hr />

      </div>
    </footer>
  );
};

export default Footer;
