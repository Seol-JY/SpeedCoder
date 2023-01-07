/**
 * @deprecated localStore should not be used
 */
// module.exports = {
//   insertDummy: () => {
//     let i;
//     for (i = 0; i < 30; i++) {
//       const result = {
//         file: "dummy",
//         cpm: Math.floor(Math.random() * (1100 - 10)) + 10,
//         name: "dummy name" + i,
//         message: "dummy data" + i,
//         correctChr: 1,
//         wrongChr: 1,
//       };
//       console.log(result);
//       const storage = JSON.parse(localStorage.getItem("rankStore")) || []; //for test
//       storage.push(result);
//       localStorage.setItem("rankStore", JSON.stringify(storage));
//     }
//   },

//   selectData: (page) => {
//     let storage = JSON.parse(localStorage.getItem("rankStore")) || []; //for test
//     storage.sort(function (a, b) {
//       return b.cpm - a.cpm;
//     });

//     let rank = 1;
//     let idx = 100000;
//     for (let i = 0; i < storage.length; i++) {
//       if (i > 0 && storage[i].cpm < storage[i - 1].cpm) {
//         rank++;
//       }
//       storage[i].rank = rank;
//       storage[i].idxx = idx++;
//     }
//     const start = (page - 2) * 30 > 0 ? (page - 2) * 30 : 0;
//     const end =
//       (page + 1) * 30 + 1 <= storage.length - 1
//         ? (page + 1) * 30
//         : storage.length - 1;
//     console.log("start" + start + "end" + end);
//     return storage.slice(start, end);
//   },

//   insertData: (file, cpm, name, message, correctChr, wrongChr) => {
//     if (name.length && message.length) {
//       const result = {
//         file: file,
//         cpm: cpm,
//         name: name,
//         message: message,
//         correctChr: correctChr,
//         wrongChr: wrongChr,
//       };
//       const storage = JSON.parse(localStorage.getItem("rankStore")) || []; //for test
//       console.log(storage);
//       storage.push(result);
//       localStorage.setItem("rankStore", JSON.stringify(storage));
//       return true;
//     }
//     return false;
//   },
// };
