//http://10.31.152.37/Gree/php/details.php 
class Details {
    constructor() {
        this.sid = location.search.substring(1).split("=")[1];//接收sid
        this.list = $(".imageMenu");//一连串图片得盒子
        this.list_ul = $(".imageMenu ul");//ul
        this.count = $("#count");//数量
    }
    init() {
        //把sid传给后端
        $.ajax({
            url: "http://10.31.152.37/Gree/php/details.php",
            data: {
                sid: this.sid
            },
            dataType: "json"
        }).done((obj) => {
            $(".xt img").attr("src", obj.url);
            $(".df img").attr("src",obj.url);
            $(".title h4").html(obj.title);
            $(".pic_ringht h3").html(obj.title1);
            $(".jiage span").html("￥" + obj.pice);

            let piclist = obj.urls.split(",");
            let strHTML = "";
            $.each(piclist, function (index, value) {
                strHTML += `
                <li><img src='${value}'></li>
                `;
            });
            this.list_ul.html(strHTML);
        });

        //点击数量加加减减
        this.click();
        //执行购物车方法
        this.addcart();
    }
    click(){
        //右键点击
        let $value = 1;
        let $num = this.count.val();
        $(".youa").on("click",()=>{
            $value ++;
                this.count.val($value);
           
        });

        $(".zuoa").on("click",()=>{
            if($value >= $num){
                $value --;
                this.count.val($value)
            }
            if(this.count.val() <= 1){
                this.count.val(1);
            }
        })
    }
    //添加购物车操作
    addcart() {
        let $goodnum = []; //数量
        let $goodsid = []; //编号
        //假设得本地存储存在
        function getcookie() {
            if (localStorage.getItem('cartnum') && localStorage.getItem('cartsid')) {
                $goodnum = localStorage.getItem('cartnum').split(',');
                $goodsid = localStorage.getItem('cartsid').split(',');
            }
        }
        //点击加入购物车按钮
        $(".join .left").on("click", () => {
            getcookie();
            //判断是否时第一次点击还是多次点击
            if ($.inArray(this.sid, $goodsid) === -1) {//没找到，第一次点击
                $goodsid.push(this.sid);
                localStorage.setItem("cartsid", $goodsid);//加入进相应得数组再存入本地
                $goodnum.push(this.count.val());
                localStorage.setItem("cartnum", $goodnum);
            } else {//多次点击
                let index = $.inArray(this.sid, $goodsid);//sid在数组对应得位置
                //获取新的数量=本地得数量+当前得数量
                let newnum = parseInt($goodnum[index]) + parseInt(this.count.val());
                $goodnum[index] = newnum;
                localStorage.setItem("cartnum", $goodnum);//把新的数量再次存入
            }
        });
    }
}




//引入得公共结构
function introduce() {
    $("#top").load("top.html");//顶部相同的结构
    $("#header").load("header.html");//头部相同的结构
    $("#footer").load("footer.html");//尾部相同的结构
}

function xqy() {
    new Details().init();
    introduce();
}

export {
    xqy
}