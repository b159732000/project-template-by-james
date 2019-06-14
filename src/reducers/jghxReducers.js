const initialState = {
    jghxSelectedSecondHouseStyle: null,  //精工戶型第二層Menu(最底部)選取的選項 (山月院、山河院、A、B、C)
}

export default function jghxReducers(state = initialState, action) {
    switch (action.type) {
        case 'CHANGESELECTEDSECONDHOUSE':
            return {
                ...state,
                // jghxSelectedSecondHouseStyle: "success",
                jghxSelectedSecondHouseStyle: action.value,
            };
        default:
            return state
    }
}