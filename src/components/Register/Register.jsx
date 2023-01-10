import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../redux/features/auth/auth";
import { clearMessage } from "../../redux/features/auth/message";

import styles from "./Register.module.scss";

import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleClick = () => navigate("/login");

  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .test(
        "len",
        "The name must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
    age: Yup.number()
      .test(
        "len",
        "The age must be between 1 and 3 digits.",
        (val) => val && val.toString().length >= 1 && val.toString().length <= 3
      )
      .max(100, "Age must not exceed 100")
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { email, password, name, age } = formValue;

    console.log(formValue);

    setSuccessful(false);

    dispatch(register({ email, password, name, age }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        setLoading(false);
      })
      .catch(() => {
        setSuccessful(false);
        setLoading(false);
      });
  };

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
          <h2>Sign Up</h2>
          {/* <h3>Welcome my dear user!</h3> */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            <Form>
              {!successful && (
                <div className={styles.form}>
                  <div className={styles.formGroup}>
                    <Field
                      name="email"
                      type="email"
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
                    <Field
                      name="name"
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className={`${styles.alert} ${styles.alertDanger}`}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <Field
                      name="age"
                      type="number"
                      className="form-control"
                      placeholder="Age"
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className={`${styles.alert} ${styles.alertDanger}`}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <button
                      onClick={() => setLoading(true)}
                      type="submit"
                      className="btn btn-primary btn-block"
                    >
                      {isLoading ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        "Sign Up"
                      )}
                    </button>
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </div>

        <div className={styles.already}>
          <span>Signed up already?</span>
          <Link to="/login">Login here</Link>
        </div>

        {message && (
          <div className={`${styles.formGroup} ${styles.message}`}>
            <div
              className={
                successful
                  ? `${styles.alert} ${styles.alertSuccess}`
                  : `${styles.alert} ${styles.alertDanger}`
              }
              role="alert"
            >
              {message}
              {successful && (
                <button onClick={handleClick} className={styles.btn}>
                  Ok
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
