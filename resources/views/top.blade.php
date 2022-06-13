<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>面接の達人</title>
        <meta name="description" content="画期的な面接練習サイト、面接の達人">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="{{ asset('css/top.css') }}">


        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body id="home" class="big-bg">
        <div class="home-content wrapper">
            <h2 class="page-title">さぁ、面接を始めよう</h2>
            <p>学生時代に力を入れたこと...あなたは答えられますか？</p>
            @if (Route::has('login'))
                <div>
                    @auth
                        <a class="button" href="{{ url('/sideBar') }}">マイページ</a>
                    @else
                        <a class="button" href="{{ route('login') }}">ログイン</a>

                        @if (Route::has('register'))
                            <a class="button" href="{{ route('register') }}">新規登録</a>
                        @endif
                    @endauth
                </div>
            @endif
        </div>
    </body>
</html>
