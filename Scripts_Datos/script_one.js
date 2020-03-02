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

//get_country("Albania")

function get_data(){
    get_country($("#tx1").val(), "p1")
}


