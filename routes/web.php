<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Jobs\ProcessUserUpdate;

Route::get('/login', function () {
    ProcessUserUpdate::dispatch()->onQueue('auth-logs');

    return Inertia::render('Login');
})->name('login');

Route::group(['middleware' => ['web']], function () {
    Route::get('/sanctum/csrf-cookie', function () {
        return response('OK');
    });
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});


require __DIR__.'/settings.php';