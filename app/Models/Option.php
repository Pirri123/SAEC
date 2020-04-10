<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Option extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['description', 'question_id'];

    //Relations
    const relations = ['question', 'answers'];

    public function question(){
        return $this->belongsTo('App\Models\Question');
    }

    public function answers(){
        return $this->belongsToMany('App\Models\Answer');
    }
}
