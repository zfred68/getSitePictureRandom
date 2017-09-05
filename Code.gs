/** 

this app script is from Google Site->Manage->App Scripts->Add new script

Provided that you put your files in a public folder, you can get any file in a folder by this URL:

https://googledrive.com/host/<folderID>/<filename>

**/


var imagelibbase = "/web-resources/images";
var imagelibs = ["locals","intl","afar"];
var MyLog=MyLogger;

function afile(name,id) {
  this.name=name;
  this.id=id;
}

function doGet(e) {
  
  var app = HtmlService.createHtmlOutputFromFile('index.html')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  
  if(e!=undefined) {
     var arg1 = e.parameter["folder"];
  }
  
  if(arg1==null) {
    arg1=imagelibs[0];
  }
  
  var user_loginid = Session.getUser().getUserLoginId();

  var f = getRandomPic(arg1);
  loghere('getSitePictureRandom:'+f);
    
  app.setContent('<div id="randomPIC" ><image src="'+f+'"></div>');
  return app;
}

function doGet0(e) {
//  var app = UiApp.createApplication();`
  if(e!=undefined) {
     var arg1 = e.parameter["folder"];
  }
  
  if(arg1==null) {
    arg1=imagelibs[0];
  }
  
  var user_loginid = Session.getUser().getUserLoginId();

  var f = getRandomPic(arg1);
  loghere('getSitePictureRandom:'+f);
  return ContentService.createTextOutput('<image src="'+f +'">');
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
      var a = new afile(name,file.getId());
      apics.push(a);
    }
 }
 var rn = Math.random();
 var len = apics.length;
 var i = Math.round(rn*len);
 var a = apics[i];
 var id=apics[i].id;
 
 return "https://docs.google.com/uc?id="+id+"&export=download";
}

//
// getBasefolder( "/Folder A/Folder B/ Folder C" )
// returns the last folder in the path 
// or throws exception
//
function getBasefolder(path) {
 // Remove extra slashes and trim the path
  var fullpath = path.replace(/^\/*|\/*$/g, '').replace(/^\s*|\s*$/g, '').split("/");
   // Always start with the main Drive folder
  var folder = DriveApp.getRootFolder();
  var rootname = folder.getName();
  var nfullpathFolders = fullpath.length-1;
  var n;
  
  for (var subfolder in fullpath) {
    
    var name = fullpath[subfolder];
    var folders = folder.getFoldersByName(name);
 
    // If folder does not exit, exit
    while(folders.hasNext()) {
      folder= folders.next();
      n = folder.getName();
      var i = Number(subfolder);
      if(n==name) {
        if(Number(subfolder) == nfullpathFolders)
          return folder;
        break;
      }
    }
  }
  
  throw "bad path";
}


function t() {

 MyLog = MyLogger.useSpreadsheet('17ViJRrSjNmz-MEMjA6f5IclJv8RwQLjq4h5TdzzkqgU');
 
}

function t2() {

  loghere('test here getSitePictureRandom');
}

var log_sheet=null;
var log_sheet_id = '17ViJRrSjNmz-MEMjA6f5IclJv8RwQLjq4h5TdzzkqgU';
                    
function loghere(s) {

  if(log_sheet==null) {
    try {
        var MyLog = MyLogger.useSpreadsheet('17ViJRrSjNmz-MEMjA6f5IclJv8RwQLjq4h5TdzzkqgU');
        var ss = MyLog.getSheet();  
        var name = ss.getName();
        log_sheet = ss;//.getSheetByName("Log");
        
        if(log_sheet==null) {
          log_sheet= ss.insertSheet('Log')         
        }
        
        if (log_sheet != null) {
          var now = new Date();
          log_sheet.appendRow([now,s]);
        }
        
     }catch(e) {
        var exception = e.name;
        if (exception === "Exception" ){
          Logger.log('Exception:');
        }
    }
  }
  else
  {
          var now = new Date();
          log_sheet.appendRow([now,s]);
    
  }

}
