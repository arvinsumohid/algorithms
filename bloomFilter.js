const crypto = require('crypto');

class BloomFilter {
  constructor(size = 100, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bitArray = new Array(size).fill(0);
  }

  // Simple hash function using Node's crypto module
  hash(item, seed) {
    const hash = crypto.createHash('sha256');
    hash.update(seed + item); // change seed to get different hashes
    const hex = hash.digest('hex');
    const int = parseInt(hex.substring(0, 8), 16); // take first 4 bytes
    return int % this.size;
  }

  add(item) {
    console.log(`Adding: ${item}`);
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(item, i);
      console.log(`  Hash ${i}: index ${index}`);
      this.bitArray[index] = 1;
    }
  }

  check(item) {
    console.log(`Checking: ${item}`);
    for (let i = 0; i < this.hashCount; i++) {
      const index = this.hash(item, i);
      console.log(`  Hash ${i}: index ${index}, bit = ${this.bitArray[index]}`);
      if (this.bitArray[index] === 0) return false;
    }
    return true;
  }
}

// Example usage
const bf = new BloomFilter(20, 3);

bf.add('apple');
bf.add('banana');

console.log('Check apple:', bf.check('apple'));     // true
console.log('Check banana:', bf.check('banana'));   // true
console.log('Check grape:', bf.check('grape')); 


/***
 * Note
 * 1. great use for username check
 * 2. it will save in cache for 1M it will only occupy 1.2MB of RAM
 * 3. false positive rate is 1%
 * 4. if bf.check return false you can be sure it is not in the set
 * 5. if bf.check return true it may be in the set or false positive that is why this is the time you need to look on the database
 * 6. use 1000000 and 3 for size and hashCount (it will lead to inefficient memory usage if fewer data is added)
 * 7. https://www.youtube.com/watch?v=_l5Q5kKHtR8
 */