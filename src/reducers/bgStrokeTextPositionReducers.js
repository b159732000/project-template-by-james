const initialState = {
    // menuIsOpen: false
    choiceListX: 0,     //choiceList超出預設位置左邊的距離 = choiceList往左捲動的距離
    choiceListY: 0,     //choiceList距離頂部的距離
    choiceListUlWidth: null,   //choiceListUl內容物的總寬度
    choiceListUlContainerWidth: null,   //choiceListUl顯示在螢幕中的寬度 (= 用來計算不能算進捲動距離的寬度)
    choiceListScrollPercentage: null,   //choiceList捲動的距離百分比
    BgTextCouldMoveDistance: null,      //背景簍空字可以移動的距離
    windowInnerWidth: null,     //瀏覽器內頁面可用寬度 (扣掉瀏覽器工具列後實際可用)
    bgStrokeTextMovableDistance: null,      //背景鏤空字可移動距離
    bgStrokeTextWidth: null,   // 簍空字寬度
    bgStrokeTextContainerStyleTransform: { transform: "translate(0, 0)" },
}

export default function bgStrokeTextPositionReducers(state = initialState, action) {
    switch (action.type) {
        case 'UPDATECHOICELISTX':
            return {
                ...state,
                choiceListX: action.value.choiceListX
            };
        case 'UPDATECHOICELISTY':
            return {
                ...state,
                choiceListY: action.value.choiceListY
            };
        case 'UPDATECHOICELISTUlWidth':
            return {
                ...state,
                choiceListUlWidth: action.value
            };
        case 'UPDATECHOICELISTUlContainerWidth':
            return {
                ...state,
                choiceListUlContainerWidth: action.value
            };
        default:
            return state
    }
}