class Producto {
    constructor(codigo, nombre, cantidad, costo){
      this.codigo=codigo;
      this.nombre=nombre;
      this.cantidad = cantidad;
      this.costo=costo;
    }
    info(){
      return `Codigo: ${this.codigo} Nombre: ${this.nombre} Cantidad:${this.cantidad} Costo: $${this.costo}`;
    }
    infoHtml(){
      return `<article class = 'product'><div><h3>Codigo: ${this.codigo} </h3>
                <p>Nombre: ${this.nombre}</p>
                <p>Cantidad: ${this.cantidad}</p>
                <p>Costo: ${this.costo}</p></div><br></article>`;
    }
  }
 
  class Inventario{
    constructor(){
      this.datos=[];
    }
    agregar(producto){
      this.datos.push(producto);
    }

    agregarProductoPosicion(producto,posicion){
        for (let i = this.datos.length;i > posicion; i--)
            this.datos[i] = this.datos[i-1]
        this.datos[posicion] = producto
    }
      
    extraerPrimerProductoHTML(){
        let extraer = this.datos[0]
        for (let i = 0; i < this.datos.length; i++)
                this.datos[i]= this.datos[i+1]
            this.datos.pop()
        return `<h3>Elemento extraído:</h3>${extraer.infoHtml()}`
    }
    eliminar(codigo){
        for (let i = 0; i < this.datos.length; i++)
            if (this.datos[i] && this.datos[i].codigo === codigo){
                for (let f = i; f < this.datos.length-1; f++)
                    this.datos[f] = this.datos[f + 1];
                this.datos.pop();
            }

    }
    buscar(codigo){
        for (let i = 0; i < this.datos.length; i++){
            if (this.datos[i].codigo === codigo)
                return this.datos[i].infoHtml()
        }
      return null;
    }
    listar(){
      let res="";
      for (let i=0; i<this.datos.length; i++)
        if (this.datos[i])
            res += this.datos[i].infoHtml();
      return res;
      
    }
  }
 
 let inventario = new Inventario()

  const btnAdd=document.getElementById('btnAdd');
  btnAdd.addEventListener('click',()=>{
      //1 recuperar cajas de texto
    let cod=document.getElementById('codigo').value;
    let nom=document.getElementById('nombre').value;
    let cant=document.getElementById('cantidad').value;
    let cost=document.getElementById('costo').value;
    //2 crear el alumno
    let nuevo=new Producto(cod,nom,cant,cost);
    //3 agregar
    inventario.agregar(nuevo);
    document.getElementById('posicion').value = inventario.datos.length

    let div=document.getElementById('detalles');
    div.innerHTML = '<p>Nuevo</p>' + nuevo.infoHtml();
  });
 
  const btnList=document.getElementById('btnList');
  btnList.addEventListener('click',()=>{
      let div=document.getElementById('detalles');
    div.innerHTML=inventario.listar();
  });
//   extraer
  const btnExtr = document.getElementById('btnExtr');
  btnExtr.addEventListener('click',()=>{
      let div=document.getElementById('detalles');
    div.innerHTML=inventario.extraerPrimerProductoHTML();
  });
 //   eliminar
 const btnElim = document.getElementById('btnElim');
 btnElim.addEventListener('click',()=>{
    let elemento=document.getElementById('eliminar').value;
    inventario.eliminar(elemento);
    let div=document.getElementById('detalles');
    div.innerHTML=inventario.listar();
 });
//  buscar
 const btnBusc = document.getElementById('btnBusc');
 btnBusc.addEventListener('click',()=>{
    let elemento=document.getElementById('buscar').value;
    
    let div=document.getElementById('detalles');
    div.innerHTML=inventario.buscar(elemento);
 });

//  posicion
const BtnAgregarPos = document.getElementById('btnAgpos');
BtnAgregarPos.addEventListener('click',()=>{
   let elemento=document.getElementById('posicion').value;
     //1 recuperar cajas de texto
     let cod=document.getElementById('codigo').value;
     let nom=document.getElementById('nombre').value;
     let cant=document.getElementById('cantidad').value;
     let cost=document.getElementById('costo').value;
     //2 crear el alumno
     let nuevo=new Producto(cod,nom,cant,cost);
     //3 agregar
     inventario.agregarProductoPosicion(nuevo,elemento);
     document.getElementById('posicion').value = inventario.datos.length
 
     let div=document.getElementById('detalles');
     div.innerHTML = '<p>Nuevo</p>' + nuevo.infoHtml();
  
});