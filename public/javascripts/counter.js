
const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck', 'pogostick'];

const i = data.reduce( (acc, cur) => {
    if(acc[cur]){
        acc[cur]++;
    } else {
        acc[cur] = 1;
    }
    return acc;
}, {});

console.table(i);