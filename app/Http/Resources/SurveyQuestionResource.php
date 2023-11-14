<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyQuestionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'question' => $this->question,
            'description' => $this->description,
            // 'data' => !!$this->data,
            // 'survey_id' => $this->survey_id,
            // 'created_at' => $this->created_at,
            // 'updated_at' => $this->updated_at,
            // 'expire_date' => $this->expire_date,     
        ];
    }
}
