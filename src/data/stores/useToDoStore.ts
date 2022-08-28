import create, {State, StateCreator} from 'zustand'
import {devtools} from 'zustand/middleware'
import {generateId} from '../helpers'

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[],
    createTask:(title: string)=>void
    updateTask:(id: string, title: string)=>void
    removeTask:(id: string)=>void
}

function isToDoStore(object: any): object is ToDoStore{
    return 'tasks' in object;
}

const localStorageUpdate =  <T extends State>(config: StateCreator<T>)
: StateCreator<T>=>(set, get, api) => config((nextState, ...args)=>{
    if(isToDoStore(nextState)){
    window.localStorage.setItem('tasks', JSON.stringify(
        nextState.tasks
    ))}
    set(nextState, ...args)
}, get, api)

const getCurrentState = ():Task[] => {
    try{
    return JSON.parse(window.localStorage.getItem('tasks')||'[]') as Task[]
    } catch(error){
        console.log(error)
        return []
    }
}

export const useToDoStore = create<ToDoStore>(
    localStorageUpdate(
    devtools((set, get)=>({
    tasks: getCurrentState(),
    createTask:(title)=>{
        const {tasks}=get();
        const task: Task = {
            id:generateId(), title, createdAt: Date.now()
        }
        set({
            tasks: [task, ...tasks]
        });
    },
    updateTask:(id, title)=>{
        const {tasks} = get();
        set({
            tasks: tasks.map(v=>({
                ...v,
                title: v.id===id?title: v.title
            }))
        });
    },
    removeTask:(id)=>{
        const {tasks} = get();
        set({
            tasks: tasks.filter(v=>v.id!==id)
        });
    }
}))))