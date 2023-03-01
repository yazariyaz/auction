import React from 'react';
import logo from '../Assets/Images/ApplicationLogo.svg'
import {usePage} from "@inertiajs/inertia-react";
export default function ApplicationLogo({ className }) {

    const {config} = usePage().props;

    return (
        <img src={logo} className={className} alt={config.app.name} />
    );
}
