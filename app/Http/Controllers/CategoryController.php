<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use App\Http\Requests\StoreCategoryRequest;

class categoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::get();
        return view('category.index', ['categories' => $category]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $category = new Category();

        return view('category.create', [
            'category' => $category
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        \DB::beginTransaction();
        try {
            $category = Category::create([
                'title' => $request->title,
                'description' => $request->description,
                
            ]);
        } catch (\QueryException $ex) {
            \DB::rollback();
            return back()->withInput();
        }
        \DB::commit();

        return redirect('category')->with('status', 'Success: Category Created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        $category = Category::findOrFail($category->id);

        return view('category.show', [
            'categories' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        $category = Category::findOrFail($category->id);

        return view('category.create', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        \DB::beginTransaction();
        try {
            $category = Category::where('id', $category->id)->update([
                'title' => $request->title,
                'description' => $request->description,
                
            ]);
        } catch (\QueryException $ex) {
            \DB::rollback();
            return back()->withInput();
        }
        \DB::commit();

        return redirect('category')->with('status', 'Success: Category Updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        \DB::beginTransaction();
        try {
            $category->delete();
        } catch (\QueryException $ex) {
            \DB::rollback();
            return back()->withInput();
        }
        \DB::commit();

        return redirect('category')->with('status', 'Success: Category Deleted!');

    }
}
