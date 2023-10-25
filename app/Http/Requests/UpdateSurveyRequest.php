<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSurveyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $survey = $this->route('survey');

        if ($this->user()->id !== $survey->user_id ) {
            return false;
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'exists:user,id',
            'title' => 'required'|'string'|'max:100',
            'image' => 'string',
            'describtion' => 'nullable'|'string',
            'status' => 'required'|'boolean',
            'expire_date' => 'nullable'|'date','after:date',
            'question' => 'array'
        ];
    }
}
