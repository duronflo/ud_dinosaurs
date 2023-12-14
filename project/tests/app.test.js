const { Human, Dinosaurs } = require('../app.js');

describe('Getter function of Dinosaurs', () => {
    const dino = new Dinosaurs("Triceratops", 13000, 114, "herbavor", "North America", "Late Cretaceous", "First discovered in 1889 by Othniel Charles Marsh")

    const human = new Human("Florian", 180, 5, 55.5, "vegetarian");

    test("getWhen()", () => {
        expect(dino.getWhen()).toBe("The Triceratops lived in Late Cretaceous time period.");
    });
    test("getWhere()", () => {
        expect(dino.getWhere()).toBe("The Triceratops lived in North America.");
    });
    test("getFact()", () => {
        expect(dino.getFact()).toBe("First discovered in 1889 by Othniel Charles Marsh");
    });

    test("getCompareWeight() - human heavier than dino", () => {
        human.weight = 13001;
        expect(dino.getCompareWeight(human.weight)).toBe("You are 1 lbs heavier than Triceratops");
    });
    test("getCompareWeight() - human lighter than dino", () => {
        human.weight = 12999;
        expect(dino.getCompareWeight(human.weight)).toBe("You are 1 lbs lighter than Triceratops");
    });
    test("getCompareWeight() - human === dino", () => {
        human.weight = 13000;
        expect(dino.getCompareWeight(human.weight)).toBe("You weight exact the same weight as Triceratops");
    });

    test("getCompareHeight() - human taller than dino", () => {
        human.height = 115;
        expect(dino.getCompareHeight(human.height)).toBe("You are 1 inches taller than Triceratops");
    });
    test("getCompareHeight() - human smaller than dino", () => {
        human.height = 113;
        expect(dino.getCompareHeight(human.height)).toBe("You are 1 inches smaller than Triceratops");
    });
    test("getCompareHeight() - human === dino", () => {
        human.height = 114;
        expect(dino.getCompareHeight(human.height)).toBe("You are exact the same size than Triceratops");
    });

    test("getCompareDiet() - humman === dino", () => {
        human.diet = "herbavor";
        expect(dino.getCompareDiet(human.diet)).toBe("You have the same diet than Triceratops");
    });
    test("getCompareDiet() - human smaller than dino", () => {
        human.diet = "carniator";
        expect(dino.getCompareDiet(human.diet)).toBe("You have different diet than Triceratops");
    });

})
