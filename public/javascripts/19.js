const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            // console.log(localMediaStream);
            // https://stackoverflow.com/questions/27120757/failed-to-execute-createobjecturl-on-url
            video.srcObject = localMediaStream; // this works
            // video.src = URL.createObjectURL(localMediaStream); // this doesn't in Chrome Version 76.0.3809.132

            video.play();
        })
        .catch(err => {
            console.error(`Oh noes!`, err);
        });
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    // console.log(width, height);
    canvas.width = width;
    canvas.height = height;
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        //  pixels = redEffect(pixels);
        // pixels = rgbSplit(pixels);
        pixels = greenScreen(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16)
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];

      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        pixels.data[i + 3] = 0;
      }
    }

    return pixels;
  }

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 50] = pixels.data[i + 0]; // RED
      pixels.data[i + 50] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 100] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }


function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i + 0] += 200;
      pixels.data[i + 1] -= 50;
      pixels.data[i + 2] *= 0.5;
    }
    return pixels;
  }

function takePhoto() {
    snap.currentTime = 0;
    snap.play();
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="it you" />`
    strip.insertBefore(link, strip.firstChild);

}

video.addEventListener('canplay', paintToCanvas);
getVideo();