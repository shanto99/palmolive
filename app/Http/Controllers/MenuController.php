<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;

class MenuController extends Controller
{
    public function getMenus() {
        $menus = Menu::all();
        return response()->json($menus, 200);
    }
}
