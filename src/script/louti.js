//楼梯，楼层
//1.显示隐藏
//获取滚轮top值
class louti {
    constructor() {

    }
    init() {
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
}


export{
    louti
}