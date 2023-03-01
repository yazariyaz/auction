<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SubLocationResource extends JsonResource
{

    public function toArray($request)
    {
        $data = [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,

        ];

        if ($this->relationLoaded('location')){
            $data['location'] = LocationResource::make($this->location);
        }

        return $data;
    }
}
