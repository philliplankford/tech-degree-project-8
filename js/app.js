
// globals 
let employees = []; //holds API vals 
const apiUrl = `https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob &noinfo &nat=US`; // the api to connect to + specific filters
// hold DOM elements
const grid = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');


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
            <div class='employee-card'> 
                <img src='${picture.large}'>
                <div class='employee-info'>
                    <p>${name.first} ${name.last}</p>
                    <p>${email}</p>
                    <p>${city}</p>
                </div>
            </div>
        `
    })
    grid.innerHTML = employeeHTML;
}
