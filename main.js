
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
    submitButton.onclick = function() {
        alert('Input Value: ' + inputField.value);
    };

    // Append the input field and button to the div
    add.appendChild(inputField);
    add.appendChild(submitButton);


    const composer = document.getElementById('composerSearch').value;
    fetch(`http://localhost:3000/api/composer?name=${composer}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Process and display the data on your website
        })
        .catch(error => console.error('Error:', error));


    fetch(`https://cors-anywhere.herokuapp.com/https://api.openopus.org/composer/list/search/${composer}`)
        // `https://api.openopus.org/composer/list/search/${composer}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; // Clear previous results
            data.composers.forEach(composer => {
                const composerInfo = document.createElement('div');
                composerInfo.innerHTML = `<h2>${composer.complete_name}</h2>
                                      <p>Born: ${composer.birth} - Died: ${composer.death}</p>`;
                resultsDiv.appendChild(composerInfo);
            });
        })
        .catch(error => console.error('Error:', error));
}