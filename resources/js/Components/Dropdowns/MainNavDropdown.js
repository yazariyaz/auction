import {Link, usePage} from "@inertiajs/inertia-react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import React, {useEffect, useRef} from "react";

export default function MainNavDropdown({toggledVisibility, onClickOutside}) {
    const ref = useRef(null);

        useEffect(() => {
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    onClickOutside && onClickOutside();
                }
            }

            document.addEventListener('click', handleClickOutside, true);
            return () => {
                document.removeEventListener('click', handleClickOutside, true);
            }
        }, [onClickOutside, toggledVisibility]);

        if(!toggledVisibility) {
            return null;
        }


    const user = usePage().props.auth.user
    return (
        <>
            {
                toggledVisibility && (
                    <ul  ref={ref} className="absolute bg-white min-w-[13rem] top-[140%] left-[50%] translate-x-[-50%] drop-shadow-md">
                        <li className="">
                            <Link href={route('profile.view', {user:user.data.id})} className="block w-full p-2">
                                <div className="flex items-center hover:scale-[1.02] transition duration-300 w-full">
                                    <span className="mr-2 font-semibold"><PersonOutlinedIcon /></span>
                                    <span className="">My Account</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link href={route('logout')} method="post" as="button" type="button" className="block w-full p-2">
                                <div className="flex items-center hover:scale-[1.02] transition duration-300 w-full">
                                    <span className="mr-2 font-semibold"><LogoutOutlinedIcon /></span>
                                    <span className="">Logout</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                )
            }
        </>
    )
}
