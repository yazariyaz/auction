import Container from "@/Components/Container";
import AuthSidebar from "@/Components/Sidebars/AuthSidebar";
import PageHeading from "@/Components/Guest/PageHeading";
import Authenticated from "@/Layouts/Authenticated";
import {pink} from "@mui/material/colors";
import {Link} from "@inertiajs/inertia-react";
import moment from "moment/moment";
import NumberFormat from "react-number-format";
import React from "react";
import {Button} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";


export default function MyBids({bids}) {
    console.log(bids)
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
                                                (bids.length > 0) ? (
                                                    <table className="w-full text-sm text-left text-gray-500 ">
                                                        <tbody>
                                                        {
                                                            bids.map(bid => (
                                                                <tr className="bg-white border-b ">
                                                                    <th scope="row"
                                                                        className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap">
                                                                        <Link href={route('auction.view', {auction:bid.auction.id})}>
                                                                            {bid.auction.item.title}
                                                                        </Link>
                                                                    </th>
                                                                    <td className="px-6 py-4">
                                                                        <span className="mr-2">₦</span>
                                                                        <NumberFormat
                                                                            thousandsGroupStyle="thousand"
                                                                            value={bid.amount}
                                                                            decimalSeparator="."
                                                                            displayType="text"
                                                                            type="text"
                                                                            thousandSeparator={true}
                                                                            allowNegative={true}
                                                                            decimalScale={2}
                                                                            fixedDecimalScale={true}
                                                                        />
                                                                    </td>
                                                                    {
                                                                        (bid.won == 1) && (
                                                                            <>
                                                                                <td className="px-6 text-green-500 py-4">
                                                                                    Bid won
                                                                                </td>
                                                                                <td className="px-6 text-green-500 py-4">
                                                                                    <Button
                                                                                        type="submit"
                                                                                        sx={{ml: 1, }}
                                                                                        variant="contained"
                                                                                        color="success"
                                                                                        disableElevation
                                                                                        onClick={() => {
                                                                                            Inertia.visit(route('confirm-delivery', {bid: bid.id}), {
                                                                                                onSuccess: () => {
                                                                                                    location.reload()
                                                                                                }
                                                                                            })
                                                                                        }}
                                                                                    >
                                                                                        Confirm Delivery
                                                                                    </Button>
                                                                                </td>
                                                                            </>
                                                                        )
                                                                    }
                                                                    <td className="px-6 py-4">
                                                                        {moment(bid['created_at']).fromNow()}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                        </tbody>
                                                    </table>
                                                ) : (
                                                    <p>You have not made any bids yet</p>
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
