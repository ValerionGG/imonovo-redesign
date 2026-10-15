// project/*.dc.html (canvas Design) → docs/*.html (site statique GitHub Pages). Usage : node build.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs'

const BLOBS = {
  '70234912acd2555e4445a4716a50660e': 'az-tile-pattern', '800b05172b5269f409a5e19998b2cf7f': 'az-tile-sage', '76c34f3c2b1e3229396b3b11d992694c': 'az-tile-teal',
  '973c69f43e705287bb39e1ad7ab05e71': 'bedroom-arch', '7520f5b05da56ff039596cea79e44a2c': 'boardwalk', '0fc0cb2ce98b407948e36bd94f61e1a7': 'cliff-mist',
  '0815be946a554aecd03a7b68d2726073': 'cliffs-sea', '85481456be8127f98fb4328de1fb0da1': 'coast-dusk', 'fb6b1ad8f8aba1ce9b9d383b77f42533': 'coast-village',
  '1edd01da763cd1e8d147c50943422e23': 'countryside-fog', '0f0ec96be62eca61ccacfeb37b3d5c9f': 'house-white', '95e9caff6145bfa6c7e26ab9695b3cce': 'int-bath',
  'acc247b59fa38b9eae4764b12c68fc96': 'int-bedroom', 'a76ca0a39a8f83db6e61ae17768505f3': 'int-dining', 'a076e2a86c8302b915e1a267d77c782a': 'int-kitchen',
  '20e15a9994c85d55758735e1e0def5de': 'int-living', 'a37a3a84ca63b8b042ceb1bbffe7eab5': 'int-lounge', '40a67a6970706058521aa013402fbdbd': 'int-marble',
  'ca4394eb53412cb20b0e67d2a2b5948f': 'kitchen-white', '06872540b36e2aff9a8cde1cbe60e41e': 'lagoa-aerial', 'bf2af96472f41929ff5adb3a3b33ab4b': 'nazare-beach',
  '3bbaf656c2de244d990c6b5d952c5c6e': 'nazare-sunset', '5f047355be5fb2b239d29fa7c83db142': 'obidos-blue', 'bb457c9f3424597cb772a842f195dbee': 'obidos-castle',
  '98172db190b8f34b86e979f508b1f228': 'obidos-door-blue', '71068089e71fb2000aa48dee9ad06b62': 'obidos-dusk', '6eda0c3a0fe7495d8d0db4629fa591d8': 'obidos-roofs',
  'f597766173c931e01e878e7513489f3c': 'obidos-street', '190c5b49663579c2051f7a56374cbab6': 'obidos-walls', '43a1a4cb26fa0e061665e6ea4e7479c8': 'p-ines',
  '1c7889bca3670467e66a65b2056d5ded': 'p-julien', '990fec5a20ad67059d812785288d075b': 'p-marc', '19cd7f8636e2aa29f335c99c7a69234e': 'p-sofia',
  '53acbc910ef770b91ff3672bf14e5336': 'pool-sea', '2a9bc4805a6fbf1a0607ea9dc2a7e054': 'sea-dusk', '9831f1d347baeed6548357113988f7e7': 'terrace-sea',
  'c6771783e0f22c17c5c3511093eb4339': 'villa-arcades', '3cf659bed43e5ca778d0f3df7c56486b': 'villa-infinity', 'ff34c1294cc844b14c6b7026e0b4ff6f': 'villa-modern-pool',
  'b1d11c5ba1386a68d24d93c6d30f0934': 'villa-pool', '6c143c21f750eba585c1cabb58394f4c': 'villa-white', '5619f2a66d4edbff5e027d591b3dd193': 'villa-yellow-pool',
  'e9b5697a63b5c0818b3655c243dee632': 'villas-aerial', '6f84d1d8fb1ddd20b230dabfee258702': 'white-blue-house', '3ef5a16210b554a38dca48f8d6eec990': 'white-lane',
}

mkdirSync('docs/assets', { recursive: true })
for (const f of readdirSync('assets')) copyFileSync(`assets/${f}`, `docs/assets/${f}`)

const fix = (s) => s
  .replace(/\/_blob\/([0-9a-f]{32})/g, (m, id) => { if (!BLOBS[id]) throw new Error(`blob inconnu ${id}`); return `assets/${BLOBS[id]}.webp` })
  .replace(', depois abra-a em modo Play.', ', depois abra-a.')
  .replace(/Main\.dc\.html/g, 'index.html')
  .replace(/\.dc\.html/g, '.html')

let n = 0
for (const f of readdirSync('project').filter((x) => x.endsWith('.dc.html'))) {
  const src = readFileSync(`project/${f}`, 'utf8')
  const a = src.indexOf('<x-dc>'), b = src.lastIndexOf('</x-dc>')
  const script = src.match(/<script type="text\/x-dc" data-dc-script[\s\S]*?<\/script>/)
  if (a < 0 || b < 0 || !script) throw new Error(`format inattendu : ${f}`)
  const tpl = src.slice(a + 6, b)
  if (/<\/script/i.test(tpl)) throw new Error(`</script> dans le gabarit : ${f}`)
  const title = (src.match(/<title>([\s\S]*?)<\/title>/) || [, 'Imonovo'])[1]
  const lang = (src.match(/<html lang="([^"]+)"/) || [, 'pt'])[1]
  const out = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<script src="vendor/preact.min.js"></script>
<script src="dc.js"></script>
</head>
<body>
<div id="dc-root"></div>
<script type="text/x-dc-template" id="dc-template">${fix(tpl)}</script>
${fix(script[0])}
</body>
</html>
`
  writeFileSync(`docs/${f === 'Main.dc.html' ? 'index.html' : f.replace('.dc.html', '.html')}`, out)
  n++
}
writeFileSync('docs/.nojekyll', '')
console.log(`${n} pages → docs/`)
