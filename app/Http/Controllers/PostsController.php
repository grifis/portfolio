<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
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

    public function upload(Request $request)
    {
        $post = new Post;
        $video = $request->file('video');
        $id = $request->input('userId');

        $path = Storage::disk('s3')->putFile('image', $video, 'public');

        $post->video_path = Storage::disk('s3')->url($path);
        $post->user_id = $id;
        $post->body = 'sample';
        $post->question_id = 1;

        $post->save();

        return ;
    }

    public function userUpload(Request $request)
    {
        $post = new Post;
        $id = $request->input('userId');
        $post->user_id = $id;
        $post->save();
        return ;
    }

    public function output()
    {
        $user_images = Post::all();
        return view('output', ['user_images' => $user_images]);
    }
}
