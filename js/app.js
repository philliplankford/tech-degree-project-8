
// globals 
const employeeNum = 12; // sets total number of displayed emplyees
let employees = []; // holds API vals 
const apiUrl = `https://randomuser.me/api/?results=${employeeNum}&inc=name, picture, email, location, phone, dob &noinfo &nat=US`; // the api to connect to + specific filters
// hold DOM elements
const grid = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

const searchBar = document.querySelector('#search-bar');

const modalRight = document.querySelector('#right');
const modalLeft = document.querySelector('#left');


fetch(apiUrl) 
    .then(res => res.json()) 
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
    //object deconstruction
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

// modal

let modalPlace = 0;

const modalCheck = document.querySelector('.modal');

modalCheck.addEventListener('click', (e) => {
    const modalMax = employeeNum - 1;
    switch (e.target) {
        case modalRight: 
            if (modalPlace === modalMax) { 
                modalPlace = 0;
            } 
            else {
                modalPlace++;
            }
            displayModal(modalPlace); 
        break;
        case modalLeft: 
            if (modalPlace === 0) { 
                modalPlace = modalMax;
            } 
            else {
                modalPlace--;
            }
            displayModal(modalPlace); 
        break;
        case modalClose: 
            overlay.classList.add('hidden');
            modal.innerHTML = '';
        break;
    }
})

// filter 

searchBar.addEventListener('keyup', () => {
    let allEmployees = document.querySelectorAll('.employee-name');
    let search = searchBar.value.toLowerCase();

    allEmployees.forEach( employeeName => {
        if (!employeeName.textContent.toLowerCase().includes(search)) {
            employeeName.parentNode.parentNode.style.display = 'none';
        } else { employeeName.parentNode.parentNode.style.display = 'flex' }
    })
})