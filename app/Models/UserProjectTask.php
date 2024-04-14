<?php

namespace App\Models;

use Illuminate\Support\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserProjectTask extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    /**
     * Get the user that owns the Project
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id');
    // }

    /**
     * Get all of the issues for the Project
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    // public function user()
    // {
    //     return $this->belongsTo(User::class, 'user_id', 'id');
    // }
    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    // Define the relationship with the User model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
