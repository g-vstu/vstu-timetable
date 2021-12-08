import React from 'react';
import { Alert } from '@mui/material';

export const AlertMessage = ({ text }) => {
    return <Alert severity="warning">{text}</Alert>;
};
