<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\HeadController;
use App\Http\Controllers\InputController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::group(['prefix' => 'palmolive'], function()
{
    Route::get('/login', function() {
        return view('login');
    })->middleware('guest')->name('login');
    Route::get('/', [HomeController::class, 'home'])->middleware('auth');
    Route::get('/input-heads', [HomeController::class, 'home'])->middleware('auth');
    Route::post('/make-login', [AuthController::class, 'make_login'])->name('make-login');
    Route::post('/update-password', [AuthController::class, 'update_password'])->middleware('auth');
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/user-menus', [UserController::class, 'getMenus'])->middleware('auth');

    Route::get('/create-user', function() {
        return view('layouts.master');
    });
    Route::get('/menus', [MenuController::class, 'getMenus']);
    Route::get('/get_users', [UserController::class, 'getUsers']);
    Route::post('/create-user', [UserController::class, 'createUser']);
    Route::get('/cost-heads', [HeadController::class, 'getCostHeads']);
    Route::get('/cost-sub-heads/{headId}/{isGoal?}', [HeadController::class, 'getCostSubHeads']);
    Route::post('/save-head-inputs', [InputController::class, 'insertHeadInputs']);
    Route::post('/save-goal-inputs', [InputController::class, 'insertGoalInputs']);
    Route::get('/get-head-inputs/{headId}/{subHeadId}/{start}/{end}', [InputController::class, 'getInputValues']);
    Route::get('/get-goal-inputs/{headId}/{subHeadId}/{start}/{end}', [InputController::class, 'getGoalInputValues']);

    Route::get('/get-dashboard-report-data/{year}', [ReportController::class, 'getDashboardReport']);
    Route::get('/get-dashboard-report-data-with-group/{year}', [ReportController::class, 'getDashboardReportWithGrouping']);
    Route::get('/sync-report-data', [ReportController::class, 'syncReport']);

    Route::get('/auth-user', [AuthController::class, 'getAuthUser']);


    Route::get('/deep-detail/{headId}/{subHeadId}/{year}/{depth}/{region?}', [ReportController::class, 'get_deeper']);

});

Route::fallback(function() {
    return redirect("/palmolive/");
});
