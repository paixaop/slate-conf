# slate-conf
Configuration file for Slate Window Manager for Mac

This configuration supports up to 3 montiors, and is a good base to build your own. Don't get discouraged by the seeming complex configuration files, Slate is a very powerful tool that will help you be more productive.

Look over the config and make it your own.

To download Slate and check all the config options chec out https://github.com/jigish/slate

This config includes some common definitions to move and resize windows 

  * Halves - Right, Left, Top and Bottom
  * Thirds - Right, Center, Left, Left Two Thirds and Right Two Thirds
  * Corners - Top Right, Botton Rigth, Top Left, Bottom Left
  * Full Screen

It also defines two main key bindings `Ctrl+Option+Cmd` and `Ctrl+Cmd`. They are called `hyper` and `hyper2` in the config file.

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

