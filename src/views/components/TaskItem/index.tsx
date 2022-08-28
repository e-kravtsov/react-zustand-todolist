import React, { useState, useRef, useEffect } from "react";

import styles from "./index.module.scss";

interface TaskItemProps {
    id: string;
    title: string;
    onDone: (id: string)=>void;
    onEdited: (id: string, value: string)=>void;
    onRemoved: (id: string)=>void;
}

export const TaskItem: React.FC<TaskItemProps>=({
   id,
   title,
   onDone,
   onEdited,
   onRemoved
})=>{
    const [checked, setChecked] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState('');
    const inputKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>)=>{
        if(evt.key==='Enter'){
            onEdited(id, value);
            setIsEditMode(false);
        }
    }
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        if(isEditMode){
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode])

    useEffect(()=>{
        if(checked){
            setTimeout(()=>{onDone(id)}, 300);
        }
    }, [checked])

    return(
        <div className={styles.taskItem}>
            <label className={styles.taskItemLabel}>
                <input
                    type="checkbox"
                    disabled={isEditMode}
                    checked={checked}
                    className={styles.taskItemCheckbox}
                    onChange={evt=>{
                        setChecked(evt.target.checked);
                    }}
                />
                {isEditMode? (
                    <input
                        ref={editTitleInputRef}
                        type="text"
                        value={value}
                        className={styles.taskItemEditTitle}
                        onChange={evt=>setValue(evt.target.value)}
                        onKeyDown={evt=>inputKeyDown(evt)}
                    />
                ) : (
                    <h3 className={styles.taskItemTitle}>{title}</h3>
                )}
                
            </label>
            {isEditMode? (
            <button
                aria-label="Save"
                className={styles.taskItemSave}
                onClick={()=>{
                    onEdited(id, value);
                    setIsEditMode(false);
                }}
            />):(
                <button
                aria-label="Edit"
                className={styles.taskItemEdit}
                onClick={()=>{
                    setValue(title);
                    setIsEditMode(true);
                }}
            />
            )}
            <button
                aria-label="Remove"
                className={styles.taskItemRemove}
                onClick={()=>{
                    if(confirm('Are you sure')){
                        onRemoved(id);
                    }
                }}
            />
        </div>
    )
}