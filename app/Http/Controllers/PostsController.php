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
        return view('posts.create');
    }

    public function create(Request $request)
    {
        $post = new Post;
        $form = $request->all();

        $image = $request->file('image');

        $path = Storage::disk('s3')->putFile('image', $image, 'public');

        $post->video_path = Storage::disk('s3')->url($path);

        $post->save();

        return redirect('/create');
    }

    public function output()
    {
        $user_images = Post::all();
        return view('output', ['user_images' => $user_images]);
    }

    public function upload(Request $request)
    {
        $post = new Post;
        $video = $request->file('video');
        $userId = $request->input('userId');
        $tagId = $request->input('tagId');
        $questionId = $request->input('questionId');


        $path = Storage::disk('s3')->putFile('image', $video, 'public');

        $post->video_path = Storage::disk('s3')->url($path);
        $post->user_id = $userId;
        $post->tag_id = $tagId;
        $post->body = 'sample';
        $post->question_id = $questionId;

        $post->save();

        return ;
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
        Like::create([
            'post_id' => $request->input('post_id'),
            'user_id' => $request->input('user_id'),
        ]);

        session()->flash('success', 'You Liked the Post');
        return ;
    }

    public function unlike(Request $request)
    {
        $postId = $request->input('post_id');
        $userId = $request->input('user_id');
        $like = Like::where('post_id', $postId)->where('user_id', $userId)->first();
        $like->delete();
        return ;
    }

    public function isLiked(Request $request)
    {
        $userId = $request->input('user_id');
        $postId = $request->input('post_id');
        $like = Like::where('user_id', $userId)->where('post_id', $postId)->first();
        $count = Like::where('post_id', $postId)->count();
        if ($like) {
            return response()->json(['bool' => True, 'count'=>$count]);
        } else {
            return response()->json(['bool' => False, 'count'=>$count]);
        }
    }

    public function likesCount($id)
    {
        $count = Like::where('post_id', $id)->count();
        return response()->json(['count' => $count]);
    }

    public function movie(Request $request)
    {
        $movie = Post::with('question', 'user', 'tag' ,'likes')->latest()->paginate(4);
        $tag_id = $request->input('tag_id');
        if ($tag_id) {
            $movie = Post::with('question', 'user', 'tag' ,'likes')->whereHas('tag', function($q) use($tag_id){
                $q->where('id', $tag_id);
            })->latest()->paginate(4);
        }
        return response()->json(['movie' => $movie, 'tag_id' => $tag_id]);
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
}
