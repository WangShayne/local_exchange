import{B as T}from"./TableImg.vue_vue_type_style_index_0_lang.726e4afd.js";import{T as v}from"./BasicForm.6ac1fd9c.js";import{getBasicColumns as C}from"./ordersData.a0061c49.js";import{c as E}from"./order.09d80f7c.js";import{u as S}from"./accounts.94aaaba1.js";import{a as h,v as o,O,o as t,i as y,z as R,f as r,B as u,t as n,H as i,k as c,j as d,K as x,Z as I}from"./index.5f31fc19.js";const V=h({__name:"orders",setup(M){const{createMessage:m}=x(),f=S(),k=o(!1),B=o(!1),A=o(!0),_=o(!0),b=C(),l=o([]),D={width:150,title:"Action",dataIndex:"action"},g=e=>e==="LIMIT"?"\u9650\u4EF7":e==="MARKET"?"\u5E02\u4EF7":e==="STOP_MARKET"?"\u6B62\u635F":"";function F(e){E({id:f.id,symbol:e.symbol,orderId:e.orderId}).then(()=>{m.success({content:"\u53D6\u6D88\u8BA2\u5355\u6210\u529F"})}).catch(()=>{m.error({content:"\u53D6\u6D88\u8BA2\u5355\u5931\u8D25"})})}return O(()=>f.state,e=>{l.value=[];const{orderList:p}=I(e);l.value=p}),(e,p)=>(t(),y(d(T),{title:"\u8BA2\u5355",columns:d(b),dataSource:l.value,canResize:k.value,loading:B.value,striped:A.value,bordered:_.value,pagination:!1,actionColumn:D},{bodyCell:R(({column:a,record:s})=>[a.key==="orderType"?(t(),r(i,{key:0},[u(n(g(s.orderType)),1)],64)):c("",!0),a.key==="tradeSide"?(t(),r(i,{key:1},[u(n(s.tradeSide==="BUY"?"\u4E70\u5165":"\u5356\u51FA"),1)],64)):c("",!0),a.key==="reduceOnly"?(t(),r(i,{key:2},[u(n(s.reduceOnly?"true":"false"),1)],64)):c("",!0),a.key==="closePosition"?(t(),r(i,{key:3},[u(n(s.closePosition?"true":"false"),1)],64)):a.key==="action"?(t(),y(d(v),{key:4,actions:[{label:"\u53D6\u6D88",type:"primary",popConfirm:{title:"\u786E\u5B9A\u53D6\u6D88\u8BA2\u5355\u5417\uFF1F",confirm:F.bind(null,s)}}]},null,8,["actions"])):c("",!0)]),_:1},8,["columns","dataSource","canResize","loading","striped","bordered"]))}});export{V as _};