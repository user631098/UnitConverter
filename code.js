let currentQuantity = "length";
let checkedOrNot = false;

window.onload = () => changeQuant("length");

document.getElementById("headerText").addEventListener("click", function() {
    window.location.href = "index.html";
});
document.getElementById("input").addEventListener("input", function() {
    if(this.value < this.min && currentQuantity!="temp") this.value="";
    if(checkedOrNot===true) { convert(); }
});
document.getElementById("checkbox").addEventListener("change", function() {
    if (this.checked) {
        checkedOrNot = true;
    } else {
        checkedOrNot = false;
    }
});
document.getElementById("sun").addEventListener("click", () => {
    document.getElementById("sun").style.transform = "scale(0.5) rotate(180deg)";
    setTimeout(() => {
        document.getElementById("sun").style.transform = "scale(1) rotate(0deg)";
    }, 500);
    document.body.style.backgroundColor = "white";
    document.getElementById("convertText").style.color = "black";
    document.getElementById("tableContainer").style.backgroundColor = "lightgray";
    document.getElementById(currentQuantity).style.backgroundColor = "lightgray";
});
document.getElementById("moon").addEventListener("click", () => {
    document.getElementById("moon").style.transform = "scale(0.5) rotate(180deg)";
    setTimeout(() => {
        document.getElementById("moon").style.transform = "scale(1) rotate(0deg)";
    }, 500);
    document.body.style.backgroundColor = "black";
    document.getElementById("convertText").style.color = "white";
    document.getElementById("tableContainer").style.backgroundColor = "darkgray";
    document.getElementById(currentQuantity).style.backgroundColor = "darkgray";
});


function changeQuant(quant) {
    document.getElementById("output").value = "";
    document.getElementById("input").value = "";
    document.getElementById(currentQuantity).style.height = "7vh";
    document.getElementById(currentQuantity).style.backgroundColor = "rgb(24, 112, 29)";
    document.getElementById(currentQuantity).style.color = "white";
    document.getElementById(currentQuantity).style.fontWeight = "normal";
    document.getElementById(currentQuantity).style.border = "0.2em solid black";
    document.getElementById(currentQuantity).style.fontSize = "90%";
    currentQuantity = quant;
    document.getElementById(currentQuantity).style.height = "8vh";
    document.getElementById(currentQuantity).style.backgroundColor = "lightgray";
    document.getElementById(currentQuantity).style.color = "green";
    document.getElementById(currentQuantity).style.fontWeight = "bold";
    document.getElementById(currentQuantity).style.border = "none";
    document.getElementById(currentQuantity).style.fontSize = "99%";

    changeUnits(quant);

}

function changeUnits(quant) {
    let selects = document.querySelectorAll("#selectUnit");

    let units = {
        length: ["Meter", "Kilometer", "Centimeter", "Inch", "Millimeter"],
        mass: ["Kilogram", "Gram", "MilliGram", "Ton", "Pound"],
        time: ["Seconds", "Minutes", "Hours", "Milliseconds", "Days"],
        temp: ["Kelvin", "Celsius", "Fahrenheit"],
        data: ["Bit", "Byte", "KiloByte", "MegaByte", "GigaByte", "TeraByte"],
        energy: ["Joule", "Calorie", "KiloJoule", "kWh", "eV"],
        pressure: ["Pascal", "psi", "atm", "Torr"]
    };

    selects.forEach(select => {
        select.innerHTML = "";
        if (units[quant]) {
            units[quant].forEach(unit => {
                let option = new Option(unit, unit.toLowerCase());
                select.appendChild(option);
            });
        }
    });
}

function convert() {
    console.log("Executed");
    let value = parseFloat(document.getElementById("input").value);
    if (isNaN(value)) {
        document.getElementById("output").value = "";
        return;
    }    
    let fromUnit = document.getElementsByClassName("fromUnit")[0].value;
    let toUnit = document.getElementsByClassName("toUnit")[0].value;
    let quantityType = currentQuantity;

    const formulas = {
        length: {
            meter: { meter: v => v*1, kilometer: v => v / 1000, centimeter: v => v * 100, inch: v => v * 39.37, millimeter: v => v * 1000 },
            kilometer: { meter: v => v * 1000, kilometer: v => v*1, centimeter: v => v*100000, millimeter: v => v*1000000, inch: v => v*39370.1},
            centimeter: { meter: v => v / 100, kilometer: v => v/100000, centimeter: v => v*1, millimeter: v => v*10,inch: v => v*0.393701 },
            inch: { meter: v => v / 39.37, kilometer: v => v/39370.1, centimeter: v => v*2.54, millimeter: v => v*25.4, inch: v => v*1 },
            millimeter: { meter: v => v / 1000, kilometer: v => v/1000000, centimeter: v => v/10, millimeter: v => v*1, inch: v => v/25.4 }
        },
        mass: {
            kilogram: { kilogram: v => v*1, gram: v => v * 1000, milligram: v => v * 1e6, ton: v => v / 1000, pound: v => v * 2.205 },
            gram: { kilogram: v => v / 1000, gram: v => v*1, milligram: v => v*1000, ton: v => v/1000000, pound: v => v/453.6 },
            milligram: { kilogram: v => v/1e6, gram: v => v/1000, milligram: v => v*1, ton: v => v/1000000000, pound: v => v/453600 },
            ton: { kilogram: v => v*1000, gram: v => v*1000000, milligram: v => v*1000000000, ton: v => v*1, pound: v => v*2205 },
            pound: { kilogram: v => v/2.205, gram: v => v*453.6, milligram: v => v*453600, ton: v => v/2205, pound: v => v*1 }
        },
        time: {
            seconds: { seconds: v => v*1, minutes: v => v / 60, hours: v => v / 3600, milliseconds: v => v * 1000, days: v => v / 86400 },
            minutes: { seconds: v => v*60, minutes: v => v*1, hours: v => v/60, milliseconds: v => v*60000, days: v => v/1440 },
            hours: { seconds: v => v*3600, minutes: v => v*60, hours: v => v*1, milliseconds: v => v*3.6e+6, days: v => v/24 },
            milliseconds: { seconds: v => v/1000, minutes: v => v/60000, hours: v => v/3.6e+6, milliseconds: v => v*1, days: v => v/8.64e+7 },
            days: { seconds: v => v*86400, minutes: v => v*1440, hours: v => v*24, milliseconds: v => v*8.64e+7, days: v => v*1 }
        },
        data: {
            bit: { bit: v => v*1, byte: v => v/8, kilobyte: v => v/8.192e+3, megabyte: v => v/8.192e+6, gigabyte: v => v/8.192e+9, terabyte: v => v/8.192e+12 },
            byte: { bit: v => v*8, byte: v => v*1, kilobyte: v => v/1.024e+3, megabyte: v => v/1.024e+6, gigabyte: v => v/1.024e+9, terabyte: v => v/1.024e+12 },
            kilobyte: { bit: v => v*8.192e+3, byte: v => v*1.024e+3, kilobyte: v => v*1, megabyte: v => v/1.024e+3, gigabyte: v => v/1.024e+6, terabyte: v => v/1.024e+9 },
            megabyte: { bit: v => v*8.192e+6, byte: v => v*1.024e+6, kilobyte: v => v*1.024e+3, megabyte: v => v*1, gigabyte: v => v/1.024e+3, terabyte: v => v/1.024e+6 },
            gigabyte: { bit: v => v*8.192e+9, byte: v => v*1.024e+9, kilobyte: v => v*1.024e+6, megabyte: v => v*1.024e+3, gigabyte: v => v*1, terabyte: v => v/1.024e+3 },
            terabyte: { bit: v => v*8.192e+12, byte: v => v*1.024e+12, kilobyte: v => v*1.024e+9, megabyte: v => v*1.024e+6, gigabyte: v => v*1.024e+3, terabyte: v => v*1 }
        },
        temp: {
            kelvin: { kelvin: v => v*1, celsius: v => v - 273.15, fahrenheit: v => ((v-273.15)*9/5)+32 },
            celsius: { celsius: v => v*1, fahrenheit: v => ((v * 9/5) + 32), kelvin: v => v+273.15 },
            fahrenheit: { celsius: v => (v - 32) * 5/9, fahrenheit: v => v*1, kelvin: v => ((v-32)*5/9)+273.15 }
        },
        energy: {
            joule: { joule: v => v*1, calorie: v => v/4.184, kilojoule: v => v/1e+3, kWh: v => v/3.6e+6, eV: v => v/1.602e-19 },
            calorie: { joule: v => v*4.184, calorie: v => v*1, kilojoule: v => v/239, kWh: v => v/8.6e+5, eV: v => v/3.826e-20 },
            kilojoule: { joule: v => v*1e+3, calorie: v => v*239, kilojoule: v => v*1, kWh: v => v/3.6e+3, eV: v => v/1.602e-16 },
            kWh: { joule: v => v*3.6e+6, calorie: v => v*8.6e+5, kilojoule: v => v*3.6e+3, kWh: v => v*1, eV: v => v/4.45e-14 },
            eV: { joule: v => v*1.602e-19, calorie: v => v*3.826e-20, kilojoule: v => v*1.602e-16, kWh: v => v*4.45e-14, eV: v => v*1 }
        },
        pressure: {
            pascal: { pascal: v => v*1, psi: v => v/6894.76, atm: v => v/1.01325e+5, torr: v => v/133.322 },
            psi: { pascal: v => v*6894.76, psi: v => v*1, atm: v => v/14.696, torr: v => v*51.715 },
            atm: { pascal: v => v*1.01325e+5, psi: v => v*14.696, atm: v => v*1, torr: v => v*760 },
            torr: { pascal: v => v*133.322, psi: v => v/51.715, atm: v => v/760, torr: v => v*1 }
        }
    };

    document.getElementById("output").value = formulas[quantityType]?.[fromUnit]?.[toUnit]?.(parseFloat(value.toFixed(3))) ?? "";
}
