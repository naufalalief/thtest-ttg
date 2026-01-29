const readline = require("readline");

function findMissingNumber(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return null;
  arr = Array.from(new Set(arr)).sort((a, b) => a - b);
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1] + 1) {
      return arr[i - 1] + 1;
    }
  }
  return null;
}

if (require.main === module) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question(
    "Masukkan array angka (pisahkan dengan koma, contoh: 3,0,2,4): ",
    arrStr => {
      const arr = arrStr.split(",").map(Number);
      const result = findMissingNumber(arr);
      if (result !== null && !isNaN(result)) {
        console.log("Angka yang hilang:", result);
      } else {
        console.log("Input tidak valid atau tidak ada angka hilang.");
      }
      rl.close();
    },
  );
}

module.exports = findMissingNumber;
