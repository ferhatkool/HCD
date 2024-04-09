# HCD

## CONCEPTEN

## PROTOTYPES

## LOGS
### 09-04-2024
Om te beginnen heb ik het concept uitgewerkt waarvan ik een eerste prototype heb gemaakt. Voor nu bestaat het prototype uit een basic layout met wat opvultekst waarop een eventlistener luistert naar clicks in het opvultekst. De functie die hierbij hoort is het selecteren van tekst op basis van een start en einde click, waardoor gemakkelijk tekst kan worden geselecteerd. 

<img src='./readme-content/picture-1.png'>

De site werkt ook op de mobile view waarbij gebruikt wordt gemaakt van touch clicks en niet muis clicks

<img src='./readme-content/picture-2.png'>

Het script dat hierbij hoort ziet er als volgt uit:

```jsx
// Default value to track if selecting is in progress
let isSelecting = false;
// Variables to store start and end nodes and offsets of selection
let selectionStartNode, selectionEndNode, selectionStartOffset, selectionEndOffset;
// Element representing the section on the page that should be selectable
const sectionToSelect = document.getElementById('test');

// Event listener for click events within the section
sectionToSelect.addEventListener('click', function(event) {
    // Determine the clicked target element
    const target = event.target;
    // Check if the clicked element is a paragraph
    if (target.nodeName === 'P') {
        // Store the clicked paragraph
        const paragraph = target;
        // Retrieve the whole word of the selected position
        const { node: startNode, offset: startOffset } = getWordAtPosition(paragraph, event.clientX, event.clientY);
        // If not in the middle of a selection
        if (!isSelecting) {
            // Store start position and indicate selection start
            selectionStartNode = startNode;
            selectionStartOffset = startOffset;
            isSelecting = true;
            // Log the start position
            console.log('Selection start:', selectionStartOffset);
        // If in the middle of a selection (second click)
        } else {
            // Store end position and indicate selection end
            selectionEndNode = startNode;
            selectionEndOffset = startOffset;
            isSelecting = false;
            // Log the end position
            console.log('Selection end:', selectionEndOffset);
            // If both start and end positions are defined
            if (selectionStartNode && selectionEndNode) {
                // Select the text between start and end positions
                selectText(selectionStartNode, selectionStartOffset, selectionEndNode, selectionEndOffset);
                // Get the selected text as a string and log it
                const selectedText = window.getSelection().toString();
                console.log('Selected text:', selectedText);
            }
        }
    }
});

// Function to retrieve the word at a clicked position within a paragraph
function getWordAtPosition(paragraph, x, y) {
    // Create a range to work with
    const range = document.createRange();
    // Retrieve the text node representing the paragraph content
    let textNode = paragraph.firstChild;
    // Iterate through the paragraph's text nodes
    while (textNode) {
        range.selectNodeContents(textNode);
        // Check if the clicked position is within the current text node
        const rects = range.getClientRects();
        for (let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            if (y >= rect.top && y <= rect.bottom) {
                // Calculate the word boundaries based on click position
                const offset = document.caretRangeFromPoint(x, y).startOffset;
                let wordStart = offset;
                let wordEnd = offset;
                // Move wordStart to the start of the word
                while (wordStart > 0 && /\S/.test(textNode.textContent.charAt(wordStart - 1))) {
                    wordStart--;
                }
                // Move wordEnd to the end of the word
                while (wordEnd < textNode.length && /\S/.test(textNode.textContent.charAt(wordEnd))) {
                    wordEnd++;
                }
                // Return the node and offset representing the clicked word
                return { node: textNode, offset: wordStart };
            }
        }
        // Move to the next text node within the paragraph
        textNode = textNode.nextSibling;
    }

    // If no word found, return the first node and offset
    return { node: paragraph.firstChild, offset: 0 };
}

// Function to select text from start to end position, including the next word
function selectText(startNode, startOffset, endNode, endOffset) {
    const selection = window.getSelection();
    const range = document.createRange();
    
    // Set the start of the range
    range.setStart(startNode, startOffset);
    
    // Calculate the end offset to include the next word
    let nextWordEndOffset = endNode.textContent.indexOf(' ', endOffset);
    if (nextWordEndOffset === -1) {
        nextWordEndOffset = endNode.textContent.length;
    }
    
    // Set the end of the range to include the next word
    range.setEnd(endNode, nextWordEndOffset);

    // Clear existing selection and add the new range
    selection.removeAllRanges();
    selection.addRange(range);
}
```

Het script bestaat uit drie onderdelen; de eventlistener, een functie voor het verkrijgen van een geheel woord op de locatie van een click en het maken van een selectie met een begin en eind locatie. Beide functies worden in de eventlistener uitgevoerd. De eventlistener is luistert naar algemene clicks in het stuk voorbeeld tekst en op basis van een vooraf ingestelde variabele wordt het soort click bepaald. Voor de eerste click is de variabele false, na de eerste click true en na de tweede click weer false. Als er weer een click plaats vind, zal de variabele weer true worden en begint de selectie opnieuw. 

De functie voor het verkrijgen van een geheel woord op de locatie van een click werkt als volgt; 

Eerst wordt de paragraaf van de click verkegen, vanuit waar er door de ‘text nodes’ van de paragraaf wordt gelooped. Per paragraaf is over het algemeen één text node, maar dit kunnen er altijd meer zijn. Er wordt gecontroleerd of de geklikte positie in de huidige text node voorkomt, wat altijd true zal zijn. Vervolgens wordt er gekeken naar de ‘word boundaries’ van de geklikte locatie, wat als het ware het start en eind locatie van het woord verkrijgt. De waardes worden in apart van elkaar in variabelen geplaatst, vanuit waar het gehele woord wordt verkregen. Als er nog een text node is, zal de loop hetzelfde doen voor de volgende text node.

Teruggaand naar de event listener is te zien dat aan de functie dat hierboven omschreven is de waardes ‘startNode’ en ‘startOffset’ worden teruggegeven door de functie, die gebruikt worden om de paragraaf en start locatie op te slaan in een variabele dat in de eventlistener staat, zodat deze verder gebruikt kunnen worden.

De functie voor het selecteren van een begin en eind positie werkt als volgt;

Eerst wordt er een nieuwe document range aangemaakt, waaraan eerst de paragraaf van de 1e click en de start locatie in de paragraaf worden toegevoegd. Vervolgens zal dit ook gebeuren de paragraaf van de 2e click en de eind locatie in de paragraaf. Echter wordt hieraan nog een extra woord toegevoegd, namelijk het woord waarop is geklikt. De functie zal zonder deze toevoeging een selectie maken van het start woord en het woord voor het eind woord, wat niet de bedoeling is. Tenslotte zal de range worden ingesteld en zal dit in de eventlistener gebruikt worden om eenmaal een selectie te maken dat gekopieerd kan worden.