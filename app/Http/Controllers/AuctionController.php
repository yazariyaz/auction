<?php

namespace App\Http\Controllers;

use App\Http\Resources\SubCategoryResource;
use App\Http\Resources\SubLocationResource;
use App\Models\Auction;
use App\Models\Bid;
use App\Models\Item;
use App\Models\Photo;
use App\Models\SubCategory;
use App\Models\SubLocation;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AuctionController extends Controller
{

    public function bids(Auction $auction) {
        /*return Bid::where('auction_id', $auction->id)->where('user_id', request()->user()->id)->with('user')->orderBy('created_at', 'desc')->get();*/
        return Bid::where('auction_id', $auction->id)->with('user')->orderBy('created_at', 'desc')->get();
    }

    public function view (Auction $auction) {
        if (strtotime(Carbon::now()->timezone('Africa/Lagos'))  >= strtotime(Carbon::make($auction->start_time))) {
            $status = 'active';
        }

        if (strtotime(Carbon::now()->timezone('Africa/Lagos')) > strtotime(Carbon::make($auction->end_time))){
            $status = 'ended';
        }

        if(strtotime(Carbon::now()->timezone('Africa/Lagos')) < strtotime(Carbon::make($auction->start_time))){
            $status = 'pending';
        }
        return Inertia::render('Auction/View', [
            'owner' => $auction->user,
            'auction' => $auction,
            'item' => $auction->item,
            'photos' => $auction->item->photos,
            'status' => $status,
        ]);
    }

    public function bid(Auction $auction) {

        if ($auction->user->id === request()->user()->id) {
            return redirect()->back()->withErrors([
                'bidPrice' => 'Not allowed'
            ]);
        }

        $credits = request()->user()->transactions()->where('type', 'credit');
        $creditSum = $credits ? $credits->pluck('amount')->sum()  :  0;
        $debits = request()->user()->transactions()->where('type', 'debit');
        $debitSum = $debits ? $debits->pluck('amount')->sum()  :  0;
        $balance = $creditSum - $debitSum;


        if ($balance < floatval(request()->bidPrice)) {
            return redirect()->back()->withErrors([
                'bidPrice' => 'Insufficient funds!'
            ]);
        }else{

            Transaction::where('auction_id', $auction->id)->delete();

            $bid = Bid::create([
                'user_id' => request()->user()->id,
                'auction_id' => $auction->id,
                'amount' => floatval(request()->bidPrice),
            ]);

            Transaction::create([
                'user_id' => request()->user()->id,
                'bid_id' => $bid->id,
                'auction_id' => $auction->id,
                'type' => 'debit',
                'amount' => request()->bidPrice,
            ]);
            return back();
        }


    }

    public function fetch (Auction $auction) {
        if (strtotime(Carbon::now()->timezone('Africa/Lagos'))  >= strtotime(Carbon::make($auction->start_time))) {
            $status = 'active';
        }

        if (strtotime(Carbon::now()->timezone('Africa/Lagos')) > strtotime(Carbon::make($auction->end_time))){
            $status = 'ended';
        }

        if(strtotime(Carbon::now()->timezone('Africa/Lagos')) < strtotime(Carbon::make($auction->start_time))){
            $status = 'pending';
        }


        if ($status === 'ended') {
                $auctionBids = Bid::where('auction_id', $auction->id)->orderBy('created_at', 'desc');
                if ($auctionBids->first()){
                    $latestAuctionBid = $auctionBids->first();
                    if(!$latestAuctionBid->won) {
                        if($latestAuctionBid->won !== 'delivered'){
                            $latestAuctionBid->update([
                                'won' => true,
                            ]);
                        }
                    }
                }
        }


        return [
            'status' => $status,
        ];
    }

    public function create () {
        return Inertia::render('Auction/Create',[
            'subCategories' => SubCategoryResource::collection(SubCategory::with(['category'])->get()),
            'subLocations' => SubLocationResource::collection(SubLocation::with(['location'])->get()),
        ]);
    }

    public function store (Request $request) {


        $data = $request->validate([
            'subCategoryObj' => [
                'required',
                'array',
                'bail'
            ],
            'subLocationObj' => [
                'required',
                'array',
                'bail'
            ],
            'title' => [
                'string',
                'min:10',
                'max:60'
            ],
            'description' => [
                'string',
                'min:20',
                'max:500'
            ],
            'basePrice' => [
                'required',
                'numeric',
                'min:5'
            ],
            'durationKey' => [
                'required',
                'string'
            ],
            'durationValue' => [
                'required',
                'numeric'
            ],
            'startPeriod' => [
                'required',
                'string'
            ],
            'startTime' => [
                'required_if:startPeriod,let-me-choose',
                'date',
                'after_or_equal:' . Carbon::now()->timezone('Africa/Lagos')->timezone('Africa/Lagos')->format('Y-m-dTh:m'),
            ],
        ]);

        if ($request->subCategoryObj['category']['name'] != 'Services'){
            $request->validate([
                'condition' => ['required'],
            ]);
        }

        $subCategoryId = $request->subCategoryObj['id'];
        $subLocationId = $request->subLocationObj['id'];


        $endTime = $this->setEndTime($request->durationKey, $request->durationValue, $request->startPeriod, $request->startTime);

        if ($request->startPeriod === 'now') {
            $startTime = Carbon::now()->timezone('Africa/Lagos');
        }else {
            $startTime = Carbon::make($request->startTime);
        }

        $auction = Auction::create([
            'user_id' => $request->user()->id,
            'start_time' => $startTime,
            'end_time' => $endTime,
        ]);

        $item  = Item::create([
            'auction_id' => $auction->id,
            'sub_category_id' => $subCategoryId,
            'sub_location_id' => $subLocationId,
            'description' => $request->description,
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'condition' => $request->condition,
            'base_price' => $request->basePrice,
        ]);

        if ($request->photos) {
            $i = 1;
            foreach ($request->photos as $screenshots_sample) {
                if ($i <= 6) {
                    $path = $screenshots_sample->store('photos');
                    Photo::create([
                        'item_id' => $item->id,
                        'path' => $path,
                    ]);
                    $i++;
                }
            }
        }

        return redirect()->route('auction.view', ['auction' => $auction->id]);

    }

    public function setEndTime($key, $value, $startPeriod, $startTime) {
        switch ($key){
            case 'minute':
                if ($startPeriod === 'now') {
                    return Carbon::now()->timezone('Africa/Lagos')->timezone('Africa/Lagos')->addMinutes($value);
                }else{
                    return Carbon::make($startTime)->addMinutes($value);
                }

            break;
            case 'hour':
                if ($startPeriod === 'now') {
                    return Carbon::now()->timezone('Africa/Lagos')->addHours($value);
                }else{
                    return Carbon::make($startTime)->addHours($value);
                }

            break;
            case 'day':
                if ($startPeriod === 'now') {
                    return Carbon::now()->timezone('Africa/Lagos')->addDays($value);
                }else{
                    return Carbon::make($startTime)->addDays($value);
                }

            break;
            case 'week':
                if ($startPeriod === 'now') {
                    return Carbon::now()->timezone('Africa/Lagos')->addWeeks($value);
                }else{
                    return Carbon::make($startTime)->addWeeks($value);
                }

            break;
            case 'month':
                if ($startPeriod === 'now') {
                    return Carbon::now()->timezone('Africa/Lagos')->addMonths($value);
                }else{
                    return Carbon::make($startTime)->addMonths($value);
                }
            break;
        }

    }
}
