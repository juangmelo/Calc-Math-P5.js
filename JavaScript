//Calc Math

//link ytb

//https://youtu.be/SZGeAAEUFLs

//variáveis dos botões do menu
var hb; //altura do botão
var lb; //largura do botão
var yb1; //posição do botão Iniciar
var yb2; //posição do botão Instruções
var yb3; //posição do botão Créditos
var xb; //posição x do botão 
var pb; // para o arredondamento das pontas do botão; entra como um quinto parâmetro

//variáveis do botão voltar
var xbvoltar; 
var ybvoltar;
var hbvoltar;
var lbvoltar;

//variáveis das cartas e matriz de cartas
var cartavirada; 
var imgfundocarta; 
var imgcartas = [];
var lc = 90 //largura da carta
var hc = 90 //altura da carta
var xprimeiracarta = 25;
var yprimeiracarta = 20;
var valorescartas = [];

var matrizimgcartas = [];
var matrizcartasviradas = [];
var matrizmatch = [];
var matrizvalores = [];
var matriztamanho = 4
var linhacolunanaterior = [];


//indices
var indicesoriginais = [];
var indicesembaralhados = [];


var clicks = 0;
var conttempo = 0;
const framesporsegundo = 30;
var segundos = 0;



var tela = 0; //indica qual das telas do jogo será mostrada
var fontLilita;
var h = 400;  //height = altura da tela do jogo
var w = 400; //widht = largura da tela do jogo


//variáveis das imagens das telas
var imgmenu;
var imgfundo;
var imgcreditos;
var imginstrucoes;
var imgJuan;

//para carregar arquivos
function preload(){
  fontLilita = loadFont("fonts/LilitaOne-Regular.ttf")
  imgmenu = loadImage("images/menu.jpg")
  imgfundo = loadImage("images/menu.jpg")
  imgcreditos = loadImage("images/menu.jpg")
  imginstrucoes = loadImage("images/instrucoes.jpg")
  imgJuan = loadImage("images/Juan.jpg")
  imgfundocarta = loadImage("images/fundo_carta.png")

  //carregando as cartas
  for(i=1; i<=8; i++){
      tempImg = loadImage("images/cards/"+i+".jpg")
      imgcartas.push(tempImg);
      valorescartas.push(i); 
      tempImg = loadImage("images/cards/"+i+".1.jpg")
      imgcartas.push(tempImg);
      valorescartas.push(i);
  }
}


//ajustes na tela inicial do jogo
function setup() {
  createCanvas(400, 400);
  cartavirada = true; 
  xb = 100;
  yb1 = 160;
  yb2 = 230;
  yb3 = 300;
  ybvoltar = 350;
  xbvoltar = 300;
  hbvoltar = 40;
  lbvoltar = 70;
  lb= 200;
  hb = 60;
  pb = 12;

  frameRate(framesporsegundo);

  console.log(matrizmatch);

  for(i=0; i<16; i++) {
    indicesoriginais[i] = i; 
  }
  indicesembaralhados = embaralhar(indicesoriginais)
  console.log(indicesembaralhados); 

  cont=0;
  for (l=0; l<4; l++){
    tempImgLinha = []; 
    tempVCartaVirada = [];
    tempVValor = []; 
    tempVMath = []; 
    for (c=0; c<4; c++){
        tempImgLinha[c] = imgcartas[indicesembaralhados[cont] ]; 
        tempVValor[c] = valorescartas[indicesembaralhados[cont] ]; 
        tempVCartaVirada[c] = false; 
        tempVMath[c] = false; 
         cont++;  
    }
    matrizcartasviradas[l] = tempVCartaVirada; 
    matrizimgcartas[l] = tempImgLinha;
    matrizvalores[l] = tempVValor; 
    matrizmatch[l] = tempVMath;
   }
}


//para converter a posicao do mouse para posicao na matriz
function mouseparamatriz(mx,my){
    mx = mx - xprimeiracarta;
    my = my - yprimeiracarta;
    let posicaocoluna = parseInt(mx/lc)
    let posicaolinha = parseInt(my/hc)
    console.log(posicaolinha+" "+posicaocoluna);
    posLC = [];
    posLC[0] = posicaolinha;
    posLC[1] = posicaocoluna;
    return posLC;
}

function desviracartas(){
    // marca todas as cartas como desviradas 
    for ( l = 0; l<matriztamanho; l++ ){
        for( c = 0; c<matriztamanho; c++ ){
            matrizcartasviradas[l][c] = false; 
        }
    }
}



function mostraCartas(){ 
    let yposicarta = yprimeiracarta;
    for (l=0; l<4; l++){
        let xposicarta = xprimeiracarta
        for(c=0; c<4; c++){
            if(matrizcartasviradas[l][c] || matrizmatch[l][c]){
                image(matrizimgcartas[l][c],xposicarta,yposicarta,80,80);
            } 
            else{
                image(imgfundocarta,xposicarta,yposicarta,80,80)
            }
            xposicarta = xposicarta + lc
        }
        yposicarta = yposicarta + hc
    }
}

function telaMenu(){
    background(imgmenu);
    textSize(28);
    textFont(fontLilita);
      

      //animação dos botões
      fill(70,130,255);
      if (mouseY > yb1 && mouseY < yb1 + hb && mouseX > xb && mouseX < xb +lb){
          fill(10,100,255,100);
      }
      rect(xb,yb1,lb,hb,pb);
      
      fill(0);
      text("iniciar",xb+60,yb1+40);
      fill(70,130,255);


      if (mouseY > yb2 && mouseY < yb2 + hb && mouseX > xb && mouseX < xb + lb){
          fill(10,100,255,100);
      }
      rect(xb,yb2,lb,hb,pb);
      
      fill(0);
      text("instruções",xb+38,yb2+40);
      fill(70,130,255); 


      if (mouseY > yb3 && mouseY < yb3 + hb && mouseX > xb && mouseX < xb + lb){
      fill(10,100,255,100);
      }
      rect(xb,yb3,lb,hb,pb);

      fill (0);
      text("créditos",xb+50,yb3+40);
      fill(70,130,255);
}


function telaJogo(){
    background(imgfundo);  

    textSize(20);
    textFont(fontLilita); 
    text("tempo: "+segundos, 300,50); 
    mostraCartas();
         if ( clicks == 1 || clicks == 2 ){
             conttempo++; 
             segundos = parseInt(  conttempo / framesporsegundo);
            if ( segundos > 5 ){
                 conttempo = 0;
                 clicks = 0; 
                 desviracartas(); 
                 segundos = 0; 
            }
        }
}


function telaInstrucoes(){
    background(imginstrucoes);
    fill(0);
    textSize(28);

}   


function telaCreditos(){
    background(imgcreditos);
    image(imgJuan,15, 130, 135,153); //os números indicam a posicao da imagem e as dimensoes dela
    textFont(fontLilita)

    fill(213,0,0);
    textSize(32);
    text("Juan Gabriel", 160, 155);

    fill(250, 0, 0);
    textSize(20);
    text("Programador", 160, 180);

    fill(250, 0, 0);
    textSize(20);
    text("Estudante do Bacharelado em Ciência e Tecnologia na Universidade Federal do Rio Grande do Norte", 160, 205, 240);
        

}


function botaoVoltar(){
    //regulando o que acontece com o botão voltar
    if (mouseY > ybvoltar && mouseY < ybvoltar + hbvoltar && mouseX > xbvoltar && mouseX < xbvoltar +lbvoltar){
        fill(10,100,255,100) //cor do botão quando mouse passa em cima
        if(mouseIsPressed){
            tela = 0;
        }
    }
    else{
        fill(70,130,255) //cor do botão sem mouse em cima
    }
    rect(xbvoltar+20,ybvoltar+15,lbvoltar-10,hbvoltar-10,pb);
    textSize(15);
    fill(0); //cor do nome 'voltar'
    text("voltar", xbvoltar+30, ybvoltar+35);  
}


//estrutura do menu (botões e etc)
function draw() {
    if (tela == 0){
      telaMenu();
     }

    //tela de jogar
    if (tela == 1){
      telaJogo();
      botaoVoltar();
    }

    //tela de instruções
    if (tela == 2){
        telaInstrucoes();
        botaoVoltar();
        
    }


    //tela de créditos
    if (tela === 3){
        telaCreditos();
        botaoVoltar();   
    }
}

//tudo que for relativo ao clique ficará concentrado no mouseClicked
function mouseClicked(){
    if (tela == 0){ 
        if (mouseY > yb1 && mouseY < yb1 + hb && mouseX > xb && mouseX < xb +lb){
         console.log("Botão Iniciar");
         tela = 1;
        }
        else {
            if (mouseY > yb2 && mouseY < yb2 + hb && mouseX > xb && mouseX < xb + lb){
            console.log("Botão Instruções");
            tela =  2;
            }
            else {
                if (mouseY > yb3 && mouseY < yb3 + hb && mouseX > xb && mouseX < xb + lb){
                console.log("Botão Créditos");
                tela = 3;
                }
            }
        }
    }  else {
           if (tela == 1){
                linhacoluna = mouseparamatriz(mouseX,mouseY);
                console.log(linhacoluna);
                if (matrizcartasviradas[linhacoluna[0]][linhacoluna[1]] === false && matrizmatch[linhacoluna[0]][linhacoluna[1]] === false) {
                 matrizcartasviradas[linhacoluna[0]][linhacoluna[1]] = true; 
                 clicks = clicks + 1; 
                }
        
                if(clicks == 2 ){
                    if (matrizvalores[linhacoluna[0]][linhacoluna[1]] == matrizvalores[linhacolunanaterior[0]][linhacolunanaterior[1]]){
                    console.log(matrizmatch); 
                    matrizmatch[linhacoluna[0]][linhacoluna[1]] = true; 
                    matrizmatch[linhacolunanaterior[0]][linhacolunanaterior[1]] = true; 
                    conttempo = 0;
                    }
                }
                if ( clicks > 2 ){ 
                    desviracartas(); 
                    // exceto a última carta clicada 
                    matrizcartasviradas[linhacoluna[0]][linhacoluna[1]] = true;
                    clicks = 1;
                    conttempo = 0; 
                }
      
                console.log("Cliques: "+clicks);
                   if (clicks == 1 ){
                   linhacolunanaterior = linhacoluna;
            }
        }
    }
}

function keyPressed(){
    if(tela === 1 || tela === 2 || tela === 3){
        if( keyCode === ESCAPE ){
            tela = 0;
        }
    }
}

function embaralhar(vetorA) {

    vetorB = [] 
    qtdelementos = vetorA.length; 
    for (j=0; j<qtdelementos; j++) {
      i = parseInt( Math.random()* vetorA.length )
      vx = vetorA.splice(i,1) 
      vetorB.push(vx[0]) 
    } 
    return vetorB; 
  }
