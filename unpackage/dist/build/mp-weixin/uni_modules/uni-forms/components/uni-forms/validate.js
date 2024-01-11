"use strict";var e={email:/^\S+?@\S+?\.\S+?$/,idcard:/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,url:new RegExp("^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$","i")};const t={int:"integer",bool:"boolean",double:"number",long:"number",password:"string"};function a(e,t=""){["label"].forEach((t=>{void 0===e[t]&&(e[t]="")}));let a=t;for(let r in e){let t=new RegExp("{"+r+"}");a=a.replace(t,e[r])}return a}const r={integer:e=>r.number(e)&&parseInt(e,10)===e,string:e=>"string"==typeof e,number:e=>!isNaN(e)&&"number"==typeof e,boolean:function(e){return"boolean"==typeof e},float:function(e){return r.number(e)&&!r.integer(e)},array:e=>Array.isArray(e),object:e=>"object"==typeof e&&!r.array(e),date:e=>e instanceof Date,timestamp(e){return!(!this.integer(e)||Math.abs(e).toString().length>16)},file:e=>"string"==typeof e.url,email:t=>"string"==typeof t&&!!t.match(e.email)&&t.length<255,url:t=>"string"==typeof t&&!!t.match(e.url),pattern(e,t){try{return new RegExp(e).test(t)}catch(a){return!1}},method:e=>"function"==typeof e,idcard:t=>"string"==typeof t&&!!t.match(e.idcard),"url-https"(e){return this.url(e)&&e.startsWith("https://")},"url-scheme":e=>e.startsWith("://"),"url-web":e=>!1};const n={required:(e,t,r)=>e.required&&function(e,t){return null==e||"string"==typeof e&&!e||!(!Array.isArray(e)||e.length)||"object"===t&&!Object.keys(e).length}(t,e.format||typeof t)?a(e,e.errorMessage||r.required):null,range(e,t,n){const{range:i,errorMessage:l}=e;let s=new Array(i.length);for(let a=0;a<i.length;a++){const e=i[a];r.object(e)&&void 0!==e.value?s[a]=e.value:s[a]=e}let u=!1;return Array.isArray(t)?u=new Set(t.concat(s)).size===s.length:s.indexOf(t)>-1&&(u=!0),u?null:a(e,l||n.enum)},rangeNumber(e,t,n){if(!r.number(t))return a(e,e.errorMessage||n.pattern.mismatch);let{minimum:i,maximum:l,exclusiveMinimum:s,exclusiveMaximum:u}=e,m=s?t<=i:t<i,o=u?t>=l:t>l;return void 0!==i&&m?a(e,e.errorMessage||n.number[s?"exclusiveMinimum":"minimum"]):void 0!==l&&o?a(e,e.errorMessage||n.number[u?"exclusiveMaximum":"maximum"]):void 0!==i&&void 0!==l&&(m||o)?a(e,e.errorMessage||n.number.range):null},rangeLength(e,t,n){if(!r.string(t)&&!r.array(t))return a(e,e.errorMessage||n.pattern.mismatch);let i=e.minLength,l=e.maxLength,s=t.length;return void 0!==i&&s<i?a(e,e.errorMessage||n.length.minLength):void 0!==l&&s>l?a(e,e.errorMessage||n.length.maxLength):void 0!==i&&void 0!==l&&(s<i||s>l)?a(e,e.errorMessage||n.length.range):null},pattern:(e,t,n)=>r.pattern(e.pattern,t)?null:a(e,e.errorMessage||n.pattern.mismatch),format(e,n,i){var l=Object.keys(r),s=t[e.format]?t[e.format]:e.format||e.arrayType;return l.indexOf(s)>-1&&!r[s](n)?a(e,e.errorMessage||i.typeError):null},arrayTypeFormat(e,t,r){if(!Array.isArray(t))return a(e,e.errorMessage||r.typeError);for(let a=0;a<t.length;a++){const n=t[a];let i=this.format(e,n,r);if(null!==i)return i}return null}};class i extends class{constructor(e){this._message=e}async validateRule(e,t,a,r,i){var l=null;let s=t.rules;if(s.findIndex((e=>e.required))<0){if(null==a)return l;if("string"==typeof a&&!a.length)return l}var u=this._message;if(void 0===s)return u.default;for(var m=0;m<s.length;m++){let o=s[m],g=this._getValidateType(o);if(Object.assign(o,{label:t.label||`["${e}"]`}),n[g]&&null!=(l=n[g](o,a,u)))break;if(o.validateExpr){let e=Date.now();if(!1===o.validateExpr(a,i,e)){l=this._getMessage(o,o.errorMessage||this._message.default);break}}if(o.validateFunction&&null!==(l=await this.validateFunction(o,a,r,i,g)))break}return null!==l&&(l=u.TAG+l),l}async validateFunction(e,t,a,r,n){let i=null;try{let l=null;const s=await e.validateFunction(e,t,r||a,(e=>{l=e}));(l||"string"==typeof s&&s||!1===s)&&(i=this._getMessage(e,l||s,n))}catch(l){i=this._getMessage(e,l.message,n)}return i}_getMessage(e,t,r){return a(e,t||e.errorMessage||this._message[r]||t.default)}_getValidateType(e){var t="";return e.required?t="required":e.format?t="format":e.arrayType?t="arrayTypeFormat":e.range?t="range":void 0!==e.maximum||void 0!==e.minimum?t="rangeNumber":void 0!==e.maxLength||void 0!==e.minLength?t="rangeLength":e.pattern?t="pattern":e.validateFunction&&(t="validateFunction"),t}}{constructor(e,t){super(i.message),this._schema=e,this._options=t||null}updateSchema(e){this._schema=e}async validate(e,t){let a=this._checkFieldInSchema(e);return a||(a=await this.invokeValidate(e,!1,t)),a.length?a[0]:null}async validateAll(e,t){let a=this._checkFieldInSchema(e);return a||(a=await this.invokeValidate(e,!0,t)),a}async validateUpdate(e,t){let a=this._checkFieldInSchema(e);return a||(a=await this.invokeValidateUpdate(e,!1,t)),a.length?a[0]:null}async invokeValidate(e,t,a){let r=[],n=this._schema;for(let i in n){let l=n[i],s=await this.validateRule(i,l,e[i],e,a);if(null!=s&&(r.push({key:i,errorMessage:s}),!t))break}return r}async invokeValidateUpdate(e,t,a){let r=[];for(let n in e){let i=await this.validateRule(n,this._schema[n],e[n],e,a);if(null!=i&&(r.push({key:n,errorMessage:i}),!t))break}return r}_checkFieldInSchema(e){var t=Object.keys(e),r=Object.keys(this._schema);if(new Set(t.concat(r)).size===r.length)return"";var n=t.filter((e=>r.indexOf(e)<0));return[{key:"invalid",errorMessage:a({field:JSON.stringify(n)},i.message.TAG+i.message.defaultInvalid)}]}}i.message=new function(){return{TAG:"",default:"验证错误",defaultInvalid:"提交的字段{field}在数据库中并不存在",validateFunction:"验证无效",required:"{label}必填",enum:"{label}超出范围",timestamp:"{label}格式无效",whitespace:"{label}不能为空",typeError:"{label}类型无效",date:{format:"{label}日期{value}格式无效",parse:"{label}日期无法解析,{value}无效",invalid:"{label}日期{value}无效"},length:{minLength:"{label}长度不能少于{minLength}",maxLength:"{label}长度不能超过{maxLength}",range:"{label}必须介于{minLength}和{maxLength}之间"},number:{minimum:"{label}不能小于{minimum}",maximum:"{label}不能大于{maximum}",exclusiveMinimum:"{label}不能小于等于{minimum}",exclusiveMaximum:"{label}不能大于等于{maximum}",range:"{label}必须介于{minimum}and{maximum}之间"},pattern:{mismatch:"{label}格式不匹配"}}},exports.SchemaValidator=i;
