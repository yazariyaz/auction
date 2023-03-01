<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('auction_id');
            $table->foreignId('sub_category_id');
            $table->foreignId('sub_location_id');
            $table->string('title');
            $table->text('description');
            $table->string('slug');
            $table->string('condition')->nullable();
            $table->string('base_price');
            $table->timestamps();

            $table->foreign('auction_id')->references('id')->on('auctions')->cascadeOnDelete();
            $table->foreign('sub_category_id')->references('id')->on('sub_categories')->cascadeOnDelete();
            $table->foreign('sub_location_id')->references('id')->on('sub_locations')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('items');
    }
};
