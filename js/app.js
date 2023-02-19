function formatnb(nb, N) {
return Math.round(Math.pow(10,N)*nb)/Math.pow(10,N);
}

function calculate(form1) {
var pi = Math.PI;
var scale = 10; 
var de = "N";
if (form1.dome.checked) { de = "Y" ;}
if (form1.tubediam.value == "0") { form1.tubediam.value = "100";}
var td = parseFloat(form1.tubediam.value);
if (form1.outdiam.value == "0") { form1.outdiam.value = "16";}
var od = parseFloat(form1.outdiam.value);
var ts = form1.Type.value;
switch(ts) {
case ("RR") : if (form1.indiam.value == "0") { form1.indiam.value = "12";}
break;
case ("SW") : if (form1.indiam.value == "0") { form1.indiam.value = "12";}
break; default : form1.indiam.value = "0";
}
var id = parseFloat(form1.indiam.value);
switch(ts) {
case ("RI") : if (form1.holediam.value == "0") { form1.holediam.value = "8";}
break; case ("RR") : if (form1.holediam.value == "0") { form1.holediam.value = "8";}
break; case ("GG") : if (form1.holediam.value == "0") { form1.holediam.value = "2";}
break;
default : form1.holediam.value = "0";
}
var hd = parseFloat(form1.holediam.value);
switch(ts) {
case ("SW") : if ((form1.ribnum.value == "0") || (form1.ribnum.value == "1")) { form1.ribnum.value = "6";}
break; case ("RR") : if ((form1.ribnum.value == "0") || (form1.ribnum.value == "1")) { form1.ribnum.value = "6";}
break; case ("GG") : if ((form1.ribnum.value == "0") || (form1.ribnum.value == "1")) { form1.ribnum.value = "6";}
break;
case ("RI") : form1.ribnum.value = "1";
break;
default : form1.ribnum.value = "0";
}
var nbrs = parseFloat(form1.ribnum.value);
switch(ts) {
case ("RR") : if (form1.ribval.value == "0") { form1.ribval.value = "1";}
break; default : form1.ribval.value = "0";
}
var rvr = parseFloat(form1.ribval.value);
switch(ts) {
case ("SW") : if (form1.spokethk.value == "0") { form1.spokethk.value = "1";}
break; default : form1.spokethk.value = "0";
}
var st = parseFloat(form1.spokethk.value);
if (form1.cylhght.value == "0") ( form1.cylhght.value = "16");
var ch = parseFloat(form1.cylhght.value);
switch(de) {
case ("Y") : if (form1.tothght.value == "0") { form1.tothght.value = "20";}
break; default : form1.tothght.value = "0";
}
var th = parseFloat(form1.tothght.value);       
switch(ts) {
case ("TA") : Tablet(od,ch,scale);
break;
case ("RI") : Ring(od,ch,hd,scale);
break;
case ("RR") : Ribring(od,ch,hd,id,nbrs,rvr,scale);
break;
case ("GG") : Gatling(od,ch,hd,nbrs,scale);
break;
case ("SW") : Spokering(od,ch,id,nbrs,st,scale);
break;
}
if (de == "Y") {Dome(od,ch,th,scale);}
var per=0;
var face=0;
var alpha1=0;
var alpha2=0;
var alpha3=0;
switch(ts) {
case ("RI") : per=pi*(od+nbrs*hd);
face=pi/4*(od*od-nbrs*hd*hd);
break;
case ("RR") : alpha1=2*pi/(nbrs*(rvr+1));
alpha2=rvr*alpha1;
alpha3=2*Math.asin(od*Math.sin(alpha2/2)/id);
per=nbrs*od*Math.sin(alpha2/2)+ nbrs*(od*Math.cos(alpha2/2)-id*Math.cos(alpha3/2))+ id*(2*pi-(nbrs*alpha3))/2 + pi*hd;
face=nbrs/2*(od*Math.cos(alpha2/2)-id*Math.cos(alpha3/2))*od*Math.sin(alpha2/2)+ (2*pi-nbrs*alpha3)*id*id/8 + nbrs*id*id/4*Math.sin(alpha3/2)*Math.cos(alpha3/2)- pi*hd*hd/4;
break;
case ("SW") : per=(od+id)*pi- nbrs*st+ nbrs*(id-(st/Math.tan(pi/nbrs)));
face=(od*od-id*id)*pi/4+nbrs*st*(id-(st/Math.tan(pi/nbrs)))/2+nbrs*(st*st/4/Math.tan(pi/nbrs));
break;
case ("GG") :per=pi*(od+nbrs*hd);
face=pi/4*(od*od-nbrs*hd*hd);
break;
case ("TA") : per=pi*(od+nbrs*hd);
face=pi/4*(od*od-nbrs*hd*hd);       
break;
default : per = 0;
face=0;
} 
var vol=face*ch;
var vocc=pi*od*od/4*ch;
var vfpar=1-(vol/vocc);
switch(de) {
case ("Y") : rdome=(od*od+(th-ch)*(th-ch))/(th-ch)/4;
face=face*rdome*(th-ch)/(od*od/4);
break; default : rdome = 0;
}
var surf=per*ch + 2*face;
switch(de) {
case ("Y") : vocc=vocc+(pi/24*(th-ch)*(3*od*od-(th-ch)^2));
vol=vocc*(1-vfpar);
break; }
var esphd=(6*vol)/surf;
var evd=Math.pow(6*vol/pi,1/3);
if (td<1) { vf=td;
vfocc=1-((1-vf)/(1-vfpar));
} else {
switch(de) {
case ("Y") : vfocc=0.308/td*(3*th*od)/(2*th+od)+0.373;
break;
default : vfocc=0.308/td*(3*ch*od)/(2*ch+od)+0.373;
} 
}
var nbpar=(1-vfocc)/vocc*1E6;
if (td<1) { vf=td;
} else {
vf=vfocc+(1-vfocc)*vfpar; 
}
var spes=nbpar*surf/100;
var sphericity=pi*evd*evd/surf;
var solidity=vol/vocc;
var gar=2/3 ; form1.perim.value = formatnb(per,2);
form1.face.value = formatnb(face,2);
form1.totsurf.value = formatnb(surf,0);
form1.volocc.value = formatnb(vocc,0);
form1.volreal.value = formatnb(vol,0);
form1.partnum.value = formatnb(nbpar,0);
form1.specsurf.value = formatnb(spes,0);
form1.voidocc.value = formatnb(vfocc,4);
form1.voidreal.value = formatnb(vf,4);
form1.eqavdp.value = formatnb(esphd,2);
form1.eqvoldp.value = formatnb(evd,2);
form1.sphfact.value = formatnb(sphericity,4);
form1.solfact.value = formatnb(solidity,4);
}

function resetinput(form1) {
Axes();
form1.outdiam.value = "0";
form1.indiam.value = "0";
form1.holediam.value = "0";
form1.ribnum.value = "0";
form1.ribval.value = "0";
form1.spokethk.value = "0";
form1.cylhght.value = "0";
form1.tothght.value = "0";
}

function resetoutput(form1) {
Axes();
form1.perim.value = "0";
form1.face.value = "0";
form1.totsurf.value = "0";
form1.volocc.value = "0";
form1.volreal.value = "0";
form1.partnum.value = "0";
form1.specsurf.value = "0";
form1.voidocc.value = "0";
form1.voidreal.value = "0";
form1.eqavdp.value = "0";
form1.eqvoldp.value = "0";
form1.sphfact.value = "0";
form1.solfact.value = "0";
}

function reset(form) {
resetinput(form);
resetoutput(form);
return;
}
function Axes() {
var c = document.getElementById("FuriaCanvas");
var ctx = c.getContext("2d");
ctx.clearRect(0,0,400,350);
ctx.beginPath();
ctx.lineWidth=1;
ctx.strokeStyle="#909090";
ctx.moveTo(0,150);
ctx.lineTo(400,150);
ctx.moveTo(100,0);
ctx.lineTo(100,300);
ctx.moveTo(300,0);
ctx.lineTo(300,300);
ctx.moveTo(300,320);
ctx.lineTo(300,325);    
ctx.lineTo(400,325);
ctx.lineTo(400,320);    
ctx.font = "10px Arial";
ctx.fillStyle = "green";
ctx.fillText("scale = 10 mm",320,320);  
ctx.stroke();   
}

function Tablet(odiam,cheight,scale) {
Axes();
var c = document.getElementById("FuriaCanvas");
var ctx = c.getContext("2d");
var od = odiam*scale;
var ch = cheight*scale;
ctx.beginPath();
ctx.lineWidth=3;
ctx.strokeStyle="blue";
ctx.arc(100,150,od/2,0,2*Math.PI);
ctx.strokeRect(300-od/2,150-ch/2,od,ch);
ctx.stroke();
}

function Ring(odiam,cheight,hdiam,scale) {
Axes();
var c = document.getElementById("FuriaCanvas");
var ctx = c.getContext("2d");
var od = odiam*scale;
var ch = cheight*scale;
var hd = hdiam*scale;
ctx.beginPath();    
ctx.lineWidth=2;
ctx.strokeStyle="#909090";
ctx.strokeRect(300-hd/2,150-ch/2,hd,ch);    
ctx.beginPath();
ctx.lineWidth=3;
ctx.strokeStyle="blue";
ctx.arc(100,150,od/2,0,2*Math.PI);
ctx.stroke();   
ctx.beginPath();    
ctx.arc(100,150,hd/2,0,2*Math.PI);  
ctx.strokeRect(300-od/2,150-ch/2,od,ch);    
ctx.stroke();   
}

function Ribring(odiam,cheight,hdiam,idiam,nbrib,ribtoval,scale) {
Axes(); 
var c = document.getElementById("FuriaCanvas");
var ctx = c.getContext("2d");
var od = odiam*scale;
var ch = cheight*scale;
var hd = hdiam*scale;
var id = idiam*scale;
var nbrs = nbrib;
var rvr = ribtoval;
var alpha = (1/nbrs)*(rvr/(1+rvr));
var beta = 1/nbrs ;

ctx.beginPath();    
ctx.lineWidth=1;
ctx.arc(100,150,od/2,0,2*Math.PI);
ctx.moveTo(100,150);
ctx.lineTo(200,150-100*Math.tan(2*Math.PI/nbrs));
ctx.stroke();
ctx.beginPath();    
ctx.arc(100,150,id/2,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();    
ctx.lineWidth=2;
ctx.strokeStyle="#909090";
ctx.strokeRect(300-hd/2,150-ch/2,hd,ch);
ctx.strokeRect(300-id/2,150-ch/2,id,ch);

ctx.beginPath();
ctx.lineWidth=3;
ctx.strokeStyle="blue";
ctx.strokeRect(300-od/2,150-ch/2,od,ch);
ctx.arc(100,150,hd/2,0,2*Math.PI);  
ctx.moveTo(100+id/2,150);
ctx.lineTo(100+od/2,150);
for (var i = 0; i < nbrs; i++) {
ctx.arc(100,150,od/2,2*Math.PI*(1-i*beta),2*Math.PI*(1-i*beta-alpha),true);
ctx.arc(100,150,id/2,2*Math.PI*(1-i*beta-alpha),2*Math.PI*(1-(i+1)*beta),true);     
}   
ctx.stroke();
}

function Gatling(odiam,cheight,hdiam,nbholes,scale) {
Axes();
var c = document.getElementById("FuriaCanvas");
var ctx = c.getContext("2d");
var od = odiam*scale;
var ch = cheight*scale;
var hd = hdiam*scale;
var nbrs = nbholes;
var alpha = 2*Math.PI/(nbrs-1);
ctx.beginPath();    
ctx.lineWidth=1;    
ctx.moveTo(100,150);
ctx.lineTo(200,150-100*Math.tan(alpha)); 
ctx.stroke();
ctx.beginPath();    
ctx.lineWidth=2;
ctx.strokeStyle="#909090";
ctx.strokeRect(300-hd/2,150-ch/2,hd,ch);
ctx.strokeRect(300+((od-hd)/4),150-ch/2,hd,ch); 
ctx.beginPath();    
ctx.lineWidth=3;
ctx.strokeStyle="blue";
ctx.arc(100,150,od/2,0,2*Math.PI);
ctx.stroke();   
ctx.beginPath();    
ctx.arc(100,150,hd/2,0,2*Math.PI);
ctx.stroke();
for (var i = 0; i < nbrs; i++) {
ctx.beginPath();
ctx.arc(100+Math.cos(i*alpha)*(hd/2+(od-hd)/4),150-Math.sin(i*alpha)*(hd/2+(od-hd)/4),hd/2,0,2*Math.PI);
ctx.stroke();   
}
ctx.beginPath();    
ctx.strokeRect(300-od/2,150-ch/2,od,ch);    
ctx.stroke();
}

function Spokering(odiam,cheight,idiam,nbspoke,spokethk,scale) {
Axes(); 
var c = document.getElementById("FuriaCanvas");
var ctx = c.getContext("2d");
var od = odiam*scale;
var ch = cheight*scale;
var id = idiam*scale;
var nbrs = nbspoke;
var st = spokethk*scale;
var alpha = 2*Math.PI/nbrs;
var beta = Math.atan(st/id);
var hd = st/Math.sin(alpha/2);

ctx.beginPath();    
ctx.lineWidth=1;    
ctx.moveTo(100,150);
ctx.lineTo(200,150-100*Math.tan(alpha));  
ctx.stroke();
ctx.beginPath();    
ctx.arc(100,150,id/2,0,2*Math.PI);
ctx.arc(100,150,hd/2,0,2*Math.PI);
ctx.stroke();

ctx.beginPath();    
ctx.lineWidth=2;
ctx.strokeStyle="#909090";
ctx.strokeRect(300-id/2,150-ch/2,id,ch);
ctx.strokeRect(300-hd/2,150-ch/2,hd,ch);

ctx.beginPath();
ctx.lineWidth=3;
ctx.strokeStyle="blue";
ctx.arc(100,150,od/2,0,2*Math.PI);
ctx.strokeRect(300-od/2,150-ch/2,od,ch);
ctx.stroke();
for (var i = 0; i < nbrs; i++) {    
ctx.beginPath();
ctx.arc(100,150,hd/2,(2*i+1)*alpha/2,(2*i+1)*alpha/2);
ctx.arc(100,150,id/2,(i*alpha)+beta,(i+1)*alpha-beta);
ctx.closePath();
ctx.stroke();
}
}

function Dome(odiam,cheight,theight,scale) {
var c = document.getElementById("FuriaCanvas");
var ctx = c.getContext("2d");
var od = odiam*scale;
var ch = cheight*scale;
var th = theight*scale;
var alphad = 2*Math.atan((th-ch)/od);
var rd = od/2/Math.sin(alphad);
ctx.beginPath();
ctx.lineWidth=3;
ctx.strokeStyle="blue";
ctx.arc(300,150+(th/2-rd),rd,1/2*Math.PI+alphad,1/2*Math.PI-alphad,true);
ctx.stroke();
ctx.beginPath();
ctx.arc(300,150-(th/2-rd),rd,3/2*Math.PI+alphad,3/2*Math.PI-alphad,true);
ctx.stroke();
}