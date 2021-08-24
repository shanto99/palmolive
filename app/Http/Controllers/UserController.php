<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use App\Models\User;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $menus = Menu::all();
        return view('userManager.create-user', compact('menus'));
    }

    public function createUser(Request $request) {
        DB::beginTransaction();
        try{
            $user = User::where('UserName', $request->userName)->first();
            if($user) $user->delete();
            $user = User::create([
                'UserName' => $request->userName,
                'Name' => $request->name,
                'Email' => $request->email,
                'Password' => $request->password,
                'Designation' => $request->designation
            ]);

            $user->menus()->attach($request->userMenus);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json('Failed', 500);
        }

        DB::commit();

        return response()->json($user, 200);
    }

    public function getMenus()
    {
        $userMenus = Auth::user()->menus;
        return response()->json($userMenus, 200);
    }

    public function getUsers()
    {
        $users = User::with('menus')->get();
        return response()->json($users, 200);
    }
}
