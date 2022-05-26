<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RelationRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'nullable',
            'phone' => 'nullable'
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}