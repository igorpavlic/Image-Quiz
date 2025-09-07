# 🧠 Image Quiz

Interaktivna web kviz igra koja izaziva igrače da prepoznaju AI-generirane slike. Izgrađena s Vue.js 3 i podržana Firebase-om za autentifikaciju i pohranu podataka.

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=flat&logo=vue.js&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-9.x-FFCA28?style=flat&logo=firebase&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)

## 🎮 Kako funkcionira

Igračima se prikazuju AI-generirane slike i moraju pogoditi koji objekt ili koncept slika predstavlja. Igra koristi DeepAI text-to-image API za generiranje jedinstvenih slika na temelju pažljivo odabrane liste riječi pohranjene u Firebase-u.

## ✨ Značajke

- 🔐 **Autentifikacija korisnika** - Siguran sustav prijave/registracije putem Firebase Auth
- 🎨 **AI generiranje slika** - Dinamičko stvaranje slika koristeći DeepAI API
- 🏆 **Sustav najboljeg rezultata** - Globalna ljestvica s rangiranjem igrača
- ⚡ **Bodovanje u stvarnom vremenu** - Trenutna povratna informacija i ažuriranje bodova
- 👨‍💼 **Administratorski panel** - Jednostavno upravljanje riječima za administratore
- 📱 **Responzivan dizajn** - Besprijekorno radi na desktop i mobilnim uređajima
- 🎯 **Interaktivno sučelje** - Čisto, intuitivno sučelje s animacijama učitavanja

## 🚀 Demo uživo

[Igrajte igru ovdje!](#) <!-- Dodajte svoj URL za deployment -->

## 🛠️ Tehnološki stack

- **Frontend**: Vue.js 3 (Composition API)
- **Backend**: Firebase (Firestore baza podataka, Autentifikacija)
- **AI servis**: DeepAI Text-to-Image API
- **Stiliziranje**: Prilagođeni CSS s responzivnim dizajnom
- **Alat za izgradnju**: Vite

## 📦 Instalacija

### Preduvjeti

- Node.js (v16 ili viši)
- npm ili yarn
- Firebase projekt
- DeepAI API ključ

### Postavljanje

1. **Klonirajte repozitorij**
   ```bash
   git clone https://github.com/igorpavlic/image-quiz.git
   cd image-quiz
   ```

2. **Instalirajte ovisnosti**
   ```bash
   npm install
   ```

3. **Konfigurirajte varijable okruženja**
   
   Stvorite `.env` datoteku u root direktoriju:
   ```env
   # Firebase konfiguracija
   VITE_FIREBASE_API_KEY=vaš_firebase_api_ključ
   VITE_FIREBASE_AUTH_DOMAIN=vaš_projekt.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=vaš_projekt_id
   VITE_FIREBASE_STORAGE_BUCKET=vaš_projekt.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=vaš_sender_id
   VITE_FIREBASE_APP_ID=vaš_app_id

   # DeepAI API
   VITE_DEEPAI_API_KEY=vaš_deepai_api_ključ
   ```

4. **Firebase postavljanje**
   - Stvorite kolekcije u Firestore-u:
     - `words` - za pohranu riječi kviza
     - `users` - za korisničke profile i bodove
   
   Primjer strukture dokumenta riječi:
   ```json
   {
     "word": "primjer_riječi"
   }
   ```

5. **Pokrenite razvojni server**
   ```bash
   npm run dev
   ```

## 🎯 Korištenje

### Za igrače
1. **Registrirajte se/Prijavite se** s emailom i lozinkom
2. **Počnite igrati** - Slike će se automatski generirati
3. **Upišite vaš odgovor** i pritisnite Enter ili kliknite Provjeri
4. **Pratite svoj rezultat** - Bodovi se spremaju u stvarnom vremenu
5. **Pogledajte ljestvicu** - Vidite kako se rangirate protiv drugih igrača

### Za administratore
- Administratorski pristup dodjeljuje se konfiguriranom email vlasnika
- Koristite **Administratorski panel** za dodavanje novih riječi u bazu kviza
- Riječi se mogu dodavati u skupinama, odvojene zarezima ili razmakom

## 📁 Struktura projekta

```
src/
├── components/
│   ├── AdminPanel.vue      # Upravljanje riječima admin
│   ├── DataProvider.vue    # Dohvaćanje podataka i API pozivi
│   ├── Footer.vue          # Podnožje aplikacije
│   ├── Header.vue          # Zaglavlje aplikacije
│   ├── Highscore.vue       # Prikaz ljestvice
│   ├── Login.vue           # Forma za prijavu korisnika
│   ├── QuizView.vue        # Glavno sučelje igre
│   └── Register.vue        # Forma za registraciju korisnika
├── assets/
│   └── main.css           # Globalni stilovi
├── firebase.js            # Firebase konfiguracija
├── App.vue               # Root komponenta
└── main.js              # Ulazna točka aplikacije
```

## 🔧 Konfiguracija

### Administratorski pristup
Postavite email vlasnika u `App.vue`:
```javascript
const ownerEmail = 'admin@mail.com'
```

### Firestore sigurnosna pravila
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Za ljestvicu
    }
    match /words/{wordId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.email == 'vaš-admin-email@domena.com';
    }
  }
}
```

## 🚀 Deployment

### Izgradnja za razvoj
```bash
npm run dev
```

### Izgradnja za produkciju
```bash
npm run build
```

## 📝 Licenca

Ovaj projekt je licenciran pod MIT licencom - pogledajte [LICENSE](LICENSE) datoteku za detalje.

## 👨‍💻 Autor

**Igor Pavlić**
- GitHub: [@igorpavlic](https://github.com/igorpavlic)
- Email: ipavlic@hotmail

## 🎓 Akademske informacije

**[Fakultet informatike u Puli](https://fipu.unipu.hr/)**
- Kolegij: **[Programsko inženjerstvo](https://ntankovic.unipu.hr/pi)**
- Mentor: **[doc. dr. sc. Nikola Tanković](https://ntankovic.unipu.hr)**

## 🙏 Zahvale

- [DeepAI](https://deepai.org/) za API za generiranje slika
- [Firebase](https://firebase.google.com/) za backend servise
- [Vue.js](https://vuejs.org/) za reaktivni framework
- [VS Code](https://code.visualstudio.com/) za kodiranje
- [Claude AI](https://claude.ai/) za sve :)
