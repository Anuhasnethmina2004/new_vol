<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreProjectRequest;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projects = Project::with('issues')->get();
        return view('projects.index', ['projects' => $projects]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $project = new Project();
        $categories = Category::all();
        return view('projects.create', [
            'project' => $project,'categories'=>$categories
        ]);
    }

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
                'starting_date' => $request->starting_date,
                'end_date' => $request->end_date,
                'number_of_hours' => $request->number_of_hours,
                'user_id' => Auth::id(),
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
        $categories = Category::all();
        return view('projects.show', [
            'project' => $project,'categories'=>$categories
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
            'project' => $project,'categories'=>$categories,'projectCategories'=>$projectCategories
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
        \DB::beginTransaction();
        try {
            $project = Project::where('id', $project->id)->update([
                'title' => $request->title,
                'description' => $request->description,
                'starting_date' => $request->starting_date,
                'end_date' => $request->end_date,
                'number_of_hours' => $request->number_of_hours,
            ]);
        } catch (\QueryException $ex) {
            \DB::rollback();
            return back()->withInput();
        }
        \DB::commit();

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
}
