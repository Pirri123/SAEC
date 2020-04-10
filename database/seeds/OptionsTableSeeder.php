<?php

use Illuminate\Database\Seeder;

class OptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('options')->insert([
            'description' => 'q3op1',
            'question_id' => 3
        ]);

        DB::table('options')->insert([
            'description' => 'q3op2',
            'question_id' => 3
        ]);

        DB::table('options')->insert([
            'description' => 'q3op3',
            'question_id' => 3
        ]);

        DB::table('options')->insert([
            'description' => 'q4op1',
            'question_id' => 4
        ]);

        DB::table('options')->insert([
            'description' => 'q4op2',
            'question_id' => 4
        ]);

        DB::table('options')->insert([
            'description' => 'q4op3',
            'question_id' => 4
        ]);
    }
}
