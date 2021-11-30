import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";

import { Table, TableBody, Grid, Hidden, Link } from "@mui/material";
import { UsersRepository } from "./UsersRepository";
import { Address } from "./Address";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { style } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ backgroundColor: "#F5F5F5", fontColor: "red" }}>
        {["Edit user", "Delete user"].map((text, index) => (
          <Link
            to={
              index === 0
                ? `/users/update/${user?.id}`
                : index === 1
                ? `/users/delete/${user?.id}`
                : ""
            }
            style={{ textDecoration: "none", color: "#0652DD" }}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? (
                  <EditIcon
                    style={{ color: "#0652DD" }}
                    onClick={() => {
                      setRedirectTo(`/users/update/${user?.id}`);
                    }}
                  /> // BLUE
                ) : index === 1 ? (
                  <DeleteIcon
                    style={{ color: "#ff3f34" }}
                    onClick={() => {
                      handleDelete();
                      setRedirectTo(`/users`);
                    }}
                  /> // RED
                ) : (
                  ""
                )}
              </ListItemIcon>

              <ListItemText
                primary={text}
                style={{ color: index === 0 ? "#0652DD" : "#ff3f34" }}
              ></ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Hidden mdUp={true}>
        <Grid
          style={{
            textAlign: "right",
            marginTop: "-40px",
            marginRight: "-5px",
          }}
        >
          {["right"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <SettingsIcon></SettingsIcon>
              </Button>
              <SwipeableDrawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
                onOpen={toggleDrawer(anchor, true)}
              >
                {list(anchor)}
              </SwipeableDrawer>
            </React.Fragment>
          ))}
        </Grid>
      </Hidden>

      {redirectTo && <Navigate to={redirectTo} push />}
      <Grid container spacing={2} style={{ marginTop: "-5px" }}>
        <Grid item xs={3} md={2}>
          <ArrowBackIcon
            color="primary"
            variant="outlined"
            onClick={() => {
              setRedirectTo(`/users`);
            }}
          />
        </Grid>

        <Hidden smDown>
          <Grid item xs={7}></Grid>
        </Hidden>

        <Hidden smDown>
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
        </Hidden>
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
