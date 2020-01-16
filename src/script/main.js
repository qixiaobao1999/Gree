import "jquery";

import {Page} from "./index1.js";//首页
Page();
import {louti} from "./louti.js";//楼梯
new louti().init();
import {render} from "./render.js";//渲染
new render().init();

import {xqy} from "./details.js";//详情页
xqy();
import {Fdj} from "./fdj.js";//放大镜
new Fdj().init();

import {cartlist} from "./cartlist.js";//购物车
cartlist();

import{login} from "./login.js";//登录
login();

import{registry} from "./registry.js";//注册
registry();