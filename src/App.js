import React, { Component } from 'react';
//import Particle from './Components/Particle/Particle';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import TargetLinkform from './Components/TargetLinkForm/TargetLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';


const app = new Clarifai.App({
  apiKey: '2a9966a82f104095b864e5bd1fe72051'
});


const particleOption = {
  particles: {
    number: {
      value: 500,
      density: {
        enable: true,
        value_area: 1000
      }

    },
    color: {
      value: '#f5405f'
    }

   }
}




class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        entry:new Date()
      }
    }
  }
  loadUser=(data)=>{
    //console.log(data.id);
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        entry:data.entry
      }
    })
  }
  GetBoxSize = (data) => {
    //console.log('Hi')
    //console.log(data);
    const boxes = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(boxes);
    const image = document.getElementById('faceimage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(`${width} ${height}`);
    return {
      leftCol: boxes.left_col * width,
      topRow: boxes.top_row * height,
      rightCol: width - (boxes.right_col * width),
      bottomRow: height - (boxes.bottom_row * height)

    }


  }
  setBox = (box) => {
    //console.log(box);
    this.setState({ box: box });
  }
  onInputChange = (event) => {
    //console.log(event.target.value);
    this.setState({ input: event.target.value })
  }
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    //console.log('clicked');
    //console.log(this.state.input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response=> this.setBox(this.GetBoxSize(response)))
    .catch(err=>console.log(err));
  }
  onRouteChange=(route)=>{
    if(route=='signin'||route=='register')
    {
      this.setState({isSignedIn:false});
    }
    else if(route=='home')
    {
      this.setState({isSignedIn:true});

    }

    this.setState({route:route});
  }
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOption}
        />

        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {
          this.state.route==='home'?
          <div>
        
              <Logo />
              <Rank />
              <TargetLinkform onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />

              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>:
        (
          this.state.route=='signin'?<Signin onRouteChange={this.onRouteChange}/>:
          <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
  }
}

export default App;
