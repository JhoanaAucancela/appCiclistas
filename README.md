# app Ciclistas

Esta aplicación obtiene una lista de los usuarios registrados, ademas de permitirles compratir sus coordenadas por medio de diferentes metodos y almacenando la data en firebase

# Código Ciclistas

Para obtener las coordenas implementaremos el siguiente frgamento de código

```
locate() {

  try{
    const options = {
      enableHighAccuracy: true,
      timeout: 200,
      maximumAge: 0,
    };
    
    const success = ( pos: { coords: any; }) => {
      const crd = pos.coords;

      this.x = "" + crd.latitude;
      this.y = "" + crd.longitude;

      this.tareaEditando.latitud = "" + crd.latitude;
      this.tareaEditando.logitud= "" + crd.longitude;
      this.tareaEditando.user= this.user;
      this.firestoreService.actualizar("Coordenadas", this.user, this.tareaEditando).then(() => {
      this.tareaEditando = {} as Tarea;
      //this.backgroundMode.enable();
    })

    }
    
    function error(err: { code: any; message: any; }) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    this.id = navigator.geolocation.watchPosition(success, error, options);
  }catch(err){
    alert("Error" + err)
  }
  };
```
 
Para la ejecución en segundo plano utilizaremos el plugin @awesome-cordova-plugins/background-mode/ngx, para instalar las dependencias usaremos el siguiente comando

```
npm install @awesome-cordova-plugins/background-mode
```

En el archivo app.module.ts agregaremos lo siguiente:

```
import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';
```

```
@NgModule({
  declarations: [AppComponent],
  imports: [
    ...,
    BackgroundMode,
    ...
  ],
```

# Ejecutar la aplicación

Para ejecutar la aplicación se debe ejecutar los siguientes comandos.

```
git clone https://github.com/JhoanaAucancela/appCiclistas.git
```
```
cd ruta_de_la_app
```
```
npm install
```
```
ionic serve
```
