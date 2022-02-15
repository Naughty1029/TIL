<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('login',"LoginController@login");
Route::post('logout',"LoginController@logout");

Route::group(['middleware' => 'auth:sanctum'],function(){
    Route::apiResource("tasks","TaskController");
    Route::patch("tasks/update-done/{task}","TaskController@updateDone");

    Route::get('user', function (Request $request) {
        return $request->user();
    });
});
