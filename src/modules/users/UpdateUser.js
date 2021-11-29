import { Alert, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserForm } from "./UserForm";
import { UsersRepository } from "./UsersRepository";
import { Navigate } from "react-router-dom";
import { UpdateUserValidator } from "./UserValidator";

export const UpdateUser = ({}) => {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState();
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [user, setUser] = useState({});

  useEffect(() => {
    loadById(id);
  }, []);

  const loadById = (id) => {
    UsersRepository.get(id)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = () => {
    let valid = UpdateUserValidator.isValidSync(user);
    if (!valid) {
      console.log("Not valid");
      let validationErrors = {};
      console.log(user);
      UpdateUserValidator.validate(user, { abortEarly: false }).catch((err) => {
        console.log(err.inner);
        err.inner.forEach((validationError) => {
          validationErrors[validationError.path] = {};
          validationErrors[validationError.path] = validationError.message;
        });
        console.log(validationErrors);
        setFormFieldErrors(validationErrors);
      });
      return;
    }

    setGlobalFormError(null);
    setSuccessMessage();
    UsersRepository.updateUser(user)
      .then((res) => {
        setSuccessMessage("User is edited successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setGlobalFormError(err);
      });
  };

  const handleChangeUserData = (e, name) => {
    let data = { ...user };
    data[name] = e.target.value;
    setUser(data);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Update existing user</h1>
        </Grid>

        {successMessage && (
          <Grid item xs={12}>
            <Alert severity="success">{successMessage}</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <UserForm
            formError={globalFormError}
            formFieldErrors={formFieldErrors}
            user={user}
            handleSubmit={handleSubmit}
            handleChangeUserData={handleChangeUserData}
          />
        </Grid>
        <Grid item xs={0} md={11}></Grid>
        <Grid item xs={12} md={1}>
          <Button
            onClick={() => {
              handleSubmit();
              //   setRedirectTo("/users");
            }}
            fullWidth
            size="small "
            variant="contained"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
