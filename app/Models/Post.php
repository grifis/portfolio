<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'tag_id',
        'text',
    ];

    public function getMovie($request)
    {
        $query = Post::with('question', 'user', 'tag' ,'likes')->latest();  //それぞれのテーブルとリレーションを繋ぎ、降順に並べ替え
        $user_id = $request->input("id");
        $tag_id = $request->input('tag_id');
        $word = $request->input('word');

        if ($user_id) {  //ログイン中のユーザーの投稿だけに絞る
            $query->where('user_id', $user_id);
        }

        if ($tag_id) {  //業界が選択されたら、その業界で絞る
            $query->whereHas('tag', function($q) use($tag_id){
                $q->where('id', $tag_id);
            });
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
