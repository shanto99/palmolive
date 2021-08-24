<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function make_login(Request $request)
    {
        $user = User::where('UserName', $request->UserName)->where('Password', $request->Password)->first();
        if($user) {
            Auth::login($user, true);
            return redirect('/palmolive/');
        } else {
            return redirect()->back();
        }
    }

    public function getAuthUser()
    {
        $user = Auth::user();
        return response()->json($user, 200);
    }

    public function update_password(Request $request)
    {

        $user = User::where('UserID', $request->userId)->where('Password', $request->currentPassword)->first();
        
        if($user) {
            $updated = $user->update([
                'Password' => $request->newPassword
            ]);

            if($updated) return response()->json([
                'status' => 200,
                'msg' => 'Password updated successfully!!'
            ], 200);
        }

        else return response()->json([
            'status' => 401,
            'msg' => 'Current password didn\'t match'
        ], 401);
    }

    public function logout()
    {
        Auth::logout();
        return redirect("/palmolive/login");
    }
}
