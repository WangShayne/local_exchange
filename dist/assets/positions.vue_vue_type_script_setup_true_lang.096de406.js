import{B as y}from"./TableImg.vue_vue_type_style_index_0_lang.6b3e07b0.js";import{T as v}from"./BasicForm.b027cf63.js";import{getBasicColumns as C}from"./positionsData.9d1917d0.js";import{u as h}from"./accounts.4c852506.js";import{a as k}from"./order.1bb7ef53.js";import{a as g,v as o,O as z,o as i,i as c,z as B,j as n,k as S,Z as w}from"./index.b177970f.js";const j=g({__name:"positions",setup(x){const s=h(),r={width:150,title:"Action",dataIndex:"action"},l=o(!1),u=o(!1),m=o(!0),d=o(!0),p=C(),a=o([]);function f(t){k({id:s.id,symbol:t.symbol,quantity:t.quantity}).then(e=>{}).catch(e=>{})}return z(()=>s.state,t=>{a.value=[];const{positionList:e}=w(t);a.value=e}),(t,e)=>(i(),c(n(y),{title:"\u4ED3\u4F4D",columns:n(p),dataSource:a.value,canResize:l.value,loading:u.value,striped:m.value,bordered:d.value,pagination:{pageSize:10},actionColumn:r},{bodyCell:B(({column:b,record:_})=>[b.key==="action"?(i(),c(n(v),{key:0,actions:[{label:"\u5E73\u4ED3",type:"primary",onClick:f.bind(null,_)}]},null,8,["actions"])):S("",!0)]),_:1},8,["columns","dataSource","canResize","loading","striped","bordered"]))}});export{j as _};
