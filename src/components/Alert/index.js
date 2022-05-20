import React from "react";
import { Alert } from "@mui/material";

export default function AlertMessage({ alert }) {
    return <Alert severity={alert.status}>{alert.text}</Alert>;
}
