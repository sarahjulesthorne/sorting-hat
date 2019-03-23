
//array of objects with information about students
const students = [];
const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

//print function which prints the designated variable to the designated element on the page
const printToDom = (divId, textToPrint) => {
const selectedDiv = document.getElementById(divId);
selectedDiv.innerHTML = textToPrint;
};

//Function which builds objects to go in the students array
const studentObjectBuilder = (name, house, expButtonId, cardClass, buttonClass) => {
let expelButtonCounter = 0;
const student = {
name: name,
house: house,
expeled: false,
expButtonId: `${expButtonId}${expelButtonCounter}`,
cardClass: cardClass,
buttonClass: buttonClass
}
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
    const studentHouse = houses[randomNumGenerator()];
    const studentCardClass = `${studentHouse.toLowerCase}-card`;
    hideForm();
        studentObjectBuilder(studentName, studentHouse, 'expelButton', studentCardClass, 'expel-button');
        console.log(students[0].house);
        clearInput('studentNameInput');
    }
    else {
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
    buttonListener();
    hideForm();
    buttonListener();
};
init();