import React, {useEffect, useState} from 'react';
import {Snackbar} from "@material-ui/core";

export default function CustomSnackBar({message, open: snackBarOpen}) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(snackBarOpen)
    }, [snackBarOpen])

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            onClose={() => setOpen(false)}
            open={open}
            autoHideDuration={2000}
            message={message ? message : undefined}
        />
    )
}