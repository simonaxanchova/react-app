import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { UserForm } from "./UserForm";
import { Grid } from "@mui/material";
import { CreateUserValidator } from "./UserValidator";

export const CreateUser = ({}) => {
  const [successMessage, setSuccessMessage] = useState();
  const [globalFormError, setGlobalFormError] = useState();
  const [formFieldErrors, setFormFieldErrors] = useState();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date().toISOString().substring(0, 10),
  });

  const handleSubmit = () => {
    let valid = CreateUserValidator.isValidSync(user);
    if (!valid) {
      console.log("Not valid");
      let validationErrors = {};
      console.log(user);
      CreateUserValidator.validate(user, { abortEarly: false }).catch((err) => {
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
    UsersRepository.create(user)
      .then((res) => {
        setSuccessMessage("User is created successfully");
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Create new user</h1>
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
          ></UserForm>
        </Grid>
        <Grid item xs={0} md={11}></Grid>
        <Grid item xs={12} md={1}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            fullWidth
            size="small"
            variant="contained"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
