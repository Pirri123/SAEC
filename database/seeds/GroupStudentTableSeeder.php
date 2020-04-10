<?php

use Illuminate\Database\Seeder;

class GroupStudentTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('group_student')->insert([
            'group_id' =>  1,
            'student_id' => 'A00000000'
        ]);

        DB::table('group_student')->insert([
            'group_id' =>  1,
            'student_id' => 'A00000001'
        ]);

        DB::table('group_student')->insert([
            'group_id' =>  1,
            'student_id' => 'A00000002'
        ]);
    }
}
