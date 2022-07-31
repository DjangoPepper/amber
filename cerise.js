var bills = [
  {
    "Rang": 1,
    "Référence": "2021R123",
    "Position": "stock",
    "Destination": "0",
    "Poids": 28
  },
  {
    "Rang": 3,
    "Référence": "2021R234",
    "Position": "0",
    "Destination": "H3",
    "Poids": 15
  },
  {
    "Rang": 4,
    "Référence": "2022R453",
    "Position": "stock",
    "Destination": "H3",
    "Poids": 15
  },
  {
    "Rang": 5,
    "Référence": "2021A234",
    "Position": "0",
    "Destination": "H2",
    "Poids": 12
  },
  {
    "Rang": 6,
    "Référence": "2023A012",
    "Position": "stock",
    "Destination": "0",
    "Poids": 18
  },
  {
    "Rang": 7,
    "Référence": "2021D123",
    "Position": "0",
    "Destination": "H1",
    "Poids": 11
  }
];


var result = bills.reduce(function(_this, val)
  {return _this + val.Poids}
  , 0);

console.log(result)
//61050 answer
