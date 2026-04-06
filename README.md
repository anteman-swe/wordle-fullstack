# Mitt Wordle-spel på svenska  
Jag har skapat ett Wordle spel på svenska med Frontend i React och Typescript  

Backend kör Node.js/Express som server, ejs som template engine och mongoDB för anslutningen till databasen.  

Ordlista och funktioner för att testa och välja ord i backend finns i egna submoduler.  
Så för att klona repot med beroende submoduler, kör:  

```bash
git clone --recursive  https://github.com/anteman-swe/wordle-fullstack.git
```

### MongoDB

Detta projekt använder MongoDB som databas.

#### Installation
Installera MongoDB lokalt eller använd [MongoDB Atlas](https://www.mongodb.com/atlas/database) för ett molnalternativ.
Skapa en `.env`-fil och lägg till din anslutningssträng:
```code
MONGODB_URI=mongodb://localhost:27017/ditt-databas-namn
```
Installera beroenden:
```bash
npm install
```



För att starta backend-servern, kör:
```bash
npm run backend
```
För att starta Vite utvecklingserver för frontend, kör:
```bash
npm run frontend
```
För att köra både backend och frontend samtidigt vid utveckling:
```bash
npm run dev
```
---

#### Miljövariabler (`.env`)
För att göra din kod säkrare och mer flexibel, använd miljövariabler för att lagra känslig information som anslutningssträngen. Skapa en `.env`-fil och lägg till:

```javacript
MONGODB_URI=mongodb://localhost:27017/ditt-databas-namn
```
Glöm inte att lägga till `.env` i `.gitignore` så att den inte laddas upp till ditt repo.  

---

