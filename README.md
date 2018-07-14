# RestrictJS - Content Copy Restriction  Tool / Content Protection Tool [jQuery Version]  


RestrictJS is content copy restriction script. With this script you can:
* Content Copy or add watermark to copied content
* Adblocker
* View Source
* Restrict Scroll
* Context Menu
* Image Copy or Drag Copy
* Key inputs

![RestrictJS](https://i.imgur.com/hwvABm5.png)  

## Features

1. Fast and Lightweight (<10Kb)   
2. Easy to use and Customizable   
3. Cross Browser support and available with sweetalert.js


## Quick Start

* Include `restrict.js` in your file.

```
     $(function(){
                 $(document).restrictjs({
     
                     //Restrict Context Menu
                     restrictContextMenu: true, // true or false
                     contextMenuMessage: 'Context menu is restricted.',
     
                     //Restrict copy of content and images
                     restrictCopy: false, // true or false
                     restrictCopyMessage: 'Copying is restricted.',
     
                     //Restrict image drag – to restrict image copying
                     restrictImageDrag: true, // true or false
                     restrictImageDragMessage: "Image dragging is disabled.",
     
                     //Restrict Keyboard
                     restrictKeyboard: true, // true or false
                     restrictKeyboardMessage: "Input is restricted.",
     
                     //Restrict Scrolling
                     restrictScroll: false, // true or false
     
                     restrictAdBlock: true, //true or false
                     restrictAdBlockOptions: {
                         redirect: false, // true or false
                         redirectURL: 'http://www.domain.com/how-to-disable-adblock.html', // redirect url for ad block redirection.
                         warning: {
                             bodyText: 'You need to disable adblocker on your website to continue using our website. If you have disabled the adblocker, refresh this page.', //body text of adblocker popup
                             buttonText: 'How to disable Ad-block?' //button text of adblocker popup
                         }
                     },
     
                     restrictClipboard: true, // true or false
                     restrictClipboardOptions:  {
                         element: window, //element of restriction
                         disableCopy: false, // true or false
                         callbackBeforeCopy: function() {}, //callback function called before copy
                         callbackAfterCopy: function() {}, //callback function called before copy
                         beforeText: "Copied on: {DATE}\n\n", // text prepended
                         afterText: "\n\nRead more at: {URL}" // text appended
                     }
                 });
             });
```

## Browser support

* Chrome 
* Edge 
* Firefox 
* Internet Explorer 9+
* Opera 
* Safari 

## Special Thanks

* Sweetalert.js
* [One Page Theme](https://github.com/Ancap-Corporation/One-Page-Portfolio-And-Resume-Theme) by [Ancap Corporation](http://ancap.in)

## License

The code is available under the [MIT license](LICENSE.txt).

## Information
This is an opensource project by [Ancap Corporation](http://ancap.in). Please send a query to info AT ancap.in or inform of an issue on Git.