class log{
    constructor(){

    }
    init(){

    }
}








function commonality() {
    //引入的公共结构 
    $("#footer").load("footer.html");//尾部相同的结构
}

function login(){
    commonality()
    new log().init();
}

export{
    login
}