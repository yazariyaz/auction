import {Link} from "@inertiajs/inertia-react";
import {LazyImage} from "react-lazy-images";
import infinityLoader from "@/Assets/Images/Infinity-loader.svg";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedOutlinedIcon from '@mui/icons-material/BookmarkAddedOutlined';
import React, {useEffect, useState} from "react";
import Countdown from 'react-countdown';
import NumberFormat from "react-number-format";
export default function Item ({item: auction}) {

    const item = auction.item;
    const thumbnail = item.photos[0].path;
    const subLocation = item['sub_location'].name;

    const [data, setData] = useState({
        status: 'ended'
    });

    const [latestBid, setLatestBid] = useState(null);

    const getBids = async () => {
        let res = await fetch(route('auction.bids',{auction: auction.id}));
        res = await res.json();
        if(res.length > 0) {
            setLatestBid(res[0]);
        }
    }

    const getData = async () => {
        let res = await fetch(route('auction.fetch',{auction: auction.id}));
        res = await res.json();
        setData(res);
    }

    useEffect(() => {
        const timer = setInterval(getData, 5000)
        const timer2 = setInterval(getBids, 5000)
        return () => clearInterval(timer);
    }, []);


    /*const [watching, setWatching] = useState(false);*/

    return (
        <>
            {
                data.status !== 'ended' && (
                    <div className="w-1/2 sm:w-1/3 lg:w-1/5 px-0.5 mb-4">
                        <div className="bg-white border border-gray-card-border rounded-md relative">
                            <Link href={route('auction.view', {auction: auction.id})} className="block h-full w-full">
                                <div className="bg-white w-full h-40">
                                    <LazyImage
                                        src={`http://127.0.0.1:8000/${thumbnail}`}
                                        alt={item.title}
                                        placeholder={
                                            ({imageProps, ref}) =>
                                                <img ref={ref} src={infinityLoader} className="w-full h-full" alt={imageProps.alt} />
                                        }
                                        actual={
                                            ({imageProps}) =>
                                                <img className="w-full h-full object-cover object-center" {...imageProps} />
                                        }
                                    />
                                </div>
                                <div className="p-2 text-xs space-y-1">
                                    <p className="font-bold text-gray-800 uppercase">{item.title}</p>
                                    <p className="font-semibold text-base text-gray-800">
                            <span className="ml-1 text-md text-green-600">
                                <Countdown date={auction['start_time']}>
                                  <span>Active</span>
                                </Countdown>
                            </span>
                                    </p>
                                    <p className="font-semibold text-gray-800">
                                        {
                                            latestBid ? (
                                                    <>
                                                        <span className="">Current bid:</span>
                                                        <span className="text-md text-black">
                                            ₦

                                            <NumberFormat
                                                thousandsGroupStyle="thousand"
                                                value={latestBid['amount']}
                                                decimalSeparator="."
                                                displayType="text"
                                                type="text"
                                                thousandSeparator={true}
                                                allowNegative={true}
                                                decimalScale={2}
                                                fixedDecimalScale={true}
                                            />
                                        </span></>
                                            ) : (
                                                <>
                                                    <span className="">Starting price:</span>
                                                    <span className="text-md text-black">
                                            ₦

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
                                            </span>
                                                </>
                                            )
                                        }

                                    </p>
                                    <p className="text-gray-800 h-8 overflow-hidden -ellipsis"><span className="font-semibold">Location:</span><span className="ml-1 uppercase">{subLocation}</span></p>
                                </div>
                            </Link>

                            {/*<span className="absolute right-0 top-0 bg-black bg-opacity-25 text-white">
                    <Link href={'/'} className={`p-1 inline-block ${watching && 'text-green-300'}`}>
                        {
                            !watching ? (
                                <BookmarkAddOutlinedIcon />
                            ):(
                                <BookmarkAddedOutlinedIcon />
                            )
                        }
                    </Link>
                </span>*/}
                        </div>
                    </div>
                )
            }
        </>

    )
}
