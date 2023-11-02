var imagenes={};
document.addEventListener('dragover',function(event){event.preventDefault();},false);
//si los suelta en el document (por error) no hacer nada
document.addEventListener('drop',function(event){event.preventDefault();});
//Al soltar los elementos en el div, leerlos
document.getElementById('to_upload').addEventListener('drop',readFiles,false);
//Al seleccionar los archivos tambien
document.getElementById('imagenes').addEventListener('change',readFiles,false);
//Leer los archivos
function readFiles(event){
  //target.files => input
  //dataTransfer.files => DnD
  var archivos=event.target.files || event.dataTransfer.files;
  [].forEach.call(archivos, preview);
}

function preview(file) {
  //add the file to 'images' array
  if(imagenes[file.name] === undefined){
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      
      //add a div for each file(to show the preview)
      var col=document.createElement('div'); //image+info container
      var preview = document.createElement('div'); //div to show the image or icon
      var fileInfo = document.createElement('div'); //to show the name and button to remove
      fileInfo.setAttribute('class','dd-file-info');
      preview.setAttribute('class','dd-thumbnail');
      
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        //set the image as background of the div
        preview.setAttribute('style','background-image:url("'+this.result+'")');
      }
      else{
        var icon = document.createElement('i');
        //excel
        if ( /\.(xls?x|csv)$/i.test(file.name) ) {
          icon.setAttribute('class','fa fa-file-excel-o');
        }
        //word
        if ( /\.(doc?x)$/i.test(file.name) ) {
          icon.setAttribute('class','fa fa-file-word-o');
        }
        //ppt
        if ( /\.(ppt?x)$/i.test(file.name) ) {
          icon.setAttribute('class','fa file-powerpoint-o');
        }
        //txt
        if ( /\.(txt)$/i.test(file.name) ) {
          icon.setAttribute('class','fa file-text');
        }
        //pdf
        if ( /\.(pdf)$/i.test(file.name) ) {
          icon.setAttribute('class','fa file-pdf-o');
        }
        preview.appendChild(icon);
      }      
      
      col.setAttribute('data-ts-file', file.name);
      col.appendChild(preview);
      //add a button inside the div.thumbnail
      var btnRemove = document.createElement('button');
      btnRemove.addEventListener('click', function(x){
        console.log(file.name);
        //remove the element from the list of images
        col.parentNode.removeChild(col);
        //remove the current file from the list
        delete imagenes[file.name];
      },false);
      var spanTitle = document.createElement('span');
      spanTitle.appendChild(document.createTextNode(file.name));
      var btnIcon = document.createElement('i');
      btnIcon.setAttribute('class','fa fa-times-circle');
      btnRemove.appendChild(btnIcon);
      fileInfo.appendChild(spanTitle);
      fileInfo.appendChild(btnRemove);
      col.appendChild(fileInfo);
      document.getElementById('to_upload').getElementsByTagName('div')[0].appendChild(col);
      imagenes[file.name] = file;
    }, false);
  }

  reader.readAsDataURL(file);
}
