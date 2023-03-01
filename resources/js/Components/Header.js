import Container from "@/Components/Container";
import ApplicationLogo from "@/Components/ApplicationLogo";
import {Link, useForm, usePage} from '@inertiajs/inertia-react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MainNavDropdown from "@/Components/Dropdowns/MainNavDropdown";
import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";
import {AddBoxOutlined} from "@mui/icons-material";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
export default function Header() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const config = usePage().props.config;
    const user = usePage().props.auth.user
    const [dropdownsVisibilities, setDropdownVisibilities] = useState({
        userDropdown: false,
    })

    function handleUserDropdown () {
        setDropdownVisibilities({
            ...dropdownsVisibilities,
            userDropdown: !dropdownsVisibilities.userDropdown
        })
    }

    const [balance, setBalance] = useState('**');

    const getBalance = async () => {
        let res = await fetch(route('balance',{user: user.id}));
        res = await res.json();
        setBalance(res);
    }

    useEffect(() => {
        let timer;
        if (user) {
            timer = setInterval(getBalance, 10000)
        }
        return () => {
            if (user) {
                return clearInterval(timer);
            }
        };
    }, []);
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: "",
    });

    function payWithPaystack(e) {
        e.preventDefault();
        let handler = PaystackPop.setup({
            key: 'pk_test_018ef2a8bc8b96f4215c669f47df2822fcfb6e5c', // Replace with your public key
            email: user.data.email,
            amount: data.amount * 100,
            ref: 'auction'+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            // label: "Optional string that replaces customer email"
            callback: function(response){
                setOpen(false);
                Inertia.post(route('fund-wallet'), {
                    amount: data.amount,
                }, {
                    onError: (e) => {
                        console.log(e);
                }
                });
            }
        });
        handler.openIframe();
    }

    return (
        <div className="w-full fixed top-0 left-0 right-0 z-[150] drop-shadow-header">
            <div className="bg-white w-full ">
                <Container>
                    <nav className="py-4 flex item-center justify-between">
                        <Link href={route('homepage')} className="flex items-center space-x-2">
                            <ApplicationLogo className="h-8 w-8" />
                            <h1 className="font-bold text-sky-700">{config.app.name}</h1>
                        </Link>

                        <ul className="flex items-center space-x-6 lg:space-x-8 text-gray-500 pr-4">
                            <li className="hidden">
                                <Link href={route('homepage')}>
                                    <SearchOutlinedIcon />
                                </Link>
                            </li>

                            {
                                user ? (
                                    <>
                                        <li>
                                            <span className="mr-2">₦</span>
                                            <NumberFormat
                                                thousandsGroupStyle="thousand"
                                                value={balance}
                                                decimalSeparator="."
                                                displayType="text"
                                                type="text"
                                                thousandSeparator={true}
                                                allowNegative={true}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                            <span className="ml-2">
                                                <button type="button" onClick={handleClickOpen}>
                                                    <AddBoxOutlined/>
                                                </button>
                                            </span>
                                        </li>
                                        <li className="hidden">
                                            <Link href={route('homepage')}>
                                                <NotificationsOutlinedIcon />
                                            </Link>
                                        </li>
                                        <li className="md:hidden">
                                            <Link href={route('homepage')}>
                                                <AccountCircleOutlinedIcon />
                                            </Link>
                                        </li>
                                        <li className="hidden md:block">
                                            <div className="relative">
                                                <button className="space-x-2" onClick={handleUserDropdown}>
                                                    <AccountCircleOutlinedIcon/>
                                                    <span>{user.data['first_name']}</span>
                                                    <KeyboardArrowDownOutlinedIcon/>
                                                </button>
                                               <MainNavDropdown onClickOutside={() => {handleUserDropdown()}} toggledVisibility={dropdownsVisibilities.userDropdown} />
                                            </div>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link href={route('login')}>
                                                Sign in
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('register')}>
                                                Join
                                            </Link>
                                        </li>
                                    </>
                                )
                            }


                            <li>
                                <Link href={route('auction.create')} className="">
                                    <button className="bg-blue-600  text-white font-bold py-2 px-8 rounded inline-flex items-center">
                                        <span>Sell</span>
                                    </button>
                                </Link>
                            </li>



                        </ul>
                    </nav>

                    {
                        user &&
                        <Dialog open={open} onClose={handleClose}>
                            <form id="paymentForm" onSubmit={payWithPaystack}>
                                <DialogTitle>Deposit</DialogTitle>
                                <DialogContent>
                                    <div className="mb-3 w-full">
                                        <TextField
                                            id="email"
                                            label="Email"
                                            type="email"
                                            value={user.data['email']}
                                            fullWidth
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3 w-full">
                                        <TextField
                                            id="first-name"
                                            label="First name"
                                            type="text"
                                            value={user.data['first_name']}
                                            fullWidth
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3 w-full">
                                        <TextField
                                            id="last-name"
                                            label="Last name"
                                            type="text"
                                            value={user.data['last_name']}
                                            fullWidth
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3 w-full">
                                        <TextField
                                            id="email"
                                            label="Email"
                                            type="email"
                                            value={user.data.email}
                                            fullWidth
                                            readOnly
                                        />
                                    </div>

                                    <div className="mb-3 w-full">
                                        <TextField
                                            id="amount"
                                            label="Amount"
                                            type="number"
                                            value={data.amount}
                                            fullWidth
                                            name="amount"
                                            onChange={(e) => setData({
                                                ...data,
                                                amount: e.target.value,
                                            })}
                                            autoFocus
                                            required
                                        />
                                    </div>

                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button type="submit">Proceed</Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                    }
                </Container>
            </div>
        </div>
    )
}
