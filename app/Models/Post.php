<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

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
