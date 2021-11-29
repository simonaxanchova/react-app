import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { Table, TableBody, Grid, Button, Hidden } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { Address } from "./Address";

export const UserDetails = ({}) => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [redirectTo, setRedirectTo] = useState();

  useEffect(() => {
    loadData(id);
  }, []);

  const loadData = (id) => {
    UsersRepository.get(id)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = () => {
    UsersRepository.deleteUser(user?.id);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={3} md={2}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              setRedirectTo(`/users`);
            }}
          >
            <strong>Back</strong>
          </Button>
        </Grid>

        <Hidden smDown>
          <Grid item xs={7}></Grid>
        </Hidden>

        <Grid item xs={9} md={3} style={{ textAlign: "right" }}>
          <Button
            style={{ marginRight: "5px" }}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              setRedirectTo(`/users/update/${user?.id}`);
            }}
          >
            <strong>Edit</strong>
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              handleDelete();
              setRedirectTo(`/users`);
            }}
            startIcon={<DeleteIcon />}
          >
            <strong>Delete</strong>
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={12} md={12}>
          <div style={{ textAlign: "center" }}>
            <img
              style={{
                borderRadius: "100px",
              }}
              src={user?.picture}
              width={150}
              height={150}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <h1 style={{ textAlign: "center" }}>
            <span style={{ textTransform: "capitalize" }}>{user?.title}</span>
            {"."} {user?.firstName} {user?.lastName}
          </h1>
          <h5
            style={{
              color: "#95a5a6",
              marginTop: "-25px",
              textAlign: "center",
            }}
          >
            {user?.id}
          </h5>
        </Grid>

        <Grid item xs={12}>
          <div style={{ fontSize: "14px" }}>
            <strong>Email: </strong>
            {user?.email}
          </div>

          <div style={{ fontSize: "14px" }}>
            <strong>Phone: </strong>
            {user?.phone}
          </div>

          <div style={{ fontSize: "14px", textTransform: "capitalize" }}>
            <strong>Gender: </strong>
            {user?.gender}
          </div>

          <div style={{ fontSize: "14px" }}>
            <strong>Address: </strong>
            <Address location={user?.location} />
          </div>

          <div style={{ fontSize: "14px" }}>
            <strong>Country: </strong>
            {user?.location?.country}
          </div>

          <div style={{ fontSize: "14px" }}>
            <strong>Date of Birth: </strong>
            {user?.dateOfBirth}
          </div>

          <div style={{ fontSize: "14px" }}>
            <strong>Registration Date: </strong>
            {user?.registerDate}
          </div>
        </Grid>
      </Grid>
    </>
  );
};
