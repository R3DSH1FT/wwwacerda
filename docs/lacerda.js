class Card {
    constructor(action, mission, travel) {
        this.action = action;
        this.mission = mission;
        this.travel = travel;
    }
}

class State {
    constructor(action, mission, hexTiebreaker, contractTiebreaker, techTiebreaker) {
        this.action = action;
        this.mission = mission;
        this.hexTiebreaker = hexTiebreaker;
        this.contractTiebreaker = contractTiebreaker;
        this.techTiebreaker = techTiebreaker;
        this.primaryTurnorder = null;
        this.secondaryTurnorder = null;
    }
}

class Lacerda {

    constructor() {
        // [action, mission, travel]
        this.cards = [
            new Card(1, 1, true),
            new Card(1, 2, true),
            new Card(1, 2, true),
            new Card(1, 3, true),
            new Card(1, 3, false),
            new Card(2, 1, true),
            new Card(2, 1, false),
            new Card(2, 2, true),
            new Card(2, 3, true),
            new Card(3, 1, true),
            new Card(3, 2, false),
            new Card(3, 3, true)
        ];

        this.shuffledIndexes = [...Array(12).keys()];
        this.shuffle();

        this.currentRound = 0;
        this.currentPhase = null;
        this.history = [];
    }

    randInt(max) {
        return Math.floor(Math.random() * max);
    }

    /*
    * Randomly shuffle an array
    * Original: https://stackoverflow.com/a/2450976/1293256
    */
    shuffle() {
        var currentIndex = this.shuffledIndexes.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = this.shuffledIndexes[currentIndex];
            this.shuffledIndexes[currentIndex] = this.shuffledIndexes[randomIndex];
            this.shuffledIndexes[randomIndex] = temporaryValue;
        }
    };

    draw() {
        if (this.shuffledIndexes.length == 0) {
            this.shuffledIndexes = [...Array(12).keys()];
            this.shuffle();
        }

        var n = this.shuffledIndexes.splice(0, 1)[0];
        var card = this.cards[n];
        var state = new State(
            card.action,
            this.currentRound > this.cards.length ? card.mission : null,
            this.randInt(12),
            this.randInt(6),
            this.randInt(4));

        if (card.travel) {
            var primaryTurnorder = this.randInt(4);
            var tmp = [0, 1, 2, 3];
            tmp.splice(primaryTurnorder, 1)
            var secondaryTurnorder = tmp[this.randInt(3)];

            state.primaryTurnorder = primaryTurnorder;
            state.secondaryTurnorder = secondaryTurnorder;
        }

        this.history.push(state);
    }

    nextState() {
        this.currentRound += 1;
        if (this.history.length < this.currentRound) {
            this.draw();
        }

        return this.history[this.currentRound-1];
    }

    prevState() {
        if (this.currentRound == 1) {
            return null;
        } else {
            this.currentRound -= 1;
            return this.history[this.currentRound-1];
        }
    }
}

lacerda = new Lacerda();
console.debug(lacerda.nextState());
console.debug(lacerda.nextState());
console.debug(lacerda.nextState());

console.debug(lacerda.prevState());
console.debug(lacerda.prevState());
console.debug(lacerda.prevState());
console.debug(lacerda.prevState());

//console.debug(lacerda.nextState());

console.debug("------------------------------");

console.debug(lacerda.history);
console.debug(lacerda.currentRound);

