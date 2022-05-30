<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function login(LoginRequest $request)
    {
        return $request->authenticate();
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
    }

    public function userInfo(Request $request)
    {
        return $request->user();
    }
}