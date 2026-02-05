const readline = require("readline");

function findMissingNumber(arr) {
  if (!Array.isArray(arr) || arr.length < 2) return [];
  arr = Array.from(new Set(arr)).sort((a, b) => a - b);
  const missing = [];
  for (let i = arr[0]; i < arr[arr.length - 1]; i++) {
    if (!arr.includes(i)) {
      missing.push(i);
    }
  }
  return missing;
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
      if (Array.isArray(result) && result.length > 0) {
        console.log("Angka yang hilang:", result);
      } else {
        console.log("Input tidak valid atau tidak ada angka hilang.");
      }
      rl.close();
    },
  );
}

module.exports = findMissingNumber;
