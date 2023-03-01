import * as React from 'react';
import Snackbar  from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from "react";
import Slide from '@mui/material/Slide';

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function CustomSnackbar({show, severity, message}) {
    const [open, setOpen] = React.useState(false);
    const [transition, setTransition] = React.useState(undefined);

    useEffect(()=>{
        setOpen(show);
        setTransition(() => TransitionLeft);
    }, [show])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
