//Obtener datos por pais++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var countryObjList = []
var countryObjJson = "" 
//Obtener objeto pais
function get_country(country_name){
    //Cargar datos del csv
    d3.csv("data.csv", conversor).then(function(data){
        country_obj = country(data,country_name);
        countryObjList.push(country_obj)
        countryObjJson += JSON.stringify(country_obj)+", \n"
        console.log(countryObjJson)
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
    return country_obj;
}

//Clase pais para guardar valores
class Country {
    constructor(name){
        this.name = name;
        this.capital = "";
        this.distance = 0;
        this.flag = "generic_country.png";
        this.population = 0;
        this.poPer = [];
        this.year_value = [];
        for (var i = 2010 ; i < 2019 ;i ++ ){
            this.year_value.push([i,0])
            this.poPer.push([i,0])
        }
    }

    toJson(){
        return{
            name: this.name,
            nombre: this.nombre,
            capital: this.capital,
            distance: this.distace,
            flag: this.flag,
            population: this.population,
            yearValue: this.year_value,
            poPer: this.poPer
            };
        }
}



//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Obtener datos por año******************************************************************

//Obtener objeto año
var retYear

function get_year(year){
    //Cargar datos del csv
    d3.csv("data.csv", conversor).then(function(data){
        retYear = select_year(data, year);
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
    return year_obj;
}

class Year{

    constructor(year){
        this.year = year;
        this.countries = [];
    }
}
//***************************************************************************************

