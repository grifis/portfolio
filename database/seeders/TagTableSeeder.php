<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = ["メーカー", "小売", "サービス", "ソフトウェア・通信", "商社", "金融", "マスコミ", "官公庁・公社・団体"];
        foreach ($tags as $tag) {
            Tag::create([
                'tag' => $tag
            ]);
        }
    }
}
