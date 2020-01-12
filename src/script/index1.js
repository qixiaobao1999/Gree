!function ($) {
    //轮播图
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
            //移入停止自动播放移出又运行
            this.wrap.hover(() => {
                clearInterval(this.timer);
            }, () => {
                this.autorun();
            });
            //自动轮播
            this.autorun();
        }
        //点击按钮事件
        anniu() {
            let _this = this;
            this.btns.eq(this.num).addClass("active").siblings().removeClass("active");
            this.btns.css("opacity", 0.8);
            _this.picul.stop(true, true).animate({
                left: -_this.liwidth * (_this.num)
            }, 600, function () {
                if (parseInt(_this.picul.css("left")) == -_this.liwidth * (_this.btns.length + 1)) {
                    _this.picul.css("left", -_this.liwidth + 'px');
                    _this.num = 0;
                }
                if (parseInt(_this.picul.css("left")) == 0) {
                    _this.picul.css("left", -this.left * _this.btns.length + 'px');
                    _this.num = _this.btns.length - 1;
                }
            });
        }
        //自动播放
        autorun() {
            let _this = this;
            _this.timer = setInterval(function () {
                _this.num++;
                if (_this.num == _this.btns.length) {
                    _this.btns.eq(0).addClass("active").siblings().removeClass("active");
                }
                _this.anniu();
            }, 4000);
        }
    }
    new Lbt().init();


}(jQuery);

//楼梯，楼层
!function ($) {
   //1.显示隐藏
            //获取滚轮top值
            let $scrollTop = $(window).scrollTop();
            //判断滚出top值大于等于600时出现楼梯
            if ($scrollTop >= 1100) {
                $("#louti").show();
            } else {
                $("#louti").hide();
            };

    //给每一个楼梯添加点击事件加样式,除了最后一个
    $("#louti li").not(".last").on("click", function () {
        $(this).addClass("yanse").siblings("li").removeClass("yanse");
        //点击楼梯获取楼层对应的高度赋给滚动条
        let $loucengtop = $(".louceng").eq($(this).index()).offset().top;
        $("html").animate({
            scrollTop: $loucengtop
        });
    });
    //点击回到顶部
    $(".last").on("click", function () {
        $("html").animate({
            scrollTop: 0
        });
    });
    //滚动楼层时对应得楼梯要加上背景样式
    let $scroll = function(){
        //1.显示隐藏
            //获取滚轮top值
            let $scrollTop = $(window).scrollTop();
            //判断滚出top值大于等于600时出现楼梯
            if ($scrollTop >= 1100) {
                $("#louti").show();
            } else {
                $("#louti").hide();
            };
        //获取每一个楼层的top值==当前楼层的top值加上自身高度的top值-遍历
        $(".louceng").each(function(index,element){
            let $loucengtop = $(".louceng").eq(index).offset().top + 
            $(".louceng").eq(index).height();

        //判断，如果楼层得高度+自身得高度大于滚动条得高度，给当前符合添加得楼梯添加样式
            if($loucengtop >= $scrolltop){
                //先去除所有楼梯得样式
                $("#louti li").not(".last").removeClass("yanse");
                $("#louti li").not(".last").eq(index).addClass("yanse");

                //去除默认行为
                return false;
    }
    });
}
    $(window).on("scroll", $scroll);
    $scroll();
}(jQuery);