import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Users } from "./modules/users/Users";
import { Route, Routes } from "react-router-dom";
import { UserDetails } from "./modules/users/UserDetails";
import { Home } from "./modules/home/Home";
import Header from "./modules/common/Header";
import { Container, Backdrop, CircularProgress, Hidden } from "@mui/material";
import { UsersRepository } from "./modules/users/UsersRepository";
import { Address } from "./modules/users/Address";
import { CreateUser } from "./modules/users/CreateUser";
import { UpdateUser } from "./modules/users/UpdateUser";

export default function App() {
  return (
    <>
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/users/details/:id" element={<UserDetails />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/update/:id" element={<UpdateUser />} />
        </Routes>
      </Container>
    </>
  );
}
