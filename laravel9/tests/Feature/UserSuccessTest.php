<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserSuccessTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_store()
    {
        $this->withoutExceptionHandling();

        # TEST STORE
        $this->json("POST","/api/user/",[
                "name" => "store",
                "email" => "store@gmail.com",
                "password" => \Hash::make("12345678")
            ])
            ->assertStatus(200)
            ->assertExactJson([
                "message" => True,
            ]);

        $this->assertCount(1,User::where("name","store")->get());
    }

    public function test_store_upload(){

    }
    
    public function test_update(){
        $this->withoutExceptionHandling();

        $user = User::create([
            "name" => "edit",
            "email" => "edit@gmail.com",
            "password" => \Hash::make("12345678")
        ]);

        # TEST UPDATE
        $this->json("PUT","/api/user/".$user->id,[
                "name" => "update",
                "email" => "update@gmail.com",
                "password" => \Hash::make("password")
            ])
            ->assertStatus(200)
            ->assertExactJson([
                "message" => True,
            ]);

        $this->assertCount(1,User::where("name","update")->where("email","update@gmail.com")->get());
    }

    public function test_update_upload(){

    }

    /**
     * A basic feature test example
     * 
     * @return void
    */
    public function test_destroy(){
        $this->withoutExceptionHandling();
                
        $user = User::create([
            "name" => "destroy",
            "email" => "destroy@gmail.com",
            "password" => \Hash::make("12345678")
        ]);

        # TEST DELETE
        $this->json("DELETE","/api/user/".$user->id)
            ->assertStatus(200)
            ->assertExactJson([
                "message" => True,
            ]);

        $this->assertCount(0,User::where("name","destroy")->get());
    }

    public function test_destroy_upload(){

    }

    public function test_show(){
        $this->withoutExceptionHandling();

        $user = User::create([
            "name" => "show",
            "email" => "show@gmail.com",
            "password" => \Hash::make("12345678")
        ]);

        # TEST SHOW
        $this->json("GET","/api/user/".$user->id)
            ->assertStatus(200)
            ->assertJson([
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email,                
                "photo" => "default.png",                
            ]);        
    }

    public function test_show_upload(){

    }

    public function test_index(){
        $this->withoutExceptionHandling();

        for($i=0;$i<30;$i++){
            User::create([
                "name" => "index-".$i,
                "email" => "index".$i."@gmail.com",
                "password" => \Hash::make("12345678")
            ]);
        }

        // TESTING DEFAULT
        $this->json("GET","/api/user")
            ->assertStatus(200)
            ->assertJson([
                "total" => 30,
                "current_page" => 1,
                "last_page" => 3
            ]);
        
        # TESTING SEARCH
        $this->json("GET","/api/user?search=index29")
            ->assertStatus(200)
            ->assertJson([
                "total" => 1,
                "current_page" => 1,
                "last_page" => 1
            ]);    
        
        # TESTING PAGE
        $this->json("GET","/api/user?page=2")
            ->assertStatus(200)
            ->assertJson([
                "total" => 30,
                "current_page" => 2,
                "last_page" => 3
            ]);
        
    }
}
