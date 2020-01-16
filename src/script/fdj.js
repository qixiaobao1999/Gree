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
            this.sf.css("visibility", "visible");
            this.df.css("visibility", "visible");


            //2.获取小放得尺寸
            this.sf.css({
                width: this.xt.outerWidth() * this.df.outerWidth() / this.dt.outerWidth(),
                height: this.xt.outerHeight() * this.df.outerHeight() / this.dt.outerHeight()
            });

            //2.1求比列
            let $bili = this.dt.width() / this.xt.width();

            //3.鼠标移动小放跟随鼠标
            this.xt.on("mousemove", (e) => {
                //3.1固定在小图里不能移出去
                let $L = e.pageX - (this.wrap.offset().left + this.sf.width() / 2);
                let $T = e.pageY - (this.wrap.offset().top + this.sf.height() / 2);

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
            this.sf.css("visibility", "hidden");
            this.df.css("visibility", "hidden");
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
                    this.yjt.css("color", "#fff");
                }
                //ul移动一个li的位置
                this.ul.animate({
                    left: -($num - 4) * $(".imageMenu ul li").width()
                })
            }
        });
        //6.左键点击事件
        this.zjt.on("click", () => {
            if ($num > 4) {
                $num--;
                this.yjt.css("color", "#747474");
                if ($num === 4) {
                    this.zjt.css("color", "#fff");
                }
                this.ul.animate({
                    left: -($num - 4) * $(".imageMenu ul li").width()
                });
            }
        });

    }
}



export{
    Fdj
}