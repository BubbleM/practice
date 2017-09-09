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
      var result = main();
      var expect_string = '';
        
      expect(result).to.equal(`收⼊汇总
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
总计: 250元`);
    });

  xit("取消预约扣除违约金收入测试", function(){

    let order1 = 'U123 2016-06-02 09:00~10:00 A';
    let order2 = 'U231 2016-06-02 10:00~12:00 A';
    let order3 = 'U213 2016-06-03 20:00~22:00 A';
    let order4 = 'U311 2016-06-04 09:00~10:00 B';
    let order5 = 'U123 2016-06-02 09:00~10:00 A C';
    var result = main();
    var expect_string = '';

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