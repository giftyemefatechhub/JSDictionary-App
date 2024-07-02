
/* const wordArray = [
    "Apple",   
    "Banana",  
    "Cherry",  
    "Date",    
    "Elderberry", 
    "Fig",     
    "Grape",   
    "Honeydew",
    "Iceberg", 
    "Jackfruit",
    "Kiwi",    
    "Lemon",   
    "Mango",   
    "Nectarine", 
    "Orange",  
    "Papaya",  
    "Quince",  
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Ugli",   
    "Vanilla", 
    "Watermelon",
    "Xigua",   
    "Yam",     
    "Zucchini"
]

function searchWord(event){
    event.preventDefault();
    const input = document.getElementsByClassName('search-bar')[0].value;
    const meaning = document.getElementsByClassName('meaning')[0];

    let found = false;
    for(let i = 0; i < wordArray.length; i++){
        if(wordArray[i].toLowerCase() === input.toLowerCase()){
            meaning.innerHTML = `The word ${input} has been found`;
            found = true;
            break;
        }
    }
    if (!found) {
        meaning.innerHTML = 'The word you are looking for is not found';
    }
   
    document.getElementsByClassName('search-bar')[0].value = '';
};
*/

async function searchWord(event) {
    event.preventDefault(); // Prevent form submission
    const inputElement = document.getElementsByClassName('search-bar')[0];
    const input = inputElement.value;
    const meaningElement = document.getElementsByClassName('meaning')[0];

    try {
        // Fetch the word definition from the API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Check if data is available and contains meanings
        if (data.length > 0 && data[0].meanings) {
            const wordData = data[0];
            let meaningsHTML = `<h2>${wordData.word}</h2>`;
            
            // Loop through each meaning
            wordData.meanings.forEach(meaningEntry => {
                meaningsHTML += `<h3>${meaningEntry.partOfSpeech}</h3>`;
                meaningEntry.definitions.forEach(definitionEntry => {
                    meaningsHTML += `<p><strong>Definition:</strong> ${definitionEntry.definition}</p>`;
                    if (definitionEntry.example) {
                        meaningsHTML += `<p><strong>Example:</strong> ${definitionEntry.example}</p>`;
                    }
                });
            });

            // Update the meaning element with the formatted HTML
            meaningElement.innerHTML = meaningsHTML;
        } else {
            meaningElement.innerHTML = 'The word you are looking for is not found';
        }
    } catch (error) {
        meaningElement.innerHTML = 'There was an error fetching the data';
        console.error('Error fetching data:', error);
    }

    // Clear the input field
    inputElement.value = '';
}
