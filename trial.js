let string1 = '🥇Zone 1及2 租金大幅下調 ，吸引力大增';
let regex1 = /[\u2700-\u27BF\uE000-\uF8FF\uD83C\uDC00-\uDFFF\uD83D\uDC00-\uDFFF\u2011-\u26FF\uD83E\uDD10-\uDDFF\u007b-\u007e\u005B-\u0060\u003A-\u0040\u0020-\u002F\u2000-\u206f\uff00-\uffef\u3000-\u303f\s]+/g;
let string2 = string1.replace(regex1,' ').trim()
console.log(string2)
let regex2 = /\s/g;
console.log(string2.replace(regex2,'-'))
