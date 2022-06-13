<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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
Route::post('/create/posts', 'App\Http\Controllers\PostsController@create');
Route::get('/output', 'App\Http\Controllers\PostsController@output');


Route::get('/{any}', function(){
        $user = json_encode(Auth::user());
    return view('app', compact('user'));
})->middleware('auth')->where('any', '.*');
