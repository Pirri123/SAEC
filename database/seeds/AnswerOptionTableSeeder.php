<?php

use Illuminate\Database\Seeder;

class AnswerOptionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('answer_option')->insert([
            'option_id' => 1,
            'answer_id' => 3
        ]);

        DB::table('answer_option')->insert([
            'option_id' => 3,
            'answer_id' => 3
        ]);

        DB::table('answer_option')->insert([
            'option_id' => 6,
            'answer_id' => 4
        ]);
    }
}
