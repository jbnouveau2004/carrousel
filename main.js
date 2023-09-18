let pausex_suite; // poistion en x suivante de la souris
let var_x = [];
let pause = 0; // déclare si il y a pause de translation
let pausex; // sert aux calculs de x pour les déplacements
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const container = canvas.getBoundingClientRect();
let deplacement = 0; // évite les clicks intempestives lors du déplacement
let images = canvas.getElementsByTagName('img');
let nb_images = images.length - 1 ; // nombre d'image - 1

for(i=0;i<=nb_images;i++){ // on déclare les positions d'origine
        var_x[i] = i * 160;
}

window.onload = function() { // on affiche tout
        for(i=0;i<=nb_images;i++){
                ctx.drawImage(images[i], var_x[i], 0, 150, canvas.height);
        }
};

canvas.addEventListener("mousedown", function(event) { // lors du click sans relâché de la souris
        if (event.button == "0"){ // seulement si c'est le click gauche de la souris
                pause=1; // on met en pause la translation automatique
                pausex = event.clientX; // premier enregistrement des x
        }
});


document.addEventListener("mouseup", function(event) { // lors du relâchement du click de la souris
        pause=0; // on remet en route la translation automatique
});

setInterval("if(pause==0){coulissement_auto();}", 20); // coulissement automatique si pause n'est pas activé
setInterval("if(pause==1){coulissement_souris(event);}", 20); // fonction du calcul du coulissement seulement si pause est activé

function coulissement_auto(){
        ctx.clearRect(0, 0, canvas.width, canvas.height) // on efface le canvas
        for(i=0;i<=nb_images;i++){
                var_x[i]-=1; // on décrémente tout
        }   
        for(i=0;i<=nb_images;i++){
                ctx.drawImage(images[i], var_x[i], 0, 150, canvas.height); // on réintroduit les images après les décrémentations
        }
        if(var_x[0]==-150){var_x[0]=(var_x[nb_images]+160)}  // on teste si l'image le plus à gauche sort du canvas
        for(i=1;i<=nb_images;i++){
                if(var_x[i]==-150){var_x[i]=(var_x[i-1]+160)}
        } 
}

function coulissement_souris(event){ // fonction de coulissmeent de la souris
        canvas.addEventListener("mousemove", function(event) { // si la souris à bougé dans le canvas seulement
                if(pause==1){ // si la translation est toujours en pause
                        pausex_suite = event.clientX; // on enregistre la position suivante de la souris
                        if(pausex_suite!=pausex){ // si la position suivante est différente de la position initiale
                                deplacement=1; // on active le déplacement pour éviter le click de l'image, car l'utilisateur cherche le déplacement et non le lien de l'image
                                coulissement_auto_souris(pausex_suite - pausex); // on envoit à la fonction la différence en x
                                pausex = pausex_suite; // on remet la différence à 0
                        }
                }
        });
}

function coulissement_auto_souris(x){
        ctx.clearRect(0, 0, canvas.width, canvas.height) // on efface le canvas
        for(i=0;i<=nb_images;i++){
                var_x[i]+=x; // on ajoute la différence en x de la souris lors du click sans relâché
        }
        for(i=0;i<=nb_images;i++){
                ctx.drawImage(images[i], var_x[i], 0, 150, canvas.height); // on réintroduit les images
        }
        if(var_x[0]<=-150){var_x[0]=(var_x[nb_images]+160)} // test si les images sortent du canvas à gauche
        for(i=1;i<=nb_images;i++){
                if(var_x[i]<=-150){var_x[i]=(var_x[i-1]+160)}
        }
        if(var_x[nb_images-0]>(160*nb_images)){var_x[nb_images-0]=(var_x[0]-160)} // test si les images sortent de la limite maximum à droite
        for(i=1;i<=nb_images;i++){
                if(var_x[nb_images-i]>(160*nb_images)){var_x[nb_images-i]=(var_x[(nb_images-(i-1))]-160)}
        }
}

canvas.addEventListener("click", function(event) { // click avec relâché de la souris (dans le canvas) pour entrer dans le lien de l'image
        clickx = (event.clientX - container.left); // on regarde la position de la souris en x
        if(deplacement==0){ // si ce n'est pas considéré comme un déplacemement


        for(i=0;i<nb_images;i++){
                if(clickx>=var_x[i]-5 && clickx<=var_x[i+1]-5){alert("image" + (i+1));} // offset
        }
        if(clickx>=var_x[nb_images]-5 && clickx<=var_x[0]-5){alert("image" + (nb_images+1));}


        
//        for(i3=0;i3<nb_images3;i3++){
//                if(clickx3>=var_x3[i3]-5 && clickx3<=var_x3[i3+1]-5){
//                        var valeur3 = images3[i3].getAttribute("id"); // pointage sur l'image et récupération de la valeur de l'id
//                }
//        }
//        if(clickx3>=var_x3[nb_images3]-5 && clickx3<=var_x3[0]-5){
//                var valeur3 = images3[nb_images3].getAttribute("id"); // pointage sur l'image et récupération de la valeur de l'id
//        }
//        document.location.href="./allocine.php?p=a&i=" + valeur3; // redirection de la page avec envoi de l'id en méthode GET



        
        }else{
                deplacement=0; // on désactive le déplacement si il a eu lieu
        }
});









