const readline = require("readline");

function findFormula(nums, target) {
  // Helper: generate all permutations
  function permute(arr) {
    if (arr.length === 1) return [arr];
    let out = [];
    for (let i = 0; i < arr.length; i++) {
      let rest = arr.slice(0, i).concat(arr.slice(i + 1));
      for (let p of permute(rest)) {
        out.push([arr[i]].concat(p));
      }
    }
    return out;
  }

  // Helper: generate all possible expressions from array
  function buildExpr(arr) {
    if (arr.length === 1) return [arr[0].toString()];
    let res = [];
    for (let i = 1; i < arr.length; i++) {
      let lefts = buildExpr(arr.slice(0, i));
      let rights = buildExpr(arr.slice(i));
      for (let l of lefts) {
        for (let r of rights) {
          res.push(`(${l}+${r})`);
          res.push(`(${l}-${r})`);
          res.push(`(${l}*${r})`);
        }
      }
    }
    return res;
  }

  const perms = permute(nums);
  const seen = new Set();
  for (let p of perms) {
    for (let expr of buildExpr(p)) {
      if (seen.has(expr)) continue;
      seen.add(expr);
      try {
        if (Math.abs(eval(expr) - target) < 1e-9) {
          let clean = expr.replace(/\((\d+)\)/g, "$1").replace(/\s+/g, "");
          return clean;
        }
      } catch {}
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
    "Masukkan array angka (pisahkan dengan koma, contoh: 1,4,5,6): ",
    arrStr => {
      rl.question("Masukkan target: ", targetStr => {
        const nums = arrStr.split(",").map(Number);
        const target = Number(targetStr);
        const result = findFormula(nums, target);
        if (result) {
          let hasil;
          try {
            hasil = eval(result);
          } catch {
            hasil = "(error evaluasi)";
          }
          console.log("Output:", result);
          console.log("Hasil:", hasil);
          console.log("Target:", target);
        } else {
          console.log("Tidak ditemukan formula yang cocok.");
        }
        rl.close();
      });
    },
  );
}
