var F=(A,d,o)=>new Promise((l,p)=>{var f=t=>{try{e(o.next(t))}catch(a){p(a)}},u=t=>{try{e(o.throw(t))}catch(a){p(a)}},e=t=>t.done?l(t.value):Promise.resolve(t.value).then(f,u);e((o=o.apply(A,d)).next())});import{b as x,B as D}from"./index.8dc6644b.js";import{u as E,c as I,g as U}from"./account.477e3dcf.js";import{a as N,v as B,w as O,a1 as y,o as C,i as M,z as m,f as P,m as n,k,a2 as R,j as L,K as V,Q as h}from"./index.5f31fc19.js";import"./useWindowSizeFn.b02c62d1.js";import"./FullscreenOutlined.9325667f.js";const j={key:0,class:"empty-tips"},z=N({__name:"accountsModel",emits:["modelClose","register"],setup(A,{emit:d}){const o=B(!0),l=B(!1),{createMessage:p}=V(),{success:f}=p,u=B("\u65B0\u5EFA\u8D26\u6237"),e=O({id:"",name:"",apiKey:"",secretKey:""}),[t,{setModalProps:a,closeModal:g}]=x(_=>F(this,null,function*(){e.id="",e.name="",e.apiKey="",e.secretKey="",o.value=!0;const{updateMode:s}=_;if(s){u.value="\u7F16\u8F91\u8D26\u6237";const{data:{id:v,name:c,apiKey:r}}=_,K=yield U(v);l.value=!0,e.id=v,e.name=c,e.apiKey=r,e.secretKey=K.secret_key}else u.value="\u65B0\u5EFA\u8D26\u6237",l.value=!1;o.value=!1})),b=()=>{l.value?(a({confirmLoading:!0}),E(e).then(()=>{f("\u66F4\u65B0\u6210\u529F"),a({confirmLoading:!1}),d("modelClose"),g()}).catch(()=>{a({confirmLoading:!1})})):(a({confirmLoading:!0}),I(e).then(()=>{f("\u521B\u5EFA\u6210\u529F"),a({confirmLoading:!1}),d("modelClose"),g()}).catch(()=>{a({confirmLoading:!1})}))},w=()=>{g()};return(_,s)=>{const v=y("a-spin"),c=y("a-input"),r=y("a-form-item"),K=y("a-form");return C(),M(L(D),R(_.$attrs,{destroyOnClose:"",onRegister:L(t),title:u.value,onOk:b,onCancel:w}),{default:m(()=>[o.value?(C(),P("div",j,[n(v)])):k("",!0),o.value?k("",!0):(C(),M(K,{key:1,model:e,"label-col":{span:4},"wrapper-col":{span:14}},{default:m(()=>[n(r,{label:"\u522B\u540D"},{default:m(()=>[n(c,{value:e.name,"onUpdate:value":s[0]||(s[0]=i=>e.name=i)},null,8,["value"])]),_:1}),n(r,{label:"apiKey"},{default:m(()=>[n(c,{value:e.apiKey,"onUpdate:value":s[1]||(s[1]=i=>e.apiKey=i)},null,8,["value"])]),_:1}),n(r,{label:"secretKey"},{default:m(()=>[n(c,{value:e.secretKey,"onUpdate:value":s[2]||(s[2]=i=>e.secretKey=i)},null,8,["value"])]),_:1})]),_:1},8,["model"]))]),_:1},16,["onRegister","title"])}}});const J=h(z,[["__scopeId","data-v-55a8864a"]]);export{J as default};
