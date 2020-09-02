const remote = require('electron').remote;

  document.getElementById().addEventListener("click", function (e) {
       var window = remote.getCurrentWindow();
       window.minimize(); 
  });

  document.getElementById().addEventListener("click", function (e) {
       var window = remote.getCurrentWindow();
       if (!window.isMaximized()) {
           window.maximize();          
       } else {
           window.unmaximize();
       }
  });

  document.getElementById('').addEventListener("click", function (e) {
       var window = remote.getCurrentWindow();
       window.close();
  }); 