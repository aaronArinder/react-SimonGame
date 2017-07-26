import React, { Component } from 'react';
import './App.css';


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
  return (<button type='button' color={this.props.color} className='box' id={this.props.id} onClick={this.props.onClick}></button>)
}
}

class SimonGame extends Component {
  constructor() {
  super()
  this.state = {
    count: 0,
    numberOfTurns: 20,
    illuminatedRed: false,
    illuminatedBlue : false,
    illuminatedYellow : false,
    illuminatedGreen : false,
    playerTurn: false,
    playerGuesses: [],
    lightValues: this.LightValues(),
    intervalID: null,
  }
}

LightValues(){
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
  console.log('game starting', this.state.lightValues)
  this.setState({
    intervalID: setInterval(this.buttonIllumination.bind(this), 1000)
  })
}

buttonIllumination(){

  //add sound

  var illuminatedValue = 'illuminated' + this.state.lightValues[this.state.count]

    if (illuminatedValue === 'illuminatedRed'){
    this.setState({illuminatedRed: true})
  } else if (illuminatedValue === 'illuminatedBlue')
  {this.setState({illuminatedBlue: true})
} else if (illuminatedValue === 'illuminatedYellow'){
    this.setState({illuminatedYellow: true})
  } else {this.setState({illuminatedGreen: true})}


  if (illuminatedValue === 'illuminatedRed'){
    window.setTimeout(()=>{this.setState({
      illuminatedRed: false,
    })}, 1000)
  } else if (illuminatedValue === 'illuminatedBlue')
  {window.setTimeout(()=>{this.setState({
      illuminatedBlue: false,

    })}, 1000)
  } else if (illuminatedValue === 'illuminatedYellow'){
    window.setTimeout(()=>{this.setState({
      illuminatedYellow: false,

    })}, 1000)
  } else {
    window.setTimeout(
      ()=>{
        this.setState({
      illuminatedGreen: false,
      })
  }, 1000)
  }

this.cancelInterval()

}

cancelInterval(){
    if(this.state.count === this.state.numberOfTurns){
      this.setState({
        intervalID: clearInterval(this.state.intervalID),
        numberOfTurns: this.state.numberOfTurns < 20 ? this.state.numberOfTurns + 1 : this.state.numberOfTurns
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

  //add illumination and sound

if(this.state.playerTurn){
var guessArray = this.state.playerGuesses
guessArray.push(event.target.getAttribute('color'))

this.setState({
  playerGuesses: guessArray
})
console.log(this.state.playerGuesses)

if(this.state.playerGuesses.length <= this.state.numberOfTurns){
for(var i = 0; i < this.state.playerGuesses.length; i++){
  if(this.state.playerGuesses[i] !== this.state.lightValues[i])
  {console.log(false, 'game-over')

//error handling here, calling some error function that alerts the player and
//resets everything.

  }
}
}

this.nextRound()
 }
}


nextRound(){
if (this.state.playerGuesses.length === this.state.numberOfTurns){
  this.setState({
    playerTurn: false,
    playerGuesses: [],
    count: 0
  })
}
}

Stop(){

}

  render() {

      return(<div className="App">
      <div>
          <GameButton id='redBox' color='Red' illuminatedRed={this.state.illuminatedRed} onClick={this.handleClick.bind(this)}/>
          <GameButton id='blueBox' color='Blue' illuminatedBlue={this.state.illuminatedBlue} onClick={this.handleClick.bind(this)}/>
          <GameButton id='yellowBox' color='Yellow' illuminatedYellow={this.state.illuminatedYellow} onClick={this.handleClick.bind(this)}/>
          <GameButton id='greenBox' color='Green' illuminatedGreen ={this.state.illuminatedGreen} onClick={this.handleClick.bind(this)}/>
      </div>
        <button type="button" onClick={this.start.bind(this)}>start</button>
          <button type="button" onClick={this.Stop.bind(this)}>Stop</button>
      </div>
    );

}
}


export default SimonGame;


/*
to-do:

#Abstract the two timers in buttonIllumination; see if I can make buttonIllumination general enough to require just one set of rules.

#Fix the timing on the illumination.

#Major refactor.

*/
