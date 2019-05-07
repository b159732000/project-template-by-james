const initialState = {
    count: 0
}

// 這個Reducer是空的，之所以創建是為了避免在最初創建store時沒有reducer而出錯
export default function myFirstReducers(state = initialState, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state.count + 1;
        case 'DECREMENT':
            return state.count + 1;
        default:
            return state
    }
}