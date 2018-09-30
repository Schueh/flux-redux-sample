import { ControlPanelActions, Dispatcher, UserPrefsStore } from './flux';

const controlPanelDispatcher = new Dispatcher();

const controlPanelActions = new ControlPanelActions(controlPanelDispatcher);

document.getElementById('userNameInput').addEventListener('input', ({target}) => {
    const name = target.value;
    console.log('Dispatching...', name);
    controlPanelActions.updateUserName(name);
});

document.forms.fontSizeForm.fontSize.forEach(element => {
    element.addEventListener('change', ({target}) => {
        const size = target.value;
        controlPanelActions.updateFontSize(size);
    });
});

const userPrefsStore = new UserPrefsStore(controlPanelDispatcher);
userPrefsStore.addListener((state) => {
    console.info('The current state is...', state);
    render(state);
    localStorage.preferences = JSON.stringify(state);
});

const render = ({userName, fontSize}) => {
    document.getElementById('userName').innerText = userName;
    document.getElementsByClassName('container')[0].style.fontSize = fontSize === 'small' ? '16px' : '24px';
    document.forms.fontSizeForm.fontSize.value = fontSize;
};

render(userPrefsStore.getUserPreferences());