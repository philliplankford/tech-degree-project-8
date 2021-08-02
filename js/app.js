
// globals 
let employeeNum = 12;
let employees = []; //holds API vals 
const apiUrl = `https://randomuser.me/api/?results=${employeeNum}&inc=name, picture, email, location, phone, dob &noinfo &nat=US`; // the api to connect to + specific filters
// hold DOM elements
const grid = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

const searchBar = document.querySelector('#search-bar');

const modalRight = document.querySelector('#right');
const modalLeft = document.querySelector('#left');


fetch(apiUrl) // fetch handles the xml object
    .then(res => res.json()) // converts the results returned from the api to a json string
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData; 

    let employeeHTML = '';

    employees.forEach((employee, index) => {
        let name = employee.name; 
        let email = employee.email;
        let city = employee.location.city; 
        let picture = employee.picture;

        employeeHTML += `
            <div class='employee-card' data-index='${index}'> 
                <img src='${picture.large}'>
                <div class='employee-info'>
                    <p class='employee-name'>${name.first} ${name.last}</p>
                    <p>${email}</p>
                    <p>${city}</p>
                </div>
            </div>
        `
    })
    grid.innerHTML = employeeHTML;
}

function displayModal(index) {
    //object destructing
    let { name, dob, phone, email, location: { street, city, state, postcode }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img src='${picture.large}'>
        <div class='text-container'> 
            <p>${name.first} ${name.last}</p>
            <p>${email}</p>
            <p>${city}</p>
            <hr />
            <p>${phone}</p>
            <p>${street.number} ${street.name}, ${state} ${postcode}</p>
            <p>${city}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove('hidden');
    modal.innerHTML = modalHTML;
}

grid.addEventListener('click', (e) => {
    if (e.target !== grid) {

        const card = e.target.closest('.employee-card');
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add('hidden');
    modal.innerHTML = '';
})

let modalPlace = 0;

modalRight.addEventListener('click', () => {
    if (modalPlace === employeeNum - 1) { 
        modalPlace = 0;
        displayModal(modalPlace); 
    } 
    else {
        modalPlace++;
        displayModal(modalPlace);
    }
})

modalLeft.addEventListener('click', () => {
    if (modalPlace === 0) { 
        modalPlace = employeeNum - 1;
        displayModal(modalPlace); 
    } 
    else {
        modalPlace--;
        displayModal(modalPlace);
    }
})

searchBar.addEventListener('keyup', () => {
    let allEmployees = document.querySelectorAll('.employee-name');
    let search = searchBar.value.toLowerCase();

    allEmployees.forEach( employeeName => {
        if (employeeName.textContent.toLowerCase().includes(search)) {
            employeeName.parentNode.parentNode.style.display = 'flex';
        } else { employeeName.parentNode.parentNode.style.display = 'none' }
    })
})