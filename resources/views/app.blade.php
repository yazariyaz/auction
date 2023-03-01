<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Styles -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <script src="https://js.paystack.co/v1/inline.js"></script>
        <style>
            [type='text']:focus, [type='email']:focus,
            [type='url']:focus, [type='password']:focus,
            [type='number']:focus, [type='date']:focus,
            [type='datetime-local']:focus, [type='month']:focus,
            [type='search']:focus, [type='tel']:focus, [type='time']:focus,
            [type='week']:focus, [multiple]:focus, textarea:focus, select:focus {
                box-shadow: none;
                border-color: initial;
            }

            .thin-scrollbar::-webkit-scrollbar {
                width: .3rem;
            }
            .thin-scrollbar::-webkit-scrollbar-thumb {
                border-radius: 1.2rem;
                background-color: #ddd;
            }
            .MuiOutlinedInput-input:disabled{
                cursor: not-allowed !important;
            }
            .image-gallery-slide img {
                height: 320px !important;
                object-fit: cover;
                width: auto;
                overflow: hidden;
                object-position: center center;
            }
        </style>

        <!-- Scripts -->
        @routes
        <script src="{{ mix('js/app.js') }}" defer></script>
    </head>
    <body class="font-sans antialiased">
        @inertia

        @env ('local')
            <script src="http://localhost:8080/js/bundle.js"></script>
        @endenv
    </body>
</html>
