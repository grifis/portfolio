<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Question;
use App\Models\User;
use App\Models\Like;
use Illuminate\Support\Facades\Storage;

class PostsController extends Controller
{
    public function add()
    {
        return view('create');
    }

    public function create(Request $request)
    {
        $post = new Post;

        $image = $request->file('image');

        $path = Storage::disk('s3')->putFile('image', $image, 'public');

        $post->video_path = Storage::disk('s3')->url($path);

        return redirect('/create');
    }

    public function output()
    {
        $user_images = Post::all();
        return view('output', ['user_images' => $user_images]);
    }

    public function upload(Request $request, Post $post)
    {
        $post->upload($request);
    }

    public function question()
    {
        $question = Question::all();
        return response()->json(['que' => $question]);
    }

    public function timelinePost($postId)
    {
        $post = Post::with('question', 'user', 'tag')->find($postId);
        return response()->json(['post' => $post]);
    }

    public function deletePost($deleteId)
    {
        Post::where("id", $deleteId)->delete();
        return response()->json(['delete' => 'success']);
    }

    public function showMyPost($myPostId)
    {
        $myPost = Post::with('question', 'user')->find($myPostId);
        return response()->json(['myPost' => $myPost]);
    }

    public function like(Request $request)
    {
        Like::create($request->all());
    }

    public function unlike(Request $request)
    {
        $postId = $request->input('post_id');
        $userId = $request->input('user_id');
        $like = Like::where('post_id', $postId)->where('user_id', $userId)->first();
        $like->delete();
    }

    public function isLiked(Request $request)
    {
        $userId = $request->input('user_id');
        $postId = $request->input('post_id');
        $like = Like::where('user_id', $userId)->where('post_id', $postId)->first();
        $count = Like::where('post_id', $postId)->count();
        return response()->json(['bool' => isSet($like), 'count'=>$count]);
    }

    public function likesCount($id)
    {
        $count = Like::where('post_id', $id)->count();
        return response()->json(['count' => $count]);
    }

    public function movie(Request $request, Post $post)
    {
        $movie = $post->getMovie($request);
        return response()->json(['movie' => $movie]);
    }

    public function likePosts(Request $request)
    {
        $userId = $request->input('id');
        $posts = Post::with('question', 'user', 'tag')->whereHas('likes', function($q) use($userId){
            $q->where('user_id', $userId);
        })->paginate(4);
        return response()->json(['posts' => $posts]);
    }

    public function tag(Request $request)
    {
        $tag = Tag::all();
        return response()->json(['tag' => $tag]);
    }

    public function rank(Request $request)
    {
        $rank = Post::withCount('likes')->orderBy('likes_count', 'desc')->with('question', 'user', 'tag')->take(5)->get();
        return response()->json(['rank' => $rank]);
    }

    public function likePostRank(Request $request)
    {
        $id = $request->input("id");
        $rank = Post::whereHas('likes', function($q) use($id){
            $q->where('user_id', $id);
        })->withCount('likes')->orderBy('likes_count', 'desc')->with('question', 'user', 'tag')->take(5)->get();
        return response()->json(['rank' => $rank]);
    }

    public function myPostRank(Request $request)
    {
        $id = $request->input("id");
        $rank = Post::where('user_id', $id)->with('question', 'user', 'tag', 'likes')->withCount('likes')->orderBy('likes_count', 'desc')->take(5)->get();
        return response()->json(['rank' => $rank]);
    }

    public function profile($profile)
    {
        $profile = User::where('id', $profile)->with('tag')->first();
        return response()->json(['profile' => $profile]);
    }

    public function modifyProfile(Request $request, User $user)
    {
        $input = $request->all();
        $user->fill($input)->save();
    }
}
