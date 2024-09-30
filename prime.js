const checkPrime = (guess) => {
                //0, 1, 2, 3, 4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24
    var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
    let min = 0;
    let max = primes.length - 1;
    while (1 === 1) {
        const middleIndex = Math.floor((max - min) / 2);
        const guessIndex = min + middleIndex;
        if(min < max) {
            console.log(`min: ${min}`, `max: ${max}`);
            if (guess < primes[guessIndex]) {
                max = guessIndex - 1;
            } else if (guess > primes[guessIndex]) {
                min = guessIndex + 1;
            } else if (guess === primes[guessIndex]) {
                return `Number is Prime with a value of ${primes[guessIndex]} in Index ${guessIndex}`;
            }
        } else {
            return `Number ${guess} is not found in the list`;
        }
    }
}

console.log(checkPrime(17));