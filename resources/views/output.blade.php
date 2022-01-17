@extends('layouts.app')

@section('content')
    <a href="/create">画像のアップロードに戻る</a>
    <br>
    <video src="{{ $user_images[4]->image_path }}" controls width="60%">aaa</video>
    <br>
@endsection
