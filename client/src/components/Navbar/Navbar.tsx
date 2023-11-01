import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

const getLinkClass = ({ isActive }: { isActive: boolean }) =>
  classNames('navbar-item', { 'has-background-grey-lighter': isActive });

const getLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? '#000' : '',
  '&:hover': {
    color: '#000',
  },
});

export const Navbar = () => {
  return (
    <nav
      data-cy="nav"
      className="navbar is-fixed-top has-shadow"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <NavLink to="/" className={getLinkClass} style={getLinkStyle}>
            Home
          </NavLink>
          <NavLink to="tickers" className={getLinkClass} style={getLinkStyle}>
            Tickers
          </NavLink>
          <NavLink to="info" className={getLinkClass} style={getLinkStyle}>
            Info
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
