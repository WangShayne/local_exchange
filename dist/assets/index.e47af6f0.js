var k=(h,l,e)=>new Promise((t,m)=>{var f=r=>{try{i(e.next(r))}catch(a){m(a)}},d=r=>{try{i(e.throw(r))}catch(a){m(a)}},i=r=>r.done?t(r.value):Promise.resolve(r.value).then(f,d);i((e=e.apply(h,l)).next())});import{bf as x,a as T,v as L,q as D,cV as A,O as B,Y as R,L as V,a1 as I,o as u,f as _,H as S,a4 as j,x as M,y as N,m as s,j as o,z as n,B as y,t as b,i as H,k as $}from"./index.b177970f.js";import{_ as q}from"./DetailModal.vue_vue_type_script_setup_true_lang.73ce42c4.js";import{B as z}from"./TableImg.vue_vue_type_style_index_0_lang.6b3e07b0.js";import{T as F}from"./BasicForm.b027cf63.js";import{u as O}from"./useTable.94672f7b.js";import{u as Y}from"./index.ff0956d6.js";import{getColumns as G}from"./data.8f9e2920.js";import"./index.f63aaf24.js";/* empty css              */import"./useForm.a367b025.js";import"./index.317e9de6.js";/* empty css               *//* empty css                */import"./useWindowSizeFn.78349dcf.js";import"./useContentViewHeight.3d0ad737.js";/* empty css               *//* empty css               *//* empty css               *//* empty css               */import"./RedoOutlined.877feae7.js";import"./FullscreenOutlined.a7d9ff84.js";/* empty css               */import"./index.74f17ea1.js";/* empty css               *//* empty css               */import"./index.d9850e70.js";import"./download.34a57644.js";import"./index.27a68898.js";import"./uniqBy.cea23472.js";const J=()=>x.get({url:"/error"}),K={class:"p-4"},P=["src"],xr=T({__name:"index",setup(h){const l=L(),e=L([]),{t}=D(),m=A(),[f,{setTableData:d}]=O({title:t("sys.errorLog.tableTitle"),columns:G(),actionColumn:{width:80,title:"Action",dataIndex:"action"}}),[i,{openModal:r}]=Y();B(()=>m.getErrorLogInfoList,c=>{R(()=>{d(V(c))})},{immediate:!0});function a(c){l.value=c,r(!0)}function C(){throw new Error("fire vue error!")}function E(){e.value.push(`${new Date().getTime()}.png`)}function v(){return k(this,null,function*(){yield J()})}return(c,Q)=>{const g=I("a-button");return u(),_("div",K,[(u(!0),_(S,null,j(e.value,p=>M((u(),_("img",{key:p,src:p,alt:""},null,8,P)),[[N,!1]])),128)),s(q,{info:l.value,onRegister:o(i)},null,8,["info","onRegister"]),s(o(z),{onRegister:o(f),class:"error-handle-table"},{toolbar:n(()=>[s(g,{onClick:C,type:"primary"},{default:n(()=>[y(b(o(t)("sys.errorLog.fireVueError")),1)]),_:1}),s(g,{onClick:E,type:"primary"},{default:n(()=>[y(b(o(t)("sys.errorLog.fireResourceError")),1)]),_:1}),s(g,{onClick:v,type:"primary"},{default:n(()=>[y(b(o(t)("sys.errorLog.fireAjaxError")),1)]),_:1})]),bodyCell:n(({column:p,record:w})=>[p.key==="action"?(u(),H(o(F),{key:0,actions:[{label:o(t)("sys.errorLog.tableActionDesc"),onClick:a.bind(null,w)}]},null,8,["actions"])):$("",!0)]),_:1},8,["onRegister"])])}}});export{xr as default};
