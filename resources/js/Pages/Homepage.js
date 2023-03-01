import { useState } from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import Authenticated from "@/Layouts/Authenticated";
import Container from "@/Components/Container";
import Item from "@/Components/Item";
import test from "@/Assets/Images/test.jpg";
import HomepageSidebar from '@/Components/Sidebars/HomepageSidebar';

export default function Homepage({categories, auctions}) {
    return (
        <Authenticated>
            <Head title="Online new/used item and services auction" />

            <section className="">
                <Container>
                    <div className="flex">
                        <div className="flex flex-wrap pt-24 w-full content-start">
                            {
                                auctions.map(auction => (
                                    <Item
                                        item={auction}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </Container>
            </section>
        </Authenticated>
    );
}
