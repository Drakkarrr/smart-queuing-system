<?php

namespace Tests\Feature;

use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AdminLoginTest extends TestCase {
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_admin_login() {
        $response = $this->postJson('/api/login', [
            'email' => 'admin@gmail.com',
            'password' => 'password',
        ]);

        $response
        ->assertJson(fn (AssertableJson $json) => $json->where('error', 0)
                 ->has('token')
                 ->etc()
        );
    }

    public function test_admin_login_fail() {
        $response = $this->postJson('/api/login', [
            'email' => 'admin@gmail.com',
            'password' => 'passward',
        ]);

        $response
        ->assertJson(fn (AssertableJson $json) => $json->where('error', 1)
                 ->missing('token')
                 ->has('message')
        );
    }
}
