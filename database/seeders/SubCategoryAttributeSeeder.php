<?php

namespace Database\Seeders;

use App\Models\SubCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubCategoryAttributeSeeder extends Seeder
{

    private object $subCategories;

    public function run()
    {
        $this->subCategories = SubCategory::all();
    }
}
