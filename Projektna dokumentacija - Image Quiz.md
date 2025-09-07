# Projektna dokumentacija: Image Quiz

## 1. Sažetak

Ovaj rad predstavlja projektnu dokumentaciju za web aplikaciju "Image Quiz" razvijenu u Vue.js tehnologiji. Aplikacija predstavlja edukativnu platformu koja kombinira umjetnu inteligenciju i gamifikaciju u svrhu učenja vokabulara. Sustav omogućava korisnicima pogađanje riječi na temelju AI-generiranih slika, praćenje napretka kroz bodovni sustav te natjecanje s drugim korisnicima. Implementacija uključuje Firebase autentifikaciju, Firestore bazu podataka te integraciju s DeepAI API servisom. Aplikacija razlikuje tri razine korisničkih privilegija: gost, registrirani korisnik i administrator, pri čemu svaka razina ima definirane funkcionalnosti.

## 2. Uvod

Tradicionalne metode učenja vokabulara često se oslanjaju na mehaničko memoriranje koje ne potiče dugoročno zadržavanje znanja. Istraživanja pokazuju da vizualno učenje značajno poboljšava retenciju informacija, posebno kada je kombinirano s interaktivnim elementima.

Image Quiz aplikacija razvija se kao odgovor na potrebu za modernijim pristupom učenju. Ciljano tržište obuhvaća obrazovne institucije, samostalne učenike te sve koji žele poboljšati svoj vokabular kroz interaktivnu metodu. Aplikacija se oslanja na moderne web tehnologije što omogućava pristup s bilo kojeg uređaja s internetskom vezom, bez potrebe za instalacijom.

Glavne prednosti ovog rješenja uključuju automatsko generiranje vizualnog sadržaja pomoću umjetne inteligencije, što eliminira potrebu za ručnim stvaranjem materijala. Sustav bodovanja i highscore lista uvode element natjecanja koji povećava motivaciju korisnika. Firebase backend osigurava skalabilnost i pouzdanost sustava.

## 3. Motivacija

### 3.1 Analiza tržišta

Trenutno tržište edukativnih aplikacija dominiraju platforme poput Duolingo, Memrise i Quizlet. Međutim, analiza postojećih rješenja pokazuje nedostatak aplikacija koje kombiniraju AI-generirane vizualne elemente s učenjem vokabulara na hrvatskom jeziku.

Duolingo koristi gamifikaciju ali se fokusira na učenje stranih jezika. Quizlet omogućava stvaranje flashcard setova ali zahtijeva ručno dodavanje slika. Memrise kombinira vizualne elemente ali ne koristi AI tehnologiju za dinamičko generiranje sadržaja.

### 3.2 SWOT analiza

**Snage:**
- Jedinstvena kombinacija AI tehnologije i obrazovnog sadržaja
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
    classDef usecase fill:#fff,stroke:#333,stroke-width:1px,color:#000
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
flowchart TD
    Start([Početak aplikacije]) --> AuthCheck
    AuthCheck{Autentikacija?} --> |"U tijeku"| LoadingState
    LoadingState[Loading...] --> AuthCheck
    
    AuthCheck --> |"Nije prijavljen"| ModeCheck
    ModeCheck{Mode?} --> |"Login"| LoginScreen
    ModeCheck --> |"Register"| RegisterScreen
    
    LoginScreen[Login forma] --> EnterLoginData
    EnterLoginData[Unos podataka] --> AttemptLogin
    AttemptLogin{Ispravno?} --> |"Da"| SetUser
    AttemptLogin --> |"Ne"| LoginError
    LoginError[Greška] --> EnterLoginData
    
    LoginScreen --> ToggleToRegister
    ToggleToRegister[Prebaci na Register] --> RegisterScreen
    
    RegisterScreen[Register forma] --> EnterRegisterData
    EnterRegisterData[Unos podataka] --> AttemptRegister
    AttemptRegister{Ispravno?} --> |"Da"| SetUser
    AttemptRegister --> |"Ne"| RegisterError
    RegisterError[Greška] --> EnterRegisterData
    
    RegisterScreen --> ToggleToLogin
    ToggleToLogin[Prebaci na Login] --> LoginScreen
    
    AuthCheck --> |"Prijavljen"| LoadData
    SetUser[Postavi korisnika] --> LoadData
    
    LoadData[Učitavanje podataka] --> DataProvider
    DataProvider[DataProvider] --> LoadWords
    DataProvider --> SetupImageFetcher
    
    LoadWords[Dohvat riječi] --> DataCheck
    SetupImageFetcher[Priprema image fetchera] --> DataCheck
    
    DataCheck{Podaci spremni?} --> |"Da"| ShowQuiz
    DataCheck --> |"Ne"| WaitForData
    WaitForData[Čekanje] --> DataCheck
    
    ShowQuiz[Prikaz kviza] --> QuizFlow
    
    LoadData --> ShowUser
    ShowUser[Prikaz korisnika] --> LogoutButton
    LogoutButton[Gumb za odjavu] --> Logout
    Logout[Odjava] --> AuthCheck
    
    ShowUser --> AdminCheck
    AdminCheck{Admin?} --> |"Da"| AdminPanel
    AdminCheck --> |"Ne"| SkipAdmin
    
    AdminPanel[Admin panel] --> AddWords
    AddWords[Dodavanje riječi] --> ProcessWords
    ProcessWords[Obrada riječi] --> UpdateDB
    UpdateDB[Ažuriranje baze] --> SuccessMessage
    
    LoadData --> HighscoreComponent
    HighscoreComponent[Highscore] --> ViewScores
    ViewScores[Pregled rezultata] --> LoadScores
    LoadScores[Učitavanje rezultata] --> DisplayScores
    
    QuizFlow[Quiz proces] --> LoadUserScore
    LoadUserScore[Učitavanje bodova] --> NewImage
    NewImage[Nova slika] --> GenerateImage
    GenerateImage[Generiranje slike] --> DisplayImage
    DisplayImage[Prikaz slike] --> UserInput
    UserInput[Unos odgovora] --> CheckAnswer
    CheckAnswer{Točno?} --> |"Da"| CorrectAnswer
    CheckAnswer --> |"Ne"| WrongAnswer
    CorrectAnswer[Točan odgovor] --> AddPoint
    AddPoint[Dodaj bod] --> NextImage
    WrongAnswer[Netočan odgovor] --> NextImage
    NextImage[Sljedeća slika] --> NewImage
    
    classDef green fill:#9f6,stroke:#333,stroke-width:2px;
    classDef red fill:#f66,stroke:#333,stroke-width:2px;
    classDef blue fill:#69f,stroke:#333,stroke-width:2px;
    classDef orange fill:#f96,stroke:#333,stroke-width:2px;
    classDef yellow fill:#ff6,stroke:#333,stroke-width:2px;
    classDef purple fill:#c9f,stroke:#333,stroke-width:2px;
    
    class Start green
    class LoginScreen,RegisterScreen blue
    class ShowQuiz,DisplayImage yellow
    class NewImage,CheckAnswer orange
    class Logout,LoginError,RegisterError red
    class AdminPanel,HighscoreComponent purple
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

### 4.6 Klasni dijagram domene

```mermaid
classDiagram
   class User {
       -uid: string
       -email: string
       -score: number
       +updateScore()
   }
   
   class GameSession {
       -currentWord: string
       -imageUrl: string
       -isLoading: boolean
       -result: string
       +checkAnswer()
       +loadNewImage()
   }
   
   class Word {
       -id: string
       -word: string
       +generate()
   }
   
   User "1" --> "*" GameSession : has
   GameSession ..> Word : uses
```

## 5. Implementacija

### 5.1 Arhitektura aplikacije

Aplikacija koristi komponentnu arhitekturu Vue.js frameworka s jasno definiranom hijerarhijom:

```mermaid
flowchart TD
    App[App.vue<br/>root komponenta]
    App --> Header[Header.vue<br/>naslov aplikacije]
    App --> Login[Login.vue<br/>prijava korisnika]
    App --> Register[Register.vue<br/>registracija]
    App --> DataProvider[DataProvider.vue<br/>podatkovni sloj]
    App --> QuizView[QuizView.vue<br/>glavna logika igre]
    App --> AdminPanel[AdminPanel.vue<br/>admin funkcionalnosti]
    App --> Highscore[Highscore.vue<br/>prikaz rezultata]
    App --> Footer[Footer.vue<br/>copyright informacije]
    
    style App fill:#4CAF50,stroke:#333,stroke-width:3px,color:#fff
    style Login fill:#2196F3,stroke:#333,stroke-width:2px,color:#fff
    style Register fill:#2196F3,stroke:#333,stroke-width:2px,color:#fff
    style DataProvider fill:#FF9800,stroke:#333,stroke-width:2px,color:#fff
    style QuizView fill:#9C27B0,stroke:#333,stroke-width:2px,color:#fff
    style AdminPanel fill:#F44336,stroke:#333,stroke-width:2px,color:#fff
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

Pri prvom pokretanju aplikacije prikazuje se ekran za prijavu. Novi korisnici trebaju:

1. Kliknuti na "No Account? Register!"
2. Unijeti važeću email adresu
3. Unijeti lozinku (minimalno 6 znakova)
4. Kliknuti "Register"
5. Sustav automatski prijavljuje korisnika

### 6.2 Igranje kviza

Nakon uspješne prijave, kviz se automatski učitava:

1. **Pričekajte generiranje slike** - prikazuje se "Generating image..." poruka
2. **Analizirajte sliku** - pokušajte prepoznati što slika predstavlja
3. **Unesite odgovor** - upišite riječ u polje "Write here"
4. **Potvrdite odgovor** - pritisnite Enter ili kliknite "Check"
5. **Provjerite rezultat**:
   - ✅ Correct! - dodaje se 1 bod
   - ❌ Wrong. Correct answer: [riječ] - nema bodova
6. **Nova runda** - automatski se učitava nakon 1 sekunde

### 6.3 Pregled rezultata

Highscore lista dostupna je klikom na "🏆 View Highscores":

- Prikazuje top 10 igrača
- Vaš rezultat označen je drugom bojom
- Ako niste u top 10, vaš rang prikazuje se na dnu
- Lista se automatski osvježava

### 6.4 Administratorske funkcije

Samo korisnik s email adresom pi.eko013@gmail.com ima pristup admin panelu:

1. **Otvaranje panela** - klik na "➕ Add Words"
2. **Unos riječi** - upisati riječi odvojene zarezom ili razmakom
3. **Potvrda** - klik na "Add Words"
4. **Provjera** - pojavljuje se ✅ Words Added!

Sustav automatski:
- Pretvara sve riječi u mala slova
- Uklanja duplikate
- Ignorira riječi kraće od 2 slova

### 6.5 Rješavanje problema

**Problem: Slika se ne učitava**
- Provjerite internetsku vezu
- Osvježite stranicu (F5)
- Pokušajte ponovno za nekoliko sekundi

**Problem: Bodovi se ne ažuriraju**
- Provjerite jeste li prijavljeni
- Osvježite stranicu
- Provjerite konzolu za greške

**Problem: Ne mogu se registrirati**
- Email mora biti valjan format
- Lozinka mora imati minimalno 6 znakova
- Email možda već postoji u sustavu

### 6.6 Odjava iz sustava

Za odjavu jednostavno kliknite gumb "Log Out" na dnu ekrana. Sustav će vas vratiti na ekran za prijavu.

---


*Napomena: Aplikacija zahtijeva stalnu internetsku vezu za rad. Svi podaci se pohranjuju u oblaku i sinkroniziraju u stvarnom vremenu.*
