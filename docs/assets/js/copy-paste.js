// function to write the currently selected text to the users clipboard.
function copySelection() {
    // console.log(selectedTextVar)
    // var copySelection = document.execCommand('copy')
    // if (copySelection) {
    //     console.log(copySelection)
    // } else {
    //     console.log('Failed to copy text.')
    // }

    navigator.clipboard.writeText(selectedTextVar).then(function() {
        console.log('Copy was succesful!')
    }, function(err) {
        console.error('An error has occured: ' + err)
    })
}

// function to paste the first item of the users clipboard to the page
function pasteSelection() {
    navigator.clipboard.readText().then(text => {
        // retrieve the placeholder for the text and place the item of the clipboard on the placeholder.
        const paragraph = document.getElementById('pastedText')
        if (paragraph.tagName == 'P') {
            paragraph.innerHTML = text
        } else if (paragraph.tagName == 'INPUT') {
            paragraph.value = text;
        } else if (paragraph.tagName == 'TEXTAREA') {
            paragraph.innerHTML = text;
            paragraph.style.display = 'block'
        }
        //document.getElementById('pastedText').innerHTML = text;
        // add a black border to the placeholder
        document.getElementById('pastedText').style.border = '1px solid black';
        document.getElementById('pastedText').style.backgroundColor = 'burlywood'

        console.log('Text pasted.');
      })
      .catch(() => {
        console.log('Failed to read from clipboard.');
      });
}