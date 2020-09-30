(this["webpackJsonptemplate-task"]=this["webpackJsonptemplate-task"]||[]).push([[0],{106:function(e,t,a){e.exports=a(135)},134:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff"}},135:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),c=a.n(o),i=a(17),l=a(22),s=a(21),u=a(166),d=a(181),m=a(170),f=a(8),g=a(25),p=new(a(83).a)("db");p.version(1).stores({user:"user",tasks:"_id",challenges:"_id",challengesQueue:"_id"}),p.on("populate",(function(){p.user.add({user:"singleUserId",_id:null}),p.tasks.bulkAdd([]),p.challenges.bulkAdd([]),p.challengesQueue.bulkAdd([])}));var h=function(e){return p.user.put({user:"singleUserId",_id:e}).then((function(){return!0})).catch((function(e){return console.log(e)}))},b=function(e,t,a,n){return p.tasks.update(e,{report:t,images:Object(g.a)(a),state:n})},y=a(31),k=Object(y.b)({name:"user",initialState:{isLogin:!1,isOnline:!0,user:null},reducers:{logIn:function(e,t){e.isLogin=!0},logOut:function(e){e.isLogin=!1},updateUser:function(e,t){e.user=t.payload},setOnlineStatus:function(e,t){e.isOnline=t.payload}}}),_=k.actions,O=_.logIn,v=(_.logOut,_.updateUser),E=_.setOnlineStatus,j=k.reducer,x=a(26),T=a.n(x),L=function(){return T.a.get("/challenges").then((function(e){return 200===e.status&&{data:e.data,connetionStatus:e.statusText}})).catch((function(e){return!1}))},S=function(e){return T.a.get("tasks/user/".concat(e)).then((function(e){return 200===e.status&&e.data})).catch((function(e){return!1}))},D=function(e){return T.a.put("tasks/",e).then((function(e){return 200===e.status&&e.data})).catch((function(e){return!1}))},w=a(47),I=a.n(w),C=function(){var e=Object(f.b)(),t=Object(n.useState)({name:"",code:""}),a=Object(i.a)(t,2),o=a[0],c=a[1],g=Object(n.useState)({}),p=Object(i.a)(g,2),b=p[0],y=p[1],k=function(e,t){c(Object(s.a)(Object(s.a)({},o),{},Object(l.a)({},t,e.target.value)))};return r.a.createElement("div",{className:I.a.background},r.a.createElement(u.a,{className:"login-title"},"\u0412\u043e\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0438\u0441\u0442\u0435\u043c\u0443"),r.a.createElement("form",null,r.a.createElement(d.a,{className:I.a.loginInput,color:"secondary",id:"login-name",label:"\u041b\u043e\u0433\u0438\u043d",onChange:function(e){return k(e,"name")},error:Boolean(b.name),value:o.name,helperText:Boolean(b.name)&&"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u043b\u043e\u0433\u0438\u043d"}),r.a.createElement(d.a,{className:I.a.loginInput,color:"secondary",id:"login-code",label:"\u041f\u0430\u0440\u043e\u043b\u044c",type:"password",onChange:function(e){return k(e,"code")},error:Boolean(b.code),value:o.code,helperText:Boolean(b.code)&&"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 \u043f\u0430\u0440\u043e\u043b\u044c"}),r.a.createElement(m.a,{type:"submit",onClick:function(t){t.preventDefault();var a={};Object.entries(o).map((function(e){""===e[1]&&(a[e[0]]=!0)})),Object.keys(a).length>0?y(a):(y(a),function(e){var t=e.name,a=e.code;return T.a.get("/users").then((function(e){if(200===e.status){var n=e.data.find((function(e){return e.name===t&&e.code===a}));return n||!1}return!1})).catch((function(e){return!1}))}(o).then((function(t){t?(h(t._id),e(v(t)),e(O())):y({name:!0,code:!0})})))},className:I.a.loginButton,variant:"contained"},"\u0412\u043e\u0439\u0442\u0438")))},M=a(87),B=a.n(M),N=function(){return r.a.createElement("div",{className:B.a.background},r.a.createElement(C,null))},Q=a(62),P=a(12),F=function(e){var t=e.component,a=e.restricted,n=Object(Q.a)(e,["component","restricted"]),o=Object(f.c)((function(e){return e.user.isLogin}));return r.a.createElement(P.b,Object.assign({},n,{render:function(e){return o&&a?r.a.createElement(P.a,{to:"/tasks"}):r.a.createElement(t,e)}}))},R=function(e){var t=e.component,a=e.page,n=Object(Q.a)(e,["component","page"]),o=Object(f.c)((function(e){return e.user.isLogin}));return r.a.createElement(P.b,Object.assign({},n,{render:function(e){return o?r.a.createElement(t,Object.assign({page:a},e)):r.a.createElement(P.a,{to:"/login"})}}))},U=Object(y.b)({name:"challenges",initialState:{items:[],pendingQueue:[]},reducers:{update:function(e,t){var a;e.items=Object(g.a)(t.payload),a=t.payload,p.challenges.clear(),p.challenges.bulkPut(Object(g.a)(a))},addChallengeToQueue:function(e,t){var a;e.pendingQueue=[].concat(Object(g.a)(e.pendingQueue),[t.payload]),a={_id:t.payload},p.challengesQueue.add(a)},clearPandingQueue:function(e){e.pendingQueue=[],J(e.pendingQueue)},getChallengesQueueFromBD:function(e){p.challengesQueue.get().toArray().then((function(t){e.pendingQueue=t.map((function(e){return e._id}))}))}}}),W=U.actions,A=W.update,J=W.clearPandingQueue,H=W.addChallengeToQueue,Z=U.reducer,G=a(171),X=a(174),Y=a(173),q=a(172),z=a(56),V=a.n(z),$=Object(y.b)({name:"tasks",initialState:{elements:[]},reducers:{addTask:function(e,t){var a;e.elements=[].concat(Object(g.a)(e.elements),[t.payload]),a=t.payload,p.tasks.put(a)},updateTasks:function(e,t){var a;e.elements=t.payload,a=t.payload,p.tasks.clear(),p.tasks.bulkPut(Object(g.a)(a))},updateReport:function(e,t){var a=t.payload,n=a._id,r=a.report,o=a.images,c=e.elements.find((function(e){return e._id===n}));c&&(c.report=r,c.images=o,b(n,r,o,c.state))},updateTaskState:function(e,t){var a=e.elements.find((function(e){return e._id===t.payload._id}));a&&(a.state=t.payload.state,b(a._id,a.report,a.images,a.state))}}}),K=$.actions,ee=(K.toggleEditForm,K.updateTasks),te=K.addTask,ae=K.updateReport,ne=K.updateTaskState,re=$.reducer,oe=function(e){var t=e.data,a=Object(f.b)(),n=Object(f.c)((function(e){return e.challenges.pendingQueue&&-1!==e.challenges.pendingQueue.indexOf(t._id)})),o=Object(f.c)((function(e){return e.user.user._id})),c=Object(f.c)((function(e){return e.tasks.elements.map((function(e){if("Cancelled"!==e.state)return e.challenge._id}))}));return r.a.createElement(G.a,{className:V.a.background},r.a.createElement(q.a,{component:"img",alt:"task image",height:"180",image:t.image,title:"Task"}),r.a.createElement(Y.a,null,r.a.createElement(u.a,{color:"textSecondary",gutterBottom:!0,variant:"h6",component:"h2"},t.title),r.a.createElement(u.a,{variant:"body2",color:"textSecondary",component:"p"},t.description),r.a.createElement("div",{className:V.a.challengeInfo},r.a.createElement(u.a,{variant:"body2",color:"textSecondary",component:"p"},"\u041e\u0447\u043a\u0438: ".concat(t.maxScore)),r.a.createElement(u.a,{variant:"body2",color:"textSecondary",component:"p"},"\u0418\u0441\u0442\u0435\u043a\u0430\u0435\u0442: ".concat(function(e){var t=new Date(e);return"".concat(t.getDate(),"-").concat(t.getMonth()+1,"-").concat(t.getFullYear())}(t.finishDate))))),r.a.createElement(X.a,null,r.a.createElement(m.a,{onClick:function(){(function(e){return T.a.post("challenges/accept",e).then((function(e){return 201===e.status&&e.data})).catch((function(e){return!1}))})({challengeId:t._id,userId:o}).then((function(e){"object"===typeof e?(a(te(Object(s.a)(Object(s.a)({},e),{},{score:0,challenge:t,report:"",images:[]}))),J(!0)):("string"===typeof e&&"offline"===e?(a(H(t._id)),a(E(!1))):(a(E(!0)),J()),console.log("err to add task"))}))},className:V.a.acceptButton,variant:"contained",color:"secondary",disabled:n||-1!==c.indexOf(t._id)},n?"\u0427\u0435\u043b\u0435\u043d\u0434\u0436 \u0431\u0443\u0434\u0435\u0442 \u0432\u0437\u044f\u0442 \u043f\u0440\u0438 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u0438 \u043a \u0438\u043d\u0442\u0435\u0440\u043d\u0435\u0442\u0443":-1===c.indexOf(t._id)?"\u041f\u0440\u0438\u043d\u044f\u0442\u044c \u0447\u0435\u043b\u0435\u043d\u0434\u0436":"\u0412\u044b \u0443\u0436\u0435 \u0432\u0437\u044f\u043b\u0438 \u044d\u0442\u043e\u0442 \u0447\u0435\u043b\u0435\u043d\u0434\u0436")))},ce=a(175),ie=a(88),le=a.n(ie),se=function(){return r.a.createElement("div",{className:le.a.loadingContainer},r.a.createElement(ce.a,{color:"secondary"}))},ue=a(89),de=a.n(ue),me=function(){var e=Object(f.b)();Object(n.useEffect)((function(){L().then((function(t){var a=t.data,n=t.connetionStatus;e(E("offline"!==n)),e(A(a))}))}),[]);var t=Object(f.c)((function(e){return e.challenges.items}));return r.a.createElement("div",{className:de.a.background},t.length?r.a.createElement(r.a.Fragment,null,t.map((function(e){return r.a.createElement(oe,{data:e,key:e._id})}))):r.a.createElement(se,null))},fe=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(me,null))},ge=a(40),pe=a(27),he=a.n(pe),be=a(3),ye=a(90),ke=a.n(ye),_e=a(176),Oe=a(177),ve=function(e){var t=e.data,a=Object(n.useState)({InProgress:"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f",Moderation:"\u041f\u0440\u043e\u0432\u0435\u0440\u044f\u0435\u0442\u0441\u044f \u043c\u043e\u0434\u0435\u0440\u0430\u0446\u0438\u0435\u0439",Confirmed:"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d",Declined:"\u041f\u0440\u043e\u0432\u0430\u043b\u0435\u043d",Cancelled:"\u041e\u0442\u043c\u0435\u043d\u0435\u043d"}),o=Object(i.a)(a,1)[0],c=Object(f.b)(),g=Object(n.useState)(t.report||!1),p=Object(i.a)(g,2),h=p[0],b=p[1],y=Object(n.useState)(!1),k=Object(i.a)(y,2),_=k[0],O=k[1],v=Object(n.useState)({_id:t._id,report:t.report,images:["test"]}),E=Object(i.a)(v,2),j=E[0],x=E[1],T=Object(n.useState)({report:!1,images:!1}),L=Object(i.a)(T,2),S=L[0],w=L[1],I=function(e){var a={_id:t._id,userId:t.user,challengeId:t.challenge._id,state:e,report:t.report,images:t.images,score:t.score};"Cancelled"===e&&(a.report="",a.imagex=[],x(Object(s.a)(Object(s.a)({},j),{},{report:"",images:[]}))),O(!1),c(ne(a)),D(a).then((function(e){e?(O(!1),c(ne(e))):console.log("task doesnt update")}))},C=function(){var e={};return Object.keys(j).map((function(t){return 0===j[t].length?(e[t]=!0,!0):(e[t]=!1,!1)})).find((function(e){return!0===e}))?(w(e),!0):(w(e),!1)};return r.a.createElement(G.a,{className:he.a.background},r.a.createElement(q.a,{component:"img",alt:"task image",height:"180",image:t.challenge.image,title:"Task"}),r.a.createElement(Y.a,null,r.a.createElement(u.a,{color:"textSecondary",gutterBottom:!0,variant:"h6",component:"h2"},t.challenge.title),r.a.createElement(u.a,{variant:"body2",color:"textSecondary",component:"p"},t.challenge.description),r.a.createElement("div",{className:he.a.challengeInfo},r.a.createElement(u.a,{variant:"body2",color:"textSecondary",component:"p"},"\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u044b\u0439 \u0431\u0430\u043b: ".concat(t.challenge.maxScore)),r.a.createElement(u.a,{variant:"body2",color:"textSecondary",component:"p"},"\u0422\u0432\u043e\u0439 \u0431\u0430\u043b: ".concat(t.score)),r.a.createElement(u.a,{variant:"body2",color:"textSecondary",component:"p"},"\u0418\u0441\u0442\u0435\u043a\u0430\u0435\u0442: ".concat(function(e){var t=new Date(e);return"".concat(t.getDate(),"-").concat(t.getMonth()+1,"-").concat(t.getFullYear())}(t.challenge.finishDate))))),r.a.createElement(X.a,null,r.a.createElement(m.a,{disabled:"InProgress"!==t.state||!t.report||!t.images||0===t.report.length||0===t.images.length,onClick:function(){return I("Moderation")},className:he.a.acceptButton,variant:"contained",color:"secondary"},"InProgress"!==t.state?"".concat(o[t.state]):"\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c \u0447\u0435\u043b\u043b\u0435\u043d\u0434\u0436"),r.a.createElement(_e.a,{className:Object(be.a)(he.a.expand,Object(l.a)({},he.a.expandOpen,_)),onClick:function(){_||x({_id:t._id,report:t.report,images:["test"]}),O(!_)},"aria-expanded":_,"aria-label":"show more"},r.a.createElement(ke.a,null))),r.a.createElement(Oe.a,{in:_,timeout:"auto",unmountOnExit:!0},r.a.createElement(Y.a,{className:he.a.reportBackground},r.a.createElement(d.a,{disabled:"InProgress"!==t.state,color:"secondary",id:"task-report",label:"\u041e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",multiline:!0,onChange:function(e){return t=e,a="report",x(Object(s.a)(Object(s.a)({},j),{},Object(l.a)({},a,t.target.value))),void b(!1);var t,a},error:S.report,value:j.report,helperText:S.report&&"\u041f\u043e\u043b\u0435 \u043d\u0435 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u043f\u0443\u0441\u0442\u044b\u043c"}),r.a.createElement(m.a,{onClick:function(){if(C())console.log("errors");else{var e={_id:t._id,userId:t.user,challengeId:t.challenge._id,state:t.state,report:j.report,images:j.images,score:t.score};c(ae(j)),b(!0),D(e).then((function(e){e?(c(ae(j)),b(!0)):console.log("task doesnt update")}))}},className:he.a.saveReportButton,variant:"contained",color:"secondary",disabled:h||"InProgress"!==t.state},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"),r.a.createElement(m.a,{size:"small",onClick:function(){return I("Cancelled")},className:he.a.saveReportButton,variant:"outlined",color:"secondary",disabled:"InProgress"!==t.state},"\u041e\u0442\u043a\u0430\u0437\u0430\u0442\u044c\u0441\u044f \u043e\u0442 \u0447\u0435\u043b\u0435\u043d\u0434\u0436\u0430"))))},Ee=a(91),je=a.n(Ee),xe=function(){var e=Object(f.c)((function(e){return e.tasks.elements})),t=Object(f.c)((function(e){return e.user.user._id})),a=Object(f.b)();return Object(n.useEffect)((function(){S(t).then((function(e){e&&a(ee(e))}))}),[]),r.a.createElement("div",{className:je.a.background},e.length?r.a.createElement(r.a.Fragment,null,e.map((function(e){return r.a.createElement(ve,{data:e,key:e._id})}))):r.a.createElement(se,null))},Te=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(xe,null))},Le=a(178),Se=a(179),De=a(92),we=a.n(De),Ie=a(93),Ce=a.n(Ie),Me=a(43),Be=a.n(Me),Ne=function(){var e=Object(n.useState)("tasks"),t=Object(i.a)(e,2),a=t[0],o=t[1];return r.a.createElement(Le.a,{className:Be.a.background,showLabels:!0,value:a,onChange:function(e,t){o(t)}},r.a.createElement(Se.a,{className:Object(be.a)(Be.a.item,Object(l.a)({},Be.a.selected,"challenges"===a)),label:"\u0427\u0435\u043b\u0435\u043d\u0434\u0436\u0438",value:"challenges",icon:r.a.createElement(we.a,null),component:ge.b,to:"/challenges"}),r.a.createElement(Se.a,{className:Object(be.a)(Be.a.item,Object(l.a)({},Be.a.selected,"tasks"===a)),label:"\u0417\u0430\u0434\u0430\u043d\u0438\u044f",value:"tasks",icon:r.a.createElement(Ce.a,null),component:ge.b,to:"/tasks"}))},Qe=function(e){var t=e.page;return r.a.createElement(r.a.Fragment,null,r.a.createElement(t,null),r.a.createElement(Ne,null))},Pe=function(){var e=Object(f.b)(),t=Object(f.c)((function(e){return e.user.isLogin})),a=Object(f.c)((function(e){return e.user.user&&e.user.user._id})),o=Object(f.c)((function(e){return e.user.isOnline})),c=Object(n.useState)(!0),l=Object(i.a)(c,2),s=l[0],u=l[1];return Object(n.useEffect)((function(){t&&(L().then((function(t){var a=t.data;"offline"===t.connetionStatus?e(E(!1)):(e(E(!0)),e(J())),e(A(a))})),S(a).then((function(t){t&&e(ee(t))})))}),[t,o]),Object(n.useEffect)((function(){p.user.get("singleUserId").then((function(e){return e._id})).catch((function(e){console.log(e)})).then((function(t){t?function(e){return T.a.get("/users/".concat(e)).then((function(e){return 200===e.status&&e.data})).catch((function(e){return!1}))}(t).then((function(t){t?(e(v(t)),e(O()),u(!1)):(h(null),u(!1))})):u(!1)}))}),[t]),s?r.a.createElement(se,null):r.a.createElement(ge.a,{basename:"/template-task"},r.a.createElement(P.d,null,r.a.createElement(F,{restricted:!0,component:N,path:"/login"}),r.a.createElement(R,{component:Qe,page:Te,path:"/tasks"}),r.a.createElement(R,{component:Qe,page:fe,path:"/challenges"}),r.a.createElement(P.a,{to:"/login"})))},Fe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Re(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}var Ue=Object(y.a)({reducer:{tasks:re,user:j,challenges:Z}}),We=a(28),Ae=a.n(We),Je=(a(134),a(94)),He=a(182),Ze=a(180);T.a.defaults.baseURL="https://25d3f928c7f7.ngrok.io";var Ge=Object(Je.a)({palette:{primary:{light:Ae.a.primaryLight,main:Ae.a.primaryMain,dark:Ae.a.primaryDark,contrastText:Ae.a.primaryText},secondary:{light:Ae.a.secondaryLight,main:Ae.a.secondaryMain,dark:Ae.a.secondaryDark,contrastText:Ae.a.secondaryText}},typography:{fontFamily:["Open Sans","Roboto","Arial"].join(",")}});!function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/sw.js");Fe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Re(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("Work on localhost")}))):Re(t,e)}))}}(),c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f.a,{store:Ue},r.a.createElement(He.b,{injectFirst:!0},r.a.createElement(Ze.a,{theme:Ge},r.a.createElement(Pe,null))))),document.getElementById("root")),Notification.requestPermission((function(e){console.log("Notification permission status:",e)}))},27:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff",background:"Task_background__2SXkR",challengeInfo:"Task_challengeInfo__3R8B9",acceptButton:"Task_acceptButton__3sb7G",expand:"Task_expand__1af3O",expandOpen:"Task_expandOpen__1PJfp",reportBackground:"Task_reportBackground__2cDS2",saveReportButton:"Task_saveReportButton__2kpFG"}},28:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff"}},43:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff",background:"Menu_background__1EcTJ",item:"Menu_item__1WHbu"}},47:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff",background:"LoginForm_background__2j78L",loginInput:"LoginForm_loginInput__3HSUu",loginButton:"LoginForm_loginButton__1ZTv0"}},56:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff",background:"Challenge_background__3LPUE",challengeInfo:"Challenge_challengeInfo__3ywmc",acceptButton:"Challenge_acceptButton__2X5fa"}},87:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff",background:"LoginPage_background__2-RHP"}},88:function(e,t,a){e.exports={loadingContainer:"Loading_loadingContainer__vZjJV"}},89:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff",background:"ChallengesList_background__1Dy0t"}},91:function(e,t,a){e.exports={primaryLight:"#fff",primaryMain:"#e0e0e0",primaryDark:"#aeaeae",primaryText:"#000",secondaryLight:"#8d8d8d",secondaryMain:"#606060",secondaryDark:"#363636",secondaryText:"#fff",background:"TasksList_background__2Zchh"}}},[[106,1,2]]]);
//# sourceMappingURL=main.29958f01.chunk.js.map