const form = document.getElementById('dictionary');
const input = document.getElementById('word');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // clear output before displaying again
    message.innerHTML='';

    const word = input.value;
    if (word.trim() == '') {
        message.textContent = 'Type a word to search.';
        return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const entry = data[0];
            const phonetic = entry.phonetic;
            const meaning = entry.meanings[0];
            const partOfSpeech = meaning.partOfSpeech;
            const definition = meaning.definitions[0].definition;

            message.innerHTML+=`<h2>${word.toUpperCase()}</h2>`
            if(entry.phonetic){
                message.innerHTML+=`${entry.phonetic}<br>`
            }else if(entry.phonetics[0].text){
                message.innerHTML+=`${entry.phonetics[0].text}<br>`
            }
            message.innerHTML+=`<h3>Definitions</h3>`
            entry.meanings.forEach(function (meaning) {
                message.innerHTML += `<i>(${meaning.partOfSpeech})</i><br>`;                
                meaning.definitions.forEach(function (define) {
                    message.innerHTML += `<p>${define.definition}</p>`;
                });
                message.innerHTML+=`<br><br>`;
            });

            // clear search bar once content loads
            input.value = '';
        })
        .catch(function (error) {
            // for words that don't exist in the dictionary
            message.textContent = `Word "${word}" not found.`;
        })
})

// clear the page
resetButton.addEventListener('click', () => {
    input.value = '';
    message.textContent = '';
})

