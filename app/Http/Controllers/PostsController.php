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

        $post->image_path = Storage::disk('s3')->url($path);

        $post->save();

        return redirect('/create');
    }

    public function upload(Request $request)
    {
        $post = new Post;
        $video = $request->file('video');

        $path = Storage::disk('s3')->putFile('image', $video, 'public');

        $post->image_path = Storage::disk('s3')->url($path);

        $post->save();

        return redirect('/mypage');
    }

    public function output()
    {
        $user_images = Post::all();
        return view('output', ['user_images' => $user_images]);
    }
}
