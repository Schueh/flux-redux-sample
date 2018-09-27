import { Dispatcher, TasksStore } from './flux';

const tasksDispatcher = new Dispatcher();

const createNewTaskAction = (content) => {
    return {
        type: 'CREATE_TASK',
        value: content
    };
};

const showTasksAction = (show) => {
    return {
        type: 'SHOW_TASKS',
        value: show
    };
};

const completeTaskAction = (id, isComplete) => {
    return {
        type: 'COMPLETE_TASK',
        id,
        value: isComplete
    };
};

const TaskComponent = ({content, complete, id}) => (
    `<section>
        ${content} <input type="checkbox" name="taskCompleteCheck" data-taskid=${id} ${complete ? "checked" : ""}> 
    </section>`
);

document.forms.undo.addEventListener('submit', (e) => {
    e.preventDefault();
    tasksStore.revertLastState();
});

const render = () => {
    const tasksSection = document.getElementById('tasks');
    const state = tasksStore.getState();
    const rendered = state.tasks
        .filter(task => state.showComplete ? true : !task.complete)
        .map(TaskComponent)
        .join("");
    tasksSection.innerHTML = rendered;

    document.getElementsByName('taskCompleteCheck').forEach(element => {
        element.addEventListener('change', (e) => {
            const id = e.target.attributes['data-taskid'].value;
            const checked = e.target.checked;
            tasksDispatcher.dispatch(completeTaskAction(id, checked));
        });
    });
};

document.forms.newTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.newTaskName.value;
    if (name) {
        tasksDispatcher.dispatch(createNewTaskAction(name));
        e.target.newTaskName.value = null;
    }
});

document.getElementById('showComplete').addEventListener('change', ({target}) => {
    const showComplete = target.checked;
    tasksDispatcher.dispatch(showTasksAction(showComplete));
});

const tasksStore = new TasksStore(tasksDispatcher);
tasksStore.addListener(() => {
    render();
});

render();