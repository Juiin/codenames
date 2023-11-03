var express = require('express');
var app = express();
var serv = require('http').Server(app);
 
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
 
var PORT = process.env.PORT || 11155;
serv.listen(PORT);
console.log("Codenames server started. PORT: 11155");


var ASSASSIN_SPACE_ID = -1;

var COLOR_RED = "#cd3333";
var COLOR_YELLOW = "#cd9b1d";
var COLOR_BLUE = "#1874cd";
var COLOR_BLACK = "#808080";
var COLOR_GREEN = "#009000";

var TIMER = 0;

var BLUE_SESSION_WINS = 0;
var RED_SESSION_WINS = 0;

function BOARD_SPACE(id, color, revealed,word) {
    this.id = id;
    this.color = color;
    this.revealed = revealed;
    this.word = word;
}
var SOCKET_LIST = {};
var BOARD_ARRAY = [];

var startingTeam = Math.floor(Math.random() * 2); // 0 = blue 1 = red
if(startingTeam == 0){var startingTeamString = "BLUE"}else{var startingTeamString = "RED"}

var TURN = startingTeamString;

var blue_score = 0;
var red_score = 0;

function newGame(){

    var data = ["flasche","flugzeug","flur","frau","fussball","gabel","aerger","Abend","Abfahrt","Abflug","Absender","Adresse","Alkohol","Ampel","Anfang","Angebot","Angestellte","Angst","Ankunft","Anmeldung","Anrufbeantworter","Ansage","Anschluss","Antwort","Anzeige","Apotheke","Appartement","Appetit","April","Arbeitsplatz","Arm","Arzt","Aufenthalt","Aufgabe","Auge","Ausbildung","Ausflug","Auskunft","Auslaender","Aussage","Ausstellung","Ausweis","Automat","Baeckerei","Buero","Baby","Bad","Bahnhof","Balkon","Banane","Bank","Batterie","Baum","Beamte","Beispiel","Benzin","Beratung","Berg","Beruf","Berufsschule","Besuch","Betrag","Bewerbung","Bild","Bitte","Bleistift","Blick","Blume","Bluse","Blut","Bohne","Broetchen","Bruecke","Brief","Briefkasten","Briefmarke","Brieftasche","Brille","Brot","Bruder","Buch","Buchstabe","Cafe","CD","Creme","Dach","Dank","Dauer","Dezember","Disco","Doppelzimmer","Dorf","Durchsage","Durst","Dusche","E-Mail","Ecke","Ei","Einfuehrung","Eingang","Einladung","Eintritt","Einwohner","Einzelzimmer","Eltern","Empfang","Ende","Enkel","Entschuldigung","Erdgeschoss","Erfahrung","Ergebnis","Erlaubnis","Ermaessigung","Erwachsene","Faehre","Fuehrerschein","Fuehrung","Fabrik","Fahrer","Fahrkarte","Fahrplan","Fahrrad","Familie","Familienname","Farbe","Fax","Ferien","Fernsehgeraet","Feuerzeug","Fieber","Firma","Fleisch","Flughafen","Formular","Foto","Fruehjahr","Fruehling","Fruehstueck","Frage","Freizeit","Friseur","Frist","Fundbuero","Garage","Gas","Gast","Geburtstag","Gegenteil","Geld","Geldboerse","Gemuese","Gepaeck","Geschaeft","Geschwister","Gesicht","Gespraech","Gesundheit","Getraenk","Gewicht","Gewitter","Glueck","Glueckwunsch","Glas","Gleis","Groesse","Grippe","Gruss","Grundschule","Gruppe","Guthaben","Haar","Halle","Hals","Haltestelle","Hand","Handtuch","Handy","Hausaufgabe","Hausfrau","Haushalt","Hausmann","Heimat","Hemd","Herbst","Herd","Herr","Hilfe","Hobby","Holz","Hunger","Idee","Import","Industrie","Inhalt","Jacke","Job","Jugendherberge","Jugendliche","Kaese","Koerper","Kueche","Kuendigung","Kaffee","Kamera","Kanne","Kartoffel","Kasse","Kassette","Kassettenrecorder","Keller","Kenntnisse","Kennzeichen","Kette","Kfz","Kind","Kindergarten","Kino","Kiosk","Klasse","Kleid","Kleidung","Kneipe","Koffer","Kollege","Kollegin","Konsulat","Konto","Kontrolle","Kosmetik","Krankenkasse","Kredit","Kuchen","Kugelschreiber","Kurs","Loesung","Laden","Land","Landschaft","Lebensmittel","Leid","Lehre","Leute","Licht","Lied","Lohn","Lokal","Lust","Moebel","Muell","Magen","Mantel","Material","Mechaniker","Mehrwertsteuer","Meinung","Menge","Metall","Miete","Milch","Minute","Mittag","Mitte","Mitteilung","Mittelschule","Mittwoch","Mode","Moment","Monat","Morgen","Motor","Museum","Naehe","Nachbar","Nachmittag","Nachrichten","Name","Natur","Nebel","Norden","Notarzt","Notfall","Notiz","Nudel","Nummer","Ober","Obst","Oktober","Operation","Ordnung","Ort","Osten","Paeckchen","Paket","Panne","Papier","Parfuem","Park","Partei","Partner","Party","Pause","Plan","Plastik","Platz","Pommes","Portion","Postleitzahl","Pruefung","Praktikum","Praxis","Preis","Problem","Programm","Prospekt","Qualitaet","Quittung","Rabatt","Radio","Rathaus","Raucher","Raum","Realschule","Rechnung","Regen","Reinigung","Reisebuero","Reisefuehrer","Reparatur","Restaurant","Rezept","Rezeption","Rind","Rundgang","Sueden","Sache","Saft","Salat","Salz","Satz","Schueler","Schalter","Schluessel","Schluss","Schmerzen","Schwein","Schwester","Schwimmbad","See","Sehenswuerdigkeit","Seife","Sekretaerin","Sekunde","Sendung","Senioren","Service","Sessel","Sofa","Sohn","Sommer","Sonderangebot","Sonne","Sorge","Spuelmaschine","Spass","Spaziergang","Speisekarte","Spielplatz","Sprache","Sprachschule","Sprechstunde","Stueck","Stadt","Standesamt","Stoff","Streichholz","Strom","Student","Studentin","Studium","Stunde","Supermarkt","Suppe","Tuer","Tuete","Tankstelle","Tasche","Teil","Termin","Test","Text","Thema","Ticket","Tipp","Tochter","Tomate","Topf","Tourist","Treppe","Trinkgeld","U-Bahn","Unfall","Unterhaltung","Unterkunft","Unterricht","Unterschied","Unterschrift","Untersuchung","Urlaub","uebernachtung","Vater","Verbindung","Verkaeufer","Verkehr","Vermieter","Versicherung","Verspaetung","Vertrag","Video","Vormittag","Vorname","Vorsicht","Vorwahl","Waesche","Wagen","Weg","Wein","Welt","Werkstatt","Werkzeug","Westen","Wetter","Wiedersehen","Woche","Wochenende","Wochentag","Wohnung","Wolke","Wunsch","Wurst","Zahl","Zeitschrift","Zeitung","Zentrum","Zettel","Zeugnis","Zigarette","Zimmer","steuer","strudel","taste","tokio","verband","washington","wirtschaft","zelle","zylinder","wind","stift","tau","ton","verein","wolkenkratzer","zentaur","zahn","winnetou","stock","superheld","teleskop","tor","viertel","watt","wurf","zitrone","zeit","wand","strand","tafel","tempo","torte","vorsatz","weide","würfel","zoll","wanze","straße","tag","theater","turm","wald","welle","wurm","zug","umzug","tod","takt","toast","uhr","tanz","pass","pinguin","prinzessin","rolle","saturn","schiff","schnur","spion","peitsche","pirat","punkt","riegel","rom","schokolade","shakespeare","staat","peking","pistole","pyramide","römer","schale","schirm","schotten","siegel","stadion","pension","platte","quartett","riese","rost","schlange","schuh","skelett","stamm","pferd","po","quelle","ring","roulette","scheibe","schloss","schule","soldat","stempel","pflaster","rasen","ritter","rücken","schein","schnee","schuppen","spiel","stern","pilot","raute","rock","rute","schelle","schneemann","seite","spinne","krankenhaus","kunde","leim","löffel","matte","mikroskop","mühle","netz","öl","krankheit","lager","maler","maus","millionär","mund","new york","oper","krebs","lakritze","limousine","london","mandel","meer","mini","muschel","niete","optik","kreis","laser","linie","lösung","mangel","melone","mittel","mutter","ninja","orange","kreuz","laster","linse","löwe","mark","messe","moos","nacht","note","krieg","leben","loch","luft","maschine","messer","morgenstern","nadel","nuss","krone","lehrer","loch ness","mast","moskau","nagel","oktopus","geist","glocke","grund","hase","honig","hut","käfer","karte","könig","genie","glück","gürtel","haupt","horn","indien","kamm","kasino","kirche","königin","gericht","gold","gut","heide","horst","inka","kanal","kater","kiwi","konzert","geschirr","golf","hahn","hering","hotel","jäger","känguruh","katze","knie","korb","geschoss","grad","hamburger","herz","hubschrauber","jahr","kapelle","kerze","knopf","korn","gras","himalaja","hund","jet","kapitän","ketchup","koch","kraft","griechenland","harz","hollywood","hupe","jura","karotte","kiefer","kohle","bindung","bremse","chor","dieb","eis","fest","fleck","fuchs","blatt","bombe","brötchen","dame","dietrich","elfenbein","fackel","figur","fliege","funken","blau","boot","bulle","daumen","dinosaurier","england","fall","film","flöte","fuß","blinker","börse","burg","decke","doktor","ente","fallschirm","finger","flügel","futter","blüte","botschaft","busch","demo","drache","erde","feder","fisch","bock","boxer","deutschland","drossel","feige","fläche","forscher","gehalt","bogen","brause","china","drucker","dichtung","essen","fessel","frankreich","ladung","mond","leiter","wal","star","tisch","feuer","pfeife","brücke","gang","gift","iris","taucher","elf","bergsteiger","tausch","bund","hexe","läufer","einhorn","koks","roboter","mine","lippe","satellit","schild","olymp","brand","schnabeltier","abgabe","absatz","adler","afrika","ägypten","akt","alien","amerikaner","antarktis","anwalt","apfel","atlantis","atlas","auflauf","aufzug","ausdruck","australien","back","bande","bar","bär","bart","bau","bauer","bayern","becken","bett","TITANIC","COMPUTER","ABSTURZ","MAGAZIN","ZUFALL","CYBERSEX","KOSTENPFLICHTIG","KREDITKARTE","EISENBAHN","KRATZER","ARBEITSINSTRUMENT","AUSBLICK","NASENSCHLEIM","GANGSCHALTUNG","OPFER","REIS","ESSSTAEBCHEN","LIEGESTUHL","STROHHALM","LAWINE","WEINTRAUBE","DATENVERARBEITUNG","PORZELLAN","AKTIE","QUALLE","MARATHON","PFERDERENNEN","ORCHESTER","NATURKATASTROPHE","KAPITAL","POST","DATENBANK","PFANNE","MAUSTASTE","HANDBUCH","VITAMINE","FEUERWEHR","PROTOKOLL","KALENDER","TELEFON","ANANAS","HALLO","KILOMETER","WURSTSALAT","POLIZEI","SCHWARZMARKT","PENISOPERATION","LOEFFEL","MAISKOLBEN","KIPPE","BIER","TATSACHE","ARSCHGESICHT","EISTEE","OBERAFFENMEGAGEIL","RABE","PARANOID","SCHLAFWANDLER","BLIND","EGAL","ARZTHELFER","KNOCHEN","BRECHEN","LACHEN","ENTSCHEIDUNG","BALLON","LIEBE","REDEN","HAUS","BAUMSTAMM","AQUARIUM","WECHSELGELD","KELLNER","WOERTERBUCH","ZEBRA","KOFFERRAUM","FLUGZEUGABSTURZ","PAPST","KATZENKLO","ZIELPUNKT","FEHLER","MATHEMATIK","MORD","WUNDER","BODEN","STRASSENBAHN","COMPUTERSPIEL","MITTERNACHT","GOLDFISCH","HAMSTER","PAPRIKA","SCHIMMEL","KASTEN","GURKE","OBSTSALAT","VORHANG","SPUELMITTEL","LATEIN","DEUTSCH","ZEICHNEN","TURNEN","BIOLOGIE","CHEMIE","PHYSIK","GEOGRAFIE","RELIGION","PSYCHOLOGIE","SCHNITZEL","ALPHABET","PULLOVER","JEANS","WEIHNACHTEN","BIENE","SEESTERN","SAND","LEXIKON","WACHSEN","LESEN","DENKEN","MUEDE","BUEHNE","TISCHDECKE","UNKRAUT","TEPPICH","UMGEBUNG","ASCHENBECHER","ZIGARETTEN","FENSTER","WINTER","SONNENSCHEIN","SCHATZ","ENGEL","ZWERG","KINDERWAGEN","AUTO","HINZUFUEGEN","ANZAHL","ANSCHLAG","HAMMER","VOGEL","SCHRAUBE","ROSE","HOSE","KLEIN","ALLIANZ","APFELSAFT","NOTEBOOK","BRIEFUMSCHLAG","TASCHENTUCH","KARTON","RECHTSANWALT","KABEL","WEIHNACHTSBAUM","LICHTERKETTE","LAMPE","GUMMIBAND","SCHRANK","BUEROKLAMMER","UNIVERSITAET","KOPF","BEIN","SPORT","BALL","DRAHTLOS","CHEF","PFADFINDER","FEUERMELDER","KLASSENZIMMER","STUHL","TOILETTE","TELEFONNUMMER","AUTOHAENDLER","WASSER","UHRZEIT","GESCHENK","HANDTASCHE","VENTILATOR","HEIZUNG","RUECKEN","ENERGIE","STOCKWERK","MARKT","KREUZWORTRAETSEL","INTERNET","TASSE","KUEHLSCHRANK","TELLER","MEDIKAMENT","MANN","VIRUS","SCHORNSTEIN","ZIEGELSTEIN","ZIMT","ZUCKER","MARMELADE","SCHINKEN","BUTTER","MUSIK","TROMPETE","GARTEN","RUDER","GITTER","GEFAENGNIS","HAEFTLING","REISE","BAHN","SCHIENE","BUNDESWEHR","ZIVILDIENST","FEIERABEND","STERNSCHNUPPE","BOCKWURST","AUTOPILOT","LASSO","SCHATTEN","PIRATENSCHIFF","TASCHENRECHNER","STAMMBAUM","HERDE","BILDSCHIRM","JAGDHUND","FLUCH","STORCH","KLAMOTTEN","STIER","ZWILLING","JUNGE","MAEDCHEN","NASENBAER","GIROKONTO","DARSTELLUNG","EINZELSPIELER","BUSHALTESTELLE","DAMPFSCHIFFFAHRT","DATUM","HOCHZEIT","RAT","STYLIST","AZUBI","STRATEGIE","SINNLOS","CHAOS","PROFI","SPIDERMAN","COOL","GALGEN","KARTENSPIEL","TAXI","KNABBERN","GARTENZWERG","CLOWN","ASOZIAL","HENKER","ZAHNPASTA","ZAHNSCHMERZEN","STATISTIKEN","UNTERWASSERHOEHLE","KUNST","KARTEN","WASCHMASCHINE","STROMKREIS","GITARRE","ROCKBAND","SCHLAGZEUG","WAHNSINN","SCHEIBENWISCHER","SAENGER","MITTELALTER","WASSERPISTOLE","WELTMEISTERSCHAFT","BUNDESTAG","FASZINATION","MENSCH","HOFFNUNG","FREIHEIT","WITZ","EINFACH","BRATWURSTBRATGERAET","KOPFHOERER","LESELAMPE","BILDERRAHMEN","TENNISSCHLAEGER","SCHEISSE","LACHKRAMPF","TODESSTERN","VETO","GOOGLE","KAUGUMMI","ZIEGE","ZUCKERWATTE","BLOEDSINN","CHAT","EREKTION","DIEBSTAHL","LACH","GABELSTAPLER","POKER","MEISTER","HOCHWASSER","INFORMATION","ZUNEIGUNG","HASS","IMMER","KRASS","ALTER","IMPFSTOFF","KOCHSALZ","KONTAKT","SANDMAENNCHEN","MARIENKAEFER","TIER","GRILLE","SCHOKOLADENPUDDING","WOLF","BIRNE","SCHNUPFEN"];

    TIMER = 180;

    for(var i=0;i<data.length;i++){
        for(var j=i+1;j<data.length;j++){
            if(data[i].toUpperCase() === data[j].toUpperCase()){
                console.log("Duplicate: " + data[i]);
            }
        }
    }
    console.log("Word count: " + data.length);

    for (i = 0; i < 25; i++) { 
        var data_id = Math.floor(Math.random() * data.length);
        BOARD_ARRAY[i] = new BOARD_SPACE(i,COLOR_YELLOW,false,data[data_id].toUpperCase());
        data.splice(data_id,1);
    }
    startingTeam = Math.floor(Math.random() * 2); // 0 = blue 1 = red
    if(startingTeam == 0){
        startingTeamString = "BLUE"
        blue_score = 9;
        red_score = 8;
    }else{
        startingTeamString = "RED"
        red_score = 9;
        blue_score = 8;
    }
    
    TURN = startingTeamString;

    var IDS = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

    //Add Red Spaces
    for(var i=0;i<8;i++){
        var id = Math.floor(Math.random() * IDS.length);
        var id_from_array = IDS[id];
        BOARD_ARRAY[id_from_array].color = COLOR_RED;
        IDS.splice(id,1);
    }
    //Add Blue Spaces
    for(var i=0;i<8;i++){
        var id = Math.floor(Math.random() * IDS.length);
        var id_from_array = IDS[id];
        BOARD_ARRAY[id_from_array].color = COLOR_BLUE;
        IDS.splice(id,1);
    }
    //Add Assassins
    var id = Math.floor(Math.random() * IDS.length);
    var id_from_array = IDS[id];
    BOARD_ARRAY[id_from_array].color = COLOR_BLACK;
    ASSASSIN_SPACE_ID = id_from_array;
    IDS.splice(id,1);
    //Add Starting Space
    if(startingTeam == 0){
        var id = Math.floor(Math.random() * IDS.length);
        var id_from_array = IDS[id];
        BOARD_ARRAY[id_from_array].color = COLOR_BLUE;
        IDS.splice(id,1);
    }else{
        var id = Math.floor(Math.random() * IDS.length);
        var id_from_array = IDS[id];
        BOARD_ARRAY[id_from_array].color = COLOR_RED;
        IDS.splice(id,1);
    }


    for(var i in SOCKET_LIST){
        SOCKET_LIST[i].emit("addToChat","Team "+ startingTeamString + " is starting!");
        SOCKET_LIST[i].spymaster = false;
    }
    setupBoard("all",0);
    refreshUserChat();
    checkForGG();
}


 
var DEBUG = false;
 
var refreshScore = function(red,blue){
    for(var i in SOCKET_LIST){
        SOCKET_LIST[i].emit("refreshScore",{red : red, blue:blue, turn: TURN});
    }
};

var refreshUserChat = function(){
    for(var i in SOCKET_LIST){
        SOCKET_LIST[i].emit("clearUserChat");
        for(var j in SOCKET_LIST){
            var name = SOCKET_LIST[j].username;
            if(SOCKET_LIST[j].spymaster) name += "[S]";
            SOCKET_LIST[i].emit("addToUserChat",name);
        }
    }
};

var refreshBoardColors = function(socket){
    for(j=0;j<BOARD_ARRAY.length;j++){
        SOCKET_LIST[socket.id].emit("changeBoardColor",BOARD_ARRAY[j]);
    }
};

var setupBoard = function(who,socket){
    if(who == "all"){
        for(var i in SOCKET_LIST){
            for(j=0;j<BOARD_ARRAY.length;j++){
                SOCKET_LIST[i].emit("addWord",BOARD_ARRAY[j]);
                SOCKET_LIST[i].emit("changeRevealed",BOARD_ARRAY[j]);
            }
        }
    }
    else if(who == "me"){
        for(j=0;j<BOARD_ARRAY.length;j++){
            SOCKET_LIST[socket.id].emit("addWord",BOARD_ARRAY[j]);
            SOCKET_LIST[socket.id].emit("changeRevealed",BOARD_ARRAY[j]);
        }
    }
    refreshTeams();
};

var isUsernameTaken = function(data){
    var taken = false;
    for(var i in SOCKET_LIST){
        if(SOCKET_LIST[i].username == data.username) taken = true;
    }
    return taken;
}

var decreaseScore = function(board_id){
    if(BOARD_ARRAY[board_id].color == COLOR_BLUE) blue_score--;
    else if(BOARD_ARRAY[board_id].color == COLOR_RED) red_score--;
    refreshTeams();
}

var checkForGG = function(){
    if(red_score <= 0){
        RED_SESSION_WINS++;
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit("gg",true);
            SOCKET_LIST[i].emit("addToChat","GG! Team RED has won! RED: " + RED_SESSION_WINS + " - BLUE: " + BLUE_SESSION_WINS);
            refreshBoardColors(SOCKET_LIST[i]);
        }
        uploadScore(false);
    }else if(blue_score <= 0){
        BLUE_SESSION_WINS++;
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit("gg",true);
            SOCKET_LIST[i].emit("addToChat","GG! Team BLUE has won! RED: " + RED_SESSION_WINS + " - BLUE: " + BLUE_SESSION_WINS);
            refreshBoardColors(SOCKET_LIST[i]);
        }
        uploadScore(false);
    }else if(BOARD_ARRAY[ASSASSIN_SPACE_ID].revealed){
        if(TURN === "BLUE"){
            BLUE_SESSION_WINS++;
        }else{
            RED_SESSION_WINS++;
        }
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit("gg",true);
            SOCKET_LIST[i].emit("addToChat","GG! Team " + TURN + " has won! RED: " + RED_SESSION_WINS + " - BLUE: " + BLUE_SESSION_WINS); //TURN has already changed
            refreshBoardColors(SOCKET_LIST[i]);
        }
        uploadScore(true);
    }else{
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit("gg",false);
        }
    }
}

var uploadScore = function(blackSquareChosen){
    var query = "";
    for(var i in SOCKET_LIST){
        if(SOCKET_LIST[i].team === TURN.toLowerCase()){ //I Won
            query += "INSERT INTO codenamesLeaderboards(name,wins,losses,blackSquareChosen) values('" + SOCKET_LIST[i].username + "',1,0,0) ON DUPLICATE KEY UPDATE wins = wins+1;";
        }else if(SOCKET_LIST[i].team !== "none"){
            query += "INSERT INTO codenamesLeaderboards(name,wins,losses,blackSquareChosen) values('" + SOCKET_LIST[i].username + "',0,1,0) ON DUPLICATE KEY UPDATE losses = losses+1;";
            if(blackSquareChosen && !SOCKET_LIST[i].spymaster){
                query += "UPDATE codenamesLeaderboards SET blackSquareChosen = blackSquareChosen + 1 WHERE name = '" + SOCKET_LIST[i].username + "';";
            }
        }
    }
    
    
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host     : process.env.db_host,
        user     : process.env.db_user,
        password : process.env.db_pw,
        database : process.env.db_name,
        multipleStatements: true
    });

    connection.connect();

    connection.query(query, function(err) {
      if (!err)
        console.log('The solution is: ');
      else
        console.log('Error while performing Query.');
        console.log('My Query' + query);
        console.log(err);
    });

    connection.end(); 
};

var refreshTeams = function(){
    refreshScore(red_score,blue_score);
    for(var i in SOCKET_LIST){
        for(var j in SOCKET_LIST){
            var name = SOCKET_LIST[j].username;
            if(SOCKET_LIST[j].spymaster) name += "[S]";
            SOCKET_LIST[i].emit("addTeamUser",{team:SOCKET_LIST[j].team,name:name});
        }
    }
}

newGame();
 
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
	socket.username = "";
	socket.spymaster = false;
	socket.team = "none"; //red, blue or none
        SOCKET_LIST[socket.id] = socket;
   
	socket.on("clickBoard",function(data){
            if(!socket.spymaster && TURN.toLowerCase() === socket.team){
                if(!BOARD_ARRAY[data].revealed){
                    BOARD_ARRAY[data].revealed = true;
                    for(var i in SOCKET_LIST){
                        SOCKET_LIST[i].emit("changeBoardColor",BOARD_ARRAY[data]);
                    }
                    if(socket.team === "red"){
                        if(BOARD_ARRAY[data].color !== COLOR_RED){
                            TURN = "BLUE";
                            TIMER = 120;
                        }
                    }else if(socket.team === "blue"){
                        if(BOARD_ARRAY[data].color !== COLOR_BLUE){
                            TURN = "RED";
                            TIMER = 120;
                        }
                    }
                    decreaseScore(data);
                    checkForGG();
                }
            }else{
                socket.emit("addToChat","Insufficient Permission.");
            }
	});
	
	socket.on("spymaster",function(data){
            if(!socket.spymaster){
                refreshBoardColors(socket);
                for(var i in SOCKET_LIST){
                    SOCKET_LIST[i].emit("addToChat", socket.username + " has enabled Spymaster Mode!");
                }
                socket.spymaster = true;
                refreshUserChat();
                refreshTeams();
            }else{
                socket.emit("addToChat","You already enabled Spymaster Mode!");
            }
	});
   
	socket.on("newGame",function(){
            newGame();
            for(var i in SOCKET_LIST){
                SOCKET_LIST[i].emit("resetSpymaster");
            }
	});
        
        socket.on("passTurn",function(){
            if((!socket.spymaster && TURN.toLowerCase() === socket.team) || TIMER <= 0){
               if(TURN === "RED"){
                   TURN = "BLUE";
                   TIMER = 120;
               }else{
                   TURN = "RED";
                   TIMER = 120;
               }
               refreshTeams();
            }
        });

        socket.on('signIn',function(data){
            if(isUsernameTaken(data)){
                socket.emit('signInResponse',{success:false});     
            } else {
                socket.username = data.username;
                socket.emit('signInResponse',{success:true});
                //SOCKET_LIST[socket.id].emit("addToChat","Hello "+ socket.username+"!");

                refreshUserChat();
                setupBoard("me",socket);
                refreshTeams();
                for(var i in SOCKET_LIST){
                        SOCKET_LIST[i].emit('addToChat',socket.username + " has joined!");
                }
                socket.emit("addToChat","Team "+ startingTeamString+" is starting!");	
                checkForGG();
            }
           
        });
   
	socket.on("changeTeam",function(data){
            socket.team = data;
            refreshTeams();
	});
   
        socket.on('disconnect',function(){
            delete SOCKET_LIST[socket.id];
            refreshUserChat();
            refreshTeams();
            for(var i in SOCKET_LIST){
                    SOCKET_LIST[i].emit("addToChat",socket.username+" has left!");
            }
        });
        
        socket.on('sendMsgToServer',function(data){
            console.log(data);
            for(var i in SOCKET_LIST){
                SOCKET_LIST[i].emit('addToChat',socket.username + ': ' + data);
            }
        });
   
        socket.on('evalServer',function(data){
            if(data = "reset"){
                RED_SESSION_WINS = 0;
                BLUE_SESSION_WINS = 0;
                for(var i in SOCKET_LIST){
                    SOCKET_LIST[i].emit("addToChat","RED: " + RED_SESSION_WINS + " - BLUE: " + BLUE_SESSION_WINS);
                }
            }else{
                if(!DEBUG)
                return;
                var res = eval(data);
                socket.emit('evalAnswer',res);  
            }
               
        });
});

setInterval(function(){
    if(TIMER > 0){
        TIMER--;
    }else{
        refreshTeams();
    }
},1000);

setInterval(function(){
    for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('refreshTimer',TIMER);
    }
},10);
 
 
 