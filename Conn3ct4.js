function startGame(){

    connect4.start();
    cmatrix = new matrix();
    cboard = new board();
    cboard.update();

}

var connect4 = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.context = this.context.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },

    clear : function() {
        this.context.clearRect(0,0,this.context.canvas.width, this.context.canvas.height);
    }
} 

function matrix() {
    this.int_matrix = [
        [0,0,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,0,0,0,0],
        [0,1,0,2,2,2,0],
        [0,0,0,0,0,0,0]
    ];

    this.add_coin = function(number, color) {
        for(i = 0; i < 7; i ++){
            if(this.int_matrix[i][number] == 0){
                this.int_matrix[i][number] = color;
                break;
            }else if(i == 6){
                return 0;
            }
            return 1;
        }
    }
}

function board(width, height) {
    this.width = width;
    this.height = height;

    this.update = function(matrix){
        this.ctx = myGameArea.context;
        this.drawBox();
        this.drawCircles(matrix);
    }

    this.drawBox = function(){
        this.ctx.color = "yellow";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    this.drawCircles = function(matrix){
        for(i = 6; i >= 0; i--){
            for(j = 0; j = 7; j ++){
               if(matrix.int_matrix[i][j] == 0){
                   ctx.color = "white";
                   ctx.fillStyle = "white";
               }else if(matrix.int_matrix[i][j] == 1){
                   ctx.color = "black";
                   ctx.fillStyle = "black";
               }else{
                   ctx.color = "red";
                   ctx.fillStyle = "red";
               }

               this.ctx.beginPath();
               this.ctx.moveTo((width/14) * (j*2 + 1), (height/12) * (i*2 + 1));
               this.ctx.arc((width/14) * (j*2 + 1), (height/12) * (i*2 + 1), width/28,0,360,false );
               this.ctx.fill();
            }
        }
    }
}