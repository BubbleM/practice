let storageA = {};
let storageB = {};
let storageC = {};
let storageD = {};
let records = [];

let price = {
  '1_5': {
    '9:00 ~ 12:00': 30,
    '12:00 ~ 18:00': 50,
    '18:00 ~ 20:00': 80,
    '20:00 ~ 22:00': 60,
    'take_out': 0.5
  },
  '6_7': {
    '9:00 ~ 12:00': 40,
    '12:00 ~ 18:00': 50,
    '18:00 ~ 20:00': 60,
    'take_out': 0.25
  }
}

function addStorage(arr, storage) {
  if (!storage[arr[1]]) storage[arr[1]] = {};

  let times = arr[2].split('~');
  let begin = times[0].split(':')[0] - 0;
  let end = times[times.length - 1].split(':')[0] - 0;
  for (let i = begin + 1; i < end; i++) {
    if (i < 10) i = `0${i}`;
    times.splice(1, 0, `${i}:00`);
  }
  times.splice(times.length - 1, 1);
  for (time of times) {
    storage[arr[1]][time] = arr[0];
  }

}

function addRecord(arr) {
  let record = {username: arr[0], info: arr.join(' ')};
  records.push(record);
}

function addOrderRecord(order) {
  let arr = order.split(' ');
  addRecord(arr);

  switch (arr[arr.length - 1]) {
    case 'A':
      addStorage(arr, storageA);
      break;
    case 'B':
      addStorage(arr, storageB);
      break;
    case 'C':
      addStorage(arr, storageC);
      break;
    case 'D':
      addStorage(arr, storageD);
      break;
    default:
      console.log('您输入的场地不存在!');
      break;
  }

}

function main() {

  let order1 = 'U123 2016-06-02 09:00~10:00 A';
  let order2 = 'U231 2016-06-02 10:00~12:00 A';
  let order3 = 'U213 2016-06-03 20:00~22:00 A';
  let order4 = 'U311 2016-06-04 09:00~10:00 B';

  addOrderRecord(order1);
  addOrderRecord(order2);
  addOrderRecord(order3);
  addOrderRecord(order4);

  console.log(storageA);
  console.log(storageB);
  console.log(storageC);
  console.log(records);

  return `收⼊汇总
---
场地:A
2016-06-02 09:00~10:00 30元
2016-06-02 10:00~12:00 60元
2016-06-03 20:00~22:00 120元
⼩计：195元
场地:B
2016-06-04 09:00~10:00 40元
⼩计：40元
场地:C
⼩计：0元
场地:D
⼩计：0元
---
总计: 250元`;

}

main();
module.exports = main;
