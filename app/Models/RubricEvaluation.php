<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RubricEvaluation extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['student_id', 'rubric_id', 'rubric_question_id', 'rubric_option_id'];

    //Relations
    const relations = ['student', 'rubric', 'rubricQuestion', 'rubricOption'];

    public function student(){
        return $this->belongsTo('App\User', 'student_id', 'id' );
    }

    public function rubric(){
        return $this->belongsTo('App\Models\Rubric');
    }

    public function rubricQuestion(){
        return $this->belongsTo('App\Models\RubricQuestion');
    }

    public function rubricOption(){
        return $this->belongsTo('App\Models\RubricOption');
    }
}
