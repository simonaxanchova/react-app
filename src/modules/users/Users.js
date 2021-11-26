import {
  Table,
  TableCell,
  TableBody,
  TableRow,
  Grid,
  Pagination,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { UsersRepository } from "./UsersRepository";
import { Navigate } from "react-router-dom";

export const Users = () => {
  const [users, setUsers] = useState();
  const [redirectTo, setRedirectTo] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    loadData(0, 10);
  }, []);

  const loadData = (page, limit) => {
    setLoading(true);
    UsersRepository.getAll(page, limit)
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleChange = (e, value) => {
    loadData(value, 10);
  };

  return (
    <>
      {redirectTo && <Navigate to={redirectTo} push />}
      <h1>Users</h1>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Table>
            <TableBody>
              {loading && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "50px",
                    marginTop: "150px",
                  }}
                >
                  <CircularProgress />
                </div>
              )}
              {!loading &&
                users?.data?.map((user, index) => (
                  <TableRow
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        index % 2 === 0 ? "#ecf0f1" : "transparent",
                    }}
                    onClick={() => {
                      setRedirectTo(`/users/details/${user.id}`);
                    }}
                  >
                    <TableCell style={{ width: "55px" }}>
                      <img
                        style={{ borderRadius: "100px" }}
                        src={user.picture}
                        width={50}
                        height={50}
                      ></img>
                    </TableCell>
                    <TableCell>
                      <span style={{ textTransform: "capitalize" }}>
                        {user.title}.
                      </span>{" "}
                      {user.firstName} {user.lastName}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
            <TableRow>
              {!loading && users && users.page !== undefined && (
                <TableCell colSpan={3}>
                  <Pagination
                    style={{ textAlign: "center" }}
                    count={Math.floor(users?.total / users?.limit)}
                    page={users.page}
                    onChange={handleChange}
                  />
                </TableCell>
              )}
            </TableRow>
          </Table>
        </Grid>
      </Grid>
    </>
  );
};
