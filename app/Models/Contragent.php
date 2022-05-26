<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contragent extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'surname'
    ];

    public function phones() {
        return $this->hasMany(Phone::class);
    }

    public function emails() {
        return $this->hasMany(Mail::class);
    }
}
