<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation() 
    {
     $this->merge([
        'user_id' => $this->user()->id,
     ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'exists:users,id',
            'title' => 'required|string|max:100',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'status' => 'required|boolean',
            'expire_date' => 'nullable|date|after:today',
            'questions' => 'array'
        ];
    }
}