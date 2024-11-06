import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="max-auto mx-auto p-6 text-gray-200 bg-gray-800">
            <h1 className="text-2xl font-bold mb-4">Integritetspolicy för blad.</h1>
            <p className="mb-4">
                Denna integritetspolicy (”Policy”) beskriver hur blad. (”vi”, ”oss”, ”vår”) samlar in, använder, lagrar och skyddar dina personuppgifter när du använder vår bokklubbsapplikation och webbplats (”Tjänsten”). Genom att använda blad. godkänner du insamlingen och användningen av dina uppgifter enligt denna Policy.
            </p>

            <h2 className="text-xl font-semibold mb-2">1. Information vi samlar in</h2>
            <h3 className="font-semibold mb-1">1.1. Personuppgifter:</h3>
            <p className="mb-4">
                När du skapar ett konto eller använder Tjänsten kan vi samla in personuppgifter, inklusive men inte begränsat till:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Namn</li>
                <li>E-postadress</li>
                <li>Användarnamn</li>
                <li>Lösenord</li>
                <li>Telefonnummer</li>
            </ul>
            <h3 className="font-semibold mb-1">1.2. Icke-personuppgifter:</h3>
            <p className="mb-4">
                Vi kan också samla in information som inte kan identifiera dig, inklusive:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Användning av Tjänsten (t.ex. besökta sidor, tid spenderad på Tjänsten)</li>
                <li>Enhetsinformation (t.ex. webbläsartyp, operativsystem)</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">2. Hur vi använder dina uppgifter</h2>
            <p className="mb-4">
                Vi kan använda dina personuppgifter för att:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Tillhandahålla, driva och underhålla Tjänsten.</li>
                <li>Kommunicera med dig, inklusive att skicka information och uppdateringar.</li>
                <li>Personanpassa din användarupplevelse.</li>
                <li>Förbättra Tjänsten och vår verksamhet.</li>
                <li>Skicka nyhetsbrev, marknadsföring och andra meddelanden (du kan avregistrera dig från dessa meddelanden).</li>
            </ul>

            <h2 className="text-xl font-semibold mb-2">3. Delning av information</h2>
            <h3 className="font-semibold mb-1">3.1.</h3>
            <p className="mb-4">
                Vi säljer eller hyr aldrig ut dina personuppgifter till tredje part. Vi kan dock dela dina uppgifter med:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Tjänsteleverantörer som hjälper oss att tillhandahålla Tjänsten (t.ex. hosting, support).</li>
                <li>Myndigheter om vi är skyldiga att göra det enligt lag eller i samband med rättsliga processer.</li>
            </ul>
            <h3 className="font-semibold mb-1">3.2.</h3>
            <p className="mb-4">
                Vi kan också dela information i samband med fusion, förvärv eller försäljning av hela eller delar av vår verksamhet.
            </p>

            <h2 className="text-xl font-semibold mb-2">4. Lagring och säkerhet av dina uppgifter</h2>
            <h3 className="font-semibold mb-1">4.1.</h3>
            <p className="mb-4">
                Vi vidtar rimliga åtgärder för att skydda dina personuppgifter mot obehörig åtkomst, användning eller avslöjande.
            </p>
            <h3 className="font-semibold mb-1">4.2.</h3>
            <p className="mb-4">
                Trots våra ansträngningar kan ingen metod för överföring över Internet eller metod för elektronisk lagring vara 100 % säker. Därför kan vi inte garantera absolut säkerhet.
            </p>

            <h2 className="text-xl font-semibold mb-2">5. Dina rättigheter</h2>
            <h3 className="font-semibold mb-1">5.1.</h3>
            <p className="mb-4">
                Du har rätt att:
            </p>
            <ul className="list-disc list-inside mb-4">
                <li>Begära tillgång till dina personuppgifter som vi har lagrat.</li>
                <li>Begära att vi rättar eventuella felaktiga eller ofullständiga uppgifter.</li>
                <li>Begära att vi raderar dina personuppgifter, under vissa omständigheter.</li>
            </ul>
            <h3 className="font-semibold mb-1">5.2.</h3>
            <p className="mb-4">
                Du kan också välja att inte ta emot marknadsföringskommunikationer genom att avregistrera dig i meddelandena eller genom att kontakta oss.
            </p>

            <h2 className="text-xl font-semibold mb-2">6. Ändringar av denna policy</h2>
            <p className="mb-4">
                Vi förbehåller oss rätten att ändra denna Policy. Eventuella ändringar kommer att publiceras på vår webbplats med ett uppdaterat datum. Din fortsatta användning av Tjänsten efter ändringar innebär att du accepterar den reviderade Policyn.
            </p>

            <h2 className="text-xl font-semibold mb-2">7. Kontaktinformation</h2>
            <p className="mb-4">
                Om du har frågor eller kommentarer om denna integritetspolicy, vänligen kontakta oss:
            </p>
            <p className="mb-4">
                E-post: <a href="mailto:support@blad.com" className="text-blue-500 underline">support@blad.com</a>
            </p>
            <p>
                Telefon: +46 123 456 789
            </p>
        </div>
    );
};

export default PrivacyPolicy;