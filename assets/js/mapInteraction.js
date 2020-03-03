function addText(year){
    var text, img, data, data2; 

    switch(year){
        case 2010:
            text = "<b>2010:</b> Hugo chavez lleva 8 años en el gobierno de la Revolucion Bolivariana. Algunos venezolanos opuestos a esta habian salido del pais durante la anterior decada principalmente a destinos como Europa y EEUU. A finales de año su partido pierde la mayoria en el senado y la oposicion al Chavez comienza a tomar fuerza."
            img = "assets/img/img2010.png";
            data = "assets/csv/2010.txt";
            data2 = `y,cantidad
                    2009,7329
                    2010,7329`;
            break;
        case 2011:
            text = "<b>2011:</b> Se diagnostica a Chavez con cancer mientras una crisis energetica causada por el cambio climatico aumenta la oposicion al regimen, sin embargo un alza en el precio del petroleo le permite a Chavez mantener la economia del pais y su Revolucion Bolivariana en buena marcha manteniendo su popularidad entre sus seguidores."
            img = "assets/img/img2011.png";
            data = "assets/csv/2011.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150`;
            break;
        case 2012:
            text = "<b>2012:</b> Chavez es reelegio por 3ra vez consecutiva, sin embargo su estado de salud continua empeorando delegando cada vez mas el poder a su vicepresidente Nicolas Maduro. Asi mismo el chavismo gana las eleccione regionales y su popularidad aumenta con un precio de petroleo constantemente alto y una economia en marcha."
            img = "assets/img/img2012.png";
            data = "assets/csv/2012.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707`;
            break;
        case 2013:
            text = "<b>2013:</b> Despues de 13 años como presidente Hugo Chavez muere a causa de su enfermadad y la presidencia es asumida por Nicolas Maduro, aunque continua las politicas de Chavez se genera una gran incertidumbre para el futuro de Venezuela. Comienzan las protestas en su oposicion con un saldo de 9 muertos en ese año."
            img = "assets/img/img2013.png";
            data = "assets/csv/2013.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707
                    2013,9552`;
            break;
        case 2014:
            text = "<b>2014:</b> Las protestas al gobierno de maduro continuan dejando casi 41 muertos y 180 heridos, a finales de año el precio del petroleo tiene una estrepitoza caida de 100 a menos de 50 dolares el barril lo cual aumenta la incertidumbre al futuro de un pais que depende de la exportacion de crudo para mantener su economia."
            img = "assets/img/img2014.png";
            data = "assets/csv/2014.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707
                    2013,9552
                    2014,12831`;
            break;
        case 2015:
            text = "<b>2015:</b> Las consecuencias de la caida del petroleo no se demoran llegar aumentando la inflacion, el desempleoy el decontento en el pais. Continuan las protestas contra el gobierno de Maduro mientras la oposicion logra conseguir una victoria aplastante al partido de Maduro ganando una mayoria en la asamblea nacional."
            img = "assets/img/img2015.png";
            data = "assets/csv/2015.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707
                    2013,9552
                    2014,12831
                    2015,22548`;
            break;
        case 2016:
            text = "<b>2016:</b> La represion a las protestas continua generando mas victimas mientras el desempleo, la inflacion y el crimen aumentan. Maduro no permite que la nueva samblea en su oposicion se pocesione y desconoce su autoridad, esto aumenta las protestas mientras EEUU toma esto para imponer fuertes sanciones economicas al gobierno. "
            img = "assets/img/img2016.png";
            data = "assets/csv/2016.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707
                    2013,9552
                    2014,12831
                    2015,22548
                    2016,52626`;
            break;
        case 2017:
            text = "<b>2017:</b> Maduro por un referendo que muchas autoridades internacionales reconocen como fraudulento llama a una Asamblea Nacional Constituyente para reemplazar el congreso en su contra. Esto dispara las protestas, sanciones, inflacion y crimen a niveles criticos que amenazan con acabar el pais."
            img = "assets/img/img2017.png";
            data = "assets/csv/2017.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707
                    2013,9552
                    2014,12831
                    2015,22548
                    2016,52626
                    2017,502806`;
            break;
        case 2018:
            text = "<b>2018:</b> Este es el año con la mayor migracion de Venezolanos fuera del Pais, la mayoria saliendo sin un destino fijo en busca de empleo, estabilidad y alejarse de la crisis que enfrenta su pais, casi todos salen por la frontera con Colombia generando la crisis de refugiados mas grande en la historia de Latinoamerica."
            img = "assets/img/img2018.png";
            data = "assets/csv/2018.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707
                    2013,9552
                    2014,12831
                    2015,22548
                    2016,52626
                    2017,502806
                    2018,3078183`;
            break;
        case 2019:
            text = "<b>2019:</b> Este es el año con la mayor migracion de Venezolanos fuera del Pais, la mayoria saliendo sin un destino fijo en busca de empleo, estabilidad y alejarse de la crisis que enfrenta su pais, casi todos salen por la frontera con Colombia generando la crisis de refugiados mas grande en la historia de Latinoamerica."
            img = "assets/img/img2017.png";
            data = "assets/csv/2019.txt";
            data2 = `y,cantidad
                    2010,7329
                    2011,8150
                    2012,8707
                    2013,9552
                    2014,12831
                    2015,22548
                    2016,52626
                    2017,502806
                    2018,3078183
                    2019,4610443`;
        break;
    }
    var parrafo = $("#paragraphYear");
    var imagen = $("#imgYear");

    parrafo.fadeOut(function(){
        parrafo.html(text)
        parrafo.fadeIn()
    });

    imagen.fadeOut(function(){
        imagen.attr("src", img)
        imagen.attr("height", "100px")
        imagen.attr("width","100px")
        imagen.fadeIn()
    });

    drawBarGraph(data)
    drawLineGraph(data2, year)
}
