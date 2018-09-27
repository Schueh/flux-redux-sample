import { Dispatcher, UserPrefsStore } from './flux';

const controlPanelDispatcher = new Dispatcher();

const userNameUpdateAction = (name) => {
    return {
        type: 'UPDATE_USERNAME',
        value: name
    };
};

const fontSizeUpdateAction = (size) => {
    return {
        type: 'UPDATE_FONT_SIZE',
        value: size
    };
};

document.getElementById('userNameInput').addEventListener('input', ({target}) => {
    const name = target.value;
    console.log('Dispatching...', name);
    controlPanelDispatcher.dispatch(userNameUpdateAction(name));
});

document.forms.fontSizeForm.fontSize.forEach(element => {
    element.addEventListener('change', ({target}) => {
        const size = target.value;
        controlPanelDispatcher.dispatch(fontSizeUpdateAction(size));
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