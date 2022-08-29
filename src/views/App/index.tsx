import React from "react";

import { useToDoStore } from '../../data/stores/useToDoStore';
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';

import styles from './index.module.scss'


export const App: React.FC = ()=>{
    const createTask = useToDoStore(state=> state.createTask )
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
                <TaskList/>
            </section>
        </article>
        );
}