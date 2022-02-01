<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/user', function (Request $request) {
    $users = App\Models\User::all();
    return response()->json(['users' => $users]);
});

Route::get('/movie', function(Request $request) {
    $movie = App\Models\Post::all();
    return response()->json(['movie' => $movie]);
});

Route::post('/api/logout', 'Auth\RegisterController@showRegistrationForm')->name('register');

Route::post('/upload', 'App\Http\Controllers\PostsController@upload');


