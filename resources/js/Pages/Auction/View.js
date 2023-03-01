import Container from "@/Components/Container";
import Authenticated from "@/Layouts/Authenticated";
import {Head, Link, usePage} from "@inertiajs/inertia-react";
import ImageGallery from 'react-image-gallery';
import NumberFormat from "react-number-format";
import React, {useEffect, useState} from "react";
import Countdown from "react-countdown";
import {Button, TextField} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";


export default function View({owner, auction, item, photos, status}){

    const _auctionStatus = {
        status: status,
    }

    const [auctionStatus, setAuctionStatus] = useState(_auctionStatus);
    const [bids, setBids] = useState([]);
    const [latestBid, setLatestBid] = useState(null);

    const getAuction = async () => {
        let res = await fetch(route('auction.fetch',{auction: auction.id}));
        res = await res.json();
        setAuctionStatus(res);
    }

    const getBids = async () => {
        let res = await fetch(route('auction.bids',{auction: auction.id}));
        res = await res.json();
        if(res.length > 0) {
            setLatestBid(res[0]);
        }
        setBids(res);
    }

    useEffect(() => {
        const timer = setInterval(getAuction, 2000)
        const timer2 = setInterval(getBids, 1000)
        return () => {
            clearInterval(timer);
            return clearInterval(timer2);
        }
    }, []);

    const [bidPrice, setBidPrice] = useState(1);
    const [errors, setErrors] = useState({
        bidPrice: '',
    });

    const user = usePage().props.auth.user?.data;

    const images = item.photos;

    const imageGallery = images.map(image => ({
        original: `http://127.0.0.1:8000/${image.path}`,
        thumbnail: `http://127.0.0.1:8000/${image.path}`
    }))


    function submit (e) {
        e.preventDefault();

        Inertia.post(route('auction.bid', {auction: auction.id}), {bidPrice: Number(latestBid ? latestBid.amount : item['base_price']) + Number(bidPrice)}, {
            onError: (errors) => {
                setErrors({
                    bidPrice: errors.bidPrice
                })
            },
            onSuccess() {
                setBidPrice(1);
            }
        })
    }


    return (
        <Authenticated>

            <Head title="Auction new/used item and services" />
            <Container>
                <div className="pt-24 w-full flex">
                    <div className="w-4/5 pr-4">
                        <div className="mb-8">
                            <ImageGallery items={imageGallery  } showPlayButton={false} />
                        </div>
                        <h1 className="3xl mb-6">{item.title}</h1>
                        <p className="font-bold mb-2">Condition:</p>
                        <p className="text-gray-600 mb-6">
                            {item.condition}
                        </p>
                        <p className="font-bold mb-2">Description:</p>
                        <p className="text-gray-600">
                            {item.description}
                        </p>
                    </div>
                    <div className="w-1/5 pl-4 bg-white p-6 drop-shadow-md">
                        <p className="text-gray-600 mb-2">Base price</p>
                        <p className="text-3xl mb-8">
                            <span className="mr-2">₦</span>
                            <NumberFormat
                                thousandsGroupStyle="thousand"
                                value={item['base_price']}
                                decimalSeparator="."
                                displayType="text"
                                type="text"
                                thousandSeparator={true}
                                allowNegative={true}
                                decimalScale={2}
                                fixedDecimalScale={true}
                            />
                        </p>
                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">Listed by</p>
                            <p className="">{ (user && (user.id === owner.id)) ? `You` : `${owner['first_name']} ${owner['last_name']}`}</p>
                        </div>
                        {
                            (auctionStatus.status === 'pending') && (
                                <p className="font-semibold mb-6 text-center text-gray-800">
                                    <span className="ml-1 text-3xl text-green-600">
                                        <Countdown date={auction['start_time']}>
                                          <span>Active</span>
                                        </Countdown>
                                    </span>
                                </p>
                            )
                        }
                        {
                            (auctionStatus.status === 'active') && (
                                <p className="font-semibold mb-6 text-center text-gray-800">
                                    <span className="ml-1 text-3xl text-red-600">
                                        <Countdown date={auction['end_time']}>
                                        </Countdown>
                                    </span>
                                </p>
                            )
                        }

                        {
                            (user && (user.id !== owner.id)) && (
                                <>
                                    {
                                        (auctionStatus.status === 'active') && (
                                            <>
                                                <p className="text-blue-600 mb-3">
                                                    <span className="mr-2">₦</span>
                                                    <NumberFormat
                                                        thousandsGroupStyle="thousand"
                                                        value={latestBid ? latestBid.amount : item['base_price']}
                                                        decimalSeparator="."
                                                        displayType="text"
                                                        type="text"
                                                        thousandSeparator={true}
                                                        allowNegative={true}
                                                        decimalScale={2}
                                                        fixedDecimalScale={true}
                                                    /> +
                                                </p>
                                                <form action="" onSubmit={submit}>
                                                    <TextField
                                                        error={!!errors.bidPrice}
                                                        id="bidPrice"
                                                        label="Bid"
                                                        type="number"
                                                        value={bidPrice}
                                                        fullWidth
                                                        name="bidPrice"
                                                        helperText={errors.bidPrice ? errors.bidPrice : ''}
                                                        onChange={(e) => setBidPrice(e.target.value)}
                                                        required
                                                        inputProps={
                                                            {
                                                                min: 1,
                                                            }
                                                        }
                                                        disabled={latestBid && latestBid.user.id === user.id}
                                                    />
                                                    <div className="mt-4 flex justify-end">
                                                        <Button
                                                            type="submit"
                                                            sx={{ml: 1, }}
                                                            variant="contained"
                                                            color="primary"
                                                            disableElevation
                                                            disabled={latestBid && latestBid.user.id === user.id}
                                                        >
                                                            bid
                                                        </Button>
                                                    </div>
                                                </form>
                                            </>
                                        )
                                    }
                                </>
                            )
                        }
                        {
                            bids.length > 0 && (
                                <>
                                    {
                                        bids.map(bid => (
                                            <div key={bid.id}>
                                                <p className="my-4">Bids:</p>
                                                <div className={`mb-2 ${latestBid === bid ? 'text-green-500' : 'text-red-600'  }`}>
                                                    <p className="font-bold">{(user && (user.id === bid.user.id)) ? `You` : `${bid.user['first_name']} ${bid.user['last_name']}`}</p>
                                                    <p>
                                                        <span className="mr-2">₦</span>
                                                        <NumberFormat
                                                            thousandsGroupStyle="thousand"
                                                            value={bid['amount']}
                                                            decimalSeparator="."
                                                            displayType="text"
                                                            type="text"
                                                            thousandSeparator={true}
                                                            allowNegative={true}
                                                            decimalScale={2}
                                                            fixedDecimalScale={true}
                                                        />
                                                    </p>
                                                </div>
                                                {
                                                    bid.won == 1 && (
                                                        <>
                                                            {
                                                                (user.id === owner.id) && (
                                                                    <p className="text-blue-600">
                                                                        Please contact <Link className="underline"
                                                                              href={route('profile.view', {user:bid.user.id})}
                                                                        >
                                                                             {bid.user['first_name']}</Link>, They won the bid
                                                                    </p>
                                                                )
                                                            }
                                                            {

                                                                (user.id === bid.user.id) && (
                                                                    <p className="text-blue-600">Please contact <Link className="underline" href={route('profile.view', {user:owner.id})}> {owner['first_name']}</Link>, You won the bid</p>
                                                                )
                                                            }
                                                        </>
                                                    )
                                                }
                                            </div>
                                        ))
                                    }
                                </>
                            )
                        }

                        {
                            (auctionStatus.status === 'ended') && (
                                <p className="mb-4 text-red-600">Auction ended</p>

                            )
                        }

                        {
                            (auctionStatus.status !== 'ended') && (
                                !user && (
                                    <p className="mb-4">Login to get to bid</p>
                                )
                            )
                        }
                    </div>
                </div>
            </Container>
        </Authenticated>
    )
}
