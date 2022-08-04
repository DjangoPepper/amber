// exemple sur cumul d'un meme id
var caTaLoGue = [
  {
    "Rang": 1,
    "Référence": "2021R123",
    "Position": 1,
    "Destination": 0,
    "Poids": 28
  },
  {
    "Rang": 3,
    "Référence": "2021R234",
    "Position": 0,
    "Destination": 3,
    "Poids": 15
  },
  {
    "Rang": 4,
    "Référence": "2022R453",
    "Position": 1,
    "Destination": 3,
    "Poids": 15
  },
  {
    "Rang": 5,
    "Référence": "2021A234",
    "Position": 0,
    "Destination": 2,
    "Poids": 12
  },
  {
    "Rang": 6,
    "Référence": "2023A012",
    "Position": 1,
    "Destination": 0,
    "Poids": 18
  },
  {
    "Rang": 7,
    "Référence": "2021D123",
    "Position": 0,
    "Destination": 1,
    "Poids": 11
  }
];

var result = caTaLoGue.reduce(function(_this, VaLeuR)
  {return _this + VaLeuR.Poids}
  , 0);
console.log(result)
//99 answer


var caTaloG = [
  {id:1, age: 20},
  {id:2, age: 30},
  {id:2, age: 20},
  {id:3, age: 20},
  {id:5, age: 10}
];
var result2 = caTaloG.filter(function (caTaloG) {
  return caTaloG.id === 2;}).reduce(function(_this, vAl2)
  {return _this + vAl2.age}    , 0);
console.log(result2);