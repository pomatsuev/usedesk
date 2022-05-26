<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SearchRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'search' => 'nullable|string',
            'fields' => 'nullable|array'
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}