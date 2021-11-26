import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UsersRepository } from "./UsersRepository";
import { Grid, Table, TableBody, TableRow } from "@mui/material";

export const Address = (props) => {
  const { address } = useParams();

  return (
    <>
      {props?.location?.street}
      {","} {props?.location?.city}
    </>
  );
};
