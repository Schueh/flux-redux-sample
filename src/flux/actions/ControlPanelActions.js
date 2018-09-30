export class ControlPanelActions {

    constructor(dispatcher) {
        this.__dispatcher = dispatcher;
    }
    
    updateUserName(name) {
        this.__dispatcher.dispatch({
            type: 'UPDATE_USERNAME',
            value: name
        });
    }

    updateFontSize(size) {
        this.__dispatcher.dispatch({
            type: 'UPDATE_FONT_SIZE',
            value: size
        });
    }
}