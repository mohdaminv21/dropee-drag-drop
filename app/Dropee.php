<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dropee extends Model
{
    protected $table = "dropee";
    protected $fillable = ['row','column','text','color','style'];
}
