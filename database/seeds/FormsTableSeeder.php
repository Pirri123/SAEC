<?php

use Illuminate\Database\Seeder;

class FormsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('forms')->insert([
            'name' => 'Form1',
            'admin_id' => 'L00000000'
        ]);

        DB::table('forms')->insert([
            'name' => 'Form2',
            'admin_id' => 'L00000001'
        ]);
    }
}
