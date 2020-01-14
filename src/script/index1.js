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


//楼梯，楼层
//1.显示隐藏
//获取滚轮top值
function louti() {
    let $scrollTop = $(window).scrollTop();
    //判断滚出top值大于等于600时出现楼梯
    if ($scrollTop >= 1000) {
        $("#louti").show();
    } else {
        $("#louti").hide();
    };

    //1.给每个楼梯添加点击事件除了最后一个
    $("#louti li").not(".last").on("click", function () {
        $(window).off("scroll", $scroll);
        //给当前点击得楼梯添加背景样式，其它的清除样式
        $(this).addClass("yanse").siblings("li").removeClass("yanse");
        //点击当前楼梯获取对应的楼层top值,利用索引实现
        let $loucengtop = $(".louceng").eq($(this).index()).offset().top;
        $("html").animate({
            scrollTop: $loucengtop //移动的是滚动条带动楼层的位置
        });
    });
    //2.点击回到顶部，也是滚动条的top值实现的
    $(".last").on("click", function () {
        $("html").animate({
            scrollTop: 0
        });
    });

    //4.滚动鼠标获取楼层对应的楼梯,给对应的楼梯添加背景样式
    let $scroll = function () {
        // 4.1滚动的时候楼梯显示隐藏
        let $scrollTop = $(window).scrollTop();
        if ($scrollTop >= 1000) {
            $("#louti").show();
        } else {
            $("#louti").hide();
        };
        //获取每一个楼层的top值==当前楼层的top值加上自身高度的top值-遍历
        $(".louceng").each(function (index, element) {
            let $loucengtop = $(".louceng").eq(index).offset().top + $(".louceng").eq(index).height();
            //判断当前楼层的top值大不大于滚动条的top值
            if ($loucengtop >= $scrollTop) {
                //满足条件就跟当前楼层对应的楼梯添加背景样式，不过先得清除所有楼梯的样式
                $("#louti li").not(".last").removeClass("yanse");//清除样式
                $("#louti li").not(".last").eq(index).addClass("yanse");//当前楼层对应的楼梯，利用索引给对应的楼梯添加样式
                return false //然后终止循环
            }
        });
    };
    $(window).on("scroll", $scroll);
    $scroll();
}


//数据渲染
class render {
    constructor() {
        this.ul = $(".ul1");
    }
    init() {
        // http://10.31.152.37/Gree/php/index1.php --接口
        $.ajax({
            url:"http://10.31.152.37/Gree/php/index1.php",
            dataType:"json"
        }).done((data)=>{
            let strHTML = "";
        $.each(data,function(index,value){
            strHTML += `
                <li class="lis">
                <a href='details.html?sid=${value.sid}' target="_blank">
                    <img src='${value.url}'>
                    <h4>${value.title}</h4>
                    <p>${value.title1}</p>
                    <span>${value.pice}</span>
                </a>
                </li>
            `;
        });
            this.ul.html(strHTML);
        });
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
    louti();
    new render().init();
    introduce();
}

export {
    Page
}