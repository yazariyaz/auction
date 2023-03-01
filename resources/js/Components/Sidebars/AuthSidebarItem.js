import TextField from '@mui/material/TextField';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import {Link, usePage} from '@inertiajs/inertia-react';
import CategoryItem from "@/Components/Sidebars/CategoryItem";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import ToggleOnOutlinedIcon from "@mui/icons-material/ToggleOnOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

export default function AuthSidebarItem({text, href, icon: Icon}) {


    return (
        <li className="">
            <Link href={href} className="flex items-center  hover:text-blue-700 px-4 py-2.5 px-2.5">
                <div className="pr-4">
                    <Icon />
                </div>
                <div className="">{text}</div>
            </Link>
        </li>
    )
}
