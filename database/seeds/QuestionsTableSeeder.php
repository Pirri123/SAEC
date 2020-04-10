<?php

use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('questions')->insert([
            'question' => 'Q1?',
            'type' => 'SHORT',
            'form_id' => 1
        ]);

        DB::table('questions')->insert([
            'question' => 'Q2?',
            'type' => 'LONG',
            'form_id' => 1
        ]);


        DB::table('questions')->insert([
            'question' => 'Q3?',
            'type' => 'SQUARE',
            'form_id' => 2
        ]);

        DB::table('questions')->insert([
            'question' => 'Q4?',
            'type' => 'RADIO',
            'form_id' => 2
        ]);
    }
}
