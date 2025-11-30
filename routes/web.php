<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');



// Demo
Route::get('/increment', function () {
    return Inertia::render('Increment');
})->name('increment');

Route::get('/counter', function () {
    return Inertia::render('Counter');
})->name('counter');

Route::get('/birthday', function () {
    return Inertia::render('Birthday');
})->name('birthday');

Route::get('/name', function () {
    return Inertia::render('Name');
})->name('name');

// Routing
Route::get('/dynamic/{slug?}', function (string $slug = 'No dynamic URL') {
    return Inertia::render('Dynamic', [
        'slug' => $slug
    ]);
})->name('dynamic');


// Guarded
Route::prefix('admin')
    // ->middleware(['auth'])    
    ->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/Dashboard');
    })->name('dashboard');
    
    Route::resource('users', UserController::class);
    Route::resource('tickets', TicketController::class);

});


// User pages
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');