<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon; 

class AssignmentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('assignments')->insert([
            'name' => 'Activity 1',
            'start_date' => Carbon::now(),
            'due_date' => Carbon::now()->addDay(),
            'close_date' => Carbon::now()->addDays(2),
            'group_id' => 1,
            'professor_id' => 'L00000000',
            'form_id' => 1
        ]);

        DB::table('assignments')->insert([
            'name' => 'Activity 2',
            'start_date' => Carbon::now(),
            'due_date' => Carbon::now()->addDay(),
            'close_date' => Carbon::now()->addDays(2),
            'group_id' => 1,
            'professor_id' => 'L00000000',
            'form_id' => 2
        ]);
    }
}
