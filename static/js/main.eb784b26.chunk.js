(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(t,e,a){t.exports=a(44)},21:function(t,e,a){},42:function(t,e,a){},44:function(t,e,a){"use strict";a.r(e);var i=a(0),n=a.n(i),o=a(10),s=a.n(o),r=(a(21),a(11)),c=a(12),l=a(14),p=a(13),m=a(15),d=a(2),h=a.n(d),u=(a(42),function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(l.a)(this,Object(p.a)(e).call(this,t))).componentDidMount=function(){if(localStorage.getItem("accessToken"))setInterval(function(){h.a.get("https://api.spotify.com/v1/me/player/currently-playing",{headers:{Authorization:"Bearer "+localStorage.getItem("accessToken")}}).then(function(t){var e=a.state,i=e.title,n=e.artist;i===t.data.item.name&&n===t.data.item.artists[0].name||a.setState({item:t.data.item,title:t.data.item.name,artist:t.data.item.artists[0].name,lyrics:""},function(){h.a.get("https://orion.apiseeds.com/api/music/lyric/".concat(a.state.artist,"/").concat(a.state.title),{params:{apikey:"oTpztYN2vcpQj7ytLawsK85q2DQX0nA9QFWBGNebaFdFooQmseyype52PRVNQZ0e"}}).then(function(t){if(t.data.result.artist.name.toLowerCase()!==a.state.artist.toLowerCase())throw"err";a.setState({lyrics:t.data.result.track.text})}).catch(function(t){(t.response&&404===t.response.status||"err"===t)&&h.a.get("https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get",{params:{format:"json",callback:"jsonp",q_track:a.state.title,q_artist:a.state.artist,apikey:"81122af4e7182c602b1b83dda353e355"}}).then(function(t){a.setState({lyrics:t.data.message.body.lyrics.lyrics_body})})})})}).catch(function(t){t.response&&401===t.response.status&&(window.localStorage.removeItem("accessToken"),!0===window.confirm("Token expired. Please reconnect with Spotify")&&(window.location.href="https://accounts.spotify.com/authorize?client_id=97f6ad504c9243aa8b8a22cd70e1b7c8&scope=user-read-currently-playing&redirect_uri=https://gino2527.github.io/spotify-lyrics/&response_type=token"))})},1500);else if(window.location.href.split("/#")[1]){var t=window.location.href.split("/#")[1].split("&")[0].split("=")[1];window.localStorage.setItem("accessToken",t),window.location.href="/spotify-lyrics"}else!0===window.confirm("Connect with Spotify")&&(window.location.href="https://accounts.spotify.com/authorize?client_id=97f6ad504c9243aa8b8a22cd70e1b7c8&scope=user-read-currently-playing&redirect_uri=https://gino2527.github.io/spotify-lyrics/&response_type=token")},a.state={item:{},lyrics:"",show:!0},a}return Object(m.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this.state,e=t.artist,a=t.lyrics,i=t.show,o=t.title;return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},i&&n.a.createElement(n.a.Fragment,null,n.a.createElement("p",{id:"title"},o),n.a.createElement("p",{id:"artist"},e),a.length>0?n.a.createElement("p",{className:"lyrics"},a):n.a.createElement("p",{id:"fetching",className:"lyrics"},o&&e&&"Fetching lyrics..."))))}}]),e}(i.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(n.a.createElement(u,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.eb784b26.chunk.js.map