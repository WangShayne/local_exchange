import{a as m,e as u,v as p,N as d,O as f,o as s,f as r,m as h,z as g,h as v,H as x,a4 as y,j as e,aW as S,t as n,cW as w,Q as B}from"./index.5f31fc19.js";import{u as L}from"./accounts.94aaaba1.js";import"./account.477e3dcf.js";const k={class:"scroll-wrap"},D={class:"mb-0"},N=m({__name:"errorLog",setup(C){const _=L(),a=u(()=>_.state),c=p(null),i=()=>{const o=e(c);if(!o)throw new Error("scroll is Null");return o},l=()=>{i().scrollBottom()};return d(()=>{l()}),f(()=>a.value,()=>{l()}),(o,E)=>(s(),r("div",k,[h(e(S),{ref_key:"scrollRef",ref:c},{default:g(()=>[v("ul",D,[(s(!0),r(x,null,y(e(a).failList,t=>(s(),r("li",{key:t.timestamp,style:{border:"1px solid #eee"}},n(e(w)(t.timestamp,"DD-MM hh:mm:ss"))+" : "+n(t.error),1))),128))])]),_:1},512)]))}});const T=B(N,[["__scopeId","data-v-330ae568"]]);export{T as default};