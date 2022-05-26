<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContragentStoreRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'required|string',
            'surname' => 'nullable|string',
            'phones' => 'nullable|array',
            'emails' => 'nullable|array'
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}