class log {
    constructor() {
        this.username = $(".username");
        this.password = $(".password");
        this.login = $(".login");
    }
    init() {
        this.login.on("click", () => {
            $.ajax({
                type: "post",
                url: "http://10.31.152.37/Gree/php/login.php",
                data: {
                    user: this.username.val(),
                    pass: this.password.val()
                }
            }).done((result) => {
                if (result) { //匹配成功
                    location.href = 'index.html';
                    localStorage.setItem('username', this.username.val());
                } else { //匹配失败
                    this.password.val('');
                    alert('用户名或者密码错误');
                }
            });
        });
    }
}








function commonality() {
    //引入的公共结构 
    $("#footer").load("footer.html");//尾部相同的结构
}

function login() {
    commonality()
    new log().init();
}

export {
    login
}