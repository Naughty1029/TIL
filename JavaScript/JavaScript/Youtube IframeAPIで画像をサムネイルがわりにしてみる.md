```html
<div class="playerInner">
  <div id="player"></div>
  <h1 id="thumbnail">
    <img id="openYT" data-youtube="" src="sample.jpg" alt="">
  </h1>
</div>
```

```scss
.playerInner{
  position: relative;
  #player{
    width: 100%;
  }
  #thumbnail{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    transition: opacity .3s;
    cursor: pointer;
    &.active{
      opacity: 0;
      pointer-events: none;
    }
  }
}
```

```javascript
// IFrame Player API の読み込みタグを挿入
const tag = document.createElement('script')
tag.src = "https://www.youtube.com/iframe_api"
const firstScriptTag = document.getElementsByTagName('script')[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

let openYT = document.getElementById("openYT");
let thumbnail =  document.getElementById("thumbnail");
let done = false;
let player;

openYT.addEventListener("click",function(){
	onPlayerReady();
})

function onYouTubeIframeAPIReady(){
	player = new YT.Player('player', {
		height: '360',
		width: '640',
		videoId: "M7lc1UVf-VE",
		events: {
			'onStateChange': onPlayerStateChange
		}
	});
}
function onPlayerReady(){
	player.playVideo();
	thumbnail.classList.add("active")
}

function stopYoutube () {
	player.stopVideo();
}

function onPlayerStateChange(event) {
	if (event.data == 2) {
		thumbnail.classList.remove("active")
	}
	// flag
	// 	'-1' : '未開始',
	// 	'0' : '終了',
	// 	'1' : '再生中',
	// 	'2' : '停止',
	// 	'3' : 'バッファリング中',
	// 	'5' : '頭出し済み'
}
```
