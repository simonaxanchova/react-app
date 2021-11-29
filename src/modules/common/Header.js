import React from "react";
import {
  Grid,
  Container,
  Hidden,
  SwipeableDrawer,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function Header({}) {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
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
        {["Home", "Users", "Create New User"].map((text, index) => (
          <Link
            to={
              index === 0
                ? "/"
                : index === 1
                ? "/users"
                : index === 2
                ? "/users/create"
                : ""
            }
            style={{ textDecoration: "none", color: "#1F393C" }}
          >
            <ListItem button key={text}>
              <ListItemIcon>
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <GroupIcon />
                ) : index === 2 ? (
                  <AddCircleIcon />
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Hidden mdUp={true}>
        <Grid>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <MenuIcon color="disabled" fontSize="large"></MenuIcon>
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

      <Hidden mdDown={true}>
        <Container
          style={{
            backgroundColor: "#ecf0f1",
            marginTop: "20px",
            padding: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4} md={12}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <Button style={{ fontSize: "12px" }}>
                  <strong>Simple Users App</strong>
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4} md={6}>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <Button size="small" variant="contained">
                  Users
                </Button>
              </Link>
            </Grid>
            <Grid item xs={4} md={6} style={{ textAlign: "right" }}>
              <Link to="/users/create" style={{ textDecoration: "none" }}>
                <Button size="small" variant="outlined">
                  Create
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Hidden>
    </>
  );
}
