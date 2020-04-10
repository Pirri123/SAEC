<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rubric extends Model
{
   /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'professor_id'];

    //Relations
    const relations = ['professor', 'questions', 'assignment', 'rubricEvaluations'];

    public function  assignment(){
        return $this->belongsTo('App\Models\Assignment');
    }

    public function professor(){
        return $this->belongsTo('App\User', 'professor_id', 'id');
    }

    public function questions(){
        return $this->hasMany('App\Models\RubricQuestion');
    }

    public function rubricEvaluations(){
        return $this->hasMany('App\Models\RubricEvaluation');
    }
}
