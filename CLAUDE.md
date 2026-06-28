# CLAUDE.md — Over het Spoor

Instructies voor Claude Code bij het werken aan deze repo.
Lees dit bestand volledig voor je code schrijft, aanpast of nieuwe content genereert.

---

## Projectoverzicht

**Over het Spoor** is een Nederlandstalige buurtgeschiedeniswebsite over Hilversum-Oost,
specifiek de wijk rondom het Dr. P.J.H. Cuypersplein. De site bestaat uit HTML-longreads
op GitHub Pages met GoatCounter voor privacyvriendelijke bezoekersstatistieken.

**Eigenaar/auteur:** Jan Mensen  
**Taal van alle content:** Nederlands  
**Platform:** GitHub Pages (statisch, geen build pipeline)  
**Analytics:** GoatCounter — account `derpy76`, cookieloos  
**Domein:** [vul in na DNS-propagatie]

---

## Repostructuur

```
/
├── index.html                      # enige pagina: hele verhaal, incl. tramhoofdstuk 'De Gooische Moordenaar'
├── [nieuwe pagina's hier]          # naamconventie: kebab-case, beschrijvend, .html
│                                   # (aparte verdiepingspagina, bijv. over de stoomtram, is een toekomstplan)
│
├── style.css                       # alle gedeelde stijlen en design tokens
├── script.js                       # animaties en scroll-reveal (zie Script)
│
└── images/
    ├── image-1.jpg                 # luchtfoto 1931, hero hoofdpagina
    ├── image-2.jpg t/m image-11.jpg # fotomateriaal hoofdpagina (zie Beeldregister)
    ├── Cuypers79.jpg
    ├── Hilversum Station Oud.jpg
    ├── JvdH_Cuypers_Panorama.jpeg
    ├── JvdH_Panorama.jpg
    ├── Mauve_Erfgooier.jpg
    ├── Moordenaar.jpg
    └── kaart_gooischenstoomtram.jpg
```

### Naamconventie afbeeldingen

Nieuwe afbeeldingen: `[onderwerp]-[jaar]-[bron].jpg`, bijv. `gasfabriek-1950-sha.jpg`.
De bestaande `image-N.jpg` bestanden mogen worden hernoemd zodra de herkomst bevestigd is,
mits alle `src=` verwijzingen in HTML tegelijk worden bijgewerkt.
Geen spaties in bestandsnamen.

---

## HTML-structuurpatroon per pagina

```html
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Paginatitel] — [Ondertitel]</title>

  <!-- Niet-renderblokkerend font laden -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;800&family=Spectral:ital,wght@0,400;0,500;1,400&family=Space+Mono:wght@400;700&display=swap"
        media="print" onload="this.media='all'">
  <noscript>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@500;700;800&family=Spectral:ital,wght@0,400;0,500;1,400&family=Space+Mono:wght@400;700&display=swap">
  </noscript>

  <link rel="stylesheet" href="style.css">
  <!-- Paginaspecifieke stijlen (signatuurmotief, extra tokens) in een <style> blok hier -->
</head>

  <!-- GoatCounter: staat vóór <body> op de hoofdpagina; houd dit consistent -->
  <script data-goatcounter="https://derpy76.goatcounter.com/count"
          async src="https://gc.zgo.at/count.js"></script>

<body>
<div class="wrap">

  <!-- HERO (zie Hero-sectie hieronder) -->
  <!-- TIMELINE (horizontaal scrollend, optioneel) -->
  <!-- LEDE (openingsalinea met dropcap) -->
  <!-- CHAPTERS als <section class="chapter"> of <section class="chapter band--dark"> -->
  <!-- NAMEN-sectie indien relevant -->
  <!-- OT-kaarten (herontwikkeling, diptych-grid) -->
  <!-- CREDITS / COLOFON (altijd als laatste sectie) -->
  <!-- FOOTER -->

</div>
<script src="script.js"></script>
</body>
</html>
```

**Let op:** GoatCounter-script staat op de hoofdpagina tussen `</head>` en `<body>`.
Houd dit consistent over nieuwe pagina's.

---

## Design system

### CSS custom properties (staan in `style.css`, niet herhalen in HTML)

```css
:root {
  --ink:          #211C18;
  --plaster:      #E8E0CE;
  --plaster-deep: #DED4BD;
  --brick:        #9E3B26;
  --brass:        #B6862C;
  --slate:        #36424A;
  --slate-deep:   #222B31;
  --oxide:        #6E7A5E;
  --line:         rgba(33,28,24,.18);
  --line-light:   rgba(232,224,206,.22);
  --measure:      64ch;
}
```

Paginaspecifieke tokens (bijv. `--rail: #4A3B2C` voor de trampage) horen in een
`<style>` blok in de `<head>` van die pagina, nooit in `style.css`.

### Typografie

| Rol | Font | Gewichten |
|-----|------|-----------|
| Koppen `h1`/`h2`/`h3` | Big Shoulders Display | 500, 700, 800 |
| Lopende tekst | Spectral | 400, 500, italic 400 |
| Datums, bijschriften, eyebrows | Space Mono | 400, 700 |

### Layout-klassen

```
.wrap      → position: relative; z-index: 1 (boven body::before)
.col       → max-width: 880px, auto margins, responsieve padding
.measure   → max-width: 64ch (leesbare proza-kolom)
```

---

## Componentbibliotheek (uit `style.css`)

Gebruik uitsluitend bestaande klassen. Voeg een nieuwe klasse toe aan `style.css`
alleen als geen bestaande klasse past.

### Structuur

| Klasse | Gebruik |
|--------|---------|
| `.hero` | Fullscreen hero met achtergrondafbeelding |
| `.hero__img` | De heroafbeelding (absolute, object-fit: cover) |
| `.hero__veil` | Gradient overlay over heroafbeelding |
| `.hero__emblem` | SVG-motief rechts boven (signatuur per pagina) |
| `.hero__eyebrow` | Locatie-aanduiding boven h1 |
| `.hero__sub` | Ondertitel onder h1 |
| `.hero__thesis` | Intro-stelling in de hero |
| `.hero__cap` | Bijschrift bij de heroafbeelding |
| `.timeline` | Horizontaal scrollende tijdlijn |
| `.timeline__track` | Flexcontainer binnen `.timeline` |
| `.tl` | Tijdlijn-item |
| `.tl__year` | Jaar in Space Mono/brass |
| `.tl__what` | Label bij het jaar |
| `.lede` | Openingssectie met grote tekst en dropcap |
| `section.chapter` | Standaard hoofdstuk (lichte achtergrond) |
| `section.chapter.band--dark` | Hoofdstuk op donkere achtergrond (slate) |
| `.chapter__head` | Kopdeel van een hoofdstuk |
| `.namen` | Namenregister-sectie (inktachtergrond) |
| `.credits` | Colofon/beeldverantwoording (slate-deep) |
| `footer.foot` | Voettekst |

### Typografie-hulpklassen

| Klasse | Gebruik |
|--------|---------|
| `.eyebrow` | Kleine gecapitaliseerde label (Space Mono, brick) |
| `.dropcap` | Op `<p>`: eerste letter wordt groot (via `::first-letter`) |

### Afbeeldingen

| Klasse | Gebruik |
|--------|---------|
| `figure` | Standaard afbeelding met bijschrift |
| `figcaption` | Bijschrift (Space Mono, brass-balk links) |
| `.gallery` | 2-koloms grid van figures |
| `.bleed` | Breedbeelds afbeelding zonder kolombeperking |

Altijd `loading="lazy"` op afbeeldingen buiten de hero.
Altijd een beschrijvende `alt`-tekst.

### Interactie-elementen

| Klasse | Gebruik |
|--------|---------|
| `.weetje` | Callout voor verrassende feiten (brick-balk links) |
| `.weetje__tag` | Label boven de weetje-tekst |
| `.diptych` | 2-koloms grid voor vergelijkingskaarten |
| `.ot` | Kaart binnen `.diptych` (van/naar herontwikkeling). Op een lichte sectie krijgt de rand automatisch de donkere `--line`-kleur via `.chapter:not(.band--dark) .ot`; op een `band--dark` sectie blijft de lichte rand. |
| `.ot__from` | Oorspronkelijke functie |
| `.ot__arrow` | Pijl (↓) |
| `.ot__to` | Huidige/toekomstige functie |
| `.reveal` | Element dat bij scroll infadet (via `script.js`) |

### Beeldverantwoording (in `.credits`)

| Klasse | Gebruik |
|--------|---------|
| `.creditlist` | `<ul>` met beeldcredits |
| `.cl-img` | Naam van de afbeelding |
| `.cl-row` | Regel met sleutel/waarde |
| `.cl-k` | Sleutelwoord (brass) |
| `.badge.free` | Badge: vrij met bronvermelding (groen) |
| `.badge.ask` | Badge: herkomst navragen (brass) |
| `.badge.own` | Badge: eigen collectie (warm) |

---

## Script (`script.js`)

Het script doet twee dingen:

1. **Scroll-reveal**: `IntersectionObserver` op alle `.reveal` elementen.
   Zodra een element 14% in beeld komt, krijgt het de klasse `.in` (triggert CSS-transitie).
   Voeg `.reveal` toe aan secties die je wilt laten infaden.

2. **Hero-emblem animatie**: De SVG-cirkels in `.hero__emblem .rings circle` animeren
   bij paginaload (scale + opacity). Dit werkt op de SVG-structuur van de hoofdpagina.
   Nieuwe paginamotieven met een andere SVG-structuur hebben dit stuk van het script
   mogelijk niet nodig of moeten het aanpassen.

Het script respecteert `prefers-reduced-motion`: bij die voorkeur worden alle
animaties uitgeschakeld via CSS, en de emblem-animatie wordt niet gestart.

---

## Beeldregister (index.html)

| Bestand | Gebruik in HTML | Alt-tekst (samengevat) |
|---------|-----------------|----------------------|
| `image-1.jpg` | Hero | Luchtfoto Hilversum Oost 1931 |
| `image-2.jpg` | Ansichtkaart Cuypersplein + kerk | |
| `image-3.jpg` | Ansichtkaart H. Hartkerk | |
| `image-4.jpg` | Ansichtkaart woningen Jan van Laren | |
| `sagvfoto3755.jpeg` | Luchtfoto ensemble: H. Hartkerk + St. Willibrordusschool (SAGV) | |
| `Willibrordus.jpg` | Vooraanzicht St. Willibrordusschool, 1928 | Bron: Het nieuws van den dag voor Nederlandsch-Indië, 10 november 1928 |
| `image-6.jpg` | Albert Heijn hoek Cuypersplein | |
| `image-7.jpg` | Luchtfoto ijzergieterij Ensink 1975 | |
| `image-8.jpg` | Luchtfoto gasfabriek met gashouders | |
| `image-9.jpg` | Politiepost/herenkapper Verbeek | |
| `image-10.jpg` | Ansichtkaart Jan van der Heijdenstraat | |
| `image-11.jpg` | Luchtfoto NSF-fabriek 1921 | |
| `Moordenaar.jpg` | Tramhoofdstuk: foto Gooische Stoomtram | |
| `kaart_gooischenstoomtram.jpg` | Tramhoofdstuk: netkaart Gooische Stoomtram | |
| `Mauve_Erfgooier.jpg` | Stuifzand-hoofdstuk: schilderij Anton Mauve (heide) | |
| `JvdH_Panorama.jpg` | Panorama Jan van der Heijdenstraat | |
| `JvdH_Cuypers_Panorama.jpeg` | Panorama richting Cuypersplein | |
| `Cuypers79.jpg` | Cuypersplein 1979 | |
| `hilversum-station-oud.jpg` | Oud stationsgebouw Hilversum | |

---

## Beeldverantwoording: regels

- Nooit een afbeelding plaatsen zonder rechtenstatus in de creditlist
- Rechtenstatus altijd als badge: `.badge.free`, `.badge.ask`, of `.badge.own`
- Onzeker over herkomst: badge `.ask`, nooit een aanname als feit
- Het bezitten van een fysieke afdruk geeft geen reproductierecht
- Archiefnummers vermelden waar beschikbaar
- Placeholder voor ontbrekende foto: vermeld in creditlist als "Geschikte afbeelding welkom"

---

## Redactionele principes

### Gebruik van `<strong>`

`<strong>` markeert eigennamen van gebouwen, straten, instellingen en personen bij hun **eerste substantiële introductie**, mits de naam herkenbaar is of was in de fysieke buurt.

Niet markeren: soortnamen (middenstandswoningen, appartementencomplex, gashouders), datums, namen die alleen in een opsomming passeren zonder verdere uitwerking. Als een persoons- en instellingsnaam in opeenvolgende zinnen dezelfde entiteit beschrijven, kies dan de instellingsnaam bij eerste introductie.

---

### Verboden

- **Uitgevonden causale verbanden**: schrijf nooit "X leidde tot Y" of "door X ontstond Y"
  tenzij aantoonbaar met een bron. Toeval en co-existentie zijn geen causaliteit.
- **Romantisering**: geen "levendige sfeer", "bruisende gemeenschap" zonder concrete onderbouwing.
- **Technisch jargon als narratief**: locomotiefnummers, motorspecificaties, fabrikantennamen
  horen niet in de hoofdtekst.
- **Gefabriceerde cross-links**: verwijs alleen naar andere pagina's als de inhoudelijke
  verbinding direct en aantoonbaar is.

### Vereist

- **Bronvermelding bij twijfel**: niet-verifieerbare claims worden gemarkeerd als
  "vermoedelijk" of "naar verluidt", of weggelaten. Meld het aan de auteur.
- **Feitelijke precisie**: datums, aantallen en namen controleren.
  Bij conflicterende bronnen: de meest specifieke bron wint.
- **Toegankelijkheid boven volledigheid**: een lezer zonder voorkennis moet de tekst
  kunnen volgen.

### Toon

- Geen bloemrijke inleidingen op hoofdstukken
- Feiten mogen voor zichzelf spreken
- `.weetje` callouts zijn toegestaan voor verrassende details, maar alleen als het
  detail aantoonbaar is
- Archiefbewijs hoort niet in de lopende tekst: noem het feit gewoon (jaartal, naam),
  en zet de onderbouwing (inventarisnummers, rekensommen, "zoals blijkt uit...") in de
  bronvermelding. Geen opsomming van jaartallen als technische notitie; de tekst blijft
  verhalend en toegankelijk

---

## Schrijftaal en stijl

- Alle content in **Nederlands**
- Geen em-streepjes (—): gebruik komma's, dubbele punten, of herschrijf de zin
- Vermijd "we/ons" als perspectief van buurt of auteur, tenzij expliciet geciteerd

---

## Wat Claude NIET zelfstandig mag beslissen

- Definitieve pagina- en hoofdstuktitels (opties voorstellen, keuze is aan de auteur)
- Welke foto's worden opgenomen (rechtenkwestie)
- Of een historisch verband causaal is (altijd voorleggen)
- Navigatiestructuur wijzigen zonder overleg
- Klassen toevoegen aan `style.css` zonder te melden dat dit een uitbreiding is

---

## Git-workflow (Windows, Git Bash)

```bash
git add .
git commit -m "Beschrijf de wijziging concreet"
git push
```

Eerste push nieuwe branch: `git push -u origin main`

---

## Werkwijze bij aanpassingen

Benoem altijd kort wat je gaat veranderen voordat je een edit uitvoert.

## Onderhoud van dit bestand

Bij elke sessie waarbij nieuwe afbeeldingen, CSS-klassen of pagina's worden toegevoegd: meld aan het einde dat CLAUDE.md bijgewerkt moet worden.

---

*Laatste update: juni 2026*
