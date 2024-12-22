import './App.css';
import Axios from 'axios';
import { useState } from 'react';

function App() {
    const [artist, setArtist] = useState("");
    const [song, setSong] = useState("");
    const [lyricsList, setLyricsList] = useState([]); // Stores multiple songs and lyrics

    function searchLyrics() {
        if (artist === "" || song === "") {
            return;
        }

        Axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
            .then(res => {
                const newLyrics = {
                    artist: artist,
                    song: song,
                    lyrics: res.data.lyrics
                };
                setLyricsList([...lyricsList, newLyrics]); // Append new lyrics
            })
            .catch(err => {
                console.error("Error fetching lyrics:", err);
                alert("Lyrics not found! Check the artist or song name.");
            });
    }

    return (
        <div className="App">
            <h1>Lyrics Finder ????</h1>

            <input className="inp" type="text" 
                placeholder='Artist name'
                onChange={(e) => { setArtist(e.target.value) }} />
            <input className="inp" type="text" 
                placeholder='Song name'
                onChange={(e) => { setSong(e.target.value) }} />
            <button className="btn" 
                onClick={searchLyrics}>
                ???? Search
            </button>
            <hr />

            {/* Display lyrics for multiple songs */}
            {lyricsList.map((item, index) => (
                <div key={index}>
                    <h3>{item.artist} - {item.song}</h3>
                    <pre>{item.lyrics}</pre>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default App;
