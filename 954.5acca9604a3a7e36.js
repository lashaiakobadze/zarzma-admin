"use strict";(self.webpackChunkzarzma_admin=self.webpackChunkzarzma_admin||[]).push([[954],{954:(be,C,s)=>{s.r(C),s.d(C,{AlbumsPanelComponent:()=>p});var x=s(655),m=s(433),a=s(2856),f=s(7507),h=s(4466),b=s(8409),u=(()=>{return(n=u||(u={}))[n.album=1]="album",n[n.frescoes=2]="frescoes",n[n.handicraft=3]="handicraft",n[n.other=4]="other",u;var n})();class P{constructor(o,t){this.Name=o,this.AlbumType=t}}var e=s(8256);class v{constructor(o,t){this.Name=o,this.AlbumId=t}}var c=s(6895),I=s(2340);const M=function(n){return{"background-image":n}};let O=(()=>{class n{constructor(){this.BASE_URL=I.N.dataUrl,this.deleteAlbumPhotoClicked=new e.vpe}onDeleteAlbumPhoto(){window.confirm("\u10dc\u10d0\u10db\u10d3\u10d5\u10d8\u10da\u10d0\u10d3 \u10d2\u10e1\u10e3\u10e0\u10d7 \u10e4\u10dd\u10e2\u10dd\u10e1 \u10ec\u10d0\u10e8\u10da\u10d0?")&&this.deleteAlbumPhotoClicked.emit(this.albumPhoto.id)}ngOnInit(){this.imgUrl=`url('${this.BASE_URL+"/"+this.albumPhoto.photoURL}')`}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-album-photo"]],inputs:{albumPhoto:"albumPhoto"},outputs:{deleteAlbumPhotoClicked:"deleteAlbumPhotoClicked"},standalone:!0,features:[e.jDz],decls:2,vars:3,consts:[[1,"background-image",3,"ngStyle"],["src","assets/cancel.svg","alt","add",1,"delete-img",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"img",1),e.NdJ("click",function(){return i.onDeleteAlbumPhoto()}),e.qZA()()),2&t&&e.Q6J("ngStyle",e.VKq(1,M,i.imgUrl))},dependencies:[c.ez,c.PC],styles:["*[_ngcontent-%COMP%]{margin:0;padding:0;outline:none;border:none;box-sizing:border-box}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{background-color:#181c21;overflow-x:auto;font-size:16px;font: .75rem/1.33333 Arial,sans-serif;color:#fff}ul[_ngcontent-%COMP%], li[_ngcontent-%COMP%]{list-style:none}a[_ngcontent-%COMP%]{text-decoration:none}.plus-btn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.panel-img[_ngcontent-%COMP%]{height:100px}.form[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;border-bottom:1px solid red;padding:5px;margin:5px}.form[_ngcontent-%COMP%]   .ng-pristine.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}.form-control[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:flex-start;flex-direction:column;margin:10px}.required[_ngcontent-%COMP%]{color:red}.form-label[_ngcontent-%COMP%]{font-size:1rem}.input[_ngcontent-%COMP%]{width:300px;border-radius:5px;margin:5px 0;padding:5px;font-size:.8rem}input[_ngcontent-%COMP%]:disabled{background-color:gray;color:#fff}.button[_ngcontent-%COMP%]{border-radius:5px;padding:5px;margin:5px 0;cursor:pointer}.delete[_ngcontent-%COMP%]{color:#ddd;background-color:#dd1313dc}.update[_ngcontent-%COMP%]{color:#ddd;background-color:#25b125e6}.visible[_ngcontent-%COMP%]{visibility:hidden;display:none}.center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.pointer[_ngcontent-%COMP%]{cursor:pointer}.background-image[_ngcontent-%COMP%]{position:relative;margin:10px;width:100px;height:100px;background-size:cover;background-position:center;background-repeat:no-repeat}.delete-img[_ngcontent-%COMP%]{width:25px;position:absolute;top:-10px;right:-12.5px;margin:0;cursor:pointer}"]}),n})();var k=s(6436),T=s(1481);let y=(()=>{class n{constructor(t){this.sanitizer=t,this.files=new e.vpe,this.background="rgb(0 0 0 / 50%)"}onDragOver(t){t.preventDefault(),t.stopPropagation(),this.background="rgb(0 0 0 / 40%)"}onDragLeave(t){t.preventDefault(),t.stopPropagation(),this.background="rgb(0 0 0 / 30%)"}onDrop(t){t.preventDefault(),t.stopPropagation(),this.background="rgb(0 0 0 / 50%)";let i=[];for(let l=0;l<t.dataTransfer.files.length;l++){const r=t.dataTransfer.files[l],_=this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(r));i.push({file:r,url:_})}i.length>0&&this.files.emit(i)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(T.H7))},n.\u0275dir=e.lG2({type:n,selectors:[["","appDrag",""]],hostVars:2,hostBindings:function(t,i){1&t&&e.NdJ("dragover",function(r){return i.onDragOver(r)})("dragleave",function(r){return i.onDragLeave(r)})("drop",function(r){return i.onDrop(r)}),2&t&&e.Udp("background",i.background)},outputs:{files:"files"}}),n})();var A=s(348),Z=s(7533);function w(n,o){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"app-album-photo",8),e.NdJ("deleteAlbumPhotoClicked",function(l){e.CHM(t);const r=e.oxw(2);return e.KtG(r.onDeleteAlbumPhoto(l))}),e.qZA(),e.BQk()}if(2&n){const t=o.$implicit;e.xp6(1),e.Q6J("albumPhoto",t)}}function N(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",9)(1,"div",10)(2,"h3"),e._uU(3,"Add Photos"),e.qZA(),e.TgZ(4,"app-plus",11),e.NdJ("click",function(){e.CHM(t);const l=e.oxw(2);return e.KtG(l.onGetForm())}),e.qZA()()()}}function J(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",20),e.NdJ("files",function(l){e.CHM(t);const r=e.oxw(3);return e.KtG(r.filesDropped(l))}),e.TgZ(1,"div",21)(2,"div",22),e._uU(3,"Drop your images here!"),e.qZA()()()}}function F(n,o){if(1&n&&e._UZ(0,"img",24),2&n){const t=e.oxw().$implicit;e.Q6J("src",t.url,e.LSH)}}function D(n,o){if(1&n&&(e.ynx(0),e.YNc(1,F,1,1,"img",23),e.BQk()),2&n){const t=o.$implicit;e.xp6(1),e.Q6J("ngIf",t)}}function q(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw(3);e.xp6(1),e.Oqu(t.albumPanelError)}}function U(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",12),e.YNc(1,J,4,0,"div",13),e.TgZ(2,"div",14),e.YNc(3,D,2,1,"ng-container",5),e.qZA(),e.TgZ(4,"image-uploader",15),e.NdJ("filesEmitted",function(l){e.CHM(t);const r=e.oxw(2);return e.KtG(r.filesProcess(l))}),e.qZA(),e.TgZ(5,"button",16),e.NdJ("click",function(){e.CHM(t);const l=e.oxw(2);return e.KtG(l.storeFiles())}),e._uU(6,"Add Photos"),e.qZA(),e.TgZ(7,"p",17),e.YNc(8,q,2,1,"span",18),e.qZA(),e.TgZ(9,"button",19),e.NdJ("click",function(){e.CHM(t);const l=e.oxw(2);return e.KtG(l.workEnd())}),e._uU(10,"Work end"),e.qZA()()}if(2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngIf",!t.files.length),e.xp6(2),e.Q6J("ngForOf",t.files),e.xp6(1),e.Q6J("isSaml",!0)("singleFile",!1)("activeColor","orangered")("baseColor","lightgray"),e.xp6(4),e.Q6J("ngIf",t.albumPanelError)}}function Q(n,o){if(1&n&&(e.TgZ(0,"div",4),e.YNc(1,w,2,1,"ng-container",5),e.YNc(2,N,5,0,"div",6),e.YNc(3,U,11,7,"div",7),e.qZA()),2&n){const t=e.oxw();e.xp6(1),e.Q6J("ngForOf",t.albumItem.albumPhotos),e.xp6(1),e.Q6J("ngIf",!t.dropMode),e.xp6(1),e.Q6J("ngIf",t.dropMode)}}let E=(()=>{class n{constructor(t){this.errorService=t,this.addAlbumPhotoClicked=new e.vpe,this.deleteAlbumItemClicked=new e.vpe,this.deleteAlbumPhotoClicked=new e.vpe,this.files=[],this.dropMode=!1,this.albumPanelError=null}ngOnInit(){}open(){this.isOpen=!this.isOpen}onGetForm(){this.dropMode=!0,this.initForm(this.albumItem)}onDeleteAlbumItem(){window.confirm("\u10dc\u10d0\u10db\u10d3\u10d5\u10d8\u10da\u10d0\u10d3 \u10d2\u10e1\u10e3\u10e0\u10d7 \u10d0\u10da\u10d1\u10dd\u10db\u10d8\u10d3\u10d0\u10dc \u10db\u10dd\u10d5\u10da\u10d4\u10dc\u10d8\u10e1 \u10ec\u10d0\u10e8\u10da\u10d0?")&&this.deleteAlbumItemClicked.emit(this.albumItem.id)}onDeleteAlbumPhoto(t){this.deleteAlbumPhotoClicked.emit(t)}filesDropped(t){this.files=t}filesProcess(t){this.files=t}storeFiles(){this.form.invalid?this.albumPanelError=f.X.albumPanelError:(this.files.forEach(t=>{this.form.patchValue({files:t.file}),this.form.get("files").updateValueAndValidity();const i=new FormData;i.append("Name",this.form.get("Name").value),i.append("AlbumItemId",this.form.get("AlbumItemId").value),i.append("files",this.form.get("files").value),this.addAlbumPhotoClicked.emit(i),this.dropMode=!1}),this.workEnd())}workEnd(){this.form.reset(),this.dropMode=!1,this.files=[],this.albumPanelError=null}errors(t){return Object.values(this.get(t).errors)}get(t){return this.form.get(t)}initForm(t){this.form=new m.cw({Name:new m.NI("photo"),AlbumItemId:new m.NI(t.id,b.m.required),files:new m.NI(null)})}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(k.T))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-album-item"]],inputs:{albumItem:"albumItem"},outputs:{addAlbumPhotoClicked:"addAlbumPhotoClicked",deleteAlbumItemClicked:"deleteAlbumItemClicked",deleteAlbumPhotoClicked:"deleteAlbumPhotoClicked"},standalone:!0,features:[e.jDz],decls:6,vars:2,consts:[[1,"album-item"],[1,"center","pointer",3,"click"],[1,"delete","button",3,"click"],["class","album-item-content",4,"ngIf"],[1,"album-item-content"],[4,"ngFor","ngForOf"],["class","plus",4,"ngIf"],["class","add-photos",4,"ngIf"],[3,"albumPhoto","deleteAlbumPhotoClicked"],[1,"plus"],[1,"plus-btn"],[3,"click"],[1,"add-photos"],["class","drop-zone","appDrag","",3,"files",4,"ngIf"],[1,"dropped-zone"],[3,"isSaml","singleFile","activeColor","baseColor","filesEmitted"],["type","submit",1,"button","update",3,"click"],[1,"required"],[4,"ngIf"],[1,"button","delete",3,"click"],["appDrag","",1,"drop-zone",3,"files"],[1,"text-wrapper"],[1,"centered"],[3,"src",4,"ngIf"],[3,"src"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"h3",1),e.NdJ("click",function(){return i.open()}),e._uU(2),e.qZA(),e.TgZ(3,"button",2),e.NdJ("click",function(){return i.onDeleteAlbumItem()}),e._uU(4,"delete album Item"),e.qZA()(),e.YNc(5,Q,4,3,"div",3)),2&t&&(e.xp6(2),e.Oqu(i.albumItem.name),e.xp6(3),e.Q6J("ngIf",i.isOpen))},dependencies:[h.m,c.sg,c.O5,y,A.w,Z.$,O],styles:["[_nghost-%COMP%]{width:100%}.album-item[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:10px 20px}.album-item[_ngcontent-%COMP%]:hover{background-color:#00000080}.album-item-content[_ngcontent-%COMP%]{padding:5px 20px;display:flex;justify-content:flex-start;flex-wrap:wrap;align-items:center}.album-item-content[_ngcontent-%COMP%]:hover{background-color:#0000004d}.plus-btn[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{padding:0 20px}.add-photos[_ngcontent-%COMP%]{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.drop-zone[_ngcontent-%COMP%]{margin:20px;min-height:200px;min-width:100px;display:table;width:100%;background-color:#181616;border:dotted 1px #aaa}.dropped-zone[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start;flex-wrap:wrap;height:100%}.dropped-zone[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:10px;width:100px;height:100px;background-size:cover;background-position:center;background-repeat:no-repeat}.text-wrapper[_ngcontent-%COMP%]{display:table-cell;vertical-align:middle}.centered[_ngcontent-%COMP%]{font-family:sans-serif;font-size:1.3em;font-weight:700;text-align:center}.update[_ngcontent-%COMP%]{margin-top:15px}"]}),n})();function Y(n,o){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"app-album-item",9),e.NdJ("addAlbumPhotoClicked",function(l){e.CHM(t);const r=e.oxw(2);return e.KtG(r.onAddAlbumPhoto(l))})("deleteAlbumItemClicked",function(l){e.CHM(t);const r=e.oxw(2);return e.KtG(r.onDeleteAlbumItem(l))})("deleteAlbumPhotoClicked",function(l){e.CHM(t);const r=e.oxw(2);return e.KtG(r.onDeleteAlbumPhoto(l))}),e.qZA(),e.BQk()}if(2&n){const t=o.$implicit;e.xp6(1),e.Q6J("albumItem",t)}}function S(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",10)(1,"div",11)(2,"h3"),e._uU(3,"Add Item"),e.qZA(),e.TgZ(4,"app-plus",12),e.NdJ("click",function(){e.CHM(t);const l=e.oxw(2);return e.KtG(l.onGetForm())}),e.qZA()()()}}function G(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t)}}function z(n,o){if(1&n&&(e.ynx(0),e.YNc(1,G,2,1,"span",23),e.BQk()),2&n){const t=o.$implicit;e.xp6(1),e.Q6J("ngIf",!0!==t)}}function j(n,o){if(1&n&&(e.TgZ(0,"p",22),e.YNc(1,z,2,1,"ng-container",5),e.qZA()),2&n){const t=e.oxw(3);e.xp6(1),e.Q6J("ngForOf",t.errors("Name"))}}function H(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t)}}function K(n,o){if(1&n&&(e.ynx(0),e.YNc(1,H,2,1,"span",23),e.BQk()),2&n){const t=o.$implicit;e.xp6(1),e.Q6J("ngIf",!0!==t)}}function L(n,o){if(1&n&&(e.TgZ(0,"p",22),e.YNc(1,K,2,1,"ng-container",5),e.qZA()),2&n){const t=e.oxw(3);e.xp6(1),e.Q6J("ngForOf",t.errors("AlbumId"))}}function $(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw(3);e.xp6(1),e.Oqu(t.albumPanelError)}}function B(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"form",13),e.NdJ("ngSubmit",function(){e.CHM(t);const l=e.oxw(2);return e.KtG(l.onAddAlbumItem())}),e.TgZ(1,"div",14)(2,"label",15),e._uU(3,"Album Item name"),e.qZA(),e._UZ(4,"input",16),e.YNc(5,j,2,1,"p",17),e.qZA(),e.TgZ(6,"div",18)(7,"label",19),e._uU(8,"Album id"),e.qZA(),e._UZ(9,"input",20),e.YNc(10,L,2,1,"p",17),e.qZA(),e.TgZ(11,"button",21),e._uU(12,"Add Item"),e.qZA(),e.TgZ(13,"p",22),e.YNc(14,$,2,1,"span",23),e.qZA()()}if(2&n){const t=e.oxw(2);e.Q6J("formGroup",t.form),e.xp6(5),e.Q6J("ngIf",t.get("Name").invalid&&t.get("Name").touched),e.xp6(5),e.Q6J("ngIf",t.get("AlbumId").invalid&&t.get("AlbumId").touched),e.xp6(4),e.Q6J("ngIf",t.albumPanelError)}}function X(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div")(1,"div",24)(2,"button",25),e.NdJ("click",function(){e.CHM(t);const l=e.oxw(2);return e.KtG(l.formMode=!1)}),e._uU(3,"Work end"),e.qZA()()()}}function R(n,o){if(1&n&&(e.TgZ(0,"div",4),e.YNc(1,Y,2,1,"ng-container",5),e.YNc(2,S,5,0,"ng-template",null,6,e.W1O),e.YNc(4,B,15,4,"form",7),e.YNc(5,X,4,0,"div",8),e.qZA()),2&n){const t=e.MAs(3),i=e.oxw();e.xp6(1),e.Q6J("ngForOf",i.album.albumItems),e.xp6(3),e.Q6J("ngIf",i.formMode),e.xp6(1),e.Q6J("ngIf",i.formMode)("ngIfElse",t)}}let V=(()=>{class n{constructor(){this.addAlbumItemClicked=new e.vpe,this.addAlbumPhotoClicked=new e.vpe,this.deleteAlbumClicked=new e.vpe,this.deleteAlbumItemClicked=new e.vpe,this.deleteAlbumPhotoClicked=new e.vpe,this.formMode=!1,this.albumPanelError=null}ngOnInit(){}open(){this.isOpen=!this.isOpen}onGetForm(){this.formMode=!0,this.initForm(this.album)}onAddAlbumItem(){if(this.form.invalid)return void(this.albumPanelError=f.X.albumPanelError);const t=new v(this.form.value.Name,this.form.value.AlbumId);this.addAlbumItemClicked.emit(t),this.form.reset(),this.albumPanelError=null,this.formMode=!1}onAddAlbumPhoto(t){this.addAlbumPhotoClicked.emit(t)}onDeleteAlbum(){window.confirm("\u10dc\u10d0\u10db\u10d3\u10d5\u10d8\u10da\u10d0\u10d3 \u10d2\u10e1\u10e3\u10e0\u10d7 \u10d0\u10da\u10d1\u10dd\u10db\u10d8\u10e1 \u10ec\u10d0\u10e8\u10da\u10d0?")&&this.deleteAlbumClicked.emit(this.album.id)}onDeleteAlbumItem(t){this.deleteAlbumItemClicked.emit(t)}onDeleteAlbumPhoto(t){this.deleteAlbumPhotoClicked.emit(t)}errors(t){return Object.values(this.get(t).errors)}get(t){return this.form.get(t)}initForm(t){this.form=new m.cw({Name:new m.NI(null,b.m.required),AlbumId:new m.NI(t.id,b.m.required)})}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-album"]],inputs:{album:"album"},outputs:{addAlbumItemClicked:"addAlbumItemClicked",addAlbumPhotoClicked:"addAlbumPhotoClicked",deleteAlbumClicked:"deleteAlbumClicked",deleteAlbumItemClicked:"deleteAlbumItemClicked",deleteAlbumPhotoClicked:"deleteAlbumPhotoClicked"},standalone:!0,features:[e.jDz],decls:6,vars:2,consts:[[1,"album"],[1,"center","pointer",3,"click"],[1,"delete","button",3,"click"],["class","album-items-content",4,"ngIf"],[1,"album-items-content"],[4,"ngFor","ngForOf"],["plus",""],["class","form",3,"formGroup","ngSubmit",4,"ngIf"],[4,"ngIf","ngIfElse"],[3,"albumItem","addAlbumPhotoClicked","deleteAlbumItemClicked","deleteAlbumPhotoClicked"],[1,"plus"],[1,"plus-btn"],[3,"click"],[1,"form",3,"formGroup","ngSubmit"],[1,"form-control"],["for","Name",1,"form-label"],["type","text","name","Name","placeholder","Album Item Name","formControlName","Name",1,"input"],["class","required",4,"ngIf"],[1,"form-control","visible"],["for","AlbumId",1,"form-label"],["type","text","name","AlbumId","placeholder","Album photo name","formControlName","AlbumId",1,"input"],["type","submit",1,"button","update"],[1,"required"],[4,"ngIf"],[1,"form"],[1,"button","delete",3,"click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"h2",1),e.NdJ("click",function(){return i.open()}),e._uU(2),e.qZA(),e.TgZ(3,"button",2),e.NdJ("click",function(){return i.onDeleteAlbum()}),e._uU(4,"delete album"),e.qZA()(),e.YNc(5,R,6,4,"div",3)),2&t&&(e.xp6(2),e.Oqu(i.album.name),e.xp6(3),e.Q6J("ngIf",i.isOpen))},dependencies:[h.m,c.sg,c.O5,m._Y,m.Fj,m.JJ,m.JL,m.sg,m.u,A.w,E],styles:["*[_ngcontent-%COMP%]{margin:0;padding:0;outline:none;border:none;box-sizing:border-box}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{background-color:#181c21;overflow-x:auto;font-size:16px;font: .75rem/1.33333 Arial,sans-serif;color:#fff}ul[_ngcontent-%COMP%], li[_ngcontent-%COMP%]{list-style:none}a[_ngcontent-%COMP%]{text-decoration:none}.plus-btn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.panel-img[_ngcontent-%COMP%]{height:100px}.form[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;border-bottom:1px solid red;padding:5px;margin:5px}.form[_ngcontent-%COMP%]   .ng-pristine.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}.form-control[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:flex-start;flex-direction:column;margin:10px}.required[_ngcontent-%COMP%]{color:red}.form-label[_ngcontent-%COMP%]{font-size:1rem}.input[_ngcontent-%COMP%]{width:300px;border-radius:5px;margin:5px 0;padding:5px;font-size:.8rem}input[_ngcontent-%COMP%]:disabled{background-color:gray;color:#fff}.button[_ngcontent-%COMP%]{border-radius:5px;padding:5px;margin:5px 0;cursor:pointer}.delete[_ngcontent-%COMP%]{color:#ddd;background-color:#dd1313dc}.update[_ngcontent-%COMP%]{color:#ddd;background-color:#25b125e6}.visible[_ngcontent-%COMP%]{visibility:hidden;display:none}.center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.pointer[_ngcontent-%COMP%]{cursor:pointer}[_nghost-%COMP%]{width:100%;transition:background-color .3s}.album[_ngcontent-%COMP%]{display:flex;justify-content:space-between;padding:10px 20px}.album[_ngcontent-%COMP%]:hover{background-color:#000}.album-items-content[_ngcontent-%COMP%]{padding:5px 20px}.album-items-content[_ngcontent-%COMP%]:hover{background-color:#0009}.plus[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;justify-content:flex-start;padding:0 20px}"]}),n})();var W=s(7579),g=s(4004),d=s(8505),ee=s(529),te=s(885);let ne=(()=>{class n{constructor(t,i){this.http=t,this.loaderService=i,this.albums=null,this.albumsUpdated=new W.x}getAlbums(){return this.http.get("Albums/GetAlbums").pipe(this.loaderService.useLoader,(0,g.U)(t=>t.albums),(0,d.b)(t=>{this.albums=t,this.albumsUpdated.next(this.albums)}))}getAlbumsListener(){return this.albumsUpdated.asObservable()}addAlbum(t){return this.http.post("Albums/AddAlbum",t).pipe(this.loaderService.useLoader,(0,g.U)(i=>i.newAlbum),(0,d.b)(i=>{this.albums=[...this.albums,i],this.albumsUpdated.next([...this.albums])}))}deleteAlbum(t){return this.http.get(`Albums/DeleteAlbum?ID=${t}`).pipe(this.loaderService.useLoader,(0,d.b)(()=>{const i=this.albums.filter(l=>l.id!==t);this.albums=i,this.albumsUpdated.next([...this.albums])}))}addAlbumItem(t){return this.http.post("Albums/AddAlbumItem",t).pipe(this.loaderService.useLoader,(0,g.U)(i=>i.newAlbumItem),(0,d.b)(i=>{const l=this.albums.map(r=>(r.id===i.albumId&&(r.albumItems=[...r.albumItems,i]),r));this.albums=l,this.albumsUpdated.next([...this.albums])}))}deleteAlbumItem(t){return this.http.get(`Albums/DeleteAlbumItem?ID=${t}`).pipe(this.loaderService.useLoader,(0,d.b)(()=>{const i=this.albums.map(l=>(l.albumItems=l.albumItems.filter(r=>r.id!==t),l));this.albums=i,this.albumsUpdated.next([...this.albums])}))}addAlbumPhoto(t){return this.http.post("Albums/AddAlbumPhoto",t).pipe(this.loaderService.useLoader,(0,g.U)(i=>i.newAlbumPhoto),(0,d.b)(i=>{const l=this.albums.map(r=>(r.albumItems=r.albumItems.map(_=>(_.id===i.albumItemId&&_.albumPhotos.push(i),_)),r));this.albums=l,this.albumsUpdated.next([...this.albums])}))}deleteAlbumPhoto(t){return this.http.get(`Albums/DeleteAlbumPhoto?ID=${t}`).pipe(this.loaderService.useLoader,(0,d.b)(()=>{const i=this.albums.map(l=>(l.albumItems=l.albumItems.map(r=>(r.albumPhotos=r.albumPhotos.filter(_=>_.id!==t),r)),l));this.albums=i,this.albumsUpdated.next([...this.albums])}))}}return n.\u0275fac=function(t){return new(t||n)(e.LFG(ee.eN),e.LFG(te.D))},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();function oe(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t)}}function ie(n,o){if(1&n&&(e.ynx(0),e.YNc(1,oe,2,1,"span",14),e.BQk()),2&n){const t=o.$implicit;e.xp6(1),e.Q6J("ngIf",!0!==t)}}function le(n,o){if(1&n&&(e.TgZ(0,"p",13),e.YNc(1,ie,2,1,"ng-container",4),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.errors("Name"))}}function re(n,o){if(1&n&&(e.ynx(0),e.TgZ(1,"option",15),e._uU(2),e.qZA(),e.BQk()),2&n){const t=o.$implicit;e.xp6(1),e.Q6J("value",t),e.xp6(1),e.Oqu(t)}}function me(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Oqu(t)}}function se(n,o){if(1&n&&(e.ynx(0),e.YNc(1,me,2,1,"span",14),e.BQk()),2&n){const t=o.$implicit;e.xp6(1),e.Q6J("ngIf",!0!==t)}}function ae(n,o){if(1&n&&(e.TgZ(0,"p",13),e.YNc(1,se,2,1,"ng-container",4),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",t.errors("AlbumType"))}}function ce(n,o){if(1&n&&(e.TgZ(0,"span"),e._uU(1),e.qZA()),2&n){const t=e.oxw(2);e.xp6(1),e.Oqu(t.albumPanelError)}}function ue(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"form",5),e.NdJ("ngSubmit",function(){e.CHM(t);const l=e.oxw();return e.KtG(l.onAddAlbum())}),e.TgZ(1,"div",6)(2,"label",7),e._uU(3,"Album name"),e.qZA(),e._UZ(4,"input",8),e.YNc(5,le,2,1,"p",9),e.qZA(),e.TgZ(6,"div",6)(7,"label",10),e._uU(8,"Choose Album type"),e.qZA(),e.TgZ(9,"select",11),e.YNc(10,re,3,2,"ng-container",4),e.qZA(),e.YNc(11,ae,2,1,"p",9),e.qZA(),e.TgZ(12,"button",12),e._uU(13,"Add Album"),e.qZA(),e.TgZ(14,"p",13),e.YNc(15,ce,2,1,"span",14),e.qZA()()}if(2&n){const t=e.oxw();e.Q6J("formGroup",t.albumForm),e.xp6(5),e.Q6J("ngIf",t.get("Name").invalid&&t.get("Name").touched),e.xp6(5),e.Q6J("ngForOf",t.AlbumTypes),e.xp6(1),e.Q6J("ngIf",t.get("AlbumType").invalid&&t.get("AlbumType").touched),e.xp6(4),e.Q6J("ngIf",t.albumPanelError)}}function de(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div")(1,"div",16)(2,"button",17),e.NdJ("click",function(){e.CHM(t);const l=e.oxw();return e.KtG(l.formMode=!1)}),e._uU(3,"Work end"),e.qZA()()()}}function pe(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",18)(1,"h3"),e._uU(2,"Add Album"),e.qZA(),e.TgZ(3,"app-plus",19),e.NdJ("click",function(){e.CHM(t);const l=e.oxw();return e.KtG(l.onGetAlbumForm())}),e.qZA()()}}function _e(n,o){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"app-album",20),e.NdJ("addAlbumPhotoClicked",function(l){e.CHM(t);const r=e.oxw();return e.KtG(r.onAddAlbumPhoto(l))})("addAlbumItemClicked",function(l){e.CHM(t);const r=e.oxw();return e.KtG(r.onAddAlbumItem(l))})("deleteAlbumClicked",function(l){e.CHM(t);const r=e.oxw();return e.KtG(r.onDeleteAlbum(l))})("deleteAlbumItemClicked",function(l){e.CHM(t);const r=e.oxw();return e.KtG(r.onDeleteAlbumItem(l))})("deleteAlbumPhotoClicked",function(l){e.CHM(t);const r=e.oxw();return e.KtG(r.onDeleteAlbumPhoto(l))}),e.qZA(),e.BQk()}if(2&n){const t=o.$implicit;e.xp6(1),e.Q6J("album",t)}}let p=class{constructor(o,t){this.albumsService=o,this.ref=t,this.formMode=!1,this.albumPanelError=null}ngOnInit(){this.AlbumTypes=[u.album,u.frescoes,u.handicraft,u.other],this.albumsService.getAlbums().pipe((0,a.t)(this)).subscribe(),this.albumsService.getAlbumsListener().pipe((0,a.t)(this)).subscribe(o=>{this.albums=o,this.ref.markForCheck()})}onGetAlbumForm(){this.formMode=!0,this.initForm()}onAddAlbum(){if(this.albumForm.invalid)return void(this.albumPanelError=f.X.albumPanelError);this.albumPanelError=null;const o=new P(this.albumForm.value.Name,this.albumForm.value.AlbumType);this.albumsService.addAlbum(o).pipe((0,a.t)(this)).subscribe(()=>{this.albumPanelError=null,this.formMode=!1,this.albumForm.reset(),this.ref.markForCheck()})}onAddAlbumItem(o){this.albumsService.addAlbumItem(o).pipe((0,a.t)(this)).subscribe()}onAddAlbumPhoto(o){this.albumsService.addAlbumPhoto(o).pipe((0,a.t)(this)).subscribe()}onDeleteAlbum(o){this.albumsService.deleteAlbum(o).pipe((0,a.t)(this)).subscribe()}onDeleteAlbumItem(o){this.albumsService.deleteAlbumItem(o).pipe((0,a.t)(this)).subscribe()}onDeleteAlbumPhoto(o){this.albumsService.deleteAlbumPhoto(o).pipe((0,a.t)(this)).subscribe()}errors(o){return Object.values(this.get(o).errors)}get(o){return this.albumForm.get(o)}initForm(){this.albumForm=new m.cw({Name:new m.NI(null,b.m.required),AlbumType:new m.NI(null,b.m.required)})}trackElementBy(o,t){return o}};p.\u0275fac=function(o){return new(o||p)(e.Y36(ne),e.Y36(e.sBO))},p.\u0275cmp=e.Xpm({type:p,selectors:[["app-albums-panel"]],standalone:!0,features:[e.jDz],decls:7,vars:6,consts:[["class","form",3,"formGroup","ngSubmit",4,"ngIf"],[4,"ngIf","ngIfElse"],["plus",""],[1,"albums-content"],[4,"ngFor","ngForOf"],[1,"form",3,"formGroup","ngSubmit"],[1,"form-control"],["for","Name",1,"form-label"],["type","text","name","Name","placeholder","Album Name","formControlName","Name",1,"input"],["class","required",4,"ngIf"],["for","AlbumType",1,"form-label"],["type","text","name","AlbumType","formControlName","AlbumType",1,"input"],["type","submit",1,"button","update"],[1,"required"],[4,"ngIf"],[3,"value"],[1,"form"],[1,"button","delete",3,"click"],[1,"plus-btn"],[3,"click"],[3,"album","addAlbumPhotoClicked","addAlbumItemClicked","deleteAlbumClicked","deleteAlbumItemClicked","deleteAlbumPhotoClicked"]],template:function(o,t){if(1&o&&(e.YNc(0,ue,16,5,"form",0),e.YNc(1,de,4,0,"div",1),e.YNc(2,pe,4,0,"ng-template",null,2,e.W1O),e.TgZ(4,"div",3),e.YNc(5,_e,2,1,"ng-container",4),e.ALo(6,"async"),e.qZA()),2&o){const i=e.MAs(3);e.Q6J("ngIf",t.formMode),e.xp6(1),e.Q6J("ngIf",t.formMode)("ngIfElse",i),e.xp6(4),e.Q6J("ngForOf",e.lcZ(6,4,t.albumsService.albumsUpdated))}},dependencies:[h.m,c.sg,c.O5,m._Y,m.YN,m.Kr,m.Fj,m.EJ,m.JJ,m.JL,m.sg,m.u,A.w,c.Ov,V],styles:["*[_ngcontent-%COMP%]{margin:0;padding:0;outline:none;border:none;box-sizing:border-box}html[_ngcontent-%COMP%], body[_ngcontent-%COMP%]{height:100%}body[_ngcontent-%COMP%]{background-color:#181c21;overflow-x:auto;font-size:16px;font: .75rem/1.33333 Arial,sans-serif;color:#fff}ul[_ngcontent-%COMP%], li[_ngcontent-%COMP%]{list-style:none}a[_ngcontent-%COMP%]{text-decoration:none}.plus-btn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center}.panel-img[_ngcontent-%COMP%]{height:100px}.form[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;border-bottom:1px solid red;padding:5px;margin:5px}.form[_ngcontent-%COMP%]   .ng-pristine.ng-invalid.ng-touched[_ngcontent-%COMP%]{border:1px solid red}.form-control[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:flex-start;flex-direction:column;margin:10px}.required[_ngcontent-%COMP%]{color:red}.form-label[_ngcontent-%COMP%]{font-size:1rem}.input[_ngcontent-%COMP%]{width:300px;border-radius:5px;margin:5px 0;padding:5px;font-size:.8rem}input[_ngcontent-%COMP%]:disabled{background-color:gray;color:#fff}.button[_ngcontent-%COMP%]{border-radius:5px;padding:5px;margin:5px 0;cursor:pointer}.delete[_ngcontent-%COMP%]{color:#ddd;background-color:#dd1313dc}.update[_ngcontent-%COMP%]{color:#ddd;background-color:#25b125e6}.visible[_ngcontent-%COMP%]{visibility:hidden;display:none}.center[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center}.pointer[_ngcontent-%COMP%]{cursor:pointer}.form[_ngcontent-%COMP%]   .button[_ngcontent-%COMP%]{margin:10px}.albums-content[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;flex-direction:column;margin:0 40px}.plus-btn[_ngcontent-%COMP%]{margin-top:20px}"],changeDetection:0}),p=(0,x.gn)([(0,a.c)()],p)}}]);