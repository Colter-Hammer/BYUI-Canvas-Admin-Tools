function setItem(event) {
    var itemID = event.target.id;
    var storageInfo = {};

    storageInfo[itemID] = `${event.target.checked}`;

    chrome.storage.sync.set(storageInfo, (items) => {
        if (chrome.runtime.error) {
            console.log(chrome.runtime.error);
        }
        console.log(items);
    });
}

chrome.storage.sync.get({
    deleteQuizQuestions: false,
    killQuizzes: false,
    blueprintLockItems: false,
    divsToQuestions: false,
    adminAccountNames: false
}, function (items) {
    if (!items.deleteQuizQuestions) {
        document.querySelector('#deleteQuizQuestionsLabel').style.display = 'none';
    }
    if (!items.killQuizzes) {
        document.querySelector('#deleteQuizzesLabel').style.display = 'none';
    }
    if (!items.blueprintLockItems) {
        document.querySelector('#lockSectionsLabel').style.display = 'none';
    }
    if (!items.divsToQuestions) {
        document.querySelector('#addDivsToQuestionBankLabel').style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    var buttons = document.querySelectorAll("button");
    var tabId = 0;
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        tabId = tabs[0].id;
    });

    // Adds an event listener for each button in popup.html
    buttons.forEach(b => {
        b.addEventListener("click", () => {
            let buttonAction = b.id;
            // Sends a message with the button's ID to listener.js
            chrome.tabs.sendMessage(tabId, buttonAction, response => {
                console.log(response);
            });
        })
    })
});

