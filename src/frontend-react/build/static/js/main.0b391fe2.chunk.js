(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{26:function(e,t,a){e.exports=a(60)},32:function(e,t,a){},34:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},35:function(e,t,a){},60:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(24),c=a.n(r),o=(a(32),a(8)),s=a(9),i=a(11),m=a(10),u=a(12),d=(a(34),a(35),a(62));var h=function(){return l.a.createElement("div",{className:"navbar navbar-expand-sm navbar-dark bg-dark"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"navbar-nav float-left"},l.a.createElement(d.a,{className:"nav-item nav-link",to:"/"},"Home")),l.a.createElement("div",{className:" navbar-nav float-right"},l.a.createElement("button",{className:"btn btn-outline-light","data-toggle":"modal","data-target":"#postModal"},"New Post"))))};var p=function(){return l.a.createElement("div",{className:"py-5 text-center"},l.a.createElement("div",{className:"container"},l.a.createElement("p",null,"\xa9 2018 Alberta Williams")))},v=a(17),b=a.n(v),E=a(25),f=a(6),g=a(14),x=a.n(g),j=a(65),N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={author:"",text:"",data:[]},a.handleAuthorChange=a.handleAuthorChange.bind(Object(f.a)(Object(f.a)(a))),a.handleTextChange=a.handleTextChange.bind(Object(f.a)(Object(f.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(f.a)(Object(f.a)(a))),a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"handleAuthorChange",value:function(e){this.setState({author:e.target.value})}},{key:"handleTextChange",value:function(e){this.setState({text:e.target.value})}},{key:"handleSubmit",value:function(){var e=Object(E.a)(b.a.mark(function e(t){return b.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,x.a.post("http://localhost:3000/api/posts",{text:this.state.text,author:this.state.author});case 3:e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.log(e.t0);case 9:t.preventDefualt();case 10:case"end":return e.stop()}},e,this,[[0,6]])}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return l.a.createElement("div",{class:"modal fade",id:"postModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},l.a.createElement("div",{class:"modal-dialog modal-dialog-centered modal-sm",role:"document"},l.a.createElement("div",{class:"modal-content"},l.a.createElement("div",{class:"modal-header"},l.a.createElement("h5",{class:"modal-title",id:"exampleModalLabel"},"Create New Post"),l.a.createElement("button",{type:"button",class:"close","data-dismiss":"modal","aria-label":"Close"},l.a.createElement("span",{"aria-hidden":"true"},"\xd7"))),l.a.createElement("div",{class:"modal-body"},l.a.createElement("form",{onSubmit:this.handleSubmit},l.a.createElement(j.a,{to:"/"}),l.a.createElement("div",{class:"form-group"},l.a.createElement("label",null,"Name"),l.a.createElement("input",{type:"text",name:"author",class:"form-control",value:this.state.author,onChange:this.handleAuthorChange})),l.a.createElement("div",{class:"form-group"},l.a.createElement("label",null,"Text"),l.a.createElement("textarea",{value:this.state.text,onChange:this.handleTextChange,name:"text",rows:"4",class:"form-control",maxlength:"82",placeholder:"82 character limit"})),l.a.createElement("div",{class:"form-group float-right"},l.a.createElement("input",{type:"submit",value:"submit",id:"post",class:"btn btn-primary"})))))))}}]),t}(l.a.Component),O=function(e){function t(){return Object(o.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(h,null),this.props.children,l.a.createElement(p,null),l.a.createElement(N,null))}}]),t}(n.Component),y=a(63),k=a(64);var w=function(e){return l.a.createElement("li",{className:"mb-3"},l.a.createElement("div",{className:"card"},l.a.createElement("div",{className:"card-body"},l.a.createElement("h5",{className:"card-title"},e.author),l.a.createElement("p",{className:"card-text"},e.text))))};var C=function(e){var t=e.posts.map(function(e){return l.a.createElement(w,{key:e._id,author:e.author.username,text:e.text})});return l.a.createElement("ul",{className:"list-unstyled"},t)},S=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).state={posts:[]},a}return Object(u.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("hello"),x.a.get("/api/index").then(function(t){console.log(t),e.setState({posts:t.data})}).catch(function(e){return console.log(e)})}},{key:"render",value:function(){return l.a.createElement(O,null,l.a.createElement("div",{className:"bg home-bg page-header text-center"},l.a.createElement("div",{className:"container"},l.a.createElement("h1",null,"The Network"))),l.a.createElement("div",{className:"section"},l.a.createElement("div",{className:"col-sm-6 offset-md-3"},l.a.createElement(C,{posts:this.state.posts}))))}}]),t}(n.Component);var T=function(){return l.a.createElement(O,null,l.a.createElement("h2",null,"Signup page"))};var A=function(){return l.a.createElement(O,null,l.a.createElement("h2",null,"Login"))};var M=function(){return l.a.createElement(O,null,l.a.createElement("h2",null,"Dashboard"))};var D=function(){return l.a.createElement(y.a,null,l.a.createElement("div",null,l.a.createElement(k.a,{exact:!0,path:"/",component:S}),l.a.createElement(k.a,{exact:!0,path:"/signup",component:T}),l.a.createElement(k.a,{exact:!0,path:"/login",component:A}),l.a.createElement(k.a,{exact:!0,path:"/dashboard",component:M})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[26,2,1]]]);
//# sourceMappingURL=main.0b391fe2.chunk.js.map