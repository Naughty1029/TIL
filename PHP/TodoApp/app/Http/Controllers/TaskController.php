<?php

namespace App\Http\Controllers;
use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::orderByDesc("id")->get();
    }

    public function store(TaskRequest $request)
    {
        $task = Task::create($request->all());
        return $task ? response()->json($task,201) : response()->json([],500);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    public function update(TaskRequest $request, Task $task)
    {
        $task->title = $request->title;
        return $task->update() ? response()->json($task) : response()->json([],500);
    }

    public function destroy(Task $task)
    {
        return $task->delete() ? response()->json($task) : response()->json([],500);
    }

    public function updateDone(Request $request,Task $task)
    {
        $task->is_done = $request->is_done;
        return $task->update() ? response()->json($task) : response()->json([],500);
    }
}
