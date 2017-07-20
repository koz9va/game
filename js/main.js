    var canvas = document.getElementById('area');
    var ctx = canvas.getContext('2d');
    var speed = 0;
    var dspeed = 0;
    var turnC = 0;
    var score = 1;
    var cubes = [];
    var b,c = 0;
    var colors = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#f1c40f'];
    var cubNums = [];
    var turnT = false;
    function start(){
        Game.start();
    }
    var Game = {
        start: function(){
            this.context = canvas.getContext('2d');
            document.body.insertBefore(canvas, document.body.childNodes[0]);
            cun2()
            for(var i = 0; i < cubNums.length; i++){
                cubes.push(new cube(random(score, Math.floor(score*1.8)),
                '#2ecc71', // here must be random color
                cubNums[i],
                5
                ));
            };
            this.interval = setInterval(updateGame,25)

        },
        context: canvas.getContext('2d')
        ,
        clear: function(){
            this.context.fillStyle = '#fff'
            this.context.fillRect(0,0,canvas.width,canvas.height);
        }
    }
    function component(w,h,col,x,y){
        this.width = w;
        this.height = h;
        this.x = x;
        this.color = col;
        this.y = y;
        this.update = function(){
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y,this.width,this.height);
        }
    }
    function cube(value,col,x, y){
        this.color = col;
        this.value = value;
        this.x = x*102.4 // it must depends from canvas body width
        this.y = y;
        this.width = canvas.width/10;
        this.height = canvas.height/10;
        this.value = value;
        this.update = function(){
            ctx.fillStyle = col;
            if(turnT){
                ctx.fillRect(this.x, this.y+((102.4)*score)/20, this.width, this.height);
                ctx.fillStyle = 'black';
                ctx.font = "30px Comic Sans MS";
                ctx.fillText(this.value,(this.x+this.width/2)-30,
                this.y+(this.height/2)+((102.4)*score)/20);
                turnC++
            }else{
                ctx.fillRect(this.x, this.y, this.width, this.height);
                ctx.fillStyle = 'black';
                ctx.font = "30px Comic Sans MS";
                ctx.fillText(this.value,(this.x+this.width/2)-30,(this.y+this.height/2));
            }
            
        }
    }
    function updateGame(){
        ctx.fillStyle = '#fff';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        for(var i = 0; i < cubes.length; i++){
            cubes[i].update();
        };

    };
    function random(min, max){
        var rand = min + Math.random()*(max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    };
    function cun2(){
        cubNums = [];
        var b = 0;
        var count = 0;
        var list = false
        var t = random(1,10)
        cubNums.push(random(1,10));
       for(var i = 0; i < t; i++){
           while(b < t){
        var j = random(1,10);
            for(var m = 0; m < t; m++){
                if(list){
                    j = random(1,10)
                };
                if(j != cubNums[m]){
                    b++;
                    list = false
                }else{
                    list = true;
                    continue; 
                };
                count++;
            };
            if(b == t){
                cubNums.push(j);
                b = 0;
            };
            if(count >= 10){
                break;
            }
           };
       };
       return cubNums;
    };
    function turn(){
        if(turnC<10){
            turnT = true;
            turnC++
        }else{
            trunT = false;
            turnC = 0;
        }
        
        score++
        return score
    };