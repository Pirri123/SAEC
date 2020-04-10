<?php

namespace App;

use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable, HasRoles, HasApiTokens;
    public $incrementing = false;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'name', 'email', 'password', 'lastname', 'semester', 'mayor', 'campus'
    ];

    protected $casts = ['id' => 'string'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'confirmation_code'
    ];

    //Relations
    const relations = ['forms', 'groups', 'groupStudent', 'answers', 'assignments', 'rubricEvaluations'];

    public function forms(){
        return $this->hasMany('App\Models\Form', 'admin_id');
    }

    public function groups(){
        return $this->hasMany('App\Models\Group', 'professor_id');
    }

    public function answers(){
        return $this->hasMany('App\Models\Answer', 'student_id');
    }

    public function assignments(){
        return $this->hasMany('App\Models\Assignment', 'professor_id');
    }

    public function rubrics(){
        return $this->hasMany('App\Models\Rubric', 'professor_id');
    }

    public function groupStudent(){
        return $this->belongsToMany('App\Models\Group', 'group_student', 'student_id', 'group_id');
    }

    public function rubricEvaluations(){
        return $this->hasMany('App\Models\RubricEvaluation', 'student_id');
    }



}
