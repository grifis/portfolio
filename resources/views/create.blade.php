@extends('layouts.app')

@section('content')
    <form action="/create/posts" method="post" enctype="multipart/form-data">
    	<input type='text' name="test"/>
        <input type="file" name="image">
        {{ csrf_field() }}
        <input type="submit" value="アップロード">
        <iframe src="https://folk-media.com/">
        	<a href="https://folk-media.com/">こちらから</a>
        </iframe>
    </form>
    @foreach($posts as $post)
        <p>{{$post->title}}</p>
    @endforeach
    {{dd($posts)}}


@endsection
