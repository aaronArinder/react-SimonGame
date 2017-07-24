import React, { Component } from 'react';
import './App.css';


class GameButton extends Component {
  render(){
    if(this.props.illuminatedRed === true){
      return(<div className='box' id='illuminatedRedBox'></div>)
  } else if (this.props.illuminatedBlue === true){
      return(<div className='box' id='illuminatedBlueBox'></div>)}
    else if(this.props.illuminatedYellow === true){
      return(<div className='box' id='illuminatedYellowBox'></div>)}
    else if(this.props.illuminatedGreen === true){
      return(<div className='box' id='illuminatedGreenBox'></div>)}
  return (<div className='box' id={this.props.id}></div>)

}
}

class SimonGame extends Component {
  constructor() {
  super()
  this.state = {
    count: 0,
    illuminatedRed: false,
    illuminatedBlue : false,
    illuminatedYellow : false,
    illuminatedGreen : false,
    gameOn: false,
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

Start(){
  this.setState({
    intervalID: setInterval(this.buttonIllumination.bind(this), 750),
    })
}

buttonIllumination(){
  var illuminatedValue = 'illuminated' + this.state.lightValues[this.state.count]

  // var thisSolution = ham + fist

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
      count: this.state.count + 1,
    })}, 750)
  } else if (illuminatedValue === 'illuminatedBlue')
  {window.setTimeout(()=>{this.setState({
      illuminatedBlue: false,
      count: this.state.count + 1,
    })}, 750)
  } else if (illuminatedValue === 'illuminatedYellow'){
    window.setTimeout(()=>{this.setState({
      illuminatedYellow: false,
      count: this.state.count + 1,
    })}, 750)
  } else {
    window.setTimeout(
      ()=>{
        this.setState({
      illuminatedGreen: false,
      count: this.state.count + 1,})
  }, 750)
  }

if(this.state.count === 20){this.setState({intervalID: clearInterval(this.state.intervalID)})}

}


Stop(){}


  render() {
console.log(this.state.lightValues)
      return(<div className="App">
      <div>
          <GameButton id='redBox' illuminatedRed={this.state.illuminatedRed}/>
          <GameButton id='blueBox' illuminatedBlue={this.state.illuminatedBlue} />
          <GameButton id='yellowBox' illuminatedYellow={this.state.illuminatedYellow} />
          <GameButton id='greenBox' illuminatedGreen ={this.state.illuminatedGreen} />
      </div>
        <button type="button" onClick={this.Start.bind(this)}>Start</button>
          <button type="button" onClick={this.Stop.bind(this)}>Stop</button>
      </div>
    );

}
}


export default SimonGame;
