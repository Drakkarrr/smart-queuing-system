<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Queue extends Model
{
    use HasFactory;

    protected $fillable = ['priority_number', 'status', "done_at", 'last_served_id', 'que_type', 'account_number'];

    public function lastServed()
    {
        return $this->belongsTo(Queue::class, 'last_served_id');
    }
}
