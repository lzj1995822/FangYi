/**
 * 常量
 */
var Constants = window.Constants || {};
var token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDUxODE3MDUsInVzZXJpZCI6NCwiaWF0IjoxNTQ1MDk1MzA1LCJ1c2VybmFtZSI6Iue7vOayu-WKniJ9.aYEKoHE9DWGfE1UqP1ouWbGG-rdQPeslq2Ito55ShKA'
//接口地址
 Constants.path = "http://36.156.152.127:8890/";
//Constants.path = "http://192.168.31.14:8890/";
function IdentityCodeValid(idCard){
    //15位和18位身份证号码的正则表达式
    var pass= true;
    var tip = "";
    var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    //如果通过该验证，说明身份证格式正确，但准确性还需计算
    if(regIdCard.test(idCard)){
        if(idCard.length==18){
            var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
            var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
            for(var i=0;i<17;i++){
                idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
            }
            var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
            var idCardLast=idCard.substring(17);//得到最后一位身份证号码
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if(idCardMod==2){
                if(idCardLast=="X"||idCardLast=="x"){
                    // alert("恭喜通过验证啦！");
                }else{
                    // alert("身份证号码错误！")
                    tip = "身份证号码错误！";
                }
            }else{
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if(idCardLast==idCardY[idCardMod]){
                    // alert("恭喜通过验证啦！");
                }else{
                    alert("身份证号码错误！");
                    tip = "身份证号码错误！";
                }
            }
        }
    }else{
        // alert("身份证格式不正确!");
        tip = "身份证格式不正确！";
    }
    return tip;
}

function dw(x,y) {
    if(x!=null&&y!=null&&x!=""&&y!=''&&x!=0&&y!=0){
        return true;
    }else{
        return false;
    }

}
