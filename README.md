# Gen¥

## Índice

1. **Introducción**
    - Concepto del Juego
    - Características principales
    - Género
    - Público objetivo
    - Estilo visual
2. **Mecánicas**
    - Jugabilidad
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
- Estética ligeramente *cyberpunk* y llamativa, mezclada con elementos de la mitología asiática.
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


### Lista de enemigos  
1. **Infierno (fácil)**   

+ **Guardia enigma**: Vidas: /3 corazones/  Daño (que quita): /medio corazón/ 
    + Fase **Defensa**: 1-3 segundos (variará aleatoriamente el tiempo que tengas que esperar) --> Si le atacas quedarás aturdida.  
    + Fase **Preparación de Ataque**: 0.7 segundos --> Si le atacas en este momento le quitarás una vida, entonces el enemigo se dará la vuelta inmediatamente y cambiará a modo de defensa. Sino pasará a modo de ataque.  
    + Fase **Ataque**: 0.5 segundos --> al acabar pasará a modo defensa.  
  
+ **Esquiva**: Vidas: /2 corazones/ Daño (que quita): /1 corazón/  
    + Fase **Defensa**: 1-2 segundos --> Si le atacas quedarás aturdida.
    + Fase **Preparación de Ataque**: 0.5-0.6 segundos --> Si le atacas te esquivará y pasará a fase de defensa hacia el lado al que has ido. Sino pasará a fase de ataque.  
    + Fase **Ataque**: 0.5 segundos --> después de hacerte daño pasará a fase de celebración.  
    + Fase **Celebración**: 0.5 segundos --> al haberte hecho daño lo celebrará, por lo que estará distraido y podrás atacarle (harás solo media vida de daño, a diferencia de la fase de mareo). Una vez golpeado pasará a la fase de defensa hacia el lado en el que estés.
    + Fase **Mareo**: 1-1.5 segundos --> si le atacas 3 veces seguidas en la fase de preparación el enemigo se "mareará" al haber esquivado tantas veces. Entonces podrás dañarle de manera normal (un corazón). Una vez golpeado pasará a la fase de defensa hacia el lado en el que estés.  
      
+ **El ilusionista (fase Infierno)**: Vidas (modo *NO ILUSIÓN*): /2 corazones/ Daño (que quita): /medio corazón/  
    + Fase **Ilusión**: hasta que le vencas --> se hará pasar por un *Guardia Enigma* pero de solo un corazón, en todo lo demás funcionará igual que este, cuando le derrotes pasará a modo *NO ILUSIÓN*.  
    + Fase **Ataque a Distancia**: 3-5 ataques --> en esta fase no podrás atacar al enemigo (se encuentra fuera de tu rango de distancia), te lanzará ataques a distancia que caerán del cielo lentamente (desde el cielo hasta tu posición: 2-3 segundos de manera aleatoria), deberás esquivarlos para que no te dañen, es decir, caerán uno detrás de otro en un lado u otro de manera aleatoria (50-50 de posibildades en cada lado).  
    + Fase **Aparición**: 6 ataques --> en esta fase deberás esperar a que aparezca el enemigo mientras esquivas sus ataques de *halo*. Cada vez que vaya a hacer un ataque el lado en el que vaya a atacar (se escogerá aleatoriamente igual que en la anterior fase) se "encenderá" en forma de *halo* para indicar que va a atacar ahí (durante 0.7-1 segundos), entonces deberás cambiar de lado para evitar ser dañado (el ataque durará 0.3 segundos). Cada vez que acaba de hacer un ataque el enemigo aparecerá y podrás atacarle en ese momento (0.5 segundos). Si le golpeas desaparecerá immediatamente y pasará a hacer otro ataque. Una vez acabada esta fase pasará de nuevo a la fase de Ataque a Distancia.

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

### Concept art
Nuestra protagonista:
![Concept1](https://github.com/FormidableGames/generation-y/blob/master/concept/concept1.png "Protagonista")  
![Concept2](https://github.com/FormidableGames/generation-y/blob/master/concept/concept2.png "Busto protagonista")  
En combate:
![Concept3](https://github.com/FormidableGames/generation-y/blob/master/concept/concept3.png "Protagonista luchando")  
Paradiso, uno de los 3 niveles del juego:
![Concept4](https://github.com/FormidableGames/generation-y/blob/master/concept/concept4-paradiso.png "Paradiso")  

### Sprites
Siguiendo la estética visual establecida:
- Sprites en 2d de la **protagonista**:
    - Tranquila
    - Ataque
    - Aturdida
    - Herida
- Sprites en 2d de los enemigos:  
    - **Guardia Enigma** (Guerrero demonio):
        -En guardia
        -Preparación ataque
        -Ataque
        -Herido
    - **Esquiva** (Un tengu(?)):
        -En guardia
        -Preparación ataque
        -Esquiva
        -Ataque
        -Mareado
        -Celebración
        -Herido
    - **El Ilusionista (modo infierno)** (Kitsune-yako):
        -Presentación (antes de que lance las llamas, estará en posición neutral)
        -Lanzando llamas al cielo
        -Llamas (como bolitas de fuego (?))
        -Halo del suelo (para indicar en la fase de aparción donde va a hacer el ataque)
        -Llamas del suelo
        -Aparición (con nubes grises(?))/Desaparición
        -Herido
- Fondos 2d en diferentes capas:  
    - Infierno
    - Purgatorio
    - Cielo

### Interfaces
- Iconos y fondos de la interfaz del juego.

## Audio 

### Pistas
- Menú principal.
- Nivel infierno.
- Nivel purgatorio.
- Nivel paraíso.
- Fin del juego (victoria y derrota).

### Efectos de sonido
- *Dash*.
- Enemigos.
- Sonidos del combate.
- Navegación por menús.
