import NavLink from "components/nav-link";
import Features from "components/features";
import Hero from "components/hero";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuth } from "contexts/auth-context";
import s from "./style.module.css";

const HomeComponent = () => {
  const [showNav, setShowNav] = useState(false);

  const { user, login, logout } = useAuth();

  return (
    <div className={s.home}>
      <div className={s.menuButton} onClick={() => setShowNav(!showNav)}>
        {showNav ? <AiOutlineClose /> : <AiOutlineMenu />}
      </div>
      <header className={showNav ? `${s.header} ${s.headerActive}` : s.header}>
        <NavLink href="/" className={s.logo}>
          MIC
        </NavLink>
        <nav className={s.nav}>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/projects/new">Create</NavLink>
          <NavLink href="/live">See Live</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
        <div className={s.authButtons}>
          {user ? (
            <div>{user.displayName}</div>
          ) : (
            <span className="button" onClick={() => login()}>
              Login
            </span>
          )}
          <NavLink href="/projects/new">Create</NavLink>
        </div>
      </header>

      <Hero />
      <Features />
    </div>
  );
};

export default HomeComponent;
