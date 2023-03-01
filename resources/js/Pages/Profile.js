import Authenticated from "@/Layouts/Authenticated";
import Container from "@/Components/Container";
import PageHeading from "@/Components/Guest/PageHeading";
import AuthSidebar from "@/Components/Sidebars/AuthSidebar";
import {Link, usePage} from "@inertiajs/inertia-react";
import {Avatar} from "@mui/material";

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

export default  function Profile ({user}) {
    const currentUser = usePage().props.auth.user

    return (
        <Authenticated>
            <Container>
                <div className="pt-24 w-full">
                    {
                        (currentUser && currentUser.data.id === user.id) && (
                            <AuthSidebar />
                        )
                    }
                    <div className="ml-64">
                        <div className="max-w-4xl">
                            <PageHeading
                                title={`${user['first_name']} ${user['last_name']}`}
                                desc=""
                            />
                            <section className="flex flex-wrap items-stretch">
                                <div className="w-full">
                                    <div className="mx-3 mt-6 br-2 border space-y-6 border-gray-100 overflow-hidden p-6">

                                        <div>
                                            <Avatar
                                                {...stringAvatar(`${user['first_name']} ${user['last_name']}`)}
                                                sx={{ width: 100, height: 100 }}
                                            />
                                        </div>
                                        {
                                            (currentUser && currentUser.data.id === user.id) && (
                                                <>
                                                    <p className="">
                                                        <span className="font-bold mr-2">Firstname:</span> {user['first_name']}
                                                    </p>
                                                    <p className="">
                                                        <span className="font-bold mr-2">Lastname:</span> {user['last_name']}
                                                    </p>
                                                    <p className="">
                                                        <span className="font-bold mr-2">Email:</span> {user['email']}
                                                    </p>
                                                    <p className="">
                                                        <span className="font-bold mr-2">Phone number:</span> {user['phone_number']}
                                                    </p>
                                                </>
                                            )
                                        }
                                        <p className="">
                                            <span className="font-bold mr-2">Joined:</span> {new Date(user['created_at']).getFullYear()}
                                        </p>

                                        {
                                            (!user || (currentUser && currentUser.data.id !== user.id)) && (
                                                <p> <span className="font-bold mr-2">Contact:</span> <a className="text-sky-700" href={`tel:${user['phone_number']}`}>{user['phone_number']}</a></p>
                                            )
                                        }
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </Container>
        </Authenticated>
    )
}
