import { NavLink, useMatch } from 'react-router-dom';
import styles from '../pages/profilePage/profile-page.module.css';

interface CustomNavLinkProps {
  to: string;
  activeClass: string;
  children: React.ReactNode;
  }

export const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, activeClass, children, ...props }) => {
  const match = useMatch(to);
  const isActive = match ? activeClass : '';
  const baseClasses = `${styles.link} text_type_main-medium text_color_inactive text`;

  return (
    <NavLink to={to} className={`${baseClasses} ${isActive}`} {...props}>
      {children}
    </NavLink>
  );
};