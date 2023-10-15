Az egész frontend rész React-ban készült, amit az npm-en keresztül tudsz elérni. 

Tehát miután lecopyztad a repot, ahhoz hogy elindítsd a következő parancsokat kell lefuttatnod terminálon:
(FONTOS, HOGY EZEKET CSAK A LOCALHOST MIATT KELL LEFUTTATNOD, A VÉGEREDMÉNYT FELRAKJUK EGY WEBSZERVERRE!!!
MÁSIK FONTOS INFÓ, HOGY AZ ALÁBBI HELP RÉSZLEG WINDOWS-RA KÉSZÜLT KIFEJEZETTEN, HA LINUXON TOLOD ÉS NEM MŰKÜDIK ÚGY AHOGY LEÍRTAM, AZÉRT FELELŐSSÉGET NEM VÁLLALOK!!)

- a terminálban a ..\truckdriver_frontend mappában kell lenned. Ha nem ott vagy akkor "cd /truckdriver_frontend" parancsot futtasd le.

- Amennyiben nincs npm és node.js a gépeden, akkor vagy nagy bajban kisfiam. Csekkold le az "npm --version" és a "node --version" parancs lefuttatásával. Ha a legfrissebb 10.1.0 és v20.7.0 verziót dobja ki akkor rendben vagy. Ha nem akkor netről kurvagyorsan töltsd le. (egy oldalon van mindkettő, ha leszeded a node.js-t akkor jön vele általában az npm is.)

- Kell hogy legyen a gépeden a NextJS, NextUI, TailwindCSS, Framer Motion, React-Router-Dom
Az alábbi commandokat írd be cmd-be (itt is nyilván a projekt mappába kell rakni).:
 - npm i @nextui-org/react framer-motion
 - npm install -D tailwindcss
 - npx tailwindcss init
 - npm install react-router-dom
Ha valami nem jó vagy nem megy szólj.
