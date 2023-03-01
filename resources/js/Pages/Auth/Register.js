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
    Button,
    IconButton,

} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import PageHeading from "@/Components/Guest/PageHeading";
import validate from "@/Helpers/Validator";
import {CustomSnackbar} from "@/Components/Feedback";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        referrer: '',
        password: '',
        showPassword: false,
    });

    const [fieldErrors, setFieldErrors] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        phone_number: '',
        referrer: '',
        password: '',
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

        if (!(data.first_name && data.last_name && data.email && data.username && data.password)){
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

        if ((name === 'first_name')|| (name === 'last_name')) {
            setFieldErrors({
                ...fieldErrors,
                [name]: validate(name, value, {
                    required: 'required',
                    minLength: 2,
                    maxLength: 25,
                    regex: /^[A-Za-z]+$/,
                })
            })
        }else if (name === 'username') {
            setFieldErrors({
                ...fieldErrors,
                [name]: validate(name, value, {
                    required: 'required',
                    minLength: 3,
                    maxLength: 15,
                    regex: /^[A-Za-z][A-Za-z0-9_]+$/,
                })
            })
        }else if (name === 'referrer') {
            setFieldErrors({
                ...fieldErrors,
                [name]: validate(name, value, {
                    nullable: 'nullable',
                    minLength: 3,
                    maxLength: 15,
                    regex: /^[A-Za-z][A-Za-z0-9_]+$/,
                })
            })
        }else if (name === 'email') {
            setFieldErrors({
                ...fieldErrors,
                [name]: validate(name, value, {
                    required: 'required',
                    regex: /^.+@.+$/i,
                })
            })
        }else if (name === 'password') {
            setFieldErrors({
                ...fieldErrors,
                [name]: validate(name, value, {
                    required: 'required',
                    minLength: 8,
                })
            })
        }

        setData(name, value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <Guest cardClassName="sm:max-w-xl">
            <Head title="Register" />

            <PageHeading title="Create an account" />

            <form onSubmit={submit}>
                <div className="flex flex-wrap">
                    <div className="w-full sm:w-1/2 sm:pr-1">
                        <TextField
                            error={!!fieldErrors.first_name}
                            id="name"
                            label="First name"
                            type="name"
                            value={data.first_name}
                            fullWidth
                            size="small"
                            name="first_name"
                            placeholder="Ciroma"
                            helperText={fieldErrors.first_name ? fieldErrors.first_name : ' '}
                            onChange={handleChange}
                            autoFocus
                            required
                        />
                    </div>

                    <div className="sm:pl-1 w-full sm:w-1/2">
                        <TextField
                            error={!!fieldErrors.last_name}
                            id="last_name"
                            label="Last name"
                            type="text"
                            value={data.last_name}
                            fullWidth
                            size="small"
                            name="last_name"
                            placeholder="Chukwuma"
                            helperText={fieldErrors.last_name ? fieldErrors.last_name : ' '}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-1 w-full">
                        <TextField
                            error={!!fieldErrors.username}
                            id="username"
                            label="Username"
                            type="username"
                            value={data.username}
                            fullWidth
                            size="small"
                            name="username"
                            placeholder="ciromachuks"
                            helperText={fieldErrors.username ? fieldErrors.username : 'May include letters, numbers & underscore'}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-3 w-full">
                        <TextField
                            error={!!fieldErrors.email}
                            id="email"
                            label="Email"
                            type="email"
                            value={data.email}
                            fullWidth
                            size="small"
                            name="email"
                            placeholder="example@email.com"
                            helperText={fieldErrors.email ? fieldErrors.email : ' '}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mt-3 w-full">
                        <TextField
                            error={!!fieldErrors.phone_number}
                            id="phone_number"
                            label="Phone"
                            type="phone_number"
                            value={data.phone_number}
                            fullWidth
                            size="small"
                            name="phone_number"
                            placeholder="0**********"
                            helperText={fieldErrors.phone_number ? fieldErrors.phone_number : ' '}
                            onChange={handleChange}
                            required
                        />
                    </div>
{/*
                    <div className="mt-1 w-full">
                        <TextField
                            error={!!fieldErrors.referrer}
                            id="referrer"
                            label="referrer"
                            type="referrer"
                            value={data.referrer}
                            fullWidth
                            size="small"
                            name="referrer"
                            placeholder=""
                            helperText={fieldErrors.referrer ? fieldErrors.referrer : ' '}
                            onChange={handleChange}
                        />
                    </div>*/}

                    <div className="mt-3 w-full">
                        <FormControl sx={{ width: '100%' }} size="small" error={!!fieldErrors.password} variant="outlined">
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
                                {fieldErrors.password ? fieldErrors.password : 'Must be at least 8 characters'}
                            </FormHelperText>
                        </FormControl>
                    </div>
                </div>


                <div className="flex items-center justify-between mt-4">
                    <Link
                        href={route('login')}
                        className="text-sm text-blue-600 font-semibold"
                    >
                        Already registered?
                    </Link>

                    <Button
                        type="submit"
                        sx={{ml: 1, }}
                        variant="contained"
                        color="primary"
                        disabled={processing || !canProceed}
                        disableElevation
                    >
                        Register
                    </Button>
                </div>
            </form>
        </Guest>
    );
}
