<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Form extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'admin_id'];

    //Relations
    const relations = ['admin', 'questions', 'assignments'];

    public function admin(){
        return $this->belongsTo('App\User', 'admin_id', 'id');
    }

    public function questions(){
        return $this->hasMany('App\Models\Question');
    }

    public function assignments(){
        return $this->hasMany('App\Models\Assignment');
    }
}
