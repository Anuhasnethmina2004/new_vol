<?php

// namespace App\Http\Controllers;
namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProjectRequest;
use App\Models\ProjectEnroll;
use App\Models\UserProjectTask;
use DataTables;

use Illuminate\Http\Request;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(Auth::user()->is_admin==1) {
        $projects = Project::get();
        }else{
            $projects = Project::where('user_id',Auth::user()->id)->get();
        }
        return view('projects.index', ['projects' => $projects]);
    }

    public function organization(){
        if(Auth::user()->is_admin==1) {
            $projects = Project::get();
            }else{
                $projects = Project::where('user_id',Auth::user()->id)->get();
            }
            return view('report.index');
    }

    public function userreport(){
     
            return view('report.show');
    }

    public function indexData()
    {
        $userId = auth()->user()->id;

    $tasks = UserProjectTask::with(['project', 'user'])
        ->whereHas('project', function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
        ->select('project_id', 'user_id', 'date', 'start_time', 'end_time')
        ->get();

    return DataTables::of($tasks)
        ->addColumn('project_name', function ($task) {
            return $task->project->title;
        })
        ->addColumn('user_name', function ($task) {
            return $task->user->name;
        })
        ->make(true);
    }

    public function userData()
    {
        $userId = auth()->user()->id;

    $tasks = UserProjectTask::with(['project', 'user'])
        ->select('project_id', 'user_id', 'date', 'start_time', 'end_time')->where('user_project_tasks.user_id',$userId)
        ->get();

    return DataTables::of($tasks)
        ->addColumn('project_name', function ($task) {
            return $task->project->title;
        })
        ->addColumn('user_name', function ($task) {
            return $task->user->name;
        })
        ->make(true);
    }
}
