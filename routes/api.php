<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ApiAuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\BankController;

Route::prefix('v1')->group(function(){
    // Auth
    Route::post('/auth', [ApiAuthController::class, 'auth'])->name('auth');

    Route::middleware('auth:sanctum')->group(function () {        
        // Logout by revoking the current token
        Route::post('/logout', [ApiAuthController::class, 'logout'])->name('logout');
        
        // Resources
        Route::resource('user', UserController::class);
        Route::resource('bank', BankController::class);
    });
});