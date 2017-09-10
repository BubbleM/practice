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
    '20:00 ~ 22:00': 60,
    'take_out': 0.25
  }
}

function count(price, times) {
  // console.log(times)
  let prices = 0;
  for (time of times) {
    let num = time.split(':')[0] - 0;
    switch (num) {
      case 9:
      case 10:
      case 11:
        prices += price['9:00 ~ 12:00'];
        break;
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
        prices += price['12:00 ~ 18:00'];
        break;
      case 18:
      case 19:
        prices += price['18:00 ~ 20:00'];
        break;
      case 20:
      case 21:
      case 22:
        prices += price['20:00 ~ 22:00'];
        break;
    }
  }
  return prices;
}

function countPrice(date, times) {
  let week = new Date(date).getDay();
  if (week > 0 && week < 6) return count(price['1_5'], times);
  return count(price['6_7'], times);
}

function addStorage(arr, storage) {
  if (!storage[arr[1]]) storage[arr[1]] = {};

  let times = arr[2].split('~');
  let begin = times[0].split(':')[0] - 0;
  let end = times[times.length - 1].split(':')[0] - 0;
  if (begin === end) {
    console.log('Error: the booking is invalid!');
    return 0;
  }
  for (let i = begin + 1; i < end; i++) {
    if (i < 10) i = `0${i}`;
    times.splice(1, 0, `${i}:00`);
  }
  times.splice(times.length - 1, 1);
  let result = true;
  for (time of times) {
    if (storage[arr[1]][time]) {
      console.log('Error: the booking conflicts with existing bookings!');
      result = false;
      break;
    } else {
      storage[arr[1]][time] = arr[0];
    }
  }

  let price = countPrice(arr[1], times);
  if (result) addRecord(arr, price);
}

function addRecord(arr, price) {
  let record = {username: arr[0], info: arr.join(' '), price: price};
  records.push(record);
}

function addOrderRecord(order) {
  let arr = order.split(' ');

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

function main(orders) {
  for (order of orders) {
    addOrderRecord(order);
  }
  let strA = `场地:A
`;
  let strB = `场地:B
`;
  let strC = `场地:C
`;
  let strD = `场地:D
`;

  let totalA = 0;
  let totalB = 0;
  let totalC = 0;
  let totalD = 0;

  for (record of records) {
    let recordArr = record.info.split(' ');
    if (recordArr[recordArr.length - 1] === 'A') {
      totalA += record.price;
      strA += `${recordArr[1]} ${recordArr[2]} ${record.price}元
`;
    }
    if (recordArr[recordArr.length - 1] === 'B') {
      totalB += record.price;
      strB += `${recordArr[1]} ${recordArr[2]} ${record.price}元
`;
    }
    if (recordArr[recordArr.length - 1] === 'C') {
      totalC += record.price;
      strC += `${recordArr[1]} ${recordArr[2]} ${record.price}元
`;
    }
    if (recordArr[recordArr.length - 1] === 'D') {
      totalD += record.price;
      strD += `${recordArr[1]} ${recordArr[2]} ${record.price}元
`;
    }
  }
  strA += `⼩计：${totalA}元`;
  strB += `⼩计：${totalB}元`;
  strC += `⼩计：${totalC}元`;
  strD += `⼩计：${totalD}元`;

  let totalPrice = totalA + totalB + totalC + totalD;
  return `收⼊汇总
---
${strA}
${strB}
${strC}
${strD}
---
总计: ${totalPrice}元`;

}

module.exports = main;
