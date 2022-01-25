import React from 'react';
import { Alert } from '@mui/material';

export const AlertMessage = ({ alert }) => {
    return <Alert severity={alert.status}>{alert.text}</Alert>;
};
