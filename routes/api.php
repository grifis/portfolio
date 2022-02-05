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

/*Route::get('/movie', function(Request $request) {
    $movie = DB::table('posts')
        ->leftJoin('questions','posts.question_id','=','questions.id')
        ->leftJoin('users','posts.user_id','=','users.id')
        ->get();
    return response()->json(['movie' => $movie]);
});
*/

/*
Route::get('/movie', function(Request $request) {
    $movie = App\Models\Question::with('posts')->get();
    return response()->json(['movie' => $movie]);
});
 */

Route::get('/movie', function(Request $request) {
    $movie = App\Models\Post::with('question', 'user')->get();
    return response()->json(['movie' => $movie]);
});


Route::post('/api/logout', 'Auth\RegisterController@showRegistrationForm')->name('register');

Route::post('/upload', 'App\Http\Controllers\PostsController@upload');

Route::post('/userUpload', 'App\Http\Controllers\PostsController@userUpload');

Route::get('/question', 'App\Http\Controllers\PostsController@question');

Route::get('/timeline/{post}', function($postId) {
    $post = App\Models\Post::with('question', 'user')->find($postId);
    return response()->json(['post' => $post]);
});

