let readline = require('readline');
let r1 = readline.createInterface(process.stdin, process.stdout);

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

/*
* 获取时间小时部分
* @paran time String '09:00'
* */
function splits(time) {
  let timestr = time.split(':');
  if (timestr[1] !== '00') console.log('Error: the booking is invalid!');

  return timestr[0] - 0;
}

/*
* 计算用户订单总额prices
* @param price {'9:00 ~ 12:00': 30,'12:00 ~ 18:00': 50,...}
* @param times [9:00, 10:00]
* */
function count(price, times) {
  let prices = 0;
  for (time of times) {
    let num = splits(time);
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

/*
* 根据data为周几计算并返回订单总价
* @param data String '2017-08-01'
* @param times []  ['09:00', '10:00']
* */
function countPrice(date, times) {
  let week = new Date(date).getDay();
  if (week > 0 && week < 6) return count(price['1_5'], times);
  return count(price['6_7'], times);
}

/*
* 格式化时间
* @param times ['9:00', '11:00']
* return ['9:00','10:00','11:00']
* */
function formatTimes(times) {
  let begin = splits(times[0]);
  let end = splits(times[times.length - 1]);
  if (begin === end) {
    console.log('Error: the booking is invalid!');
    return 0;
  }
  for (let i = begin + 1; i < end; i++) {
    if (i < 10) i = `0${i}`;
    times.splice(1, 0, `${i}:00`);
  }
  times.splice(times.length - 1, 1);

  return times;
}

function printInfo(records) {
  let strA = '场地:A\n', strB = '场地:B\n',
    strC = '场地:C\n', strD = '场地:D\n',
    totalA = 0, totalB = 0, totalC = 0, totalD = 0;
  for (record of records) {
    let recordArr = record.info.split(' ');
    let remark = ' ';
    if (record.remark) remark = ` ${record.remark} `;

    if (recordArr[recordArr.length - 1] === 'A') {
      totalA += record.price;
      strA += `${recordArr[1]} ${recordArr[2]}${remark}${record.price}元
`;
    }
    if (recordArr[recordArr.length - 1] === 'B') {
      totalB += record.price;
      strB += `${recordArr[1]} ${recordArr[2]}${remark}${record.price}元
`;
    }
    if (recordArr[recordArr.length - 1] === 'C') {
      totalC += record.price;
      strC += `${recordArr[1]} ${recordArr[2]}${remark}${record.price}元
`;
    }
    if (recordArr[recordArr.length - 1] === 'D') {
      totalD += record.price;
      strD += `${recordArr[1]} ${recordArr[2]}${remark}${record.price}元
`;
    }
  }
  strA += `⼩计：${totalA}元
`;
  strB += `⼩计：${totalB}元
`;
  strC += `⼩计：${totalC}元
`;
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

function addRecord(arr, price) {
  let record = {username: arr[0], info: arr.join(' '), price: price};
  return record;
}

function addStorage(arr, storage) {
  if (!storage[arr[1]]) storage[arr[1]] = {};
  let times = formatTimes(arr[2].split('~'));
  if (times) {
    let result = true;
    for (time of times) {
      if (storage[arr[1]][times[times.length - 1]]) {
        console.log('Error: the booking conflicts with existing bookings!');
        result = false;
        break;
      } else {
        storage[arr[1]][time] = arr[0];
      }
    }
    let price = countPrice(arr[1], times);
    if (result) {
      console.log('Success: the booking is accepted!');
      return addRecord(arr, price);
    }
  }
}

/*
* 计算违约金
* @param records [] 用户预约情况记录
* @order String 用户取消预约数据
* */
function countDamage(records, order) {
  let arr = order.split(' ');
  let arr2 = arr.concat([]);
  let obj = addRecord(arr2.splice(0, arr2.length - 1), 0);
  let days = new Date(arr[1]).getDay();
  let taxRate = 1;
  if (days !== 0 && days !== 6) taxRate = price['6_7']['take_out'];
  taxRate = price['1_5']['take_out'];

  for (record of records) {
    if (record.username === obj.username && record.info === obj.info) {
      if (record.remark) {
        console.log('Error: the booking being cancelled does not exist!');
      } else {
        record.price = record.price * taxRate;
        record.remark = '违约金';
        console.log('Success: the booking is accepted!');
      }
    }
  }

  return records;
}

/*用户取消预订 删除对应场地预订记录*/
function deleteStorage(times, storage, arr) {
  for (time of times) {
    delete storage[arr][time];
  }
}

function main(orders) {
  let storageA = {}, storageB = {}, storageC = {}, storageD = {}; // 场地预订情况记录
  let records = []; // 用户申请记录

  function addOrderRecord(order) {
    let arr = order.split(' ');
    if (arr.length < 5) { /*正常预订处理*/
      switch (arr[arr.length - 1]) {
        case 'A':
          let infoA = addStorage(arr, storageA);
          if (infoA) records.push(infoA);
          break;
        case 'B':
          let infoB = addStorage(arr, storageB);
          if (infoB) records.push(infoB);
          break;
        case 'C':
          let infoC = addStorage(arr, storageC);
          if (infoC) records.push(infoC);
          break;
        case 'D':
          let infoD = addStorage(arr, storageD);
          if (infoD) records.push(infoD);
          break;
        default:
          console.log('Error: the booking is invalid!');
          break;
      }
    } else { /*取消预约的处理*/
      let times = formatTimes(arr[2].split('~'));
      switch (arr[3]) {
        case 'A':
          deleteStorage(times, storageA, arr[1]);
          break;
        case 'B':
          deleteStorage(times, storageB, arr[1]);
          break;
        case 'C':
          deleteStorage(times, storageC, arr[1]);
          break;
        case 'D':
          deleteStorage(times, storageD, arr[1]);
          break;
      }
      records = countDamage(records, order);
    }
  }

/*
* orders为方便测试用例的正常执行
* @param {orders} [String]
* 用户输入的数据
* */
  if (orders) {
    for (order of orders) {
      addOrderRecord(order);
    }
    return printInfo(records);
  }

/*命令行程序执行*/
  r1.prompt();
  r1.on('line', (line) => {
    if (line == ' ') {
      console.log(printInfo(records));
      r1.close();
    } else {
      addOrderRecord(line);
    }
  });

  r1.on('close', function () {
    process.exit(0);
  });
}

main();
module.exports = main;
