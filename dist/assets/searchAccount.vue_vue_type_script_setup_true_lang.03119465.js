import{A as f,B as d}from"./BasicForm.b027cf63.js";import{b as h}from"./account.17fe5e66.js";import{u as _}from"./accounts.4c852506.js";import{a as A,v as n,e as S,N as v,o as B,i as C,z as F,m as E,j as a,aL as D}from"./index.b177970f.js";const N=A({__name:"searchAccount",setup(b){const o=_(),t=n(""),c=S(()=>({name:a(t)})),s=n(null),l=[{field:"field32",component:"Input",label:"\u8D26\u6237",helpMessage:["\u4EA4\u6613\u8D26\u6237","\u4E0B\u62C9\u9009\u62E9\u6216\u8F93\u5165\u641C\u7D22\u4EA4\u6613\u8D26\u6237"],required:!0,slot:"remoteSearch",colProps:{span:24},defaultValue:""}],i=D(e=>{!e||(t.value=e)},500),p=e=>{o.setActiveAccountId(e)};return v(()=>{var e;(e=s.value)==null||e.setFieldsValue({field32:o.id})}),(e,g)=>(B(),C(a(d),{ref_key:"formElRef",ref:s,showActionButtonGroup:!1,schemas:l,actionColOptions:{span:24}},{remoteSearch:F(({model:r,field:u})=>[E(a(f),{api:a(h),showSearch:"",value:r[u],"onUpdate:value":m=>r[u]=m,filterOption:!1,resultField:"list",labelField:"name",valueField:"trader_id",params:a(c),immediate:!0,onSearch:a(i),onChange:p},null,8,["api","value","onUpdate:value","params","onSearch"])]),_:1},512))}});export{N as _};
