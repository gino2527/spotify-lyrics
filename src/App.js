import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      item: {},
      lyrics: ''
    }
  }
  
  componentDidMount = () => {
    if ( localStorage.getItem('accessToken') ) {
      setInterval(() => {
        axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          }
        })
        .then(res => {
          let { title, artist } = this.state;
          if ( title !== res.data.item.name || artist !== res.data.item.artists[0].name ) {
            this.setState({
              item: res.data.item,
              title: res.data.item.name,
              artist: res.data.item.artists[0].name,
              show: false
            }, () => {
              axios.get('https://api.musixmatch.com/ws/1.1/matcher.lyrics.get', {
                params: {
                  format: 'json',
                  callback: 'jsonp',
                  q_track: this.state.title,
                  q_artist: this.state.artist,
                  apikey: '81122af4e7182c602b1b83dda353e355'
                }
              })
                .then(res => {
                  this.setState({
                    show: true
                  }, () => {
                    document.getElementById('lyrics').innerHTML = res.data.message.body.lyrics.lyrics_body.replace(/(?:\r\n|\r|\n)/g, '<br>');
                  })                
                })
            })
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 401) {
              window.localStorage.removeItem('accessToken')
              if (window.confirm('Token expired. Please reconnect with Spotify') === true) {
                window.location.href = 'https://accounts.spotify.com/authorize?client_id=97f6ad504c9243aa8b8a22cd70e1b7c8&scope=user-read-currently-playing&redirect_uri=https://gino2527.github.io/spotify-lyrics/&response_type=token'
              }
            }
          }
        })
      }, 2500)
    } else {
      if (window.location.href.split('/#')[1]) {
        let token = window.location.href.split('/#')[1].split('&')[0].split('=')[1];
        window.localStorage.setItem('accessToken', token);
        window.location.href = '/';
      } else {
        if (window.confirm('Connect with Spotify') === true) {
          window.location.href = 'https://accounts.spotify.com/authorize?client_id=97f6ad504c9243aa8b8a22cd70e1b7c8&scope=user-read-currently-playing&redirect_uri=https://gino2527.github.io/spotify-lyrics&response_type=token'
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.state.show &&
              <>
                <p style={{fontSize: '24px', margin: 0, fontWeight: 'bold'}}>{this.state.title}</p>
                <p style={{fontSize: '20px', margin: 0}}>{this.state.artist}</p>
                <p id='lyrics' style={{fontSize: '16px'}}></p>
              </>
          }          
        </header>
      </div>
    );
  }
}

export default App;
