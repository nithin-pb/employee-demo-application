import React from 'react';
import {Alert, AlertTitle} from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';


export default function CustomAlert({open, message, severity}) {
    return (
        <Collapse in={open}>
            <Alert severity={severity}>
                <AlertTitle>{severity.toUpperCase()}</AlertTitle>
                {message}
            </Alert>
        </Collapse>

    );
}