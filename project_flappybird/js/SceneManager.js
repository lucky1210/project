(function(){
    var SceneManager = window.SceneManager = function(){
        this.bindEvent();
    }
    SceneManager.prototype.enter = function(number){
        game.scene = number;
        switch(game.scene){
            case 0:
                this.titley = 0;
                this.buttony = game.canvas.height;
                this.buttonx = (game.canvas.width-116)/2;
                this.birdy = 250;
                this.direction = 1;
            break;
            case 1:
                this.tour = 1;
                this.tourdiction = 1;
            break;
            case 2:
                game.background = new Background();
                game.land = new Land();
                game.bird = new Bird();
                game.pipearr = [];
                game.score = 0;
            break;
            case 3:
                this.baoza = 1;
                this.showbaoza = false;

                document.getElementById("hit").load();
                document.getElementById("hit").play();
                document.getElementById("die").load();
                document.getElementById("die").play();
            break;
            case 4:
                this.gameovery = 0;
                this.shwopai = false;
                var arr = JSON.parse(localStorage.getItem("flappybird"));
                arr = _.uniq(arr);
                arr = _.sortBy(arr,function(item){
                    return item;
                });
                this.best = arr[arr.length - 1];
                if(game.score >= arr[arr.length - 1]){
                    this.model = "medals_1";
                    this.best = game.score;
                }else if(game.score >= arr[arr.length - 2]){
                    this.model = "medals_2";
                }else if(game.score >= arr[arr.length - 3]){
                    this.model = "medals_3";
                }else{
                    this.model = "medals_0";
                }
                arr.push(game.score);
                localStorage.setItem("flappybird" , JSON.stringify(arr));

                this.plany = game.canvas.height;
            break
        }
    }
    SceneManager.prototype.updateAndRender = function(){
        switch(game.scene){
            case 0:
                game.ctx.fillStyle = "#4ec0ca";
                game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);

                game.ctx.drawImage(game.R["bg_day"] , 0 , game.canvas.height - 512)
                game.ctx.drawImage(game.R["bg_day"] , 288 , game.canvas.height - 512)

                game.ctx.drawImage(game.R["land"] , 0 , game.canvas.height - 112);
                game.ctx.drawImage(game.R["land"] , 336 , game.canvas.height - 112);

                this.titley += 160/20;
                if(this.titley >= 160){this.titley = 160}
                game.ctx.drawImage(game.R["title"],(game.canvas.width-178)/2,this.titley);

                this.buttony -= (game.canvas.height-400)/20;
                if(this.buttony <= 400){this.buttony = 400}
                game.ctx.drawImage(game.R["button"],this.buttonx,this.buttony);

                if(this.direction == 1){
                    this.birdy += 2;
                    if(this.birdy > 330){this.direction = -1;}
                }else if(this.direction == -1){
                    this.birdy -= 2;
                    if(this.birdy < 270){this.direction = 1}
                }
                game.ctx.drawImage(game.R["bird0"],(game.canvas.width-48)/2,this.birdy)

            break;
            case 1:
                game.ctx.fillStyle = "#4ec0ca";
                game.ctx.fillRect(0,0,game.canvas.width,game.canvas.height);

                game.ctx.drawImage(game.R["bg_day"] , 0 , game.canvas.height - 512)
                game.ctx.drawImage(game.R["bg_day"] , 288 , game.canvas.height - 512)

                game.ctx.drawImage(game.R["land"] , 0 , game.canvas.height - 112);
                game.ctx.drawImage(game.R["land"] , 336 , game.canvas.height - 112);

                game.ctx.drawImage(game.R["bird0"],(game.canvas.width-48)/2,100);

                game.ctx.save();
                if(this.tourdiction == 1){
                    this.tour += 0.1;
                    if(this.tour>=1){this.tourdiction = -1}
                }else if(this.tourdiction == -1){
                    this.tour -= 0.1;
                    if(this.tour <= 0){this.tourdiction = 1}
                }
                game.ctx.globalAlpha = this.tour;
                game.ctx.drawImage(game.R["tour"],(game.canvas.width   - 114 ) /2,300);
                game.ctx.restore();
            break;
            case 2:
                game.background.update();
                game.background.render();
                game.land.update();
                game.land.render();
                game.bird.update();
                game.bird.render();
                if(game.fram % 120 == 0){
                    new Pipe();
                }
                for(var i = 0; i < game.pipearr.length; i++){
                    game.pipearr[i].update();
                    game.pipearr[i] && game.pipearr[i].render();
                };
                scoreshow();
            break;
            case 3:
                game.background.render();
                game.land.render();
                for(var i = 0 ; i < game.pipearr.length ; i++){
                    game.pipearr[i].render();
                };
                if(!this.showbaoza){
                    game.bird.render();
                    game.bird.y+=16;
                    if(game.bird.y > game.canvas.height - 112){
                        this.showbaoza = true;
                    }
                }else{
                    game.ctx.drawImage(game.R["baoza" + this.baoza] , game.bird.x - 50, game.bird.y - 100, 100 ,100);
                    game.fram % 3 == 0 && this.baoza++;
                    if(this.baoza > 9){
                        this.enter(4);
                    }
                }
                scoreshow();
            break;
            case 4:
                game.background.render();
                game.land.render();
                for(var i = 0 ; i < game.pipearr.length ; i++){
                    game.pipearr[i].render();
                };
                this.gameovery += 10;
                if(this.gameovery > 120){this.gameovery = 120};
                game.ctx.drawImage(game.R["gameover"],(game.canvas.width - 204) / 2,this.gameovery);
                this.plany -= 10;
                if(this.plany < 270){
                    this.plany = 270;
                    this.shwopai = true;
                }
                game.ctx.drawImage(game.R["jiangtai"],(game.canvas.width - 238) / 2,this.plany);
                if(this.shwopai){
                    game.ctx.drawImage(game.R[this.model],(game.canvas.width / 2) - 88,this.plany + 44);
                    game.ctx.textAlign = "right";
                    game.ctx.font = "20px consolas";
                    game.ctx.fillStyle = "#333";
                    game.ctx.fillText(game.score,(game.canvas.width / 2) + 93 , this.plany + 50);
                    game.ctx.fillText(this.best,(game.canvas.width / 2) + 93 , this.plany + 96);
                }
            break;
        }
    }
    SceneManager.prototype.bindEvent = function(){
        var self = this;
        game.canvas.onclick = function(e){
            var x = e.offsetX;
            var y = e.offsetY;
            switch(game.scene){
            case 0:
                if(x > self.buttonx && y > self.buttony && x < self.buttonx+116 && y < self.buttony+70){
                    self.enter(1)
                }
            break;
            case 1:
                self.enter(2);
            break;
            case 2:
                game.bird.fly();
            break;
            case 3:
            break;
            case 4:
                self.enter(0);
            break;
        }
        }

    }
    function scoreshow(){
        var str = game.score.toString();
        var basex = game.canvas.width / 2 - (str.length / 2) * 30;
        for(var i = 0; i < str.length; i++){
            var char = str[i];
            game.ctx.drawImage(game.R["shuzi" + char] , basex + i * 30,100);
        }
    }
})()