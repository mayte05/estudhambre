var $$= Dom7;
var app7 = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'Estudhambre',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: routes,
  // ... other parameters
});
var mainView =app7.views.create('.view-main')
var app = {
  autenticado: false,
  hostname:"http://localhost/estudhambre",
  usuario:"",
  password: "",
  nombrecompleto:"",
  email:"",
  repassword:"",
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        console.log("VARIABLE AUTENTICADO:"+window.localStorage.getItem("autenticado"));
        if (window.localStorage.getItem("autenticado")=="true") {
          mainView.router.navigate('/home/',{animate:true});
        }
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {/*
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);*/
    },

    loginAccess:function(){
      // this.usuario= $$('#usuario').val();
      // this.password= $$('#password').val();
      // app7.preloader.hide();
      // console.log(this.usuario);

      // if (this.usuario==""||this.password=="") {
      //   app7.dialog.alert('Verifique su usuario o contraseña');
      // }else{
      //   app7.preloader.show();
      //   app7.request({
      //     url: this.hostname+'/api/login.php',
      //     data: {usuario:this.usuario,password:this.password},
      //     method:'POST',
      //     crossDomain: true,
      //     success: function(data){
      //       app7.preloader.hide();
      //       var objson= JSON.parse(data);
      //       if (objson.data=='Autenticado') {
      //         window.localStorage.setItem("autenticado","true");
      //         window.localStorage.setItem("usuario",app.usuario);
      //         this.autenticado=window.localStorage.getItem("autenticado");
      //         mainView.router.navigate('/home/',{animate:true});
              
      //       }else{
      //       app7.dialog.alert("Usuario o Password incorrecto");
      //     }
      //     },
      //      error:function(data){
      //     app7.preloader.hide();
      //     app7.dialog.alert("Hubo un error, por favor intente otra vez");
      //    }
      //   });
      // }

    },
    Signup:function(){
      this.usuario= $$('#usuario1').val();
      this.nombrecompleto= $$('#Nombre').val();
      this.email= $$('#email').val();
      this.password= $$('#password1').val();
      this.repassword=$$('#repassword').val();
      if (this.password!=this.repassword) {
        app7.dialog.alert('Verifique su contraseña, no coincide.');
      }else{
        app7.preloader.show();
        app7.request({
          url: this.hostname+'/api/signup.php',
          data:{usuario:this.usuario,nombre:this.nombrecompleto,Email:this.email,password:this.password},
          method:'POST',
          crossDomain: true,
          success:function(data){
            app7.dialog.alert('Ha sido dado de alta exitosamente');
            app7.preloader.hide();
            mainView.router.navigate('/index/',{animate:true});
          },
          error:function(data){
          app7.preloader.hide();
          app7.dialog.alert("Hubo un error, por favor intente otra vez");
          conole.log(data);
         }
        });
      }
    },
    loginClose: function(){
       app7.panel.close();
      app7.dialog.confirm('¿Seguro desea salir de la aplicación?',function(){
         mainView.router.navigate('/index/',{animate:true}); 
          window.localStorage.setItem("autenticado", "false");
          window.localStorage.removeItem("usuario");
      });
    },
   getPerfil:function(){
      var perfil= window.localStorage.getItem("usuario");      
      console.log(perfil);
      app7.request({
        url: this.hostname+'/api/perfil.php',
        data:{usuario:perfil},
        method:'GET',
        crossDomain:true,

        success:function(data){
          //alert(data);
          var objson= JSON.parse(data);
          var none="";
          var img="";
          var profil="";
          var perfils="";
          $$('#perfil2').html("");
          for (x in objson.data) {
            img=app.hostname+'/img/profil/'+objson.data[x].foto;
            none=app.hostname+'/img/profil/perfil1.png';
            if (objson.data[x].foto=="") {
              perfils='<div class="perfil2" id="perfil2"><img src="'+none+'" class="perfilusuario" ><div class="perfil">Bienvendio</div><div class="perfil1" id="username">'+perfil+'</div></div>';
              $$('#perfil2').append(perfils);
            }else{
              profil='<div class="perfil2" id="perfil2"><img src="'+img+'" class="perfilusuario" ><div class="perfil">Bienvendio</div><div class="perfil1" id="username">'+perfil+'</div></div>';
              $$('#perfil2').append(profil);
            }
          }
        }
      });
    },

};
function ShowMenu(){
  app7.panel.open('left',true);
  }
 $$(document).on('page:init', '.page[data-name="home"]', function(e){
      console.log('View Home load init');
      app7.panel.allowOpen=true;
      app7.panel.enableSwipe('left');
      console.log("usuario:"+window.localStorage.getItem("usuario"));
      app.getPerfil();
      
     /*var $ptrContent = app7.ptr.create('.ptr-content');
      $ptrContent.on('refresh',function(e){
        RefreshVideos();
        getSliders();


    });  
      getVideos();
      getSliders();*/
      //getRecetas();
    });


 $$(document).on('page:init', '.page[data-name="receta"]', function(e){
      console.log('View Home load init');
      app7.panel.allowOpen=true;
      app7.panel.enableSwipe('left');
    
    
    
      getRecetas();
    });

function getRecetas(){
    app7.preloader.show();
   app7.request({
          url: app.hostname+'/api/recetas.php',
          method:'GET',
         crossDomain: true,
         success:function(data){
          app7.preloader.hide();
          var objson= JSON.parse(data);
          var img="";
          var ingre="";
          var ingredientes="";
          var lista = "";
          var pasos="";
          var cont = 0;
          var pasoapaso="";
          var step="";
          //alert(data);
          for(x in objson.data){
            //console.log(objson.data[x].ingredientes);
            ingre= objson.data[x].ingredientes.split(",");
            pasos= objson.data[x].pasos.split(";");

            
             for(y in ingre){
            console.log(ingre[y]);

               lista += "<li>"+ingre[y]+"</li>";

               }
               for(z in pasos){
                console.log(pasos[z]);
                step += "<li>"+pasos[z]+"</li>";


               }
            /*img =app.hostname+'/mplay/img/images/'+objson.data[x].imagen;*/

             ingredientes= '<div class="card-content card-content-padding" id="ingredientes"><div class="list simple-list"><ul>'+lista+'</ul></div></div>';
             pasoapaso= '<div class="card-content card-content-padding" id="ingredientes"><div class="list simple-list"><ul>'+step+'</ul></div></div>';
            $$('#ingredientes').append(ingredientes);
            $$('#pasoapaso').append(pasoapaso);
          }
          
         },
         error:function(data){
          app7.preloader.hide();
          app7.dialog.alert("Hubo un error, por favor intente otra vez");
          console.log(error);
         }

       });
  }

