const form=document.getElementById('dictionary');
const input=document.getElementById('word');
const message=document.getElementById('message');
const resetButton=document.getElementById('reset-btn');


form.addEventListener('submit',function(event){
    event.preventDefault();
    const word=input.value;
    if(word.trim()==''){
        message.textContent='Type a word to search.';
        userDetails.innerHTML='';
        return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(function (response) {
        return response.json();
    })
    .then(function(data){
            const entry = data[0];
            const firstMeaning = entry.meanings[0];
            const partOfSpeech = firstMeaning.partOfSpeech;
            const definition = firstMeaning.definitions[0].definition;

            message.innerHTML = `Word: ${entry.word}<br>
            Part of Speech: ${partOfSpeech}<br>
            Definition: ${definition}<br>
            Origin: ${entry.license.name}`;
        })
        .catch(function(error) {
            // ✅ Handle words that don't exist in the dictionary
            message.textContent = `Word "${word}" not found.`;
    })
})

resetButton.addEventListener('click',()=>{
    input.value='';
    message.textContent='';
})