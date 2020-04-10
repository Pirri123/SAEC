<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RubricOption extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['description', 'rubric_question_id'];

    //Relations
    const relations = ['rubricQuestion', 'rubricEvaluations'];

    public function rubricQuestion(){
        return $this->belongsTo('App\Models\RubricQuestion');
    }

    public function rubricEvaluations(){
        return $this->hasMany('App\Models\RubricEvaluation');
    }
}
