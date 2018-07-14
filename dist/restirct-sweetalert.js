(function($) {
    if (typeof jQuery === 'undefined') {
        throw new Error('This plugin requires jQuery. Make sure jQuery is included.');
    }
    $.fn.restrictjs = function(options){
        var self                    = this;
        var isMobile                = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        var $this                   = $(this);
        var settings                = $.extend({
            restrictRightClick: null
        }, options);

        /**
         * Replace textual shortcodes in the text
         * @param  {string}     str String containing shortcodes
         * @return {string}     String with shortcodes decifered
         */
        function replaceShortCodes(str) {
            var date = new Date();
            str = str.replace("{URL}", document.location.href);
            str = str.replace("{DATE}", date.toLocaleDateString());
            return str;
        }

        /**
         * Listeners
         * @param  {event} e event object
         * @return {void}    prevent default actions
         */
        function copyListner(e) {
            //Clipboard copy will not work if copy function is disabled
            if(settings.restrictClipboard && !settings.restrictCopy)
            {
                settings.restrictClipboardOptions.callbackBeforeCopy();
                if(!settings.restrictCopy && settings.restrictClipboard){
                    var copytext = replaceShortCodes(settings.restrictClipboardOptions.beforeText) + window.getSelection() + replaceShortCodes(settings.restrictClipboardOptions.afterText);
                    if (window.clipboardData) {
                        window.clipboardData.setData('Text', copytext);
                    } else {
                        e.clipboardData.setData('text/plain', copytext);
                    }
                    settings.restrictClipboardOptions.callbackAfterCopy();
                }
                e.preventDefault(); // We want our data, not data from any selection, to be written to the clipboard
            }
        }

        /*
         * Get Navigator type
         * @return {navigator}    Type of navigator
         */

        function getHelpImg() {
            var ua = window.navigator.userAgent;
            if(ua.indexOf('Chrome/') > -1) {
                return 'chrome';
            } else if (ua.indexOf('Firefox/') > -1) {
                return 'firefox';
            } else {
                return 'other';
            }
        }

        /**
         * @return {void}
         */
        function init() {
            if(settings.restrictClipboard)
            {
                if(typeof settings.restrictClipboardOptions.element === "string"){
                    settings.restrictClipboardOptions.element = document.getElementById(settings.restrictClipboardOptions.element);
                }
                settings.restrictClipboardOptions.element.addEventListener('copy', copyListner);
            }
        }

        //Initialize
        init();


        /**
         * Functions calling for restrictions on page.
         */
        return this.each(function(){

            //Restrict Adblock
            if(settings.restrictAdBlock) {
                if (typeof adblock === 'undefined') {
                    if (typeof settings.restrictAdBlockOptions === 'object') {
                        if (typeof settings.restrictAdBlockOptions.redirectURL !== 'undefined' && settings.restrictAdBlockOptions.redirectURL.length > 0) {
                            //Redirect to URL if given in options on detection of ad-blocker
                            if (settings.restrictAdBlockOptions.redirect) {
                                window.top.location.href = settings.restrictAdBlockOptions.redirectURL;
                            } else if (typeof(warn = settings.restrictAdBlockOptions.warning) === 'object') {
                                // Set default value
                                if (typeof warn.bodyText === 'undefined') {
                                    warn.bodyText = 'You need to disable adblocker on your website to continue using our website. If you have disabled the adblocker, refresh this page.';
                                }
                                if (typeof warn.buttonText === 'undefined') {
                                    warn.buttonText = 'How to disable Ad-blocker?';
                                }
                                swal({
                                    title: "Disable Adblocker!",
                                    text: warn.bodyText,
                                    icon: "error",
                                    button: warn.buttonText,
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then(okay => {
                                    if (okay) {
                                        window.location.href = settings.restrictAdBlockOptions.redirectURL;
                                    }
                                });
                            }
                        }
                    }

                }
            }

            if(settings.restrictKeyboard){
                //Disable any key press – For desktop models
                $this.on('keypress', function() {
                    if(settings.restrictKeyboardMessage.trim().length)
                    {
                        alert(settings.restrictKeyboardMessage);
                    }
                    return false;
                });
                window.addEventListener("keydown", function(e) {
                    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                        e.preventDefault();
                    }
                }, false);
                //If mobile, disable touch
                if(isMobile){
                    $this.on('touchstart', function(e){
                        $('input, textarea').prop('disabled', true);
                    });
                }
            }
            //Restrict Context Menu
            if(settings.restrictContextMenu){
                $this.on("contextmenu", function(){
                    if(settings.contextMenuMessage.trim().length)
                    {
                        alert(settings.contextMenuMessage);
                    }
                    return false;
                });
            }

            //Restrict copy, cut and paste
            if(settings.restrictCopy){
                $this.on("cut copy paste", function(e){
                    if(settings.restrictCopyMessage.trim().length)
                    {
                        alert(settings.restrictCopyMessage);
                    }
                    return false;
                });

                $this.on('keydown', function(e){
                    if((e.metaKey) && e.which == 67){
                        e.preventDefault();
                        if(settings.restrictCopyMessage.trim().length)
                        {
                            alert(settings.restrictCopyMessage);
                        }
                        return false;
                    }
                });

                //Restrict image copy
                $('img').on("contextmenu", function(e){ return false; });
                //Restrict Image copy on mobile
                if(isMobile){
                    $('img').on('touchstart', function(e){
                        $('img').css({'-webkit-touch-callout':'none', '-webkit-user-select':'none',
                            'pointer-events':'none', '-moz-user-select':'none'});
                        e.preventDefault();
                        return false;
                    });
                }
            }
            //Restrict Scroll
            if(settings.restrictScroll){
                var keys = {37: 1, 38: 1, 39: 1, 40: 1};
                function preventDefault(e) {
                    e = e || window.event;
                    if(e.preventDefault)
                        e.preventDefault();
                    e.returnValue = false;
                }
                function restrictScrollViaKeys(e) {
                    if(keys[e.keyCode]) {
                        preventDefault(e);
                        return false;
                    }
                }
                function restrictScroll() {
                    if(window.addEventListener)
                        window.addEventListener('DOMMouseScroll', preventDefault, false);
                    window.onwheel = preventDefault;
                    window.onmousewheel = document.onmousewheel = preventDefault;
                    window.ontouchmove  = preventDefault;
                    document.onkeydown  = restrictScrollViaKeys;
                }
                restrictScroll();
                //Restrict scroll on mobile form
                if(isMobile){
                    document.addEventListener('touchmove', function(e){
                        e.preventDefault();
                    }, { passive:false });
                }
            }
            //Restrict Image Drag
            if(settings.restrictImageDrag){
                $('img').on('contextmenu dragstart', function(){
                    if(settings.restrictImageDragMessage.trim().length)
                    {
                        alert(settings.restrictImageDragMessage);
                    }
                    return false;
                });
                //Restrict Image Drag on mobile form
                if(isMobile){
                    $('img').on('touchstart', function(e){
                        $('img').css({'-webkit-touch-callout':'none', '-webkit-user-select':'none',
                            'pointer-events':'none', '-moz-user-select':'none'});
                        e.preventDefault();
                        return false;
                    });
                }
            }
        });
    }
}(jQuery));