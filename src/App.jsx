
import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import {db} from "./data/guitarras";
export default function App() {
    const [guitars] = useState(db);
    const [carrito, setCarrito] = useState(recuperaLocalStorage())

    useEffect(guardaLocalStorage, [carrito])

    function guardaLocalStorage(){
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }

    function recuperaLocalStorage() { 
      const storageData = localStorage.getItem('carrito')
      return storageData ? JSON.parse(storageData) : []
    }

    function agregarCarrito(guitar) {
      console.log("Agregando...", guitar.nombre)
      const carritoNuevo = [...carrito]
      const idExiste = carritoNuevo.findIndex(g => g.id === guitar.id)
      if(idExiste === -1){
        carritoNuevo.push({...guitar, cantidad:1})
      }else{
        carritoNuevo[idExiste].cantidad++
      }
      setCarrito(carritoNuevo)
    }

    function quitarUno(id){
      const carritoNuevo = [...carrito]
      const idCarrito = carritoNuevo.findIndex(g => g.id === id)
      if (carritoNuevo[idCarrito].cantidad > 1)
        carritoNuevo[idCarrito].cantidad--
      setCarrito(carritoNuevo)

    }

    function quitarGuitarra(id){
      setCarrito(carrito.filter(g => g.id !== id))
    }

    function vaciarCarrito(){
      setCarrito([])
    }

  return (
    <>
       <Header 
       carrito={carrito}
       guitar={guitars[3]}
       agregarCarrito={agregarCarrito}
       quitarUno={quitarUno}
       quitarGuitarra={quitarGuitarra}
       vaciarCarrito={vaciarCarrito}
       />
        
        
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {
                guitars.map((guitar) =>( 
                  <Guitar
                  guitar={guitar}
                  agregarCarrito={agregarCarrito}
                  key={guitar.id}/>
                  ))
                  }
                
            </div>

        </main>
        <Footer />
    </>
  )
}

