/** 

this app script is from Google Site->Manage->App Scripts->Add new script

Provided that you put your files in a public folder, you can get any file in a folder by this URL:

https://googledrive.com/host/<folderID>/<filename>
https://docs.google.com/uc?id=<file id>&export=download

**/


var imagelibbase = "/web-resources/images";
var imagelibs = ["locals","intl","afar"];

function afile(name,id,desc) {
  this.name=name;
  this.id=id;
  this.desc=desc;
}

function doGet(e) {
  
  var app = HtmlService.createTemplateFromFile('index.html');
  
  if(e!=undefined) {
     var arg1 = e.parameter["folder"];
  }
  
  if(arg1==null) {
    arg1=imagelibs[0];
  }
  
  var user_loginid = Session.getUser().getUserLoginId();

  var f = getRandomPic(arg1);
  //var p = "https://docs.google.com/uc?id="+f.id+"&export=download";
  var capture="";
  if(f.desc !=null) {
    app.pictureAlt="ALT=\"" + f.desc + "\"";
    app.capture=f.desc;
  }else {
    app.pictureAlt="";
    app.capture="";
  }
  app.pictureid=f.id;
  return app.evaluate();
}

function getRandomPic(subfolder) {
 var path = imagelibbase+"/"+subfolder;
 var folder = getBasefolder(path);
 var files = folder.getFiles(); 
 var file;
 var name;
 var type;
 var apics = [];
 
 while(files.hasNext()) {
    file=files.next();
    name =file.getName();
    type =file.getMimeType();
    var n = type.search("image");
    
    if(type.search("image")>=0) {
      var a = new afile(name,file.getId(),file.getDescription());
      apics.push(a);
    }
 }
 var rn = Math.random();
 var len = apics.length;
 var i = Math.round(rn*len);
 //var a = apics[i];
 //var id= apics[i].id;
 //var desc= apics[i].desc;
 return apics[i];
}

function getBasefolder(path) {
 // Remove extra slashes and trim the path
  var fullpath = path.replace(/^\/*|\/*$/g, '').replace(/^\s*|\s*$/g, '').split("/");
   // Always start with the main Drive folder
  var folder = DriveApp.getRootFolder();
  var rootname = folder.getName();
  
  for (var subfolder in fullpath) {
    
    var name = fullpath[subfolder];
    var folders = folder.getFoldersByName(name);
 
    // If folder does not exit, exit
    if(folders.hasNext()) {
      folder= folders.next();
    }else {
      throw "bad path";
    }
    
  }
  return folder;
}


