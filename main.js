
window.onload = () => {


}

const buttonClick = () => {
    const del = document.getElementById("addHere");
    del.innerHTML = '';
    if(document.getElementById('searchComposer').checked) {
        searchComposer();
    }else if(document.getElementById('randomizer').checked) {
        // randomizer button is checked

    }else if(document.getElementById('era').checked) {
        // era button is checked

    }else if(document.getElementById('ensemble').checked) {
        // ensemble radio button is checked

    }
}

const displayTable = () => {
    // create a table of all composers in the data.json file
    // columns: full name, birthdate, era,
    // rows: each composer
    fetch('portraits.json')
        .then(response => response.json())
        // .then(data => {
//             // console.log(data.complete_name);
//             data.composers.forEach(composer => {
//                 console.log(composer.complete_name);
//             });
        .then(data => {
            const composers = data.composers;
            const add = document.getElementById('addHere');
            add.innerHTML = ''; // Clear previous content

            // Create table
            const table = document.createElement('table');
            table.setAttribute("class", "table table-striped")
            const headerRow = document.createElement('tr');

            // Create table headers
            const headers = ['Full Name', 'Birthdate', 'Era'];
            headers.forEach(headerText => {
                const header = document.createElement('th');
                header.textContent = headerText;
                headerRow.appendChild(header);
            });
            table.appendChild(headerRow);

            // Populate table rows
            composers.forEach(composer => {
                const row = document.createElement('tr');

                const fullNameCell = document.createElement('td');
                fullNameCell.textContent = composer.complete_name;
                row.appendChild(fullNameCell);

                const birthdateCell = document.createElement('td');
                birthdateCell.textContent = composer.birth;
                row.appendChild(birthdateCell);

                const eraCell = document.createElement('td');
                eraCell.textContent = composer.epoch;
                row.appendChild(eraCell);

                table.appendChild(row);
            });

            // Append table to the div
            add.appendChild(table);

            //if they click on a row of the table, display all the information about that composer above the table
            table.onclick = function(event) {
                //inlude the composers portrait, taken from the portraits.json file

                const composerName = event.target.parentElement.cells[0].textContent;
                const composer = composers.find(c => c.complete_name === composerName);
                const composerInfo = document.createElement('div');
                composerInfo.innerHTML = `<h2>${composer.complete_name}</h2>
                                  <p>Born: ${composer.birth} - Died: ${composer.death}</p>
                                  <p>Era: ${composer.epoch}</p>
                                  <p>Country: ${composer.country}</p>
                                  <img src="${composer.portrait}" alt="Composer" />
                                  <p>Biography: ${composer.biography}</p>`;
                add.insertBefore(composerInfo, table);
            };

        })
        .catch(error => console.error('Error:', error));
};


    // fetch('dataOrig.json')
//         .then(response => response.json())
//         .then(data => {
//             // console.log(data.complete_name);
//             data.composers.forEach(composer => {
//                 console.log(composer.complete_name);
//             });
//             // Append table to the div
//             // add.appendChild(table);
//         })
//
//         .catch(error => console.error('Error:', error));
// }


function searchComposer() {
    const add = document.getElementById('addHere');
    // Create a new input field
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.placeholder = 'Enter text here';
    inputField.id = 'dynamicInput';

    // Create a submit button
    const submitButton = document.createElement('button');
    submitButton.setAttribute('id', 'composerSearch');
    submitButton.textContent = 'Submit';
    // submitButton.onclick = function() {
    //     alert('Input Value: ' + inputField.value);
    // };
    submitButton.onclick = function() {
        const composerName = inputField.value;
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const composer = data.composers.find(c => c.name === composerName);
                if (composer) {
                    alert(`Full Name: ${composer.full_name}, Birthdate: ${composer.birthdate}`);
                } else {
                    alert('Composer not found');
                }
            })
            .catch(error => console.error('Error:', error));
    };

    // Append the input field and button to the div
    add.appendChild(inputField);
    add.appendChild(submitButton);


    const composer = document.getElementById('composerSearch').value;
    // display the full name of the composer and the birthdate from the data.json file







    // fetch(`http://localhost:3000/api/composer?name=${composer}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data);
    //         // Process and display the data on your website
    //     })
    //     .catch(error => console.error('Error:', error));


    // fetch(`https://cors-anywhere.herokuapp.com/https://api.openopus.org/composer/list/search/${composer}`)
    //     // `https://api.openopus.org/composer/list/search/${composer}`)
    //     .then(response => response.json())
    //     .then(data => {
    //         const resultsDiv = document.getElementById('results');
    //         resultsDiv.innerHTML = ''; // Clear previous results
    //         data.composers.forEach(composer => {
    //             const composerInfo = document.createElement('div');
    //             composerInfo.innerHTML = `<h2>${composer.complete_name}</h2>
    //                                   <p>Born: ${composer.birth} - Died: ${composer.death}</p>`;
    //             resultsDiv.appendChild(composerInfo);
    //         });
    //     })
    //     .catch(error => console.error('Error:', error));
}