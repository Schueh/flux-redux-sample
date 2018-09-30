export class TasksActions {
    
    constructor(dispatcher) {
        this.__dispatcher = dispatcher;
    }
 
    createNewTask(content) {
        this.__dispatcher.dispatch({
            type: 'CREATE_TASK',
            value: content
        });
    }
    
    showTasks(show) {
        this.__dispatcher.dispatch({
            type: 'SHOW_TASKS',
            value: show
        });
    }

    completeTask(id, isComplete) {
        this.__dispatcher.dispatch({
            type: 'COMPLETE_TASK',
            id,
            value: isComplete
        });
    }
}