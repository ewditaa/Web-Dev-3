const crypto = require("crypto");

function rollDice() {
    return crypto.randomInt(1, 7);
}

console.log("Rolling the dice...");

for (let i = 1; i <= 5; i++) {
    const result = rollDice();
    console.log(`Roll ${i}: Dice Rolled: ${result}`);
}