import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      item: {},
      lyrics: '',
      show: true
    }
  }
  
  componentDidMount = () => {
    if ( localStorage.getItem('accessToken') ) {
      setInterval(() => {
        axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('accessToken')
          },
        })
        .then(res => {
          let { title, artist } = this.state;
          if ( title !== res.data.item.name || artist !== res.data.item.artists[0].name ) {
            this.setState({
              item: res.data.item,
              title: res.data.item.name,
              artist: res.data.item.artists[0].name,
              lyrics: ''
            }, () => {
              axios.get(`https://orion.apiseeds.com/api/music/lyric/${this.state.artist}/${this.state.title}`, {
                params: {
                  apikey: 'oTpztYN2vcpQj7ytLawsK85q2DQX0nA9QFWBGNebaFdFooQmseyype52PRVNQZ0e'
                }
              })
                .then(res => {
                  if (res.data.result.artist.name.toLowerCase() !== this.state.artist.toLowerCase()) {
                    throw 'err';
                  } else {
                    this.setState({
                      lyrics: res.data.result.track.text
                    })
                  }
                })
                .catch(err => {
                  if ((err.response && err.response.status === 404) || err === 'err') {
                    axios.get('https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get', {
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
                          lyrics: res.data.message.body.lyrics.lyrics_body
                        })
                      })
                  }
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
      }, 1500)
    } else {
      if (window.location.href.split('/#')[1]) {
        let token = window.location.href.split('/#')[1].split('&')[0].split('=')[1];
        window.localStorage.setItem('accessToken', token);
        window.location.href = '/spotify-lyrics';
      } else {
        if (window.confirm('Connect with Spotify') === true) {
          window.location.href = 'https://accounts.spotify.com/authorize?client_id=97f6ad504c9243aa8b8a22cd70e1b7c8&scope=user-read-currently-playing&redirect_uri=https://gino2527.github.io/spotify-lyrics/&response_type=token'
        }
      }
    }
  }

  render() {
    let { artist, lyrics, show, title } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {
            show &&
              <>
                <p id='title'>{title}</p>
                <p id='artist'>{artist}</p>
                {
                  lyrics.length > 0 ?
                    <p className='lyrics'>
                      {lyrics}
                    </p> :
                    <p id='fetching' className='lyrics'>
                    {
                      title && artist && 'Fetching lyrics...'
                    }                      
                    </p>
                }
              </>
          }
        </header>
      </div>
    );
  }
}

export default App;
