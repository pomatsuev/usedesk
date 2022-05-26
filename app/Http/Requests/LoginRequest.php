<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class LoginRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email' => 'required|string',
            'password' => 'required|string|min:3',
            'remember' => 'required|boolean',
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'remember' => $this->getRemember()
        ]);
    }

    public function getRemember()
    {
        $remember = $this->input('remember');
        return $remember and $remember === 'on';
    }

    public function getCredentials()
    {
        return [
            'email' => $this->input('email'),
            'password' => $this->input('password'),
        ];
    }

    public function authenticate()
    {
        $this->checkThrottle();
        if (!Auth::attempt($this->getCredentials(), $this->input('remember', false))) {
            RateLimiter::hit($this->limiterKey());
            throw ValidationException::withMessages([
                'email' => __('auth.failed'),
                'try' => RateLimiter::attempts($this->limiterKey()),
                'attempts' => RateLimiter::retriesLeft($this->limiterKey(), 5)
            ]);
        }

        RateLimiter::clear($this->limiterKey());

        $token = $this->user()->createToken('myApiToken')->plainTextToken;

        return [
            $token,
            $this->user()
        ];
    }

    public function checkThrottle()
    {
        if (!RateLimiter::tooManyAttempts($this->limiterKey(), 5)) {
            return;
        }

        throw ValidationException::withMessages([
            'email' => __('auth.throttle', [
                'seconds' => RateLimiter::availableIn($this->limiterKey())
            ])
        ]);

    }

    public function limiterKey()
    {
        return $this->input('email') . '|' . $this->ip();
    }
}
