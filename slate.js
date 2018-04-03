/**
 * MONITORS
 */
S.log("[SLATE] -------------- Started Loading Config from .slate.js --------------");

let monitors = {
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

slate.defaultToCurrentScreen = true;
slate.secondsBeforeRepeat = 0.4;
slate.secondsBetweenRepeat = 0.1;
slate.keyboardLayout = 'qwerty';
slate.nudgePercentOf = 'screenSize';
slate.resizePercentOf = 'screenSize';

// Key shortcuts
let sc1 = function (key) {
    return key + ":ctrl;alt;cmd";
};
let sc2 = function (key) {
    return key + ":ctrl;cmd";
};
let sc3 = function (key) {
    return key + ":ctrl;cmd;shift";
};

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

slate.log(`Binding standard standardPositions to monitors`);
let i = 0;
for (let pos in standardPositions) {
    for (let name in monitors) {
        standardPositions[pos].screen = monitors[name].id;
        monitors[name][pos] = _.clone(standardPositions[pos]);
        slate.log(`monitors.${name}.${pos} created ${JSON.stringify(monitors[name][pos])}`);
        i++;
    }
    delete standardPositions[pos].screen;
    if( standardPositions[pos].key ) {
        slate.bind(standardPositions[pos].key, move(standardPositions[pos]));
    }
}
slate.log(`${Object.keys(standardPositions).length} standard standardPositions defined`);
slate.log(`Created ${i} standard standardPositions for ${Object.keys(monitors).length} monitors`);

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

// Applications Aliases
let myApps = {
    'Mail': {
        key: sc1('e'),
        position: {
            fourMonitors: monitors.asus.bottomTwoThirds,
            threeMonitors: monitors.asus.bottomTwoThirds,
            twoMonitors: monitors.lg.rightOneThird
        }
    },
    'Calendar': {
        key: sc1('l'),
        position: {
            fourMonitors: monitors.samsung.topOneThird,
            threeMonitors: monitors.asus.topOneThird,
            twoMonitors: monitors.mac.bottomLeftCorner,
        }
    },
    'Code': {
        key: sc1('c'),
        position: {
            fourMonitors: monitors.asus.bottomTwoThirds,
            threeMonitors: monitors.asus.bottomOneThird,
            twoMonitors: monitors.lg.rightOneThird,
        }
    },
    'Terminal': {
        key: sc1('t'),
        position: {
            fourMonitors: monitors.mac.leftHalf,
            threeMonitors: monitors.mac.leftHalf,
            twoMonitors: monitors.mac.leftHalf,
        }
    },
    'Telegram': {
        key: sc1('r'),
        position: {
            fourMonitors: monitors.asus.leftOneHalfByOneThird,
            threeMonitors: monitors.asus.leftOneThirdTopHalf,
            twoMonitors: monitors.mac.topRightCorner
        }
    },
    'WhatsApp': {
        key: sc1('w'),
        position: {
            fourMonitors: monitors.samsung.rightOneHalfByOneThird,
            threeMonitors: monitors.asus.rightOneThirdTopHalf,
            twoMonitors: monitors.mac.bottomRightCorner
        }
    },
    'Messages': {
        key: sc1('m'),
        position: {
            fourMonitors: monitors.asus.rightOneHalfByOneThird,
            threeMonitors: monitors.asus.rightOneThirdTopHalf,
            twoMonitors: monitors.mac.rightHalf
        }
    },
    'Google Chrome': {
        key: sc1('b'),
        position: {
            fourMonitors: monitors.lg.rightOneThird,
            threeMonitors: monitors.lg.rightOneThird,
            twoMonitors: monitors.lg.rightOneThird
        }
    },
    'Safari': {
        key: sc1('s'),
        position: {
            fourMonitors: monitors.lg.leftOneThird,
            threeMonitors: monitors.lg.leftOneThird,
            twoMonitors: monitors.lg.leftOneThird
        }
    },
    'Finder': {
        key: sc1('f'),
        position: {
            fourMonitors: monitors.mac.rightHalf,
            threeMonitors: monitors.mac.rightHalf,
            twoMonitors: monitors.mac.rightHalf,
        }
    },
    'Microsoft Excel': {
        key: sc1('x'),
        position: {
            fourMonitors: monitors.lg.rightTwoThirds,
            threeMonitors: monitors.lg.rightTwoThirds,
            twoMonitors: monitors.lg.rightTwoThirds
        }
    }
};
bindApps(myApps, monitorLayouts);

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
    'y': monitors.asus.bottomTwoThirds,
    'r': relaunch()
});

//bindKeys(sc3, );


/**************'
 * Utility functions.
 * Unless you find a bug or you want to change behavour.
 */

function relaunch() {
    return function() {
        slate.log('Relaunch opreration requested by user. Relaunch slate.');
        let op = slate.operation('relaunch');
        op.run();
    };
}

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