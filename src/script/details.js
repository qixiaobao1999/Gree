//http://10.31.152.37/Gree/php/details.php 
class Details{
    constructor(){
        this.sid = location.search.substring(1).split("=")[1];//接收sid
        this.wrap = $(".pic_left");//外层得盒子
        this.xt = $(".xt");//小图
        this.sf = $(".sf");//小放
        this.dt = $(".dt");//大图
        this.df = $(".df");//大放
        this.zjt = $(".zjt");//左箭头
        this.yjz = $(".yjz");//右箭头
        this.list = $(".imageMenu");//一连串图片得盒子
        this.list_ul = $(".imageMenu ul");//ul
        this.num = $("#input");//数量
    }
    init(){
        //把sid传给后端
        $.ajax({
            url:"http://10.31.152.37/Gree/php/details.php",
            data:{
                sid: this.sid
            },
            dataType:"json"
        }).done((obj)=>{
            console.log(obj);
            $(".xt img").attr("src",obj.url);
        })
    }
}



//引入得公共结构
function introduce() {
    $("#top").load("top.html");//顶部相同的结构
    $("#header").load("header.html");//头部相同的结构
    $("#footer").load("footer.html");//尾部相同的结构
}

function xqy(){
    new Details().init();
    introduce();
}

export{
    xqy
}