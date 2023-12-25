import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

const FlexAlignCentre = css`
  display: flex;
  align-items: center;
`

const FontRajdhani = css`
  font-family: Rajdhani, sans-serif;
  font-weight: 700;
`

export const NavContainer = styled.nav`
  ${FlexAlignCentre}
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: #050e1b;
  height: 50px;
  z-index: 2;
  box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.80);
`

export const NavLinks = styled.ul`
  display: flex;
  height: 100%;
  margin-left: 2rem;

  li {
    height: 100%;
  }
`

export const NavLinkItem = styled(Link)`
  ${FontRajdhani}
  ${FlexAlignCentre}
  height: 100%;
  padding: 0 15px;
  position: relative;
  color: var(--primary-orange);
  font-size: 1.2rem;

  &:hover {
    color: #fff;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--primary-orange);
    transform: scaleX(0);
    transition: transform 0.20s ease-in-out;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`

export const LogoWrapper = styled.div`
  ${FlexAlignCentre}
  height: 100%;
  margin-left: 1rem;
  color: var(--primary-brand-color);
  font-weight: 700;
  font-size: 1.3rem;
  font-family: Electrolize, sans-serif;

  svg {
    height: 90%;
    fill: var(--primary-brand-color);
  }
`

export const NavAuthSection = styled.section`
  ${FlexAlignCentre}
  margin-left: auto;
`

export const UserEmail = styled.p`
  font-size: 0.9rem;

  span {
    color: #3FE7F1;
  }
`

export const NavButton = styled.button`
  ${FontRajdhani}
  color: #fff;
  background-color: rgb(241, 100, 54);
  margin: 1em;
  padding: 0.25em 1em;
  border: 0;
  border-radius: 3px;

  @media (max-width: 600px) {
    position: relative;
    display: flex;
    margin-right: 5px;
  }
`
