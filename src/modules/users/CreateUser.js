import React, { useState } from "react";
import { Alert, Button } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { UserForm } from "./UserForm";
import { Grid } from "@mui/material";

export const CreateUser = ({}) => {
  const [successMessage, setSuccessMessage] = useState();
  const [formError, setFormError] = useState();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date().toISOString().substring(0, 10),
  });

  const handleSubmit = () => {
    setFormError(null);
    setSuccessMessage();
    UsersRepository.create(user)
      .then((res) => {
        setSuccessMessage("User is created successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setFormError(err);
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
        <h1>Create new user</h1>
        <Grid item xs={12} style={{ marginBottom: "20px" }}>
          {successMessage && (
            <Grid item xs={12}>
              <Alert severity="success">{successMessage}</Alert>
            </Grid>
          )}
        </Grid>

        <UserForm
          formError={formError}
          user={user}
          handleSubmit={handleSubmit}
          handleChangeUserData={handleChangeUserData}
        ></UserForm>
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            fullWidth
            size="large"
            variant="contained"
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
