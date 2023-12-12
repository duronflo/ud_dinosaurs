// converted json string to oneline, can be replaced by async json read or http fetch later on
const srcDinoArray = [{ "species": "Triceratops", "weight": 13000, "height": 114, "diet": "herbavor", "where": "North America", "when": "Late Cretaceous", "fact": "First discovered in 1889 by Othniel Charles Marsh" }, { "species": "Tyrannosaurus Rex", "weight": 11905, "height": 144, "diet": "carnivor", "where": "North America", "when": "Late Cretaceous", "fact": "The largest known skull measures in at 5 feet long." }, { "species": "Anklyosaurus", "weight": 10500, "height": 55, "diet": "herbavor", "where": "North America", "when": "Late Cretaceous", "fact": "Anklyosaurus survived for approximately 135 million years." }, { "species": "Brachiosaurus", "weight": 70000, "height": "372", "diet": "herbavor", "where": "North America", "when": "Late Jurasic", "fact": "An asteroid was named 9954 Brachiosaurus in 1991." }, { "species": "Stegosaurus", "weight": 11600, "height": 79, "diet": "herbavor", "where": "North America, Europe, Asia", "when": "Late Jurasic to Early Cretaceous", "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines." }, { "species": "Elasmosaurus", "weight": 16000, "height": 59, "diet": "carnivor", "where": "North America", "when": "Late Cretaceous", "fact": "Elasmosaurus was a marine reptile first discovered in Kansas." }, { "species": "Pteranodon", "weight": 44, "height": 20, "diet": "carnivor", "where": "North America", "when": "Late Cretaceous", "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur." }, { "species": "Pigeon", "weight": 0.5, "height": 9, "diet": "herbavor", "where": "World Wide", "when": "Holocene", "fact": "All birds are living dinosaurs." }];


// Create constructor function of Dinosaurs
function Dinosaurs(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;

    this.getWhere = () => `The ${this.species} lived in ${this.where}.`;
    this.getWhen = () => `The ${this.species} lived in ${this.when} time period.`;
    this.getFact = () => `${this.fact}`;

    this.getCompareHeight = function (height) {
        if (height > this.height) { return `You are ${height - this.height} inches taller than ${this.species}`; }
        else if (height < this.height) { return `You are ${this.height - height} inches smaller than ${this.species}`; }
        else { return `You are exact the same size than ${this.species}`; }
    }

    this.getCompareWeight = function (weight) {
        if (weight > this.weight) { return `You are ${weight - this.weight} lbs heavier than ${this.species}`; }
        else if (weight < this.weight) { return `You are ${this.weight - weight} lbs lighter than ${this.species}`; }
        else { return `You weight exact the same weight as ${this.species}`; }
    }

    this.getCompareDiet = function (diet) {
        if (diet === this.diet) { return `You have the same diet than ${this.species}`; }
        else { return `You have different diet than ${this.species}`; }
    }

    this.getRandomFact = function (human) {

        switch (Math.floor(Math.random() * 6)) {
            case 0:
                return this.getCompareHeight(human.height);
            case 1:
                return this.getCompareWeight(human.weight);
            case 2:
                return this.getCompareDiet(human.diet);
            case 3:
                return this.getWhen();
            case 4:
                return this.getWhere();
            default:
                return this.getFact();
        }
    }
}
// Helper function for creating DinosArray by calling constructor and push object to array.
function createDinosArray(srcDinoArray) {
    const dinosArray = [];
    srcDinoArray.forEach(function (dino) {
        dinosArray.push(new Dinosaurs(
            dino.species,
            dino.weight,
            dino.height,
            dino.diet,
            dino.where,
            dino.when,
            dino.fact
        ))
    });
    return dinosArray;
}


// Create constructor function of human
function Human(name, weight, feet, inches, diet) {
    this.name = name;
    this.weight = weight;
    // do some unit conversion during object creation
    this.height = feet * 12 + inches; // feet -> inches
    this.diet = diet;
}

// Use IIFE to get human data from form. IIFE register event listener in private scope.
(function () {
    // due to IIFE the read user values from are; private (only readable in return call). 
    const name = document.getElementById("name");
    const feet = document.getElementById("feet");
    const inches = document.getElementById("inches");
    const weight = document.getElementById("weight");
    const diet = document.getElementById("diet");
    // get button by id within DOM
    const compareButton = document.getElementById("btn");
    if (compareButton) {
        // On button click, prepare and display infographic
        compareButton.addEventListener("click", function () {
            // create array of creatures
            const Dinos = createDinosArray(srcDinoArray);
            // Instance of human object
            const human = new Human(name.value, Number(weight.value), Number(feet.value), Number(inches.value), diet.value);

            // add human to dinoArray on correct position; e.g. 4 corresponds to the 5th position of 1-dim-array with 9 elements (3x3 tiles)
            Dinos.splice(4, 0, human);
            // draw tiles
            generateTiles(Dinos);
            // remove form
            removeFormFromScreen();
        })
    }

})();


// Generate Tiles for each Dino in Array
function generateTiles(dinoArray) {
    // get grid in order to have entry point to DOM ...
    const grid = document.getElementById("grid");

    const human = dinoArray[4];

    // draw each tilt - attention: distinguish between human, dinosaur and pigeon!
    dinoArray.forEach(function (element) {

        const gridItem = document.createElement("div")
        gridItem.classList.add("grid-item");

        if (element instanceof Dinosaurs) {
            // name = species name
            const name = document.createElement('h3');
            name.textContent = element.species;
            gridItem.appendChild(name);
            const image = document.createElement('img');
            image.src = "images/" + element.species.toLowerCase() + ".png";
            gridItem.appendChild(image);
            const fact = document.createElement('p');
            if (element.species === 'Pigeon') {
                fact.textContent = "All birds are dinosaurs."
            }
            else {
                fact.textContent = element.getRandomFact(human)
            }
            gridItem.appendChild(fact);
        }
        else if (element instanceof Human) {
            const name = document.createElement('h3');
            name.textContent = element.name;
            gridItem.appendChild(name);
            const image = document.createElement('img');
            image.src = "images/human.png";
            gridItem.appendChild(image);
        }
        // add tile to DOM with classname "grid-item"
        grid.appendChild(gridItem);

    })


}

// Remove form from screen
function removeFormFromScreen() {
    document.getElementById("dino-compare").style.display = "none";
}



module.exports = {
    Dinosaurs,
    Human,

}
