<?php

use Illuminate\Database\Seeder;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('groups')->insert([
            'class_code' => 'TC3048',
            'group_number' => 'Group 1',
            'professor_id' => 'L00000000'
        ]);
    }
}
