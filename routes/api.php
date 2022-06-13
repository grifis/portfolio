<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;

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
Route::get('/movie', 'App\Http\Controllers\PostsController@movie');
Route::get('/myPosts', 'App\Http\Controllers\PostsController@myPost');
Route::get('/likePosts', 'App\Http\Controllers\PostsController@likePosts');
Route::post('/api/logout', 'Auth\RegisterController@showRegistrationForm')->name('register');
Route::post('/upload', 'App\Http\Controllers\PostsController@upload');
Route::get('/question', 'App\Http\Controllers\PostsController@question');
Route::get('/timeline/{postId}', 'App\Http\Controllers\PostsController@timelinePost');
Route::get('/mypost/{myPostId}', 'App\Http\Controllers\PostsController@showMyPost');
Route::get('/isLiked/{id}', 'App\Http\Controllers\PostsController@isLiked');
Route::get('/likesCount/{id}', 'App\Http\Controllers\PostsController@likesCount');
Route::get('/tag', 'App\Http\Controllers\PostsController@tag');
Route::get('/rank', 'App\Http\Controllers\PostsController@rank');
Route::get('/likePostRank', 'App\Http\Controllers\PostsController@likePostRank');
Route::get('/myPostRank', 'App\Http\Controllers\PostsController@myPostRank');
Route::get('/profile/{profile}', 'App\Http\Controllers\PostsController@profile');
Route::put('/profile/modify/{user}', 'App\Http\Controllers\PostsController@modifyProfile');
Route::post('/like/{id}', 'App\Http\Controllers\PostsController@like');
Route::delete('/unlike/{id}', 'App\Http\Controllers\PostsController@unlike');
Route::delete('/delete/{deleteId}', 'App\Http\Controllers\PostsController@deletePost');
