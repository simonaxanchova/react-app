import { Alert, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { UserForm } from "./UserForm";
import { UsersRepository } from "./UsersRepository";
import { Navigate } from "react-router-dom";

export const UpdateUser = ({}) => {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState();
  const [formError, setFormError] = useState();
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
    setFormError(null);
    setSuccessMessage();
    UsersRepository.updateUser(user)
      .then((res) => {
        setSuccessMessage("User is edited successfully");
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
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container spacing={2}>
        <h1>Update existing user</h1>
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
        />
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button
            onClick={() => {
              handleSubmit();
              //   setRedirectTo("/users");
            }}
            fullWidth
            size="large"
            variant="contained"
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
