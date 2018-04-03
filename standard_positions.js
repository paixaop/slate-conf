// Define standard screen positions
var standardPositions = {
    fullScreen: { key: sc1('pad5') },

    // Corners
    topLeftCorner: { 
        key: sc1('pad7'),
        width: 1 / 2,
        height: 1 / 2
    },
    topRightCorner: {
        key: sc1('pad9'),
        hPosition: 1,
        width: 1 / 2,
        height: 1 / 2
    },
    bottomLeftCorner: {
        key: sc1('pad1'),
        vPosition: 1,
        width: 1 / 2,
        height: 1 / 2
    },
    bottomRightCorner: {
        key: sc1('pad3'),
        hPosition: 1,
        vPosition: 1,
        width: 1 / 2,
        height: 1 / 2
    },

    // Halves
    leftHalf: {
        key: sc1('pad4'),
        width: 1 / 2
    },
    rightHalf: {
        key: sc1('pad6'),
        width: 1 / 2,
        hPosition: 1
    },
    topHalf: {
        key: sc1('pad8'),
        height: 1 / 2
    },
    bottomHalf: {
        key: sc1('pad2'),
        height: 1 / 2,
        vPosition: 1
    },

    // 2/3 of Screen
    bottomTwoThirds: {
        key: sc2('pad0'),
        height: 2 / 3,
        offsetY: 1 / 3
    },
    leftTwoThirds: {
        key: sc2('pad1'),
        width: 2 / 3
    },
    rightTwoThirds: {
        key: sc2('pad2'),
        width: 2 / 3,
        offsetX: 1 / 3
    },
    topTwoThirds: {
        key: sc2('pad3'),
        height: 2 / 3
    },

    // 1/3 Horizontal
    leftOneThird: {
        key: sc2('pad4'),
        width: 1 / 3
    },
    middleOneThird: {
        key: sc2('pad5'),
        width: 1 / 3,
        hPosition: 1
    },
    rightOneThird: {
        key: sc2('pad6'),
        width: 1 / 3,
        hPosition: 2
    },
    leftOneThirdTopHalf: {
        width: 1 / 3,
        height: 1 / 2
    },
    middleOneThirdTopHalf: {
        width: 1 / 3,
        height: 1 / 2,
        hPosition: 1
    },
    rightOneThirdTopHalf: {
        width: 1 / 3,
        height: 1 / 2,
        hPosition: 2
    },

    // 1/3 Vertical
    topOneThird: {
        key: sc2('pad7'),
        height: 1 / 3
    },
    middleOneThirdVertical: {
        key: sc2('pad8'),
        height: 1 / 3,
        vPosition: 1
    },
    bottomOneThird: {
        key: sc2('pad9'),
        height: 1 / 3,
        vPosition: 2
    },
    leftOneThirdBottomHalf: {
        width: 1 / 3,
        height: 1 / 2,
        vPosition: 1
    },
    middleOneThirdBottomHalf: {
        width: 1 / 3,
        height: 1 / 2,
        hPosition: 1,
        vPosition: 1
    },
    rightOneThirdBottomHalf: {
        width: 1 / 3,
        height: 1 / 2,
        hPosition: 2,
        vPosition: 1
    },

    leftOneHalfByOneThird: {
        width: 1 / 2,
        height: 1 / 3
    },
    rightOneHalfByOneThird: {
        width: 1 / 2,
        height: 1 / 3,
        hPosition: 1
    },

    // 1/4 of screen
    firstOneFourth: {
        key: sc3('pad='),
        height: 1 / 4
    },
    secondOneFourth: {
        key: sc3('pad8'),
        height: 1 / 4,
        vPosition: 1
    },
    thirdOneFourth: {
        key: sc3('pad5'),
        height: 1 / 4,
        vPosition: 2
    },
    fourthOneFourth: {
        key: sc3('pad2'),
        height: 1 / 4,
        vPosition: 3
    },

    // 1/5 of screen vertical
    firstOneFifth: {
        key: sc3('pad/'),
        height: 1 / 5
    },
    secondOneFifth: {
        key: sc3('pad9'),
        height: 1 / 5,
        vPosition: 1
    },
    thirdOneFifth: {
        key: sc3('pad6'),
        height: 1 / 5,
        vPosition: 2
    },
    fourthOneFifth: {
        key: sc3('pad3'),
        height: 1 / 5,
        vPosition: 3
    },
    fifthOneFifth: {
        key: sc3('pad.'),
        height: 1 / 5,
        vPosition: 4
    }
};
BindScreenPositions(standardPositions, screens);