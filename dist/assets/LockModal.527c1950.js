var f=(e,p,s)=>new Promise((m,r)=>{var d=o=>{try{a(s.next(o))}catch(n){r(n)}},t=o=>{try{a(s.throw(o))}catch(n){r(n)}},a=o=>o.done?m(o.value):Promise.resolve(o.value).then(d,t);a((s=s.apply(e,p)).next())});import{a as w,b as y,s as $,e as _,q as F,Q as L,a1 as u,o as M,i as S,z as g,h as l,p as c,t as k,m as h,B as I,a2 as b}from"./index.5f31fc19.js";import{B as N,b as R}from"./index.8dc6644b.js";import{B as P}from"./BasicForm.6ac1fd9c.js";import{u as U}from"./useForm.8846afa5.js";import{u as V,h as q}from"./header.804c3157.js";import"./useWindowSizeFn.b02c62d1.js";import"./FullscreenOutlined.9325667f.js";/* empty css               *//* empty css               *//* empty css               *//* empty css              *//* empty css               *//* empty css               *//* empty css               */import"./index.19839385.js";import"./download.cc6a1d87.js";import"./index.54fff2c5.js";import"./uniqBy.d6f6ab87.js";const z=w({name:"LockModal",components:{BasicModal:N,BasicForm:P},setup(){const{t:e}=F(),{prefixCls:p}=y("header-lock-modal"),s=$(),m=V(),r=_(()=>{var i;return(i=s.getUserInfo)==null?void 0:i.realName}),[d,{closeModal:t}]=R(),[a,{validateFields:o,resetFields:n}]=U({showActionButtonGroup:!1,schemas:[{field:"password",label:e("layout.header.lockScreenPassword"),colProps:{span:24},component:"InputPassword",required:!0}]});function B(){return f(this,null,function*(){const C=(yield o()).password;t(),m.setLockInfo({isLock:!0,pwd:C}),yield n()})}const v=_(()=>{const{avatar:i}=s.getUserInfo;return i||q});return{t:e,prefixCls:p,getRealName:r,register:d,registerForm:a,handleLock:B,avatar:v}}});const D=["src"];function A(e,p,s,m,r,d){const t=u("BasicForm"),a=u("a-button"),o=u("BasicModal");return M(),S(o,b({footer:null,title:e.t("layout.header.lockScreen")},e.$attrs,{class:e.prefixCls,onRegister:e.register}),{default:g(()=>[l("div",{class:c(`${e.prefixCls}__entry`)},[l("div",{class:c(`${e.prefixCls}__header`)},[l("img",{src:e.avatar,class:c(`${e.prefixCls}__header-img`)},null,10,D),l("p",{class:c(`${e.prefixCls}__header-name`)},k(e.getRealName),3)],2),h(t,{onRegister:e.registerForm},null,8,["onRegister"]),l("div",{class:c(`${e.prefixCls}__footer`)},[h(a,{type:"primary",block:"",class:"mt-2",onClick:e.handleLock},{default:g(()=>[I(k(e.t("layout.header.lockScreenBtn")),1)]),_:1},8,["onClick"])],2)],2)]),_:1},16,["title","class","onRegister"])}const te=L(z,[["render",A]]);export{te as default};