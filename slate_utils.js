// ***************************************************************************
// From here on out it's just supporting code. 
// Change if you need to add new positions, or 
// correct some bug
// ***************************************************************************

// Bind screen positions to keys and to all screens
function BindScreenPositions(positions, screens) {
    slate.log(`Binding standard positions to screens`);
    let i = 0;
    for (let pos in positions) {
        for (let name in screens) {
            positions[pos].screen = screens[name].id;
            screens[name][pos] = _.clone(positions[pos]);
            slate.log(`screens.${name}.${pos} created ${JSON.stringify(screens[name][pos])}`);
            i++;
        }
        delete positions[pos].screen;
        if( positions[pos].key ) {
            slate.bind(positions[pos].key, move(positions[pos]));
        }
    }
    slate.log(`${Object.keys(positions).length} standard positions defined`);
    slate.log(`Created ${i} standard positions for ${Object.keys(screens).length} screens`);
}

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