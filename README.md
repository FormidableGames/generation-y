# Gen¥

[Gen¥](https://formidablegames.github.io/generation-y)

## Índice

1. **Introducción**
    - Concepto del Juego
    - Características principales
    - Género
    - Público objetivo
    - Estilo visual
2. **Mecánicas**
    - Jugabilidad
    - Lista de enemigos
    - Flujo de juego
3. **Interfaz**
    - Diagrama de flujo
    - Menú principal
    - Créditos
    - Pantalla de selección de nivel
    - Nivel
    - Fin del juego
4. **Narrativa**
    - Premisa
    - Personajes
5. **Arte 2D**
    - Sprites
    - Interfaces
6. **Audio**
    - Pistas
    - Efectos de sonido
7. **Planes de futuro**
8. **Concept Art**
9. **Enlaces**
---

## Introducción

### Concepto del Juego
En **Gen¥** controlas a **¥**, una joven perteneciente a un grupo de *millennials* decididos a acabar con la tiranía de dioses y demonios que utilizan el mundo como campo de batalla.  

A lo largo del juego, avanzarás por el nivel seleccionado mientras te enfrentas a tus enemigos hasta llegar al final. Dentro del combate deberás usar tu *katana* para atacar en el momento justo y así poder derrotarlos.

### Características principales
- Mecánica de combate dinámico sencilla pero escalable.
- Un único botón de *input* permite jugar tanto en dispositivos móviles como en PC de forma cómoda.
- Tres niveles con distintas dificultades y ambientaciones para aportar variedad y conseguir una sensación de progreso.

### Género
Videojuego de combate dinámico y simple que se basa en el contraataque, poniendo a prueba tu capacidad de reacción.

### Público objetivo
**Gen¥** está enfocado tanto a un público casual como a jugadores más dedicados y competitivos que busquen jugar partidas rápidas tanto en PC como en dispositivos móviles.

### Estilo visual
- Paleta reducida con colores vivos que atraigan la atención del jugador a tiempo para que pueda reaccionar a los ataques.
- Estética ligeramente *cyberpunk* y llamativa, mezclada con elementos de la mitología y cultura asiática.
- Interfaz inspirada en las redes sociales.

## Mecánicas

### Jugabilidad
La mecánica principal de Gen¥ se basa en el combate: 
![Combate1](https://github.com/FormidableGames/generation-y/blob/master/concept/combate1.png "Combate")
Al hacer tap en la pantalla (en dispositivos móviles) o al pulsar una tecla/hacer *click* (en PC) saltarás hacia el enemigo para intentar atacarlo. Sin embargo, si el enemigo está protegido el ataque no será efectivo y quedarás aturdido:
![Combate2](https://github.com/FormidableGames/generation-y/blob/master/concept/combate2.png "Bloqueo")
Para hacer un ataque efectivo tendrás que esperar a que el enemigo cargue su ataque y anticiparte:
![Combate3](https://github.com/FormidableGames/generation-y/blob/master/concept/combate3.png "Anticipación")
Si lo consigues le dañarás (le quitarás una vida) y pasarás al otro lado de la pantalla:
![Combate4](https://github.com/FormidableGames/generation-y/blob/master/concept/combate4.png "Dash")

Fuera de combate utilizarás este mismo ataque para desplazarte a lo largo del nivel y llegar hasta el siguiente enemigo.
Tendrás 3 vidas en todos los niveles, cada enemigo quitará más o menos vidas.

Dentro de la dificultad de cada nivel (Infierno, Purgatorio, Paradiso) habrá tres dificultades que dependiendo cómo jugueges hará que se ajusten a ti los niveles. Cada nivel tendrá modo fácil, normal y difícil; cuando se empieza a jugar las tres primeras partidas serán en fácil, a partir de esto si tu ratio victorias-derrotas es de menos sel 70% seguirá en fácil, si es desde el 70% al 90% se pondrá en dificultad media y si es superior a 90% difícil. Estos modos tienen varios mapas de niveles que saldrán aleatorios.

### Lista de enemigos  
1. **Infierno (fácil)**   

+ **Guardia enigma**: Vidas: /3 corazones/  Daño: /medio corazón/ 
    + Fase **Defensa**: 1-3 segundos (variará aleatoriamente el tiempo que tengas que esperar) --> si le atacas quedarás aturdida.  
    + Fase **Preparación de Ataque**: 0.7 segundos --> si le atacas en este momento le quitarás una vida, entonces el enemigo se dará la vuelta inmediatamente y cambiará a modo de defensa. Si no, pasará a modo de ataque.  
    + Fase **Ataque**: 0.5 segundos --> al acabar pasará a modo defensa.  
  ![Guardia Enigma](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_demon.png "Demonio")
  
+ **Esquiva**: Vidas: /2 corazones/ Daño: /1 corazón/  
    + Fase **Defensa**: 1-2 segundos --> si le atacas quedarás aturdida.
    + Fase **Preparación de Ataque**: 0.5-0.6 segundos --> si le atacas te esquivará y pasará a fase de defensa hacia el lado al que has ido. Si no, pasará a fase de ataque.  
    + Fase **Ataque**: 0.5 segundos --> después de hacerte daño pasará a fase de celebración.  
    + Fase **Celebración**: 0.6 segundos --> al haberte hecho daño lo celebrará, por lo que estará distraido y podrás atacarle (harás solo media vida de daño, a diferencia de la fase de mareo). Una vez golpeado pasará a la fase de defensa hacia el lado en el que estés.
    + Fase **Mareo**: 1-1.5 segundos --> si le atacas 3 veces seguidas en la fase de preparación el enemigo se "mareará" al haber esquivado tantas veces. Entonces podrás dañarle de manera normal (un corazón). Una vez golpeado pasará a la fase de defensa hacia el lado en el que estés.  
    ![Esquiva](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_tengu.png "Tengu")
      
+ **El ilusionista (fase Infierno)**: Vidas (modo *NO ILUSIÓN*): /2 corazones/ Daño: /medio corazón/  
    + Fase **Ilusión**: hasta que le venzas --> se hará pasar por un *Guardia Enigma* pero de solo un corazón, en todo lo demás funcionará igual que este, cuando le derrotes pasará a modo *NO ILUSIÓN*.  
    + Fase **Ataque a Distancia**: 3-5 ataques --> en esta fase no podrás atacar al enemigo (lanzará ataques hacia el cielo primero y desaparecerá), los ataques a distancia caerán del cielo lentamente, deberás esquivarlos para que no te dañen, es decir, caerán uno detrás de otro en un lado u otro de manera aleatoria (50-50 de posibildades en cada lado).   
    + Fase **Aparición**: 5 ataques --> en esta fase deberás esperar a que aparezca el enemigo mientras esquivas sus ataques de *halo*. Cada vez que vaya a hacer un ataque el lado en el que vaya a atacar (se escogerá aleatoriamente igual que en la anterior fase) se "encenderá" en forma de *halo* para indicar que va a atacar ahí (durante 0.7-1 segundos), entonces deberás cambiar de lado para evitar ser dañado (el ataque durará 0.3 segundos). Cada vez que acaba de hacer un ataque el enemigo aparecerá y podrás atacarle en ese momento (0.5 segundos). Si le golpeas desaparecerá immediatamente y pasará a hacer otro ataque. Una vez acabada esta fase pasará de nuevo a la fase de Ataque a Distancia.  
      ![Ilusionista Infierno](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_hellFox.png "Kitsune-yako")
      
2. **Purgatorio (normal)**  
  
+ **Punto débil**: Vidas: /2 corazones/ Daño: /1 corazón/  
    + Fase **Defensa**: 2-4 segundos --> si le atacas quedarás aturdida.  
    + Fase **Preparación de Ataque**: 0.4 segundos --> si le atacas no le causarás daño (por culpa de su escudo/barrera especial) pero pasarás al otro lado, entonces entrarás en la fase Zona Débil ya que el enemigo no se dará la vuelta al instante; si no, pasará a la fase de Ataque.  
    + Fase **Zona Débil**: 0.4 segundos --> si le atacas recibirá daño, si no, se dará la vuelta y se pondrá en modo Defensa.  
    + Fase **Ataque**: 0.5 segundos --> después de hacerte daño pasará al modo Defensa.    
    ![Punto Débil](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_kappa.png "Kappa")
    
+ **Contraataque**: Vidas: /3 corazones/ Daño (en fase Ataque): /medio corazón/  
    + Fase **En Guardia**: 2-2.8 segundos --> si le golpeas pasará a la fase de Contraataque.  
    + Fase **Preparación de Ataque**: 0.35 segundos --> si le atacas en este momento le quitarás una vida, entonces el enemigo se dará la vuelta inmediatamente y cambiará a modo de defensa. Si no, pasará a modo de ataque.  
    + Fase **Ataque**: 0.3 segundos --> después de hacerte daño pasará al modo En Guardia.  
    + Fase **Contraataque**: 0.3 segundos --> es lo mismo que en ataque pero te quitará 1 corazón en vez de medio.  
      ![Contraataque](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_tenguPrg.png "Tengu Invernal")
      
+ **Invisible**: Vidas: /1 corazón/ Daño: /medio corazón/  
    + Fase **Inicio**: no se ve ningún enemigo, ¥ detecta algo extraño (?).
    + Fase **Escondido**: hasta que le golpees cuando es visible --> cuando ¥ detecte algún movimiento te avisará (!) entonces deberás atacar para contrarrestar el ataque del enemigo. Si contrarrestas el ataque del enemigo pasarás al otro lado (sin hacerle daño), si no recibirás daño. El aviso será 0.6 segundos antes del ataque del enemigo. Si consigues contrarrestar el ataque 3 veces el enemigo se mostrará ante ti, estará inmóvil en el centro hasta que le golpees (no le hará daño ya que estará transparente), entonces pasará a modo Furia.
    + Fase **Furia**: hasta que le vuelvas "sólido" --> el enemigo se ha enfurecido (seguirá siendo invisible a no ser que se diga lo contrario), ahora cada vez que ataque serán dos golpes seguidos. Cada vez que te vaya a atacar ¥ te alertará igual que antes pero con solo 0.5 segundos de diferencia. De vez en cuando entre ataques el enemigo se mostrará en el centro (durante 0.5 segundos) y desaparecerá. Si le golpeas 3 veces seguidas cuando se muestra este se volverá completamente opaco (cada vez que golpees se volverá menos transparente), es decir "sólido". Si no golpeas cada vez que se muestra el ciclo de veces que tengas que golpearle se reiniciará (volverá a estar completamente transparente). Al volverle "sólido" pasará al modo Fin.
    + Fase **Fin**: en esta fase será visible. Realizará ataques igual que en la fase anterior (dos cada vez) pero si le contrarrestas, al estar "sólido", le quitarás vida (y al tener solo una le eliminarás).  
    
    **NOTAS**: el tiempo entre ataque y ataque es de 2-2.5 segundos, el tiempo entre ataque y aparición en el centro es de 0.3 segundos. En la fase Furia seguirá un patrón de: 2 ataques (cada uno de dos golpes) 1 aparición 2 ataques 1 aparición 1 ataque 1 aparición (se repite en bucle)
    ![Invisible](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_katana.png "Honjo Masamune")
  
3. **Paraiso (difícil)**  
  
+ **Ronda de ataques**: Vidas: /5 corazones/ Daño: /1-3 corazones/  
    + Fase **Defensa**: 1-1.5 segundos --> si le atacas quedarás aturdida.  
    + Fase **Preparación de Ataque**: 0.3 segundos --> si le atacas le quitarás un corazón y se pondrá otra vez en modo Preparación de Ataque, si no, pasará a modo Ataque.
    + Fase **Ataque**: 0.3 segundos por cada ataque (cada ataque quita 1 corazón) --> se calcurará de manera aleatoria el número de veces que te ataque, las probabilidades serán: 50%-1 ataque, 40%-2 ataques, 10%-3 ataques. Cuando acabe de atacarte se pondrá en modo Defensa.  
    ![Ronda de ataques](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_tiger.png "Byakko")
    
+ **El ilusionista (fase Paraiso)**: Vidas (modo *NO ILUSIÓN*): /3 corazones/ Daño: /1 corazón(excepto Ataque a Distancia)/  
    + Fase **Ilusión**: hasta que le venzas --> se hará pasar por un *Ronda de ataques* pero de solo un corazón, si te hace daño solo recibirás un ataque, cuando le derrotes pasará a modo *NO ILUSIÓN*.  
    + Fase **Ataque a Distancia**: 7-10 ataques --> en esta fase no podrás atacar al enemigo (lanzará ataques hacia el cielo primero y desaparecerá), los ataques a distancia caerán del cielo, deberás esquivarlos para que no te dañen, es decir, caerán uno detrás de otro en un lado u otro de manera aleatoria (50-50 de posibildades en cada lado). Estos ataques te quitarán medio corazón.   
    + Fase **Aparición**: 5 ataques --> en esta fase deberás esperar a que aparezca el enemigo por uno de los lados (de manera aleatoria (50-50 de posibilidades en cada lado), este mostrará parte de su cuerpo primero (su cabeza) para avisarte de que va a salir por ese lado (0.2 segundos), entonces cargará contra ti. Si estás de espaldas a él cuando carga recibirás daño, si estás de frente sin atacar también, pero si le atacas mientras carga contra ti (es decir le contraatacas) él será quien reciba daño. Si le golpeas desaparecerá immediatamente y pasará a hacer otro ataque. Una vez acabada esta fase pasará de nuevo a la fase de Ataque a Distancia.  
    ![Ilusionista paraiso](https://github.com/FormidableGames/generation-y/blob/master/assets/sprites/spr_heavenFox.png "Kitsune-zenko")
      
+ **Dragón**: Vidas: /4 corazones/ Daño: /medio corazón/
    + Fase **Presentación**: el enemigo se percatará de tu presencia (no podrás golpearle) y volará por encima de ti (yendo hacia la izquierda dutrante 3 segundos). Pasará al modo Vuelo.
   + Fase **Vuelo**: hasta que le elimines --> el enemigo irá pasando por el cielo todo el rato (estará en todo momento encima de ¥ y tardará 1.5 segundos en recorrer la pantalla), irá ejecutando dos clases de ataques diferentes y mostrará el orbe según una serie.  
   
   **ATAQUE NORMAL**: con su pata (con garras) levantada esperará a que esté justo encima de ti para atacarte (0.3 segundos en bajar), tendrás que esquivarlo o te hará daño. 
     
   **ATAQUE LARGO**: recorrerá toda la pantalla con sus garras extendidas para hacerte un corte, deberás atacar en la dirección en la que venga para que no te haga daño (o sea deberás atacar hacia la derecha), es decir, si estás de espaldas (o quieto) cuando te toque recibirás daño, tardará 1 segundo en recorrer toda la pantalla. Para avisar al jugador de que esto va a ocurrir el enemigo aumentará su velocidad a 1 segundo 0.3 segundos antes de que aparezca su pata. nada más acabar el ataque la velocidad volverá a 1.5.
     
   **ORBE**: de vez en cuando aparecerá una de sus patas sosteniendo un orbe, este bajará la pata una vez esté su pata en el centro (tardará 0.2 segundos en bajarla), si estás en la izquierda cuando vaya por el centro no bajará la pata. Deberás atacar al orbe para quitarle una vida.
     
   **NADA**: El enemigo no muestra ninguna de sus patas durante 1.5 segundos (lo que tarda en recorrer la pantalla).
   
   **NOTAS**: la serie que seguirá en bucle será (teniendo en cuenta que < = At. normal, / = At. largo, 0 = Orbe y N = Nada): <<N<0N/<N0/N<<0NN/NN<<0N
   
### Flujo de juego
Desde el menú principal puedes acceder a la pantalla de selección de nivel. Aquí podrás empezar una partida en el nivel que elijas. Avanzarás por el escenario hasta encontrar a un enemigo al que enfrentarte. Durante el combate no podrás continuar hasta derrotarlo. Al terminar el combate seguirás avanzando por el nivel hasta que encuentres a otro enemigo. 
Cuando logres la victoria, seas derrotado o abandones, saldrá la pantalla de fin del juego desde la que podrás volver a rejugar el nivel, volver al selector de niveles o volver al menú principal.

## Interfaz

### Diagrama de flujo
![Diagrama](https://github.com/FormidableGames/generation-y/blob/master/concept/diagrama-de-flujo.png "Diagrama de flujo")

### Menú principal
![Menú](https://github.com/FormidableGames/generation-y/blob/master/concept/interfaz1.png "Menu principal")
1. *Navbar* con links (hacia la web del grupo y otros más secundarios).
2. *Header* con un background y los botones para empezar a jugar, créditos, etc para que navegar sea mas fácil.
3. Perfil de ¥ en Chirper.
4. *Timeline* donde el contenido de la pagina (screenshots y lore) está repartido en "chirps".
5. *Sidebar* con el perfil del equipo.

### Créditos
![Créditos](https://github.com/FormidableGames/generation-y/blob/master/concept/interfaz5-creditos.png "Créditos")
1. *Navbar*.
2. *Header* con botón para volver atrás.
3. Perfil de ¥ en Chirper.
4. Los perfiles en Chirper de nuestro equipo.

### Pantalla de selección de nivel
![Niveles](https://github.com/FormidableGames/generation-y/blob/master/concept/interfaz2.png "Selección de nivel")
1. *Navbar*.
2. *Header* donde ponga "selección de nivel" con botón para volver al menú principal.
3. Nivel 1.
4. Nivel 2.
5. Nivel 3.

Todos los niveles tendrán un *background*, una pequeña descripción y un botón para jugar.

### Nivel
![Nivel](https://github.com/FormidableGames/generation-y/blob/master/concept/interfaz3-nivel.png "Nivel")
1. Vida. 
2. Botón de salir que lleva a la pantalla de fin de juego. 
3. Zona de juego.

### Fin del juego
![Final](https://github.com/FormidableGames/generation-y/blob/master/concept/interfaz4-fin-del-juego.png "Final")
1. *Navbar*.
2. Espacio en formato de "chirp" donde se muestran las estadísticas del juego y el jugador puede escribir un texto. Esto será lo que se muestre en el ranking según su puntuación. 
3. Imagen de la protagonista.
4. Botones para volver al menú principal, rejugar el nivel y volver al selector de nivel.

## Narrativa

### Premisa
El juego se desarrolla en un universo alternativo en el que la guerra entre dioses y demonios se libra en nuestro mundo, suponiendo constantes agravios para los humanos, que solo quieren poder vivir tranquilos. Un grupo de jóvenes *millennials*, hartos de esta situación, deciden formar un equipo para revelarse contra ellos y matarlos a todos.

### Personajes
- **Protagonista, de mote ¥:** es una chica asiática que porta una *katana* con la que se enfrenta a sus enemigos. Le obsesiona el glamour y compartir su vida en Chirper, la red social del momento, donde se hace llamar @yenyen. Debido a esto último, es una de las caras más visibles de la revolución contra los dioses y demonios.
- **Enemigos:** entes mitológicos que se entrometen a diario en la vida de los humanos.

## Arte 2D

### Sprites
Siguiendo la estética visual establecida:
- Sprites en 2d de la **protagonista**:
    - Idle
    - Ataque
    - Aturdida
    - Herida
    - Alerta (!)*
    - Extrañada (?)*
    
    *es solo meter la exclamación y el interrogante
- Sprites en 2d de los enemigos:  
    - **Guardia enigma** (Guerrero demonio):
        - Idle
        - En guardia
        - Preparación ataque
        - Ataque
        - Herido
    - **Esquiva** (Un tengu(?)):
        - Idle
        - En guardia
        - Preparación ataque
        - Esquiva
        - Ataque
        - Mareado
        - Celebración
        - Herido
    - **El ilusionista (modo infierno)** (Kitsune-yako):
        - Idle
        - En la lejanía
        - Llamas (como bolitas de fuego)
        - Halo del suelo (para indicar en la fase de aparición donde va a hacer el ataque)
        - Llamas del suelo
        - Aparición (con nubes grises)/Desaparición
        - Herido  
    - **Punto débil** (un ser con un escudo especial o una barrera mágica):
        - Idle
        - En guardia (se usará para modo Defensa y modo Zona Débil)
        - Preparación ataque (pero sigue defendiendose mientras)
        - Ataque
        - Dandose la vuelta
        - Herido  
    - **Contraataque**:
        - Idle
        - Contraataque
        - Preparación ataque
        - Ataque
        - Herido  
    - **Invisible** (Honjo Masamune, la katana legendaria): 
        - Idle (se muestra)
        - En guardia
        - Preparación ataque
        - Ataque (2 frames para ataques seguidos)
        - Efecto ataque (2 frames igual que el anterior)
        - Aura
        - Herido
    - **Ronda de ataques** (Byakko el tigre blanco):
        - Idle
        - En guardia
        - Preparación ataque
        - Ataque (2 sprites para que se ve que ataca varias veces, podría ser una tempestad que invoca(?))
        - Herido
    - **El ilusionista (modo paraiso)** (Kitsune-zenko):
        - Idle
        - En la lejanía
        - Llamas (como bolitas de fuego)
        - Halo del suelo (para indicar en la fase de aparición donde va a hacer el ataque)
        - Llamas del suelo
        - Aparición (con nubes grises)/Desaparición
        - Cargando contra ti
        - Herido  
    - **Dragón**: continuar en el futuro
- Fondos 2d en diferentes capas:  
    - Infierno
    - Purgatorio
    - Cielo

### Interfaces
- Iconos y fondos de la interfaz del juego.

## Audio 

### Pistas
- Nivel infierno.
- Nivel purgatorio.
- Nivel paraíso.

### Efectos de sonido  
- Efectos de sonido de la protagonista:  
    - __*Dash*__
    - __Sonido de espada__ (cuando ataca)
    - __Herida__
- Enemigos:  

    Base (cada uno una versión aguda y una grave): 
    - __Preparación ataque__
    - __Herido__ 
    
    Específico:
    - **Guardia enigma**: Base grave.
    - **Esquiva**: Base aguda.
        - __Esquiva__ (soindo de aire *whushh*)
        - Mareado
        - Celebración
    - **El ilusionista (modo infierno (I)/modo paraiso (P))**:
        - Fuegos
        - Aparición/Desaparición (nubes grises como ninja) *las dos versiones son iguales*
        - __Herido__ (I) (P)
        - __Cargando contra ti__ (sonido trotando, ten en cuenta que es un zorro no un caballo) (P)  
    - **Punto débil**: Base grave.
    - **Contraataque**: Base aguda.
    - **Invisible(?)**: 
        - Sonido aura
        - Sonido espada golpeando
        - __Sonido espadas chocandose__
    - **Ronda de ataques**:
        - __Preparación ataque__ (gruñidos de tigre)
        - __Ataque__ (gruñidos de tigre)
        - __Herido__ (gruñidos de tigre)
    - **Dragón**: continuar en un futuro

## Planes de futuro

Nos hubiese gustado poder meter el enemigo **Dragón** y hacer más enemigos, también añadir en el juego objetos que el jugador fuese encontrado a lo largo de los niveles y que le diesen ventajas o desventajas, por ejemplo, un aumento de la fuerza de tus ataques o que para poder hacer el *dash* tengas que dar dos taps seguidos en vez de solo uno.

## Concept art

Nuestra protagonista:
![Concept1](https://github.com/FormidableGames/generation-y/blob/master/concept/concept1.png "Protagonista")  
![Concept2](https://github.com/FormidableGames/generation-y/blob/master/concept/prota-ilustracion.png "Cara protagonista")  
En combate:
![Concept3](https://github.com/FormidableGames/generation-y/blob/master/concept/concept3.png "Protagonista luchando")  
Paradiso y Purgatorio, dos de los tres niveles del juego:
![Concept4](https://github.com/FormidableGames/generation-y/blob/master/concept/paradiso-concept.png "Paradiso")
![Concept5](https://github.com/FormidableGames/generation-y/blob/master/concept/purgatorio-concept.png "Purgatorio")
Kitsune-yako y Tengu, dos de los enemigos:
![Concept6](https://github.com/FormidableGames/generation-y/blob/master/concept/kitsune-concept.png "Kitsune-yako")
![Concept7](https://github.com/FormidableGames/generation-y/blob/master/concept/tengu-concept.png "Tengu")

## Enlaces
[GitHub del código](https://github.com/FormidableGames/generation-y)  

[Portfolio](https://formidablegames.github.io/portfolio/)
