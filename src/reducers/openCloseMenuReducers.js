const initialState = {
    menuIsOpen: false
}

// 這個Reducer是空的，之所以創建是為了避免在最初創建store時沒有reducer而出錯
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