<?php

use App\Http\Controllers\Api\ContragentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::get('/contragents', [ContragentsController::class, 'index']);
Route::post('/contragent', [ContragentsController::class, 'store']);
Route::put('/contragent/{contragent}', [ContragentsController::class, 'update']);
Route::post(
    '/contragent/{contragent}/attach',
    [ContragentsController::class, 'addRelationObject']
);
Route::post('/delete-attach', [ContragentsController::class, 'destroyRelationObject']);
Route::delete('/contragent/{contragent}', [ContragentsController::class, 'destroy']);
