(this.webpackJsonpclientui=this.webpackJsonpclientui||[]).push([[0],{61:function(e,t,a){e.exports=a(74)},66:function(e,t,a){},67:function(e,t,a){},74:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(8),o=a.n(l),c=(a(66),a(67),a(68),a(45)),i=a(46),m=a(51),u=a(47),s=a(52),y=a(127),p=a(122),f=a(126),d=a(121),k=a(119),E=a(49),h=a.n(E),g=a(50),v=a.n(g),b=a(38),N=a.n(b),C=a(75),S=a(118),x=a(111),F=a(115),w=a(116),B=a(117),O=a(123),j=a(124),A=a(125),D=a(120),P=function(e){return"http://localhost:5000/api/".concat(e)},I=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).loadFiles=function(){fetch(P("form")).then((function(e){return e.json()})).then((function(e){return a.setState({filelist:e})})).catch((function(e){return console.error("Fetch file list error:",e)}))},a.openFile=function(e){"1022"===e&&fetch(P("form/".concat(e))).then((function(e){return e.json()})).then((function(t){for(var n=[],r=0;r<t;r++)n.push(r+1);a.setState({fileid:e,pages:n},(function(){a.handleNext()}))})).catch((function(e){return console.error("Open file error:",e)}))},a.openPage=function(e){3===e&&fetch(P("form/".concat(a.state.fileid,"/").concat(e))).then((function(e){return e.json()})).then((function(t){var n={};t.forEach((function(e){n[e.key]=e.value})),a.setState({form3data:n,pageindex:e},(function(){a.handleNext()}))})).catch((function(e){return console.error("Open page error:",e)}))},a.f3=function(e){var t=a.state.form3data[e];return null===t?"":t},a.s3=function(e,t){var n=a.state.form3data;n[e]=t,a.setState({form3data:n})},a.getStepContent=function(e){switch(e){case 0:return r.a.createElement(x.a,{component:"nav"},a.state.filelist.map((function(e){return r.a.createElement(F.a,{button:!0,key:"file-".concat(e),onClick:function(t){return a.openFile(e)}},r.a.createElement(w.a,null,r.a.createElement(h.a,{fontSize:"large",color:"1022"===e?"primary":"secondary"})),r.a.createElement(B.a,{primary:"File ".concat(e),secondary:"1022"===e&&"Click here..."}))})));case 1:return r.a.createElement(x.a,{component:"nav"},r.a.createElement(F.a,{button:!0,onClick:a.handleBack},r.a.createElement(w.a,null,r.a.createElement(N.a,{fontSize:"large",color:"primary"})),r.a.createElement(B.a,{primary:"Back to File List"})),a.state.pages.map((function(e){return r.a.createElement(F.a,{button:!0,key:"page-".concat(e),onClick:function(t){return a.openPage(e)}},r.a.createElement(w.a,null,r.a.createElement(v.a,{fontSize:"large",color:3===e?"primary":"secondary"})),r.a.createElement(B.a,{primary:"Page ".concat(e),secondary:3===e&&"Click here..."}))})));case 2:return r.a.createElement("div",null,r.a.createElement(x.a,{component:"nav"},r.a.createElement(F.a,{button:!0,onClick:a.handleBack},r.a.createElement(w.a,null,r.a.createElement(N.a,{fontSize:"large",color:"primary"})),r.a.createElement(B.a,{primary:"Back to File List"}))),r.a.createElement("div",{className:"typography1"},"1. Your Full Name",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.name.fam",title:"Family Name"},{key:"ap.name.giv",title:"Given Names"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"2. Date of birth",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.dob",title:"Birthday"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",type:"date",label:e.title,defaultValue:"2017-05-24",value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"3. Place of birth",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.birth.town",title:"Town/city"},{key:"ap.birth.cntry",title:"Country"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"4. Relationship status",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.marital.mar",title:"Married"},{key:"ap.marital.eng",title:"Engaged"},{key:"ap.marital.daf",title:"De facto"},{key:"ap.marital.sep",title:"Separated"},{key:"ap.marital.div",title:"Divorced"},{key:"ap.marital.wid",title:"Widowed"},{key:"ap.marital.nev.mar",title:"Never married or been in a de facto relationship"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(j.a,{checked:"yes"===a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.checked?"yes":"no")},color:"primary"}),label:e.title})})))),r.a.createElement("div",{className:"typography1"},"5. Details from your passport",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.pass.no",title:"Passport number"},{key:"ap.pass.cntry",title:"Country of passport"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"6. Details of identity card or identity number issued to you by your government (if applicable) eg. National identity card.",r.a.createElement("br",null),r.a.createElement("b",null,"Note:")," If you are the holder of multiple identity numbers because you are a citizen of more than one country, you need to enter the identity number on the card from the country that you live in.",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.ident.no",title:"Identity number"},{key:"ap.ident.cntry",title:"Country of issue"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"7. Your present country of citizenship",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.cit",title:"Identity number"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"8. Your current residential address",r.a.createElement("br",null),r.a.createElement("b",null,"Note:")," A post office box address is not acceptable as a residential address",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.resi.str",title:"Street"},{key:"ap.resi.sub",title:"Sub"},{key:"ap.resi.cntry",title:"Country"},{key:"ap.resi.pc",title:"Postcode"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"9. Address for correspondence",r.a.createElement("br",null),r.a.createElement("i",null,"(If the same as your residential address, write \u2018AS ABOVE\u2019)"),r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.corresp.str",title:"Street"},{key:"ap.corresp.sub",title:"Sub"},{key:"ap.corresp.cntry",title:"Country"},{key:"ap.corresp.hap",title:"Postcode"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{className:"textField",margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("div",{className:"typography1"},"10. Your telephone numbers",r.a.createElement(C.a,{className:"formgroup1"},r.a.createElement("div",null,"Office hours",[{key:"ap.off.ph.cc",title:"Country code"},{key:"ap.off.ph.ac",title:"Area code"},{key:"ap.off.ph",title:"Number"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})}))),r.a.createElement("div",null,"After hours",[{key:"ap.after.ph.cc",title:"Country code"},{key:"ap.after.ph.ac",title:"Area code"},{key:"ap.after.pn",title:"Number"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})}))))),r.a.createElement("div",{className:"typography11"},"11. Do you agree to the Department communicating with you by fax, email or other electronic means?",r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.com.dimia",title:"Country code"}].map((function(e){return r.a.createElement(D.a,{key:e.key,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}},r.a.createElement(S.a,{value:"no",control:r.a.createElement(A.a,null),label:"No"}),r.a.createElement(S.a,{value:"yes",control:r.a.createElement(A.a,null),label:"Yes, Giv Details"}))})))),r.a.createElement("div",{className:"typography2"},r.a.createElement(C.a,{className:"formgroup1"},r.a.createElement("div",null,"Fax number",[{key:"ap.fax.cc",title:"Country code"},{key:"ap.fax.ac",title:"Area code"},{key:"ap.fax.ph",title:"Number"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})}))),r.a.createElement("div",null,"Email address",[{key:"ap.email",title:"Email address"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{margin:"normal",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})}))))),r.a.createElement("div",{className:"typography1"},"12. Client number or file number issued to you by the Department ",r.a.createElement("i",null,"(if known)"),r.a.createElement(C.a,{className:"formgroup1"},[{key:"ap.file.no",title:"File Management"}].map((function(e){return r.a.createElement(S.a,{key:e.key,control:r.a.createElement(O.a,{margin:"normal",className:"textField",label:e.title,value:a.f3(e.key),onChange:function(t){return a.s3(e.key,t.target.value)}})})})))),r.a.createElement("center",null,r.a.createElement(d.a,{variant:"contained",color:"primary",className:"backButton",onClick:function(e){var t=P("form/".concat(a.state.fileid,"/").concat(a.state.pageindex));fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a.state.form3data)}).then((function(e){return e.json()})).then((function(e){return console.log(e)}))}},"Save My Info"),r.a.createElement(d.a,{variant:"contained",color:"secondary",className:"backButton",onClick:function(e){var t=P("download/".concat(a.state.fileid,"/").concat(a.state.pageindex));window.open(t)}},"Export PDF")));default:return"Unknown stepIndex"}},a.handleNext=function(){var e=a.state.activeStep;a.setState({activeStep:e+1})},a.handleBack=function(){var e=a.state.activeStep;a.setState({activeStep:e-1})},a.state={activeStep:0,filelist:[],pages:[],fileid:"",pageindex:"",form3data:{},steps:["Select File","Select Page","Edit information or export pdf"]},a.loadFiles(),a}return Object(s.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this.state,t=e.activeStep,a=e.steps;return r.a.createElement("div",{className:"root"},r.a.createElement(y.a,{activeStep:t,alternativeLabel:!0},a.map((function(e){return r.a.createElement(p.a,{key:e},r.a.createElement(f.a,null,e))}))),r.a.createElement("div",null,t===a.length?r.a.createElement(d.a,{onClick:this.handleReset},"Reset"):r.a.createElement(k.a,{className:"instructions"},this.getStepContent(t))))}}]),t}(r.a.Component);var z=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement(I,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[61,1,2]]]);
//# sourceMappingURL=main.0414d3fa.chunk.js.map