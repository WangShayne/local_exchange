function a(){return[{title:"ID",dataIndex:"orderId",defaultHidden:!0},{title:"\u7C7B\u578B",dataIndex:"orderType"},{title:"\u4EA4\u6613\u5BF9",dataIndex:"symbol"},{title:"\u65B9\u5411",dataIndex:"tradeSide"},{title:"\u4EF7\u683C",dataIndex:"price"},{title:"\u6570\u91CF",dataIndex:"quantity"},{title:"\u53EA\u51CF\u4ED3",dataIndex:"reduceOnly"},{title:"\u5168\u90E8\u5E73\u4ED3",dataIndex:"closePosition"}]}function d(){return(()=>{const t=[];for(let e=0;e<100;e++)t.push({type:Math.random()*1>.5?"\u9650\u4EF7":"\u5E02\u4EF7",direction:Math.random()*1>.5?"\u4E70\u5165":"\u5356\u51FA",price:Math.random()*1e3,amount:Math.random()*1e3});return t})()}export{a as getBasicColumns,d as getBasicData};
