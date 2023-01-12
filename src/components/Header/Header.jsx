import { Container } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import eventBus from "../../common/EventBus";
import { logout } from "../../redux/features/auth/auth";

import styles from "./Header.module.scss";

const Header = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <header className={styles.header}>
      <Container maxWidth="xl">
        <div className={styles.headerInner}>
          <nav className={styles.nav}>
            <div className={styles.logo}>
              <Link to="/" title="Home">
                Logo
              </Link>
            </div>
            {currentUser ? (
              <div className={styles.user}>
                <h3>
                  <strong>{currentUser.user.name}</strong>
                  <strong> | </strong>
                  <strong>{currentUser.user.email}</strong>
                </h3>

                <div className={styles.profileImg}>
                  <Link to="/profile" title="Profile">
                    <img
                      className={styles.profileImgAvatar}
                      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                      alt="profile-img"
                    />
                  </Link>
                </div>

                <a href="/home" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </div>
            ) : (
              <div className={styles.navbarNav}>
                <li className={styles.navItem}>
                  <Link to={"/login"} className={styles.navLink}>
                    Login
                  </Link>
                </li>

                <li className={styles.navItem}>
                  <Link to={"/register"} className={styles.navLink}>
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>
        </div>
      </Container>
    </header>
  );
};

export default Header;
