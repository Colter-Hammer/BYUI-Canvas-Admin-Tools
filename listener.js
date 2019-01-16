chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // On any message it catches it here and runs it's respsective function
    // This is supposed to be listening to the messages sent by main.js
    switch (message) {
        case "deleteQuizQuestions":
            var elt = document.createElement("script");
            elt.innerHTML = '(' + deleteQuestions.toString() + ')()';
            document.head.appendChild(elt);
            sendResponse("Quiz questions deleted!");
            break;
        case "deleteQuizzes":
            var elt = document.createElement("script");
            elt.innerHTML = '(' + deleteAllQuizzes.toString() + ')()';
            document.head.appendChild(elt);
            sendResponse("Quizzes deleted!");
            break;
        case "lockSections":
            lockElements();
            sendResponse("Sections locked!");
            break;
        case "unlockSections":
            unlockElements();
            sendResponse("Sections unlocked!");
            break;
        case "addDivsToQuestionBank":
            loadFullPage()
                .then(clickTheButtons)
                .catch(console.error);
            sendResponse("Divs added!");
            break;
        case "editor":
            jmLoadScript(chrome.runtime.getURL('scripts/scriptInjector.js'), function () {
                "use strict";
                jmLoadScriptsD2lAceEditor()
            });
            sendResponse("Editor popped up!");
            break;
        default:
            sendResponse("Feature could not be found.");
    }
});