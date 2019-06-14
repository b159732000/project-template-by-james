import { combineReducers } from 'redux';
import pannellumSampleRoomReducers from './pannellumSampleRoomReducers.js'
import openCloseMenuReducers from './openCloseMenuReducers.js'
import bgStrokeTextPositionReducers from './bgStrokeTextPositionReducers.js'
import jghxReducers from './jghxReducers.js'

// 這是一種Reducer的寫法，但我們不採用這種
// const rootReducer = combineReducers({
// });
// export default rootReducer

export default combineReducers({
    pannellumSampleRoomReducers,
    openCloseMenuReducers,
    bgStrokeTextPositionReducers,
    jghxReducers,
})