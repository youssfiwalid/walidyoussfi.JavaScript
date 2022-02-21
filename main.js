let Titel = document.getElementById('Titel');
let Preis = document.getElementById('Preis');
let Steuern = document.getElementById('Steuern');
let Anzeigen = document.getElementById('Anzeigen');
let Rabatt = document.getElementById('Rabatt');
let gesamt = document.getElementById('gesamt');
let zählen = document.getElementById('zählen');
let Kategorie = document.getElementById('Kategorie');
let erstellen = document.getElementById('erstellen');

let walid = 'erstellen';
let youssfi;


// das ist  gesamt //
    function gesa(){
         if(Preis.value != ''){
             let ergebnis = (+Preis.value + +Steuern.value + +Anzeigen.value ) - +Rabatt.value; // + 9abill il input iwalii number  //
             gesamt.innerHTML = ergebnis;
             gesamt.style.background ='#040';
         }else{
            gesamt.innerHTML = '';
            gesamt.style.background ='rgb(218, 10, 10)';
         }
    }

    // produkt erstellen //

    let data ;

    if(localStorage.produkt !=null){
        data = JSON.parse(localStorage.produkt )
    }else{
        data = [];
    }
    

    erstellen.onclick = function(){
        let neuesp ={
            Titel:Titel.value.toLowerCase(),
            Preis:Preis.value,
            Steuern:Steuern.value,
            Anzeigen:Anzeigen.value,
            Rabatt:Rabatt.value,
            gesamt:gesamt.innerHTML,
            zählen:zählen.value,
            Kategorie:Kategorie.value.toLowerCase(),

        }
        if(Titel.value != '' && Preis.value != '' && Kategorie.value != '' && neuesp.zählen < 100){
            if (walid === 'erstellen'){
                if(neuesp.zählen > 1){
                    for(let i = 0 ; i <neuesp.zählen ; i++){
                        data.push(neuesp);
                    }
                }else{
                        data.push(neuesp);
                }
            }else{
                data [youssfi] = neuesp ;
                walid = 'erstellen';
                erstellen.innerHTML = 'erstellen';
                zählen.style.display = 'block';
            }
            dataloschen()
        }
       
        
        
        localStorage.setItem('produkt', JSON.stringify(data)      )
        console.log(neuesp);

      
        lesendata()

    }
    // Daten löschen//
    function dataloschen(){
        Titel.value = '';
        Preis.value = '';
        Steuern.value = '';
        Anzeigen.value = '';
        Rabatt.value = '';
        gesamt.innerHTML  = '';
        zählen.value = '';
        Kategorie.value = '';
    }
    // lesen//
    function  lesendata(){
        gesa()
        let table = '';
        for(let i =0; i< data.length; i++){
            table += `
                    <tr>
                                <td>${i+1}</td>
                                <td>${data[i].Titel}</td>
                                <td>${data[i].Preis}</td>                                
                                <td>${data[i].Steuern}</td>
                                <td>${data[i].Anzeigen}</td>
                                <td>${data[i].Rabatt}</td>
                                <td>${data[i].gesamt}</td>
                                <td>${data[i].zählen}</td>
                                <td>${data[i].Kategorie}</td>

                                <td><button onclick ="aktuali(${i})" id="aktualisieren">aktualisieren</button></td>
                                <td><button onclick="loschendata (${i})" id="löschen">löschen</button></td>
                    </tr>
            
            
            
            `;
        }
        

        document.getElementById('td').innerHTML = table ;
        let bt = document.getElementById('loschenall');
        if(data.length > 0){
            bt.innerHTML = `
            <button  onclick= "alleslöschen()">alles löschen (${ data.length}) </button>
            
            `
        }else{
            bt.innerHTML = '';
        }

    }
    lesendata()

    //löschen//

    function loschendata (i){
        data.splice(i,1);
        localStorage.produkt = JSON.stringify(data);
        lesendata()

    }
function alleslöschen(){
    localStorage.clear()
    data.splice(0)
    lesendata()

}

// aktualisieren=update //
function aktuali (i){

    Titel.value = data [i].Titel;
    Preis.value = data [i].Preis;
    Steuern.value = data [i].Steuern;
    Anzeigen.value = data [i].Anzeigen;
    Rabatt.value = data [i].Rabatt;
    gesa()
    zählen.style.display = 'none';
    Kategorie.value = data [i].Kategorie;
    erstellen.innerHTML = 'aktualisieren';
    walid = 'aktualisieren';
    youssfi = i ;
    scroll({
        top:0,
        behavior: 'smooth',

    })
    
}

// Suche //
 let se = 'Titel';

 function gesuchewalid(id)
 {
     let wy = document.getElementById('Suchee');
     if( id == 'stitle'){
        se = 'Titel';
       // wy.placeholder = 'Suche nach Titel ';

     }else{
        se = 'kategorie';
       // wy.placeholder = 'Suche nach Kategorie ';
     }
     wy.placeholder = 'Suche nach  ' + se;
     wy.focus()
     wy.value = '';
     lesendata()
    
 }

 //suche //

 function swy(value) {
     let table = '';
     if(se == 'Titel'){
    for(let i =0; i< data.length; i++) {
        if(data[i].Titel.includes(value.toLowerCase())){
        
            table += `
            <tr>
                        <td>${i}</td>
                        <td>${data[i].Titel}</td>
                        <td>${data[i].Preis}</td>                                
                        <td>${data[i].Steuern}</td>
                        <td>${data[i].Anzeigen}</td>
                        <td>${data[i].Rabatt}</td>
                        <td>${data[i].gesamt}</td>
                        <td>${data[i].zählen}</td>
                        <td>${data[i].Kategorie}</td>

                        <td><button onclick ="aktuali(${i})" id="aktualisieren">aktualisieren</button></td>
                        <td><button onclick="loschendata (${i})" id="löschen">löschen</button></td>
            </tr>
    
    
    
    ` ;

        }
    }
     }else{
        for(let i =0; i< data.length; i++) {
            if(data[i].Kategorie.includes(value.toLowerCase())){
            
                table += `
                <tr>
                            <td>${i}</td>
                            <td>${data[i].Titel}</td>
                            <td>${data[i].Preis}</td>                                
                            <td>${data[i].Steuern}</td>
                            <td>${data[i].Anzeigen}</td>
                            <td>${data[i].Rabatt}</td>
                            <td>${data[i].gesamt}</td>
                            <td>${data[i].zählen}</td>
                            <td>${data[i].Kategorie}</td>
    
                            <td><button onclick ="aktuali(${i})" id="aktualisieren">aktualisieren</button></td>
                            <td><button onclick="loschendata (${i})" id="löschen">löschen</button></td>
                </tr>
        
        
        
        ` ;
    
            }
        }

     }
     document.getElementById('td').innerHTML = table ;
 }
     
 