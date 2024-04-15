<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProjectRequest;
use App\Models\ProjectEnroll;
use App\Models\UserProjectTask;
use DataTables;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::user()->is_admin == 1) {
            $projects = Project::get();
        } else {
            $projects = Project::where('user_id', Auth::user()->id)->get();
        }
        return view('projects.index', ['projects' => $projects]);
    }

    public function create()
    {
        $project = new Project();
        $categories = Category::all();
        $projectCategories = [];
        return view('projects.create', [
            'project' => $project, 'categories' => $categories, 'projectCategories' => $projectCategories
        ]);
    }

    public function indexData()
    {
        $projects = Project::select(['id', 'title', 'type', 'description', 'starting_date', 'end_date', 'number_of_hours', 'location']);

        return DataTables::of($projects)->make(true);
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreProjectRequest $request)
    {
        \DB::beginTransaction();
        try {
            $project = Project::create([
                'title' => $request->title,
                'description' => $request->description,
                'type' => $request->type,
                'location' => $request->location,
                'starting_date' => $request->starting_date,
                'end_date' => $request->end_date,
                'number_of_hours' => $request->number_of_hours,
                'user_id' => Auth::id(),
                'link' => $request->link,
            ]);

            $project->categories()->attach($request->input('categories'));
        } catch (\QueryException $ex) {
            \DB::rollback();
            return back()->withInput();
        }
        \DB::commit();

        return redirect('projects')->with('status', 'Success: Project Created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        $project = Project::findOrFail($project->id);
        // Assuming $categories and $projectCategories are defined as:
        $categories = Category::all();
        $projectCategories = $project->categories->pluck('id')->toArray();

        // Filter categories to get only those that are related to the project
        $selectedCategories = $categories->whereIn('id', $projectCategories);

        // If you need to work with just the names:
        $selectedCategoryNames = $selectedCategories->pluck('title');
        $project = Project::with('users')->find($project->id);

        // Check if the project exists
        if (!$project) {
            return redirect()->back()->withErrors(['error' => 'Project not found']);
        }

        // Get all users associated with the project
        $enrolledUsers = $project->users;
        // dd($enrolledUsers);
        // dd($selectedCategoryNames );
        return view('projects.show', [
            'project' => $project, 'categories' => $categories, 'selectedCategoryNames' => $selectedCategoryNames, 'enrolledUsers' => $enrolledUsers
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        $project = Project::findOrFail($project->id);
        $categories = Category::all();
        $projectCategories = $project->categories->pluck('id')->toArray();
        return view('projects.create', [
            'project' => $project, 'categories' => $categories, 'projectCategories' => $projectCategories
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(StoreProjectRequest $request, Project $project)
    {
        try {
            // Update the project
            $project->update([
                'title' => $request->title,
                'type' => $request->type,
                'location' => $request->location,
                'description' => $request->description,
                'starting_date' => $request->starting_date,
                'end_date' => $request->end_date,
                'number_of_hours' => $request->number_of_hours,
                'link' => $request->link,
            ]);

            // Retrieve the updated project
            $updatedProject = Project::findOrFail($project->id);
            // Detach existing categories
            $updatedProject->categories()->detach();
            // Attach new categories
            $updatedProject->categories()->attach($request->input('categories'));

        } catch (\Exception $ex) {
            // Handle the exception
            return back()->withInput()->withErrors(['error' => 'Failed to update project.']);
        }

        return redirect('projects')->with('status', 'Success: Project Updated!');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        \DB::beginTransaction();
        try {
            $project->delete();
        } catch (\QueryException $ex) {
            \DB::rollback();
            return back()->withInput();
        }
        \DB::commit();

        return redirect('projects')->with('status', 'Success: Project Deleted!');
    }

    public function enroll(Project $project)
    {
        if (!auth()->check()) {
            // If user is not authenticated, redirect to login with an error message
            return redirect()->route('login')->with('error', 'Please log into the system before enrolling.');
        }
        // Check if the user is already enrolled in the project
        $userId = auth()->id();
        $enrollment = ProjectEnroll::where('project_id', $project->id)
            ->where('user_id', $userId)
            ->first();

        if ($enrollment) {
            // If user is already enrolled, show a message
            return back()->with('error', 'You are already enrolled in this project.');
        }

        // If user is not enrolled, create a new enrollment record
        ProjectEnroll::create([
            'project_id' => $project->id,
            'user_id' => $userId,
            'started_day' => now(), // Assuming enrollment starts immediately
        ]);

        // Redirect the user to the project page or any other desired location
        return redirect()->route('welcome')->with('success', 'Successfully enrolled in the project.');
    }



    public function start(Project $project)
    {

        $task = UserProjectTask::where('project_id', $project->id)->where('user_id', auth()->id())
            ->whereDate('date', now()->toDateString())
            ->first();
        // Create a new task record with the start time
        if ($task) {
            return back()->with('error', 'You Completed Today Task. Come Again Tomorrow');
        } else {

            $projectenroll = ProjectEnroll::where('project_id', $project->id)->where('user_id', auth()->id())->first();

            UserProjectTask::create([
                'user_id' => auth()->id(),
                'project_enroll_id' => $projectenroll->id,
                'project_id' => $project->id,
                'date' => now()->toDateString(),
                'start_time' => now()->toTimeString(),
            ]);

            return back()->with('success', 'Task started successfully.');
        }
    }

    public function end(Project $project)
    {
        $projectenroll = ProjectEnroll::where('project_id', $project->id)->where('user_id', auth()->id())->first();

        // Find the task record for the project and update its end time
        $task = UserProjectTask::where('project_enroll_id', $projectenroll->id)
            ->whereDate('date', now()->toDateString())
            ->first();

        if ($task) {
            $task->update(['end_time' => now()->toTimeString()]);
            return back()->with('success', 'Task ended successfully.');
        }

        return back()->with('error', 'Task not found.');
    }
}
