import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { useNavigate } from 'react-router-dom'
import { LogoWrapper, NavContainer, NavLinkItem, NavLinks, NavButton, UserEmail, NavAuthSection } from './style';
import UserAuth from '../../api/UserAuth';

const NAV_LINKS = [
  {
    name: 'Public Listings',
    href: '/listings/public',
    public: true,
  },
  {
    name: 'Hosted Listings',
    href: '/listings/hosted',
    public: false,
  }
]

const Navbar = () => {
  const { token, email, setToken, setEmail } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await UserAuth.logoutUser(token);
      setToken('');
      setEmail('');
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      navigate('/');
    } catch (error) {
      alert(error);
    }
  }

  const login = () => {
    navigate('/auth/login');
  }

  return (
    <NavContainer>
      {/* Logo Section */}
      <LogoWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="64" height="64" viewBox="0 0 64 64">
          <path d="M 30.996094 6.015625 C 30.933594 6.015625 30.875 6.019531 30.8125 6.03125 C 30.75 6.046875 30.6875 6.0625 30.625 6.085938 C 30.566406 6.113281 30.511719 6.144531 30.453125 6.179688 C 30.425781 6.199219 30.386719 6.207031 30.359375 6.230469 L 18 16.460938 L 18 13.058594 C 18 12.503906 17.554688 12.058594 17 12.058594 C 16.445313 12.058594 16 12.503906 16 13.058594 L 16 18.058594 C 16 18.074219 16.007813 18.089844 16.011719 18.109375 L 14 19.769531 L 14 9.054688 C 14 8.503906 13.554688 8.054688 13 8.054688 C 12.445313 8.054688 12 8.503906 12 9.054688 L 12 21.058594 C 12 21.167969 12.03125 21.273438 12.0625 21.375 L 1.359375 30.230469 C 0.933594 30.582031 0.878906 31.210938 1.226563 31.636719 C 1.425781 31.875 1.714844 32 2 32 C 2.226563 32 2.453125 31.925781 2.640625 31.769531 L 6 28.988281 L 6 54 L 3 54 C 2.445313 54 2 54.449219 2 55 C 2 55.550781 2.445313 56 3 56 L 59 56 C 59.554688 56 60 55.550781 60 55 C 60 54.449219 59.554688 54 59 54 L 56 54 L 56 28.988281 L 59.359375 31.769531 C 59.546875 31.925781 59.773438 32 60 32 C 60.285156 32 60.570313 31.875 60.769531 31.640625 C 61.121094 31.210938 61.0625 30.582031 60.636719 30.230469 L 31.636719 6.230469 C 31.609375 6.207031 31.574219 6.199219 31.542969 6.179688 C 31.484375 6.140625 31.429688 6.109375 31.363281 6.085938 C 31.304688 6.0625 31.25 6.046875 31.1875 6.03125 C 31.125 6.019531 31.0625 6.015625 30.996094 6.015625 Z M 31 8.296875 L 54 27.332031 L 54 44 L 38 44 L 38 36 C 38 34.898438 37.101563 34 36 34 L 26 34 C 24.898438 34 24 34.898438 24 36 L 24 44 L 8 44 L 8 27.332031 Z M 31 18 C 28.242188 18 26 20.242188 26 23 C 26 25.757813 28.242188 28 31 28 C 33.757813 28 36 25.757813 36 23 C 36 20.242188 33.757813 18 31 18 Z M 31 19.792969 C 32.769531 19.792969 34.207031 21.230469 34.207031 23 C 34.207031 24.769531 32.769531 26.207031 31 26.207031 C 29.230469 26.207031 27.792969 24.769531 27.792969 23 C 27.792969 21.230469 29.230469 19.792969 31 19.792969 Z M 26 36 L 36 36 L 36 53.949219 L 26 53.949219 Z M 33 43 C 32.445313 43 32 43.449219 32 44 L 32 46 C 32 46.550781 32.445313 47 33 47 C 33.554688 47 34 46.550781 34 46 L 34 44 C 34 43.449219 33.554688 43 33 43 Z M 8 46 L 24 46 L 24 54 L 8 54 Z M 38 46 L 54 46 L 54 54 L 38 54 Z M 11 48 C 10.445313 48 10 48.449219 10 49 L 10 51 C 10 51.550781 10.445313 52 11 52 C 11.554688 52 12 51.550781 12 51 L 12 49 C 12 48.449219 11.554688 48 11 48 Z M 16 48 C 15.445313 48 15 48.449219 15 49 L 15 51 C 15 51.550781 15.445313 52 16 52 C 16.554688 52 17 51.550781 17 51 L 17 49 C 17 48.449219 16.554688 48 16 48 Z M 21 48 C 20.445313 48 20 48.449219 20 49 L 20 51 C 20 51.550781 20.445313 52 21 52 C 21.554688 52 22 51.550781 22 51 L 22 49 C 22 48.449219 21.554688 48 21 48 Z M 41 48 C 40.445313 48 40 48.449219 40 49 L 40 51 C 40 51.550781 40.445313 52 41 52 C 41.554688 52 42 51.550781 42 51 L 42 49 C 42 48.449219 41.554688 48 41 48 Z M 46 48 C 45.445313 48 45 48.449219 45 49 L 45 51 C 45 51.550781 45.445313 52 46 52 C 46.554688 52 47 51.550781 47 51 L 47 49 C 47 48.449219 46.554688 48 46 48 Z M 51 48 C 50.445313 48 50 48.449219 50 49 L 50 51 C 50 51.550781 50.445313 52 51 52 C 51.554688 52 52 51.550781 52 51 L 52 49 C 52 48.449219 51.554688 48 51 48 Z"></path>
        </svg>
        airBrB
      </LogoWrapper>

      {/* Nav Links Section */}
      <NavLinks>
        {NAV_LINKS
          .filter((link) => {
            return link.public || (token && !link.public);
          })
          .map((link, idx) => {
            const { name, href } = link;
            return (
              <li key={idx}>
                <NavLinkItem to={href}>{name}</NavLinkItem>
              </li>
            )
          })
        }
      </NavLinks>
      <NavAuthSection>
        {
          email &&
          <UserEmail>Logged in as <span>{email}</span></UserEmail>
        }

        {/* Log In/Log Out Button */}
        {token === ''
          ? (<NavButton name='login' onClick={login}>Log In</NavButton>)
          : (<NavButton name='logout' onClick={logout}>Log Out</NavButton>)
        }
      </NavAuthSection>
    </NavContainer>
  )
}

export default Navbar;