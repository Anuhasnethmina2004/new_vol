<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
// use App\Http\Requests\StoreCategoryRequest;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     $user = User::findOrFail(Auth::user()->id);
    //     return view('profile.create', ['user' => $user]);
    // }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        $user = User::findOrFail(Auth::user()->id);
        $categories = Category::all();
        $projectCategories = $user->categories->pluck('id')->toArray();

        return view('profile.create', ['user' => $user, 'categories' => $categories, 'projectCategories' => $projectCategories]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        // dd('ssss');
        try {
            // Retrieve the authenticated user
            $user = Auth::user();
            // Update the user's information
            $imageName = '';
            // Handle image upload
            if ($request->hasFile('image')) {
                // Get the uploaded file
                $image = $request->image;
                // dd($image);
                // Generate a unique file name
                $imageName = uniqid('image_') . '.' . $image->getClientOriginalExtension();

                // Move the uploaded file to the desired location
                $image->move(public_path('uploads'), $imageName);
            }
            // Update the user's image path in the database
            // $user->update(['image' => 'uploads/' . $imageName]);
            $user->update([
                'name' => $request->name,
                'phone' => $request->phone,
                'email' => $request->email,
                'location' => $request->location,
                'image' => $imageName,
                'is_admin' => $request->is_admin,
            ]);
            // }
            $updateduser = User::findOrFail($user->id);
            // Detach existing categories
            $updateduser->categories()->detach();
            // Attach new categories
            $updateduser->categories()->attach($request->input('categories'));
            // Handle categories if needed
            // Example: $user->categories()->sync($request->input('categories'));
            return redirect()->route('profile.edit', Auth::user()->id)->with('success', 'Profile updated successfully.');
        } catch (\Exception $e) {
            // Log the error or handle it as needed
            dd($e);
            return back()->withInput()->withErrors(['error' => 'Failed to update profile.']);
        }
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
