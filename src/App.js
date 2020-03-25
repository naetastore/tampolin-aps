import React from 'react';
// import logo from './logo.svg';
import './App.css';
import * as Bounce from 'bounce.js';
import default_img from './img_avatar3.png';
import slap from './slap.wav';
import slapImg from './slap.png';
import ModalRegister from './component/ModalRegister.js';
import LastTampol from './component/LastTampol';

import { connect } from 'react-redux';
import { addDataUser } from './config/redux/action';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSignedIn: false,
      userEmail: '',
      slapCount: 0,
      enemiesName: '',
      enemies_img: '',
      slapDisplay: '',
      ytDisplay: '',
      quoteDisplay: '',
      songVideo: '',
      track: '',
    }
  }

  componentDidMount() {
    this.setState({
      enemiesName: 'Click image for "Tampols"',
      enemies_img: default_img,
      slapDisplay: 'none',
      ytDisplay: 'none',
      quoteDisplay: 'none',
      track: slap
    })
  }

  changeName = (e) => {
    this.setState({
      enemiesName: e.target.value
    });
  }

  changeImage = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    //reader
    //onloadstart
    //onprogress
    //onload
    //onloadend:setState url

    reader.onloadend = () => {
      console.log('reader.onloadend');
      this.setState({
        enemies_img: reader.result,
      });
    }

    reader.readAsDataURL(file);
    this.slap();
    console.log('reader');
  }

  slap = () => {
    let bounce = new Bounce();
    let audio = new Audio(slap);
    audio.play();

    bounce.translate({
      from: { x: -300, y: 50 },
      to: { x: 0, y: 0 },
      duration: 50,
    })
      .scale({
        from: { x: 1, y: 5 },
        to: { x: 1, y: 1 },
      })
      .applyTo(document.querySelectorAll('.animation-target'));

    let lastSlap = this.state.slapCount
    this.setState({
      slapCount: lastSlap + 1
    });

    this.setState({
      slapDisplay: 'block',
    })

    if (this.state.slapCount >= 30) {
      this.setState({
        songVideo: 'https://www.youtube.com/embed/dhtGy5iZJ8g?autoplay=1',
        ytDisplay: 'block',
        quoteDisplay: 'block'
      });
    }


    const { enemiesName, slapCount } = this.state;
    if (slapCount === 12) {
      this.handleSaveUser();
    }
    if (enemiesName !== 'Click image for "Tampols"') {
      this.handleSaveUser();
    }
  }

  handleSaveUser = () => {
    const user = this.props.userData;
    const { saveUser } = this.props;
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      enemies_name: this.state.enemiesName,
      date: new Date().getTime()
    }
    saveUser(data)
  }

  render() {
    return (
      <>
        <ModalRegister />
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-3'>
              <h4 className="text-center slap-counter">"Tampol" Counter :</h4>
              <h1 className='text-center'>{this.state.slapCount}</h1>
            </div>
            <div className='col-md-4'>
              <div className='animation-target' style={{ display: this.state.slapDisplay }}
                onClick={this.slap}
              >
                <img alt='HandSlap' src={slapImg}></img>
              </div>
              <div className='card'>
                <div className='card-body enemy-image' onClick={this.slap}>
                  <div className='card-img-overlay'>
                    <h5 className='card-title'>{this.state.enemiesName}</h5>

                    <div className="watermark">
                      {this.props.userData ? (
                        <p>Tampoled by: <span>{this.props.userData.email}</span></p>
                      ) : (
                          <p></p>
                        )}
                    </div>

                  </div>
                  <img src={this.state.enemies_img} className='card-img enemy-foto' alt='EnemyFoto'></img>
                </div>
              </div>
              <div className='card'>
                <div className='card-footer'>
                  <label className="label-file-upload">Upload File
                      <input
                      type='file'
                      htmlFor='upload-file'
                      id='upload-file'
                      className='upload-file'
                      onChange={(e) => this.changeImage(e)}
                      style={{ display: 'none' }} />
                  </label>
                  <input
                    className='form-control input-lg'
                    name='nama'
                    id='nama'
                    placeholder='Insert your enemies name'
                    onChange={(e) => this.changeName(e)}
                  />
                </div>
              </div>
              <div className="card-footer">
                <button
                  className="btn btn-block btn-danger btn-lg btn-tampol"
                  onClick={this.slap}
                >Tampols It Baby!!!</button>
              </div>
            </div>

            <div className="col-md-4">
              <LastTampol />
              <iframe
                style={{ display: this.state.ytDisplay }}
                title="song"
                width="100%" height="300px"
                src={this.state.songVideo}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" />
              <p className="text-center"
                style={{ display: this.state.quoteDisplay }}>
                quote here
                </p>
            </div>
          </div>
          <div className="row text-center mt-5">
            <div className="col-md-12 navbar text-white fixed-bottom navbar-expand-sm navbar-dark bg-dark">
              Tampolin - 2019 by  :
              <a href="https://www.instagram.com/mikorfk2915"> @mikorfk2915
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}


const stateToProps = (state) => ({
  userData: state.user
})

const reduxDispatch = (dispatch) => ({
  saveUser: (data) => dispatch(addDataUser(data))
})

export default connect(stateToProps, reduxDispatch)(App);
