import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./Profile.module.scss";
import { Container } from "@mui/material";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <Container maxWidth="1220px">
          <div className={styles.headerInner}>
            <div>
              <h3>Logo</h3>
            </div>
            <div className={styles.user}>
              <h3>
                <strong>{currentUser.user.name}</strong>
                <strong> | </strong>
                <strong>{currentUser.user.email}</strong>
              </h3>
              <div className={styles.profileImg}>
                <img
                  className={styles.profileImgAvatar}
                  src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  alt="profile-img"
                />
              </div>
            </div>
          </div>
        </Container>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.user.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <p>
        <strong>Age:</strong> {currentUser.user.age}
      </p>
      {/* <strong>Authorities:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;
