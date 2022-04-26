function upload() {
  return {
    init() {

    },
    doUpload(e) {
      var myapp = this;
      var width = 800;
      var imgUpload = new Image();
      imgUpload.onload = function() {
        var canvas = document.createElement('canvas'),
          ctx = canvas.getContext("2d"),
          oc = document.createElement('canvas'),
          octx = oc.getContext('2d');
        canvas.width = width; // destination canvas size
        canvas.height = canvas.width * imgUpload.height / imgUpload.width;
        var cur = {
          width: Math.floor(imgUpload.width * 0.5),
          height: Math.floor(imgUpload.height * 0.5)
        }
        oc.width = cur.width;
        oc.height = cur.height;
        octx.drawImage(imgUpload, 0, 0, cur.width, cur.height);
        while (cur.width * 0.5 > width) {
          cur = {
            width: Math.floor(cur.width * 0.5),
            height: Math.floor(cur.height * 0.5)
          };
          octx.drawImage(oc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
        }
        ctx.drawImage(oc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
        var base64Image = canvas.toDataURL('image/jpeg')

        console.log(base64Image);



        document.getElementById('image').src = base64Image;

        document.querySelector('#image').width = cur.width;
        document.querySelector('#image').height = cur.height;

        document.querySelector('#preview').width = cur.width;
        document.querySelector('#preview').height = cur.height;
        document.querySelector('#preview').style.height = cur.height;

        setTimeout(function() {
          texture.loadContentsOf(image);
          myapp.update();
        }, 100)

      }
      imgUpload.src = URL.createObjectURL(e.target.files[0]);
    },
    selectImage() {
      document.getElementById('fileInput').click();
    }
  }
}