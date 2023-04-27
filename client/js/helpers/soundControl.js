const music = {
  muteIcon: document.getElementById("volume-musique-mute"),
  unmuteIcon: document.getElementById("volume-musique-unmute"),
  textVolume: document.querySelector(".volume-musique-value"),
  rangeInputVolume: document.getElementById("volume-musique-control"),
  currentMusicIndex: 0,
  playlist: [
    "sound/music/coffee-chill-out.mp3",
    "sound/music/lofi-study.mp3",
    "sound/music/lofi.mp3",
    "sound/music/sunset-vibes-lofi-chillhop.mp3",
    "sound/music/let-the-games-begin.mp3",
    "sound/music/cyber-war.mp3",
    "sound/music/tension.mp3",
  ],
  audioElement: new Audio(),
  displayUnmuteIcon() {
    callbackFunctions.displayUnmuteIcon(music);
    localStorage.setItem("musicVolume", 0);
  },
  displayMuteIcon() {
    callbackFunctions.displayMuteIcon(music);
  },
  setVolume(event) {
    callbackFunctions.setVolume(music, event);
  },
  playMusic() {
    // Check si la musique est lancée, si non lance la première musique de la playlist
    if (!music.audioElement.duration > 0) {
      music.audioElement.src = music.playlist[music.currentMusicIndex];
      music.audioElement.play();
    }
    soundInit.userHasClicked = true;
  },
  playNextMusic() {
    music.currentMusicIndex++;

    // Vérifier si on est arrivé à la fin du tableau
    if (music.currentMusicIndex >= music.playlist.length) {
      // Si oui, on remet l'index à 0 pour recommencer
      music.currentMusicIndex = 0;
    }

    // Charger la prochaine musique
    music.audioElement.src = music.playlist[music.currentMusicIndex];

    // Lancer la musique
    music.audioElement.play();
  },
};

const effect = {
  muteIcon: document.getElementById("volume-effects-mute"),
  unmuteIcon: document.getElementById("volume-effects-unmute"),
  textVolume: document.querySelector(".volume-effects-value"),
  rangeInputVolume: document.getElementById("volume-effects-control"),
  audioElement: {
    buyActiveUpgradeEffect: new Audio("sound/effects/8-bit-powerup.mp3"),
    buyPassiveUpgradeEffect: new Audio("sound/effects/friend-request.mp3"),
    clickOnGif: new Audio("sound/effects/lclick.mp3"),
    coffeeSound: new Audio("sound/effects/drink-sip-and-swallow.mp3"),
    catSound: new Audio("sound/effects/miaou.mp3"),
  },
  displayUnmuteIcon() {
    callbackFunctions.displayUnmuteIcon(effect);
    localStorage.setItem("effectVolume", 0);
  },
  displayMuteIcon() {
    callbackFunctions.displayMuteIcon(effect);
  },
  setVolume(event) {
    callbackFunctions.setVolume(effect, event);
    effect.audioElement.buyActiveUpgradeEffect.play();
  },
  playEffect(soundObject) {
    soundObject.play();
  },
};

// Déclaration des fonctions de callback
const callbackFunctions = {
  displayUnmuteIcon: (object) => {
    const keys = Object.keys(object.audioElement);
    if (keys.length) {
      for (const key of keys) {
        object.audioElement[key].volume = 0;
      }
    } else {
      object.audioElement.volume = 0;
    }
    object.textVolume.textContent = 0;
    object.rangeInputVolume.value = 0;
    const oldValue = object.value;
    object.value = 0;
    object.unmuteIcon.style.display = "block";
    object.muteIcon.style.display = "none";

    object.value = oldValue;
  },

  displayMuteIcon: (object) => {
    const keys = Object.keys(object.audioElement);
    if (keys.length) {
      for (const key of keys) {
        object.audioElement[key].volume = object.value / 100;
        if (soundInit.userHasClicked) {
          object.audioElement.buyActiveUpgradeEffect.play();
        }
      }
    } else {
      object.audioElement.volume = object.value / 100;
    }
    object.textVolume.textContent = object.value;
    object.rangeInputVolume.value = object.value;
    object.muteIcon.style.display = "block";
    object.unmuteIcon.style.display = "none";

    storeValueInLocalStorage();
  },

  setVolume(object, event) {
    const keys = Object.keys(object.audioElement);
    let volume = event.target.value / 100;
    if (keys.length) {
      for (const key of keys) {
        object.audioElement[key].volume = volume;
      }
    } else {
      object.audioElement.volume = volume;
    }
    object.textVolume.textContent = event.target.value;
    object.value = event.target.value;

    if (event.target.value === "0") {
      object.displayUnmuteIcon();
    } else if ((object.muteIcon.style.display = "none")) {
      object.displayMuteIcon();
    }

    storeValueInLocalStorage();
  },
};

const soundInit = {
  userHasClicked: false,
  handleVolumeValue() {
    // Modifier les valeurs des deux objets
    const musicStorage = localStorage.getItem("musicVolume");
    const effectStorage = localStorage.getItem("effectVolume");
    if (musicStorage === undefined || musicStorage === null) {
      music.value = 50;
    } else {
      music.value = musicStorage;
    }

    if (effectStorage === undefined || effectStorage === null) {
      effect.value = 50;
    } else {
      effect.value = effectStorage;
    }

    // Les affecter dans le dom à la range et à son label
    soundInit.setVolumeAtInit(music);
    soundInit.setVolumeAtInit(effect);
  },

  setVolumeAtInit(object) {
    const keys = Object.keys(object.audioElement);
    let volume = object.value / 100;
    if (keys.length) {
      for (const key of keys) {
        object.audioElement[key].volume = volume;
      }
    } else {
      object.audioElement.volume = volume;
    }
    object.textVolume.textContent = object.value;
    object.rangeInputVolume.value = object.value;

    if (object.value === "0") {
      object.displayUnmuteIcon();
    } else if ((object.muteIcon.style.display = "none")) {
      object.displayMuteIcon();
    }
  },
};

function storeValueInLocalStorage() {
  localStorage.setItem("musicVolume", music.value);
  localStorage.setItem("effectVolume", effect.value);
}

// Event pour mute/unmute le volume de la musique
music.muteIcon.addEventListener("click", music.displayUnmuteIcon);
music.unmuteIcon.addEventListener("click", music.displayMuteIcon);

music.rangeInputVolume.addEventListener("input", music.setVolume);
effect.rangeInputVolume.addEventListener("input", effect.setVolume);

effect.muteIcon.addEventListener("click", effect.displayUnmuteIcon);
effect.unmuteIcon.addEventListener("click", effect.displayMuteIcon);

// Lancer la musique
window.addEventListener("click", music.playMusic);
// Changement musique : crée un bug donc désactivé pour l'instant
// document.addEventListener("keydown", (event) => {
//   if (event.key === "ArrowRight") {
//     music.playNextMusic();
//   }
// });

// Event ended pour détecter la fin de la musique en cours de lecture et lancer celle d'après
music.audioElement.addEventListener("ended", music.playNextMusic);
