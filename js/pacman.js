const canvas=document.createElement('canvas');
const mainDiv=document.getElementById('pacman');
canvas.width=mainDiv.offsetWidth;
canvas.height=mainDiv.offsetHeight;
mainDiv.appendChild(canvas);
let stateDive=document.createElement('div');
mainDiv.appendChild(stateDive);
stateDive.style="position:absolute;inset:0;background:rgba(0,0,0,.5);color:yellow;display:flex;align-items:center;justify-content:center;";
stateDive.innerText='press n to start';
let ckeck=0;
let isplay=false;
let c=canvas.getContext('2d');
let direction='down';
let lastkey='ArrowDown';
const speed=3;
const ghostSpeed=2;
let score=10;
const p=document.createElement('p');
p.style="position:relative;color:yellow;bottom:48px;left:100px;display:none";
mainDiv.appendChild(p);
p.innerText=score;
////////////// 1= wall 2= dots 3=space 22 row 19 colunm
let Map=[
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,1],
  [1,1,1,1,2,1,2,2,2,2,2,2,2,1,2,1,1,1,1],
  [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
  [3,3,3,3,2,2,2,1,1,1,1,1,2,2,2,3,3,3,3],
  [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
  [1,1,1,1,2,1,2,2,2,2,2,2,2,1,2,1,1,1,1],
  [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
class Dots{
 constructor({position}) {
   this.x=position.x;
   this.y=position.y;
   this.radius=2;
   this.ea=Math.PI*2;


 }
 draw()
 {
   c.fillStyle='white';
   c.beginPath();
   c.arc(this.x,this.y,this.radius,0,this.ea);
   c.fill();
   c.closePath();
 }
}
class redo{
    constructor({position}) {
        this.row=position.row;
        this.col=position.col;
    }
    redoDots()
    {
        const redointerval=setInterval(()=>
        {
        Map[this.row][this.col]=2;
            clearInterval(redointerval);
        },5000)
    }
}
class Pacman
{
  constructor({position,velocity,matrisPosition}) {
    this.x=position.x;
    this.y=position.y;
    this.velX=velocity.x;
    this.velY=velocity.y;
    this.row=matrisPosition.row;
    this.column=matrisPosition.column;
  }
  draw()
  {
    let image=new Image();
    if (direction==='up')
    {
      image.src='view/pacman-up.png';
    }
   else if (direction==='down')
    {
      image.src='view/pacman-down.png';
    }
   else if (direction==='right')
  {
    image.src='view/pacman-right.png';
  }
   else if (direction==='left')
  {
    image.src='view/pacman-left.png';
  }
   else
    {
      image.src='view/pacman-full.png';
    }

   c.beginPath();
   c.drawImage(image,this.x,this.y,22,22);
   c.closePath();
  }
  goUp()
  {
    if (Map[this.row-1][this.column]!==1)
    {
     direction='up';
      this.velY=-speed;
      this.update();
      if (this.y%18===0)
      {
        this.row--;
        if (Map[this.row][this.column]===2)
        {
          score+=10;
          p.innerText=score;
          new redo({position:{row:this.row,col:this.column}}).redoDots();
        }
        if (this.y!==this.row*18)
        {
          this.y=this.row*18;
          this.draw();
        }
        Map[this.row][this.column]=3;
      }
    }
  }
  goDown()
  {
    if (Map[this.row+1][this.column]!==1)
    {
      direction='down';
      this.velY=speed;
      this.update();
      if (this.y%18===0)
      {
        this.row++;
        if (Map[this.row][this.column]===2)
        {
          score+=10;
          p.innerText=score;
            new redo({position:{row:this.row,col:this.column}}).redoDots();
        }
        if (this.y!==this.row*18)
        {
          this.y=this.row*18;
          this.draw();
        }
        Map[this.row][this.column]=3;
      }
    }
  }
  goRight()
  {
    if (Map[this.row][this.column+1]!==1)
    {
      direction='right';
      this.velX=speed;
      this.update();
      if (this.x%18===0)
      {
        this.column++;
        if (Map[this.row][this.column]===2)
        {
          score+=10;
          p.innerText=score;
            new redo({position:{row:this.row,col:this.column}}).redoDots();
        }
        if (this.x!==this.column*18)
        {
          this.x=this.column*18;
          this.draw();
        }
        Map[this.row][this.column]=3;
      }
    }
  }
  goLeft()
  {
    if (Map[this.row][this.column-1]!==1)
    {
      direction='left';
      this.velX=-speed;
      this.update();
      if (this.x%18===0)
      {
        this.column--;
        if (Map[this.row][this.column]===2)
        {
          score+=10;
          p.innerText=score;
            new redo({position:{row:this.row,col:this.column}}).redoDots();
        }
        if (this.x!==this.column*18)
        {
          this.x=this.column*18;
          this.draw();
        }
        Map[this.row][this.column]=3;
      }
    }
  }
  update()
  {
    // if (this.x <=3*18 && this.y ===180 ) {
    //   direction = 'left';
    //   lastkey = 'ArrowLeft';
    // }
    if (this.x<-18)
    {
      direction='left';
      lastkey='ArrowLeft';
      this.x=342;
      this.y=180;
      this.column=19;

    }

    // if(this.x>18*16 && this.y ===180 ) {
    //   direction = 'right';
    //   lastkey = 'ArrowRight';
    // }
      if (this.x>360)
      {
        direction='right';
        lastkey='ArrowRight';
        this.x=0;
        this.y=180;
        this.column=0;
      }


    this.x+=this.velX;
    this.y+=this.velY;
    this.draw();
  }
  play()
  {
    isplay=false;
    let timer=3;
    if (ckeck!==1)
    {
      let interval=setInterval(()=>
      {

        stateDive.innerText=timer;
        timer--;
        if (timer<0)
        {
          ckeck=0;
          direction='down';
          lastkey='ArrowDown';
          isplay=true;
          score=10;
          pacman=new Pacman({position:{x:18,y:18},velocity:{x:0,y:0},matrisPosition:{row:1,column:1}});
          BlueGost=new Ghosts({position:{x:14*18,y:14*18},velocity:{x:0,y:0},matrisPosition:{row:14,column:14},src:'view/blue.png',direction:'up'});
          RedGost=new Ghosts({position:{x:10*18,y:7*18},velocity:{x:0,y:0},matrisPosition:{row:7,column:10},src:'view/red.png',direction:'up'});
          PinkGost=new Ghosts({position:{x:17*18,y:20*18},velocity:{x:0,y:0},matrisPosition:{row:20,column:17},src:'view/pink.png',direction:'left'});
          OrangeGost=new Ghosts({position:{x:5*18,y:10*18},velocity:{x:0,y:0},matrisPosition:{row:10,column:5},src:'view/orange.png',direction:'left'});
          Map=[
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
            [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
            [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
            [1,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,1],
            [1,1,1,1,2,1,2,2,2,2,2,2,2,1,2,1,1,1,1],
            [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
            [3,3,3,3,2,2,2,1,1,1,1,1,2,2,2,3,3,3,3],
            [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
            [1,1,1,1,2,1,2,2,2,2,2,2,2,1,2,1,1,1,1],
            [1,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,1],
            [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
            [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
            [1,2,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1],
            [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
            [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
            [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
            [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
          ];
          stateDive.style.display="none";
          clearInterval(interval);
        }
      },1000);
    }
  }
}
class Ghosts
{
  constructor({position,velocity,matrisPosition,src,direction}) {
    this.x=position.x;
    this.y=position.y;
    this.velX=velocity.x;
    this.velY=velocity.y;
    this.row=matrisPosition.row;
    this.column=matrisPosition.column;
    this.src=src;
    this.direction=direction;
    this.isOut=false;
  }
  draw()
  {
    let image=new Image();
      image.src=this.src;
    c.beginPath();
    c.drawImage(image,this.x,this.y,22,22);
    c.closePath();
  }
  goUp()
  {
    if (Map[this.row-1][this.column]!==1)
    {
      this.direction='up';
      this.velY=-ghostSpeed;
      this.update();
      if (this.y%18===0)
      {
        this.row--;
        this.checkMove();
      }
    }
  }
  goDown()
  {
    if (Map[this.row+1][this.column]!==1)
    {
      this.direction='down';
      this.velY=ghostSpeed;
      this.update();
      if (this.y%18===0)
      {
        this.row++;
          this.checkMove();

      }

    }
  }
  goRight()
  {
    if (Map[this.row][this.column+1]!==1)
    {
      this.direction='right';
      this.velX=ghostSpeed;
      this.update();
      if (this.x%18===0)
      {
        this.column++;
          this.checkMove();

      }

    }
  }
  goLeft()
  {
    if (Map[this.row][this.column-1]!==1)
    {
      this.direction='left';
      this.velX=-ghostSpeed;
      this.update();
      if (this.x%18===0)
      {
        this.column--;
          this.checkMove();

      }

    }
  }
  checkMove()
  {
      if (this.x>0 && this.x<342)
      {
          if (this.x%18===0&&this.y%18===0)
          {
              let counter=0;
              if (Map[this.row+1][this.column]!==1)
              {
                  counter++;
              }
              if (Map[this.row-1][this.column]!==1)
              {
                  counter++;
              }
              if (Map[this.row][this.column+1]!==1)
              {
                  counter++;
              }
              if (Map[this.row][this.column-1]!==1)
              {
                  counter++;
              }
              if (counter>=3)
              {
                  let random=randomNumber(1,4);
                  switch (random)
                  {
                      case 1:
                      {
                          this.direction="up";
                          break;
                      }
                      case 2:
                      {
                          this.direction="right";
                          break;
                      }
                      case 3:
                      {
                          this.direction="down";
                          break;
                      }
                      case 4:
                      {
                          this.direction="left";
                          break;
                      }
                  }
              }
          }
      }

  }
  update()
  {
    if (this.x <-18)
    {
      this.x=342;
      this.column=19;
    }
    if(this.x>360)
    {
      this.x=0;
      this.column=0;
    }
    this.isOut=false;
    this.x+=this.velX;
    this.y+=this.velY;
    this.draw();
  }
}
let pacman=new Pacman({position:{x:18,y:18},velocity:{x:0,y:0},matrisPosition:{row:1,column:1}});
let BlueGost=new Ghosts({position:{x:14*18,y:14*18},velocity:{x:0,y:0},matrisPosition:{row:14,column:14},src:'view/blue.png',direction:'up'});
let RedGost=new Ghosts({position:{x:10*18,y:7*18},velocity:{x:0,y:0},matrisPosition:{row:7,column:10},src:'view/red.png',direction:'up'});
let PinkGost=new Ghosts({position:{x:17*18,y:20*18},velocity:{x:0,y:0},matrisPosition:{row:20,column:17},src:'view/pink.png',direction:'left'});
let OrangeGost=new Ghosts({position:{x:5*18,y:10*18},velocity:{x:0,y:0},matrisPosition:{row:10,column:5},src:'view/orange.png',direction:'left'});
function  randomNumber(min,max)
{
  return Math.floor(Math.random() * (max-min+1))+min;
}
function animate()
{
  requestAnimationFrame(animate);
  c.clearRect(0,0,canvas.width,canvas.height);
  pacman.velY=0;
  pacman.velX=0;
  RedGost.velY=0;
  RedGost.velX=0;
  BlueGost.velY=0;
  BlueGost.velX=0;
  PinkGost.velY=0;
  PinkGost.velX=0;
  OrangeGost.velY=0;
  OrangeGost.velX=0;

  if (!isplay)
  {
  p.style.display='none';
    return;
  }
else
  {
    p.style.display='flex';
  }

  // if (score===1830)
  // {
  //   stateDive.style.display="flex";
  //
  //   stateDive.innerHTML='you win'+'<br>'+'press N to start';
  //   return;
  // }
  if ((pacman.x + 22 > RedGost.x && pacman.x <RedGost.x+22) &&(pacman.y+22 > RedGost.y && pacman.y< RedGost.y+22))
  {
    stateDive.style.display="flex";

    stateDive.innerHTML='you lose'+'<br>'+'press N to start';
    return;
  }
  if ((pacman.x + 22 > PinkGost.x && pacman.x <PinkGost.x+22) &&(pacman.y+22 > PinkGost.y && pacman.y< PinkGost.y+22))
  {
    stateDive.style.display="flex";

    stateDive.innerHTML='you lose'+'<br>'+'press N to start';
    return;
  }
  if ((pacman.x + 22 > OrangeGost.x && pacman.x <OrangeGost.x+22) &&(pacman.y+22 > OrangeGost.y && pacman.y< OrangeGost.y+22))
  {
    stateDive.style.display="flex";
    stateDive.innerHTML='you lose'+'<br>'+'press N to start';
    return;
  }
  if ((pacman.x + 22 > BlueGost.x && pacman.x <BlueGost.x+22) &&(pacman.y+22 > BlueGost.y && pacman.y< BlueGost.y+22))
  {
    stateDive.style.display="flex";

    stateDive.innerHTML='you lose'+'<br>'+'press N to start';
    return;
  }
  Map.forEach((row,i)=>
  {
    row.forEach((symbol,j)=>
    {
      switch (symbol)
      {
        case 2:
        {
          new Dots({position:{x:18*j+10,y:18*i+10}}).draw();
          break;
        }
      }
    })
  })
  if (lastkey==='ArrowDown')
  {
    if (pacman.x %18 !==0)
    {
      if (direction==='right')
      {
        pacman.goRight();
      }
      else if (direction==='left')
      {
        pacman.goLeft();
      }
    }
    else
    {

      if (Map[pacman.row+1][pacman.column]===1)
      {
        if (direction==='right')
        {
          pacman.goRight();
        }
        else if (direction==='left')
        {
          pacman.goLeft();
        }
      }
      else
      {
        pacman.goDown();
      }
    }
  }

  else if (lastkey==='ArrowUp')
  {
    if (pacman.x %18 !==0)
    {
      if (direction==='right')
      {
        pacman.goRight();
      }
      else if (direction==='left')
      {
        pacman.goLeft();
      }
    }
    else if (pacman.x %18 ===0)
    {
      if (Map[pacman.row-1][pacman.column]===1)
      {
        if (direction==='right')
        {
          pacman.goRight();
        }
        else if (direction==='left')
        {
          pacman.goLeft();
        }
      }
      else
      {
        pacman.goUp();
      }
    }
  }
 else if (lastkey==='ArrowRight')
  {
    if (pacman.y %18 !==0)
    {
      if (direction==='up')
      {
        pacman.goUp();
      }
      else if (direction==='down')
      {
        pacman.goDown();
      }
    }
    else if (pacman.y %18 ===0)
    {
      if (Map[pacman.row][pacman.column+1]===1)
      {
        if (direction==='up')
        {
          pacman.goUp();
        }
        else if (direction==='down')
        {
          pacman.goDown();
        }
      }
      else
      {
        pacman.goRight();
      }
    }
  }
  else if (lastkey==='ArrowLeft')
  {
    if (pacman.y %18 !==0)
    {
      if (direction==='up')
      {
        pacman.goUp();
      }
      else if (direction==='down')
      {
        pacman.goDown();
      }
    }
    else if (pacman.y %18 ===0)
    {
      if (Map[pacman.row][pacman.column-1]===1)
      {
        if (direction==='up')
        {
          pacman.goUp();
        }
        else if (direction==='down')
        {
          pacman.goDown();
        }
      }
      else
      {
        pacman.goLeft();
      }
    }
  }

  ////////////////////////////////////////// ghost momement

   if (BlueGost.direction==="up")
  {
    if (Map[BlueGost.row-1][BlueGost.column]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          BlueGost.direction="up";
          break;
        }
        case 2:
        {
          BlueGost.direction="right";
          break;
        }
        case 3:
        {
          BlueGost.direction="down";
          break;
        }
        case 4:
        {
          BlueGost.direction="left";
          break;
        }
      }
    }
    else
    {
      BlueGost.goUp();
    }

  }
   else    if (BlueGost.direction==="down")
   {
     if (Map[BlueGost.row+1][BlueGost.column]===1)
     {
       let random=randomNumber(1,4);
       switch (random)
       {
         case 1:
         {
           BlueGost.direction="up";
           break;
         }
         case 2:
         {
           BlueGost.direction="right";
           break;
         }
         case 3:
         {
           BlueGost.direction="down";
           break;
         }
         case 4:
         {
           BlueGost.direction="left";
           break;
         }
       }
     }
     else
     {
       BlueGost.goDown();
     }

   }
   else   if (BlueGost.direction==="left")
   {
     if (Map[BlueGost.row][BlueGost.column-1]===1)
     {
      let random=randomNumber(1,4);
       switch (random)
       {
         case 1:
         {
           BlueGost.direction="up";
           break;
         }
         case 2:
         {
           BlueGost.direction="right";
           break;
         }
         case 3:
         {
           BlueGost.direction="down";
           break;
         }
         case 4:
         {
           BlueGost.direction="left";
           break;
         }
       }
     }
     else
     {
       BlueGost.goLeft();
     }

   }
   else   if (BlueGost.direction==="right")
   {
     if (Map[BlueGost.row][BlueGost.column+1]===1)
     {
       let random=randomNumber(1,4);
       switch (random)
       {
         case 1:
         {
           BlueGost.direction="up";
           break;
         }
         case 2:
         {
           BlueGost.direction="right";
           break;
         }
         case 3:
         {
           BlueGost.direction="down";
           break;
         }
         case 4:
         {
           BlueGost.direction="left";
           break;
         }
       }
     }
     else
     {
       BlueGost.goRight();
     }

   }




  // blue ghost test do not come to this aria
  if (RedGost.direction==="up")
  {
    if (Map[RedGost.row-1][RedGost.column]===1)
    {
      let random=randomNumber(1,4);

      switch (random)
      {
        case 1:
        {
          RedGost.direction="up";
          break;
        }
        case 2:
        {
          RedGost.direction="right";
          break;
        }
        case 3:
        {
          RedGost.direction="down";
          break;
        }
        case 4:
        {
          RedGost.direction="left";
          break;
        }
      }
    }
    else
    {
      RedGost.goUp();
    }

  }


  else  if (RedGost.direction==="down")
  {
    if (Map[RedGost.row+1][RedGost.column]===1)
    {
      let random=randomNumber(1,4);

      switch (random)
      {
        case 1:
        {
          RedGost.direction="up";
          break;
        }
        case 2:
        {
          RedGost.direction="right";
          break;
        }
        case 3:
        {
          RedGost.direction="down";
          break;
        }
        case 4:
        {
          RedGost.direction="left";
          break;
        }
      }
    }
    else
    {
      RedGost.goDown();
    }

  }
  else  if (RedGost.direction==="right")
  {
    if (Map[RedGost.row][RedGost.column+1]===1)
    {
      let random=randomNumber(1,4);

      switch (random)
      {
        case 1:
        {
          RedGost.direction="up";
          break;
        }
        case 2:
        {
          RedGost.direction="right";
          break;
        }
        case 3:
        {
          RedGost.direction="down";
          break;
        }
        case 4:
        {
          RedGost.direction="left";
          break;
        }
      }
    }
    else
    {
      RedGost.goRight();
    }

  }

  else  if (RedGost.direction==="left")
  {
    if (Map[RedGost.row][RedGost.column-1]===1)
    {
      let random=randomNumber(1,4);

      switch (random)
      {
        case 1:
        {
          RedGost.direction="up";
          break;
        }
        case 2:
        {
          RedGost.direction="right";
          break;
        }
        case 3:
        {
          RedGost.direction="down";
          break;
        }
        case 4:
        {
          RedGost.direction="left";
          break;
        }
      }
    }
    else
    {
      RedGost.goLeft();
    }

  }



  if (PinkGost.direction==="left")
  {
    if (Map[PinkGost.row][PinkGost.column-1]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          PinkGost.direction="up";
          break;
        }
        case 2:
        {
          PinkGost.direction="right";
          break;
        }
        case 3:
        {
          PinkGost.direction="down";
          break;
        }
        case 4:
        {
          PinkGost.direction="left";
          break;
        }
      }
    }
    else
    {
      PinkGost.goLeft();
    }

  }
  else  if (PinkGost.direction==="right")
  {
    if (Map[PinkGost.row][PinkGost.column+1]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          PinkGost.direction="up";
          break;
        }
        case 2:
        {
          PinkGost.direction="right";
          break;
        }
        case 3:
        {
          PinkGost.direction="down";
          break;
        }
        case 4:
        {
          PinkGost.direction="left";
          break;
        }
      }
    }
    else
    {
      PinkGost.goRight();
    }

  }

 else if (PinkGost.direction==="up")
  {
    if (Map[PinkGost.row-1][PinkGost.column]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          PinkGost.direction="up";
          break;
        }
        case 2:
        {
          PinkGost.direction="right";
          break;
        }
        case 3:
        {
          PinkGost.direction="down";
          break;
        }
        case 4:
        {
          PinkGost.direction="left";
          break;
        }
      }
    }
    else
    {
      PinkGost.goUp();
    }

  }

else  if (PinkGost.direction==="down")
  {
    if (Map[PinkGost.row+1][PinkGost.column]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          PinkGost.direction="up";
          break;
        }
        case 2:
        {
          PinkGost.direction="right";
          break;
        }
        case 3:
        {
          PinkGost.direction="down";
          break;
        }
        case 4:
        {
          PinkGost.direction="left";
          break;
        }
      }
    }
    else
    {
      PinkGost.goDown();
    }

  }




  if (OrangeGost.direction==="down")
  {
    if (Map[OrangeGost.row+1][OrangeGost.column]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          OrangeGost.direction="up";
          break;
        }
        case 2:
        {
          OrangeGost.direction="right";
          break;
        }
        case 3:
        {
          OrangeGost.direction="down";
          break;
        }
        case 4:
        {
          OrangeGost.direction="left";
          break;
        }
      }
    }
    else
    {
      OrangeGost.goDown();
    }

  }
  else   if (OrangeGost.direction==="up")
  {
    if (Map[OrangeGost.row-1][OrangeGost.column]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          OrangeGost.direction="up";
          break;
        }
        case 2:
        {
          OrangeGost.direction="right";
          break;
        }
        case 3:
        {
          OrangeGost.direction="down";
          break;
        }
        case 4:
        {
          OrangeGost.direction="left";
          break;
        }
      }
    }
    else
    {
      OrangeGost.goUp();
    }

  }
  else   if (OrangeGost.direction==="left")
  {
    if (Map[OrangeGost.row][OrangeGost.column-1]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          OrangeGost.direction="up";
          break;
        }
        case 2:
        {
          OrangeGost.direction="right";
          break;
        }
        case 3:
        {
          OrangeGost.direction="down";
          break;
        }
        case 4:
        {
          OrangeGost.direction="left";
          break;
        }
      }
    }
    else
    {
      OrangeGost.goLeft();
    }

  }
  else   if (OrangeGost.direction==="right")
  {
    if (Map[OrangeGost.row][OrangeGost.column+1]===1)
    {
      let random=randomNumber(1,4);
      switch (random)
      {
        case 1:
        {
          OrangeGost.direction="up";
          break;
        }
        case 2:
        {
          OrangeGost.direction="right";
          break;
        }
        case 3:
        {
          OrangeGost.direction="down";
          break;
        }
        case 4:
        {
          OrangeGost.direction="left";
          break;
        }
      }
    }
    else
    {
      OrangeGost.goRight();
    }

  }


  pacman.draw();
  BlueGost.draw();
  RedGost.draw();
  PinkGost.draw();
  OrangeGost.draw();
}
animate();
addEventListener('keydown',(e)=>
{

  switch (e.key)
  {
    case "ArrowUp":
    {
      if((pacman.x<=72 || pacman.x>=270) && pacman.y===180)
      {

      }
      else
      {
        lastkey="ArrowUp";
      }
      break;
    }
    case "ArrowDown":
    {
      if((pacman.x<=72 || pacman.x>=270) && pacman.y===180)
      {

      }
      else
      {
        lastkey="ArrowDown";
      }
      break;
    }
    case "ArrowRight":
    {
     lastkey="ArrowRight";
      break;
    }
    case "ArrowLeft":
  {
    lastkey="ArrowLeft";
    break;
  }
          case 'n':
{
 pacman.play();
 ckeck++;
 stateDive.style.display='flex';
}
  }
});