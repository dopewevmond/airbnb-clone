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
    padding: ${STYLES.elementSpacing * 2 + "em"} 0
      ${STYLES.elementSpacing + "em"};
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
  font-size: ${STYLES.smallFontSize + "em"};
  margin-top: 0.4em;
  margin-bottom: 0.4em;
`;
const HideOnLargeDevices = styled.div`
  display: block;
  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    display: none;
  }
`;
const ShowOnLargeDevices = styled.div`
  display: none;
  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    display: block;
  }
`;
const ShowInlineOnLargeDevices = styled.div`
  display: none;
  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    display: inline;
  }
`;
const HrLightColor = styled.div`
  border-bottom: 1px solid ${STYLES.borderColor};
  margin: ${STYLES.elementSpacing * 0.8 + "em"} 0;
`;
const ExtraLinksContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  gap: 1em;
  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    flex-flow: row-reverse wrap;
    justify-content: space-between;
    gap: unset;
  }
`;
const SocialIconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 3em;
  color: #373737;
  > * {
    color: inherit;
  }
`;
const Language = styled.div`
  display: flex;
  align-items: center;
`;
const GlobeButton = styled.span`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SocialIcons = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 1.4em;
  align-items: center;
`;
const SitemapContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-content: center;

  @media (min-width: ${FOOTER_BREAKPOINT_LG}) {
    flex-flow: row wrap;
    align-items: center;
    gap: 1em;
  }
`;
const SmallCenteredText = styled.div`
  text-align: center;
  font-size: ${STYLES.smallFontSize * 1.1 + "em"};
`;
const SitemapEtc = styled.div``;

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
        <ShowOnLargeDevices>
          <HrLightColor />
        </ShowOnLargeDevices>
        <ExtraLinksContainer>
          <SocialIconsContainer>
            <Language>
              <GlobeButton>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentcolor"
                  aria-hidden="true"
                  display="block"
                  viewBox="0 0 16 16"
                  style={{ height: 20, width: 20 }}
                >
                  <path d="M8.002.25a7.77 7.77 0 017.748 7.776 7.75 7.75 0 01-7.521 7.72l-.246.004a7.75 7.75 0 01-7.73-7.513L.25 7.992A7.75 7.75 0 018.002.25zm1.949 8.5H6.048c.155 2.897 1.176 5.343 1.886 5.493l.068.007c.68-.002 1.72-2.365 1.932-5.23zm4.255 0h-2.752c-.091 1.96-.53 3.783-1.188 5.076a6.257 6.257 0 003.905-4.829zm-9.661 0h-2.75a6.257 6.257 0 003.934 5.075c-.615-1.208-1.036-2.875-1.162-4.686l-.022-.39zm1.188-6.576l-.115.046a6.257 6.257 0 00-3.823 5.03h2.75c.085-1.83.471-3.54 1.059-4.81zm2.262-.424c-.702.002-1.784 2.512-1.947 5.5h3.904C9.796 4.347 8.774 1.907 8.06 1.756l-.065-.007zm2.28.432l.023.05c.643 1.288 1.069 3.084 1.157 5.018h2.748a6.275 6.275 0 00-3.929-5.068z"></path>
                </svg>
              </GlobeButton>
              <ButtonsAsLinks className="font-bold">
                &nbsp;English (US)
              </ButtonsAsLinks>
            </Language>
            <ButtonsAsLinks className="font-bold"> $ USD</ButtonsAsLinks>
            <SocialIcons>
              <li>
                <a href="facebook.com/airbnb">
                  <svg
                    fill="currentcolor"
                    aria-hidden="false"
                    aria-label="Navigate to Facebook"
                    display="block"
                    viewBox="0 0 32 32"
                    style={{ height: 18, width: 18 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 14.41v-4.17c0-.42.35-.81.77-.81h2.52V7.35c0-4.84 2.48-7.31 7.42-7.35 1.65 0 3.22.21 4.69.64.46.14.63.42.6.88l-.56 4.06c-.04.18-.14.35-.32.53-.21.11-.42.18-.63.14-.88-.25-1.78-.35-2.8-.35-1.4 0-1.61.28-1.61 1.73v1.8h4.52c.42 0 .81.42.81.88l-.35 4.17c0 .42-.35.71-.77.71h-4.21v16c0 .42-.35.81-.77.81H12.1c-.42 0-.8-.39-.8-.81v-16H8.78a.78.78 0 01-.78-.78"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="twitter.com/airbnb">
                  <svg
                    fill="currentcolor"
                    aria-hidden="false"
                    aria-label="Navigate to Twitter"
                    display="block"
                    viewBox="0 0 32 32"
                    style={{ height: 18, width: 18 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M31 6.36c-1.16.49-2.32.82-3.55.95 1.29-.76 2.22-1.87 2.72-3.38a13.05 13.05 0 01-3.91 1.51c-1.23-1.28-2.75-1.94-4.51-1.94-3.41 0-6.17 2.73-6.17 6.12 0 .49.07.95.17 1.38-4.94-.23-9.51-2.6-12.66-6.38-.56.95-.86 1.97-.86 3.09 0 2.07 1.03 3.91 2.75 5.06-1-.03-1.92-.3-2.82-.76v.07c0 2.89 2.12 5.42 4.94 5.98-.63.17-1.16.23-1.62.23-.3 0-.7-.03-1.13-.13a6.07 6.07 0 005.74 4.24c-2.22 1.74-4.78 2.63-7.66 2.63-.56 0-1.06-.03-1.43-.1 2.85 1.84 6 2.76 9.41 2.76 7.29 0 12.83-4.01 15.51-9.3 1.36-2.66 2.02-5.36 2.02-8.09v-.46c-.03-.17-.03-.3-.03-.33A12.66 12.66 0 0031 6.35"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="instagram.com/airbnb">
                  <svg
                    fill="currentcolor"
                    aria-hidden="false"
                    aria-label="Navigate to Instagram"
                    display="block"
                    viewBox="0 0 24 24"
                    style={{ height: 18, width: 18 }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M23.09.91C22.48.3 21.76 0 20.92 0H3.08C2.23 0 1.51.3.91.91S0 2.24 0 3.08v17.84c0 .85.3 1.57.91 2.17s1.33.91 2.17.91h17.84c.85 0 1.57-.3 2.17-.91s.91-1.33.91-2.17V3.08c0-.85-.3-1.57-.91-2.17zM8.61 8.65c.94-.91 2.08-1.37 3.4-1.37 1.33 0 2.47.46 3.41 1.37s1.41 2.01 1.41 3.3-.47 2.39-1.41 3.3-2.08 1.37-3.41 1.37c-1.32 0-2.46-.46-3.4-1.37s-1.41-2.01-1.41-3.3.47-2.39 1.41-3.3zm12.66 11.63c0 .27-.09.5-.28.68a.92.92 0 01-.67.28H3.62a.93.93 0 01-.68-.28.92.92 0 01-.27-.68V10.15h2.2a6.74 6.74 0 00-.31 2.05c0 2 .73 3.71 2.19 5.12s3.21 2.12 5.27 2.12a7.5 7.5 0 003.75-.97 7.29 7.29 0 002.72-2.63 6.93 6.93 0 001-3.63c0-.71-.11-1.39-.31-2.05h2.11v10.12zm0-13.95c0 .3-.11.56-.31.77a1.05 1.05 0 01-.77.31h-2.72c-.3 0-.56-.11-.77-.31a1.05 1.05 0 01-.31-.77V3.75c0-.29.11-.54.31-.76s.47-.32.77-.32h2.72c.3 0 .56.11.77.32s.31.47.31.76z"
                    ></path>
                  </svg>
                </a>
              </li>
            </SocialIcons>
          </SocialIconsContainer>
          <SitemapContainer>
            <SmallCenteredText>
              <span>&copy;{new Date().getFullYear()} Airbnb, Inc.</span>
            </SmallCenteredText>
            <SitemapEtc>
              <ShowInlineOnLargeDevices>
                <span>&nbsp;•&nbsp;</span>
              </ShowInlineOnLargeDevices>
              <ButtonsAsLinks>Privacy</ButtonsAsLinks>
              <span>&nbsp;•&nbsp;</span>
              <ButtonsAsLinks>Terms</ButtonsAsLinks>
              <span>&nbsp;•&nbsp;</span>
              <ButtonsAsLinks>Sitemap</ButtonsAsLinks>
            </SitemapEtc>
          </SitemapContainer>
        </ExtraLinksContainer>
      </div>
    </StyledFooter>
  );
};

export default Footer;
