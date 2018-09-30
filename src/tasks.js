import { Dispatcher, TasksStore, TasksActions } from './flux';

const tasksDispatcher = new Dispatcher();

const tasksActions = new TasksActions(tasksDispatcher);

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
            tasksActions.completeTask(id, checked);
        });
    });
};

document.forms.newTask.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.newTaskName.value;
    if (name) {
        tasksActions.createNewTask(name);
        e.target.newTaskName.value = null;
    }
});

document.getElementById('showComplete').addEventListener('change', ({target}) => {
    const showComplete = target.checked;
    tasksActions.showTasks(showComplete);
});

const tasksStore = new TasksStore(tasksDispatcher);
tasksStore.addListener(() => {
    render();
});

render();