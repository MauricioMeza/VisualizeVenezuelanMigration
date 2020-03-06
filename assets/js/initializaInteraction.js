class State{
    constructor(year, country){
        this.country = country
        this.year = year
    }
}

function initializeInfo(year, country){
    changeCountries(country)
    addText(year)   
}

currentState = new State(2010,5)
initializeInfo(2010,5)
fillPoper(countryData)