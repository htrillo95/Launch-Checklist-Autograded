// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    /*
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: </li>
                     <li>Diameter: </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: </li>
                     <li>Number of Moons: </li>
                 </ol>
                 <img src="">
    */
    // Get the mission target element
    const missionTarget = document.getElementById("missionTarget");

    // Create HTML elements
    const missionTitle = document.createElement("h2");
    const infoList = document.createElement("ol");
    const image = document.createElement("img");

    // Set content for the HTML elements
    missionTitle.textContent = "Mission Destination";
    const infoItems = [
        `Name: ${name}`,
        `Diameter: ${diameter}`,
        `Star: ${star}`,
        `Distance from Earth: ${distance}`,
        `Number of Moons: ${moons}`
    ];

    infoItems.forEach(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        infoList.appendChild(listItem);
    });
    image.setAttribute("src", imageUrl);

    // Append elements to the mission target element
     missionTarget.appendChild(missionTitle);
     missionTarget.appendChild(infoList);
     missionTarget.appendChild(image);
}
 
 function validateInput(formData) { //TASK 2:VALIDATION
    if (typeof formData !== 'string' || formData.trim() === "") { // Check if formData is a string before calling trim()
        return "Empty";
    } else if (isNaN(formData)) {
        return "Not a Number";
    } else {
        return "Is a Number";
    }
}
 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    const pilotValidation = validateInput(pilot);
    const copilotValidation = validateInput(copilot);
    const fuelLevelValidation = validateInput(fuelLevel);
    const cargoMassValidation = validateInput(cargoMass);

    if (pilotValidation === "Empty" || copilotValidation === "Empty" || 
    fuelLevelValidation === "Empty" || cargoMassValidation === "Empty") {
    alert("All fields are required!"); // Notify user if any field is empty
    return;
    }

    // Update pilot and co-pilot status
    document.getElementById("pilotStatus").innerText = `Pilot ${isNaN(parseFloat(pilot)) ? "Not Ready" : "Ready"}: ${pilot}`;
    document.getElementById("copilotStatus").innerText = `Co-pilot ${isNaN(parseFloat(copilot)) ? "Not Ready" : "Ready"}: ${copilot}`;
    
    // Update fuel status
    if (!isNaN(parseFloat(fuelLevel))) {
        if (fuelLevel < 10000) {
            document.getElementById("fuelStatus").innerText = "Fuel level too low for launch";
            document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            list.style.visibility = "visible"; // Make the faulty items list visible
            document.getElementById("faultyItems").style.visibility = "visible";
            return;
        } else {
            document.getElementById("fuelStatus").innerText = "Fuel level high enough for launch";
        }
    } else {
        document.getElementById("fuelStatus").innerText = "Invalid fuel level input";
        document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible"; // Make the faulty items list visible
        document.getElementById("faultyItems").style.visibility = "visible";
        return;
    }

    // Update cargo status
    if (!isNaN(parseFloat(cargoMass))) {
        if (cargoMass > 10000) {
            document.getElementById("cargoStatus").innerText = "Cargo mass too high for launch";
            document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            list.style.visibility = "visible"; // Make the faulty items list visible
            document.getElementById("faultyItems").style.visibility = "visible";
            return;
        } else {
            document.getElementById("cargoStatus").innerText = "Cargo mass low enough for launch";
        }
    } else {
        document.getElementById("cargoStatus").innerText = "Invalid cargo mass input";  
        document.getElementById("launchStatus").innerText = "Shuttle not ready for launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible"; // Make the faulty items list visible
        document.getElementById("faultyItems").style.visibility = "visible";
        return;
    }

    // Update launch status
    // if (!isNaN(parseFloat(pilot)) && !isNaN(parseFloat(copilot)) &&
    //     !isNaN(parseFloat(fuelLevel)) && !isNaN(parseFloat(cargoMass)) &&
    //     parseFloat(fuelLevel) >= 10000 && parseFloat(cargoMass) <= 10000) {
        document.getElementById("launchStatus").innerText = "Shuttle is ready for launch";
        document.getElementById("launchStatus").style.color = "green";
        
    }
 
async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch('https://handlers.education.launchcode.org/static/planets.json').then( function(response) {
        return response.json();
         });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    const randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;