### Sveučilište Jurja Dobrile u Puli

### Prijediplomski sveučilišni studij Informatika

# Projektna dokumentacija: Image Quiz

**Ime i prezime studenta:** Igor Pavlić  
**JMBAG:** 0069012453  


**7. rujna 2025.**



## 1. Sažetak

Ovaj rad predstavlja projektnu dokumentaciju za web aplikaciju "Image Quiz" razvijenu u Vue.js tehnologiji. Aplikacija predstavlja edukativnu platformu koja kombinira umjetnu inteligenciju i gamifikaciju u svrhu učenja engleskih riječi. Sustav omogućava korisnicima pogađanje riječi na temelju AI-generiranih slika, praćenje napretka kroz bodovni sustav te natjecanje s drugim korisnicima. Implementacija uključuje Firebase autentifikaciju, Firestore bazu podataka te integraciju s DeepAI API servisom. Aplikacija razlikuje tri razine korisničkih privilegija: gost, registrirani korisnik i administrator, pri čemu svaka razina ima definirane funkcionalnosti.

## 2. Uvod

Tradicionalne metode učenja riječi često se oslanjaju na mehaničko memoriranje koje ne potiče dugoročno zadržavanje znanja. Istraživanja pokazuju da vizualno učenje značajno poboljšava retenciju informacija, posebno kada je kombinirano s interaktivnim elementima.

Image Quiz aplikacija razvija se kao odgovor na potrebu za modernijim pristupom učenju. Ciljano tržište obuhvaća obrazovne institucije, samostalne učenike te sve koji žele poboljšati svoj vokabular kroz interaktivnu metodu. Aplikacija se oslanja na moderne web tehnologije što omogućava pristup s bilo kojeg uređaja s internetskom vezom, bez potrebe za instalacijom.

Glavne prednosti ovog rješenja uključuju automatsko generiranje vizualnog sadržaja pomoću umjetne inteligencije, što eliminira potrebu za ručnim stvaranjem materijala. Sustav bodovanja i highscore lista uvode element natjecanja koji povećava motivaciju korisnika. Firebase backend osigurava skalabilnost i pouzdanost sustava.

## 3. Motivacija

### 3.1 Analiza tržišta

Trenutno tržište edukativnih aplikacija dominiraju platforme poput Duolingo, Memrise i Quizlet. Međutim, analiza postojećih rješenja pokazuje nedostatak aplikacija koje kombiniraju AI-generirane vizualne elemente s učenjem riječi.

Quizlet omogućava stvaranje flashcard setova ali zahtijeva ručno dodavanje slika. Memrise kombinira vizualne elemente ali ne koristi AI tehnologiju za dinamičko generiranje sadržaja.

### 3.2 SWOT analiza

**Snage:**
- Kombinacija AI tehnologije i obrazovnog sadržaja
- Automatsko generiranje slika eliminira potrebu za ručnim radom
- Firebase infrastruktura omogućava skalabilnost bez velikih početnih investicija
- Jednostavno korisničko sučelje prilagođeno svim dobnim skupinama
- Real-time sinkronizacija podataka između korisnika

**Slabosti:**
- Ovisnost o vanjskom API servisu (DeepAI) predstavlja potencijalni point of failure
- Kvaliteta generiranih slika ovisi o AI modelu koji se kontinuirano mijenja
- Ograničen broj besplatnih API poziva mjesečno
- Aplikacija zahtijeva stalnu internetsku vezu

**Prilike:**
- Rastući trend digitalizacije u obrazovanju, posebno nakon pandemije
- Mogućnost proširenja na više jezika i predmetnih područja
- Potencijal za B2B suradnju s obrazovnim institucijama
- Integracija s postojećim LMS sustavima

**Prijetnje:**
- Ulazak velikih tech kompanija na tržište edukativnih aplikacija
- Promjene u cijenama API servisa mogu učiniti projekt neisplativim
- Brz razvoj AI tehnologije može učiniti trenutno rješenje zastarjelim
- GDPR i drugi regulatorni zahtjevi za aplikacije koje rade s djecom

### 3.3 Predispozicije za implementaciju

Za uspješno uvođenje aplikacije potrebno je osigurati:
- Stabilan web hosting s HTTPS certifikatom
- Firebase projekt s aktiviranim Authentication i Firestore servisima
- DeepAI API ključ s dovoljnim brojem kredita
- Minimalno jedan administrator za upravljanje sadržajem

### 3.4 Dionici sustava

Koristi od aplikacije imaju:
- **Učenici/studenti**: poboljšanje vokabulara kroz zabavnu metodu učenja
- **Obrazovne institucije**: moderna nastavna pomagala bez dodatnih troškova
- **Roditelji**: alat za pomoć djeci u učenju

## 4. Razrada funkcionalnosti

### 4.1 Skupine korisnika i njihove privilegije

Sustav razlikuje tri razine korisnika:

**Gost (neautentificirani korisnik):**
- Pregled početne stranice
- Registracija novog računa
- Prijava postojećim računom

**Igrač (autentificirani korisnik):**
- Igranje kviza
- Pregled osobnih rezultata
- Pregled highscore liste
- Odjava iz sustava

**Administrator (vlasnik sustava):**
- Sve funkcionalnosti igrača
- Dodavanje novih riječi u bazu
- Brisanje postojećih riječi
- Pregled statistike korištenja

### 4.2 Use Case dijagram

```mermaid
flowchart TD
    subgraph Sistema["Image Quiz Sustav"]
        Gost([Gost]):::gost
        Igrac([Igrač]):::igrac
        Admin([Administrator]):::admin
        
        Registracija[Registracija]:::usecase
        Prijava[Prijava]:::usecase
        IgrajKviz[Igraj kviz]:::usecase
        GenerirajSliku[Generiraj sliku]:::usecase
        PregledBodova[Pregled bodova]:::usecase
        Highscore[Highscore]:::usecase
        DodajRijeci[Dodaj riječi]:::usecase
        
        Gost --> Registracija
        Gost --> Prijava
        
        Igrac --> IgrajKviz
        Igrac --> PregledBodova
        Igrac --> Highscore
        
        IgrajKviz -.includes.-> GenerirajSliku
        
        Admin --> IgrajKviz
        Admin --> PregledBodova
        Admin --> Highscore
        Admin --> DodajRijeci
    end
    
    GenerirajSliku --> API[DeepAI API]:::external
    
    classDef gost fill:#f9f,stroke:#333,stroke-width:2px,color:#000
    classDef igrac fill:#99f,stroke:#333,stroke-width:2px,color:#000
    classDef admin fill:#9f9,stroke:#333,stroke-width:2px,color:#000
    classDef external fill:#ff9,stroke:#333,stroke-width:2px,color:#000
```

### 4.3 Komunikacija s vanjskim sustavima

Aplikacija komunicira s dva vanjska sustava:

**Firebase (Google):**
- Authentication za upravljanje korisnicima
- Firestore za pohranu podataka
- Komunikacija putem Firebase SDK-a

**DeepAI:**
- Text-to-image API za generiranje slika
- REST API komunikacija
- Autentifikacija putem API ključa

### 4.4 Ključni korisnički scenarij - Igranje kviza

```mermaid
---
config:
  layout: elk
---
flowchart TD
    Start(["Početak aplikacije"]) --> AuthCheck{"Autentikacija?"}
    AuthCheck -- U tijeku --> LoadingState["Loading..."]
    LoadingState --> AuthCheck
    AuthCheck -- Nije prijavljen --> ModeCheck{"Mode?"}
    ModeCheck -- Login --> LoginScreen["Login forma"]
    ModeCheck -- Register --> RegisterScreen["Register forma"]
    LoginScreen --> EnterLoginData["Unos podataka"] & ToggleToRegister["Prebaci na Register"]
    EnterLoginData --> AttemptLogin{"Ispravno?"}
    AttemptLogin -- Da --> SetUser["Postavi korisnika"]
    AttemptLogin -- Ne --> LoginError["Greška"]
    LoginError --> EnterLoginData
    ToggleToRegister --> RegisterScreen
    RegisterScreen --> EnterRegisterData["Unos podataka"] & ToggleToLogin["Prebaci na Login"]
    EnterRegisterData --> AttemptRegister{"Ispravno?"}
    AttemptRegister -- Da --> SetUser
    AttemptRegister -- Ne --> RegisterError["Greška"]
    RegisterError --> EnterRegisterData
    ToggleToLogin --> LoginScreen
    AuthCheck -- Prijavljen --> LoadData["Učitavanje podataka"]
    SetUser --> LoadData
    LoadData --> DataProvider["DataProvider"] & ShowUser["Prikaz korisnika"] & HighscoreComponent["Highscore"]
    DataProvider --> LoadWords["Dohvat riječi"] & SetupImageFetcher["Priprema image fetchera"]
    LoadWords --> DataCheck{"Podaci spremni?"}
    SetupImageFetcher --> DataCheck
    DataCheck -- Da --> ShowQuiz["Prikaz kviza"]
    DataCheck -- Ne --> WaitForData["Čekanje"]
    WaitForData --> DataCheck
    ShowQuiz --> QuizFlow["Quiz proces"]
    ShowUser --> LogoutButton["Gumb za odjavu"] & AdminCheck{"Admin?"}
    LogoutButton --> Logout["Odjava"]
    Logout --> AuthCheck
    AdminCheck -- Da --> AdminPanel["Admin panel"]
    AdminCheck -- Ne --> SkipAdmin["SkipAdmin"]
    AdminPanel --> AddWords["Dodavanje riječi"]
    AddWords --> ProcessWords["Obrada riječi"]
    ProcessWords --> UpdateDB["Ažuriranje baze"]
    UpdateDB --> SuccessMessage["SuccessMessage"]
    HighscoreComponent --> ViewScores["Pregled rezultata"]
    ViewScores --> LoadScores["Učitavanje rezultata"]
    LoadScores --> DisplayScores["DisplayScores"]
    QuizFlow --> LoadUserScore["Učitavanje bodova"]
    LoadUserScore --> NewImage["Nova slika"]
    NewImage --> GenerateImage["Generiranje slike"]
    GenerateImage --> DisplayImage["Prikaz slike"]
    DisplayImage --> UserInput["Unos odgovora"]
    UserInput --> CheckAnswer{"Točno?"}
    CheckAnswer -- Da --> CorrectAnswer["Točan odgovor"]
    CheckAnswer -- Ne --> WrongAnswer["Netočan odgovor"]
    CorrectAnswer --> AddPoint["Dodaj bod"]
    AddPoint --> NextImage["Sljedeća slika"]
    WrongAnswer --> NextImage
    NextImage --> NewImage
     Start:::green
     LoginScreen:::blue
     RegisterScreen:::blue
     LoginError:::red
     RegisterError:::red
     HighscoreComponent:::purple
     ShowQuiz:::yellow
     Logout:::red
     AdminPanel:::purple
     NewImage:::orange
     DisplayImage:::yellow
     CheckAnswer:::orange
    classDef green fill:#9f6,stroke:#333,stroke-width:2px,color:#000
    classDef red fill:#f66,stroke:#333,stroke-width:2px,color:#000
    classDef blue fill:#69f,stroke:#333,stroke-width:2px,color:#000
    classDef orange fill:#f96,stroke:#333,stroke-width:2px,color:#000
    classDef yellow fill:#ff6,stroke:#333,stroke-width:2px,color:#000
    classDef purple fill:#c9f,stroke:#333,stroke-width:2px,color:#000
```

### 4.5 Prototip sučelja

**Početni ekran (Login.vue):**
- Minimalistički dizajn s fokusom na funkcionalnost
- Polja za email i lozinku
- Gumbovi za prijavu i registraciju
- Toggle između Login i Register modova

**Glavni ekran (QuizView.vue):**
- Centrirana slika generirana od AI-ja
- Polje za unos odgovora
- Prikaz trenutnih bodova
- Vizualna povratna informacija (✅/❌)

**Admin panel:**
- Tekstualno polje za unos riječi
- Gumb za dodavanje
- Lista trenutnih riječi

**Highscore lista:**
- Top 10 igrača
- Označavanje trenutnog korisnika
- Prikaz dodatnog ranga ako korisnik nije u top 10

### 4.6 Class dijagram

```mermaid
classDiagram
    class App {
        <<VueComponent>>
        +components
        +setup()
        +template
    }

    class Header {
        <<VueComponent>>
        +props
        +template
    }

    class Footer {
        <<VueComponent>>
        +template
    }

    class Login {
        <<VueComponent>>
        +data()
        +methods: handleLogin()
        +template
    }

    class Register {
        <<VueComponent>>
        +data()
        +methods: handleRegister()
        +template
    }

    class QuizView {
        <<VueComponent>>
        +data()
        +methods: loadQuestions(), submitAnswer(), nextQuestion()
        +template
    }

    class Highscore {
        <<VueComponent>>
        +data()
        +methods: fetchHighscores()
        +template
    }

    class AdminPanel {
        <<VueComponent>>
        +data()
        +methods: addQuiz(), deleteUser(), viewStats()
        +template
    }

    class DataProvider {
        <<VueService>>
        +methods: fetchData(), saveData()
    }

    %% Odnosi
    App --> Header
    App --> Footer
    App --> Login
    App --> Register
    App --> QuizView
    App --> Highscore
    App --> AdminPanel
    QuizView --> DataProvider
    Highscore --> DataProvider
    AdminPanel --> DataProvider
```

## 5. Implementacija

### 5.1 Arhitektura aplikacije

Aplikacija koristi komponentnu arhitekturu Vue.js frameworka s jasno definiranom hijerarhijom:

```
App.vue (root komponenta)
├── Header.vue (naslov aplikacije)
├── Auth komponente
│   ├── Login.vue (prijava korisnika)
│   └── Register.vue (registracija)
├── DataProvider.vue (podatkovni sloj)
├── QuizView.vue (glavna logika igre)
├── AdminPanel.vue (admin funkcionalnosti)
├── Highscore.vue (prikaz rezultata)
└── Footer.vue (copyright informacije)
```

### 5.2 Ključna funkcionalnost - Generiranje i provjera kviza

Implementacija kviza odvija se kroz nekoliko povezanih komponenti:

**DataProvider.vue** služi kao centralni podatkovni sloj:
- Dohvaća riječi iz Firestore baze
- Upravlja komunikacijom s DeepAI API-jem
- Emitira događaje prema parent komponenti

**QuizView.vue** implementira glavnu logiku:
```javascript
class QuizView {
  // Props
  - wordList: Array<string>
  - fetchImage: Function
  
  // Data
  - imageUrl: string
  - correctWord: string
  - userAnswer: string
  - result: string
  - score: number
  - isLoading: boolean
  
  // Methods
  + loadScore(): Promise<void>
  + loadNewImage(): Promise<void>
  + checkAnswer(): Promise<void>
  + handleEnterPress(): void
}
```

### 5.3 Firebase integracija

```javascript
class FirebaseService {
  // Konfiguracija
  - config: FirebaseConfig
  - auth: Auth
  - db: Firestore
  
  // Auth metode
  + signInWithEmailAndPassword()
  + createUserWithEmailAndPassword()
  + signOut()
  + onAuthStateChanged()
  
  // Firestore metode
  + collection()
  + doc()
  + getDocs()
  + setDoc()
  + updateDoc()
  + addDoc()
}
```

### 5.4 Popis komponenti i njihovih funkcionalnosti

| Komponenta | Funkcionalnost | Ulazni parametri | Emitira |
|------------|---------------|------------------|---------|
| Login.vue | Prijava korisnika | - | authenticated, toggle |
| Register.vue | Registracija | - | authenticated, toggle |
| DataProvider.vue | Dohvaćanje podataka | - | wordsLoaded, imageFetcherReady |
| QuizView.vue | Glavni kviz | wordList, fetchImage | - |
| AdminPanel.vue | Admin panel | - | refresh |
| Highscore.vue | Prikaz rezultata | - | - |
| Header.vue | Naslov | - | - |
| Footer.vue | Podnožje | - | - |

## 6. Korisničke upute

### 6.1 Registracija i prva prijava

Pri prvom pokretanju aplikacije prikazuje se ekran za prijavu. 

![Login](./images/login.png)

Novi korisnici trebaju:

![Registracija](./images/register.png)

1. Kliknuti na "No Account? Register!"
2. Unijeti važeću email adresu
3. Unijeti lozinku (minimalno 6 znakova)
4. Kliknuti "Register"
5. Sustav automatski prijavljuje korisnika

### 6.2 Igranje kviza

Nakon uspješne prijave, kviz se automatski učitava:

![Glavna stranica](./images/main1.png)

1. **Pričekajte generiranje slike** - prikazuje se "Generating image..." poruka
2. **Analizirajte sliku** - pokušajte prepoznati što slika predstavlja
3. **Unesite odgovor** - upišite riječ u polje "Write here"
4. **Potvrdite odgovor** - kliknite "Check"
5. **Provjerite rezultat**:
   - ✅ Correct! - dodaje se 1 bod
   - ❌ Wrong. Correct answer: [riječ] - nema bodova
  
![Bodovi](./images/main2.png)

6. **Nova runda** - automatski se učitava nakon 1 sekunde

### 6.3 Pregled rezultata

Highscore lista dostupna je klikom na "🏆 View Highscores":

![High Score](./images/highscore1.png)

- Prikazuje top 10 igrača
- Vaš rezultat označen je drugom bojom
- Ako niste u top 10, vaš rang prikazuje se na dnu
- Lista se automatski osvježava

![High Score Lista](./images/highscore2.png)

### 6.4 Administratorske funkcije

Samo korisnik s email adresom koju postavimo u aplikaciji ima pristup admin panelu:

![Admin](./images/admin.png)

1. **Otvaranje panela** - klik na "➕ Add Words"
2. **Unos riječi** - upisati riječi odvojene zarezom ili razmakom
3. **Potvrda** - klik na "Add Words"
4. **Provjera** - pojavljuje se ✅ Words Added!

![Add Words](./images/addwords.png)

Sustav automatski:
- Pretvara sve riječi u mala slova
- Uklanja duplikate
- Ignorira riječi kraće od 2 slova

### 6.6 Odjava iz sustava

Za odjavu jednostavno kliknite gumb "Log Out" na dnu ekrana. Sustav će vas vratiti na ekran za prijavu.

![logout](./images/logout.png)



