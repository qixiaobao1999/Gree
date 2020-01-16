// //轮播图
class Lbt {
    constructor() {
        this.wrap = $("#slideshow");
        this.picul = $("#slideshow ul");//ul
        this.piclist = $("#slideshow ul li");//li
        this.btns = $("#slideshow ol li");//按钮
        this.liwidth = this.piclist.eq(0).width();//一个li的宽度
        this.num = 0;
        this.timer = null;
    }
    init() {
        let _this = this;
        let $fistpic = this.piclist.first().clone()//克隆第一张图片放到最后面
        this.picul.append($fistpic);
        //重新获取li的长度
        this.piclist = $("#slideshow ul li");
        //重新获取ul的宽度
        this.picul.css('width', this.liwidth * this.piclist.length);
        // //给按钮添加点击事件
        this.btns.on("click", function () {
            _this.num = $(this).index();//存一下索引
            _this.anniu();
        })
        this.timer = setInterval(() => {
            this.num++;
            this.anniu();
        }, 3000)
        // 移入停止自动播放移出又运行
        this.wrap.hover(() => {
            clearInterval(this.timer);
        }, () => {
            this.timer = setInterval(() => {
                this.num++;
                this.anniu();
            }, 3000)
        })

    }
    //点击按钮事件
    anniu() {
        if (this.num == 5) {
            this.btns.removeClass('active');
            this.btns.first().addClass("active");
        } else {
            this.btns.removeClass('active');
            this.btns.eq(this.num).addClass("active");
        }
        this.picul.stop().animate({
            left: -this.liwidth * this.num
        }, () => {
            if (this.num >= this.btns.length) {
                this.num = 0;
                this.picul.css({
                    left: 0
                })
            }
        })
    }
}









//引入得公共结构
function introduce() {
    $("#top").load("top.html");//顶部相同的结构
    $("#header").load("header.html");//头部相同的结构
    $("#footer").load("footer.html");//尾部相同的结构
}



function Page() {
    new Lbt().init();
    introduce();
}

export {
    Page
}