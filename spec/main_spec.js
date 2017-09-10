"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var main = require("../lib/main.js");


describe("测试描述", function(){
    sinon.spy(console, 'log');

    it("收入汇总测试", function(){

      let order1 = 'U123 2016-06-02 09:00~10:00 A';
      let order2 = 'U231 2016-06-02 10:00~12:00 A';
      let order3 = 'U213 2016-06-03 20:00~22:00 A';
      let order4 = 'U311 2016-06-04 09:00~10:00 B';
      let orders = [order1,order2,order3,order4];
      var result = main(orders);

      expect(result).to.equal(`收⼊汇总
---
场地:A
2016-06-02 09:00~10:00 30元
2016-06-02 10:00~12:00 60元
2016-06-03 20:00~22:00 120元
⼩计：210元
场地:B
2016-06-04 09:00~10:00 40元
⼩计：40元
场地:C
⼩计：0元
场地:D
⼩计：0元
---
总计: 250元`);
    });

  it("测试用例1", function(){

    let order1 = 'U001 2016-06-02 22:00~22:00 A';
    let order2 = 'U002 2017-08-01 19:00~22:00 A';
    let order3 = 'U003 2017-08-02 13:00~17:00 B';
    let order4 = 'U004 2017-08-03 15:00~16:00 C';
    let order5 = 'U005 2017-08-05 09:00~11:00 D';
    let orders = [order1,order2,order3,order4,order5];
    var result = main(orders);

    expect(result).to.equal(`收⼊汇总
---
场地:A
2017-08-01 19:00~22:00 200元
⼩计：200元
场地:B
2017-08-02 13:00~17:00 200元
⼩计：200元
场地:C
2017-08-03 15:00~16:00 50元
⼩计：50元
场地:D
2017-08-05 09:00~11:00 80元
⼩计：80元
---
总计: 530元`);
  });

  xit("取消预约扣除违约金收入测试", function(){

    let order1 = 'U123 2016-06-02 09:00~10:00 A';
    let order2 = 'U231 2016-06-02 10:00~12:00 A';
    let order3 = 'U213 2016-06-03 20:00~22:00 A';
    let order4 = 'U311 2016-06-04 09:00~10:00 B';
    let order5 = 'U123 2016-06-02 09:00~10:00 A C';
    let orders = [order1, order2, order3, order4, order5];
    var result = main(orders);

    expect(result).to.equal(`收⼊汇总
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
总计: 235元`);
  });

});