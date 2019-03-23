//Array of button ids
// const buttonIds = [];

//function which uses the button tag name to select al buttons on the page and push their ids to the buttonIds array
// const buildButtonArray = () => {
// for (let i= 0; i < 1000; i++) {
// buttonIds.push(document.querySelectorAll('button')[i].id);
// }    
// console.log(buttonIds);
// };

//function which tests for the class of "show", removes it, and replaces it with the class of "hide" on the selected element
const hideForm = () => {
    const sortingFormClasses = document.getElementById('sortingForm').classList;
    console.log(sortingFormClasses);
    sortingFormClasses.toggle('show');
    sortingFormClasses.toggle('hide');

};

const showForm = () => {
    const sortingFormClasses = document.getElementById('sortingForm').classList;
    if (document.getElementById('sortingForm').className === 'hide') {
        sortingFormClasses.add('show');
        sortingFormClasses.remove('hide');
    }
};


const buttonClick = (event) => {
    const buttonId = event.target.id;
    if (buttonId === 'getStartedButton') {
        showForm();
    }
    console.log(buttonId);
};

const buttonListener = () => {
    // buttonIds.forEach((button) => {
    document.getElementById('getStartedButton').addEventListener('click', buttonClick);
    document.getElementById('sortButton').addEventListener('click', buttonClick);

    // })
};

const init = () => {
    buttonListener();
    hideForm();
    // buildButtonArray();
};
init();