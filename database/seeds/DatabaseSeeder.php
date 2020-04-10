<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(PermissionsTableSeeder::class);
        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(GroupsTableSeeder::class);
        $this->call(GroupStudentTableSeeder::class);
        $this->call(FormsTableSeeder::Class);
        $this->call(QuestionsTableSeeder::Class);
        $this->call(AssignmentsTableSeeder::Class);
        $this->call(AnswersTableSeeder::Class);
        $this->call(OptionsTableSeeder::Class);
        $this->call(AnswerOptionTableSeeder::Class);
    }
}
