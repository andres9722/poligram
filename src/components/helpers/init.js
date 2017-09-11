import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyD-r1WqIqi6dek1KdD3uWQXKsBZA-vmjFg",
  authDomain: "poligram-2ad25.firebaseapp.com",
  databaseURL: "https://poligram-2ad25.firebaseio.com",
  projectId: "poligram-2ad25",
  storageBucket: "poligram-2ad25.appspot.com",
  messagingSenderId: "153878941083"
},
d = document,
w = window,
n = navigator,
c = console.log;

export const init = () => firebase.initializeApp(config)

export const pwa = () => {
  if( 'serviceWorker' in n ) {
    w.addEventListener('load', () => {
        n.serviceWorker.register('./sw.js')
            .then( registration  =>  {
                c(registration);
                c('Service worker registrado con exito', registration.scope);
            })
            .catch( err => c('Registro de service Worker fallido', err) );
    });
  }

  if( w.Notification && Notification.permission !== 'denied' ) {
      Notification.requestPermission(status => {
          console.log(status);
          let n = new Notification('Bienvenidos',  {
              body: ':)',
              icon: './icon_192x192.png'
          })
      });
  }

  if( 'serviceWorker' in n && 'SyncManager' in w ) {
    function registerGBSync () {
      n.serviceWorker.ready
      .then(registration => {
        return registration.sync.register('github')
          .then( () => c('Sincronizacion de fondo registrada') )
          .catch( err => c('Fallo la sincronizacion de fondo', err))
      })
    }
    registerGBSync();
  }
}

export const isOnLine = () => {
  const header = d.querySelector('.header'),
    footer = d.querySelector('.footer'),
    metaTagTheme = d.querySelector('meta[name=theme-color]')

  function networkStatus (e) {
    c( e, e.type )

    if ( n.onLine ) {
      metaTagTheme.setAttribute('content', '#F7DF1E')
      header.classList.remove('u-offline')
      footer.classList.remove('u-offline')
      alert('Conexión Recuperada :)')
    } else {
      metaTagTheme.setAttribute('content', '#666')
      header.classList.add('u-offline')
      footer.classList.add('u-offline')
      alert('Conexión Perdida :(')
    }
  }

  w.addEventListener('online', networkStatus)
  w.addEventListener('offline', networkStatus)
}

export const ga = () => {
  const _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-106230645-1']);
  _gaq.push(['_setDomainName', 'andres9722.github.io/poligram']);
  _gaq.push(['_trackPageview']);
  (function(){
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}
