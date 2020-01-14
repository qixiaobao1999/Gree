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
        //执行购物车方法
        this.addcart();
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

//放大镜
class Fdj {
    constructor() {
        this.wrap = $(".pic_left");//外层得盒子
        this.xt = $(".xt");//小图
        this.sf = $(".sf");//小放
        this.dt = $(".dt");//大图
        this.df = $(".df");//大放
        this.ul = $(".imageMenu ul")//ul
        this.list = $(".imageMenu ul li")//li
        this.zjt = $(".zjt");//左箭头
        this.yjt = $(".yjt");//右箭头
    }
    init() {
        let $this = this;
        //1.移入移出显示隐藏小放和大放
        this.xt.hover(() => {
            this.sf.show();
            this.df.show();

            //2.获取小放得尺寸
            this.sf.css({
                width: this.xt.outerWidth() * this.df.outerWidth() / this.dt.outerWidth(),
                height: this.xt.outerHeight() * this.df.outerHeight() / this.dt.outerHeight()
            });

            //2.1求比列
            let $bili = this.dt.width() / this.xt.width();

            //3.鼠标移动小放跟随鼠标
            this.xt.on("mousemove", () => {
                //3.1固定在小图里不能移出去
                let $L = event.pageX - (this.wrap.offset().left + this.sf.width() / 2);
                let $T = event.pageY - (this.wrap.offset().top + this.sf.height() / 2);

                if ($L < 0) {
                    $L = 0;
                } else if ($L >= this.xt.width() - this.sf.width()) {
                    $L = this.xt.width() - this.sf.width();
                }
                if ($T < 0) {
                    $T = 0;
                } else if ($T >= this.xt.height() - this.sf.height()) {
                    $T = this.xt.height() - this.sf.height();
                }

                this.sf.css({
                    left: $L,
                    top: $T
                });
                //给大图赋值-比列
                this.dt.css({
                    left: -$L * $bili,
                    top: -$T * $bili
                });

            });
        }, () => {//鼠标移出
            this.sf.hide();
            this.df.hide();
        });

        //4.点击li把图片地址赋给小图的src和大图的src,事件委托
        this.ul.on("click", "li", function () {
            let $imgsrc = $(this).find("img").attr("src");
            $this.xt.find("img").attr("src", $imgsrc);
            $this.dt.attr("src", $imgsrc);
        });

        //5.点击左右按钮事件

        let $num = 4;

        //右键点击事件
        this.yjt.on("click", () => {
            
            if ($(".imageMenu ul li").size() > $num) {
                $num++;
                this.zjt.css("color", "#747474");
                if ($num === $(".imageMenu ul li").size()) {//判断如果$num的长度等于li的长度不能点击右键了
                    this.yjt.css("color","#fff");
                }
                //ul移动一个li的位置
                this.ul.animate({
                    left: -($num - 4) * $(".imageMenu ul li").width()
                })
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
    new Fdj().init();
    introduce();
}

export {
    xqy
}