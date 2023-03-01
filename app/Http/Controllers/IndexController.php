<?php

namespace App\Http\Controllers;
use App\Http\Resources\CategoryResource;
use App\Models\Auction;
use App\Models\Category;
use Inertia\Inertia;

use Illuminate\Http\Request;

class IndexController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('Homepage',[
            'auctions' => Auction::with('item', 'item.photos', 'item.subLocation')->orderBy('created_at', 'desc')->get(),
        ]);
    }
}
