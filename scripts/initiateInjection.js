/*eslint-env browser*/
/*global jmLoadScriptsD2lAceEditor */

function jmLoadScript(scriptURL, callback) {
    "use strict";

    // Is the script loaded on the page yet?
    function needToLoadScript(scriptURL) {
        // If script tag does NOT exist, this returns true. (it needs to be loaded)
        return 0 === document.querySelectorAll('script[src="' + scriptURL + '"]').length
    }

    // Do we need to load it?
    if (needToLoadScript(scriptURL)) {
        var newScript = document.createElement("script");
        newScript.addEventListener("load", callback);
        newScript.src = scriptURL;
        document.body.appendChild(newScript);

    } else {
        callback();
    }
}

