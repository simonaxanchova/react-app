import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { Table, TableBody, Grid, Button } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { Address } from "./Address";
import { style } from "@mui/system";

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
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <Button
            style={{ marginTop: "20px" }}
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

        <Grid item xs={1}>
          <Button
            style={{ marginTop: "20px", marginLeft: "915px" }}
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => {
              setRedirectTo(`/users/update/${user?.id}`);
            }}
          >
            <strong>Edit</strong>
          </Button>
        </Grid>

        <Grid item xs={1}>
          <Button
            style={{
              marginTop: "20px",
              marginLeft: "886px",
            }}
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

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Table>
            <TableBody>
              <div style={{ width: "55px" }}>
                <img
                  style={{
                    borderRadius: "100px",
                    marginLeft: "500px",
                  }}
                  src={user?.picture}
                  width={150}
                  height={150}
                />
              </div>
              <h1 style={{ textAlign: "center" }}>
                <span style={{ textTransform: "capitalize" }}>
                  {user?.title}
                </span>
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
              <div style={{ fontSize: "18px" }}>
                <strong>Email: </strong>
                {user?.email}
              </div>

              <div style={{ fontSize: "18px" }}>
                <strong>Phone: </strong>
                {user?.phone}
              </div>

              <div style={{ fontSize: "18px", textTransform: "capitalize" }}>
                <strong>Gender: </strong>
                {user?.gender}
              </div>

              <div style={{ fontSize: "18px" }}>
                <strong>Address: </strong>
                <Address location={user?.location} />
              </div>

              <div style={{ fontSize: "18px" }}>
                <strong>Country: </strong>
                {user?.location?.country}
              </div>

              <div style={{ fontSize: "18px" }}>
                <strong>Date of Birth: </strong>
                {user?.dateOfBirth}
              </div>

              <div style={{ fontSize: "18px" }}>
                <strong>Registration Date: </strong>
                {user?.registerDate}
              </div>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};
