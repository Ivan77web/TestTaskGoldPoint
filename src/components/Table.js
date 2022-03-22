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
            let stringForCells = document.createElement("div");
            stringForCells.classList.add("stringForCells");
            stringForCells.classList.add(`stringForCells${i}`);

            let cellCode = document.createElement("div");
            cellCode.classList.add("cellCode");
            cellCode.classList.add(`cellCode${i}`);
            cellCode.innerHTML = objectCurrency[i][0];

            let cellValue = document.createElement("div");
            cellValue.classList.add("cellValue");
            cellValue.classList.add(`cellValue${i}`);
            cellValue.innerHTML = Math.round(objectCurrency[i][1].Value * 100)/100 + "₽";

            let cellChanges = document.createElement("div");
            cellChanges.classList.add("cellChanges");
            cellChanges.classList.add(`cellChanges${i}`);

            let percent = Math.round( (objectCurrency[i][1].Value * 100) / (checkLastValue(objectCurrency[i][0], size) ) * 100) / 100;
            percent = Math.round((percent - 100)*100) / 100;
            cellChanges.innerHTML = percent + "%" ;

            if(percent >= 0){
                cellChanges.classList.add("greenText")
            } else{
                cellChanges.classList.add("redText")
            }

            table.append(stringForCells)
            stringForCells.append(cellCode);
            stringForCells.append(cellValue);
            stringForCells.append(cellChanges);
        }
    }

    function getCurrency(object){
        objectCurrency = Object.entries(object);
        console.log(objectCurrency);
    }

    function getCurrencyLast(object){
        objectCurrencyLast = Object.entries(object);
        console.log(objectCurrencyLast);
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
        // let urlLast = "https://www.cbr-xml-daily.ru/archive/" + year + "/" + "0" + month + "/19/daily_json.js";
        let urlLast = "https://www.cbr-xml-daily.ru/archive/2022/03/19/daily_json.js";

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

    document.addEventListener("mouseover", function(e){
        if(e.target.classList.contains("stringForCells")){
            // document.querySelector(`.${e.target.classList[1]}`).style.background = "red";
        }
    })



    return(
        <div className="Table">
            <div className="header">
                <div className="codeText">
                    Код валюты
                </div>
                <div className="priceText">
                    Стоимость в рублях   
                </div>
                <div className="percentText">
                    Изменение цены в %
                </div>
            </div>
            <div className="tableCurrency">
                
            </div>
        </div>
    )
}
