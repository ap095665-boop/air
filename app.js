const v=document.querySelector('.input_video');
const c=document.getElementById('canvas'),x=c.getContext('2d');
function r(){c.width=innerWidth;c.height=innerHeight}r();onresize=r;
document.getElementById('clear').onclick=()=>x.clearRect(0,0,c.width,c.height);
let p=null;
const h=new Hands({locateFile:f=>'https://cdn.jsdelivr.net/npm/@mediapipe/hands/'+f});
h.setOptions({maxNumHands:1,minDetectionConfidence:.7,minTrackingConfidence:.7});
h.onResults(res=>{
 if(res.multiHandLandmarks&&res.multiHandLandmarks.length){
  const i=res.multiHandLandmarks[0][8];
  const nx=(1-i.x)*c.width,ny=i.y*c.height;
  if(p){x.beginPath();x.moveTo(p.x,p.y);x.lineTo(nx,ny);x.strokeStyle='cyan';x.lineWidth=5;x.lineCap='round';x.stroke();}
  p={x:nx,y:ny};
 } else p=null;
});
new Camera(v,{onFrame:async()=>await h.send({image:v}),width:640,height:480}).start();