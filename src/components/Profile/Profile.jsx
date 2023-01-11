import React, { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Profile.module.scss";
import { Container } from "@mui/material";

import Table from "./Table";
import { fetchUsers } from "../../redux/features/users/usersAction";
import { logout } from "../../redux/features/auth/auth";
import eventBus from "../../common/EventBus";

const Profile = () => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { users: users } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, [dispatch, currentUser, logOut]);

  return (
    <div className={styles.profile}>
      <header className={styles.header}>
        <Container maxWidth="xl">
          <div className={styles.headerInner}>
            <div className={styles.logo}>
              <Link to="/">Logo</Link>
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

      <Container maxWidth="md">
        <h3>All users</h3>
        <Table rows={users} />
      </Container>
    </div>
  );
};

export default Profile;
