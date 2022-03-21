import React, {useState, useEffect} from "react";

export default function Table(){
    let date = new Date();
    let [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate() - 2]

    let objectCurrency = null;
    let objectCurrencyLast = null;

    function createCells(){
        let table = document.querySelector(".tableCurrency");
        let size = objectCurrency.length;

        for(let i = 0; i < size; i++){
            let stringForCells = document.createElement("tr");

            let cellCode = document.createElement("td");
            cellCode.innerHTML = objectCurrency[i][0];

            let cellValue = document.createElement("td");
            cellValue.innerHTML = Math.round(objectCurrency[i][1].Value * 100)/100;

            let cellChanges = document.createElement("td");
            cellChanges.innerHTML = checkLastValue(objectCurrency[i][0], size);

            table.append(stringForCells)
            stringForCells.append(cellCode);
            stringForCells.append(cellValue);
            stringForCells.append(cellChanges);
        }
    }

    function getCurrency(object){
        objectCurrency = Object.entries(object);
    }

    function getCurrencyLast(object){
        objectCurrencyLast = Object.entries(object);
    }

    function checkLastValue(code, size){
        for(let i = 0; i < size; i++){
            if(objectCurrencyLast[i][0] == code){
                return Math.round(objectCurrencyLast[i][1].Value * 100)/100;
            } 
        }
    }

    useEffect(function(){
        let url = "https://www.cbr-xml-daily.ru/daily_json.js";
        let urlLast = "https://www.cbr-xml-daily.ru/archive/" + year + "/" + "0" + month + "/" + day + "/daily_json.js";

        const fetchOne = fetch(url)
            .then( response => response.json() )
            .then( result => {
                getCurrency(result.Valute);
            })
    
            .catch(error => console.log("Упс, ошибка:", error));

        const fetchTwo = fetch(urlLast)
            .then( response => response.json() )
            .then( result => {
                getCurrencyLast(result.Valute);
            })
    
            .catch(error => console.log("Упс, ошибка:", error));

        Promise.all([fetchOne, fetchTwo])
            .then( () => {
                createCells();
            })
    }, [])



    return(
        <div className="Table">
            <table className="tableCurrency">

            </table>
        </div>
    )
}
