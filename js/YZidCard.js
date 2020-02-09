/**************************************************************************
 身份号码排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
 地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
 出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
 顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。
 顺序码的奇数分给男性，偶数分给女性。
 校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
 公式(1)中：
 i----表示号码字符从右至左包括校验码在内的位置序号；
 ai----表示第i位置上的号码字符值；
 Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
 i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
 Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1
 ****************************************************************************/

/**
 * 身份证城市代码列表
 */
var aIdentityCode_City = {
    // 城市代码列表
    11: "北京",12 : "天津",13 : "河北",14 : "山西",15 : "内蒙古",21 : "辽宁",22 : "吉林",
    23: "黑龙江 ",31 : "上海",32 : "江苏",33 : "浙江",34 : "安徽",35 : "福建",36 : "江西",
    37: "山东",41 : "河南",42 : "湖北 ",43 : "湖南",44 : "广东",45 : "广西",46 : "海南",
    50: "重庆",51 : "四川",52 : "贵州",53 : "云南",54 : "西藏 ",61 : "陕西",62 : "甘肃",
    63: "青海",64 : "宁夏",65 : "新疆",71 : "台湾",81 : "香港",82 : "澳门",91 : "国外 "
};

//检查号码是否符合规范，包括长度，类型
function IdentityCode_isCardNo(card) {
    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/; // 正则表达式
    if (reg.test(card) === false) {
        return false;
    }
    return true;
};

//取身份证前两位，校验省份
function IdentityCode_checkProvince(card) {
    var province = card.substr(0,2);
    if (aIdentityCode_City[province] == undefined) {
        return false;
    }
    return true;
};

//检查生日是否正确，15位以'19'年份来进行补齐。
function IdentityCode_checkBirthday(card) {
    var len = card.length;
    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len == '15') {
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
        var arr_data = card.match(re_fifteen); // 正则取号码内所含出年月日数据
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date('19' + year + '/' + month + '/' + day);
        return IdentityCode_verifyBirthday('19' + year, month, day, birthday);
    }
    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len == '18') {
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;
        var arr_data = card.match(re_eighteen); // 正则取号码内所含出年月日数据
        var year = arr_data[2];
        var month = arr_data[3];
        var day = arr_data[4];
        var birthday = new Date(year + '/' + month + '/' + day);
        return IdentityCode_verifyBirthday(year, month, day, birthday);
    }
    return false;
};

//校验日期 ，15位以'19'年份来进行补齐。
function IdentityCode_verifyBirthday(year, month, day, birthday) {
    var now = new Date();
    var now_year = now.getFullYear();
    //年月日是否合理
    if (birthday.getFullYear() == year
        && (birthday.getMonth() + 1) == month
        && birthday.getDate() == day) {
        //判断年份的范围（3岁到150岁之间)
        var time = now_year - year;
        if (time >= 3 && time <= 150) {
            return true;
        }
        return false;
    }
    return false;
};

//校验位的检测
function IdentityCode_checkParity(card) {
    card = IdentityCode_changeFivteenToEighteen(card); // 15位转18位
    var len = card.length;
    if (len == '18') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i, valnum;
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        valnum = arrCh[cardTemp % 11];
        if (valnum == card.substr(17, 1)) {
            return true;
        }
        return false;
    }
    return false;
};

//15位转18位身份证号
function IdentityCode_changeFivteenToEighteen(card) {
    if (card.length == '15') {
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
        var cardTemp = 0, i;
        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
        for (i = 0; i < 17; i++) {
            cardTemp += card.substr(i, 1) * arrInt[i];
        }
        card += arrCh[cardTemp % 11];
        return card;
    }
    return card;
};

/**
 * 身份证号码检验主入口
 * 符合规则则返回性别：0|女生 1|男生
 * 不符合规则弹出提示错误
 */

function IdentityCodeValid(card) {
    var tip = "您输入的身份证号码不正确，请重新输入！";
    var pass = 'true';
    //是否为空
    if (pass && card === '')
        pass = 'false';
    //校验长度，类型
    if (pass && IdentityCode_isCardNo(card) === false)
        pass = 'false';
    //检查省份
    if (pass && IdentityCode_checkProvince(card) === false)
        pass = 'false';
    //校验生日
    if (pass && IdentityCode_checkBirthday(card) === false)
        pass = 'false';
    //检验位的检测
    if (pass && IdentityCode_checkParity(card) === false)
        pass = 'false';
    if (pass){
        var iCard = IdentityCode_changeFivteenToEighteen(card);
        if (parseInt(iCard.charAt(16)) % 2 == 0) {
            sex = "0"; // 女生
        } else {
            sex = "1"; // 男生
        }
        return pass;
    } else {
        return 'false';
        //alert(tip);
    }

}



//验证护照
function checknumber(number){
    var str=number;
    var Expression=/(P\d{7})|(G\d{8})/;
    var objExp=new RegExp(Expression);
    if(objExp.test(str)==true){
        return true;
    }else{
        return false;
    }
};

