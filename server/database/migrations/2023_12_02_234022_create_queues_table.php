<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('queues', function (Blueprint $table) {
            $table->id();
            $table->integer('priority_number')->unique();
            $table->string('status')->default('pending'); // e.g., pending, serving, completed
            $table->string('que_type'); // e.g., 'concern', 'payment'
            $table->string('account_number')->nullable(); // Make this nullable
            $table->dateTime('done_at')->nullable();
            $table->unsignedBigInteger('last_served_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('queues');
    }
};
