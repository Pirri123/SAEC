<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RubricQuestion extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['question', 'rubric_id'];

    //Relations
    const relations = ['rubric', 'rubricOptions', 'rubricEvaluations'];

    public function rubric(){
        return $this->belongsTo('App\Models\Rubric');
    }

    public function rubricOptions(){
        return $this->hasMany('App\Models\RubricOption');
    }

    public function rubricEvaluations(){
        return $this->hasMany('App\Models\RubricEvaluation');
    }
}
