// Fisher-Yates Shuffle Algorithm
export const fisherYatesShuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// Get a random element from an array
export const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate array of numbers 1-10 in random order
export const generateRandomNumbers = () => {
  return fisherYatesShuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
};
