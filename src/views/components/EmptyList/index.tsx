import React from "react";

import styles from './index.module.scss'

export const EmptyList: React.FC= ()=>{
    return (
        <div className={styles.empty}>
        <div className={styles.emptyImage}/>
        <p className={styles.emptyText}>
            There are no tasks added
        </p>
        </div>
    )
}