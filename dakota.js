var arrayVal = [
    {id:"1", age: 20},
    {id:"2", age: 30},
    {id:"2", age: 20},
    {id:"3", age: 20},
    {id:"5", age: 10}
];
var result = arrayVal.filter(function (arrayVal) {
    return arrayVal.id === "2";}).reduce(function(_this, val)
    {return _this + val.age}    , 0);
console.log(result);

/*
const ages = arrayVal.reduce((a, {id, age}) => (a[id] = (a[id] || 0) + +age, a), {});
console.log(ages);

const cumul_ages = arrayVal.filter(function (arrayVal) {
    return arrayVal.id === "2";
});
console.log(cumul_ages);
*/


/*
var pilots = [
    {
    id: 2,
    name: "Wedge Antilles",
    faction: "Rebels",
    },
    {
    id: 8,
    name: "Ciena Ree",
    faction: "Empire",
    },
    {
    id: 40,
    name: "Iden Versio",
    faction: "Empire",
    },
    {
    id: 66,
    name: "Thane Kyrell",
    faction: "Rebels",
    }
];
*/
//const rebels = pilots.filter(pilot => pilot.faction === "Rebels");
/*
var rebels = pilots.filter(function (pilot) {
    return pilot.faction === "Rebels";
});
console.log(rebels);

var empire = pilots.filter(function (pilot) {
    return pilot.faction === "Empire";
});
console.log(empire); */