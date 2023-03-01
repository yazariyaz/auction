<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|min:2|max:25|regex:/^[A-Za-z]+$/',
            'last_name' => 'required|string|min:2|max:25|regex:/^[A-Za-z]+$/',
            'username' => 'required|string|min:3|max:15|regex:/^[A-Za-z][A-Za-z0-9_]+$/|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'required|string|numeric|max:99999999999|unique:users',
            'referrer' => 'nullable|string|exists:users,username',
            'password' => ['required', Rules\Password::defaults()],
        ]);

        $referrer_id = $request->referrer ? User::where('username', $request->referrer)->first()->id : "";

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'username' => $request->username,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'referrer_id' => $referrer_id,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
