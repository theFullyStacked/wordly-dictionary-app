const form = document.getElementById('dictionary');
const input = document.getElementById('word');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');
const sec1 = document.getElementById('sec1');
const audio = document.createElement("audio");
const sound = document.createElement("button");

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // clear previous output before displaying again
    message.textContent = '';
    audio.remove();
    sound.remove();
    
    const word = input.value;
    if (word.trim() == '') {
        message.textContent = 'Type a word to search.';
        input.value = '';
        return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const entry = data[0];
            const meaning = entry.meanings[0];
            const partOfSpeech = meaning.partOfSpeech;
            const definition = meaning.definitions[0].definition;

            // display
            message.innerHTML+=`<h2>${word.toUpperCase()}</h2>`;
            if(entry.phonetic){
                message.innerHTML+=`<b>${entry.phonetic}</b><br><br>`;
            }else if(entry.phonetics[0].text){
                message.innerHTML+=`<b>${entry.phonetics[0].text}</b><br><br>`;
            }
            if(entry.phonetics[0].audio){
                audio.src=  `${entry.phonetics[0].audio}`;
                sound.textContent='Pronunciation';
                sound.addEventListener('click',()=>{
                    audio.play();
                })
                sec1.append(audio,sound);
            }
            entry.meanings.forEach(function (meaning) {
                message.innerHTML += `<b><i>(${meaning.partOfSpeech})</i></b><br><br>`;                
                meaning.definitions.forEach(function (define) {
                    message.innerHTML += `${define.definition}<br>`;
                    if(define.synonyms.length>0){
                        message.innerHTML+=`<b>Synonyms: </b>${define.synonyms}<br>`;
                    }
                    if(define.antonyms.length>0){
                        message.innerHTML+=`<b>Antonyms: </b>${define.antonyms}<br>`;
                    }
                    message.innerHTML+=`<br>`;
                });
                message.innerHTML+=`<br><br>`;
            });

            // clear search bar once content loads
            input.value = '';
        })
        .catch(function (error) {
            // for words that don't exist in the dictionary
            message.textContent = `Word "${word}" not found.`;
            input.value = '';
        })
})

// clear the page
resetButton.addEventListener('click', () => {
    input.value = '';
    message.textContent = '';
    audio.remove();
    sound.remove();
})