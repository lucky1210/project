(function(){
    var Game = window.Game = function(){
        this.canvas = document.getElementById("mycanvas");
        this.ctx = mycanvas.getContext("2d");
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        this.canvas.width = windowWidth <= 420 ? windowWidth : 420;
        this.canvas.height = windowHeight <= 750 ? windowHeight : 750;

        if(!localStorage.getItem("flappybird")){
            localStorage.setItem("flappybird","[]");
        }

        this.scene = 0;

        var self = this;
        this.init(function(){
            self.start();
        })
    }
    Game.prototype.init = function(callback){
        this.R = {
            "bg_day" : "images/bg_day.png",
            "land" : "images/land.png",
            "pipe_down" : "images/pipe_down.png",
            "pipe_up" : "images/pipe_up.png",
            "bird0":"images/bird0_0.png",
            "bird1":"images/bird0_1.png",
            "bird2":"images/bird0_2.png",
            "title":"images/title.png",
            "button":"images/button_play.png",
            "tour":"images/tutorial.png",
            "baoza1":"images/1.png",
            "baoza2":"images/2.png",
            "baoza3":"images/3.png",
            "baoza4":"images/4.png",
            "baoza5":"images/5.png",
            "baoza6":"images/6.png",
            "baoza7":"images/7.png",
            "baoza8":"images/8.png",
            "baoza9":"images/9.png",
            "shuzi0":"images/font_048.png",
            "shuzi1":"images/font_049.png",
            "shuzi2":"images/font_050.png",
            "shuzi3":"images/font_051.png",
            "shuzi4":"images/font_052.png",
            "shuzi5":"images/font_053.png",
            "shuzi6":"images/font_054.png",
            "shuzi7":"images/font_055.png",
            "shuzi8":"images/font_056.png",
            "shuzi9":"images/font_057.png",
            "medals_0":"images/medals_0.png",
            "medals_1":"images/medals_1.png",
            "medals_2":"images/medals_2.png",
            "medals_3":"images/medals_3.png",
            "gameover":"images/text_game_over.png",
            "jiangtai":"images/score_panel.png"
        }

        var count = 0;
        var picAmount = Object.keys(this.R).length;
        for(k in this.R){
            (function(self){
                var src = self.R[k];
                self.R[k] = new Image();
                self.R[k].src = src;
                self.R[k].onload = function(){
                    self.clear();
                    count++;
                    self.ctx.font = "30px 黑体";
                    self.ctx.textAlign = "center";
                    self.ctx.fillText("正在加载资源" + count + "/" + picAmount , self.canvas.width / 2 , 200);
                    if(count == picAmount){
                        callback();
                    }
                }
            })(this)
        }
    }

    Game.prototype.clear = function(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }

    Game.prototype.start = function(){
        this.sm = new SceneManager();
        this.sm.enter(0);
        var self = this;
        this.fram = 0;
        this.ctx.font = "14px consolas";
        this.ctx.textAlign = "left";
        this.timer = setInterval(function(){
            self.fram++;
            self.clear();

            self.sm.updateAndRender();

            self.ctx.fillStyle = "#333";
            self.ctx.textAlign = "left";
            game.ctx.font = "16px consolas";
            self.ctx.fillText(self.fram,15, 20);

            self.ctx.fillText("场景号" + self.scene,15,40);

        },30)
    }
})()