import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../../redux/features/auth/auth";
import { clearMessage } from "../../redux/features/auth/message";

import styles from "./Login.module.scss";
import { CircularProgress } from "@mui/material";

const Login = () => {
  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    setLoading(true);

    const { email, password } = formValue;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/home");
        window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className={styles.signup}>
      <div className={styles.signupForm}>
        <div className={`${styles.card} ${styles.cardContainer}`}>
          <div className={styles.profileImg}>
            <img
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              alt="profile-img"
              className={styles.profileImgAvatar}
            />
          </div>
          <h2>Sign In</h2>
          <h3>Welcome my dear user!</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            <Form>
              <div className={styles.form}>
                <div className={styles.formGroup}>
                  <Field
                    name="email"
                    type="text"
                    className="form-control"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={`${styles.alert} ${styles.alertDanger}`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <Field
                    name="password"
                    type="password"
                    className="form-control"
                    placeholder="Password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={`${styles.alert} ${styles.alertDanger}`}
                  />
                </div>

                <div className={styles.formGroup}>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    <span>
                      {loading ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        "Sign In"
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>

        {message && (
          <div className={`${styles.formGroup} ${styles.message}`}>
            <div
              className={`${styles.alert} ${styles.alertDanger}`}
              role="alert"
            >
              {message}
            </div>
          </div>
        )}

        <div className={styles.already}>
          <span>Do you want sign up?</span>
          <Link to="/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
