import React from "react";

import { useToDoStore } from '../../data/stores/useToDoStore';
import { TaskInput } from '../components/TaskInput';
import { TaskItem } from '../components/TaskItem';

import styles from './index.module.scss'


export const App: React.FC = ()=>{
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore(state=>[
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask
    ])
    // useEffect(()=>{ //react strict mode calls it twice in dev mode
    //     createTask('firstTask')
    // }, [])
    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.secton}>
                <TaskInput
                    onAdd={title=>{if(title){ createTask(title)}}}
                />
            </section>
            <section className={styles.secton}>
                {!tasks.length && (
                    <p className={styles.articleText}>
                        There are no tasks added
                    </p>
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
            </section>
        </article>
        );
}