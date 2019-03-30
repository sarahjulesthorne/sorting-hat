/*Project */

//arrays, one of objects with info about students, one with info about houseCrest images
const students = [];
const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const houseCrests = [{
        houseName: 'Gryffindor',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/1/16/Gryffindor_crest.png',
        altText: 'the Gryffindor crest--a gold lion on a red background raising her paw'
    },
    {
        houseName: 'Hufflepuff',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/5/5e/Hufflepuff_crest.png',
        altText: 'the Hufflepuff crest--a black and white badger on a yellow background, looking over their shoulder'
    },
    {
        houseName: 'Ravenclaw',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/4/40/Ravenclaw_Crest_1.png',
        altText: 'the Ravenclaw crest--a coppery metalic raven on a blue background with their wings raised in a U-shape'
    },
    {
        houseName: 'Slytherin',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/4/45/Slytherin_Crest.png',
altText: 'the Slytherin crest--a silvery grey snake on a green textured background with faer body in the shape of a backwards letter S'
    }
];
let expelButtonCounter = 0;

//print function which prints the designated variable to the designated element on the page
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

//Random number generator function which generates a random number 0 through the last index of the houses array by checking the house.length property
const randomNumGenerator = () => {
    return Math.floor(Math.random() * houses.length);
};

//Function which builds objects to go in the students array
const studentObjectBuilder = (name, house, expButtonId, buttonClass, buttonText) => {

    const student = {
        name: name,
        house: house,
        expeled: false,
        expButtonId: `${expButtonId}${expelButtonCounter}`,
        cardClass: `${house.toLowerCase()}-card`,
        buttonClass: buttonClass,
        buttonText: buttonText,
        imageUrl: houseCrests.filter(h => h.houseName === house)[0].imageUrl,
        imageAltText: houseCrests.filter(h => h.houseName === house)[0].altText
    };
    students.push(student);
    expelButtonCounter++;
};


//function which tests for the class of "show", removes it, and replaces it with the class of "hide" on the selected element
const hideForm = () => {
    const sortingFormClasses = document.getElementById('sortingForm').classList;
    sortingFormClasses.toggle('show');
    sortingFormClasses.toggle('hide');
};

//function which tests to see if the class is .hide and, if true, removes the .hide class and adds the .show class to the sortingForm element
const showForm = () => {
    const sortingFormClasses = document.getElementById('sortingForm').classList;
    if (document.getElementById('sortingForm').className === 'hide') {
        sortingFormClasses.add('show');
        sortingFormClasses.remove('hide');
    }
};

//function which clears the value  of the designated element
const clearInput = (inputId) => {
    const selectedInput = document.getElementById(inputId);
    selectedInput.value = '';
};

//function which uses a domString variable and a forEach loop to build up an HTML string which the function then passes into the printToDom function, which it calls
const domStringBuilder = (arr) => {
    let domString = '';
    domString += `<div class='container'>`;
    domString += `<div class='row'>`;

    arr.forEach((student) => {
        domString += `<div class='col-sm-12 col-md-6 col-lg-4'>`;
        domString += `<div class="card ${student.cardClass}">`;
        domString += `<img src="${student.imageUrl}" class="card-img-top" alt="Image of ${student.imageAltText}">`;
        domString += `<div class="${student.cardClass} card-body">`;
        domString += `<h5 class="card-title">${student.name}</h5>`;
        domString += `<p class="card-text">House: ${student.house}</p>`;
        domString += `<button type="button" class="btn btn-secondary btn-sm ${student.buttonClass}" id='${student.expButtonId}'>${student.buttonText}</button>`;
        domString += `</div>`;
        domString += `</div>`;
        domString += `</div>`;
            })
    domString += `</div>`;
    domString += `</div>`;
    printToDom('studentCardContainer', domString);;
};

//function which calls the showForm function 
const getStartedButtonClick = (event) => {
    event.preventDefault;
    showForm();
};

/*function which tests to see if the designated input's value is not an empty string. 
If it is not, the function calls the hideForm function and the studentObjectBuilder functions, passing in the values into the studentObjectBuilder function, and calls the clearInput function to empty the input
If it is empty, the function calls the hideForm function only*/
const sortButtonClick = () => {
    event.preventDefault;
    if (document.getElementById('studentNameInput').value !== '') {
        const studentName = document.getElementById('studentNameInput').value;
        hideForm();
        studentObjectBuilder(studentName, houses[randomNumGenerator()], 'expelButton', 'expel-button', 'Expel From Hogwarts');
        domStringBuilder(students);
        expelButtonListener();
        clearInput('studentNameInput');
    } else {
        hideForm();
    }
};

//function which uses a forEach loop and a conditional statement to test whether the event target's id matches any of the expel buttons' ids. 
//If it does, the loop removes that button's object from the students array using the splice method.
//function then calls the domStringBuilder function
const expelButtonClick = (event) => {
    event.preventDefault;
    const buttonId = event.target.id;
    students.forEach((student, index) => {
        if (student.expButtonId === buttonId) {
            students.splice(index, 1);
        }
    })
    domStringBuilder(students);
    expelButtonListener();
};

//event listenr function which forms an array of buttons based on their className and loops through those buttons to attach event-listeners to each of them
//function calls the expelButtonClick function on click event
const expelButtonListener = () => {
    const expelButtons = document.getElementsByClassName('expel-button');
    for (let i = 0; i < expelButtons.length; i++) {
        expelButtons[i].addEventListener('click', expelButtonClick);
    }
};

//function which attaches event listeners to Let's Get Started and Sort buttons

const buttonListener = (event) => {
    document.getElementById('getStartedButton').addEventListener('click', getStartedButtonClick);
    document.getElementById('sortButton').addEventListener('click', sortButtonClick);
};

//function which calls three functions, the studentobjectBuilder, to build stock students' objects on page load
//The domStringBuilder to print stock cards on pageload
//The expelButtonListener, to activate expel button events
const stockStudentFunction = (studentName, studentHouse, expelButtonId, StockbuttonClass, stockButtonText) => {
    studentObjectBuilder(studentName, studentHouse, expelButtonId, StockbuttonClass, stockButtonText);
    domStringBuilder(students);
    expelButtonListener();
};


const init = () => {
    hideForm();
    stockStudentFunction('Hagrid', houses[randomNumGenerator()], 'expelButton', 'expel-button', 'Expel From Hogwarts');
    stockStudentFunction('Ron', houses[randomNumGenerator()], 'expelButton', 'expel-button', 'Expel From Hogwarts');
    stockStudentFunction('Newt', houses[randomNumGenerator()], 'expelButton', 'expel-button', 'Expel From Hogwarts');
    buttonListener();
};
init();