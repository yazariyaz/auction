<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Auction extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function item(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Item::class);
    }

    public function bids(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Bid::class);
    }

    public function winnerBid(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Bid::class);
    }
}
