function e(){return[{title:"\u5355\u5411/\u53CC\u5411",dataIndex:"direction"},{title:"\u9010\u4ED3/\u5168\u4ED3",dataIndex:"marginMode"},{title:"\u6760\u6746",dataIndex:"leverage"},{title:"\u5E02\u4EF7\u53EF\u4E70\u6570\u91CF",dataIndex:"marketBuy"},{title:"\u5E02\u4EF7\u53EF\u5356\u6570\u91CF",dataIndex:"marketSell"}]}function r(){return(()=>{const t=[];for(let a=0;a<1;a++)t.push({direction:Math.random()*1>.5?"\u5355\u5411":"\u53CC\u5411",marginMode:Math.random()*1>.5?"\u9010\u4ED3":"\u5168\u4ED3",leverage:`x${Math.floor(Math.random()*5)}`,marketBuy:Math.random()*1e3,marketSell:Math.random()*1e3});return t})()}export{e as getBasicColumns,r as getBasicData};