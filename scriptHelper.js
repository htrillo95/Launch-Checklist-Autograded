require('cross-fetch/polyfill'); //starter

// Function to add destination info to the webpage
function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    // Update HTML content with mission destination information
    missionTarget.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${name}</li>
            <li>Diameter: ${diameter}</li>
            <li>Star: ${star}</li>
            <li>Distance from Earth: ${distance}</li>
            <li>Number of Moons: ${moons}</li>
        </ol>
        <img src="${imageUrl}">
    `;
}

// Validation
function validateInput(testInput) {
    if (testInput.trim() === "") {
        return "Empty";
    } else if (isNaN(Number(testInput))) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    list.style.visibility = "visible";

    // Update pilot and copilot status
    document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`;
    document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready for launch`;

    // Select elements for displaying launch and status information
    let launchStatus = document.getElementById("launchStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");

    // Check fuel level for launch readiness
    if (fuelLevel < 10000) {
        fuelStatus.textContent = "Fuel level too low for launch";
        launchStatus.textContent = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        fuelStatus.textContent = "Fuel level high enough for launch";
    }

    // Check cargo mass for launch readiness
    if (cargoLevel > 10000) {
        cargoStatus.textContent = "Cargo mass too heavy for launch";
        launchStatus.textContent = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        cargoStatus.textContent = "Cargo mass low enough for launch";
    }

    // If both fuel and cargo are within limits, shuttle ready
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        launchStatus.textContent = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    }
}


async function myFetch() { //fetches planet data from api
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
        .then(function (response) {
            return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) { //picks random planet
    let index = Math.floor(Math.random() * planets.length);
    return planets[index];
}

// Export functions to access in other modules
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;