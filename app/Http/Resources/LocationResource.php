<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{

    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
        ];

        if ($this->relationLoaded('subLocations')){
            $data['subLocations'] = SubLocationResource::collection($this->subLocations);
        }

        return $data;
    }
}
