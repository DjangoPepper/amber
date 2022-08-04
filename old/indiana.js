const obj = {
    user1: {id: 1, name: 'Alice'},
    user2: {id: 2, name: 'Bob'},
    user3: {id: 3, name: 'Charlie'},
};

// 👇️ [{id: 1, name: 'Alice'}, {id: 2, name: 'Bob'}, ...]
console.log(Object.values(obj));

const result = Object.values(obj).filter(value => {
    console.log(value);
    return value.id === 2;
});

// 👇️ [{id: 2, name: 'Bob'}]
console.log(result);
