<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\LabelController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ReportController;
use Symfony\Component\HttpKernel\Profiler\Profile;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your applicationD. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('welcome');

Route::get('report/data', [ReportController::class, 'indexData'])->name('report.data');
Route::get('report/user', [ReportController::class, 'userData'])->name('report.user');

Route::get('projects/data', [ProjectController::class, 'indexData'])->name('projects.data');
Route::get('/project/{project}/enroll',[ProjectController::class, 'enroll'])->name('project.enroll');
require __DIR__.'/auth.php';
Route::post('/tasks/{project}/start', [ProjectController::class, 'start'])->name('tasks.start');
Route::post('/tasks/{project}/end', [ProjectController::class, 'end'])->name('tasks.end');
Route::get('/report/organization', [ReportController::class, 'organization'])->name('report.organization');
Route::get('/report/userreport', [ReportController::class, 'userreport'])->name('report.userreport');


Route::group(['middleware' => 'auth'], function(){
    Route::get('/dashboard', [DashboardController::class, 'dashboard'])->name('dashboard');
    Route::resource('projects', ProjectController::class);
    Route::resource('category', CategoryController::class);
    Route::resource('profile', ProfileController::class);
    Route::resource('issues', IssueController::class);
    Route::resource('labels', LabelController::class);
    Route::resource('stages', StageController::class);
    Route::resource('users', UserController::class);
    
});
