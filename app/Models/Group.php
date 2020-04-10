<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    //Relations
    const relations = ['professor', 'students', 'assignments'];


    //Fillable atributes
    protected $fillable = ['class_code', 'group_number', 'professor_id'];

    public function professor(){
        return $this->belongsTo('App\User', 'professor_id', 'id');
    }

    public function assignments(){
        return $this->hasMany('App\Models\Assignment');
    }

    public function students(){
        return $this->belongsToMany('App\User', 'group_student', 'group_id', 'student_id');
    }
}
