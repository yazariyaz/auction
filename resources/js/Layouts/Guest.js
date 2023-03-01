import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';

export default function Guest({ cardClassName, children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white dark:bg-gray:800">

            <div className={`w-full sm:max-w-md mt-6 px-8 py-14 bg-white md:border md:border-gray-border overflow-hidden sm:rounded-lg ${cardClassName}`}>
                <div className="flex justify-center mb-3">
                    <Link href="/">
                        <ApplicationLogo className="w-20 h-20 user-none" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
