
import {Link, usePage} from '@inertiajs/inertia-react';
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import AuthSidebarItem from "@/Components/Sidebars/AuthSidebarItem";

export default function AuthSidebar() {

    const categories = usePage().props.categories.data;
    const user = usePage().props.auth.user.data

    return (
        <aside className="fixed top-[6rem] pt-6 w-64">
            <nav className="">
                <ul className="text-gray-700 font-semibold">
                    <AuthSidebarItem href={route('profile.view', {user: user.id})} text="Profile" icon={AccountCircleOutlinedIcon} />
                    <AuthSidebarItem href={route('profile.my-auctions')} text="My Auctions" icon={SellOutlinedIcon} />
                    <AuthSidebarItem href={route('profile.my-bids')} text="My Bids" icon={RequestPageOutlinedIcon} />
                </ul>
            </nav>
        </aside>
    )
}
