(this["webpackJsonptemplate-task"]=this["webpackJsonptemplate-task"]||[]).push([[0],{54:function(e,t,n){e.exports=n(66)},59:function(e,t,n){},60:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(11),r=n.n(i),c=(n(59),n(32)),s=n(22),l=n(10),u=(n(60),n(18)),d=n(93),f=n(98),m=n(95),p=n(91),b=n(94),h=n(96),g=n(97),v=n(4),k=n(28),j=n(27),w=n(92),O=n(3),E=function(e){"granted"==Notification.permission&&navigator.serviceWorker.getRegistration().then((function(t){var n={body:e,icon:"favicon.ico",vibrate:[100,50,100],actions:[{action:"close",title:"\u0417\u0430\u043a\u0440\u044b\u0442\u044c"}]};t.showNotification("Template task",n)}))},C=Object(v.a)((function(e){return{root:{color:e.palette.getContrastText(k.a[500]),backgroundColor:k.a[500],"&:hover":{backgroundColor:k.a[700]}}}}))(p.a),y=Object(v.a)((function(e){return{root:{marginLeft:"auto",color:e.palette.getContrastText(j.a[700]),backgroundColor:j.a[700],"&:hover":{backgroundColor:j.a[900]}}}}))(p.a),T=Object(w.a)((function(){return{task:{height:"fit-content;",margin:"35px;",maxWidth:"800px;",minWidth:"300px;"},taskComplete:{background:"#4caf50"}}}));var x=function(e){var t=e.data,n=e.handleUpdateTask,i=T(),r=Object(a.useState)(t),c=Object(l.a)(r,2),s=c[0],p=c[1],v=Object(a.useState)(!0),k=Object(l.a)(v,2),j=k[0],w=k[1];return Object(a.useEffect)((function(){p(t),w(!1)}),[t]),j||s.isDeleted?o.a.createElement(o.a.Fragment,null):o.a.createElement(d.a,{className:Object(O.a)(i.task,"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e"===s.status&&i.taskComplete),style:{backgroundColor:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e"===s.status&&"#b4e8b4"}},o.a.createElement(b.a,{onClick:function(){return n(s)}},o.a.createElement(m.a,null,o.a.createElement(h.a,{gutterBottom:!0,variant:"h5",component:"h2"},s.name),o.a.createElement(h.a,{variant:"body2",color:"textSecondary",component:"p"},s.description))),o.a.createElement(g.a,null),o.a.createElement(f.a,{disableSpacing:!0},o.a.createElement(C,{disabled:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e"===s.status,onClick:function(){p(Object(u.a)(Object(u.a)({},s),{},{status:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e"})),E("\ud83d\ude03 \u0422\u044b \u0437\u0430\u0432\u0435\u0440\u0448\u0438\u043b \u0437\u0430\u0434\u0430\u043d\u0438\u0435 \ud83d\ude03")},size:"medium"},"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e"===s.status?"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d\u043e":"\u0417\u0430\u0432\u0435\u0440\u0448\u0438\u0442\u044c"),o.a.createElement(y,{onClick:function(){p(Object(u.a)(Object(u.a)({},s),{},{isDeleted:!0})),E("\ud83d\ude2f \u0422\u044b \u0443\u0434\u0430\u043b\u0438\u043b \u0437\u0430\u0434\u0430\u043d\u0438\u0435 \ud83d\ude2f")},size:"medium"},"\u0423\u0434\u0430\u043b\u0438\u0442\u044c")))},S=n(99),W=n(46),D=n.n(W),N=n(45),U=n.n(N),A=Object(a.lazy)((function(){return Promise.all([n.e(3),n.e(4)]).then(n.bind(null,144))})),L=Object(w.a)((function(e){return{root:{background:"#eeeeee",position:"relative",width:"100%",height:"100vh",overflow:"auto",display:"flex",justifyContent:"space-evenly;",alignItems:"center",flexWrap:"wrap"},fab:{position:"fixed",bottom:e.spacing(2),right:e.spacing(2),color:e.palette.common.white,backgroundColor:k.a[500],"&:hover":{backgroundColor:k.a[600]}}}})),P=[{id:"1",name:"Task1",status:"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435",description:"\u041e\u0441\u043e\u0431\u043e\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0445",isDeleted:!1},{id:"2",name:"Task2",status:"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435",description:"\u041e\u0447\u0435\u043d\u044c \u043f\u0440\u043e\u0441\u0442\u043e\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435",isDeleted:!1},{id:"3",name:"Task3",status:"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435",description:"\u0422\u0443\u0442 \u043d\u0443\u0436\u043d\u043e \u043f\u043e\u0434\u0443\u043c\u0430\u0442\u044c",isDeleted:!1},{id:"4",name:"Task4",status:"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435",description:"\u041e\u0441\u043e\u0431\u043e\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435 \u0434\u043b\u044f \u043f\u0440\u043e\u0434\u0432\u0438\u043d\u0443\u0442\u044b\u0445",isDeleted:!1},{id:"5",name:"Task5",status:"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435",description:"\u041e\u0447\u0435\u043d\u044c \u043f\u0440\u043e\u0441\u0442\u043e\u0435 \u0437\u0430\u0434\u0430\u043d\u0438\u0435",isDeleted:!1},{id:"6",name:"Task6",status:"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0435",description:"\u0422\u0443\u0442 \u043d\u0443\u0436\u043d\u043e \u043f\u043e\u0434\u0443\u043c\u0430\u0442\u044c",isDeleted:!1}];var R=function(){var e=L(),t=Object(a.useState)([].concat(P)),n=Object(l.a)(t,2),i=n[0],r=n[1],u=Object(a.useState)(!1),d=Object(l.a)(u,2),f=d[0],m=d[1],p=Object(a.useState)(null),b=Object(l.a)(p,2),h=b[0],g=b[1];Object(a.useEffect)((function(){fetch("https://jsonplaceholder.typicode.com/todos/1").then((function(e){return e.json()})).then((function(e){return console.log(e)}))}),[]);var v=function(e){e?(g(e),m(!0)):(g(null),m(!0))},k=function(){return o.a.createElement("div",null,"Loading...")};return o.a.createElement("div",{className:e.root},o.a.createElement(a.Suspense,{fallback:o.a.createElement(k,null)},i.map((function(e){return o.a.createElement(x,{key:e.id,data:e,handleUpdateTask:v})})),o.a.createElement(S.a,{className:e.fab,"aria-label":"add",onClick:function(){return v(null)}},o.a.createElement(D.a,null)),o.a.createElement(A,{taskDataToUpdate:h,open:f,handleClose:function(e){if(e){var t=i.findIndex((function(t){return t.id===e.id}));if(-1!==t){var n=U()(i,Object(s.a)({},t,{$merge:e}));r(Object(c.a)(n))}else r([].concat(Object(c.a)(i),[e]))}g(null),m(!1)}})))},z=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function B(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(R,null)),document.getElementById("root")),Notification.requestPermission((function(e){console.log("Notification permission status:",e)})),function(e){if("serviceWorker"in navigator){if(new URL("/template-task",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/template-task","/service-worker.js");z?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):B(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):B(t,e)}))}}()}},[[54,1,2]]]);
//# sourceMappingURL=main.10ee8e6d.chunk.js.map