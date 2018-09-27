import { Store } from './Store';

export class UserPrefsStore extends Store {
    getInitialState() {
        return localStorage.preferences ? JSON.parse(localStorage.preferences) : {
            userName: 'Jim',
            fontSize: 'small'
        };
    }

    __onDispatch(action) {
        switch(action.type) {
            case 'UPDATE_USERNAME':
                this.__state.userName = action.value;
                this.__emitChange();
            break;
            case 'UPDATE_FONT_SIZE':
                this.__state.fontSize = action.value;
                this.__emitChange();
            break;
        }
    }

    getUserPreferences() {
        return this.__state;
    }
}