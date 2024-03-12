window.addEventListener("load", function() { //event listener when the window loads
    let form = document.querySelector("form"); //select mission form element DOM
    
    form.addEventListener("submit", function(event) { //event listener for form submission
        event.preventDefault();
        
        //input elements from the form
        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let copilotNameInput = document.querySelector("input[name=copilotName]");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let cargoMassInput = document.querySelector("input[name=cargoMass]");

        //retrieves values
        let pilotName = pilotNameInput.value;
        let copilotName = copilotNameInput.value;
        let fuelLevel = fuelLevelInput.value;
        let cargoMass = cargoMassInput.value;

        let list = document.getElementById("faultyItems"); //faulty item list element

        //validation
        if (validateInput(pilotName) === "Empty" || validateInput(copilotName) === "Empty" || 
            validateInput(fuelLevel) === "Empty" || validateInput(cargoMass) === "Empty") {
            alert("All fields are required!");
            return;
        }

        if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoMass) === "Not a Number") {
            alert("Fuel level and Cargo mass should be numbers!");
            return;
        }

        if (validateInput(pilotName) === "Is a Number" || validateInput(copilotName) === "Is a Number") {
            alert("Pilot and Co-pilot names should be strings!");
            return;
        }

        //if above pass, form submit
        formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass);
    });

    //TASK 3
    let listedPlanets; //holds listedPlanet

    let listedPlanetsResponse = myFetch(); //holds fetched data

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result; //result assigns to listedPlanet
        // console.log(listedPlanets);

    }).then(function () {
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let planet = pickPlanet(listedPlanets);//random select & shows on webpage
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image);
    });
});