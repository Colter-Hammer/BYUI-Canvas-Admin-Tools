// let breadcrumb = document.querySelector(`#crumb_course_${courseID}`);

// breadcrumb.innerHTML += " (1, 3)";

// Get the sections of current course
function getData(courseID) {
    return new Promise((resolve, reject) => {
        // let courseID = document.location.href.split("/")[4];
        function receive() {
            var data = JSON.parse(this.responseText.replace('while(1);', ''));
            resolve(data);
        };

        function onError() {
            reject(new Error(`Failure to retrieve data for course 1902`));
        };

        var request = new XMLHttpRequest();
        request.addEventListener('load', receive);
        request.addEventListener('error', onError);
        request.open('GET', `https://byui.instructure.com/api/v1/courses/${courseID}/sections`);
        request.send();
    });
}


function createSectionNumbers(sections) {
    console.log('SECTION', sections);
    var sectionNumbers = sections.map(section => {
        var colorClass = section.nonxlist_course_id !== null ? 'color:#42aaf4' : '';
        var sectionName = section.name.replace(/section/i, '').replace(/\s*/, '');
        // Reference courses to REF
        sectionName = sectionName.includes('Reference') ? 'REF' : sectionName;
        // Course Council View courses to CCV
        sectionName = sectionName.includes('Course Council View') ? 'CCV' : sectionName;
        // Blueprint courses to BP
        sectionName = sectionName.includes('Blueprint') ? 'BP' : sectionName;
        // Long section names to just 3 letters with ...
        sectionName = sectionName.length > 5 ? sectionName.substring(0, 5) + '...' : sectionName;
        // Pad single numbers with a 0
        if (sectionName.length === 1) {
            sectionName = '0' + sectionName;
        }
        return `<span style="${colorClass}">${sectionName}</span>`;
    }).join(', ');
    return `(${sectionNumbers})`;
}


function main() {

    let courseID = document.location.href.split("/")[4];
    let div = document.querySelector(`#breadcrumbs a[href*='/courses/${courseID}']`);
    console.log(div);

    getData(courseID)
        .then(createSectionNumbers)
        .then(sectionNumbers => {
            console.log(sectionNumbers);
            if(sectionNumbers !== '()'){
            div.innerHTML += " " + sectionNumbers;
        }
        })

        .catch(console.error);
    
}

main()