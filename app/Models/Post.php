<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'question_id',
        'tag_id',
        'body',
        'video_path',
    ];

    public function upload($request)
    {
        $input_post = $request->all();

        $video = $request->file('video');
        $path = Storage::disk('s3')->putFile('image', $video, 'public');

        $this->video_path = Storage::disk('s3')->url($path);
        $this->body = 'sample';
        $this->fill($input_post)->save();
    }

    public function getMovie($request)
    {
        $query = Post::withCount('likes')->with('question', 'user', 'tag' ,'likes')->latest();  //それぞれのテーブルとリレーションを繋ぎ、降順に並べ替え
        $user_id = $request->input("id");
        $tag_id = $request->input('tag_id');
        $word = $request->input('word');

        if ($user_id) {  //ログイン中のユーザーの投稿だけに絞る
            $query->where('user_id', $user_id);
        }

        if($tag_id) {  //業界が選択されたら、その業界で絞る
            $query->where('tag_id', $tag_id);
        }

        if ($word) {  //キーワードが入力されたら、それを含むものに絞る
            $query->whereHas('question', function($q) use($word){
                $q->where('question', 'like', "%$word%");
            });
        }

        return $query->paginate(4);
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function question()
    {
        return $this->belongsTo('App\Models\Question');
    }

    public function tag()
    {
        return $this->belongsTo('App\Models\Tag');
    }

    public function likes()
    {
        return $this->hasmany(Like::class, 'post_id');
    }

    public function getByLimit(int $limit_count = 4)
    {
        return $this->orderBy('updated_at', 'DESC')->paginate($limit_count);
    }
}
