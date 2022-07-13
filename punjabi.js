console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Born To Shine - Diljit Dosanjh", filePath: "psongs/1.mp3", coverPath: "pcovers/1.jpg"},
    {songName: "G.O.A.T - Diljit Dosanjh", filePath: "psongs/2.mp3", coverPath: "pcovers/2.jpg"},
    {songName: "LET'em PLAY - Karan Aujla", filePath: "psongs/3.mp3", coverPath: "pcovers/3.jpg"},
    {songName: "East Side Flow - Siddhu Moosewala", filePath: "psongs/4.mp3", coverPath: "pcovers/4.jpg"},
    {songName: "Jatt Da Muqaabla - Siddhu Moosewala", filePath: "psongs/5.mp3", coverPath: "pcovers/5.jpg"},
    {songName: "Patola - Guru Randhawa", filePath: "psongs/6.mp3", coverPath: "pcovers/6.jpg"},
    {songName: "Horn Blow - Hardy Sandhu", filePath: "psongs/7.mp3", coverPath: "pcovers/7.jpg"},
    {songName: "Bombay to punjab - Deep Jandu x Divine", filePath: "psongs/8.mp3", coverPath: "pcovers/8.jpg"},
    {songName: "Brown Munde - AP Dhillon x Gurinder Gill ", filePath: "psongs/9.mp3", coverPath: "pcovers/9.jpg"},
    {songName: "Gaal ni Kadni - Permish Verma ", filePath: "psongs/10.mp3", coverPath: "pcovers/10.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `psongs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `psongs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `psongs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})