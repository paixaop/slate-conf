/**
 * Slate Javasript configuration file
 */
slate.log("[SLATE] -------------- Started Loading Config from .slate.js --------------");
// Slate configuration options
slate.defaultToCurrentScreen = true;
slate.secondsBeforeRepeat = 0.4;
slate.secondsBetweenRepeat = 0.1;
slate.keyboardLayout = 'qwerty';
slate.nudgePercentOf = 'screenSize';
slate.resizePercentOf = 'screenSize';

slate.source('slate_utils.js');

// Key shortcuts
// All keys are prefixed with these shortcuts, there are 3 main
// shortcuts defined sc1(), sc2(), and sc3()
// you can add as many as you want, or change the key combinations
var sc1 = function (key) {
    return key + ":ctrl;alt;cmd";
};
var sc2 = function (key) {
    return key + ":ctrl;cmd";
};
var sc3 = function (key) {
    return key + ":ctrl;cmd;shift";
};

// Configure your screens/monitors. These definitions MUST match the screens on your
// setup. To configure your screens click 'Current Window Info' from the slate menu.
var screens = {
    samsung: {
        resolution: "1200x1920",
        id: 0
    },
    asus: {
        resolution: "1692x3008",
        id: 1
    },
    lg: {
        resolution: "3440x1440",
        id: 2
    },
    mac: {
        resolution: "1440x900",
        id: 3
    }
};

// Need to call this after screen definition
slate.source('standard_positions.js');


// Define all available monitor layouts and assign a shortcut for each
// These are te only layout names you can use in the applicaiton definitions.
var screenLayouts = {
    fourMonitors : {
        key: sc1('4'),
    },
    threeMonitors: {
        key: sc1('3'),
    },
    twoMonitors: {
        key: sc1('2'),
    }
};


// Applications definitions
var myApps = {
    'Mail': { // App name as seen by slate. Check 'Current Windows Info' from the slate menu
        key: sc1('e'),  // Shortcut to focus on the app
        position: { // layouts
            fourMonitors: screens.asus.bottomTwoThirds,  // layoutName: screens.screenName.poistion
            threeMonitors: screens.asus.bottomTwoThirds,
            twoMonitors: screens.lg.rightOneThird
        }
    },
    'Calendar': {
        key: sc1('l'),
        position: {
            fourMonitors: screens.samsung.topOneThird,
            threeMonitors: screens.asus.topOneThird,
            twoMonitors: screens.mac.bottomLeftCorner,
        }
    },
    'Code': {
        key: sc1('c'),
        position: {
            fourMonitors: screens.asus.bottomTwoThirds,
            threeMonitors: screens.asus.bottomOneThird,
            twoMonitors: screens.lg.rightOneThird,
        }
    },
    'Terminal': {
        key: sc1('t'),
        position: {
            fourMonitors: screens.mac.leftHalf,
            threeMonitors: screens.mac.leftHalf,
            twoMonitors: screens.mac.leftHalf,
        }
    },
    'Telegram': {
        key: sc1('r'),
        position: {
            fourMonitors: screens.asus.leftOneHalfByOneThird,
            threeMonitors: screens.asus.leftOneThirdTopHalf,
            twoMonitors: screens.mac.topRightCorner
        }
    },
    'WhatsApp': {
        key: sc1('w'),
        position: {
            fourMonitors: screens.samsung.rightOneHalfByOneThird,
            threeMonitors: screens.asus.rightOneThirdTopHalf,
            twoMonitors: screens.mac.bottomRightCorner
        }
    },
    'Messages': {
        key: sc1('m'),
        position: {
            fourMonitors: screens.asus.rightOneHalfByOneThird,
            threeMonitors: screens.asus.rightOneThirdTopHalf,
            twoMonitors: screens.mac.rightHalf
        }
    },
    'Google Chrome': {
        key: sc1('b'),
        position: {
            fourMonitors: screens.lg.rightOneThird,
            threeMonitors: screens.lg.rightOneThird,
            twoMonitors: screens.lg.rightOneThird
        }
    },
    'Safari': {
        key: sc1('s'),
        position: {
            fourMonitors: screens.lg.leftOneThird,
            threeMonitors: screens.lg.leftOneThird,
            twoMonitors: screens.lg.leftOneThird
        }
    },
    'Finder': {
        key: sc1('f'),
        position: {
            fourMonitors: screens.mac.rightHalf,
            threeMonitors: screens.mac.rightHalf,
            twoMonitors: screens.mac.rightHalf,
        }
    },
    'Microsoft Excel': {
        key: sc1('x'),
        position: {
            fourMonitors: screens.lg.rightTwoThirds,
            threeMonitors: screens.lg.rightTwoThirds,
            twoMonitors: screens.lg.rightTwoThirds
        }
    }
};

// Moves bound to shortcut 1
bindKeys(sc1, {
    "right": slide('right'),
    "left": slide('left'),
    "up": slide('up'),
    "down": slide('down'),
});

// Moves bound to shortcut 2
bindKeys(sc2, {
    'right': moveToScreen('right'),
    'left': moveToScreen('left'),
    'r': relaunch()
});

// Moves boud to shortcut 3
//bindKeys(sc3, );

// Bind all application shortcuts and create all layouts
bindApps(myApps, screenLayouts);

slate.log("[SLATE] -------------- Finished Loading Config from .slate.js -------------");