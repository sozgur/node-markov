const { MarkovMachine } = require("./markov");

describe("Test markov machine", () => {
    let mm;

    beforeAll(() => {
        mm = new MarkovMachine("the cat in the hat");
    });

    test("Make chains", () => {
        expect(mm.makeChains()).toHaveProperty("cat");
        expect(mm.makeChains()).toHaveProperty("hat");
        expect(mm.makeChains()["cat"]).toContain("in");
        expect(mm.makeChains()["the"]).toContain("cat");
    });

    test("Get word from array", () => {
        expect(MarkovMachine.getWord(["a", "b"])).toEqual(expect.any(String));
        expect(["a", "b"]).toContain(MarkovMachine.getWord(["a", "b"]));
    });

    test("Creare markov text", () => {
        expect(mm.makeText(0)).toMatch("");
        expect(mm.makeText().endsWith("hat")).toBe(true);
    });
});
