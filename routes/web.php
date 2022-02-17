<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/mypage', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/practice', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/timeline', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/likes', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/message', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/myposts', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/profile', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/timeline/{id}', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/myposts/{id}', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');

Route::get('/likes/{id}', function () {
    $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth');


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/', function() {
    return view('top');
});

Route::get('/test', function(){
    return view('test');
});

Route::get('/create', function () {
    return view('create');
});

Route::post('/create/posts', 'App\Http\Controllers\PostsController@upload');

Route::get('/output', 'App\Http\Controllers\PostsController@output');

