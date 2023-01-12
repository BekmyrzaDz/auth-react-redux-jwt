import React, { useCallback, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Profile.module.scss";
import { Box, CircularProgress, Container } from "@mui/material";

import Table from "./Table";
import { fetchUsers } from "../../redux/features/users/usersAction";

const Profile = () => {
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const { users: users } = useSelector((state) => state.user);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className={styles.profile}>
      <Container maxWidth="md">
        <div className={styles.profileInner}>
          <h3>All users</h3>
          {!isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <CircularProgress color="secondary" />
            </Box>
          ) : (
            <Table rows={users} />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Profile;
