import{bf as o}from"./index.5f31fc19.js";function u(e,r="modal"){return o.post({url:"/account",params:e},{errorMessageMode:r})}function c(e,r="modal"){return o.post({url:`/account/${e.id}`,params:e},{errorMessageMode:r})}function n(e,r="modal"){return o.get({url:"/account/",params:e},{errorMessageMode:r})}function a(e,r="modal"){return e.name===""?o.get({url:"/accounts"},{errorMessageMode:r}):o.get({url:`/accounts/${e.name}`},{errorMessageMode:r})}function s(e="modal"){return o.get({url:"/accounts"},{errorMessageMode:e})}function d(e,r="modal"){return o.delete({url:`/account/${e.id}`},{errorMessageMode:r})}export{s as a,a as b,u as c,d,n as g,c as u};