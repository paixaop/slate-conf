/**
 * Slate JS configuration
 * 
 * Author: Pedro Paixao
 * Last Update: 12/15/2022
 */

// Set Your Modifier Keys
var HYPER_1 = ':ctrl;alt;cmd';
var HYPER_2 = ':ctrl;cmd';
var HYPER_3 = ':ctrl;cmd;shift;alt';

// Suppress some of the more verbose log messages
var LOG_AREAS = 0;
var LOG_LAYOUT = 1;

slate.log('[SLATE] -------------- Started Loading Config from .slate.js --------------');
slate.defaultToCurrentScreen = true;
slate.secondsBeforeRepeat = 0.4;
slate.secondsBetweenRepeat = 0.1;
slate.keyboardLayout = 'qwerty';
slate.nudgePercentOf = 'screenSize';
slate.resizePercentOf = 'screenSize';

let monitors = initMonitors({
    lg: {
        resolution: ['6720x1890', '5120x1440']
    },
    mac: {
        resolution: '1792x1120'
    },
});

let monitorLayouts = {
    twoMonitors: {
        key: sc1('2'),
    },
    twoMonitorsCode: {
        key: sc1('w'),
    },
    twoMonitorsMail: {
        key: sc1('3'),
    },
};

// Applications Aliases
let myApps = {
    Mail: {
        key: sc1('e'),
        position: {
            twoMonitors: monitors.lg.lg1,
            twoMonitorsCode: monitors.lg.lg1,
            twoMonitorsMail: monitors.lg.lg12
        },
    },
    Calendar: {
        key: sc1('l'),
        position: {
            twoMonitors: monitors.mac.rightHalf,
            twoMonitorsCode: monitors.mac.rightHalf,
            twoMonitorsMail: monitors.mac.rightHalf
        },
    },
    'Microsoft Teams': {
        key: sc1('m'),
        position: {
            twoMonitors: monitors.lg.lg3,
            twoMonitorsCode: monitors.lg.lg3,
            twoMonitorsMail: monitors.lg.lg11
        },
    },
    Code: {
        key: sc1('c'),
        position: {
            twoMonitors: monitors.lg.lg3,
            twoMonitorsCode: monitors.lg.rightTwoThirds,
            twoMonitorsMail: monitors.lg.lg11
        },
    },
    Terminal: {
        key: sc1('t'),
        position: {
            twoMonitors: monitors.mac.leftHalf,
            twoMonitorsCode: monitors.mac.leftHalf,
            twoMonitorsMail: monitors.mac.leftHalf
        },
    },
    Telegram: {
        key: sc1('r'),
        position: {
            twoMonitors: monitors.lg.lg4,
            twoMonitorsCode: monitors.mac.topRightCorner,
            twoMonitorsMail: monitors.lg.lg8
        },
    },
    Messages: {
        key: sc1('i'),
        position: {
            twoMonitors: monitors.lg.lg5,
            twoMonitorsCode: monitors.mac.bottomRightCorner,
            twoMonitorsMail: monitors.lg.lg9,
        },
    },
    WhatsApp: {
        position: {
            twoMonitors: monitors.lg.lg5,
            twoMonitorsCode: monitors.mac.bottomRightCorner,
            twoMonitorsMail: monitors.lg.lg9
        },
    },
    Thunderbird: {
        key: sc1('e'),
        position: {
            twoMonitors: monitors.lg.lg1,
            twoMonitorsCode: monitors.lg.lg1,
            twoMonitorsMail: monitors.lg.lg12
        },
    },
    Firefox: {
        key: sc2('f'),
        position: {
            twoMonitors: monitors.lg.lg2,
            twoMonitorsCode: monitors.lg.leftOneThird,
            twoMonitorsMail: monitors.lg.lg10
        },
    },
    'Google Chrome': {
        key: sc1('b'),
        position: {
            twoMonitors: monitors.lg.lg2,
            twoMonitorsCode: monitors.lg.leftOneThird,
            twoMonitorsMail: monitors.lg.lg10
        },
    },
    Safari: {
        key: sc1('s'),
        position: {
            twoMonitors: monitors.lg.lg2,
            twoMonitorsCode: monitors.lg.leftOneThird,
            twoMonitorsMail: monitors.lg.lg10
        },
    },
    Finder: {
        key: sc1('f'),
        position: {
            twoMonitors: monitors.mac.rightHalf,
            twoMonitorsCode: monitors.mac.rightHalf,
            twoMonitorsMail: monitors.mac.rightHalf
        },
    },
    Preview: {
        key: sc1('p'),
        position: {
            twoMonitors: monitors.lg.lg2,
            twoMonitorsCode: monitors.lg.leftOneThird,
            twoMonitorsMail: monitors.lg.lg10
        },
    },
    'Microsoft Excel': {
        key: sc1('x'),
        position: {
            twoMonitors: monitors.lg.lg3,
            twoMonitorsCode: monitors.lg.lg3,
            twoMonitorsMail: monitors.lg.lg10
        },
    },
};

bindApps(myApps, monitorLayouts);

// Moves bound to shortcut 1
bindKeys(sc1, {
    right: slide('right'),
    left: slide('left'),
    up: slide('up'),
    down: slide('down'),
});

// Moves bound to shortcut 2
bindKeys(sc2, {
    right: moveToScreen('right'),
    left: moveToScreen('left'),
    y: move(monitors.lg.bottomTwoThirds),
    r: relaunch(),
});

bindKeys(sc3, {
    1: move(monitors.lg.lg1),
    2: move(monitors.lg.lg2),
    3: move(monitors.lg.lg3),
    4: move(monitors.lg.lg4),
    5: move(monitors.lg.lg5),
    6: move(monitors.lg.lg6),
    7: move(monitors.lg.lg7),
});

/**************'
 * Utility functions.
 * Unless you find a bug or you want to change behavior.
 */

// Key shortcuts
function sc1(key) {
    return key + HYPER_1;
}

function sc2(key) {
    return key + HYPER_2;
}

function sc3(key) {
    return key + HYPER_3;
}

function relaunch() {
    return function () {
        slate.log('Relaunch operation requested by user. Relaunch slate.');
        let op = slate.operation('relaunch');
        op.run();
    };
}

function bindApps(apps, layouts) {
    slate.log(`Bindind Apps to keys and layouts`);
    let keys = Object.keys(apps);
    let layoutDescription = {};
    if (!apps) {
        return;
    }
    for (let k in apps) {
        // Bind key to focus on app
        slate.log(`Bind app ${k} to key ${apps[k].key}`);
        if (apps[k].key) {
            slate.bind(
                apps[k].key,
                slate.operation('focus', {
                    app: k,
                })
            );
        }

        // If there's a position assign app in layout
        if (apps[k].position) {
            for (let p in apps[k].position) {
                // Check if this is a valid standard position
                if( LOG_LAYOUT ) {
                    slate.log(`Creating layout description for app ${k} and layout ${p} : ${JSON.stringify(apps[k].position[p])}`);
                }
                if (!apps[k].position[p]) {
                    slate.log(`ERROR: This position is not defined: ${p}`);
                    continue;
                }

                if (!layoutDescription[p]) {
                    layoutDescription[p] = {};
                }
                let m = _.clone(apps[k].position[p]);
                layoutDescription[p][k] = {
                    operations: [
                        function (windowObject) {
                            (function () {
                                slate.log(`[Slate] Layout ${p}: App: ${k}`);
                                slate.log(`[Slate] --> m: screen: ${m.screen}, height: ${m.height}, width: ${m.width}`);
                                if (m.screen < highestScreenId()) {
                                    let action = move(m, windowObject);
                                    action();
                                } else {
                                    slate.log(`Bad screen, skip move.`);
                                }
                            })();
                        },
                    ],
                    'ignore-fail': true,
                    'main-first': true,
                    repeat: true,
                };
            }
        }
    }
    // slate.log(`Layout Description: ${layoutDescription.fourMonitors.Code.operations}`);
    for (let l in layoutDescription) {
        //slate.log(`Layout ${JSON.stringify(layoutDescription[l])}`);
        slate.layout(l, layoutDescription[l]);
        slate.log(`Creating layout ${l}.`);
        if (!layouts[l]) {
            slate.log(`Bad layout name in app definition. ${l} not found in layouts ${JSON.stringify(layouts)}`);
            continue;
        }
        slate.bind(
            layouts[l].key,
            slate.operation('layout', {
                name: l,
            })
        );
    }
}

// Bind all shortcuts to apps
function bindKeys(shortCut, moves) {
    for (let k in moves) {
        slate.log(`Binding ${shortCut(k)}`);
        slate.bind(shortCut(k), moves[k]);
    }
}

/**
 *  Return a move to the left or right half of the screen
 *  side: left, right
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
        height: windowHeight,
    };

    if (opts.hasOwnProperty('screen')) {
        moveTo.screen = opts.screen;
    }

    return function () {
        if (moveTo && windowObject && (moveTo.screen > highestScreenId() || windowObject.screen > highestScreenId())) {
            slate.log(`[Slate] Bad Screen ID ${moveTo.screen}. Skip move.`);
            return;
        }

        logCoords(moveTo, windowObject);
        let op = slate.operation('move', moveTo);
        if (windowObject) {
            windowObject.doOperation(op);
        } else {
            op.run();
        }
    };
}

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
            height: win.rect().height,
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

function moveToScreen(dir) {
    if (dir) {
        dir = dir.toLowerCase();
    }

    return function () {
        let window = {
            x: slate.window().rect().x,
            y: slate.window().rect().y,
            width: slate.window().rect().width,
            height: slate.window().rect().height,
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
                if (isNaN(dir)) {
                    slate.log(
                        `moveToScreen error: Bad destination screen ${dir} possible values are: right, left or monitor id 0 to ${slate.screenCount()}`
                    );
                    return;
                }
                newScreenId = Number(dir);
                if (dir < 0 || dir > slate.screenCount()) {
                    slate.log(
                        `moveToScreen error: Bad destination screen ${dir} possible values are: right, left or monitor id 0 to ${slate.screenCount()}`
                    );
                    return;
                }
                if (newScreenId === screen.id()) {
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
            height: window.height * scaleY,
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

function logCoords(c, win) {
    let screen = slate.screen();
    slate.log('[SLATE] -------------- Coords Log --------------');
    if (!screen) {
        slate.log('[SLATE] Bad screen. return');
        return;
    }

    slate.log(`[SLATE] number of screens: ${slate.screenCount()}`);
    slate.log(`[SLATE] current screen: ${screen.id()}`);
    if (screen.id() > highestScreenId()) {
        slate.log(`[Slate] Bad screen id ${screen.id()}. Skip log coordinates`);
        return;
    }
    slate.log(`[SLATE] screenOriginX: ${screen.rect().x}`);
    slate.log(`[SLATE] screenOriginY: ${screen.rect().y}`);
    slate.log(`[SLATE] screenSizeX: ${screen.rect().width}`);
    slate.log(`[SLATE] screenSizeY: ${screen.rect().height}`);

    if (win) {
        let title = win.title();
        let app = win.app();
        let name = app.name();
        slate.log(`[SLATE] App: ${name}, Window: ${title}`);
    }

    slate.log(`[SLATE] Move to:`);

    if (c.screen) slate.log(`[SLATE] screen: ${c.screen}`);

    slate.log('[SLATE] x: ' + c.x);
    slate.log('[SLATE] y: ' + c.y);
    slate.log('[SLATE] width: ' + c.width);
    slate.log('[SLATE] height: ' + c.height);
    slate.log('[SLATE] ----------------------------------------');
}

function createAreas(areas, horizontalAreas, verticalAreas) {
    if (horizontalAreas === 0 || verticalAreas === 0) {
        return null;
    }

    let width = 1 / horizontalAreas;
    let height = 1 / verticalAreas;

    for (let h = 0; h < horizontalAreas; h++) {
        let area = {};
        for (let v = 0; v < verticalAreas; v++) {
            let name = `area_${horizontalAreas}x${verticalAreas}_${h}x${v}`;
            areas[name] = {};
            areas[name].width = width;
            areas[name].height = height;
            areas[name].hPosition = h;
            areas[name].vPosition = v;
        }
    }
    return areas;
}

function setScreenIDs(monitors) {
    slate.log(`Detect screen IDs`);
    slate.eachScreen((screen) => {
        // do something with the screenObject. this function will run once per screen.
        let id=screen.id();
        let r = screen.rect();
        let resolution = `${r.width}x${r.height}`;
        slate.log(`Screen: ${id}, resolution ${resolution}`);
        
        for(let m in monitors) {
            // resolutions can be an array of string resolutions as monitors can have 
            // multiple resolutions available
            if( Array.isArray(monitors[m].resolution) ) {
                // slate.log(`Monitor ${m} has multiple resolutions ${monitors[m].resolution.join(", ")}`);
                for(let res in monitors[m].resolution) {
                    if( monitors[m].resolution[res] == resolution) {
                        monitors[m].resolution = resolution;
                        monitors[m].id = id;
                        slate.log(`Monitor ${m} associated with screen: ${id} with resolution ${resolution}`);
                        break;
                    }        
                }
            }
            else if( monitors[m].resolution == resolution) {
                monitors[m].id = id;
                slate.log(`Monitor ${m} associated with screen: ${id} with resolution ${resolution}`);
            }
        } 
    });
    return monitors;
}

function highestScreenId() {
    return 100;
}

function initMonitors(options) {
    let monitors = setScreenIDs(options);
    slate.log(`Monitors: ${JSON.stringify(monitors)}`);
    let standardPositions = {
        fullScreen: { key: sc1('pad5') },

        // Corners
        topLeftCorner: {
            key: sc1('pad7'),
            width: 1 / 2,
            height: 1 / 2,
        },
        topRightCorner: {
            key: sc1('pad9'),
            hPosition: 1,
            width: 1 / 2,
            height: 1 / 2,
        },
        bottomLeftCorner: {
            key: sc1('pad1'),
            vPosition: 1,
            width: 1 / 2,
            height: 1 / 2,
        },
        bottomRightCorner: {
            key: sc1('pad3'),
            hPosition: 1,
            vPosition: 1,
            width: 1 / 2,
            height: 1 / 2,
        },

        // Halves
        leftHalf: {
            key: sc1('pad4'),
            width: 1 / 2,
        },
        rightHalf: {
            key: sc1('pad6'),
            width: 1 / 2,
            hPosition: 1,
        },
        topHalf: {
            key: sc1('pad8'),
            height: 1 / 2,
        },
        bottomHalf: {
            key: sc1('pad2'),
            height: 1 / 2,
            vPosition: 1,
        },

        // 2/3 of Screen
        bottomTwoThirds: {
            key: sc2('pad0'),
            height: 2 / 3,
            offsetY: 1 / 3,
        },
        leftTwoThirds: {
            key: sc2('pad1'),
            width: 2 / 3,
        },
        rightTwoThirds: {
            key: sc2('pad2'),
            width: 2 / 3,
            offsetX: 1 / 3,
        },
        topTwoThirds: {
            key: sc2('pad3'),
            height: 2 / 3,
        },

        // 1/3 Horizontal
        leftOneThird: {
            key: sc2('pad4'),
            width: 1 / 3,
        },
        middleOneThird: {
            key: sc2('pad5'),
            width: 1 / 3,
            hPosition: 1,
        },
        rightOneThird: {
            key: sc2('pad6'),
            width: 1 / 3,
            hPosition: 2,
        },
        leftOneThirdTopHalf: {
            width: 1 / 3,
            height: 1 / 2,
        },
        middleOneThirdTopHalf: {
            width: 1 / 3,
            height: 1 / 2,
            hPosition: 1,
        },
        rightOneThirdTopHalf: {
            width: 1 / 3,
            height: 1 / 2,
            hPosition: 2,
        },

        // 1/3 Vertical
        topOneThird: {
            key: sc2('pad7'),
            height: 1 / 3,
        },
        middleOneThirdVertical: {
            key: sc2('pad8'),
            height: 1 / 3,
            vPosition: 1,
        },
        bottomOneThird: {
            key: sc2('pad9'),
            height: 1 / 3,
            vPosition: 2,
        },
        leftOneThirdBottomHalf: {
            width: 1 / 3,
            height: 1 / 2,
            vPosition: 1,
        },
        middleOneThirdBottomHalf: {
            width: 1 / 3,
            height: 1 / 2,
            hPosition: 1,
            vPosition: 1,
        },
        rightOneThirdBottomHalf: {
            width: 1 / 3,
            height: 1 / 2,
            hPosition: 2,
            vPosition: 1,
        },

        leftOneHalfByOneThird: {
            width: 1 / 2,
            height: 1 / 3,
        },
        rightOneHalfByOneThird: {
            width: 1 / 2,
            height: 1 / 3,
            hPosition: 1,
        },

        // 1/4 of screen
        firstOneFourth: {
            key: sc3('pad='),
            width: 1 / 4,
        },
        secondOneFourth: {
            key: sc3('pad8'),
            width: 1 / 4,
            hPosition: 1,
        },
        thirdOneFourth: {
            key: sc3('pad5'),
            width: 1 / 4,
            hPosition: 2,
        },
        fourthOneFourth: {
            key: sc3('pad2'),
            width: 1 / 4,
            hPosition: 3,
        },

        // 1/5 of screen vertical
        firstOneFifth: {
            key: sc3('pad/'),
            width: 1 / 5,
        },
        secondOneFifth: {
            key: sc3('pad9'),
            width: 1 / 5,
            hPosition: 1,
        },
        thirdOneFifth: {
            key: sc3('pad6'),
            width: 1 / 5,
            hPosition: 2,
        },
        fourthOneFifth: {
            key: sc3('pad3'),
            width: 1 / 5,
            hPosition: 3,
        },
        fifthOneFifth: {
            key: sc3('pad.'),
            width: 1 / 5,
            hPosition: 4,
        },

        lg1: {
            key: sc2('1'),
            width: 1 / 5,
        },

        lg2: {
            key: sc2('2'),
            width: 1 / 3,
            hPosition: 0,
            offsetX: 0.200195313,
        },

        lg3: {
            key: sc2('3'),
            width: 1 / 3,
            hPosition: 0,
            offsetX: 0.53359375,
        },

        lg4: {
            key: sc2('4'),
            width: 0.132421875,
            height: 1 / 2,
            offsetX: 0.866992188,
        },

        lg5: {
            key: sc2('5'),
            width: 0.132421875,
            height: 1 / 2,
            vPosition: 1,
            offsetX: 0.866992188,
        },

        lg6: {
            key: sc2('6'),
            width: 2 / 3,
            hPosition: 0,
            offsetX: 0.200195313,
        },

        lg7: {
            key: sc2('7'),
            width: 0.132421875,
            hPosition: 0,
            offsetX: 0.866992188,
        },

        lg8: {
            key: sc2('8'),
            width: 0.132421875,
            height: 1 / 2,
            offsetX: 0,
        },
        lg9: {
            key: sc2('9'),
            width: 0.132421875,
            height: 1 / 2,
            vPosition: 1,
            offsetX: 0,
        },
        lg10: {
            key: sc2('a'),
            width: 1 / 3,
            hPosition: 0,
            offsetX: 0.132421875,
        },

        lg11: {
            key: sc2('b'),
            width: 1 / 3,
            hPosition: 0,
            offsetX: 0.465755208,
        },

        lg12: {
            key: sc2('c'),
            width: 0.200911458,
            hPosition: 0,
            offsetX: 0.799088542,
        }
    };

    // Automatically add areas that are too tiresome to create by hand
    // This areas will not have key bindings.
    //
    // Areas:
    //   <5, 1> - split monitors in 5 horizontal areas
    //   <6, 1> - split monitors in 6 horizontal areas
    //   <6, 2> - split monitors in 6 horizontal areas, with top and bottom
    //   <7, 1> - split monitors in 7 horizontal areas
    //   <7, 2> - split monitors in 7 horizontal areas, with top and bottom
    standardPositions = createAreas(standardPositions, 5, 1);
    standardPositions = createAreas(standardPositions, 6, 1);
    standardPositions = createAreas(standardPositions, 6, 2);
    standardPositions = createAreas(standardPositions, 7, 1);
    standardPositions = createAreas(standardPositions, 7, 2);

    slate.log(`Binding standard standardPositions to monitors`);
    let i = 0;
    for (let pos in standardPositions) {
        for (let m in monitors) {
            standardPositions[pos].screen = monitors[m].id;
            monitors[m][pos] = _.clone(standardPositions[pos]);
            if( LOG_AREAS ) {
                slate.log(`monitors.${m}.${pos} created ${JSON.stringify(monitors[m][pos])}`);
            }
            i++;
        }
        delete standardPositions[pos].screen;
        if (standardPositions[pos].key) {
            slate.bind(standardPositions[pos].key, move(standardPositions[pos]));
        }
    }
    slate.log(`${Object.keys(standardPositions).length} standard standardPositions defined`);
    slate.log(`Created ${i} standard standardPositions for ${Object.keys(monitors).length} monitors`);

    return monitors;
}

slate.log('[SLATE] -------------- Finished Loading Config from .slate.js -------------');
