/*!
 * Black Monkey — Página "Armá tu pack x3" (remeras básicas)
 *
 * Se dibuja SOLO dentro de una página de contenido que tenga este HTML:
 *     <div id="bm-pack3"></div>
 * En el resto de la tienda (fichas, inicio, carrito) no hace nada.
 *
 * IMPORTANTE: el descuento lo aplica la promoción de Tienda Nube ("pack x3 basicas").
 * Si cambiás el % de la promo, cambialo también acá en descuentoPct.
 *
 * Configuración: tocar solo el bloque CONFIG.
 */
!function () {
  "use strict";

  var CONFIG = {
    cantidad: 3,
    precioUnitario: 38990,
    descuentoPct: 15,           // debe coincidir con la promoción de Tienda Nube
    talles: ["S", "M", "L", "XL", "XXL", "XXXL"],
    // id de producto en Tienda Nube + valor exacto de la propiedad "Color"
    colores: [
      { nombre: "Negro",  productId: 177517049, hex: "#111111", foto: "negro" },
      { nombre: "Blanco", productId: 178520790, hex: "#f4f1ea", foto: "blanco" },
      { nombre: "Gris",   productId: 178520881, hex: "#4a4a49", foto: "gris" },
      { nombre: "Rojo",   productId: 178520027, hex: "#b3000c", foto: "rojo" },
      { nombre: "Azul",   productId: 178520684, hex: "#0b4fc0", foto: "azul" }
    ],
    medidas: [ // ancho × largo en cm (de la guía de talles de las básicas)
      ["S", 47, 68], ["M", 50, 71], ["L", 54, 73], ["XL", 57, 77], ["XXL", 60, 81], ["XXXL", 62, 83]
    ],
    irAlCarrito: "/comprar/"
  };

  var ID = "bm-pack3";
  // Las fotos están en la carpeta img/ del mismo repo que este archivo
  var SRC = (document.currentScript && document.currentScript.src) || "";
  var IMG = SRC.replace(/[^\/]*$/, "") + "img/";
  function foto(c) { return IMG + "remera-" + c.foto + ".webp"; }
  function detalle(c) { return IMG + "detalle-" + c.foto + ".webp"; }
  var ORO = "#f0c63a";

  function pesos(n) {
    return "$" + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function remera(hex, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 100 100" aria-hidden="true">' +
      '<path d="M34 9 L41 6 Q50 15 59 6 L66 9 L91 23 L82 41 L73 36 L73 93 L27 93 L27 36 L18 41 L9 23 Z" ' +
      'fill="' + hex + '" stroke="rgba(255,255,255,.22)" stroke-width="1.4" stroke-linejoin="round"/>' +
      '<path d="M41 6 Q50 15 59 6" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="1.6"/></svg>';
  }

  function estilos() {
    if (document.getElementById(ID + "-styles")) return;
    var P = "#" + ID;
    var css = [
      P + "{--oro:" + ORO + ";--crema:#f0ece2;--gris:#9b968c;--card:#121212;--linea:rgba(240,236,226,.12);" +
        "color:var(--crema);font-family:inherit;max-width:1100px;margin:0 auto;padding:8px 0 40px;text-align:left;}",
      P + " *{box-sizing:border-box;}",
      P + " p{margin:0;}",
      P + " .bmp-k{display:inline-block;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--oro);}",

      /* hero */
      P + " .bmp-hero{text-align:center;padding:28px 16px 34px;border-bottom:1px solid var(--linea);}",
      P + " .bmp-h1{font-size:clamp(30px,6vw,52px);line-height:1.05;font-weight:800;color:#fff;margin:10px 0 12px;letter-spacing:-.5px;}",
      P + " .bmp-h1 span{color:var(--oro);}",
      P + " .bmp-lead{font-size:16px;line-height:1.5;color:var(--crema);opacity:.85;max-width:560px;margin:0 auto;}",
      P + " .bmp-fila{display:flex;justify-content:center;gap:clamp(4px,2vw,18px);margin:26px 0 6px;}",
      P + " .bmp-fila{gap:0;margin:28px auto 8px;max-width:760px;}",
      P + " .bmp-fila img{width:24%;max-width:190px;height:auto;margin:0 -2.5%;filter:drop-shadow(0 10px 18px rgba(0,0,0,.7));}",
      P + " .bmp-fila img:nth-child(1),#" + ID + " .bmp-fila img:nth-child(5){transform:translateY(14px) scale(.9);}",
      P + " .bmp-fila img:nth-child(2),#" + ID + " .bmp-fila img:nth-child(4){transform:translateY(5px) scale(.96);}",
      P + " .bmp-fila img:nth-child(3){position:relative;z-index:2;}",
      P + " .bmp-fila img:nth-child(2),#" + ID + " .bmp-fila img:nth-child(4){z-index:1;position:relative;}",
      P + " .bmp-tag{display:inline-flex;gap:8px;align-items:center;margin-top:18px;background:var(--oro);color:#000;" +
        "font-weight:800;font-size:14px;padding:8px 16px;border-radius:50px;}",

      /* armador */
      P + " .bmp-arma{padding:34px 16px 10px;}",
      P + " .bmp-h2{font-size:clamp(22px,4vw,30px);font-weight:800;color:#fff;margin:6px 0 18px;}",
      P + " .bmp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}",
      P + " .bmp-card{background:var(--card);border:1px solid var(--linea);border-radius:16px;padding:16px;transition:border-color .15s;}",
      P + " .bmp-card.ok{border-color:rgba(240,198,58,.55);}",
      P + " .bmp-card-top{display:flex;align-items:center;gap:12px;margin-bottom:14px;}",
      P + " .bmp-prev{width:72px;height:72px;flex:none;border-radius:12px;background:#1d1d1d;display:flex;align-items:center;justify-content:center;overflow:hidden;}",
      P + " .bmp-prev svg{width:48px;height:48px;opacity:.6;}",
      P + " .bmp-prev img{width:64px;height:auto;display:block;}",
      P + " .bmp-num{font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--gris);}",
      P + " .bmp-sel{font-size:15px;font-weight:700;color:#fff;}",
      P + " .bmp-sel.falta{color:var(--gris);font-weight:400;}",
      P + " .bmp-lbl{font-size:12px;color:var(--gris);margin:0 0 7px;}",
      P + " .bmp-colors{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:14px;}",
      P + " .bmp-color{width:30px;height:30px;border-radius:50%;border:2px solid #4a4a4a;cursor:pointer;padding:0;transition:transform .1s;}",
      P + " .bmp-color[aria-pressed=true]{border-color:var(--oro);box-shadow:0 0 0 2px var(--card) inset;transform:scale(1.12);}",
      P + " .bmp-sizes{display:grid;grid-template-columns:repeat(6,1fr);gap:5px;}",
      P + " .bmp-size{height:34px;border-radius:9px;border:1px solid #4a4a4a;background:transparent;color:var(--crema);" +
        "font-size:12px;font-family:inherit;cursor:pointer;padding:0;}",
      P + " .bmp-size[aria-pressed=true]{background:var(--crema);border-color:var(--crema);color:#000;font-weight:700;}",

      /* resumen */
      P + " .bmp-res{margin-top:16px;background:#0b0b0b;border:1px solid var(--oro);border-radius:16px;padding:16px 18px;" +
        "display:flex;align-items:center;flex-wrap:wrap;gap:12px 20px;}",
      P + " .bmp-precios{display:flex;align-items:baseline;flex-wrap:wrap;gap:4px 12px;flex:1 1 220px;}",
      P + " .bmp-old{text-decoration:line-through;color:var(--gris);font-size:15px;}",
      P + " .bmp-new{font-size:30px;font-weight:800;color:#fff;}",
      P + " .bmp-save{font-size:13px;font-weight:700;color:var(--oro);width:100%;}",
      P + " .bmp-btn{flex:1 1 260px;height:54px;border:0;border-radius:50px;background:var(--oro);color:#000;font-size:16px;" +
        "font-weight:800;font-family:inherit;cursor:pointer;letter-spacing:.2px;}",
      P + " .bmp-btn[disabled]{background:#2e2e2e;color:#9a9a9a;cursor:not-allowed;}",
      P + " .bmp-msg{width:100%;font-size:13px;text-align:center;}",
      P + " .bmp-msg:empty{display:none;}",
      P + " .bmp-msg.err{color:#ff8a80;}",

      /* bloques de info */
      P + " .bmp-sec{padding:38px 16px 0;}",
      P + " .bmp-cal{display:grid;grid-template-columns:auto minmax(0,1fr);gap:22px;align-items:start;}",
      P + " .bmp-cal-foto{width:360px;position:relative;}",
      P + " .bmp-det{width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:16px;display:block;background:#1d1d1d;}",
      P + " .bmp-tabs{position:absolute;left:8px;right:8px;bottom:8px;display:flex;flex-wrap:wrap;justify-content:center;gap:4px;" +
        "padding:6px;border-radius:50px;background:rgba(0,0,0,.62);backdrop-filter:blur(4px);}",
      P + " .bmp-tab{display:inline-flex;align-items:center;gap:5px;height:28px;padding:0 9px;border-radius:50px;border:1px solid #4a4a4a;" +
        "background:transparent;color:var(--crema);font-size:12px;font-family:inherit;cursor:pointer;}",
      P + " .bmp-tab i{width:12px;height:12px;border-radius:50%;border:1px solid rgba(255,255,255,.35);}",
      P + " .bmp-tab[aria-pressed=true]{border-color:var(--oro);color:#fff;font-weight:700;}",
      P + " .bmp-feats{display:grid;gap:10px;}",
      P + " .bmp-feat{display:flex;gap:12px;align-items:flex-start;background:var(--card);border:1px solid var(--linea);border-radius:14px;padding:14px 16px;}",
      P + " .bmp-feat b{display:block;color:#fff;font-size:15px;margin:0 0 3px;}",
      P + " .bmp-feat p{font-size:13px;line-height:1.45;color:var(--gris);}",
      P + " .bmp-ico{font-size:22px;}",
      P + " .bmp-tabla{width:100%;border-collapse:collapse;font-size:14px;max-width:520px;}",
      P + " .bmp-tabla th,#" + ID + " .bmp-tabla td{padding:10px 8px;border-bottom:1px solid var(--linea);text-align:center;}",
      P + " .bmp-tabla th{color:var(--oro);font-size:12px;letter-spacing:1px;text-transform:uppercase;}",
      P + " .bmp-tabla td:first-child{font-weight:700;color:#fff;}",
      P + " .bmp-nota{font-size:13px;color:var(--gris);margin-top:10px;}",
      P + " .bmp-trust{display:flex;flex-wrap:wrap;justify-content:center;gap:10px 28px;padding:30px 16px 0;margin-top:38px;" +
        "border-top:1px solid var(--linea);font-size:14px;}",
      P + " .bmp-trust span{white-space:nowrap;}",
      P + " .bmp-cierre{text-align:center;font-size:20px;font-weight:800;color:#fff;padding-top:26px;}",

      P + ".bmp-angosto .bmp-cal{grid-template-columns:1fr;}" + P + ".bmp-angosto .bmp-cal-foto{width:auto!important;}",
      "@media (max-width:860px){" + P + " .bmp-grid{grid-template-columns:1fr;}" + P + " .bmp-cal{grid-template-columns:1fr;}" +
        P + " .bmp-cal-foto{width:auto!important;}" +
        P + " .bmp-tabs{position:static;background:none;backdrop-filter:none;padding:0;margin-top:10px;justify-content:flex-start;}" +
        P + " .bmp-tab{padding:0 8px;font-size:11px;gap:4px;}}",
      "@media (max-width:420px){" + P + " .bmp-res{padding:14px;}" + P + " .bmp-new{font-size:26px;}}"
    ];
    var s = document.createElement("style");
    s.id = ID + "-styles";
    s.textContent = css.join("\n");
    document.head.appendChild(s);
  }

  function render(root) {
    var C = CONFIG;
    var total = C.precioUnitario * C.cantidad;
    var conDesc = total * (1 - C.descuentoPct / 100);
    var sel = [];
    for (var i = 0; i < C.cantidad; i++) sel.push({ color: null, talle: null });

    var html = "";

    // HERO
    html += '<section class="bmp-hero"><span class="bmp-k">Línea Premium · Remeras básicas</span>' +
      '<h2 class="bmp-h1">Armá tu pack <span>x' + C.cantidad + '</span></h2>' +
      '<p class="bmp-lead">Tres remeras lisas, los colores y talles que quieras. ' +
      'Jersey 100% algodón 24/1, costuras reforzadas y calce regular. Lo básico, bien hecho.</p><div class="bmp-fila">';
    for (var h = 0; h < C.colores.length; h++) {
      html += '<img src="' + foto(C.colores[h]) + '" alt="Remera básica ' + C.colores[h].nombre.toLowerCase() + '" loading="eager">';
    }
    html += '</div><span class="bmp-tag">' + C.descuentoPct + '% OFF · Ahorrás ' + pesos(total - conDesc) + '</span></section>';

    // ARMADOR
    html += '<section class="bmp-arma"><span class="bmp-k">Paso a paso</span><h3 class="bmp-h2">Elegí tus 3 remeras</h3><div class="bmp-grid">';
    for (var r = 0; r < C.cantidad; r++) {
      html += '<div class="bmp-card" data-row="' + r + '"><div class="bmp-card-top"><div class="bmp-prev">' + remera("#2a2a2a") + '</div>' +
        '<div><p class="bmp-num">Remera ' + (r + 1) + '</p><p class="bmp-sel falta">Elegí color y talle</p></div></div>' +
        '<p class="bmp-lbl">Color</p><div class="bmp-colors">';
      for (var c = 0; c < C.colores.length; c++) {
        var col = C.colores[c];
        html += '<button type="button" class="bmp-color" data-color="' + c + '" aria-pressed="false" aria-label="' +
          col.nombre + '" title="' + col.nombre + '" style="background:' + col.hex + '"></button>';
      }
      html += '</div><p class="bmp-lbl">Talle</p><div class="bmp-sizes">';
      for (var t = 0; t < C.talles.length; t++) {
        html += '<button type="button" class="bmp-size" data-talle="' + C.talles[t] + '" aria-pressed="false">' + C.talles[t] + '</button>';
      }
      html += '</div></div>';
    }
    html += '</div><div class="bmp-res"><div class="bmp-precios"><span class="bmp-old">' + pesos(total) + '</span>' +
      '<span class="bmp-new">' + pesos(conDesc) + '</span><span class="bmp-save">Ahorrás ' + pesos(total - conDesc) +
      ' · el descuento se aplica solo en el carrito</span></div>' +
      '<button type="button" class="bmp-btn"></button><p class="bmp-msg"></p></div></section>';

    // POR QUÉ
    var feats = [
      ["🧵", "Jersey 100% algodón 24/1", "Telas de primera calidad, de textura suave y liviana."],
      ["🪡", "Overlock de 4 hilos", "Toda la prenda armada con costuras de seguridad reforzadas."],
      ["👕", "Cuello de rib fino al tono", "Prolijo, del mismo color que la remera."],
      ["💪", "Tirilla hombro a hombro", "Refuerzo con hilo de algodón para que no se deforme."],
      ["✂️", "Tapacostura fino 2 agujas", "En mangas y cintura, con hilo de algodón."]
    ];
    html += '<section class="bmp-sec"><span class="bmp-k">Por qué estas remeras</span><h3 class="bmp-h2">Calidad que se nota al tacto</h3>' +
      '<div class="bmp-cal"><div class="bmp-cal-foto"><img class="bmp-det" src="' + detalle(C.colores[0]) + '" alt="Detalle de cuello, hombro y costuras">' +
      '<div class="bmp-tabs" role="tablist">';
    for (var d = 0; d < C.colores.length; d++) {
      html += '<button type="button" class="bmp-tab" data-det="' + d + '" aria-pressed="' + (d === 0) + '">' +
        '<i style="background:' + C.colores[d].hex + '"></i>' + C.colores[d].nombre + '</button>';
    }
    html += '</div></div><div class="bmp-feats">';
    for (var f = 0; f < feats.length; f++) {
      html += '<div class="bmp-feat"><span class="bmp-ico">' + feats[f][0] + '</span><div><b>' + feats[f][1] + '</b><p>' + feats[f][2] + '</p></div></div>';
    }
    html += '</div></div></section>';

    // TALLES
    html += '<section class="bmp-sec"><span class="bmp-k">Guía de talles</span><h3 class="bmp-h2">Encontrá tu talle</h3>' +
      '<table class="bmp-tabla"><thead><tr><th>Talle</th><th>Ancho</th><th>Largo</th></tr></thead><tbody>';
    for (var m = 0; m < C.medidas.length; m++) {
      html += '<tr><td>' + C.medidas[m][0] + '</td><td>' + C.medidas[m][1] + ' cm</td><td>' + C.medidas[m][2] + ' cm</td></tr>';
    }
    html += '</tbody></table><p class="bmp-nota">Medí una remera que ya tengas sobre una superficie plana: de axila a axila (ancho) ' +
      'y del hombro hasta abajo (largo). Si dudás entre dos talles, elegí el más grande.</p></section>';

    // CONFIANZA
    html += '<div class="bmp-trust"><span>🚚 Envíos a todo el país</span><span>⚡ Fabricada para vos</span>' +
      '<span>🏷️ ' + C.descuentoPct + '% OFF automático</span><span>⭐ Miles de clientes confían en BlackMonkey</span></div>' +
      '<p class="bmp-cierre">Lo básico, bien hecho.</p>';

    root.innerHTML = html;

    var btn = root.querySelector(".bmp-btn");
    var msg = root.querySelector(".bmp-msg");
    var ocupado = false;

    function pintar() {
      var faltante = null;
      for (var i = 0; i < sel.length; i++) {
        var card = root.querySelector('.bmp-card[data-row="' + i + '"]');
        var s = sel[i];
        var b = card.querySelectorAll(".bmp-color");
        for (var c = 0; c < b.length; c++) b[c].setAttribute("aria-pressed", s.color === c ? "true" : "false");
        var tz = card.querySelectorAll(".bmp-size");
        for (var t = 0; t < tz.length; t++) tz[t].setAttribute("aria-pressed", tz[t].getAttribute("data-talle") === s.talle ? "true" : "false");
        var prev = card.querySelector(".bmp-prev");
        var clave = s.color !== null ? String(s.color) : "";
        if (prev.getAttribute("data-c") !== clave) {
          prev.setAttribute("data-c", clave);
          prev.innerHTML = s.color !== null
            ? '<img src="' + foto(C.colores[s.color]) + '" alt="Remera ' + C.colores[s.color].nombre.toLowerCase() + '">'
            : remera("#2a2a2a");
        }
        var etiqueta = card.querySelector(".bmp-sel");
        var completo = s.color !== null && !!s.talle;
        etiqueta.textContent = completo ? C.colores[s.color].nombre + " · " + s.talle
          : s.color !== null ? C.colores[s.color].nombre + " · elegí talle"
          : s.talle ? "Talle " + s.talle + " · elegí color" : "Elegí color y talle";
        etiqueta.className = "bmp-sel" + (completo ? "" : " falta");
        card.className = "bmp-card" + (completo ? " ok" : "");
        if (faltante === null && !completo) faltante = "Elegí " + (s.color === null ? "color" : "talle") + " de la remera " + (i + 1);
      }
      if (ocupado) return;
      btn.disabled = faltante !== null;
      btn.textContent = faltante || "Agregar pack al carrito";
    }

    root.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("button") : null;
      if (!b || ocupado) return;
      if (b.classList.contains("bmp-tab")) {
        var d = parseInt(b.getAttribute("data-det"), 10);
        root.querySelector(".bmp-det").src = detalle(C.colores[d]);
        var tabs = root.querySelectorAll(".bmp-tab");
        for (var x = 0; x < tabs.length; x++) tabs[x].setAttribute("aria-pressed", x === d ? "true" : "false");
        return;
      }
      var card = b.closest(".bmp-card");
      if (card) {
        var i = parseInt(card.getAttribute("data-row"), 10);
        if (b.classList.contains("bmp-color")) sel[i].color = parseInt(b.getAttribute("data-color"), 10);
        if (b.classList.contains("bmp-size")) sel[i].talle = b.getAttribute("data-talle");
        msg.textContent = "";
        msg.className = "bmp-msg";
        pintar();
        return;
      }
      if (b === btn && !btn.disabled) agregar();
    });

    function agregar() {
      // Agrupar remeras iguales (mismo color y talle) en una sola línea con cantidad
      var grupos = {}, orden = [];
      for (var i = 0; i < sel.length; i++) {
        var k = sel[i].color + "|" + sel[i].talle;
        if (!grupos[k]) { grupos[k] = { color: C.colores[sel[i].color], talle: sel[i].talle, qty: 0 }; orden.push(k); }
        grupos[k].qty++;
      }
      ocupado = true;
      btn.disabled = true;
      btn.textContent = "Agregando…";
      msg.textContent = "";
      msg.className = "bmp-msg";

      var paso = 0;
      function siguiente() {
        if (paso >= orden.length) {
          btn.textContent = "¡Listo! Yendo al carrito…";
          window.location.href = C.irAlCarrito;
          return;
        }
        var g = grupos[orden[paso++]];
        var fd = new FormData();
        fd.append("add_to_cart", g.color.productId);
        fd.append("variation[0]", g.talle);
        fd.append("variation[1]", g.color.nombre);
        fd.append("quantity", g.qty);
        fd.append("add_to_cart_enhanced", "1");
        fetch("/comprar/", {
          method: "POST",
          body: fd,
          credentials: "same-origin",
          headers: { "X-Requested-With": "XMLHttpRequest" }
        }).then(function (r) { return r.json(); }).then(function (j) {
          if (!j || !j.success) throw new Error("sin éxito");
          siguiente();
        }).catch(function () {
          ocupado = false;
          msg.className = "bmp-msg err";
          msg.textContent = paso > 1
            ? "Se agregó parte del pack. Revisá tu carrito o intentá de nuevo."
            : "No pudimos agregar el pack. Intentá de nuevo.";
          pintar();
        });
      }
      siguiente();
    }

    // La foto de "Calidad" mide lo mismo que la lista de características de al lado
    function ajustarFoto() {
      var wrap = root.querySelector(".bmp-cal-foto");
      var feats = root.querySelector(".bmp-feats");
      if (!wrap) return;
      var angosto = root.offsetWidth < 760;
      root.classList.toggle("bmp-angosto", angosto);
      if (angosto) { wrap.style.width = ""; return; }
      // varias pasadas: al cambiar el ancho de la foto cambia el alto de la lista
      for (var n = 0; n < 4; n++) wrap.style.width = Math.max(240, Math.round(feats.offsetHeight)) + "px";
    }
    ajustarFoto();
    setTimeout(ajustarFoto, 400);
    setTimeout(ajustarFoto, 1500);   // por si la tipografía carga tarde
    window.addEventListener("resize", ajustarFoto);
    var det = root.querySelector(".bmp-det");
    if (det) det.addEventListener("load", ajustarFoto);

    pintar();
  }

  function init() {
    var root = document.getElementById(ID);
    if (!root || root.getAttribute("data-listo")) return;
    root.setAttribute("data-listo", "1");
    // El tema pone el contenido de las páginas en una columna angosta: la ensanchamos solo en esta página
    var col = root.closest('[class*="col-md-"],[class*="col-lg-"]');
    if (col) { col.style.flex = "0 0 100%"; col.style.maxWidth = "100%"; }
    estilos();
    render(root);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}();
