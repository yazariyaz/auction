import Container from "@/Components/Container";
import AuthSidebar from "@/Components/Sidebars/AuthSidebar";
import PageHeading from "@/Components/Guest/PageHeading";
import Authenticated from "@/Layouts/Authenticated";
import {pink} from "@mui/material/colors";
import {Link} from "@inertiajs/inertia-react";
import moment from "moment/moment";


export default function MyAuctions({auctions}) {
    return (
        <Authenticated>
            <Container>
                <div className="pt-24 w-full">
                    <AuthSidebar />
                    <div className="ml-64">
                        <div className="max-w-4xl">
                            <section className="flex flex-wrap items-stretch">
                                <div className="w-full">
                                    <div className="mx-3 mt-6 br-2 border space-y-6 border-gray-100 overflow-hidden p-6">
                                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            {
                                                (auctions.length > 0) ? (
                                                    <table className="w-full text-sm text-left text-gray-500 ">
                                                        <thead
                                                            className="text-xs text-gray-700 uppercase bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3">
                                                                Title
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Start Time
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                End Time
                                                            </th>
                                                            <th scope="col" className="px-6 py-3">
                                                                Listed
                                                            </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {
                                                            auctions.map(auction => (
                                                                <tr className="bg-white border-b ">
                                                                    <th scope="row"
                                                                        className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                                        <Link href={route('auction.view', {auction:auction.id})}>
                                                                            {auction.item.title}
                                                                        </Link>
                                                                    </th>
                                                                    <td className="px-6 py-4">
                                                                        {auction['start_time']}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {auction['end_time']}
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {moment(auction['created_at']).fromNow()}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p>You do not have any auctions yet</p>
                                                )
                                            }
                                        </div>
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
