import { generate as id } from 'shortid';
import { ReduceStore } from "./ReduceStore";

export class TasksStore extends ReduceStore {
    getInitialState() {
        return {
            tasks: [
                {
                    id: id(),
                    content: 'Get some milk',
                    complete: false
                },
                {
                    id: id(),
                    content: 'Clean up kitchen',
                    complete: false
                }
            ],
            showComplete: true
        };
    }

    getState() {
        return this.__state;
    }

    reduce(state, action) {
        console.log('Reducing...',state,action);
        let newState;
        switch (action.type) {
            case 'CREATE_TASK':
                /* 
                    '...' syntax -> copy all properties. We also have to copy the task array explicitly. 
                    Otherwise we would have a reference to the tasks of the original state.
                */
                newState = { ...state, tasks: [...state.tasks]};
                newState.tasks.push({
                    id: id(),
                    content: action.value,
                    complete: false
                });
                return newState;
            case 'SHOW_TASKS':
                newState = { ...state, tasks: [...state.tasks], showComplete: action.value };
                return newState;
            case 'COMPLETE_TASK':
                newState = { ...state, tasks: [...state.tasks]};
                const affectedElementIndex = newState.tasks.findIndex(t => t.id === action.id);
                newState.tasks[affectedElementIndex] = { ...state.tasks[affectedElementIndex], complete: action.value }; // copy all properties, set 'complete' explicitly
                return newState;
        }

        return state;
    }
}