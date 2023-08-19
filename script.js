let favColour;

function getInput(message) {
    const input = prompt(message).trim();
    if (!input) {
        getInput(message);
        return;
    }
    alert(input.length <= 10 ? input.toLowerCase() : input.toUpperCase());
}

getInput("Enter something");
