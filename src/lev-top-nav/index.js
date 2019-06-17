import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import CrownLogo from '@govuk-react/icon-crown';
import HOLogo from './home-office.svg';
import TopNav, { asTopNavAnchor, asNavLinkAnchor } from '@govuk-react/top-nav';

const LogoLink = asTopNavAnchor(Link);
const NavLink= asNavLinkAnchor(Link);
const NavAnchor= asNavLinkAnchor('a');

import styled from 'styled-components';

const WideTopNav = styled(TopNav)`
  > div {
    max-width: none;
  }

  ul {
    width: 100%;

    li:last-child {
      margin: -1.9em 0 0 auto;
    }
  }
`;

const WideTopNavWrapper = styled.div`
  > div {
    max-width: none;
  }
`;

const HOTopNavWrapper = styled(WideTopNavWrapper)`
  > div {
    border-color: #9325b2;
  }
`;

const StyledHOLogo = styled(HOLogo)`
  margin-top: -6px;
  margin-bottom: -12px;
`;

const LevTopNav = props => {
  let TopNavWrapper = WideTopNavWrapper;
  let Logo = CrownLogo;
  let logoWidth = 36;
  let logoHeight = 32;
  switch (props.department) {
    case 'HMPO':
    case 'Home Office':
      TopNavWrapper = HOTopNavWrapper;
      Logo = StyledHOLogo;
      logoHeight = 44;
      break;
  }

  const IconTitle = <TopNav.IconTitle icon={<Logo width={logoWidth} height={logoHeight} />}>{props.companyText}</TopNav.IconTitle>;
  const CompanyLink = props.companyLink ? <LogoLink to={props.companyLink}>{IconTitle}</LogoLink> : IconTitle;

  const ServiceTitleLink = (
    <NavLink to={props.serviceTitleLink}>
      {props.serviceTitleText}
    </NavLink>
  );

  const link = props.links.map(e => <NavLink to={e.link}>{e.text}</NavLink>);

  return <BrowserRouter>
    <TopNavWrapper>
      <WideTopNav company={CompanyLink} serviceTitle={ServiceTitleLink} {...props}>
        {props.links.map(e => <NavLink to={e.link}>{e.text}</NavLink>)}
        {props.children}
        {props.signOutLink && <NavAnchor href={props.signOutLink}>{props.signOutText}</NavAnchor>}
      </WideTopNav>
    </TopNavWrapper>
  </BrowserRouter>;
};

LevTopNav.defaultProps = {
  companyText: '',
  serviceTitleLink: '/',
  serviceTitleText: '',
  signOutText: 'Sign out',
  links: []
};

export default LevTopNav;
export { asTopNavAnchor, asNavLinkAnchor };
