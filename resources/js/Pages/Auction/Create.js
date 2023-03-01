import Authenticated from "@/Layouts/Authenticated";
import Container from "@/Components/Container";
import {Head, Link, useForm, usePage} from "@inertiajs/inertia-react";
import BackLink from "@/Components/BackLink";
import {
    Autocomplete,
    Button,
    FormControl,
    FormHelperText, InputAdornment,
    InputLabel,
    MenuItem, OutlinedInput, Select,
    TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import validate from "@/Helpers/Validator";
import styled from "@emotion/styled";
import {PhotoCamera} from "@mui/icons-material";
import moment from "moment";

const Input = styled('input')({
    display: 'none',
});


export default function Create(){

    const categories = usePage().props.categories.data;

    const subCategories = usePage().props.subCategories.data;
    const subLocations = usePage().props.subLocations.data;

    const maxPhotos = 6;

    const { data, setData, post, processing, errors, reset } = useForm({
        subCategory: '',
        subCategoryObj: {},
        subLocation: '',
        subLocationObj: {},
        photos: '',
        title: '',
        condition: '',
        description: '',
        basePrice: '',
        durationKey: 'day',
        durationValue: 20,
        startPeriod: 'now',
    });

    const [fieldErrors, setFieldErrors] = useState({
        subCategory: '',
        subLocation: '',
        photos: '',
        title: '',
        condition: '',
        description: '',
        basePrice: '',
        durationKey: '',
        durationValue: '',
        startPeriod: '',
        startTime: '',
    });


    const checkCanProceed = () => {
        let errorFree = true;
        for (const field in fieldErrors) {
            if(fieldErrors[field]) {
                errorFree = false;
                break;
            }
        }

        if (!(data.subCategory)){
            errorFree = false
        }
        if (!(data.subLocation)){
            errorFree = false
        }

        return errorFree

    }

    useEffect(() => {
        setFieldErrors(errors)
    }, [errors]);


    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;


        setData(name, value);
    };

    const handlePhotosChange = (event) => {
        const files = event.target.files;
        const name = event.target.name;
        if (Array.from(files).length > maxPhotos) {
            setFieldErrors({
                ...fieldErrors,
                'photos': 'You cannot upload more than 6 pictures'
            });
            return;
        }else {
            setFieldErrors({
                ...fieldErrors,
                'photos': ''
            });
        }

        setData(name, files)
    }

    const handleAutocompleteChange = (name, value, newValue) => {

        let _data = {
            ...data,
            [name]: value,
        }

        if(newValue){
            _data[`${name}Obj`] = newValue;
        }

        setData(_data);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('auction.store'))

    };

    return (
        <Authenticated>

            <Head title="Auction new/used item and services" />
            <Container>
                <div className="pt-24 w-full">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center mb-6">
                            <BackLink />
                            <h1 className="text-2xl ml-3">Create auction</h1>
                        </div>
                        <div className="mb-6 text-gray-700 ml-1">Get the best value for your goods or services</div>
                        <div className="border border-gray-200 rounded-md overflow-hidden p-6">
                            <form onSubmit={submit}>
                                <div className="flex flex-wrap">
                                    <div className="w-1/2 px-1">
                                        <Autocomplete
                                            id="sub-categories"
                                            options={subCategories}
                                            groupBy={(option) => option.category.name}
                                            autoComplete
                                            getOptionLabel={(option) => option.name}
                                            onChange={(event, newValue = '') => {
                                                let name = newValue?.name ? newValue?.name : '';
                                                handleAutocompleteChange('subCategory', name, newValue)
                                            }}
                                            inputValue={`${data.subCategory}`}
                                            onInputChange={(event, newInputValue) => {
                                                handleAutocompleteChange('subCategory', newInputValue);
                                            }}
                                            sx={{ width: '100%' }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Category"
                                                    name="subCategory"
                                                    error={!!fieldErrors.subCategory}
                                                    helperText={fieldErrors.subCategory ? fieldErrors.subCategory : ' '}
                                                    required
                                                />

                                            }
                                        />
                                    </div>

                                    <div className={`w-1/2 px-1`}>
                                        <Autocomplete
                                            id="sub-locations"
                                            disabled={!data.subCategory}
                                            options={subLocations}
                                            groupBy={(option) => option.location.name}
                                            getOptionLabel={(option) => option.name}
                                            onChange={(event, newValue = '') => {
                                                let name = newValue?.name ? newValue?.name : '';
                                                handleAutocompleteChange('subLocation', name, newValue)
                                            }}
                                            inputValue={`${data.subLocation}`}
                                            onInputChange={(event, newInputValue) => {
                                                handleAutocompleteChange('subLocation', newInputValue);
                                            }}
                                            sx={{ width: '100%', }}
                                            renderInput={(params) =>
                                                <TextField
                                                    {...params}
                                                    label="Location"
                                                    name="subLocation"
                                                    error={!!fieldErrors.subLocation}
                                                    helperText={fieldErrors.subLocation ? fieldErrors.subLocation : ' '}
                                                    required
                                                />

                                            }
                                        />
                                    </div>

                                    <div className="w-full">
                                        <div className="flex items-center w-full flex-wrap">
                                            <div className={`w-1/4 pr-4 ${!data.subLocation && 'cursor-not-allowed'}`}>
                                                <label htmlFor="photos" onClick={(event) => {
                                                    if (!data.subLocation){
                                                        event.preventDefault();
                                                    }
                                                }}>
                                                    <Input accept=".jpg, .jpeg, .png .webp" onChange={handlePhotosChange} name="photos" id="photos" arial-describedby="photos"  required multiple type="file" />
                                                    <Button variant="contained" disabled={!data.subLocation} className={fieldErrors.photos && '!bg-red-600'} startIcon={<PhotoCamera />} component="span">
                                                        Add Photo(s)
                                                    </Button>
                                                </label>
                                            </div>
                                            <div className="w-3/4">
                                                <p className="mb-2 text-xs text-gray-500">The first picture will be the thumbnail picture</p>
                                                <p className="text-xs text-gray-500">
                                                    {`Supported formats are jpg, jpeg and png only. Maximum file size of 2Mb each and minimum width of 600px. Maximum amount of photos you can upload  is ${maxPhotos}`}
                                                </p>
                                            </div>
                                            <div className="w-full mt-1">
                                                <FormControl error={!!fieldErrors.photos} className="block">
                                                    <FormHelperText id="photos">{fieldErrors.photos}</FormHelperText>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        (Array.from( data.photos).length > 0 && !fieldErrors.photos) && (
                                            <>
                                                <div className="w-1/2  px-1">
                                                    <TextField
                                                        error={!!fieldErrors.title}
                                                        id="title"
                                                        label="Title"
                                                        type="text"
                                                        value={data.title}
                                                        fullWidth
                                                        name="title"
                                                        helperText={fieldErrors.title ? fieldErrors.title : 'Title should be 10 to 60 characters long'}
                                                        onChange={handleChange}
                                                        required
                                                        inputProps={
                                                            {
                                                                minLength: 10,
                                                                maxLength: 60,
                                                            }
                                                        }
                                                    />
                                                </div>
                                                {
                                                    (data.subCategoryObj?.category?.name !== 'Services') && (
                                                        <div className="w-1/2  px-1">
                                                            <FormControl fullWidth>
                                                                <InputLabel id="condition">Condition</InputLabel>
                                                                <Select
                                                                    labelId="condition"
                                                                    id="condition"
                                                                    value={data.condition}
                                                                    label="Condition"
                                                                    name="condition"
                                                                    onChange={handleChange}
                                                                    required
                                                                >
                                                                    <MenuItem value="new">Brand New</MenuItem>
                                                                    <MenuItem value="used">Used</MenuItem>
                                                                    <MenuItem value="refurbished">Refurbished</MenuItem>
                                                                </Select>
                                                                <FormHelperText>{fieldErrors.condition ? fieldErrors.condition : ''}</FormHelperText>
                                                            </FormControl>
                                                        </div>
                                                    )
                                                }

                                                {
                                                    (data.title) && (
                                                        <>

                                                            <div className="w-full mt-4">
                                                                <FormControl fullWidth>
                                                                    <TextField
                                                                        id="description"
                                                                        label="Description"
                                                                        multiline
                                                                        rows={6}
                                                                        name="description"
                                                                        onChange={handleChange}
                                                                        value={data.description}
                                                                        inputProps={
                                                                            {
                                                                                minLength: 20,
                                                                                maxLength: 500,
                                                                            }
                                                                        }
                                                                    />
                                                                    <FormHelperText>{fieldErrors.description ? fieldErrors.description : 'Description 20 to 500 characters long'}</FormHelperText>
                                                                </FormControl>
                                                            </div>

                                                            {
                                                                (data.description) && (
                                                                    <>
                                                                        <div className="w-full my-6">
                                                                            <FormControl fullWidth>
                                                                                <InputLabel htmlFor="price">Price</InputLabel>
                                                                                <OutlinedInput
                                                                                    id="price"
                                                                                    value={data.basePrice}
                                                                                    type="number"
                                                                                    name="basePrice"
                                                                                    onChange={handleChange}
                                                                                    startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                                                                    label="Base Price"
                                                                                    inputProps={
                                                                                        {
                                                                                            min: 5,
                                                                                            max: 1000000000000,
                                                                                        }
                                                                                    }

                                                                                />
                                                                                <FormHelperText>{fieldErrors.price ? fieldErrors.price : 'Minimum of ₦5'}</FormHelperText>
                                                                            </FormControl>
                                                                        </div>

                                                                        {
                                                                            (data.basePrice) && (
                                                                                <>
                                                                                    <div className="mt-6 mb-4">How long you you want the auction to run</div>


                                                                                    <div className="py-6 w-full flex items-center">
                                                                                        <div className="w-1/3  px-1">
                                                                                            <TextField
                                                                                                error={!!fieldErrors.durationValue}
                                                                                                id="durationValue"
                                                                                                label="Duration"
                                                                                                type="number"
                                                                                                value={data.durationValue}
                                                                                                fullWidth
                                                                                                name="durationValue"
                                                                                                helperText={fieldErrors.durationValue ? fieldErrors.durationValue : ''}
                                                                                                onChange={handleChange}
                                                                                                required
                                                                                                inputProps={
                                                                                                    {
                                                                                                        min: 1,
                                                                                                    }
                                                                                                }
                                                                                            />
                                                                                        </div>
                                                                                        <div className="w-1/3 px-1">
                                                                                            <FormControl fullWidth>
                                                                                                <Select
                                                                                                    labelId="durationKey"
                                                                                                    id="durationKey"
                                                                                                    value={data.durationKey}
                                                                                                    label="Select one"
                                                                                                    name="durationKey"
                                                                                                    onChange={handleChange}
                                                                                                    required
                                                                                                >

                                                                                                    {
                                                                                                        ((data.durationValue >= 1) && data.durationValue <= 87600) && (
                                                                                                            <MenuItem value={`minute`}>Minute{(data.durationValue > 1) && 's'}</MenuItem>
                                                                                                        )
                                                                                                    }

                                                                                                    {
                                                                                                        (data.durationValue <= 1460) && (
                                                                                                            <MenuItem value={`hour`}>Hour{(data.durationValue > 1) && 's'}</MenuItem>
                                                                                                        )
                                                                                                    }
                                                                                                    {
                                                                                                        (data.durationValue <= 60) && (
                                                                                                            <MenuItem value={`day`} selected>Day{(data.durationValue > 1) && 's'}</MenuItem>
                                                                                                        )
                                                                                                    }

                                                                                                    {
                                                                                                        (data.durationValue <= 8) && (
                                                                                                            <MenuItem value={`week`}>Week{(data.durationValue > 1) && 's'}</MenuItem>
                                                                                                        )
                                                                                                    }

                                                                                                    {
                                                                                                        (data.durationValue <= 2) && (
                                                                                                            <MenuItem value={`month`}>Month{(data.durationValue > 1) && 's'}</MenuItem>
                                                                                                        )
                                                                                                    }

                                                                                                </Select>
                                                                                                <FormHelperText>{fieldErrors.durationValue ? fieldErrors.durationValue : ''}</FormHelperText>
                                                                                            </FormControl>
                                                                                        </div>
                                                                                        <div className="w-1/3  px-1">
                                                                                            <FormControl fullWidth>
                                                                                                <InputLabel id="startPeriod">Start Period</InputLabel>
                                                                                                <Select
                                                                                                    labelId="startPeriod"
                                                                                                    id="startPeriod"
                                                                                                    value={data.startPeriod}
                                                                                                    label="Start Period"
                                                                                                    name="startPeriod"
                                                                                                    onChange={handleChange}
                                                                                                    required
                                                                                                >
                                                                                                    <MenuItem value="now" selected>Now</MenuItem>
                                                                                                    <MenuItem value="let-me-choose">Let me choose</MenuItem>
                                                                                                </Select>
                                                                                                <FormHelperText>{fieldErrors.startPeriod ? fieldErrors.startPeriod : ''}</FormHelperText>
                                                                                            </FormControl>
                                                                                        </div>
                                                                                    </div>

                                                                                    {
                                                                                        (data.startPeriod === 'let-me-choose') && (
                                                                                            <div className="w-1/2 px-1">
                                                                                                <FormControl fullWidth>
                                                                                                    <TextField
                                                                                                        id="start-datetime"
                                                                                                        label="Start Time"
                                                                                                        type="datetime-local"
                                                                                                        value={data.startTime || moment().add(2, 'minutes').format('yyyy-MM-DDThh:mm')}
                                                                                                        name="startTime"
                                                                                                        onChange={handleChange}
                                                                                                        InputLabelProps={{
                                                                                                            shrink: true,
                                                                                                        }}
                                                                                                        inputProps={
                                                                                                            {
                                                                                                                min: moment().add(2, 'minutes').format('yyyy-MM-DDThh:mm'),
                                                                                                                max: moment().add(2, 'minutes').add(1, "week").format('yyyy-MM-DDThh:mm'),
                                                                                                            }
                                                                                                        }
                                                                                                    />

                                                                                                    <FormHelperText>{fieldErrors.startTime ? fieldErrors.startTime : 'At least 2 minute from now and at most 1 week from now'}</FormHelperText>
                                                                                                </FormControl>
                                                                                            </div>
                                                                                        )
                                                                                    }



                                                                                    <div className="w-full flex justify-end items-center">
                                                                                        <Button
                                                                                            type="submit"
                                                                                            sx={{ml: 1, }}
                                                                                            variant="contained"
                                                                                            color="primary"
                                                                                            disabled={processing}
                                                                                            disableElevation
                                                                                        >
                                                                                            Proceed
                                                                                        </Button>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        }
                                                                    </>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                    </div>

                    {/*

                            Add photo
First picture - is the title picture. You can change the order of photos: just grab your photos and drag
No file chosen
Each picture must not exceed 5 Mb
Supported formats are *.jpg, *.gif and *.png


                    */}

                    {/*<AuthSidebar />
                    <div className="ml-64">
                        <div className="max-w-4xl">
                            <PageHeading
                                title="Create auction"
                                desc="Get the best value for your goods and services"
                            />
                            <section className="flex flex-wrap items-stretch">
                                <div className="w-full">
                                    <div className="mx-3 mt-6 br-2 border border-gray-100 overflow-hidden">

                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>*/}
                </div>
            </Container>
        </Authenticated>
    )
}
