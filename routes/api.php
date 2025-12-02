<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BankController;
use App\Http\Controllers\UserController;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function(){
    // Auth
    Route::post('/auth', 'App\Http\Controllers\AuthController@login');

    // Resources
    Route::resource('user', UserController::class);
    Route::resource('bank', BankController::class);
});
