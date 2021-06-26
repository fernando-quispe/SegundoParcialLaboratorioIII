namespace general
{
    var listaVehiculos:Array<Vehiculo>=new Array<Vehiculo>();
    var listaFiltrada:Array<Vehiculo>=new Array<Vehiculo>();   
    var idMayor:number;

    window.addEventListener("load", function(){
        idMayor=0;
        (<HTMLInputElement>document.getElementById("btnNuevoVehiculo")).addEventListener("click",AbrePopUp);
        (<HTMLInputElement>document.getElementById("btnGuardar")).addEventListener("click",Guardar);
        (<HTMLInputElement>document.getElementById("btnCancelar")).addEventListener("click",Cancelar);
        (<HTMLInputElement>document.getElementById("btnPromediar")).addEventListener("click",Promediar);
        (<HTMLInputElement>document.getElementById("inpTipoVehiculo")).addEventListener("change",MostrarCampos);
        (<HTMLInputElement>document.getElementById("inpFiltro")).addEventListener("keypress",Filtrar); 
        document.getElementById("filtroVehiculos")?.addEventListener("change", filtrarVehiculos);       
    });

    export function filtrarVehiculos(){

        var tipoAuto = (<HTMLInputElement>document.getElementById("filtroVehiculos")).value;

        if (tipoAuto=="Auto") {
            
            var filtrados = listaVehiculos.filter(item=> item instanceof Auto);
            Guardar(filtrados);
        }
        else
        {
            var filtrados = listaVehiculos.filter(item=> item instanceof Camioneta);
            Guardar(filtrados);
        }
    }

    function AbrePopUp(){
        (<HTMLInputElement>document.getElementById("divPopUp")).hidden=false;
    }

    function Cancelar(){
        (<HTMLInputElement>document.getElementById("divPopUp")).hidden=true;
        Limpiar();
    }

    function MostrarCampos(){
        var inpVehiculo:any=document.getElementById("inpTipoVehiculo");
        var vehiculo:string= inpVehiculo.options[inpVehiculo.selectedIndex].value;

        switch(vehiculo)
        {
            case 'Auto':
                (<HTMLInputElement>document.getElementById("divAuto")).hidden=false;
                (<HTMLInputElement>document.getElementById("divCamioneta")).hidden=true;
                break;
            case 'Camioneta':
                (<HTMLInputElement>document.getElementById("divAuto")).hidden=true;
                (<HTMLInputElement>document.getElementById("divCamioneta")).hidden=false;
                break;
        }
    }

    function Guardar(){
        var inpVehiculo:any=document.getElementById("inpTipoVehiculo");
        var vehiculo:string= inpVehiculo.options[inpVehiculo.selectedIndex].value;
        var inpMarca=<HTMLInputElement>document.getElementById("inpMarca");
        var marca=inpMarca.value;
        var inpModelo=<HTMLInputElement>document.getElementById("inpModelo");
        var modelo=inpModelo.value;
        var inpPrecio=<HTMLInputElement>document.getElementById("inpPrecio");
        var precio=parseInt(inpPrecio.value);
        var id:number=0;

        if(listaVehiculos.length === 0)
        {
            id=1;
        }
        else
        {
            id=listaVehiculos.reduce(
                function(mayor, vehiculo){
                    if(vehiculo.getPrecio()>=mayor)
                        return vehiculo.getId()+1;
                    else 
                        return mayor++;
                }
            ,id);
        }
        
        switch(vehiculo)
        {
            case 'Auto':
                var inpPuertas=<HTMLInputElement>document.getElementById("inpCantPuertas");
                var puertas=parseInt(inpPuertas.value);
                var auto:Auto=new Auto(1,marca,modelo, precio, puertas);
                listaVehiculos.push(auto);
                break;
            case 'Camioneta':
                var inpCuatroXCuatro=<HTMLInputElement>document.getElementById("chkCuatroXCuatro");
                var cuatroXCuatro=inpCuatroXCuatro.checked;
                console.log(cuatroXCuatro);
                var camioneta:Camioneta=new Camioneta(1,marca,modelo, precio,cuatroXCuatro);
                listaVehiculos.push(camioneta);
                break;
        }

        var cuerpoTabla=document.getElementById("bodyVehiculos");
        var tr = document.createElement("tr");
        
        var td1 = document.createElement("td");
        var nodoTexto1 = document.createTextNode(id.toString());
        (<HTMLInputElement>document.getElementById("thId")).hidden=!(<HTMLInputElement>document.getElementById("chkId")).checked;
        td1.hidden=!(<HTMLInputElement>document.getElementById("chkId")).checked;
        td1.appendChild(nodoTexto1);
        tr.appendChild(td1);

        var td2 = document.createElement("td");
        var nodoTexto2 = document.createTextNode(marca);
        (<HTMLInputElement>document.getElementById("thMarca")).hidden=!(<HTMLInputElement>document.getElementById("chkMarca")).checked;
        td2.hidden=!(<HTMLInputElement>document.getElementById("chkMarca")).checked;
        td2.appendChild(nodoTexto2);
        tr.appendChild(td2);

        var td3 = document.createElement("td");
        var nodoTexto3 = document.createTextNode(modelo);
        (<HTMLInputElement>document.getElementById("thModelo")).hidden=!(<HTMLInputElement>document.getElementById("chkModelo")).checked;
        td3.hidden=!(<HTMLInputElement>document.getElementById("chkModelo")).checked;
        td3.appendChild(nodoTexto3);
        tr.appendChild(td3);

        var td4 = document.createElement("td");
        var nodoTexto4 = document.createTextNode(precio.toString());
        (<HTMLInputElement>document.getElementById("thPrecio")).hidden=!(<HTMLInputElement>document.getElementById("chkPrecio")).checked;
        td4.hidden=!(<HTMLInputElement>document.getElementById("chkPrecio")).checked;
        td4.appendChild(nodoTexto4);
        tr.appendChild(td4);

        var botonEliminar:string="<input id='btnEliminar' type='button' value='Eliminar' onClick='general.Eliminar("+tr.firstChild.textContent+")'>";        
        var td5 = document.createElement("td");
        var nodoTexto5 = document.createElement("button");
        nodoTexto5.addEventListener("click", Eliminar);
        nodoTexto5.textContent="Eliminar";
        
        td5.appendChild(nodoTexto5);
        tr.appendChild(td5);

        cuerpoTabla.appendChild(tr);

        console.log(tr.firstChild.textContent);
        Limpiar();
    }

    function Filtrar(){
        listaFiltrada=listaVehiculos.filter(function(vehiculo){
            return !vehiculo.getMarca().indexOf((<HTMLInputElement>document.getElementById("inpFiltro")).value);
        });

        var cuerpoTabla=document.getElementById("bodyVehiculos");
        cuerpoTabla.innerHTML="";

        for (let i = 0; i < listaFiltrada.length; i++) {
        
            var tr = document.createElement("tr");            
            var td1 = document.createElement("td");
            var nodoTexto1 = document.createTextNode(listaFiltrada[i].getId().toString());            
            (<HTMLInputElement>document.getElementById("thId")).hidden=!(<HTMLInputElement>document.getElementById("chkId")).checked;
            td1.hidden=!(<HTMLInputElement>document.getElementById("chkId")).checked;
            td1.appendChild(nodoTexto1);
            tr.appendChild(td1);

            var td2 = document.createElement("td");
            var nodoTexto2 = document.createTextNode(listaFiltrada[i].getMarca());
            (<HTMLInputElement>document.getElementById("thMarca")).hidden=!(<HTMLInputElement>document.getElementById("chkMarca")).checked;
            td2.hidden=!(<HTMLInputElement>document.getElementById("chkMarca")).checked;
            td2.appendChild(nodoTexto2);
            tr.appendChild(td2);

            var td3 = document.createElement("td");
            var nodoTexto3 = document.createTextNode(listaFiltrada[i].getModelo());
            (<HTMLInputElement>document.getElementById("thModelo")).hidden=!(<HTMLInputElement>document.getElementById("chkModelo")).checked;
            td3.hidden=!(<HTMLInputElement>document.getElementById("chkModelo")).checked;
            td3.appendChild(nodoTexto3);
            tr.appendChild(td3);

            var td4 = document.createElement("td");
            var nodoTexto4 = document.createTextNode(listaFiltrada[i].getPrecio().toString());
            (<HTMLInputElement>document.getElementById("thPrecio")).hidden=!(<HTMLInputElement>document.getElementById("chkPrecio")).checked;
            td4.hidden=!(<HTMLInputElement>document.getElementById("chkPrecio")).checked;
            td4.appendChild(nodoTexto4);
            tr.appendChild(td4);

            var botonEliminar:string="<input id='btnEliminar' type='button' value='Eliminar' onClick='general.Elminar("+tr.firstChild.textContent+")'>";      

            var td5 = document.createElement("td");
            var nodoTexto5 = document.createElement("button");
            nodoTexto5.addEventListener("click", Eliminar);
            nodoTexto5.textContent="Eliminar";
            
            td5.appendChild(nodoTexto5);
            tr.appendChild(td5);

            cuerpoTabla.appendChild(tr);       
        }
    }

    function Limpiar() {
        (<HTMLInputElement>document.getElementById("inpMarca")).value="";
        (<HTMLInputElement>document.getElementById("inpModelo")).value="";
        (<HTMLInputElement>document.getElementById("inpPrecio")).value="";
        (<HTMLInputElement>document.getElementById("inpCantPuertas")).value="";
        (<HTMLInputElement>document.getElementById("chkCuatroXCuatro")).checked=false;
    }

    function Promediar(){
        var promedio:number=0;

        if(listaFiltrada.length>0)
        {
            var total=listaFiltrada.reduce(function(total,vehiculo){
                return total+vehiculo.getPrecio();
            },0);
            promedio=total/listaFiltrada.length;
        }
        else
        {
            var total=listaVehiculos.reduce(function(total,vehiculo){
                return total+vehiculo.getPrecio();
            },0);
            promedio=total/listaVehiculos.length;
        }
        (<HTMLInputElement>document.getElementById("inpPromedio")).value=promedio.toString();
    }

    function Eliminar(){   
    }
}