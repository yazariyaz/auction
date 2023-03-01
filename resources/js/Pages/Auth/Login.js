 import {useEffect, useState} from 'react';
import Guest from '@/Layouts/Guest';
import {Head, Link, useForm} from '@inertiajs/inertia-react';
import {
    TextField,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormControlLabel,
    Button,
    Checkbox,
    IconButton,

} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PageHeading from "@/Components/Guest/PageHeading";
import validate from "@/Helpers/Validator";
import {CustomSnackbar} from "@/Components/Feedback";


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
        showPassword: false,
    });

    const [fieldErrors, setFieldErrors] = useState({
        email: '',
    });

    const [snackbarData, setSnackbarData] = useState({
        visibility: false,
        severity: 'success',
        message: ''
    });

    const [canProceed, setCanProceed]= useState(false);

    const checkCanProceed = () => {
        let errorFree = true;
        for (const field in fieldErrors) {
            if(fieldErrors[field]) {
                errorFree = false;
                break;
            }
        }

        if (!(data.email && data.password)){
            errorFree = false
        }

        return errorFree

    }

    useEffect(() => {
        setCanProceed(checkCanProceed())
    }, [fieldErrors, data]);


    useEffect(() => {
        setFieldErrors(errors)
    }, [errors]);


    useEffect(() => {
        setCanProceed(checkCanProceed())
        return () => {
            reset('password');
        };
    }, []);

    const handleChange = (event) => {

        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

        if (name === 'email') {
            setFieldErrors({
                ...fieldErrors,
                [name]: validate(name, value, {
                    required: 'required',
                })
            })
        }else if (name === 'password') {
            setFieldErrors({
                [name]: validate(name, value, {
                    required: 'required',
                }),
                email: errors.email === fieldErrors.email ? '' : fieldErrors.email
            })
        }

        setData(name, value);
    };


    const submit = (e) => {
        e.preventDefault();

        if (checkCanProceed()) {
            post(route('login'));
        }else {
            setSnackbarData({
                visibility: true,
                severity: 'error',
                message: 'Please fill all fields Correctly'
            })
        }

    };

    return (
        <Guest>
            <Head title="Log in" />
            <PageHeading title="Sign in" />

            <form onSubmit={submit}>
                <div>
                    <TextField
                        error={!!fieldErrors.email}
                        id="email"
                        label="Email"
                        type="email"
                        value={data.email}
                        fullWidth
                        name="email"
                        placeholder="example@email.com"
                        helperText={fieldErrors.email ? fieldErrors.email : ' '}
                        onChange={handleChange}
                        autoFocus
                        required
                    />
                </div>

                <div className="mt-3">
                    <FormControl sx={{ width: '100%' }} error={!!fieldErrors.password} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={data.showPassword ? 'text' : 'password'}
                            value={data.password}
                            name="password"
                            error={!!fieldErrors.password}
                            onChange={handleChange}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => {
                                            setData({
                                                ...data,
                                                showPassword: !data.showPassword,
                                            });
                                        }}
                                        onMouseDown={(event) => {
                                            event.preventDefault();
                                        }}
                                        edge="end"
                                    >
                                        {data.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            required
                            label="Password"
                        />
                        <FormHelperText id="password">
                            {fieldErrors.password ? fieldErrors.password : ' '}
                        </FormHelperText>
                    </FormControl>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <FormControlLabel control={<Checkbox checked={data.remember} name="remember" onChange={handleChange} />} label="Remember me" />

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm text-blue-600 font-semibold"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route('register')}
                        className="text-sm text-blue-600 font-semibold"
                    >
                        Create account
                    </Link>

                    <Button
                        type="submit"
                        sx={{ml: 1, }}
                        variant="contained"
                        color="primary"
                        disabled={processing || !canProceed}
                        disableElevation
                    >
                        Log in
                    </Button>
                </div>
            </form>

            <CustomSnackbar show={snackbarData.visibility} severity={snackbarData.severity} message={snackbarData.message} />

        </Guest>
    );
}
