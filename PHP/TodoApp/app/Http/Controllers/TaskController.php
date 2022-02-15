<?php

namespace App\Http\Controllers;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{

    public function index()
    {
        return Task::where('user_id',Auth::id())->orderByDesc("id")->get();
    }

    public function store(TaskRequest $request)
    {
        $request->merge([
            'user_id' => Auth::id()
        ]);
        $task = Task::create($request->all());
        return $task ? response()->json($task,201) : response()->json([],500);
    }

    public function update(TaskRequest $request,$id)
    {
        $task = Task::findOrFail($id);
        $this->authorize('checkUser', $task);
        $task->title = $request->title;
        return $task->update() ? response()->json($task) : response()->json([],500);
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $this->authorize('checkUser', $task);
        return $task->delete() ? response()->json($task) : response()->json([],500);
    }

    public function updateDone(Request $request,$id)
    {
        $task = Task::findOrFail($id);
        $this->authorize('checkUser', $task);
        $task->is_done = $request->is_done;
        return $task->update() ? response()->json($task) : response()->json([],500);
    }
}
