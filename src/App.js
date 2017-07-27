import React, { Component } from 'react';
import './App.css';
import simonSound1 from './Simon-Sounds/simonSound1.mp3'
import simonSound2 from './Simon-Sounds/simonSound2.mp3'
import simonSound3 from './Simon-Sounds/simonSound3.mp3'
import simonSound4 from './Simon-Sounds/simonSound4.mp3'


class GameButton extends Component {
  render(){
    if(this.props.illuminatedRed === true){
      return(<button type='button' className='box' id='illuminatedRedBox' ></button>)
  } else if (this.props.illuminatedBlue === true){
      return(<button className='box' id='illuminatedBlueBox'></button>)}
    else if(this.props.illuminatedYellow === true){
      return(<button className='box' id='illuminatedYellowBox'></button>)}
    else if(this.props.illuminatedGreen === true){
      return(<button className='box' id='illuminatedGreenBox'></button>)}
      else return (<button type='button' color={this.props.color} className='box' id={this.props.id} onClick={this.props.onClick}></button>)
}
}

class SimonGame extends Component {
  constructor() {
  super()
  this.state = {
    strict: 'off',
    count: 0,
    numberOfTurns: 1,
    illuminatedRed: false,
    illuminatedBlue : false,
    illuminatedYellow : false,
    illuminatedGreen : false,
    playerTurn: false,
    playerGuesses: [],
    gameOn: false,
    status: '',
    lightValues: null,
    intervalID: null,
    soundRed: new Audio(simonSound1),
    soundBlue: new Audio(simonSound2),
    soundYellow: new Audio(simonSound3),
    soundGreen: new Audio(simonSound4)
  }
}

lightValues(){
  var lightValues = []

  for(var i = 0; i < 20; i++){
    let randomNumber = Math.floor((Math.random() * 4) + 1)

    if(randomNumber === 1){
      lightValues.push('Red')
    } else if (randomNumber === 2){
      lightValues.push('Blue')
    } else if (randomNumber === 3){
      lightValues.push('Yellow')
    } else {lightValues.push('Green')}
  }
  return lightValues
}

start(){
  if(this.state.gameOn === false){
    this.setState({
    status: '',
    lightValues: this.lightValues(),
    gameOn: true,
    intervalID: setInterval(this.buttonIllumination.bind(this), 1250)
  })
}
}


buttonIllumination(){
  if(this.state.gameOn){
  let illuminatedValue = 'illuminated' + this.state.lightValues[this.state.count]
  let soundValue = 'sound' + this.state.lightValues[this.state.count]

  this.setState({
    [illuminatedValue]: true,
  })
  this.state[soundValue].play()

window.setTimeout(() => this.buttonNormalize(), 750)

this.cancelInterval()

} else {
  this.setState({intervalID: clearInterval(this.state.intervalID)})}
}

buttonNormalize(){
  this.setState({
    illuminatedRed: false,
    illuminatedBlue: false,
    illuminatedYellow: false,
    illuminatedGreen: false,
  })

}

cancelInterval(){
    if(this.state.count === (this.state.numberOfTurns - 1)){
      this.setState({
        intervalID: clearInterval(this.state.intervalID),
      })
      this.playerTurn()
    }
    this.setState({
      count: this.state.count + 1
    })
}


playerTurn(){
this.setState({
  playerTurn: true
})
}


handleClick(event){
  this.setState({status: ''})
if(this.state.playerTurn){
let guessArray = this.state.playerGuesses
let illuminatedValue = 'illuminated' + event.target.getAttribute('color')
let soundValue = 'sound' + event.target.getAttribute('color')

guessArray.push(event.target.getAttribute('color'))

this.setState({
  playerGuesses: guessArray,
  [illuminatedValue]: true
})

this.state[soundValue].play()

window.setTimeout(() => this.buttonNormalize(), 500)

for(var i = 0; i < guessArray.length; i++){
 if(this.state.playerGuesses[i] !== this.state.lightValues[i])
  {
    this.setState({
    playerTurn: false,
    status: 'Wrong!'})

return window.setTimeout(()=> this.redo(), 1250)

  }
 }

if(this.state.playerGuesses.length === this.state.numberOfTurns){
  this.nextRound()
}
}


 }

redo(){
  if(this.state.strict === 'on'){
    this.setState({status: 'Game Over: start to try again.'})
  } else {
    this.setState({
    status: 'Try Again',
    count: 0,
    playerTurn: false,
    playerGuesses: [],
    intervalID: setInterval(this.buttonIllumination.bind(this), 1250)})
}
}

nextRound(){
  if(this.state.numberOfTurns < 20){
  this.setState({
    count: 0,
    numberOfTurns: this.state.numberOfTurns + 1,
    playerTurn: false,
    playerGuesses: [],
    intervalID: setInterval(this.buttonIllumination.bind(this), 1250)
  })
} else if (this.state.numberOfTurns === 20 && this.state.lightValues[19] === this.state.playerGuesses[19]){
  this.setState({
    status: 'Winner! Hit start to play again.',
    })
    this.reset()
} else {this.setState({
  status: 'Game over: hit start to try again.',
  })
  this.reset()
}
 }



reset(){
  this.setState({
  strict: 'off',
  count: 0,
  numberOfTurns: 1,
  illuminatedRed: false,
  illuminatedBlue : false,
  illuminatedYellow : false,
  illuminatedGreen : false,
  playerTurn: false,
  playerGuesses: [],
  gameOn: false,
  intervalID: clearInterval(this.state.intervalID)})
}

strict(){
  if(this.state.strict === 'on'){
  this.setState({
    strict: 'off'
  })} else {this.setState({
    strict: 'on'
  })}
}

  render() {
      return(
    <div className="App">
      <div>
          <GameButton id='redBox' color='Red' illuminatedRed={this.state.illuminatedRed} onClick={this.handleClick.bind(this)}/>
          <GameButton id='blueBox' color='Blue' illuminatedBlue={this.state.illuminatedBlue} onClick={this.handleClick.bind(this)}/>
          <GameButton id='yellowBox' color='Yellow' illuminatedYellow={this.state.illuminatedYellow} onClick={this.handleClick.bind(this)}/>
          <GameButton id='greenBox' color='Green' illuminatedGreen ={this.state.illuminatedGreen} onClick={this.handleClick.bind(this)}/>
      </div>
      <div>
        <button id='startButton' type="button" onClick={this.start.bind(this)}>Start</button>
        <button id='resetButton' type="button" onClick={this.reset.bind(this)}>Reset</button>
        <button id='strctButton' type="button" onClick={this.strict.bind(this)}>Strict Mode</button>
      </div>
      <div>
        <div>Turn: {this.state.numberOfTurns}/20</div>
        <div>Strict: {this.state.strict}</div>
        <div>{this.state.status}</div>
      </div>
    </div>
    );

}
}


export default SimonGame;


/*
to-do:

#major refactor

*/
