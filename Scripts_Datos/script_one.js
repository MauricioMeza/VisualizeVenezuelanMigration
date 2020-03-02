//Obtener datos por pais++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

function get_data_by_country(){
    get_country($("#tx1").val(), "p1")
}

//Obtener objeto pais
function get_country(country_name, id){
    //Cargar datos del csv
    d3.csv("data.csv", conversor, function(data){
        country_obj = country(data,country_name);
        $("#"+id).html(country_obj.toString())

    });

}

//Convertir datos numericos en enteros
function conversor(d){
    d.Year = +d.Year;
    d.Value = +d.Value;
    return d;
}

//Buscar valores anuales por pais
function country(data, country_name){

    var country_obj = new Country(country_name)
    //i : data
    //j : object
    for (var i = 0; i < data.length; i ++){
        if (country_name == data[i]["Country / territory of asylum/residence"]){

            for (j = 0; j < country_obj.year_value.length; j++){
                if (country_obj.year_value[j][0] == data[i]["Year"]){
                    if (!isNaN(data[i]["Value"])){
                        country_obj.year_value[j][1] = country_obj.year_value[j][1]+data[i]["Value"];    
                    }
                }
            }
        }
    }
    console.log(country_obj);

    return country_obj;
}

//Clase pais para guardar valores
class Country {
    constructor(name){
        this.name = name;
        this.year_value = [];
        for (var i = 2010 ; i < 2019 ;i ++ ){
            this.year_value.push([i,0])
        }
    }

    toString(){
        var values = "";
        for(var i = 0; i < this.year_value.length; i ++){
            values = values.concat("<br>"+this.year_value[i][0]+" : "+this.year_value[i][1]);  
        }
        return this.name + values;
    }
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Obtener datos por año******************************************************************
function get_data_by_year(){
    get_year($("#tx2").val(), "p2")
}

//Obtener objeto año
function get_year(year, id){
    //Cargar datos del csv
    d3.csv("data.csv", conversor, function(data){
        year_obj = select_year(data, year);
        $("#"+id).html(year_obj.toString())
    });

}

//Seleccionar los datos de todos los paises del año solicitado
function select_year(data, year){
    var year_obj = new Year(year);
    var current_country = data[0]["Country / territory of asylum/residence"];
    year_obj.countries.push([current_country,0]);

    for (var i = 0; i < data.length; i ++){
        if (current_country == data[i]["Country / territory of asylum/residence"] && year == data[i]["Year"] && !isNaN(data[i]["Value"])){
            //Si es el mismo pais y el año es correcto, sumar el valor
            var last = year_obj.countries.length - 1;
            year_obj.countries[last][1] = year_obj.countries[last][1] + data[i]["Value"];
        }else if(current_country != data[i]["Country / territory of asylum/residence"] && year == data[i]["Year"] && !isNaN(data[i]["Value"])){
            //Si el pais es diferente, pero el año es correcto, agregar el pais con el valor
            current_country = data[i]["Country / territory of asylum/residence"];    
            year_obj.countries.push([current_country, data[i]["Value"]])
        }else if(current_country != data[i]["Country / territory of asylum/residence"] && year == data[i]["Year"] && isNaN(data[i]["Value"])){
            //Si el pais es diferente y el año es correcto, pero el valor no es un numero, agregar un cero
            current_country = data[i]["Country / territory of asylum/residence"];    
            year_obj.countries.push([current_country,0])
        }else if(current_country != data[i]["Country / territory of asylum/residence"] && year != data[i]["Year"]){
            //Si el pais es diferente, pero el año no es correcto, agregarlo con valor cero
            current_country = data[i]["Country / territory of asylum/residence"];    
            year_obj.countries.push([current_country,0])
        }//Si el pais es el mismo pero el año es incorrecto, no hacer nada
    }
    console.log(year_obj);
    return year_obj;
}

class Year{

    constructor(year){
        this.year = year;
        this.countries = [];
    }

    toString(){
        var values2 = "";
        for(var i = 0; i < this.countries.length; i ++){
            values2 = values2.concat("<br>"+this.countries[i][0]+" : "+this.countries[i][1]);  
        }
        return this.year + values2;
    }
}
//***************************************************************************************

