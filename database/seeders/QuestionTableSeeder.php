<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Question;

class QuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = ["学生時代に力を入れたことは何ですか？", "あなたの強み、弱みを教えてください", "なぜこの業界を志望しているのですか？", "自由に自己PRをしてください", "リーダー経験はありますか？", "挫折経験を教えてください", "あなたを漢字2文字で表すと何ですか？", "今後のキャリアプランを教えてください"];
        foreach ($questions as $question) {
            Question::create([
                'question' => $question
            ]);
        }
    }
}
