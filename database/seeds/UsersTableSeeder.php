<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use App\User;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::create([
            'id' => 'Admin1234',
            'name' => 'Admin',
            'email' => 'admin@test.com',
            'image' => 'https://storage.googleapis.com/depa-storage/profiles/profile.png',
            'password' => Hash::make('secret'),
            'lastname' => 'Admin',
            'campus' => 'PUE',
            'confirmation_code' => Uuid::uuid1()
        ]);
        $admin->assignRole('admin');
        $admin->email_verified_at = Carbon::now();
        $admin->save();

        $professors = [];
        array_push($professors, User::create([
            'id' => 'L00000000',
            'name' => 'P1',
            'email' => 'p1@tec.mx',
            'image' => 'https://storage.googleapis.com/depa-storage/profiles/profile.png',
            'password' => bcrypt('secret'),
            'lastname' => 'P1',
            'campus' => 'PUE',
            'confirmation_code' => Uuid::uuid1()
        ]));

        array_push($professors, User::create([
            'id' => 'L00000001',
            'name' => 'P2',
            'email' => 'p2@tec.mx',
            'image' => 'https://storage.googleapis.com/depa-storage/profiles/profile.png',
            'password' => bcrypt('secret'),
            'lastname' => 'P2',
            'campus' => 'PUE',
            'confirmation_code' => Uuid::uuid1()
        ]));

        array_push($professors, User::create([
            'id' => 'L00000002',
            'name' => 'P3',
            'email' => 'p3@tec.mx',
            'image' => 'https://storage.googleapis.com/depa-storage/profiles/profile.png',
            'password' => bcrypt('secret'),
            'lastname' => 'P3',
            'campus' => 'PUE',
            'confirmation_code' => Uuid::uuid1()
        ]));

        $students = [];
        array_push($students, User::create([
            'id' => 'A00000000',
            'name' => 'S1',
            'email' => 'A00000000@itesm.mx',
            'image' => 'https://storage.googleapis.com/depa-storage/profiles/profile.png',
            'password' => bcrypt('secret'),
            'lastname' => 'S1',
            'campus' => 'CCM',
            'confirmation_code' => Uuid::uuid1()
        ]));

        array_push($students, User::create([
            'id' => 'A00000001',
            'name' => 'S2',
            'email' => 'A00000001@itesm.mx',
            'image' => 'https://storage.googleapis.com/depa-storage/profiles/profile.png',
            'password' => bcrypt('secret'),
            'lastname' => 'S2',
            'campus' => 'CEM',
            'confirmation_code' => Uuid::uuid1()
        ]));

        array_push($students,User::create([
            'id' => 'A00000002',
            'name' => 'S3',
            'email' => 'A00000002@itesm.mx',
            'image' => 'https://storage.googleapis.com/depa-storage/profiles/profile.png',
            'password' => bcrypt('secret'),
            'lastname' => 'S3',
            'campus' => 'CEM',
            'confirmation_code' => Uuid::uuid1()
        ]));
        
        self::assignRoles($students, 'student');
        self::assignRoles($professors, 'professor');
    }

    static function assignRoles($users, $role) {
        foreach($users as $user) {
            $user->assignRole($role);
            $user->email_verified_at = \Carbon\Carbon::now();
            $user->save();
        }
    }
}
