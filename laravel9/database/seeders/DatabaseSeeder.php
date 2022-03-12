<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {            
        for($i=0;$i<50;$i++){
           User::create([
               "name" => "user-".$i,
               "email" => "user".$i."@gmail.com",
               "password" => \Hash::make("12345678")
           ]);
        }
    }
}
