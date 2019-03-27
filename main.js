//array of objects with information about students
const students = [];
const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const houseCrests = [{
        houseName: 'Gryffindor',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/1/16/Gryffindor_crest.png'
    },
    {
        houseName: 'Hufflepuff',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/5/5e/Hufflepuff_crest.png'
    },
    {
        houseName: 'Ravenclaw',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/4/40/Ravenclaw_Crest_1.png'
    },
    {
        houseName: 'Slytherin',
        imageUrl: 'https://vignette.wikia.nocookie.net/pottermore/images/4/45/Slytherin_Crest.png'
    }
];


//print function which prints the designated variable to the designated element on the page
const printToDom = (divId, textToPrint) => {
    const selectedDiv = document.getElementById(divId);
    selectedDiv.innerHTML = textToPrint;
};

//Function which builds objects to go in the students array
const studentObjectBuilder = (name, house, expButtonId, buttonClass, buttonText) => {
    let expelButtonCounter = 0;
    const student = {
        name: name,
        house: house,
        expeled: false,
        expButtonId: `${expButtonId}${expelButtonCounter}`,
        cardClass: `${house.toLowerCase()}-card`,
        buttonClass: buttonClass,
        buttonText: buttonText,
        houseCrests.forEach((Crest) => {
            if (Crest.houseName === house) {
                imageUrl: Crest.imageUrl;
            };
        }),
    };
    students.push(student);
    expelButtonCounter++;
};

//Random number generator function which generates a random number 0 through the last index of the houses array by checking the house.length property
const randomNumGenerator = () => {
    return Math.floor(Math.random() * houses.length);
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
        domString += `<div class="card">`;
        domString += `<img src="${student.imageUrl}" class="card-img-top" alt="Image of the ${student.house} crest">`;
        domString += `<div class="${student.cardClass} card-body">`;
        domString += `<h5 class="card-title">${student.name}</h5>`;
        domString += `<p class="card-text">House: ${student.house}</p>`;
        domString += `<button type="button" class="${student.buttonClass} btn btn-secondary btn-sm" id='${student.expButtonId}'>${student.buttonText}</button>`;
        domString += `</div>`;
        domString += `</div>`;
        domString += `</div>`;
    })
    domString += `</div>`;
    domString += `</div>`;
    printToDom('studentCardContainer', domString);
};

//function which calls the showForm function 
const getStartedButtonClick = (event) => {
    showForm();
};

/*function which tests to see if the designated input's value is not an empty string. 
If it is not, the function calls the hideForm function and the studentObjectBuilder functions, passing in the values into the studentObjectBuilder function, and calls the clearInput function to empty the input
If it is empty, the function calls the hideForm function only*/
const sortButtonClick = () => {
    if (document.getElementById('studentNameInput').value !== '') {
        const studentName = document.getElementById('studentNameInput').value;
        let studentHouse = houses[randomNumGenerator()];
        hideForm();
        studentObjectBuilder(studentName, studentHouse, 'expelButton', 'expel-button', 'Expel From Hogwarts');
        domStringBuilder(students);
        console.log(students[0].house);
        clearInput('studentNameInput');
    } else {
        hideForm();
    }
};

const expelButtonClick = () => {
    const buttonId = event.target.id;
};

const buttonListener = () => {

    document.getElementById('getStartedButton').addEventListener('click', getStartedButtonClick);
    document.getElementById('sortButton').addEventListener('click', sortButtonClick);
};

const init = () => {


    hideForm();
    studentObjectBuilder('Hagrid', houses[randomNumGenerator()], 'expelButton', 'expel-button', 'Expel From Hogwarts');
    studentObjectBuilder('Ron', houses[randomNumGenerator()], 'expelButton', 'expel-button', 'Expel From Hogwarts');
    studentObjectBuilder('Newt', houses[randomNumGenerator()], 'expelButton', 'expel-button', 'Expel From Hogwarts');
    buttonListener();
    domStringBuilder(students);
};
init();