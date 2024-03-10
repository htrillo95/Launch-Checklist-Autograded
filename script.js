// Write your JavaScript code here!

const { myFetch, pickPlanet, addDestinationInfo, formSubmission } = require("./scriptHelper");

if (typeof window !== 'undefined') {

window.addEventListener("load", function() {

    document.getElementById("launchForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const pilot = document.querySelector("input[name='pilotName']").value;
        const copilot = document.querySelector("input[name='copilotName']").value;
        const fuelLevel = document.querySelector("input[name='fuelLevel']").value;
        const cargoMass = document.querySelector("input[name='cargoMass']").value;

        // Call formSubmission function
        formSubmission(document, pilot, copilot, fuelLevel, cargoMass);
    });

    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()

    let listedPlanetsResponse = myFetch('https://handlers.education.launchcode.org/static/planets.json'); // Call myFetch to fetch the planetary data

    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);

    }).then(function () {
        console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        const selectedPlanet = pickPlanet(listedPlanets); // Pick a random planet from the fetched data
        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star, selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image); // Display the selected planet's information
    })
    
 });

}