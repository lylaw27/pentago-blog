let string1 = '「鐵路效應」帶動沿線地區樓價增長?「伊利莎伯綫」(Elizabeth Line）即將啓航 #海外移民｜英國最新2022春季預算案 5分鐘快睇 英國咩城市租盤最歡迎寵物?【主題分析】| 咩城市業主歡迎寵物?| 原來英國咁多寵物?|邊到最多寵物設施及服務?| Model Tenancy Agreement|點解雷丁係英國矽谷?【Reading雷丁篇】|M4高科技走廊?|雷丁樓價|樓價前景?|Crime Rate|咩行業蓬勃?|Business Park位置|有咩大科技巨企?|皇家郡|';
let regex1 = /[\u007b-\u007e\u005B-\u0060\u003A-\u0040\u0020-\u002F\u2000-\u206f\uff00-\uffef\u3000-\u303f\s]+/g;
let string2 = string1.replace(regex1,' ').trim()
console.log(string2)
let regex2 = /\s/g;
console.log(string2.replace(regex2,'-'))
