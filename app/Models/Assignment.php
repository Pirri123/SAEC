<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'start_date', 'due_date', 'close_date', 'group_id', 'professor_id', 'form_id'];
    protected $dates = ['start_date', 'due_date', 'close_date'];

    //Relations
    const relations = ['professor', 'group', 'form', 'answers', 'Rubric'];

    public function professor(){
        return $this->belongsTo('App\User', 'professor_id', 'id');
    }

    public function group(){
        return $this->belongsTo('App\Models\Group');
    }

    public function form(){
        return $this->belongsTo('App\Models\Form');
    }

    public function answers(){
        return $this->hasMany('App\Models\Answer');
    }

    public function rubric(){
        return $this->hasOne('App\Models\Rubric');
    }

}
