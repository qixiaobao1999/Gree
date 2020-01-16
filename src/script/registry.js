class Zhuce {
    constructor() {
        this.input = $("input");
        this.span = $("span");
        this.form = $("form");
        //标记
        this.userflag = true;
        this.passwordflag = true;
        this.iphoneflag = true;
        this.yxflag = true;
    }
    init() {
        //用户名
        //获得焦点时
        this.input.eq(0).on("focus",()=>{
            this.span.eq(0).html("请输入用户名");
            this.span.eq(0).css({
                color: "red",
                fontSize:12
            });
        });
        //失去焦点时
        this.input.eq(0).on("blur",()=>{
            if(this.input.eq(0).val() !== ""){
                let reg = /[\d\a-zA-Z\_]*/;
                if(reg.test(this.input.eq(0).val())){
                    this.span.eq(0).html("√");
                    this.span.eq(0).css({
                        color:"green",
                        fontSize:20
                    });
                    this.userflag = true;
                }else{
                    this.span.eq(0).html("-用户名不符合条件-");
                    this.span.eq(0).css({
                        color:"red",
                        fontSize:12
                    });
                    this.userflag = false;
                }
            }else{
                this.span.eq(0).html("-用户名不能为空-");
                this.span.eq(0).css({
                    color:"red",
                    fontSize:12
                });
                this.userflag = false;
            }
        });

        //密码
        //获得焦点
        this.input.eq(1).on("focus",()=>{
            this.span.eq(1).html("请输入密码-");
            this.span.eq(1).css({
                color:"red",
                fontSize:12
            });
        });
        //输入内容时
        this.input.eq(1).on("input",()=>{
                let reg = /^[\w_-]{6,16}$/;
                if(reg.test(this.input.eq(0).val())){
                    this.span.eq(1).html("√");
                    this.span.eq(1).css({
                        color:"green",
                        fontSize:12
                    });
                    this.passwordflag = true;
                }else{
                this.span.eq(1).css("color","red");
                this.passwordflag = false;
            }
        });
        //失去焦点
        this.input.eq(1).on("blur",()=>{
            if(this.input.eq(1).val() !== ""){
                    this.span.eq(1).html("√");
                    this.span.eq(1).css({
                        color:"green",
                        fontSize:12
                    });
                    this.passwordflag = true;
            }else{
                this.span.eq(1).css({
                    color:"red",
                    fontSize:12
                });
                this.passwordflag = false;
            }
        })
        
        //手机号
        //获得焦点时
        this.input.eq(2).on("focus",()=>{
            this.span.eq(2).html("请输入手机号");
            this.span.eq(2).css({
                color:"red",
                fontSize:12
            });
            
        });

        //失去焦点时
        this.input.eq(2).on("blur",()=>{
            if(this.input.eq(2).val() !== ""){
                let reg = /^1[0-9]{10}$/;
                if(reg.test(this.input.eq(2).val())){
                    this.span.eq(2).html("√");
                    this.span.eq(2).css({
                        color:"green",
                        fontSize:12
                    });
                    this.iphoneflag = true;
                }
            }else{
                this.span.eq(2).html("手机号不能为空")
                this.span.eq(2).css({
                    color:"red",
                    fontSize:12
                });
                this.iphoneflag = false;
            }
        });


        //邮箱
        //获得焦点时
        this.input.eq(3).on("focus",()=>{
            this.span.eq(3).html("请输入邮箱号");
            this.span.eq(3).css({
                color:"red",
                fontSize:12
            });
            
        });
        //失去焦点时
        this.input.eq(3).on("blur",()=>{
            if(this.input.eq(3).val() !== ""){
                let reg = /^(\w+[\_\+\-]*\w+)+\@(\w+[\+\-]*\w+)+\.(\w+[\+\-]*\w+)+$/;
                if(reg.test(this.input.eq(3).val())){
                    this.span.eq(3).html("√");
                    this.span.eq(3).css({
                        color:"green",
                        fontSize:12
                    });
                    this.yxflag = true;
                }
            }else{
                this.span.eq(3).html("邮箱不能为空")
                this.span.eq(3).css({
                    color:"red",
                    fontSize:12
                });
                this.yxflag = false;
            }
        })



        //点击提交按钮
        this.form.on("submit",()=>{
            if(this.input.eq(0).val() === ""){
                this.span.eq(0).html("用户名这里不能为空-");
                this.span.eq(0).css({
                    color:"red",
                    fontSize:12
                });
                this.userflag = false;
            }

            if(this.input.eq(1).val() === ""){
                this.span.eq(1).html("密码这里不能为空");
                this.span.eq(1).css({
                    color:"red",
                    fontSize:12
                });
                this.passwordflag = false;
            }

            if(this.input.eq(2).val() === ""){
                this.span.eq(2).html("手机号这里不能为空");
                this.span.eq(2).css({
                    color:"red",
                    fontSize:12
                });
                this.iphoneflag = false;
            }
            if(this.input.eq(3).val() === ""){
                this.span.eq(3).html("邮箱这里不能为空");
                this.span.eq(3).css({
                    color:"red",
                    fontSize:12
                });
                this.yxflag = false;
            }

            if(!this.userflag || !this.passwordflag || !this.iphoneflag || !this.yxflag){
                return false;
            }
        });
    }
}












function commonality() {
    $("#top").load("top.html");//顶部相同的结构
    $("#header").load("header.html");//头部相同的结构
    $("#footer").load("footer.html");//尾部相同的结构
}

function registry() {
    commonality()
    new Zhuce().init();
}

export {
    registry
}