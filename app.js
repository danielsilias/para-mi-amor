'use strict';

(() => {
  const C = window.REGALO;
  const $ = id => document.getElementById(id);

  if (!C) {
    console.error('Carga config.js antes de app.js.');
    return;
  }

  const reducido = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  );

  const elegir = lista =>
    lista.length
      ? lista[Math.floor(Math.random() * lista.length)]
      : '';

  const storage = {
    leer(clave) {
      try {
        return localStorage.getItem(clave);
      } catch {
        return null;
      }
    },

    guardar(clave, valor) {
      try {
        localStorage.setItem(clave, String(valor));
      } catch {
        // El regalo continúa funcionando.
      }
    }
  };

  let sesion = false;
  let vista = 'inicio';

  // CELEBRACIÓN

  function celebrar() {
    if (reducido.matches) return;

    for (let i = 0; i < 35; i++) {
      const pieza = document.createElement('span');

      pieza.className = 'confetti-piece';
      pieza.textContent = elegir(['♡', '✨', '💗']);
      pieza.style.left = `${Math.random() * 100}%`;
      pieza.style.animationDelay = `${Math.random() * 0.6}s`;

      $('confetti').append(pieza);
      setTimeout(() => pieza.remove(), 4000);
    }
  }

  // NAVEGACIÓN

  function mostrarVista(nombre) {
    const destino = $(nombre);

    if (!destino || !destino.classList.contains('view')) {
      return;
    }

    if (nombre !== 'peach') pausarJuego();

    vista = nombre;

    document.querySelectorAll('.view').forEach(seccion => {
      seccion.hidden = seccion.id !== nombre;
    });

    document.querySelectorAll('nav [data-view]').forEach(boton => {
      const activo = boton.dataset.view === nombre;
      boton.classList.toggle('active', activo);
      boton.setAttribute('aria-pressed', String(activo));
    });

    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  document.querySelectorAll('[data-view]').forEach(boton => {
    boton.addEventListener('click', () => {
      mostrarVista(boton.dataset.view);
    });
  });

  document.querySelector('.brand').addEventListener('click', e => {
    e.preventDefault();
    mostrarVista('inicio');
  });

  // CATÁLOGO

  const catalogo = [];

  for (const album of C.albums || []) {
    for (const cancion of album.canciones || []) {
      catalogo.push({
        ...cancion,
        artista: cancion.artista || album.artista || 'Ariana Grande',
        portada: cancion.portada || album.portada || ''
      });
    }
  }

  function mismaRuta(a, b) {
    if (!a || !b) return false;

    try {
      return new URL(a, document.baseURI).href ===
        new URL(b, document.baseURI).href;
    } catch {
      return a === b;
    }
  }

  const rutaFondo =
    C.musicaFondo || 'assets/music/moonlight.mp3';

  const rutaPropuesta =
    C.musicaPropuesta || 'assets/music/broche-de-oro.mp3';

  const cancionFondo = catalogo.find(
    cancion => mismaRuta(cancion.archivo, rutaFondo)
  ) || {
    titulo: 'Moonlight',
    artista: 'Ariana Grande',
    archivo: rutaFondo,
    portada: '',
    letra: '',
    letraLrc: ''
  };

  const cancionPropuesta = {
    titulo: 'Broche de Oro',
    artista: 'La Trakalosa de Monterrey',
    letra: '',
    letraLrc: '',
    portada: '',
    ...C.propuesta,
    archivo: rutaPropuesta
  };

  // AUDIO: UN SOLO REPRODUCTOR

  const audio = $('audio');

  let tipoMusica = 'fondo';
  let posicionFondo = 0;
  let musicaActiva = true;
  let versionAudio = 0;
  let actual = null;

  function actualizarBotonesAudio() {
    $('musicToggle').textContent = audio.paused
      ? '♫ Activar música'
      : '♫ Pausar música';

    $('lpPlay').textContent = audio.paused
      ? '▶ Reproducir'
      : 'Ⅱ Pausar';

    $('lpPlay').disabled = !audio.getAttribute('src');
    $('lpVolume').value = audio.volume;
  }

  function intentarReproducir() {
    return audio.play().catch(error => {
      if (error.name !== 'AbortError') {
        $('audioNotice').textContent =
          'Toca reproducir para iniciar la música.';

        $('lpStatus').textContent =
          'Si no comienza, revisa el archivo MP3.';
      }
    });
  }

  function reproducir(cancion, tipo = 'cancion') {
    if (!cancion?.archivo) return;

    if (tipoMusica === 'fondo' && audio.getAttribute('src')) {
      posicionFondo = audio.currentTime || 0;
    }

    const estaVersion = ++versionAudio;

    audio.pause();

    actual = cancion;
    tipoMusica = tipo;
    musicaActiva = true;

    audio.src = cancion.archivo;
    audio.loop = tipo === 'fondo' || tipo === 'propuesta';

    $('trackTitle').textContent =
      `${cancion.titulo} · ${cancion.artista}`;

    $('audioNotice').textContent = '';
    $('lpStatus').textContent = '';

    audio.load();
    mostrarLetra(cancion);

    if (tipo === 'fondo' && posicionFondo > 0) {
      audio.addEventListener('loadedmetadata', () => {
        if (
          estaVersion !== versionAudio ||
          tipoMusica !== 'fondo' ||
          !Number.isFinite(audio.duration)
        ) {
          return;
        }

        audio.currentTime = Math.min(
          posicionFondo,
          Math.max(0, audio.duration - 0.1)
        );
      }, { once: true });
    }

    intentarReproducir();
  }

  function volverAlFondo() {
    if (!sesion) return;
    reproducir(cancionFondo, 'fondo');
  }

  function alternarAudio() {
    if (!audio.paused) {
      musicaActiva = false;
      audio.pause();
    } else {
      musicaActiva = true;

      if (audio.getAttribute('src')) {
        intentarReproducir();
      } else {
        volverAlFondo();
      }
    }
  }

  $('musicToggle').addEventListener('click', alternarAudio);
  $('lpPlay').addEventListener('click', alternarAudio);

  $('backToBackground').addEventListener('click', () => {
    volverAlFondo();
  });

  audio.addEventListener('play', () => {
    musicaActiva = true;
    actualizarBotonesAudio();
  });

  audio.addEventListener('pause', actualizarBotonesAudio);
  audio.addEventListener('volumechange', actualizarBotonesAudio);

  audio.addEventListener('ended', () => {
    if (tipoMusica === 'cancion' && musicaActiva) {
      volverAlFondo();
    }
  });

  audio.addEventListener('error', () => {
    const mensaje =
      'No se encontró el audio. Revisa su nombre y ubicación.';

    $('audioNotice').textContent = mensaje;
    $('lpStatus').textContent = mensaje;
    actualizarBotonesAudio();
  });

  // LETRAS AUTOMÁTICAS

  let lineas = [];
  let indiceActivo = -2;

  function leerLrc(texto) {
    const entradas = [];
    let offset = 0;

    for (const linea of String(texto || '').split(/\r?\n/)) {
      const ajuste = linea.match(/^\[offset:([+-]?\d+)\]/i);

      if (ajuste) {
        offset = Number(ajuste[1]) / 1000;
        continue;
      }

      const marcas = [
        ...linea.matchAll(
          /\[(\d+):([0-5]?\d(?:\.\d{1,3})?)\]/g
        )
      ];

      if (!marcas.length) continue;

      const contenido = linea.replace(
        /\[(\d+):([0-5]?\d(?:\.\d{1,3})?)\]/g,
        ''
      ).trim();

      for (const marca of marcas) {
        entradas.push({
          tiempo: Number(marca[1]) * 60 + Number(marca[2]),
          texto: contenido
        });
      }
    }

    entradas.forEach(item => {
      item.tiempo += offset;
    });

    entradas.sort((a, b) => a.tiempo - b.tiempo);

    const grupos = [];

    for (const item of entradas) {
      const ultimo = grupos[grupos.length - 1];

      if (ultimo && ultimo.tiempo === item.tiempo) {
        ultimo.texto += '\n' + item.texto;
      } else {
        grupos.push({ ...item });
      }
    }

    return grupos;
  }

  function tiempoTexto(valor) {
    if (!Number.isFinite(valor)) return '0:00';

    const segundos = Math.max(0, Math.floor(valor));

    return `${Math.floor(segundos / 60)}:${
      String(segundos % 60).padStart(2, '0')
    }`;
  }

  // Un LRC con tiempos reales tiene prioridad.
  // Sin LRC, se estiman los tiempos según la duración del audio
  // y la longitud de cada frase. No se analiza la voz del MP3.

  function crearTiemposAutomaticos(cancion, duracion) {
    if (!Number.isFinite(duracion) || duracion <= 0) {
      return [];
    }

    const frases = String(cancion?.letra || '')
      .split(/\r?\n/)
      .map(texto => texto.trim())
      .filter(Boolean);

    if (!frases.length) return [];

    const inicio = Math.min(duracion * 0.06, 12);

    const fin = Math.max(
      inicio,
      duracion - Math.min(duracion * 0.04, 8)
    );

    const pesos = frases.map(texto => Math.max(
      3,
      texto
        .replace(/[^\p{L}\p{N}\s]/gu, '')
        .split(/\s+/)
        .filter(Boolean)
        .length
    ));

    const total = pesos.reduce((a, b) => a + b, 0);

    let acumulado = 0;

    return frases.map((texto, i) => {
      const tiempo =
        inicio + (fin - inicio) * acumulado / total;

      acumulado += pesos[i];

      return { tiempo, texto };
    });
  }

  function mostrarLetra(cancion) {
    indiceActivo = -2;

    lineas = leerLrc(cancion?.letraLrc);

    if (!lineas.length) {
      lineas = crearTiemposAutomaticos(cancion, audio.duration);
    }

    $('lpTitle').textContent = cancion?.titulo || 'Nuestra música';
    $('lpArtist').textContent = cancion?.artista || '';
    $('lpLines').replaceChildren();

    const portada = $('lpCover');

    portada.hidden = !cancion?.portada;
    $('lpFallback').hidden = !!cancion?.portada;

    if (cancion?.portada) {
      portada.src = cancion.portada;
      portada.alt = `Portada de ${cancion.titulo}`;
    } else {
      portada.removeAttribute('src');
    }

    if (lineas.length) {
      $('lpMode').textContent =
        leerLrc(cancion?.letraLrc).length
          ? 'LETRA SINCRONIZADA'
          : 'LETRA AUTOMÁTICA · TIEMPOS ESTIMADOS';

      for (const linea of lineas) {
        const boton = document.createElement('button');

        boton.type = 'button';
        boton.className = 'lp-line';
        boton.textContent = linea.texto || '♫';

        // La letra avanza sola. Tocar una frase es opcional:
        // permite adelantar la canción hasta esa parte.

        boton.addEventListener('click', () => {
          if (!Number.isFinite(audio.duration)) return;

          audio.currentTime = Math.max(
            0,
            Math.min(
              audio.duration,
              linea.tiempo + (Number(actual?.desfaseLetra) || 0)
            )
          );

          actualizarProgreso();
        });

        $('lpLines').append(boton);
      }
    } else {
      const texto = String(cancion?.letra || '').trim();

      $('lpMode').textContent = texto
        ? 'PREPARANDO LETRA AUTOMÁTICA…'
        : 'LETRA PENDIENTE';

      const parrafo = document.createElement('p');

      parrafo.className = 'lp-plain';
      parrafo.textContent = texto || 'Disfruta la música ♫';

      $('lpLines').append(parrafo);
    }

    $('lpLines').scrollTop = 0;
    actualizarProgreso();
    actualizarBotonesAudio();
  }

  function actualizarProgreso() {
    const duracion = Number.isFinite(audio.duration)
      ? audio.duration
      : 0;

    $('lpSeek').max = duracion || 1;
    $('lpSeek').disabled = !duracion;
    $('lpSeek').value = audio.currentTime || 0;

    $('lpTime').textContent = tiempoTexto(audio.currentTime);
    $('lpDuration').textContent = tiempoTexto(duracion);

    if (!lineas.length) return;

    const tiempo = audio.currentTime -
      (
        leerLrc(actual?.letraLrc).length
          ? (Number(actual?.desfaseLetra) || 0)
          : 0
      );

    let indice = -1;

    for (
      let i = 0;
      i < lineas.length && lineas[i].tiempo <= tiempo;
      i++
    ) {
      indice = i;
    }

    if (indice === indiceActivo) return;

    indiceActivo = indice;

    [...$('lpLines').children].forEach((elemento, i) => {
      elemento.classList.toggle('current', i === indice);
      elemento.classList.toggle('past', i < indice);

      if (i === indice) {
        elemento.setAttribute('aria-current', 'true');
      } else {
        elemento.removeAttribute('aria-current');
      }
    });

    if ($('lyricsPlayer').open && indice >= 0) {
      const contenedor = $('lpLines');
      const elemento = contenedor.children[indice];

      const posicion =
        contenedor.scrollTop +
        elemento.getBoundingClientRect().top -
        contenedor.getBoundingClientRect().top -
        contenedor.clientHeight / 2 +
        elemento.clientHeight / 2;

      contenedor.scrollTo({
        top: posicion,
        behavior: reducido.matches ? 'auto' : 'smooth'
      });
    }
  }

  function abrirLetras() {
    if (!actual) mostrarLetra(null);

    if (!$('lyricsPlayer').open) {
      $('lyricsPlayer').showModal();
    }

    indiceActivo = -2;
    actualizarProgreso();
  }

  $('openLyrics').addEventListener('click', abrirLetras);

  $('lpClose').addEventListener('click', () => {
    $('lyricsPlayer').close();
  });

  $('lpCover').addEventListener('error', () => {
    $('lpCover').hidden = true;
    $('lpFallback').hidden = false;
  });

  $('lpSeek').addEventListener('input', () => {
    if (Number.isFinite(audio.duration)) {
      audio.currentTime = Number($('lpSeek').value);
    }

    actualizarProgreso();
  });

  $('lpVolume').addEventListener('input', () => {
    audio.volume = Number($('lpVolume').value);
  });

  for (const evento of [
    'timeupdate',
    'seeked',
    'loadedmetadata',
    'durationchange'
  ]) {
    audio.addEventListener(evento, () => {
      if (
        (evento === 'loadedmetadata' || evento === 'durationchange') &&
        actual
      ) {
        mostrarLetra(actual);
      } else {
        actualizarProgreso();
      }
    });
  }

  // ACCESO

  $('loginForm').addEventListener('submit', evento => {
    evento.preventDefault();

    if (
      $('user').value.trim() !== C.usuario ||
      $('password').value !== C.clave
    ) {
      $('loginError').textContent =
        'Revisa tu usuario y contraseña, mi amor.';
      return;
    }

    sesion = true;
    musicaActiva = true;
    posicionFondo = 0;
    tipoMusica = 'cancion';

    $('loginError').textContent = '';
    $('login').hidden = true;
    $('app').hidden = false;

    mostrarVista('inicio');
    volverAlFondo();
    celebrar();
  });

  $('logout').addEventListener('click', () => {
    sesion = false;

    pausarJuego();
    cancelarVuelo();

    document.querySelectorAll('dialog[open]').forEach(dialogo => {
      dialogo.close();
    });

    audio.pause();

    $('login').hidden = false;
    $('app').hidden = true;
    $('password').value = '';
    $('user').focus();
  });

  // CARTA Y CUMPLEAÑOS

  $('greeting').textContent =
    `Feliz cumpleaños, ${C.nombre}. ` +
    'Este pequeño universo es para ti, con todo mi amor.';

  $('letter').textContent = C.carta || '';
  $('signature').textContent = `Siempre tuyo, ${C.remitente} ♡`;

  document.querySelectorAll('.her-name').forEach(elemento => {
    elemento.textContent = C.nombre;
  });

  if (/^\d{4}-\d{2}-\d{2}$/.test(C.cumple || '')) {
    const [anio, mes, dia] = C.cumple.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    const hoy = new Date();

    if (
      fecha.getFullYear() === anio &&
      fecha.getMonth() === mes - 1 &&
      fecha.getDate() === dia
    ) {
      const dias = Math.round(
        (
          Date.UTC(anio, mes - 1, dia) -
          Date.UTC(
            hoy.getFullYear(),
            hoy.getMonth(),
            hoy.getDate()
          )
        ) / 86400000
      );

      $('countdown').hidden = false;

      $('countdown').textContent = dias > 0
        ? `Faltan ${dias} días para celebrarte ♡`
        : dias === 0
          ? '¡Hoy es tu día! ✨'
          : 'Tu vida merece celebrarse todos los días ♡';
    }
  }

  const mensajes = [
    ...(C.mensajes || []),
    ...(C.reflexiones || []).map(
      item => `${item.texto} — ${item.referencia}`
    )
  ];

  let ultimoMensaje = '';

  $('newMessage').addEventListener('click', () => {
    const opciones = mensajes.filter(
      texto => texto !== ultimoMensaje
    );

    ultimoMensaje = elegir(opciones.length ? opciones : mensajes) ||
      'Mi destino favorito siempre serás tú. ♡';

    $('loveMessage').textContent = ultimoMensaje;
  });

  for (const recuerdo of C.recuerdos || []) {
    if (!recuerdo.foto) continue;

    const figura = document.createElement('figure');
    const imagen = document.createElement('img');
    const texto = document.createElement('figcaption');

    imagen.src = recuerdo.foto;
    imagen.alt = recuerdo.texto || 'Nuestro recuerdo';
    imagen.loading = 'lazy';
    texto.textContent = recuerdo.texto || '';

    imagen.addEventListener('error', () => {
      imagen.hidden = true;
    });

    figura.append(imagen, texto);
    $('memories').append(figura);
  }

  if (C.fondoAriana) {
    const fondo = new Image();

    fondo.addEventListener('load', () => {
      document.querySelector('.music-banner').style.setProperty(
        '--ariana',
        `url(${JSON.stringify(fondo.src)})`
      );
    });

    fondo.src = C.fondoAriana;
  }

  // ÁLBUMES Y SUS BOTONES

  function crearPortada(album, detalle = false) {
    const contenedor = document.createElement('div');

    contenedor.className = detalle
      ? 'album-detail-cover'
      : 'cover';

    contenedor.style.setProperty(
      '--cover',
      album.color || '#a46d97'
    );

    if (!album.portada) {
      contenedor.textContent = album.titulo;
      return contenedor;
    }

    const imagen = document.createElement('img');

    imagen.src = album.portada;
    imagen.alt = `Portada de ${album.titulo}`;

    if (!detalle) contenedor.classList.add('has-image');

    imagen.addEventListener('error', () => {
      contenedor.classList.remove('has-image');
      contenedor.replaceChildren();
      contenedor.textContent = album.titulo;
    });

    contenedor.append(imagen);
    return contenedor;
  }

  function abrirAlbum(album) {
    $('albumTitle').textContent = album.titulo;
    $('songs').replaceChildren();

    $('songs').append(crearPortada(album, true));

    const nota = document.createElement('p');
    nota.className = 'album-note';
    nota.textContent = album.artista || 'Ariana Grande';

    $('songs').append(nota);

    (album.canciones || []).forEach((cancion, indice) => {
      const info = {
        ...cancion,
        artista: cancion.artista || album.artista || 'Ariana Grande',
        portada: cancion.portada || album.portada || ''
      };

      const fila = document.createElement('div');
      const numero = document.createElement('span');
      const titulo = document.createElement('strong');
      const escuchar = document.createElement('button');
      const letra = document.createElement('button');

      fila.className = 'song';
      numero.className = 'song-number';

      numero.textContent = String(indice + 1).padStart(2, '0');
      titulo.textContent = cancion.titulo;

      escuchar.textContent = '▶ Escuchar';
      escuchar.disabled = !cancion.archivo;

      function seleccionar() {
        document.querySelectorAll('.selected-song').forEach(item => {
          item.classList.remove('selected-song');
        });

        fila.classList.add('selected-song');
      }

      escuchar.addEventListener('click', () => {
        seleccionar();
        reproducir(info);
        abrirLetras();
      });

      letra.className = 'secondary';
      letra.textContent = 'Ver letra';

      letra.addEventListener('click', () => {
        seleccionar();

        if (!mismaRuta(audio.getAttribute('src'), info.archivo)) {
          reproducir(info);
        }

        abrirLetras();
      });

      fila.append(numero, titulo, escuchar, letra);
      $('songs').append(fila);
    });

    $('albumDialog').showModal();
  }

  for (const album of C.albums || []) {
    const boton = document.createElement('button');
    const informacion = document.createElement('div');
    const titulo = document.createElement('strong');
    const detalle = document.createElement('small');

    boton.className = 'album';
    informacion.className = 'album-info';

    titulo.textContent = album.titulo;
    detalle.textContent =
      `${album.canciones.length} canciones · ${album.artista}`;

    informacion.append(titulo, detalle);
    boton.append(crearPortada(album), informacion);

    boton.addEventListener('click', () => abrirAlbum(album));
    $('albums').append(boton);
  }

  document.querySelectorAll('[data-close]').forEach(boton => {
    boton.addEventListener('click', () => {
      $(boton.dataset.close).close();
    });
  });

  // PASTEL

  let velas = [];

  function reiniciarPastel() {
    velas = Array(5).fill(true);

    $('candles').replaceChildren();
    $('wish').textContent = '';
    $('blow').disabled = false;

    velas.forEach((_, indice) => {
      const boton = document.createElement('button');

      boton.className = 'candle';
      boton.textContent = '🕯️';
      boton.setAttribute('aria-label', `Apagar vela ${indice + 1}`);

      boton.addEventListener('click', () => apagarVela(indice));

      $('candles').append(boton);
    });
  }

  function apagarVela(indice) {
    if (!velas[indice]) return;

    velas[indice] = false;

    const boton = $('candles').children[indice];

    boton.classList.add('out');
    boton.disabled = true;
    boton.setAttribute('aria-label', `Vela ${indice + 1} apagada`);

    if (velas.every(encendida => !encendida)) {
      $('wish').textContent =
        'Que Dios cuide tus pasos y que tus sueños encuentren ' +
        'su camino. ¡Feliz cumpleaños, mi amor! ♡';

      $('blow').disabled = true;
      celebrar();
    }
  }

  $('blow').addEventListener('click', () => {
    velas.forEach((_, indice) => apagarVela(indice));
  });

  $('resetCake').addEventListener('click', reiniciarPastel);
  reiniciarPastel();

  // PEACH: REINO DE CORAZONES

  const canvas = $('game');
  const ctx = canvas.getContext('2d');

  const W = canvas.width;
  const H = canvas.height;
  const suelo = H - 42;
  const mundo = 3600;

  let jugando = false;
  let terminado = false;
  let victoria = false;
  let frameJuego = 0;
  let tiempoAnterior = 0;
  let camara = 0;
  let corazones = 0;
  let vidas = 3;
  let invulnerable = 0;

  let record = Number(storage.leer('peachRecord')) || 0;

  const teclas = new Set();

  const peach = {
    x: 60,
    y: suelo - 46,
    ancho: 30,
    alto: 46,
    vx: 0,
    vy: 0,
    apoyada: true,
    direccion: 1
  };

  const plataformas = [
    {
      x: 0,
      y: suelo,
      ancho: mundo,
      alto: 42,
      tipo: 'suelo'
    },

    ...[
      [320, 215, 170],
      [650, 175, 180],
      [1080, 210, 160],
      [1440, 170, 190],
      [1930, 200, 180],
      [2310, 165, 180],
      [2750, 195, 210]
    ].map(([x, y, ancho]) => ({
      x, y, ancho, alto: 20, tipo: 'bloque'
    })),

    ...[850, 1680, 2520, 3080].map(x => ({
      x,
      y: suelo - 52,
      ancho: 64,
      alto: 52,
      tipo: 'tuberia'
    }))
  ];

  let premios = [];
  let enemigos = [];

  function colision(a, b) {
    return (
      a.x < b.x + b.ancho &&
      a.x + a.ancho > b.x &&
      a.y < b.y + b.alto &&
      a.y + a.alto > b.y
    );
  }

  function marcadores() {
    const avance = Math.min(
      100,
      Math.floor(peach.x / (mundo - 140) * 100)
    );

    $('score').textContent =
      `Corazones: ${corazones} · Vidas: ${vidas} · Viaje: ${avance}%`;

    $('best').textContent = `Récord: ${record} corazones`;
  }

  function reiniciarJuego() {
    jugando = false;

    Object.assign(peach, {
      x: 60,
      y: suelo - 46,
      vx: 0,
      vy: 0,
      apoyada: true,
      direccion: 1
    });

    camara = 0;
    corazones = 0;
    vidas = 3;
    invulnerable = 0;
    terminado = false;
    victoria = false;
    teclas.clear();

    premios = Array.from({ length: 20 }, (_, i) => ({
      x: 200 + i * 160,
      y: suelo - 90,
      ancho: 22,
      alto: 22
    }));

    plataformas.filter(p => p.tipo === 'bloque').forEach(p => {
      premios.push({
        x: p.x + p.ancho / 2,
        y: p.y - 32,
        ancho: 22,
        alto: 22
      });
    });

    enemigos = [520, 1180, 1820, 2190, 2890, 3270].map(x => ({
      x,
      y: suelo - 26,
      ancho: 30,
      alto: 26,
      izquierda: x - 65,
      derecha: x + 65,
      vx: -65
    }));

    $('startGame').textContent = 'Comenzar aventura';
    $('gameStatus').textContent =
      'Recoge corazones y llega al castillo. ' +
      'Puedes saltar sobre los honguitos.';

    marcadores();
    dibujarJuego();
  }

  function saltar() {
    if (jugando && peach.apoyada) {
      peach.vy = -620;
      peach.apoyada = false;
    }
  }

  function rect(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), ancho, alto);
  }

  function dibujarPeach() {
    ctx.save();
    ctx.translate(
      Math.round(peach.x - camara),
      Math.round(peach.y)
    );

    if (peach.direccion < 0) {
      ctx.translate(30, 0);
      ctx.scale(-1, 1);
    }

    rect(7, 5, 19, 22, '#ffce53');
    rect(10, 9, 13, 14, '#ffe2ca');
    rect(10, 2, 15, 6, '#ffdf4f');
    rect(10, -2, 3, 5, '#ffdf4f');
    rect(16, -4, 3, 7, '#ffdf4f');
    rect(22, -2, 3, 5, '#ffdf4f');
    rect(16, 3, 3, 3, '#ec497b');
    rect(20, 13, 2, 3, '#313864');
    rect(9, 23, 16, 11, '#f761a3');
    rect(5, 32, 24, 10, '#f761a3');
    rect(2, 40, 29, 5, '#e8458e');
    rect(14, 25, 5, 4, '#48bdf5');
    rect(5, 25, 4, 10, '#fff4ee');
    rect(26, 25, 4, 10, '#fff4ee');

    const paso = jugando && peach.vx && peach.apoyada
      ? Math.sin(peach.x / 12) * 2
      : 0;

    rect(7, 45, 8, 3 + paso, '#c93671');
    rect(21, 45, 8, 3 - paso, '#c93671');

    ctx.restore();
  }

  function dibujarJuego() {
    if (!ctx) return;

    rect(0, 0, W, H, '#a7dfff');

    for (let i = 0; i < 7; i++) {
      const x =
        ((i * 210 - camara * 0.3) % (W + 210) + W + 210) %
        (W + 210) - 90;

      ctx.fillStyle = '#f6f9ff';
      ctx.beginPath();
      ctx.ellipse(x, 52 + (i % 2) * 32, 46, 16, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = i % 2 ? '#8ccc96' : '#70ba8b';
      ctx.beginPath();
      ctx.ellipse(
        x + 80,
        suelo + 18,
        150,
        94,
        0,
        Math.PI,
        Math.PI * 2
      );
      ctx.fill();
    }

    for (const p of plataformas) {
      const x = p.x - camara;

      if (x + p.ancho < 0 || x > W) continue;

      rect(
        x, p.y, p.ancho, p.alto,
        p.tipo === 'tuberia'
          ? '#36ae76'
          : p.tipo === 'bloque'
            ? '#df916c'
            : '#b97959'
      );

      if (p.tipo === 'suelo') {
        rect(x, p.y, p.ancho, 8, '#70c77e');

        for (
          let i = Math.max(0, Math.floor(camara / 32));
          i < Math.ceil((camara + W) / 32);
          i++
        ) {
          rect(i * 32 - camara, p.y + 17, 22, 3, '#d3986b');
        }
      }

      if (p.tipo === 'tuberia') {
        rect(x - 5, p.y, p.ancho + 10, 12, '#208958');
        rect(x + 8, p.y + 14, 7, p.alto - 14, '#83db96');
      }

      if (p.tipo === 'bloque') {
        for (let i = 0; i < p.ancho; i += 32) {
          rect(x + i, p.y, 2, p.alto, '#a66356');
          rect(x + i + 6, p.y + 5, 20, 3, '#ffcf96');
        }
      }
    }

    const castillo = mundo - 135 - camara;

    rect(castillo, suelo - 120, 95, 120, '#ffbbd4');
    rect(castillo - 12, suelo - 142, 30, 142, '#e98fbb');
    rect(castillo + 77, suelo - 142, 30, 142, '#e98fbb');

    ctx.fillStyle = '#a265b1';

    for (const x of [castillo - 12, castillo + 77]) {
      ctx.beginPath();
      ctx.moveTo(x - 6, suelo - 142);
      ctx.lineTo(x + 15, suelo - 180);
      ctx.lineTo(x + 36, suelo - 142);
      ctx.fill();
    }

    rect(castillo + 32, suelo - 43, 30, 43, '#814c85');

    ctx.font = '25px serif';
    ctx.fillText('💗', castillo + 32, suelo - 85);

    for (const premio of premios) {
      if (premio.x - camara > -30 && premio.x - camara < W) {
        ctx.font = '23px serif';
        ctx.fillText('💗', premio.x - camara, premio.y + 22);
      }
    }

    for (const enemigo of enemigos) {
      const x = enemigo.x - camara;

      rect(x, enemigo.y + 12, 30, 13, '#c78858');
      rect(x - 3, enemigo.y, 36, 14, '#ca6375');
      rect(x + 5, enemigo.y + 3, 6, 5, '#fff4d8');
      rect(x + 21, enemigo.y + 3, 5, 5, '#fff4d8');
      rect(x + 7, enemigo.y + 17, 3, 4, '#302340');
      rect(x + 20, enemigo.y + 17, 3, 4, '#302340');
    }

    if (
      invulnerable <= 0 ||
      Math.floor(invulnerable * 12) % 2 === 0
    ) {
      dibujarPeach();
    }

    if (!jugando) {
      rect(0, 0, W, H, '#32204b99');

      ctx.textAlign = 'center';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 27px system-ui';

      const mensaje = victoria
        ? '¡Llegaste al castillo, mi princesa! ♡'
        : terminado
          ? '¡Vamos por otra aventura!'
          : peach.x > 60
            ? 'Aventura en pausa'
            : 'Peach: Reino de corazones';

      ctx.fillText(mensaje, W / 2, H / 2 - 12);
      ctx.font = '17px system-ui';

      ctx.fillText(
        victoria
          ? `${corazones} corazones para nuestro amor`
          : '← → para moverte · Espacio para saltar',
        W / 2,
        H / 2 + 25
      );

      ctx.textAlign = 'left';
    }
  }

  function pausarJuego() {
    teclas.clear();

    if (!jugando) return;

    jugando = false;
    peach.vx = 0;
    cancelAnimationFrame(frameJuego);

    $('startGame').textContent = 'Continuar';
    $('gameStatus').textContent = 'Aventura en pausa.';

    dibujarJuego();
  }

  function terminarJuego(gano) {
    jugando = false;
    terminado = true;
    victoria = gano;
    teclas.clear();

    record = Math.max(record, corazones);
    storage.guardar('peachRecord', record);

    $('startGame').textContent = 'Jugar otra vez';

    $('gameStatus').textContent = gano
      ? `¡Peach llegó al castillo con ${corazones} corazones! ♡`
      : 'Te quedaste sin vidas. Vuelve a intentarlo, mi princesa.';

    marcadores();
    dibujarJuego();

    if (gano) celebrar();
  }

  function actualizarJuego(ahora) {
    if (!jugando) return;

    const dt = Math.min((ahora - tiempoAnterior) / 1000, 0.03);
    tiempoAnterior = ahora;

    invulnerable = Math.max(0, invulnerable - dt);

    peach.vx =
      ((teclas.has('derecha') ? 1 : 0) -
       (teclas.has('izquierda') ? 1 : 0)) * 240;

    if (peach.vx) peach.direccion = Math.sign(peach.vx);

    peach.x = Math.max(
      0,
      Math.min(mundo - peach.ancho, peach.x + peach.vx * dt)
    );

    for (const p of plataformas) {
      if (p.tipo !== 'suelo' && colision(peach, p)) {
        if (peach.vx > 0) peach.x = p.x - peach.ancho;
        if (peach.vx < 0) peach.x = p.x + p.ancho;
      }
    }

    const abajoAnterior = peach.y + peach.alto;
    const arribaAnterior = peach.y;

    peach.vy += 1550 * dt;
    peach.y += peach.vy * dt;
    peach.apoyada = false;

    for (const p of plataformas) {
      if (
        peach.x + peach.ancho <= p.x ||
        peach.x >= p.x + p.ancho
      ) {
        continue;
      }

      if (
        peach.vy >= 0 &&
        abajoAnterior <= p.y + 0.5 &&
        peach.y + peach.alto >= p.y
      ) {
        peach.y = p.y - peach.alto;
        peach.vy = 0;
        peach.apoyada = true;
      } else if (
        peach.vy < 0 &&
        arribaAnterior >= p.y + p.alto &&
        peach.y < p.y + p.alto
      ) {
        peach.y = p.y + p.alto;
        peach.vy = 0;
      }
    }

    premios = premios.filter(premio => {
      if (colision(peach, premio)) {
        corazones++;
        return false;
      }

      return true;
    });

    enemigos = enemigos.filter(enemigo => {
      enemigo.x += enemigo.vx * dt;

      if (
        enemigo.x < enemigo.izquierda ||
        enemigo.x > enemigo.derecha
      ) {
        enemigo.vx *= -1;
      }

      if (!colision(peach, enemigo)) return true;

      if (peach.vy > 0 && abajoAnterior <= enemigo.y + 10) {
        peach.vy = -360;
        corazones++;
        return false;
      }

      if (invulnerable <= 0) {
        vidas--;
        invulnerable = 1.8;
        peach.vy = -260;
      }

      return true;
    });

    camara = Math.max(
      0,
      Math.min(mundo - W, peach.x - W * 0.3)
    );

    marcadores();

    if (vidas <= 0) {
      terminarJuego(false);
      return;
    }

    if (peach.x >= mundo - 140) {
      terminarJuego(true);
      return;
    }

    dibujarJuego();
    frameJuego = requestAnimationFrame(actualizarJuego);
  }

  $('startGame').addEventListener('click', () => {
    if (!ctx) return;

    if (jugando) {
      pausarJuego();
      return;
    }

    if (terminado) reiniciarJuego();

    jugando = true;
    tiempoAnterior = performance.now();

    $('startGame').textContent = 'Pausar';
    $('gameStatus').textContent =
      '¡Vamos, Peach! El castillo te espera.';

    canvas.focus();
    frameJuego = requestAnimationFrame(actualizarJuego);
  });

  $('restartGame').addEventListener('click', () => {
    pausarJuego();
    reiniciarJuego();
  });

  $('jump').addEventListener('pointerdown', evento => {
    evento.preventDefault();
    saltar();
  });

  $('jump').addEventListener('click', evento => {
    if (evento.detail === 0) saltar();
  });

  for (const [id, direccion] of [
    ['moveLeft', 'izquierda'],
    ['moveRight', 'derecha']
  ]) {
    $(id).addEventListener('pointerdown', evento => {
      evento.preventDefault();
      $(id).setPointerCapture(evento.pointerId);
      teclas.add(direccion);
    });

    for (const tipo of [
      'pointerup',
      'pointercancel',
      'lostpointercapture'
    ]) {
      $(id).addEventListener(tipo, () => {
        teclas.delete(direccion);
      });
    }
  }

  canvas.addEventListener('pointerdown', evento => {
    evento.preventDefault();
    canvas.focus();
    saltar();
  });

  function direccionTecla(evento) {
    if (['ArrowLeft', 'KeyA'].includes(evento.code)) {
      return 'izquierda';
    }

    if (['ArrowRight', 'KeyD'].includes(evento.code)) {
      return 'derecha';
    }

    return null;
  }

  document.addEventListener('keydown', evento => {
    if (
      !sesion ||
      vista !== 'peach' ||
      document.querySelector('dialog[open]') ||
      ['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
    ) {
      return;
    }

    const direccion = direccionTecla(evento);

    if (direccion) {
      evento.preventDefault();
      teclas.add(direccion);
    }

    if (['Space', 'ArrowUp', 'KeyW'].includes(evento.code)) {
      evento.preventDefault();

      if (!evento.repeat) saltar();
    }
  });

  document.addEventListener('keyup', evento => {
    const direccion = direccionTecla(evento);
    if (direccion) teclas.delete(direccion);
  });

  window.addEventListener('blur', pausarJuego);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pausarJuego();
  });

  reiniciarJuego();

  // VUELO MÉXICO → NICARAGUA

  const escenaVuelo = document.querySelector('.flight-scene');
  const avion = $('plane');

  let volando = false;
  let frameVuelo = 0;
  let inicioVuelo = 0;
  let ultimoCorazon = 0;
  let ultimoIndiceMensaje = -1;
  let mensajesVuelo = [];

  const duracionVuelo = 24000;

  for (let i = 0; i < 24; i++) {
    const estrella = document.createElement('span');

    estrella.textContent = '✦';
    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.top = `${Math.random() * 65}%`;
    estrella.style.animationDelay = `${Math.random() * 3}s`;

    $('flightStars').append(estrella);
  }

  function cancelarVuelo() {
    cancelAnimationFrame(frameVuelo);
    volando = false;

    $('flightHearts').replaceChildren();
    $('takeoff').disabled = false;
    $('takeoff').textContent = 'Despegar 💗';
    $('flightProgress').value = 0;
    $('openProposal').hidden = true;

    avion.style.left = '10%';
    avion.style.bottom = '70px';
    avion.style.transform = 'rotate(-20deg)';

    $('flightMessage').textContent = 'Mi destino favorito eres tú.';
  }

  function corazonVuelo() {
    if (reducido.matches) return;

    const corazon = document.createElement('span');

    corazon.className = 'plane-love-trail';
    corazon.textContent = elegir(['♡', '💗', '💕']);
    corazon.style.left = avion.style.left;
    corazon.style.bottom = avion.style.bottom;

    $('flightHearts').append(corazon);
    setTimeout(() => corazon.remove(), 2300);
  }

  function actualizarVuelo(ahora) {
    if (!volando) return;

    const avance = Math.min(
      (ahora - inicioVuelo) / duracionVuelo,
      1
    );

    const altura = Math.max(
      45,
      Math.min(130, escenaVuelo.clientHeight - 180)
    );

    avion.style.left = `${10 + avance * 72}%`;

    avion.style.bottom = reducido.matches
      ? '90px'
      : `${70 + Math.sin(avance * Math.PI) * altura}px`;

    avion.style.transform = reducido.matches
      ? 'rotate(0deg)'
      : `rotate(${-22 * Math.cos(avance * Math.PI)}deg)`;

    $('flightProgress').value = avance * 100;

    const indice = Math.min(5, Math.floor(avance * 6));

    if (indice !== ultimoIndiceMensaje) {
      ultimoIndiceMensaje = indice;
      $('flightMessage').textContent = mensajesVuelo[indice];
    }

    if (ahora - ultimoCorazon > 350) {
      ultimoCorazon = ahora;
      corazonVuelo();
    }

    if (avance < 1) {
      frameVuelo = requestAnimationFrame(actualizarVuelo);
    } else {
      volando = false;
      avion.style.transform = 'rotate(0deg)';

      $('flightMessage').textContent =
        'Aterrizamos en Nicaragua. ' +
        'Mi corazón ya estaba aquí contigo. ♡';

      $('takeoff').disabled = false;
      $('takeoff').textContent = 'Volar otra vez 💗';
      $('openProposal').hidden = false;

      celebrar();
    }
  }

  $('takeoff').addEventListener('click', () => {
    if (volando) return;

    const bolsa = [...mensajes];

    for (let i = bolsa.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bolsa[i], bolsa[j]] = [bolsa[j], bolsa[i]];
    }

    mensajesVuelo = Array.from({ length: 6 }, (_, i) =>
      bolsa.length
        ? bolsa[i % bolsa.length]
        : 'De México a Nicaragua, todo mi amor viaja contigo. ♡'
    );

    volando = true;
    ultimoCorazon = 0;
    ultimoIndiceMensaje = -1;

    $('flightHearts').replaceChildren();
    $('openProposal').hidden = true;
    $('takeoff').disabled = true;
    $('takeoff').textContent = 'Volando hacia ti…';
    $('flightProgress').value = 0;

    inicioVuelo = performance.now();
    frameVuelo = requestAnimationFrame(actualizarVuelo);
  });

  // PROPUESTA

  let respuesta = '';
  let fechaRespuesta = '';

  $('openProposal').addEventListener('click', () => {
    $('proposal').showModal();
    reproducir(cancionPropuesta, 'propuesta');
  });

  $('proposal').addEventListener('close', () => {
    if (sesion && tipoMusica === 'propuesta') {
      volverAlFondo();
    }
  });

  function responder(acepta) {
    fechaRespuesta = new Date().toLocaleString('es-MX');

    respuesta = acepta
      ? 'Sí, quiero casarme contigo ♡'
      : 'Quiero que lo hablemos con calma y cariño 💌';

    $('answer').textContent = acepta
      ? 'Qué alegría imaginar una vida contigo. ' +
        'Quiero cuidar este amor, escucharte y construir ' +
        'nuestra historia un día a la vez. Te amo. ♡'
      : 'Gracias por abrir tu corazón. ' +
        'Quiero escucharte con todo el tiempo y cariño ' +
        'que mereces. Podemos hablarlo juntos. 💌';

    $('downloadAnswer').hidden = false;

    if (acepta) celebrar();
  }

  $('yes').addEventListener('click', () => responder(true));
  $('later').addEventListener('click', () => responder(false));

  $('downloadAnswer').addEventListener('click', () => {
    if (!respuesta) return;

    const contenido = [
      'Nuestra historia ♡',
      '',
      `De: ${C.nombre}`,
      `Para: ${C.remitente}`,
      '',
      respuesta,
      '',
      fechaRespuesta
    ].join('\n');

    const archivo = new Blob(
      [contenido],
      { type: 'text/plain;charset=utf-8' }
    );

    const url = URL.createObjectURL(archivo);
    const enlace = document.createElement('a');

    enlace.href = url;
    enlace.download = 'mi-respuesta-de-amor.txt';

    document.body.append(enlace);
    enlace.click();
    enlace.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  mostrarLetra(null);
})();