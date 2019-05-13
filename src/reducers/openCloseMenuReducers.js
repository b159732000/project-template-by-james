const initialState = {
    menuIsOpen: false
}

export default function openCloseMenuReducers(state = initialState, action) {
    switch (action.type) {
        case 'OPENMENU':
            return {
                menuIsOpen: true
            };
        case 'CLOSEMENU':
            return {
                menuIsOpen: false
            };
        default:
            return state
    }
}