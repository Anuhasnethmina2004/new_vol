<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\User;
use App\Models\Issue;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ProjectEnroll;
use App\Models\UserProjectTask;
use Illuminate\Support\Facades\DB;
        use Carbon\Carbon;

class DashboardController extends Controller
{
    public function dashboard() {
        $projects_count = Project::count();
        $users_count = User::count();
        $Category = Category::count();

        $userId = auth()->id();
        // Get today's date
        $today = Carbon::today();
        
        $userProjects = ProjectEnroll::where('project_enrolls.user_id', $userId)
            ->join('projects', 'project_enrolls.project_id', '=', 'projects.id')
            ->leftJoin('user_project_tasks', function ($join) {
                $join->on('project_enrolls.id', '=', 'user_project_tasks.project_enroll_id')
                    ->whereDate('user_project_tasks.date', '=', Carbon::today()->toDateString());
            })
            ->select('project_enrolls.user_id','projects.id','projects.description','user_project_tasks.start_time' ,'user_project_tasks.end_time' ,'project_enrolls.project_id',  'projects.title', 'user_project_tasks.id as task_id')
            ->get();
        
        // dd( $userProjects);
        return view('dashboard', [
            'projects_count' => $projects_count,
            'users_count' => $users_count,
            'Category' => $Category,
            // 'closed_issues' => count($closed_issues),
            'userProjects'=>$userProjects
            
        ]);
    }
}

