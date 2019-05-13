// 避免typo
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const RESET = 'RESET';
export const OPENMENU = 'OPENMENU';
export const CLOSEMENU = 'CLOSEMENU';

// bgStrokeTextPositionReducers
export const UPDATECHOICELISTX = 'UPDATECHOICELISTX';
export const UPDATECHOICELISTY = 'UPDATECHOICELISTY';
export const UPDATECHOICELISTUlWidth = 'UPDATECHOICELISTUlWidth';
export const UPDATECHOICELISTUlContainerWidth = 'UPDATECHOICELISTUlContainerWidth';

// 寫法一與寫法二均可  (注意命名方式: function是camelCase, 關鍵字是UPPER_CASE_WITH_UNDERSCORES)
// 寫法一
export function increment() {
    return { type: INCREMENT };
}
// 寫法二
export const decrement = () => ({ type: DECREMENT });

export function reset() {
    return { type: RESET };
}

// 開啟與關閉MENU
export function openMenu() {
    return { type: OPENMENU };
}
export function closeMenu() {
    return { type: CLOSEMENU };
}


// bgStrokeTextPositionReducers
export function updateChoiceListX(choiceListX) {
    return { type: UPDATECHOICELISTX, value: {choiceListX: choiceListX }}
}
export function updateChoiceListY(choiceListY) {
    return { type: UPDATECHOICELISTY, value: {choiceListY: choiceListY }}
}
export function updateChoiceListUlWidth(choiceListUlWidth) {
    return { type: UPDATECHOICELISTUlWidth, value: choiceListUlWidth }
}
export function updateChoiceListUlContainerWidth(updateChoiceListUlContainerWidth) {
    return { type: UPDATECHOICELISTUlContainerWidth, value: updateChoiceListUlContainerWidth }
}
