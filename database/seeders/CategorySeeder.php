<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{

    private object $categories;
    private object $subCategories;

    public function run()
    {
        $subCategoriesGroups = [
            'Electronics'  => [
                'Televisions' => [

                ],
                'Smart TVs' => [

                ],
                'LED & LCD TVs' => [

                ],
                'QLED & OLED TVs' => [

                ],
                'DVD Players & Recorders' => [

                ],
                'Home Theatre Systems' => [

                ],
                'Receivers & Amplifiers' => [

                ],
                'Sound Bars' => [

                ],
                'Digital Cameras' => [

                ],
                'Projectors' => [

                ],
                'Video Surveillance' => [

                ],
                'Camcorders' => [

                ],
                'Generators' => [

                ],
                'Power Inverters' => [

                ],
                'Solar & Wind Power' => [

                ],
                'Stablizers' => [

                ],
            ],
            'Automobile'  => [
                'Cars' => [

                ],
                'Buses & Microbuses' => [

                ],
                'Heavy Equipment' => [

                ],
                'Motorcycles & Scooters' => [

                ],
                'Trucks & Trailers' => [

                ],
                'Vehicle Parts & Accessories' => [

                ],
                'Watercraft & Boats' => [

                ],
                'Vehicle Care' => [

                ],
                'Vehicle Electronics' => [

                ],
                'Interior Accessories' => [

                ],
                'Exterior Accessories',
                'Oils & Fluids' => [

                ],
                'Tyre & Rims' => [

                ],
            ],
            'Computing'  => [
                'Desktop' => [

                ],
                'Laptop' => [

                ],
                'Drives & Storage' => [

                ],
                'Antivirus & Securit' => [

                ],
                'Printers & Accessories' => [

                ],
                'Computer Accessories' => [

                ],
                'Displays & Projector' => [

                ],
            ],
            'Mobile Phones & Tablets'  => [
                'Mobile Phones' => [

                ],
                'Tablets' => [

                ],
                'Accessories' => [

                ],
                'Wearable' => [

                ],
            ],
            'Home & Office'  => [
                'Furniture' => [

                ],
                'Decoration' => [

                ],
                'Stationery' => [

                ],
                'Lightning' => [

                ],
                'Garden' => [

                ],
                'Home Accessories' => [

                ],
                'Office Accessories' => [

                ],
                'Home Appliances' => [

                ],
                'Kitchen Appliances' => [

                ],
                'Kitchen & Dinin' => [

                ],
            ],
            'Fashion'  => [
                'Men\'s Fashion' => [

                ],
                'Women\'s Fashion' => [

                ],
                'boy\'s Fashion' => [

                ],
                'girl\'s Fashion' => [

                ],
                'Bags & Wallets' => [

                ],
                'Clothing' => [

                ],
                'Jewelry' => [

                ],
                'Shoes' => [

                ],
                'Wearables' => [

                ],
                'Underwear & Sleepwear' => [

                ],
                'Maternity' => [

                ],
                'Wedding' => [

                ],
                'Glasses' => [

                ],
            ],
            'Health & Beauty'  => [
                'Fragrances' => [

                ],
                'Bath & Body' => [

                ],
                'Hair Care' => [

                ],
                'Feminine Care' => [

                ],
                'Sexual Wellness' => [

                ],
                'Skin Care' => [

                ],
                'Dental Care' => [

                ],
                'Health Care' => [

                ],
                'Tools & Accessories' => [

                ],
                'Vitamins & Supplements' => [

                ],
            ],
            'Art, Sport & Outdoors'  => [
                'Books & Games' => [

                ],
                'Arts & Crafts' => [

                ],
                'Musical Instruments & Gear' => [

                ],
                'Sports Equipment' => [

                ],
                'Sports Accessories' => [

                ],
                'Exercise & Training Equipment' => [

                ],
                'Outdoor & Adventure' => [

                ],
            ],
            'Services'  => [
                'Automotive Services' => [

                ],
                'Building & Trade Services' => [

                ],
                'Chauffeur & Airport Transfer Services' => [

                ],
                'Child Care & Education Services' => [

                ],
                'Cleaning Services' => [

                ],
                'Computer & IT Services' => [

                ],
                'DJ & Entertainment Services' => [

                ],
                'Party, Catering & Event Services' => [

                ],
                'Health & Beauty Services' => [

                ],
                'Fitness & Personal Training Services' => [

                ],
                'Landscaping & Gardening Services' => [

                ],
                'Manufacturing Services' => [

                ],
                'Legal Services' => [

                ],
                'Pet Services' => [

                ],
                'Photography & Video Services' => [

                ],
                'Printing Services' => [

                ],
                'Recruitment Services' => [

                ],
                'Logistics Services' => [

                ],
                'Repair Services' => [

                ],
                'Tax & Financial Services' => [

                ],
                'Travel Agents & Tours' => [

                ],
                'Wedding Venues & Services' => [

                ],
                'Classes & Courses' => [

                ],
                'Other Services' => [

                ],
            ],
            'Tools & Machinery'  => [
                'Agriculture Machinery' => [

                ],
                'Construction Machinery' => [

                ],
                'Power & Generators' => [

                ],
                'Industrial Ovens' => [

                ],
                'Manufacturing Equipment' => [

                ],
                'Manufacturing Materials' => [

                ],
                'Medical Supplies & Equipment' => [

                ],
                'Printing Equipment' => [

                ],
                'Restaurant & Catering Equipment' => [

                ],
                'Safetywear & Equipment' => [

                ],
                'Store Equipment' => [

                ],
            ],
        ];

        $categoriesData = [];
        foreach ($subCategoriesGroups as $categoryName => $subCategoriesGroup){
            array_push($categoriesData, [
                'name' => $categoryName,
                'slug' => Str::slug($categoryName),
            ]);
        }

        Category::insert($categoriesData);

        $this->categories = Category::all();

        $subCategoriesData = [];

        foreach ($subCategoriesGroups as $categoryName => $subCategoriesGroup) {

            $category_id = $this->getCategoryBySlug($categoryName);

            foreach ($subCategoriesGroup as $subCategoryName => $attributes){
                array_push($subCategoriesData, [
                    'category_id' => $category_id,
                    'name' => $subCategoryName,
                    'slug' => Str::slug($subCategoryName),
                ]);
            }
        }

        SubCategory::insert($subCategoriesData);

    }

    private function getCategoryBySlug($name) {
        return $this->categories->where('slug', Str::slug($name))->first()->id;
    }
}
