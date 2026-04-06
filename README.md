# Mitt Wordle-spel på svenska  
Jag har skapat ett Wordle spel på svenska med Frontend i React och Typescript. Detta är ett projekt för kursen Javascript - fullstack i distansutbildningen Systemutvecklare - Javascript - Java hos Lernia YH, Piteå.

Backend kör Node.js/Express som server, EJS som template engine och Mongoose för anslutningen till databasen i MongoDB.  

Ordlista och funktioner för att testa och välja ord i backend finns i egna submoduler.  
Så för att klona repot med beroende submoduler, kör:  

```bash
git clone --recursive  https://github.com/anteman-swe/wordle-fullstack.git
```

### MongoDB

Detta projekt använder MongoDB som databas.

#### Installation
Installera MongoDB lokalt eller använd [MongoDB Atlas](https://www.mongodb.com/atlas/database) för ett molnalternativ. Lägg till din anslutningssträng i `.env`
##### Miljövariabler (`.env`)
För att göra din kod säkrare och mer flexibel, använd miljövariabler för att lagra känslig information som anslutningssträngen. Skapa en `.env`-fil (kolla `.env_example` i undermappen 'backend') och lägg till:

```code
MONGODB_URI=mongodb://localhost:27017/ditt-databas-namn
```
Glöm inte att lägga till `.env` i `.gitignore` så att den inte laddas upp till ditt repo. 

### Frontend och Backend
Installera beroenden:
```bash
npm install
```
För att köra både backend och frontend samtidigt vid utveckling:
```bash
npm run dev
```
För att enbart starta backend-servern, kör:
```bash
npm run backend
```
För att enbart starta Vite utvecklingserver för frontend, kör:
```bash
npm run frontend
```

---

 



