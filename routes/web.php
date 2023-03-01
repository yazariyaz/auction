<?php

use App\Http\Controllers\ProfileController;
use App\Http\Resources\CategoryResource;
use App\Models\Auction;
use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Http\Controllers\AuctionController;
use App\Http\Controllers\IndexController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', IndexController::class)->name('homepage');
Route::get('/profile/{user}', [ProfileController::class, 'view'])->name('profile.view');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::name('auction.')->group(function (){
        Route::get('/auction/create', [AuctionController::class, 'create'])->name('create');
        Route::post('/auction/', [AuctionController::class, 'store'])->name('store');

        Route::post('bid/{auction}', [AuctionController::class, 'bid'])->name('bid');
    });
});

Route::get('/auction/{auction}', [AuctionController::class, 'view'])->name('auction.view');

Route::get('/auction/{auction}/fetch', [AuctionController::class, 'fetch'])->name('auction.fetch');
Route::get('/auction/{auction}/bids', [AuctionController::class, 'bids'])->name('auction.bids');

Route::get('/my-auctions', [ProfileController::class, 'myAuctions'])->name('profile.my-auctions')->middleware('auth');
Route::get('/my-bids', [ProfileController::class, 'myBids'])->name('profile.my-bids')->middleware('auth');
Route::get('/confirm-delivery/{bid}', [ProfileController::class, 'confirmDelivery'])->name('confirm-delivery')->middleware('auth');

Route::post('fund-wallet', function() {

    \App\Models\Transaction::create([
        'user_id' => request()->user()->id,
        'type' => 'credit',
        'amount' => request()->amount,
    ]);

    return back();
})->name('fund-wallet');


Route::get('/balance/', function () {
     $credits = request()->user()->transactions()->where('type', 'credit');
     $creditSum = $credits ? $credits->pluck('amount')->sum()  :  0;
     $debits = request()->user()->transactions()->where('type', 'debit');
     $debitSum = $debits ? $debits->pluck('amount')->sum()  :  0;

     return ($creditSum - $debitSum);

})->name('balance')->middleware('auth');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__.'/auth.php';
