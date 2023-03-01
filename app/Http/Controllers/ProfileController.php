<?php

namespace App\Http\Controllers;

use App\Models\Auction;
use App\Models\Bid;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function view(User $user) {
        return Inertia::render('Profile', [
            'user' => $user
        ]);
    }

    public function myAuctions() {
        $auctions = Auction::where('user_id', request()->user()->id)->with('item')->get();
        return Inertia::render('MyAuctions', [
            'auctions' => $auctions,
        ]);
    }

    public function myBids() {
        return Inertia::render('MyBids', [
            'bids' => Bid::where('user_id', request()->user()->id)->with('auction.item')->get(),
        ]);
    }

    public function confirmDelivery (Bid $bid) {

        Transaction::create([
           'user_id' => $bid->auction->user_id,
           'type' => 'credit',
            'amount' => $bid->amount,
        ]);

        $bid->update([
            'won' => 'delivered'
        ]);

        return redirect()->route('profile.my-bids');

    }
}
