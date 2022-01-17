@extends('layouts.app')

@section('content')
    <form action="/create/posts" method="post" enctype="multipart/form-data">
        <input type="file" name="image">
        {{ csrf_field() }}
        <input type="submit" value="アップロード">
    </form>

@endsection
