/*
 * Tristan Hilbert
 * 4/25/18
 * Conn3ct 4 Browser Game
 * 
 */


/*
 * startGame()
 * First function to be called when entering into the script
 * This creates and stores the objects requried for the game
 * param: None
 * return: None
 */
function startGame(){
    conn3ct4.start();
    cmatrix = new matrix();
    cboard = new board(conn3ct4.canvas.width, conn3ct4.canvas.height);
    turn = 0; /* TODO define turn elsewhere instead as a "global" variable for backend and frontend */
    cboard.update(cmatrix);
}

/*
 * black_go()
 * function for adding a coin when it is black's turn
 * param: None
 * return: None
 * Pre: it is a valid move otherwise error_code(int) will be called
 * Pre: it is blacks turn
 */
function black_go(){
    index = getValue();
    if(turn == 0 && index != -1){
        if(!cmatrix.add_coin(index - 1,1)){
            error_code(-2)
        }else{    
           turn ++;
        }
    }else{
        error_code(index);
    }
    cboard.update(cmatrix);
}

/*
 * red_go()
 * function for adding a coin when it is red's turn
 * param: None
 * return: None
 * Pre: it is a valid move otherwise error_code(int) will be called
 */
function red_go(){
    index = getValue();
    if(turn == 1 && index != -1){
        if(!cmatrix.add_coin(index - 1,2)){
            error_code(-2);
        }else{    
           turn --;
        }
    }else{
        error_code(index);
    }
    cboard.update(cmatrix);
}

/*
 * error_code(int index)
 * prints a string to the html page depending on the integer code
 * param: integer code of -1 or -2
 * return: None
 */
function error_code(int_code){
    if(int_code == -1){
        document.getElementById("Col").value = "Out Of Bounds!";
    }

    if(int_code == -2){
        document.getElementById("Col").value = "That Column is Full!";
    }
}

/*
 * getValue()
 * Gets the value from the html page and returns -1 if the index is out
 *    of bounds
 * param: None
 * return: integer value of html "Col" box
 */
function getValue(){
    integer = document.getElementById("Col").value;
    if(typeof integer === "number" || integer / 8 >= 1 || integer <= 0){
        integer = -1;
    }
    return integer;
}


/*
 * conn3ct4 variable representing
 * a wrapper for the canvas object
 * 
 */
var conn3ct4 = {

    canvas : document.getElementById("cnct4"),

    /*
     * start()
     * Start function for canvas
     */
    start : function() {
        this.context = this.canvas.getContext("2d");
    },

    /*
     * clear()
     * clears canvas of all drawn figures
     *    perfect for updating
     * param: None
     * return: None
     */
    clear : function() {
        this.context.clearRect(0,0,this.context.canvas.width, this.context.canvas.height);
    }
} 

/*
 * matrix()
 * represents the backend for most of the game mainly
 * pertaining to that of the static matrix reference
 * param: None
 * return: matrix object
 */
function matrix() {
    this.int_matrix = [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
    ]

    /*
     * add_coin(int number, int (bool + 1) color)
     * adds a coin for the specified player and column
     * param: number of column and color 1 for black 2 for red
     * return: if successfuly 1 and 0 for otherwise
     */
    this.add_coin = function(number, color) {
        saved_number = -1;
        for(i = 5; i >= 0; i --){
            if(this.int_matrix[i][number] == 0){
                this.int_matrix[i][number] = color;
                saved_number = i;
                break;
            }else if(i == 0){
                return 0;
            }
        }
        this.checkForWin(saved_number, number, color);
        this.checkForTie();
        return 1;
    }

    /*
     * checkForWin(int index1, int index2, int(bool + 1) color)
     * Checks the possibilities for winning the game based off of most recent turn
     * param: index1 row of recent turn, index2 col of recent turn, and color representing player
     * return: None
     */
    this.checkForWin = function(index1, index2, color){
       four_in_row = 0;

       //Check Horizantal
       for(i = 0; i < 7; i ++){
            if(this.int_matrix[index1][i] == color){
                four_in_row ++;
                if(four_in_row == 4){
                    winner(color);
                }
            }else{
                four_in_row = 0;
            }
       }

       four_in_row = 0;
       //Check Vertical
       for(i = 0; i < 6; i ++){
           if(this.int_matrix[i][index2] == color){
               four_in_row ++;
                if(four_in_row == 4){
                    winner(color);
                }
            }else{
                four_in_row = 0;
            }
        }

        four_in_row = 0;
        //Check Diagnal Left (Pos Slope Line)
        for(i = -3; i < 4; i ++){
            if((index1 + i < 0 || index1 + i >= 6 )||(index2 + i < 0 || index2 + i >= 7)){
                continue;
            }

            if(this.int_matrix[index1+i][index2+i] == color){
                four_in_row ++;
                if(four_in_row == 4){
                    winner(color);
                }
            }else{
                four_in_row = 0;
            }
        }

        four_in_row = 0;
        //Check Diagnal Right (Neg Slope Line)
        for(i = -3; i < 4; i ++){
            if((index1 + i < 0 || index1 + i >= 6 )||(index2 - i < 0 || index2 - i >= 7)){
                continue;
            }

            if(this.int_matrix[index1+i][index2-i] == color){
                four_in_row ++;
                if(four_in_row == 4){
                    winner(color);
                }
            }else{
                four_in_row = 0;
            }
        }
       
    }

    /*
     * checksForTie()
     * Checks to see if all columns are filled for a tie
     * param: None
     * return: None
     */
    this.checkForTie = function(){
        for(i = 0; i < 7; i ++){
            if(this.int_matrix[0][i] == 0){
                return;
            }
        }
        tie();
    }
}

/*
 * board(int width, int height)
 * board object representing the frontend of the game
 *  works with the cmatrix and conn3ct4 objects to draw on the canvas the
 *  values of cmatrix with update
 * param: integers representing dimensions of canvas object
 * return: board object
 */
function board(width, height) {
    this.width = width;
    this.height = height;

    /*
     * update(cmatrix)
     * updates the board with the values of cmatrix
     * param: integer matrix of 0s 1s and 2s
     * return: None
     */
    this.update = function(cmatrix){
        this.ctx = conn3ct4.context;
        this.drawBox();
        this.drawCircles(cmatrix);
        this.disableButtons();
    }

    /*
     * drawBox()
     * draws the yellow box down first to handle the illusion of the game board
     * param: None
     * return: None
     */
    this.drawBox = function(){
        this.ctx.color = "yellow";
        this.ctx.fillStyle = "yellow";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /*
     * drawCircles(cmatrix
     * draws the circles representing the values of cmatrix
     * 0 -> white 1-> black 2-> red
     * param: integer matrix of 0s 1s and 2s
     * return: None
     */
    this.drawCircles = function(cmatrix){
        for(i = 5; i >= 0; i--){
            for(j = 0; j < 7; j ++){
               if(cmatrix.int_matrix[i][j] == 0){
                   this.ctx.color = "white";
                   this.ctx.fillStyle = "white";
               }else if(cmatrix.int_matrix[i][j] == 1){
                   this.ctx.color = "black";
                   this.ctx.fillStyle = "black";
               }else{
                   this.ctx.color = "red";
                   this.ctx.fillStyle = "red";
               }

               this.ctx.beginPath();
               this.ctx.moveTo((width/14) * (j*2 + 1), (height/12) * (i*2 + 1));
               this.ctx.arc((width/14) * (j*2 + 1), (height/12) * (i*2 + 1), width/28,0,360,false );
               this.ctx.fill();
            }
        }
    }

    /*
     * disableButtons()
     * good way of signalling turn and allows user to only
     *    add coins on their turn
     * param: None
     * return: None
     */
    this.disableButtons = function(){
        if(document.getElementById("bB") == null || document.getElementById("bR") == null){
            return;
        }
        if(turn == 1){
            document.getElementById("bB").disabled = true;
            document.getElementById("bR").disabled = false;
        }else if(turn == 0){
            document.getElementById("bB").disabled = false;
            document.getElementById("bR").disabled = true;
        }else if(turn == 3){
            document.getElementById("bB").disabled = true;
            document.getElementById("bR").disabled = true;
        }
    }
}


/*
 * winner(int(bool + 1) color)
 * declares a winner based off of the color parameter
 *    and disables buttons
 * 1 -> black | 2 -> red
 * param: integer representing color of winner
 * return None
 */
function winner(color){
    turn = 3;
    cboard.disableButtons();
    if(color == 1){
        document.getElementById("Col").value = "Black Player Wins!";
    }else{
        document.getElementById("Col").value = "Red Player Wins!";
    }
    
}

/*
 * tie()
 * declares a tie for the game and disables all buttons
 * param: None
 * return: None
 */
function tie(){
    turn = 3;
    cboard.disableButtons();
    document.getElementById("Col").value = "This is a tie!";
}