<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['question', 'type', 'form_id'];

    //Relations
    const relations = ['form', 'options', 'answers'];

    public function form(){
        return $this->belongsTo('App\Models\Form');
    }

    public function options(){
        return $this->hasMany('App\Models\Option');
    }

    public function answers(){
        return $this->hasMany('App\Models\Answer');
    }
}
