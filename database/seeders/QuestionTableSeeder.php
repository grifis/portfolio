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
        $questions = [
            "学生時代に力を入れたことは何ですか？", "あなたの強み、弱みを教えてください", "なぜこの業界を志望しているのですか？", "自由に自己PRをしてください", "リーダー経験はありますか？", "挫折経験を教えてください", "あなたを漢字2文字で表すと何ですか？", "今後のキャリアプランを教えてください",
            "尊敬する人はいますか？また、その理由も教えてください", "就職後はどのようなことがしたいですか？", "リーダー経験はありますか？", "自分の大学生活を一言で表してください", "あなたは周りからどんな人だと言われますか？", "決断するときは何を基準に決断しますか？",
            "就活の軸を教えてください", "休みの日はどうやって過ごしますか？", "最近、気になったニュースを教えてください"
        ];
        foreach ($questions as $question) {
            Question::create([
                'question' => $question
            ]);
        }
    }
}
