const video = document.getElementById('v_id');
const canvasElement = document.getElementById('qr-canvas');
const canvas = canvasElement.getContext('2d');

const qrResult = document.getElementById('qr-result');
const outputData = document.getElementById('outputData');
const btnScanQR = document.getElementById('btn-scan-qr');

var imageObj = new Image();

imageObj.src = 'http://i.stack.imgur.com/s2CAw.png';

let scanning = false;

btnScanQR.addEventListener("click", myFunction);
           


  
qrcode.callback = (res) => {
  if (res) {
    outputData.innerText = res;
    scanning = false;

    var status = document.getElementById(res).innerHTML;
    var t ="vacant";

    if(status == "vacant"){
      t = "Occupied" ;
    }
   
    document.getElementById(res).innerHTML = t;
   

        
      

    video.srcObject.getTracks().forEach(track => {
      track.stop();
    });

    qrResult.hidden = false;
    btnScanQR.hidden = false;
    canvasElement.hidden = true;
  }
};


function myFunction() {
   navigator.mediaDevices
    .getUserMedia({ video: { facingMode: 'environment' } })
    .then(function(stream) {
      scanning = true;
      qrResult.hidden = true;
      btnScanQR.hidden = true;
      canvasElement.hidden = false;
      video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
      video.srcObject = stream;
      video.play();

      tick();
      scan();

    });

}
     
  


  
    function tick() {
        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        // canvas.drawImage(imageObj,0, 0, canvasElement.width, canvasElement.height);
        scanning && requestAnimationFrame(tick);
      }

      function scan() {
        try {
          qrcode.decode();
        } catch (e) {
          setTimeout(scan, 300);
        }
      }




