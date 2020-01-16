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


export{
    render
}