'use strict';

window.REGALO = {
  nombre: 'Mi amor',
  remitente: 'Daniel',

  usuario: 'Aracely',
  clave: '2409',

  // Fecha opcional: '2026-12-20'
  cumple: '',

  fondoAriana: 'assets/images/ariana-fondo.jpg',

  musicaFondo: 'assets/music/moonlight.mp3',
  musicaPropuesta: 'assets/music/broche-de-oro.mp3',

  carta: `Mi amor:

Hoy quisiera estar contigo, abrazarte y decirte en persona lo feliz que me hace celebrar tu vida.

Aunque ahora nos separen kilómetros entre México y Nicaragua, mi corazón siempre encuentra el camino hacia ti. La distancia me hace extrañar tu presencia, pero también me recuerda cuánto deseo compartir contigo los días más sencillos y los momentos más importantes.

Preparé este pequeño regalo para que encuentres un poquito de mí en cada canción, cada mensaje y cada sorpresa.

Gracias por hacer mis días más bonitos, por tu cariño y por permitirme formar parte de tu historia. Deseo que este nuevo año de tu vida esté lleno de paz, alegría, sueños cumplidos y personas que te cuiden y te quieran.

Le pido a Dios que acompañe tus pasos, que fortalezca tu corazón y que nos dé sabiduría para cuidar lo que estamos construyendo.

Sueño con el día en que no tenga que enviarte un abrazo por una pantalla, porque podré dártelo de verdad.

Feliz cumpleaños, mi amor.
Te elijo hoy y quiero seguir eligiéndote cada día.

Con todo mi cariño,
Daniel ♡`,

  mensajes: [
    'De México a Nicaragua, todo mi amor viaja contigo.',
    'Mi lugar favorito será siempre a tu lado.',
    'La distancia cambia nuestros abrazos, pero no mis ganas de cuidarte.',
    'Hoy celebro tu vida y la alegría de haberte encontrado.',
    'Sueño con el día en que el próximo vuelo termine en tus brazos.',
    'Si hoy pudiera pedir un regalo para mí, sería pasar este día contigo.',
    'Hay canciones que me gustan más porque me hacen pensar en ti.',
    'Quiero escuchar tus sueños y celebrar contigo cada paso que des.',
    'Mientras llega nuestro próximo abrazo, aquí tienes un poquito de mi corazón.',
    'Entre tantos lugares del mundo, mi corazón sigue eligiendo encontrarte.',
    'No puedo acortar hoy todos los kilómetros, pero sí recordarte cuánto te quiero.',
    'Quiero que nuestro amor tenga paciencia, conversaciones sinceras y muchas razones para sonreír.',
    'Tu cumpleaños me recuerda lo agradecido que estoy de que existas.',
    'Ojalá esta sorpresa te acompañe como un abrazo cuando me extrañes.',
    'Un día este viaje terminará con un abrazo de verdad.'
  ],

  // Reflexiones originales inspiradas en los pasajes.
  reflexiones: [
    {
      texto: 'Quiero amarte con paciencia, bondad y un corazón que te cuide.',
      referencia: 'Inspirado en 1 Corintios 13:4–7'
    },
    {
      texto: 'Que Dios guarde tus pasos y llene tu camino de paz.',
      referencia: 'Inspirado en Números 6:24–26'
    },
    {
      texto: 'Dos personas que se apoyan pueden ayudarse a levantar cuando el camino se vuelve difícil.',
      referencia: 'Inspirado en Eclesiastés 4:9–10'
    },
    {
      texto: 'Deseo que el amor sea el lazo que acompañe nuestra historia.',
      referencia: 'Inspirado en Colosenses 3:14'
    },
    {
      texto: 'Que aprendamos a escuchar con calma y a responder con cariño.',
      referencia: 'Inspirado en Santiago 1:19'
    },
    {
      texto: 'Quiero que mis acciones también te demuestren cuánto te quiero.',
      referencia: 'Inspirado en 1 Juan 3:18'
    }
  ],

  recuerdos: [
    {
      foto: '',
      texto: 'Nuestro primer recuerdo'
    },
    {
      foto: '',
      texto: 'Mi momento favorito contigo'
    }
  ],

  /*
    LETRAS DE CADA CANCIÓN

    letra: pega el texto sin tiempos.

    letraLrc: pega texto con tiempos reales:
    [00:05.20]Primera línea
    [00:10.50]Segunda línea

    desfaseLetra:
     0 = sin ajuste
     1 = mostrar un segundo después
    -1 = mostrar un segundo antes

    Los campos vacíos son intencionales.
  */

  albums: [
    {
      titulo: 'Yours Truly',
      artista: 'Ariana Grande',
      color: '#e8c9a9',
      portada: 'assets/images/yours-truly.jpg',

      canciones: [
        {
          titulo: 'Tattooed Heart',
          archivo: 'assets/music/tattooed-heart.mp3',
          letra: `You don't need a lot of money
Honey, you don't have to play no games
All I need is all your loving
To get the blood rushing through my veins
Huh
I wanna say we're going steady
Ha
Like it's 1954
No
It doesn't have to be forever
Just as long as I'm the name
On your tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
You don't need to worry about making me crazy
'Cause I'm way past that
Eh, and so just call me, if you want me
'Cause you got me, and I'll show you, how much I wanna be
On your tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Just as long as I'm
The name on your tattooed heart
Wrap me in your jacket
My baby
And lay me in your bed
And kiss me, underneath the moonlight
Darling let me trace the lines on your tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Tattooed heart
Just as long as I'm the name on your tattooed heart`,
          letraLrc: ``,
          desfaseLetra: 0
        },
        {
          titulo: 'Honeymoon Avenue',
          archivo: 'assets/music/honeymoon-avenue.mp3',
          letra: `Uh-huh
Ooh, yeah
Mm, ah
(It's the Rascals)
I looked in my rearview mirror and
It seemed to make a lot more sense
Than what I see ahead of us, ahead of us, yeah
Uh, I'm ready to make that turn
Before we both crash and burn
'Cause that could be the death of us, the death of us
Baby, you know how to drive in rain
And you decided not to make a change
Stuck in the same old lane
Going the wrong way home
I feel like my heart is stuck in bumper-to-bumper traffic
I'm under pressure 'cause I can't have you the way that I want
Let's just go back to the way it was
When we were on Honeymoon Avenue
Honeymoon Avenue, baby
Coastin' like crazy
Can we get back to the way it was?
Hey, what happened to the butterflies?
Guess they encountered that stop sign
And my heart is at a yellow light, a yellow light
Hey, right when I think that we've found it (found it)
Well, that's when we start turnin' around (turnin' around)
You're saying, "Baby, don't worry"
But we're still going the wrong way
Baby, you know how to drive in rain
And you decided not to make a change
Stuck in the same old lane
Going the wrong way home
I feel like my heart is stuck in bumper-to-bumper traffic
I'm under pressure 'cause I can't have you the way that I want
Let's just go back to the way it was
When we were on Honeymoon Avenue
Honeymoon Avenue, baby
Coastin' like crazy
Can we get back to the way it was?
They say only fools fall in love
Well, they must've been talking about us
And sometimes I feel like we've been here before, oh
I could be wrong, but I know I'm right
We're gon' be lost if we continue to fight
Honey, I know, yeah
We can find our way home
I feel like my heart is stuck in bumper-to-bumper traffic
I'm under pressure 'cause I can't have you the way that I want
Let's just go back to the way it was
When we were on Honeymoon Avenue
Honeymoon Avenue, my baby
Coastin' like crazy
Can we get back to the way it was?
When we were on Honeymoon Avenue
Honeymoon Avenue, baby
Coastin' like crazy
Can we get back to the way it was?
Baby, you know how to drive in rain
And you decided not to make a change
Stuck in the same old lane
Going the wrong way home
I feel like my heart is stuck in-
Traffic, I'm under
Pressure, pressure
Let's just go back to the way it was
When we were on
Honeymoon Avenue, Honeymoon Avenue
Honeymoon Avenue, Honeymoon Avenue
Avenue
Let's just go back, b-b-b-back, back, back`,
          letraLrc: ``,
          desfaseLetra: 0
        }
      ]
    },

    {
      titulo: 'Dangerous Woman',
      artista: 'Ariana Grande',
      color: '#8e8b9e',
      portada: 'assets/images/dangerous-woman.jpg',

      canciones: [
        {
          titulo: 'Moonlight',
          archivo: 'assets/music/moonlight.mp3',
          letra: `The sun is setting
And you're right here by my side
And the movie is playing
But we won't be watching tonight
Every look, every touch
Makes me wanna give you my heart
I be crushin' on you, baby
Stay the way you are
'Cause I never knew, I never knew
You could hold moonlight in your hands
'Til the night I held you
You are my moonlight
Moonlight
I kiss his fingertips
As I'm wishing he's all mine
He's giving me Elvis
With some James Dean in his eyes
Puts his lips on my neck
Makes me want to give him my body
I be fallin' for you, baby
And I just can't stop
'Cause I never knew, I never knew
You could hold moonlight in your hands
'Til the night I held you
You are my moonlight
Moonlight
Baby, I be fallin'
You're my moonlight
Moonlight
He's so bossy
He makes me dance
Tryna sit in the back of his whip
And just cancel my plans
Sweet like candy
But he's such a man
He knows just what it does
When he's holding me tight
And he calls me "Moonlight" too`,
          letraLrc: ``,
          desfaseLetra: 0
        },
        {
          titulo: 'Into You',
          archivo: 'assets/music/into-you.mp3',
          letra: `I'm so into you
I can barely breathe
And all I wanna do
Is to fall in deep
But close ain't close enough
'Til we cross the line, hey, yeah
So name a game to play
And I'll roll the dice, hey
Oh, baby, look what you started
The temperature's rising in here
Is this gonna happen?
Been waiting and waiting for you to make a move (ooh)
Before I make a move (ooh)
So, baby, come light me up
And maybe I'll let you on it
A little bit dangerous
But, baby, that's how I want it
A little less conversation and a little more touch my body
'Cause I'm so into you, into you, into you
Got everyone watchin' us
So, baby, let's keep it secret
A little bit scandalous
But, baby, don't let them see it
A little less conversation and a little more touch my body
'Cause I'm so into you, into you, into you
Ooh, yeah
This could take some time, hey
I made too many mistakes
Better get this right, right, baby
Oh, baby, look what you started
The temperature's rising in here
Is this gonna happen?
Been waiting and waiting for you to make a move (ooh)
Before I make a move (ooh)
So, baby, come light me up
And maybe I'll let you on it
A little bit dangerous
But, baby, that's how I want it
A little less conversation and a little more touch my body
'Cause I'm so into you, into you, into you
Got everyone watchin' us
So, baby, let's keep it secret (mm)
A little bit scandalous
But, baby, don't let them see it
A little less conversation and a little more touch my body
'Cause I'm so into you, into you, into you ('cause I'm so into you)
Tell me what you came here for
'Cause I can't, I can't wait no more
I'm on the edge with no control
And I need, I need you to know, you to know
Oh, yeah
So, baby, come light me up (light me up)
And maybe I'll let you on it
A little bit dangerous (dangerous)
But, baby, that's how I want it (how I want it)
A little less conversation and a little more touch my body
'Cause I'm so into you, into you, into you (no)
Got everyone watchin' us (watchin' us)
So, baby, let's keep it secret
A little bit scandalous (scandalous)
But, baby, don't let them see it
A little less conversation and a little more touch my body
'Cause I'm so into you, into you, into you
So come light me up
So come light me up, my baby
Little dangerous
A little dangerous, my boy (how I want it)
A little less conversation and a little more touch my body
'Cause I'm so into you, into you, into you (I'm so into you)`,
          letraLrc: ``,
          desfaseLetra: 0
        }
      ]
    },

    {
      titulo: 'Positions',
      artista: 'Ariana Grande',
      color: '#9cae94',
      portada: 'assets/images/positions.jpg',

      canciones: [
        {
          titulo: 'pov',
          archivo: 'assets/music/pov.mp3',
          letra: `It's like you got superpowers
Turn my minutes into hours
You got more than 20-20, babe
Made of glass, the way you see through me
You know me better than I do
Can't seem to keep nothing from you
How you touch my soul from the outside
Permeate my ego and my pride
I wanna love me (ooh)
The way that you love me (ooh)
Ooh, for all of my pretty and all of my ugly too
I'd love to see me from your point of view
I wanna trust me (trust me)
The way that you trust me (trust me)
Ooh, 'cause nobody ever loved me like you do
I'd love to see me from your point of view
I'm gеtting used to receiving
Still gеtting good at not leaving
I'ma love you even though I'm scared (oh, scared)
Learnin' to be grateful for myself (oh, oh, oh)
You love my lips 'cause they say the
Things we've always been afraid of
I can feel it startin' to subside
Learnin' to believe in what is mine
I wanna love me (ooh)
The way that you love me (ooh)
Ooh, for all of my pretty and all of my ugly too
I'd love to see me from your point of view
I wanna trust me (trust me)
The way that you trust me (trust me)
Ooh, 'cause nobody ever loved me like you do
I'd love to see me from your point of view
I couldn't believe it or see it for myself
Know I be impatient
But now I'm out here fallin', fallin'
Frozen, slowly thawin', got me right
I won't keep you waitin' (waitin')
All my baggage fadin' safely (my baggage fadin')
And if my eyes deceive me
Won't let them stray too far away
I wanna love me (ooh)
The way that you love me (ooh)
Ooh, for all of my pretty and all of my ugly too
I'd love to see me from your point of view
I wanna trust me, ooh (trust me)
The way that you trust me, baby (trust me)
'Cause nobody ever loved me like you do
I'd love to see me from your point of view (oh)
Yeah`,
          letraLrc: ``,
          desfaseLetra: 0
        },
        {
          titulo: 'positions',
          archivo: 'assets/music/positions.mp3',
          letra: `Heaven sent you to me
I'm just hopin' I don't repeat history
Boy, I'm tryna meet your mama on a Sunday
Then make a lotta love on a Monday (ah-ah)
Never need no (no), no one else, babe
'Cause I'll be
Switchin' the positions for you
Cookin' in the kitchen, and I'm in the bedroom
I'm in the Olympics, way I'm jumpin' through hoops
Know my love infinite, nothin' I wouldn't do
That I won't do, switchin' for y-
Perfect, perfect
You're too good to be true (you're too good to be true)
But I get tired of runnin'
Fuck it, now I'm runnin' with you (wit' you)
Said, boy, I'm tryna meet your mama on a Sunday
Then make a lotta love on a Monday (ah-ah)
Never need no (no), no one else, babe
'Cause I'll be
Switchin' the positions for you (for you, ah)
Cookin' in the kitchen, and I'm in the bedroom
I'm in the Olympics, way I'm jumpin' through hoops
Know my love infinite, nothin' I wouldn't do
That I won't do, switchin' for you
Cookin' in the kitchen, and I'm in the bedroom (bedroom)
I'm in the Olympics, way I'm jumpin' through hoops
Know my love infinite, nothin' I wouldn't do
That I won't do, switchin' for you
This some shit that I usually don't do (yeah)
But for you, I kinda, kinda want to
'Cause you're down for me, and I'm down too (and I'm down too)
Yeah, I'm down too, switching the positions for you
This some shit that I (yeah) usually don't do (don't do)
But for you, I kinda, kinda want to
'Cause you're down for me, and I'm down too
Switchin' the positions for you
Cookin' in the kitchen, and I'm in the bedroom
I'm in the Olympics, way I'm jumpin' through hoops (jumpin', jumpin')
Know my love infinite, nothin' I wouldn't do (do)
That I won't do, switchin' for you
Cookin' in the kitchen and I'm in the bedroom
I'm in the Olympics, way I'm jumpin' through hoops
Know my love infinite, nothin' I wouldn't do
That I won't do, switchin' for you
Yeah
Ah, yeah
Ah (ah), yeah`,
          letraLrc: ``,
          desfaseLetra: 0
        }
      ]
    },

    {
      titulo: 'thank u, next',
      artista: 'Ariana Grande',
      color: '#dc8cae',
      portada: 'assets/images/thank-u-next.jpg',

      canciones: [
        {
          titulo: 'thank u, next',
          archivo: 'assets/music/thank-u-next.mp3',
          letra: `Thought I'd end up with Sean
But he wasn't a match
Wrote some songs about Ricky
Now I listen and laugh
Even almost got married
And for Pete, I'm so thankful
Wish I could say "thank you" to Malcolm
'Cause he was an angel
One taught me love
One taught me patience
And one taught me pain
Now, I'm so amazing
Say I've loved and I've lost
But that's not what I see
So, look what I got
Look at what you taught me
And for that, I say
Thank you, next (next)
Thank you, next (next)
Thank you, next
I'm so grateful for my ex
Thank you, next (next)
Thank you, next (next)
Thank you, next (next)
I'm so
Spend more time with my friends
I ain't worried 'bout nothin'
Plus, I met someone else
We're havin' better discussions
I know they say I move on too fast
But this one gon' last
'Cause her name is Ari
And I'm so good with that (so good with that)
She taught me love (love)
She taught me patience (patience)
She handles pain (pain)
That amazing (yeah, she's amazing)
I've loved and I've lost (yeah, yeah)
But that's not what I see (yeah, yeah)
'Cause look what I've found (yeah, yeah)
Ain't no need for searching
And for that, I say
Thank you, next (thank you, next)
Thank you, next (thank you, next)
Thank you, next (thank you)
I'm so grateful for my ex
Thank you, next (thank you, next)
Thank you, next (said thank you, next)
Thank you, next (next)
I'm so grateful for my ex
Thank you, next
Thank you, next
Thank you, next
I'm so
One day I'll walk down the aisle
Holding hands with my mama
I'll be thanking my dad
'Cause she grew from the drama
Only wanna do it once, real bad
Gon' make that last
God forbid something happens
Least this song is a smash (song is a smash)
I've got so much love (love)
Got so much patience (patience)
I've learned from the pain (pain)
I turned out amazing (turned out amazing)
I've loved and I've lost (yeah, yeah)
But that's not what I see (yeah, yeah)
'Cause look what I've found (yeah, yeah)
Ain't no need for searching
And for that, I'll say
Thank you, next (thank you, next)
Thank you, next (thank you, next)
Thank you, next
I'm so grateful for my ex
Thank you, next (thank you, next)
Thank you, next (said thank you, next)
Thank you, next (next)
I'm so grateful for my ex
Thank you, next
Thank you, next
Thank you, next
Yeah, yee
Thank you, next
Thank you, next
Thank you, next
Yeah, yee`,
          letraLrc: ``,
          desfaseLetra: 0
        }
      ]
    },

    {
      titulo: 'eternal sunshine deluxe: brighter days ahead',
      artista: 'Ariana Grande',
      color: '#ae604b',
      portada: 'assets/images/eternal-sunshine-deluxe.jpg',

      canciones: [
        {
          titulo: 'past life',
          archivo: 'assets/music/past-life.mp3',
          letra: `Woke up with a ghost by my side
Kissed by the passing of time, time
A moth to a flame, I didn't think, I just flew
I just didn't wanna change my mind (my), mind
Rhythms of the night consume my body
Just let the music confiscate my soul
You think I'm lost, but that's just how you found me
Well, maybe, I'm the stranger after all
Always wondered what would happen if I let you lose me
Always wondered what would happen if I let myself need more
Might fuck around and elevate my expectations
Now I'm (I'm) fine (fine) to leave you in a past life
Yeah, I'm (I'm) fine (fine) to leave you in a past life
Phased me just like the moon (ah-ooh)
I used to think you were the medicine
But you were just code blue
And you're thinking it too and I already knew (I knew)
I just didn't want to waste my time
Rhythms of the night consume my body (my body)
Just let the music (ah) confiscate my soul (confiscate my soul)
You think I'm lost, but that's just how you found me
Well, maybe, I'm the stranger after all (after all)
Always wondered what would happen if I let you lose me (let you lose me)
Always wondered what would happen if I let myself need more
Might fuck around and elevate my expectations (expectations)
Now I'm (I'm) fine (fine) to leave you in a past life
'Cause, baby, I'm (I'm) fine (fine) to leave you in a past life
Somethin' just to save me
Just to confiscate
My body, my soul (confiscate my soul)
You think I'm lost, but (feel so lost without it)
That's just how you found me (this rhythm saves my life)
Maybe, I am the stranger (I'm the stranger) after all (after all)
Always wondered what would happen if I let you lose me (let you lose me)
Always wondered what would happen if I let myself need more
Might fuck around and elevate my expectations (expectations)
Now I'm (I'm) fine (fine) to leave you in a past life
Oh, baby, yeah, I'm (I'm) fine (I'm fine) to leave you in a past life
Somethin' just to save me
Somethin' just to save me
Ah, ah
Somethin' just to save me
Somethin' just to save me
Ah, ah`,
          letraLrc: ``,
          desfaseLetra: 0
        },
        {
          titulo: 'eternal sunshine',
          archivo: 'assets/music/eternal-sunshine.mp3',
          letra: `I don't care what people say
We both know I couldn't change you
I guess you could say the same
Can't rearrange truth
I've never seen someone lie like you do
So much, even you start to think it's true, ooh
Get me out of this loop
Yeah, yeah

So now we play our separate scenes
Now, now she's in my bed, mm-mm, layin' on your chest
Now I'm in my head, wonderin' how it ends

I'll be the first to say: I'm sorry
Now you got me feelin' sorry
I showed you all my demons, all my lies
Yet, you played me like Atari
Now it's like I'm lookin' in the mirror
Hope you feel alright when you're in her
I found a good boy and he's on my side
You're just my eternal sunshine, sunshine

So I try to wipe my mind
Just so I feel less insane
Rather feel painless
I'd rather forget than know, know for sure
What we could've fought through behind this door, mm-mm
So I close it and move, yeah, yeah

So now we play our separate scenes
Now, now he's in your bed and layin' on my chest
Now I'm in my head, i'm wonderin' how it ends, ends, ends

I'll be the first to say: I'm sorry
Now you got me feelin' sorry
I showed you all my demons, all my lies
Yet, you played me like Atari
Now it's like I'm lookin' in the mirror
Hope you feel alright when you're in her
I found a good boy and he's on my side
You're just my eternal sunshine, sunshine

Won't break, can't shake
This fate, rewrite
Deep breaths, tight chest
Life, death, rewind
Won't (won't) break (won't), can't (can't) shake (shake)
This (this) fate (fate), rewrite
Deep (deep) breaths (breaths), tight (tight) chest (chest)
Life (life), death (death)

I'll be the first to say: I'm sorry
Now you got me feelin' sorry
I showed you all my demons, all my lies
Yet, you played me like Atari
Now it's like I'm lookin' in the mirror (won't break)
Hope you feel alright when you're in her (can't shake, this fate)
I found a good boy and he's on my side (rewrite, deep breaths)
You're just my eternal sunshine, sunshine (tight chest, life, death, rewind)

Won't (won't) break (won't), can't (can't) shake (shake)
This (this) fate (fate), rewrite
Deep (deep) breaths (breaths), tight (tight) chest (chest)
Life (life), death (death), rewind
Won't (won't) break (won't), can't (can't) shake (shake)
This (this) fate (fate), rewrite
Deep (deep) breaths (breaths), tight (tight) chest (chest)
Life (life), death (death)`,
          letraLrc: ``,
          desfaseLetra: 0
        }
      ]
    },

    {
      titulo: 'The Romantic',
      artista: 'Bruno Mars',
      color: '#ad7158',
      portada: 'assets/images/the-romantic.jpg',

      canciones: [
        {
          titulo: 'Risk It All',
          archivo: 'assets/music/risk-it-all.mp3',
          letra: `For just the chance to win your heart
You could set the bar beyond the stars
I'll do anything, anything you ask me to
Say you want the moon
Watch me learn to fly
Ain't no mountain you could point to
I wouldn't climb
It's crazy, but it's true
There's nothing I won't do
I'd risk it all for you
To hold your hand and call you mine
I'm tryin' to be your man 'til the end of time
Oh, I'll do anything, anything you ask me to
I would run through a fire
Just to be by your side
If your heart's on the line
You could take mine
It's crazy, but it's true
There's nothing I won't do
I'd risk it all for you
I would swim across the sea just to show you
Sacrifice my life just to hold you
I could go on and on
To prove that you belong here in my arms
Say you want the moon
Watch me learn to fly
Ain't no mountain you could point to
I wouldn't climb
It's crazy, but it's true
There's nothing I won't do
I'd risk it all for you
It's crazy, but it's true
There's nothing I won't do
I'd risk it all for you`,
          letraLrc: ``,
          desfaseLetra: 0
        }
      ]
    },

    {
      titulo: 'Sigamos el Viaje',
      artista: 'Dúo Zimrah',
      color: '#8184b7',
      portada: 'assets/images/sigamos-el-viaje.jpg',

      canciones: [
        {
          titulo: 'Sigamos el Viaje',
          archivo: 'assets/music/sigamos-el-viaje.mp3',
          letra: `El tiempo que pasamos confirmó
Que siempre fuiste tú, que así lo quiso Dios
Y más allá de todos esos días sin colores
El viaje fue mejor de lo que cuentan las canciones
Y nadie me acompaña como tú
Si duele el corazón, si no sé dónde voy
Vuelves a recordarme que no es este nuestro cielo
Que el Creador del mundo está tejiendo nuestros sueños
Y ya no tengo miedo de que avance el reloj
Porque

Con cada minuto más me acuerdo de ti
Y hasta mi último segundo te haré feliz
Ya no pesa el equipaje, porque tú estás junto a mí
Sigamos el viaje sin mirar hacia atrás
Que al frente tenemos el mejor Capitán
Y te sigo amando tanto como ayer o mucho más
Mucho más
Oh, oh

Dicen que el amor todo lo puede
Yo lo creo porque desde que llegaste nada me detiene
No quiero tan solo tu verano
Quiero ver como floreces
Y si tus hojas caen yo estaré aquí
Pues ya no tengo miedo de que avance el reloj
Porque

Con cada minuto más me acuerdo de ti
Y hasta mi último segundo te haré feliz
Ya no pesa el equipaje, porque tú estás junto a mí
Sigamos el viaje, sin mirar hacia atrás
Que al frente tenemos el mejor Capitán
Y te sigo amando tanto como ayer, o mucho más
Mucho más
Oh, oh
Y te sigo amando tanto como ayer o mucho más`,
          letraLrc: ``,
          desfaseLetra: 0
        }
      ]
    }
  ],

  // Letras de la canción especial de la propuesta.
  propuesta: {
    titulo: 'Broche de Oro',
    artista: 'La Trakalosa de Monterrey',
    portada: '',
    letra: `De veras que Dios no se midió esta vez
Contigo exageró eres mas que bonita
Daría lo que fuera por amanecer
A tu lado y besar esa linda sonrisa
No se lo que me hiciste pero me fascinas
Me gustas demasiado no puedo evitarlo
Dentro del corazón te llevo todo el día
A donde sea que voy te siento aquí a mi lado

Bastó con recorrer las curvas de tus labios
Y arder con la pasión mas de 40 grados
Para que te volvieras más que indispensable
Porque te necesito más que al mismo aire
Eres mas que perfecta en todos los sentidos
Después de estar contigo ahora me siento vivo
Y estoy seguro que somos almas gemelas
Si me dices que sí, se que valdrá la pena
Porque sabes que te adoro
Y estoy dispuesto a todo!
Cerremos nuestra historia, con broche de oro

No sé lo que me hiciste pero me fascinas
Me gustas demasiado no puedo evitarlo
Dentro del corazón te llevo todo el día
A donde sea que voy te siento aquí a mi lado
Bastó con recorrer las curvas de tus labios
Y arder con la pasión mas de 40 grados
Para que te volvieras mas que indispensable
Porque te necesito más que al mismo aire
Eres mas que perfecta en todos los sentidos
Después de estar contigo ahora me siento vivo
Y estoy seguro que somos almas gemelas
Si me dices que si se que valdrá la pena
Porque sabes que te adoro
Y estoy dispuesto a todo!
Cerremos nuestra historia, con broche de oro
Porque sabes que te adoro
Y estoy dispuesto a todo!
Cerremos nuestra historia, con broche de oro`,
    letraLrc: ``,
    desfaseLetra: 0
  }
};