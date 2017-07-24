
class Display extends React.Component {

  render() {

    if (this.props.error){
      var displayVal = "ERR";
    } else{
      if (this.props.active){
        var displayVal = this.props.children;
        displayVal = (displayVal == 0) ? "--" : displayVal;

      } else{
        var displayVal = "";
      }
    }

    return (
    <div className="display">{displayVal}</div>
    );
  }
}


class GameButton extends React.Component {

  render() {
    var buttonStyle = this.props.colorClass;
    if (this.props.illuminated){
      buttonStyle += " illuminated-" + this.props.color;
    }
    return (
        <div className={buttonStyle} onClick={this.props.playButton}></div>
    );
  }
}


class SettingsMenu extends React.Component {
  constructor(){
    super();
    this.state = {
      test:null,
    };
  }

  render() {
    var activeLEDOn = "led led-active-on";
    var strictLEDOn = "led led-strict-on";


    if (this.props.gameOver){
      return (    <div className="option-container">
                    <div className = "gameOver-menu">
                      <h4>Congrats</h4>
                      <p>You beat Simon in 15 rounds. To continue press the restart button!</p>
                      <div className="btn-container"><button className="btn restart-btn" onClick={this.props.restart}>                          </button>RESTART</div>
                    </div>
                  </div>);
    } else{

      var restartLabel = (this.props.gameStarted) ? "RESTART" : "START";
      return (
      <div className="option-container">
        <h3> Simon<sup className="small">&reg;</sup></h3>
        <div className="row-container">
          <div className={this.props.gameActive ? activeLEDOn : "led"}></div>
          <Display active={this.props.gameActive} error={this.props.error}>{this.props.round}</Display>
          <div className={this.props.strictMode ? strictLEDOn : "led"}></div>
        </div>
        <div className="row-container-two">
          <div className="btn-container"><button className="btn on-btn" onClick={this.props.toggleGame}></button>ON</div>
          <div className="btn-container"><button className="btn restart-btn" onClick={this.props.restart}></button>{restartLabel}</div>
          <div className="btn-container"><button className="btn hard-btn" onClick={this.props.toggleStrict}></button>STRICT</div>
        </div>
      </div>
      );
    }
  }
}


class Board extends React.Component {
  constructor(){
    super();
    this.state = {
      illuminateGreen:false,
      illumintaeRed:false,
      illuminateYellow:false,
      illuminateBlue:false,
      gameActive:false,
      gameStarted:false,
      strictMode:false,
      round: 0,
      error: false,
      gameOver: false,
    };
    this.sequenceInterval;
    this.clickable = false;
    this.sequence = [];
    this.guess = [];
    this.toggleGame = this.toggleGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.toggleStrict = this.toggleStrict.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.pressButton = this.pressButton.bind(this);
  }

  pressButton(btnNum){
    if (this.clickable && this.state.gameActive){

      // perform button animation
      this.clickable = false;
      this.playButton(btnNum);
      this.clickable = true;

      // check if input correct
      this.guess.push(btnNum);
      console.log("Sequence:",this.sequence);
      console.log("Button:",btnNum);
      console.log("Guess:",this.guess);
      if (this.guess[this.guess.length-1] !== this.sequence[this.guess.length-1]){
        this.guess = [];
        // display error
        this.setState({error:true}, function() {
          window.setTimeout(() => {
          this.setState({error:false},function() {
            // or if strict mode -> perform restart
            if (this.state.strictMode){
              this.restartGame();
            } else{
              this.playSequence();
            }
          });
          },1000);
        });


      }
      // if user guessed sequence correctly -> move on to next round
      if (this.guess.length == this.sequence.length){

        // check game over condition
        if (this.guess.length == 15){
          this.clickable = false;
          this.setState({gameOver: true});
        } else{
          this.nextRound();
        }
      this.guess = [];

      }

    }
  }

  playButton(btnNum){
    var dict = ["illuminateGreen","illuminateRed","illuminateYellow","illuminateBlue"];

    if (this.state.gameActive){

      // pass the second state update in a callback function to ensure delayed execution
      this.setState({[dict[btnNum]]: true}, function() {
        // play corresponding audio file
        document.getElementById('audio-'+btnNum).play();
        // arrow function to prevent binding of this to window
        window.setTimeout(() => {
          this.setState({[dict[btnNum]]: false});
        },500);
      });
    }
  }

  restartGame(){

  if (this.state.gameActive){

    if (this.state.gameStarted){
      this.setState({gameStarted:false});
      window.clearInterval(this.sequenceInterval);
      if (this.state.gameOver){
        this.setState({gameOver:false});
      }
        this.setState({round: 0,error:false}, function() {
          this.sequence = [];
          this.guess = [];
        });

    }else{
      this.setState({gameStarted:true}, function() {
        this.nextRound();
      });
    }
  }


  }

  toggleGame(){

    var newState = (this.state.gameActive) ? false : true;
    this.setState({gameActive: newState}, () => {
      if (!this.state.gameActive){
        window.clearInterval(this.sequenceInterval);
        this.guess = [];
        this.sequence = [];
        this.setState({strictMode:false,round: 0,error: false});
      }
    });

  }

    toggleStrict(){
      if (this.state.gameActive && !this.state.gameStarted){
    var newState = (this.state.strictMode) ? false : true;
    this.setState({strictMode: newState});
      }
  }

  toggleButtonAccess(){
    this.clickable = (this.clickable) ? false : true;
  }

  nextRound(){
    // increment round
    var round = this.state.round;
    this.setState({round:round+1});
    this.generateNewItem();
    this.playSequence();
  }



  playSequence(){
    this.clickable = false;
    var sequence = this.sequence;
    var counter = 0;
    this.sequenceInterval =  window.setInterval(() => {
       var value = sequence[counter];
       this.playButton(value);
       counter++;
       if (counter == (sequence.length)){
         clearInterval(this.sequenceInterval);
         this.clickable= true;
       }
      },1000);


  }

  generateNewItem(){
    // generate random number between 0 and 3
    var newElem = Math.floor(Math.random() * 3) + 0;
    this.sequence.push(newElem);
  }



  render() {
    return (
      <div className ="game-container">
       <SettingsMenu toggleGame={this.toggleGame} gameActive={this.state.gameActive} strictMode={this.state.strictMode} toggleStrict={this.toggleStrict} restartGame={this.restartGame} gameActive={this.state.gameActive} round={this.state.round} restart={this.restartGame.bind(this)} error={this.state.error} gameOver={this.state.gameOver} gameStarted={this.state.gameStarted}/>
       <GameButton colorClass="game-btn green" color="green" illuminated={this.state.illuminateGreen} playButton = {() => this.pressButton(0)}/>
        <GameButton colorClass="game-btn red" color="red" illuminated={this.state.illuminateRed} playButton = {() => this.pressButton(1)}/>
       <GameButton colorClass="game-btn yellow" color="yellow" illuminated={this.state.illuminateYellow} playButton = {() => this.pressButton(2)}/>
       <GameButton colorClass="game-btn blue" color="blue" illuminated={this.state.illuminateBlue} playButton = {() => this.pressButton(3)}/>

      </div>

    );
  }
}



class App extends React.Component {
  constructor(){
    super();
    this.state = {
      test:false,
    };
  }

  render() {
    return (
      <div className ="container">
      <Board />
      </div>
    );
  }
}

ReactDOM.render(<App />,document.getElementById('app'));
