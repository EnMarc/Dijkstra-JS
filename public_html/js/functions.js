function vertex_to_vertex(item){
    var item = item;
    var inner = '<div class="row"><div class="col"><select name="nodo_A_'+item+'" class="form-control" required>\n\
        </select></div><div class="col"><select name="nodo_B_'+item+'" class="form-control" required></select></div>\n\
        <div class="col"><input name="peso_'+item+'" type="number" class="form-control" placeholder="Peso/Valor" required></div></div>';
    
    return inner;
}

function etiquetas() {
    this.nodo = 0;
    this.precedente = 0;
    this.peso = 0;
    this.marcado = 0;
}

function dijkstra(n, m, a, b){//n=# de nodos; m=matriz de adyacencia; a=nodo origen;b=nodo destino
	var process = '';
        
	var labels = [n];
	var nodo, peso;
	//Arreglo de etiquetas
	for (var i = 0; i < n; i++){
            labels[i] = new etiquetas();
	}
	if (labels == null) return;
	if (a < 0 || a > (n - 1)) return;
   	if (b < 0 || b > (n - 1)) return;
   	//Inicializacion de etiquetas de cada nodo
	for ( i = 0; i < n; i++ ) {
            labels[i].nodo = i;
            if (i != a) {
                labels[i].precedente = -1;
                labels[i].peso = -1;
                labels[i].marcado = 0;
            } else {
                labels[i].precedente = -1;
                labels[i].peso = 0;
                labels[i].marcado = 0;
            }
   	}
   	while (1){
            nodo = -1;
            peso = -1;
            /* busca entre todos los nodos no marcados el de menor peso, descartando los
            * de peso infinito (-1) */
            for (var i = 0; i < n; i++){
                if (labels[i].marcado == 0 && labels[i].peso >= 0){
                    if (peso == -1){
                        peso = labels[i].peso;
                        nodo = i;
                    } else if (labels[i].peso <= peso){
                        peso = labels[i].peso;
                        nodo = i;
                    }
                }
            }
            if ( nodo == -1 ){//si ya no hay nodos desmarcados
                process += '====================================***Ya no quedan nodos por analizar***';
                break; //termina el ciclo
            } 
            process += '====================================***Analizando nodo '+nodo+'***';
            for (var i = 0; i < n; i++){
                if (m[nodo][i] > 0){
                    if (labels[i].peso == -1 || labels[nodo].peso + m[nodo][i] < labels[i].peso){
                        if (labels[nodo].peso + m[nodo][i] < labels[i].peso){
                            process += 'Mejorando el coste del nodo '+i+"***";
                        }
                        labels[i].peso = labels[nodo].peso + m[nodo][i];
                        labels[i].precedente = nodo;
                        process += 'Coste del nodo ' + i + ' desde nodo ' + nodo + ': ' + labels[i].peso+'***';
                    }
                }
            }
            labels[nodo].marcado = 1;
            process += 'Nodo ' + nodo + ' marcado***';
   	} //end while
        //Caculo de la longitud de la ruta, es decir, cuantos nodos se recorren (incluyendo el origen y el final)
        var longitud = 2;
        var x = b;
        while ((x = labels[x].precedente) != a) longitud++;
        var ruta = [longitud];
        if (ruta == null) return;
        //Se obtiene la ruta siguiendo el precedente de cada nodo
        ruta[longitud - 1] = b;
        x = b;
        for (var i = 1; i < longitud; i++){
            x = labels[x].precedente;
            ruta[longitud -i -1] = x;
        }
        var peso = labels[b].peso;//peso/coste minimo
        return [labels, ruta, peso, process];
}