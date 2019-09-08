const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let xpallet = 300;
let x,y;
let score = 0;
y=0;

let m = 200;
let n = 300;
let dx,dy;
dx=1.9;
dy=2;

 let brick = [];
 for(let i=0;i<6;i++){
     brick[i] = [];
     for(let j=0;j<10;j++){
         brick[i][j] = {
             bx:0,
             by:0,
             status:true
         };
     }
 }

function drawBrick(){
    y=0;
    for(let i=0;i<6;i++){
        y += (15 + 10);
        x=0;
        for(let j=0;j<10;j++){
            x += 15;
            if(brick[i][j].status==true)
            {
                ctx.fillStyle = "#0f0";
                ctx.fillRect(x,y,40,15);
            }
            brick[i][j].bx = x;
            brick[i][j].by = y;
            x+= 40;
        }
    }
}

function drawBall(){
ctx.beginPath();
ctx.arc(m,n,10,0,2*Math.PI,true);
ctx.fillStyle = "#f0f";
ctx.fill();
ctx.closePath();
   if(m-10<=0||m+10>=600){
       dx = -dx;
   }
   if(n-10<=0||n+10>=600){
       dy = -dy;
       dy =  dy>0?dy+0.7:dy-0.4;
   }
   if(n+10>=600){
       alert('gameOver');
       alert('your score is '+score);
       throw new Error("Something went badly wrong!");
   }
   m+= dx;
   n+= dy;
}
function drawPallete(){
    ctx.fillStyle = "#00f";
    ctx.fillRect(xpallet,600-15,40,15);
    document.onkeydown = function(e) {
        switch (e.keyCode) {
            case 37:
                xpallet-=20;
                break;
            case 39:
                xpallet+= 20;
                break;
        }
    };
    if((m>=xpallet && m<=xpallet+40)&&(n+10>=585 && n+10<=595)){
        dy = -dy;
    }

}
let count=0;
function collisionDitection(){
   for(let i=0;i<6;i++){
       
       for(let j=0;j<10;j++){
           
          if((m>=brick[i][j].bx && m<=brick[i][j].bx + 40)&&(n>=brick[i][j].by && n<=brick[i][j].by + 15)&&(brick[i][j].status==true)){
              brick[i][j].status = false;
              dy = -dy;
              score += 10;
              dx  = dx>0?dx+0.4:dx-0.5;
              dy =  dy>0?dy+0.8:dy-0.4;
          }
       }
   }
}
function draw(){
ctx.fillStyle = "#f00";
ctx.fillRect(0,0,width,height);
drawPallete();
drawBall();
drawBrick();
collisionDitection();
document.getElementById('score').innerHTML = "Score: "+score;
if(dx>20){
    dx = 2;
}
if(dy>20){
    dy=2;
}
 requestAnimationFrame(draw);
}
draw();
