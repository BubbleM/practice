let storageA = [];
let storageB = [];
let storageC = [];
let storageD = [];

let standard1_5 = [{time: '9:00', price: 30, order:''},
  {time: '10:00', price: 30, order:''},
  {time: '11:00', price: 30, order:''},
  {time: '12:00', price: 50, order:''},
  {time: '13:00', price: 50, order:''},
  {time: '14:00', price: 50, order:''},
  {time: '15:00', price: 50, order:''},
  {time: '16:00', price: 50, order:''},
  {time: '17:00', price: 50, order:''},
  {time: '18:00', price: 80, order:''},
  {time: '19:00', price: 80, order:''},
  {time: '20:00', price: 60, order:''},
  {time: '21:00', price: 60, order:''},
  {time: '22:00', price: 60, order:''}
];

let standard6_7 = [{time: '9:00', price: 40, order:''},
  {time: '10:00', price: 40, order:''},
  {time: '11:00', price: 40, order:''},
  {time: '12:00', price: 50, order:''},
  {time: '13:00', price: 50, order:''},
  {time: '14:00', price: 50, order:''},
  {time: '15:00', price: 50, order:''},
  {time: '16:00', price: 50, order:''},
  {time: '17:00', price: 50, order:''},
  {time: '18:00', price: 60, order:''},
  {time: '19:00', price: 60, order:''},
  {time: '20:00', price: 60, order:''},
  {time: '21:00', price: 60, order:''},
  {time: '22:00', price: 60, order:''}
];

function main(){
  return `收⼊汇总
---
场地:A
2016-06-02 09:00~10:00 违约⾦ 15元
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
总计: 235元`;
    
}

module.exports = main;
