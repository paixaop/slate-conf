# slate-conf
Configuration file for Slate Window Manager for Mac.

Copy all of the files to your home directory.

This configuration supports up to 3 montiors, and is a good base to build your own. Don't get discouraged by the seeming complex configuration files, Slate is a very powerful tool that will help you be more productive.

Look over the config and make it your own.

To download Slate and check all the config options chec out https://github.com/jigish/slate

This config includes some common definitions to move and resize windows 

  * Halves - Right, Left, Top and Bottom
  * Thirds - Right, Center, Left, Left Two Thirds and Right Two Thirds
  * Corners - Top Right, Botton Rigth, Top Left, Bottom Left
  * Full Screen

It also defines two main key bindings `Ctrl+Option+Cmd` and `Ctrl+Cmd`. They are called `hyper` and `hyper2` in the config file, or `sc1` and `sc2` (for shortcut) in the JavaScript files and this readme.

To move and resize the current window you need to use the Numeric Key Pad, or the number keys on your keyboard.

## Corners

The corner keys in the numeric key pad (7, 9, 1, 3) take the current window to the corners

  * `Ctrl+Option+Cmd 7` - Top Left Corner
  * `Ctrl+Option+Cmd 9` - Top Right Corner
  * `Ctrl+Option+Cmd 1` - Bottom Left Corner
  * `Ctrl+Option+Cmd 3` - Bottom Right Corner
  
## Halves and Full Screen

The middle rows (4, 6) and (8, 2) move the window to half the screen, 5 makes it to full screen

  * `Ctrl+Option+Cmd 4` - Left Half
  * `Ctrl+Option+Cmd 6` - Right Half
  * `Ctrl+Option+Cmd 8` - Top Half
  * `Ctrl+Option+Cmd 2` - Bottom Half
  
  * `Ctrl+Option+Cmd 5` - Full Screen

## Thirds 

Notice that thirds take use `Ctrl+Cmd` so don't press `Option`

  * `Ctrl+Cmd 4` - Left Third
  * `Ctrl+Cmd 5` - Center Third
  * `Ctrl+Cmd 6` - Right Third
  * `Ctrl+Cmd -` - Left Two Thirds
  * `Ctrl+Cmd +` - Right Two Thirds
  
Basically the "corner" keys (7, 9, 1, 3) take the window to the corner. The center keys (4, 5, 6) take the window to the halves

# Javascript Configuration file
The Javascript configuration file gives you more flexibility and functionality.
and makes configuration a bit easier than standard slate config file

To use the JS config you need to change the values of `screens` variable to match you own monitors.

Configure your screens/monitors. The monitor resolutions MUST match the screens on your
setup. To configure your screens click 'Current Window Info' from the slate menu.

You should see something like:

```
----------------- Screens -----------------
Left To Right ID: 3
  OS X ID: 0
  Resolution: 1440x900
Left To Right ID: 1
  OS X ID: 1
  Resolution: 1692x3008
Left To Right ID: 0
  OS X ID: 2
  Resolution: 1200x1920
Left To Right ID: 2
  OS X ID: 3
  Resolution: 3440x1440
```

Use this information in the `screens` variable. 

```
let screens = {
    samsung: {
        resolution: "1200x1920",
    },
    asus: {
        resolution: "1692x3008",
    },
    lg: {
        resolution: "3440x1440",
    },
    mac: {
        resolution: "1440x900",
    }
};
```

Where `samsung`, `asus`, `lg`, and `mac` are the names I chose to give each of my monitors. You can later use these names to move applications of windows to these screens, by doing `screens.asus.rightHalf` in a layout definitiona for example.

## Standard Screen Areas or Positions
So you don't have to figure out slate move operations and coordinates the JS configuration automatically calculates and sets up over 40 default screen areas that you can use in any screen, or bind a key stroke to move a window to that position.

Each of these standard positions will be attached to each of your configured screens (`screens` variable)

### Key Bindings
Each of the standard areas can have a shortcut key bound to it, so you can send a window to that area with said shortcut.

This example definition will bind `ctrl + 7` shortcut keys to the top left corner of the screen.

```
topLeftCorner: { 
        key: 'ctrl:7',
        width: 1 / 2,
        height: 1 / 2
    },
```


### Full Screen
Set the width and height to the full width and height of the screen. This is not Mac OSX full screen, just resize the window to occupy the whole screen

  * `fullScreen` 

### Corners
Screen corners resize window by half the screen height and half the screen width and move the window into one of the screen corners, top, bottom, left, right

  * `topLeftCorner` - top left corner
  * `topRightCorner` - top right corner
  * `bottomLeftCorner` - bottom left corner
  * `bottomRightCorner` - bottom right corner 

### Halves
Vertical screen halves resize the window by half the width and full screen hight, and move the window to left or right half. 
The Horizontal screen halves resize the window by half the height and full screen width, and move the window to top or bottom half. 

  * Verical
    * `leftHalf` - left half
    * `rightHalf` - right half
  * Horizontal
    * `topHalf` - top half
    * `bottomHalf` - bottom half

### Thirds
Vertical screen thirds resize the window by one, or two thirds, of the width and full screen hight, and move the window to left, middle, or right third.
The Horizontal screen thirds resize the window by one, or two, thirds of the height and full screen width, and move the window to top, middle, or bottom third. 

  * Horizontal
    * `topOneThird` - top 1/3
    * `middleOneThirdVertical` - middle 1/3, notice the `Vertical` so it's not confused with the horizontal middle third definition
    * `bottomOneThird` - bottom 1/3
    * `bottomTwoThirds` - bottom 2/3
    * `topTwoThirds` - top 2/3

  * Vertical 
    * `leftOneThird` - left 1/3
    * `middleOneThird` - middle 1/3
    * `rightOneThird` - right 1/3
    * `leftOneThirdTopHalf` - left 1/3, top half of the screen hight 
    * `middleOneThirdTopHalf` - middle 1/3, top half of the screen hight 
    * `rightOneThirdTopHalf` - right 1/3, top half of the screen hight 
    * `leftOneThirdBottomHalf` - left 1/3, bottom half of the screen hight 
    * `middleOneThirdBottomHalf` - left 1/3, bottom half of the screen hight 
    * `rightOneThirdBottomHalf` - left 1/3, bottom half of the screen hight 
    * `leftOneHalfByOneThird` - left half of the screen, by 1/3 the hight
    * `rightOneHalfByOneThird` - right half of the screen, by 1/3 the hight
    * `leftTwoThirds` - left 2/3
    * `rightTwoThirds` - right 2/3  
  
 ### Quarters
Horizontal screen fourths resize the window by 1/4 of the height and full screen width, and move the window to frist, second, thir or fourth quarter.

  * `firstOneFourth` - top most forth
  * `secondOneFourth` - second quarter
  * `thirdOneFourth` - third quarter
  * `fourthOneFourth` - fourth quarter

### Fifths
Horizontal screen fifths resize the window by 1/5 of the height and full screen width, and move the window to frist, second, thir or fourth quarter.

  * `firstOneFifth` - top most fifth
  * `secondOneFifth`
  * `thirdOneFifth`
  * `fourthOneFifth`
  * `fifthOneFifth`

# Layouts
Create a layouts object as follows:

```
let monitorLayouts = {
    layoutName : {
        key: sc1('4'),
    },
};
```

where `layoutName` is the name of the layout you will use the application configurations, and `key` is the shortcut key you wich to bind the layout to. By pressing the shortcut keys the layout is activated.

Example:
```
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
```

# Applications
In the application definitions you can configure the shortcuts that focus on the window, and what position the application windows will move to in each of the layouts you defined (see Layouts).

```
let myApps = {
    'App Name': {
        key: sc1('e'),
        position: {
            layoutName1: screens.myScreen1.bottomTwoThirds,
            layoutName2: screens.myScreen1.bottomTwoThirds,
            layoutName3: screens.myScreen2.rightOneThird
        }
    },
};
```

Where `App Name` is the name of the application as seen by Slate. this can be obtained by clicking 'Current Windows Info' in the Slate menu.

Defined the shortcut to focus on the application with `key` and configure the positions in each of the layouts, by assigning a position in a specific monitor. 
Layout names must match the ones configured in `monitorLayouts`, and the positions must be one of the standard poisitions in one of your screens. Screen names are defined in the `screens` variable.
