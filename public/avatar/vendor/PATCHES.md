# Parches sobre las dependencias vendorizadas

Generado por `scripts/vendor_avatar_embed.mjs` del repo del avatar 3D. **No edites a mano**:
vuelve a ejecutar el script.

## `talkinghead/talkinghead.mjs` — soporte de meshopt

`@met4citizen/talkinghead` (MIT, Mika Suominen) construye su `GLTFLoader` dentro de
`showAvatar()` y solo le inyecta `DRACOLoader`, sin exponerlo. Un GLB con
`EXT_meshopt_compression` falla al cargar.

Draco no es alternativa: **no comprime morph targets**, que son el 57 % del peso de este
avatar (7,99 MB de 13,93 MB). Con meshopt el GLB pasa de 13,93 MB a 1,50 MB conservando los
53 nodos que `showAvatar()` exige y los 15 `viseme_*`.

Dos añadidos:

1. `import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';`
2. `loader.setMeshoptDecoder( MeshoptDecoder );` junto al `setDRACOLoader` existente.

El decoder son ~6,9 KB con el WASM inline en base64: cero peticiones extra.
