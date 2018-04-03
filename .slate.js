/**
 * Slate Javasript configuration file
 */
S.log("[SLATE] -------------- Started Loading Config from .slate.js --------------");
// Slate configuration options
slate.defaultToCurrentScreen = true;
slate.secondsBeforeRepeat = 0.4;
slate.secondsBetweenRepeat = 0.1;
slate.keyboardLayout = 'qwerty';
slate.nudgePercentOf = 'screenSize';
slate.resizePercentOf = 'screenSize';

// Key shortcuts
// All keys are prefixed with these shortcuts, there are 3 main
// shortcuts defined sc1(), sc2(), and sc3()
// you can add as many as you want, or change the key combinations
let sc1 = function (key) {
    return key + ":ctrl;alt;cmd";
};
let sc2 = function (key) {
    return key + ":ctrl;cmd";
};
let sc3 = function (key) {
    return key + ":ctrl;cmd;shift";
};

// Configure your screens/monitors. These definitions MUST match the screens on your
// setup. To configure your screens click 'Current Window Info' from the slate menu.
let screens = {
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

// Define all available monitor layouts and assign a shortcut for each
// These are te only layout names you can use in the applicaiton definitions.
let monitorLayouts = {
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
let myApps = {
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

// ***************************************************************************
// From here on out it's just supporting code. 
// Change if you need to add new positions, or 
// correct some bug
// ***************************************************************************
// Define standard screen positions
let standardPositions = {
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

slate.log(`Binding standard standardPositions to screens`);
let i = 0;
for (let pos in standardPositions) {
    for (let name in screens) {
        standardPositions[pos].screen = screens[name].id;
        screens[name][pos] = _.clone(standardPositions[pos]);
        slate.log(`screens.${name}.${pos} created ${JSON.stringify(screens[name][pos])}`);
        i++;
    }
    delete standardPositions[pos].screen;
    if( standardPositions[pos].key ) {
        slate.bind(standardPositions[pos].key, move(standardPositions[pos]));
    }
}
slate.log(`${Object.keys(standardPositions).length} standard standardPositions defined`);
slate.log(`Created ${i} standard standardPositions for ${Object.keys(screens).length} screens`);

bindApps(myApps, monitorLayouts);

/**************'
 * Utility functions.
 * Unless you find a bug or you want to change behavour.
 */

 // Relaunch Slate and read config file again. Use if you make changes to this file
function relaunch() {
    return function() {
        slate.log('Relaunch opreration requested by user. Relaunch slate.');
        let op = slate.operation('relaunch');
        op.run();
    };
}

// Iterate the apps object and assign the keys and layouts
function bindApps(apps, layouts) {
    slate.log(`Bingind Apps to keys and layouts`);
    let keys = Object.keys(apps);
    let layoutDescription = {};
    if( !apps ) {
        return;
    }
    for (let k in apps) {
        // Bind key to focus on app
        slate.log(`Bind app ${k} to key ${apps[k].key}`);
        slate.bind(apps[k].key, slate.operation("focus", {
            "app": k
        }));

        // If there's a position assign app in layout
        if( apps[k].position ) {
            for( let p in apps[k].position ) {
                // Check if this is a valid standard position
                slate.log(`Creating layout description for app ${k} and layout ${p} : ${JSON.stringify(apps[k].position[p])}`);
                if( !apps[k].position[p] ) {
                    slate.log(`ERROR: This poistion is not defined: ${p}`);
                    continue;
                }
                
                if( !layoutDescription[p] ) {
                    layoutDescription[p] = {};
                }
                let m = _.clone(apps[k].position[p]);
                layoutDescription[p][k] = {
                    operations: [ function(windowObject) {
                        (function() {
                            slate.log(`--> m: screen: ${m.screen}, height: ${m.height}, width: ${m.width}`);
                            let action = move(m, windowObject);
                            action();
                        })();    
                    }],
                    "main-first": true,
                    "repeat": true
                };

            }
        }
    }
    slate.log(`Layout Description: ${layoutDescription.fourMonitors.Code.operations}`);
    for(let l in layoutDescription ) {
        slate.log(`Creating layout ${l}.`);
        let layout = slate.layout(l, layoutDescription[l]);
        if( !layouts[l] ) {
            slate.log(`Bad layout name in app definition. ${l} not found in layouts ${JSON.stringify(layouts)}`);
            continue;
        }
        slate.bind(layouts[l].key,  
            slate.operation("layout", {
                name: layout
            })
        );
    }
}

// Bind all shortcuts to operations
function bindKeys(shortCut, moves) {
    for (let k in moves) {
        slate.log(`Binding ${shortCut(k)}`);
        slate.bind(shortCut(k), moves[k]);
    }
}

/**
 *  Return a move to the left or right half of the screen
 *  side: left, right
 * 
 *  opts is an object with the following properties
 *    width : fraction to multiply the sreen width by, default: 1. 
 *            1/2 will get you half the screen width for example
 *    height : fraction to multiply the sreen height by, default: 1
 *    hPosition: index of the position horizontally, leftmost is 0
 *    hPosition: index of the position vertically, topmost is 0
 *    offsetX: factor of the screen width to offset the window by
 *    offsetY: factor of the screen height to offset the window by
 * 
 * all options default to 0 if not indicated above
 * 
 * Examples: 
 *  { width : 1/3 } - left third, or 0 hPosition, height is full screen height
 *  { width : 1/3, hPosition: 1 } - middle third, or 1 hPosition, height is full screen height
 */
function move(opts, windowObject) {
    opts = opts || {};
    opts.width = opts.width || 1;
    opts.height = opts.height || 1;

    // Position is right to left then top to bottom
    opts.hPosition = opts.hPosition || 0;
    opts.vPosition = opts.vPosition || 0;

    opts.offsetX = opts.offsetX || 0;
    opts.offsetY = opts.offsetY || 0;

    let windowWidth = `floor(screenSizeX * ${opts.width})`;
    let windowHeight = `floor(screenSizeY * ${opts.height})`;

    let topX = `screenOriginX + floor(${opts.hPosition} * ${windowWidth}) + floor(${opts.offsetX} * screenSizeX)`;
    let topY = `screenOriginY + floor(${opts.vPosition} * ${windowHeight}) + floor(${opts.offsetY} * screenSizeY)`;

    let moveTo = {
        x: topX,
        y: topY,
        width: windowWidth,
        height: windowHeight
    };

    if (opts.hasOwnProperty('screen')) {
        moveTo.screen = opts.screen;
    }

    return function () {
        logCoords(moveTo, windowObject);
        let op = slate.operation("move", moveTo);
        if( windowObject ) {
            windowObject.doOperation(op);
        }
        else {
            op.run();
        }
    };
}

// Slide. ie move, window into another screen area without resizing. 
// So if the window is on the right top corner of the screen you can 'slide'
// it to the left corner by calling slide('left')
function slide(dir) {

    if (dir) {
        dir = dir.toLowerCase();
    }

    return function () {
        let win = slate.window();
        let slideTo = {
            x: win.rect().x,
            y: win.rect().y,
            width: win.rect().width,
            height: win.rect().height
        };
        let screen = slate.screen();
        let screenOriginX = screen.rect().x;
        let screenOriginY = screen.rect().y;
        let screenSizeX = screen.rect().width;
        let screenSizeY = screen.rect().height;

        switch (dir) {
            case 'up':
                if (slideTo.y - slideTo.height >= screenOriginY) {
                    slate.log(`Sliding ${dir} by -${slideTo.height}: ${win.title()}`);
                    slideTo.y -= slideTo.height;
                } else {
                    slate.log('Move to the bottom of the screen');
                    slideTo.y = screenOriginY + screenSizeY - slideTo.height;
                }
                break;
            case 'down':
                if (slideTo.y + 2 * slideTo.height <= screenOriginY + screenSizeY) {
                    slate.log(`Sliding ${dir} by ${slideTo.height}: ${win.title()}`);
                    slideTo.y += slideTo.height;
                } else {
                    slate.log('Move to the top of the screen');
                    slideTo.y = screenOriginY;
                }
                break;
            case 'left':
                if (slideTo.x - slideTo.width >= screenOriginX) {
                    slate.log(`Sliding ${dir} by -${slideTo.width}: ${win.title()}`);
                    slideTo.x -= slideTo.width;
                } else {
                    slate.log('Move to the rightmost part of the screen');
                    slideTo.x = screenOriginX + screenSizeX - slideTo.width;
                }
                break;
            case 'right':
                if (slideTo.x + 2 * slideTo.width <= screenOriginX + screenSizeX) {
                    slate.log(`Sliding ${dir} by ${slideTo.width}: ${win.title()}`);
                    slideTo.x += slideTo.width;
                } else {
                    slate.log('Move to the left most part of the screen');
                    slideTo.x = screenOriginX;
                }
                break;
            default:
                slate.log(`slide error: Bad direction ${dir} possible values are: up, down, right, left`);
                return function () {
                    slate.log(`slide error: Bad direction ${dir} possible values are: up, down, right, left`);
                };
        }


        logCoords(slideTo);
        let op = slate.operation('move', slideTo);
        op.run();
    };
}

// Move to another screen but keep window in the same position. 
// So if the window is the the left third of one screen and you call `moveToScreen('left')` the 
// window will be moved to same position on the screen to the left of the current screen.
function moveToScreen(dir) {
    if (dir) {
        dir = dir.toLowerCase();
    }

    return function () {
        let window = {
            x: slate.window().rect().x,
            y: slate.window().rect().y,
            width: slate.window().rect().width,
            height: slate.window().rect().height
        };
        slate.log(`Current Window Coordinates: ${window.x}, ${window.y}`);

        let screen = slate.screen();
        let screenOriginX = screen.rect().x;
        let screenOriginY = screen.rect().y;
        let screenSizeX = screen.rect().width;
        let screenSizeY = screen.rect().height;

        let newScreenId;
        switch (dir) {
            case 'left':
                if (screen.id() !== 0) {
                    newScreenId = screen.id() - 1;
                } else {
                    newScreenId = slate.screenCount() - 1;
                }
                break;
            case 'right':
                if (screen.id() !== slate.screenCount() - 1) {
                    newScreenId = screen.id() + 1;
                } else {
                    newScreenId = 0;
                }
                break;
            default:
                if( isNaN(dir) ) {
                    slate.log(`moveToScreen error: Bad destination screen ${dir} possible values are: right, left or monitor id 0 to ${slate.screenCount()}`);
                    return;
                }
                newScreenId = Number(dir);
                if( dir < 0 || dir > slate.screenCount() ) {
                    slate.log(`moveToScreen error: Bad destination screen ${dir} possible values are: right, left or monitor id 0 to ${slate.screenCount()}`);
                    return;
                }
                if( newScreenId === screen.id() ) {
                    // No need to do anything if destination 
                    // screen is the same
                    return;
                }
        }

        let newScreen = slate.screenForRef(newScreenId);
        let newScreenOriginX = newScreen.rect().x;
        let newScreenOriginY = newScreen.rect().y;
        let newScreenSizeX = newScreen.rect().width;
        let newScreenSizeY = newScreen.rect().height;

        let offsetX = window.x - screenOriginX;
        let offsetY = window.y - screenOriginY;

        let scaleX = newScreenSizeX / screenSizeX;
        let scaleY = newScreenSizeY / screenSizeY;

        let newScreenCoords = {
            //screen: newScreen.id(),
            x: newScreenOriginX + offsetX * scaleX,
            y: newScreenOriginY + offsetY * scaleY,
            width: window.width * scaleX,
            height: window.height * scaleY
        };
        slate.log(`moveToScreen: ${screen.id()} -> ${newScreen.id()}`);
        slate.log(`[SLATE] newScreenOriginX: ${newScreenOriginX}`);
        slate.log(`[SLATE] newScreenOriginY: ${newScreenOriginY}`);
        slate.log(`[SLATE] newScreenSizeX: ${newScreenSizeX}`);
        slate.log(`[SLATE] newScreenSizeY: ${newScreenSizeY}`);
        
        logCoords(newScreenCoords);
        let op = slate.operation('move', newScreenCoords);
        op.run();
    };
}

// Log window and movement coordinates. Check Mac OS console.
function logCoords(c, win) {
    let screen = slate.screen();
    slate.log("[SLATE] -------------- Coords Log --------------");
    slate.log(`[SLATE] number of screens: ${slate.screenCount()}`);
    slate.log(`[SLATE] current screen: ${screen.id()}`);    
    slate.log(`[SLATE] screenOriginX: ${screen.rect().x}`);
    slate.log(`[SLATE] screenOriginY: ${screen.rect().y}`);
    slate.log(`[SLATE] screenSizeX: ${screen.rect().width}`);
    slate.log(`[SLATE] screenSizeY: ${screen.rect().height}`);

    if( win ) {
        let title = win.title();
        let app = win.app();
        let name = app.name();
        slate.log(`[SLATE] App: ${name}, Window: ${title}`);
    }
        

    slate.log(`[SLATE] Move to:`);

    if( c.screen )
        slate.log(`[SLATE] screen: ${c.screen}`);
    
    slate.log("[SLATE] x: " + c.x);
    slate.log("[SLATE] y: " + c.y);
    slate.log("[SLATE] width: " + c.width);
    slate.log("[SLATE] height: " + c.height);
    slate.log("[SLATE] ----------------------------------------");
}

slate.log("[SLATE] -------------- Finished Loading Config from .slate.js -------------");