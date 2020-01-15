class Gwc {
    constructor() {
        this.list = $(".wrap_zhong");
    }
    init() {
        //1.获取本地存储
        if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
            let csid = localStorage.getItem('cartsid').split(','); //sid
            let cnum = localStorage.getItem('cartnum').split(','); //数量
            for (let i = 0; i < csid.length; i++) {
                this.render(csid[i], cnum[i]);
            }
        }
    }
    //2.渲染一条数据
    render(sid, num) {
        $.ajax({
            url: "http://10.31.152.37/Gree/php/index1.php",
            dataType: "json"
        }).done((data) => {
            $.each(data, (index, value) => {
                if (sid == value.sid) {
                    let $zhong = $(".zhong:hidden").clone(true, true);
                    $zhong.find(".pad_img img").attr("src", value.url);
                    $zhong.find(".pad_img img").attr("sid", value.sid);
                    $zhong.find(".pad_name a").html(value.title);
                    $zhong.find(".pan_pice a").html(value.pice);
                    $zhong.find(".pan_div input").val(num);
                    $zhong.find(".pan_heji strong").html((value.pice * num).toFixed(2));
                    $zhong.show();
                    $(".wrap_zhong").append($zhong);
                    this.allprice();
                    this.allselect();
                    this.valuechange();
                    this.delgoods();
                }
            });
        });
    }
    //3.计算总价
    allprice() {
        let $goodsnum = 0; //商品的件数
        let $goodsprice = 0; //商品的总价
        $(".zhong:visible").each(function (index, element) {
            if ($(element).find("input:checkbox").is(":checked")) {
                $goodsnum += parseInt($(element).find(".pan_div input").val());
                $goodsprice += parseFloat($(element).find(".pan_heji strong").html());
            }
        });
        $('#spnum').html($goodsnum);
        $('#zongji').html('￥' + ($goodsprice).toFixed(2));
    }
    //4.input全选事件
    allselect() {
        $('#in1').on('change', () => {
            $('.zhong:visible').find('input:checkbox').prop('checked', $('#in1').prop('checked'));
            this.allprice(); //求和
        });
        let $checkinput = $('.zhong:visible').find('input:checkbox'); //委托的元素。
        $('.wrap_zhong').on('click', $checkinput, () => {
            let $inputs = $('.zhong:visible').find('input:checkbox');
            if ($('.zhong:visible').find('input:checked').length === $inputs.length) {
                $('#in1').prop('checked', true);
            } else {
                $('#in1').prop('checked', false);
            }
            this.allprice(); //求和
            this.delgoods();
        });
    }

    //6.文本框值的改变
    valuechange() {
        //++
        $('.youjia').on('click', function () {
            let $num = $(this).prev('input').val();
            $num++;
            $(this).prev('input').val($num);
            $(this).parents('.listBox').find('.pan_heji strong').html(singleprice($(this))); //求单价
            local($(this).parents('.listBox').find('.pad_img img').attr('sid'), $num); //存储数量
        });
        //--
        $('.zuojia').on('click', function () {
            let $num = $(this).next('input').val();
            $num--;
            if ($num < 1) {
                $num = 1;
            }
            $(this).next('input').val($num);
            $(this).parents('.listBox').find('.pan_heji strong').html(singleprice($(this)));
            local($(this).parents('.listBox').find('.pad_img img').attr('sid'), $num);
        });
        //直接输入
        $('.pan_div input').on('input', function () {
            let $reg = /^\d+$/;
            let $inputvlaue = $(this).val();
            if ($reg.test($(this).val())) {
                if ($inputvlaue < 1) {
                    $(this).val(1)
                } else {
                    $(this).val($(this).val())
                }
            } else {
                $(this).val(1);
            }
            $(this).parents('.listBox').find('.pan_heji strong').html(singleprice($(this)));
            local($(this).parents('.listBox').find('.pad_img img').attr('sid'), $(this).val());
        });
        //6.1封装计算合计
        function singleprice(obj) {
            let $dj = parseFloat(obj.parents('.listBox').find('.pan_pice a').html());
            let $count = parseFloat(obj.parents('.listBox').find('.pan_div input').val());
            return $dj * $count.toFixed(2);
        }
        //改变数量--重新本地存储。
        //通过sid获取数量的位置，将当前改变的值存放到对应的位置。
        function local(sid, value) { //sid:当前的索引   value：数量
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                let arrsid = localStorage.getItem('cartsid').split(',');
                let arrnum = localStorage.getItem('cartnum').split(',');
                let index = $.inArray(sid, arrsid); //sid在数组中的位置索引。
                arrnum[index] = value;
                localStorage.setItem('cartnum', arrnum.toString());
            }
        }
    }
    //删除
    delgoods() {
        let arrsid = [];
        let arrnum = [];
        let _this = this;

        function getstorage() {
            if (localStorage.getItem('cartsid') && localStorage.getItem('cartnum')) {
                arrsid = localStorage.getItem('cartsid').split(',');
                arrnum = localStorage.getItem('cartnum').split(',');
            }
        }
        //删除本地存储数组项的值。确定删除的索引。
        function delstorage(sid, arrsid) { //sid:删除的索引，sidarr:数组   delstorage(3,[2,3,4,5])
            let $index = -1;
            $.each(arrsid, function (index, value) {
                if (sid === value) {
                    $index = index; //接收索引值。  
                }
            });

            arrsid.splice($index, 1);
            arrnum.splice($index, 1);
            localStorage.setItem('cartsid', arrsid.toString());
            localStorage.setItem('cartnum', arrnum.toString());
        }
        //单条删除
        $('.wrap_zhong').on('click', '.pan_caozuo a', function () {
            getstorage(); //取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗?')) {
                $(this).parents('.zhong').remove();
            }
            delstorage($(this).parents('.zhong').find('.pad_img img').attr('sid'), arrsid);
            _this.allprice();
        });
        //删除选中
        $('.xmleft a').on('click', function () {
            getstorage(); //取出本地存储，转换成数组。
            if (window.confirm('你确定要删除吗?')) {
                $('.zhong:visible').each(function (index, element) {
                    if ($(this).find('input:checkbox').is(':checked')) {
                        $(this).remove();
                    }
                    delstorage($(this).find('.pad_img img').attr('sid'), arrsid);
                });
            }
            _this.allprice();
        });
    }
}






function introduce() {
    $("#top").load("top.html");//顶部相同的结构
    $("#header").load("header.html");//头部相同的结构
    $("#footer").load("footer.html");//尾部相同的结构
}

function cartlist() {
    introduce();
    new Gwc().init();
}

export {
    cartlist
}