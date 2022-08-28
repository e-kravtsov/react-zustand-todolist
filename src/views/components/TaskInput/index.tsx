import React, {KeyboardEventHandler, useCallback, useState} from "react";

import styles from './index.module.scss'

interface TaskInputProps {
    onAdd: (title: string)=>void;
}

export const TaskInput: React.FC<TaskInputProps> = ({
    onAdd
})=>{
    const [inputValue, setInputValue] = useState('');
    const addTask = useCallback(()=>{
        onAdd(inputValue);
        setInputValue('');
    }, [inputValue])
    const inputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>)=>{
        if(evt.key==='Enter'){
            addTask();
        }
    }
    return (
        <div className={styles.taskInput}>
            <input
                type="text"
                className={styles.taskInputValue}
                value={inputValue}
                placeholder="Type your task title..."
                onChange={evt=>setInputValue(evt.target.value)}
                onKeyDown={evt=>inputKeyDown(evt)}
            />
            <button
                className={styles.taskInputButton}
                aria-label="Add task"
                onClick={addTask}
            />
        </div>
    );
};