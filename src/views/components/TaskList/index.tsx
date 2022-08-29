import React from "react";

import { TaskItem } from '../TaskItem';
import { EmptyList } from '../EmptyList';
import { useToDoStore } from '../../../data/stores/useToDoStore';

export const TaskList: React.FC= ()=>{
    const [
        tasks,
        updateTask,
        removeTask
    ] = useToDoStore(state=>[
        state.tasks,
        state.updateTask,
        state.removeTask
    ])
    return (
        <div>
    {!tasks.length && (
        <EmptyList/>
    )}
    {tasks.map(task=>(
        <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            onDone={removeTask}
            onEdited={updateTask}
            onRemoved={removeTask}
        />
    ))}
    </div>)
}