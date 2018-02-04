var constant = require('constant.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function isMobile(value) {
  var pattern = /^1[3578][0123456789]\d{8}$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}
function isTelephone(value) {
  //"兼容格式: 国家代码(2到3位)-区号(2到3位)-电话号码(7到8位)-分机号(3位)"
  var pattern = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}
function isTax(value) {

  var pattern = /^[A-Z0-9]{15}$|^[A-Z0-9]{17}$|^[A-Z0-9]{18}$|^[A-Z0-9]{20}$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}

function hideMobile(value) {
  var mobile = value;
  mobile = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
  return mobile;
}

function isEmail(value) {
  var pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (!pattern.test(value)) {
    return false;
  }
  return true;
}

function getTitleWithId(mapArr, idValue) {
  var title = '';
  for (var i = 0; i < mapArr.length; i++) {
    if (mapArr[i].id == idValue) {
      title = mapArr[i].title;
      break;
    }
  }
  return title;
}

function sortBy(field1, field2) {
  return function (a, b) {
    if (a.field1 == b.field1) return a.field2 - b.field2;
    return a.field1 - b.field1;
  }
}

/** 
 * 是否为空字符串，有空格不是空字符串 
 * @param str 
 * @returns {Boolean} 
 */
function isEmptyStr(str) {
  if (str == null || typeof str == "undefined" ||
    str == "") {
    return true;
  }
  return false;
};

/**
 * 根据年-月获取日历数据
 *  data.canlender = canlender;
 *  data.canlender.year = year;
 *  data.canlender.month = month;
 *  data.canlender.weeks = weeks;
 */
function getCanlenderData(year, month) {
  var that = this;
  var canlender = [];
  // var _date = new Date()
  // var year = _date.getFullYear()  //年
  // var month = _date.getMonth() + 1  //月
  // var date = _date.getDate()  //日
  // var year = 2017  //年
  // var month = 10  //月
  // var date = 6  //日
  console.log("📅 现在日期")
  console.info(year + "-" + month)

  // var day = _date.getDay()
  var firstDay = new Date(year, month - 1, 1).getDay();

  // console.warn('first day of this month :' + firstDay)

  var lastMonthDays = [];
  for (var i = firstDay; i > 0; i--) {
    // console.warn(new Date(year, month, -i).getDate())
    lastMonthDays.push({
      'date': new Date(year, month, -i).getDate(),
      'month': parseInt(month) - 1
    })
  }

  var currentMonthDys = [];
  for (var i = 1; i <= new Date(year, month, 0).getDate(); i++) {
    currentMonthDys.push({
      'date': i,
      'month': parseInt(month),
    })
  }
  var nextMonthDays = []
  var endDay = new Date(year, month, 0).getDay();
  // console.log('end day:' + endDay)
  for (var i = 1; i < 7 - endDay; i++) {

    nextMonthDays.push({
      'date': i,
      'month': parseInt(month) + 1 > 12 ? 1 : parseInt(month) + 1
    })
  }
  canlender = canlender.concat(lastMonthDays, currentMonthDys, nextMonthDays)
  var weeks = []
  for (var i = 0; i < canlender.length; i++) {
    if (i % 7 == 0) {
      weeks[parseInt(i / 7)] = new Array(7);
    }
    weeks[parseInt(i / 7)][i % 7] = canlender[i]
  }

  var data = {};
  // data.canlender = canlender;
  data.year = year;
  data.month = month;
  data.weeks = weeks;

  return data;
};
/** 
 * 是否为空字符串，有空格不是空字符串 
 * @param str 
 * @returns {Boolean} 
 */
function isEmptyStr(str) {
  if (str == null || typeof str == "undefined" ||
    str == "") {
    return true;
  }
  return false;
};

/**
 * 验证身份证
 */
function isValidID(ID) {
  if (typeof ID !== 'string') return '非法字符串';
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" };
  var birthday = ID.substr(6, 4) + '/' + Number(ID.substr(10, 2)) + '/' + Number(ID.substr(12, 2));
  var d = new Date(birthday);
  var newBirthday = d.getFullYear() + '/' + Number(d.getMonth() + 1) + '/' + Number(d.getDate());
  var currentTime = new Date().getTime();
  var time = d.getTime();
  var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  var sum = 0, i, residue;

  if (!/^\d{17}(\d|x)$/i.test(ID)) return false //'非法身份证';
  if (city[ID.substr(0, 2)] === undefined) return false //"非法地区";
  if (time >= currentTime || birthday !== newBirthday) return false//'非法生日';
  for (i = 0; i < 17; i++) {
    sum += ID.substr(i, 1) * arrInt[i];
  }
  residue = arrCh[sum % 11];
  if (residue !== ID.substr(17, 1)) return false //'非法身份证哦';

  //return city[ID.substr(0, 2)] + "," + birthday + "," + (ID.substr(16, 1) % 2 ? " 男" : "女")
  return true;
};

/**
 * 设置adminToken本地缓存
 */
function setAdminToken(adminToken) {

  //写入本地存储
  wx.setStorage({
    key: constant.constant.adminTokenKey,
    data: adminToken,
    fail: function (res) {
      console.warn("setAdminToken Fail");
      console.warn(res)
    },
    success: function (res) {
      // console.log('设置成功')
    }
  })
}

/**
 * 获取adminToken
 */
function getAdminToken() {
  // var adminToken = ''
  var adminToken = wx.getStorageSync(constant.constant.adminTokenKey)
  // console.log('请求成功')
  return adminToken;
}
/**
 * 设置请求头-->admin
 */
function adminRequestHeader(token) {
  var header = '';
  var adminToken = '';
  if (isEmptyStr(token)) {
    //同步获取adminToken
    adminToken = getAdminToken();
  }else{
    adminToken = token;
  }
  if (!isEmptyStr(adminToken)) {
    var header = {
      'Authorization': 'Bearer ' + adminToken,
      'Content-Type': 'application/json', //默认值
    }
  }
  return header;
}


/** 
 * 判断当前数组某项是否为所需
 */
function isNeed(array, attributes) {
  var value = ''
  for (var i = 0; i < array.length; i++) {
    if (array[i].attribute_code === attributes) {
      value = array[i].value;
    }
  }
  return value;
}
/**
 * 根据属性id获取属性信息
 */
function getAttributes(attributeId,callback) {
  var url = constant.constant.domain + constant.constant.path + '/V1/products/attributes/' + attributeId + '/options';
  wx.request({
    url: url,
    data: {},
    header: adminRequestHeader(),
    success: function (res) {
      callback(attributeId,res.data);
    },
    fail: function (res) {
      console.error('🚀 🚀 🚀 util获取商品属性错误')
    }
  })
}
/**
 * 取最小值
 */
function isMin(array) {
  var min = array[0].price
  for (var i = 1; i < array.length; i++) {
    if (array[i].price > array[i-1].price) {
      min = array[i-1].price
    }
  }
  return min;
}
/**
 * 获取商品参数信息
 */
function getProParamsInfo (array) {
  var arr = []
  var str = 'product_options_'
  for (var i = 0; i < array.length; i++) {
    if (array[i].attribute_code.indexOf(str) > -1) {
      arr.push(array[i])
    }
  }
  return arr;
}

/**
 * 随机数生成
 */
function getRandom (min,max) {
  var temp = max - min + 1;
  return Math.floor(Math.random() * temp + min);
}

/**
 * 取余
 */
function getRemainder (num) {
  var result = num % (constant.constant.avatarNum)
  return result
}

/**
 * 四舍五入小数
 */
function toDecimal(num) {
  var result = parseFloat(num);
  if (isNaN(result)) {
    return;
  }
  result = Math.round(num * 100) / 100;
  return result;
}  
module.exports = {
  formatTime: formatTime,
  isMobile: isMobile,
  isTelephone: isTelephone,
  isEmail: isEmail,
  isValidID: isValidID,
  isTax: isTax,
  hideMobile: hideMobile,
  getTitleWithId: getTitleWithId,
  sortBy: sortBy,
  getCanlenderData: getCanlenderData,
  isEmptyStr: isEmptyStr,
  isValidID: isValidID,
  setAdminToken: setAdminToken, // 设置缓存AdminToken
  getAdminToken: getAdminToken, // 获取缓存
  adminRequestHeader: adminRequestHeader, // 请求头
  isNeed, // 判断数组某项是否为所需
  getAttributes, // 根据属性id获取属性信息
  isMin,  // 判断可配置商品价格大小
  getProParamsInfo,  // 获取商品参数信息
  getRandom,  // 获取随机数
  getRemainder,  // 取余
  toDecimal // 四舍五入小数
}
