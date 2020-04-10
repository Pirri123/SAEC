<?php

use Illuminate\Database\Seeder;

class AnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('answers')->insert([
            'student_id' => 'A00000000',
            'question_id' => 1,
            'short_ans' => 'short',
            'assignment_id' => 1
        ]);

        DB::table('answers')->insert([
            'student_id' => 'A00000000',
            'question_id' => 2,
            'long_ans' => 'long',
            'assignment_id' => 1
        ]);
        
        DB::table('answers')->insert([
            'student_id' => 'A00000001',
            'question_id' => 3,
            'num_selected_options' => 2,
            'assignment_id' => 2
        ]);

        DB::table('answers')->insert([
            'student_id' => 'A00000001',
            'question_id' => 4,
            'num_selected_options' => 1,
            'assignment_id' => 2
        ]);
    }
}
