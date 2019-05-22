const initialState = {

    // PannellumSampleRoom
    initYaw: null,
    initPitch: null,
    currentYaw: null,
    currentPitch: null,
    currentPano: null,
    currentPanoImg: null,
    fullScreenPanoIsShowing: false,
}

// 這個Reducer是空的，之所以創建是為了避免在最初創建store時沒有reducer而出錯
export default function myFirstReducers(state = initialState, action) {
    switch (action.type) {
        // 設定最初的yaw
        case 'SETINITYAW':
            return {
                ...state,
                initYaw: action.value,
            };
        // 設定最初的pitch
        case 'SETINITPITCH':
            return {
                ...state,
                initPitch: action.value,
            };
        // 即時更新目前的yaw
        case 'SETCURRENTPANO':
            return {
                ...state,
                currentPano: action.value,
            };
        // 更新目前顯示的全景圖
        case 'SETCURRENTPANOIMG':
            return {
                ...state,
                currentPanoImg: action.value,
            };
        // 更新目前顯示的全景圖片檔
        case 'CLOSEFULLSCREENPANO':
            return {
                ...state,
                fullScreenPanoIsShowing: false,
            };
        // 關閉全螢幕全景圖
        case 'OPENFULLSCREENPANO':
            return {
                ...state,
                fullScreenPanoIsShowing: true,
            };
        default:
            return state
    }
}