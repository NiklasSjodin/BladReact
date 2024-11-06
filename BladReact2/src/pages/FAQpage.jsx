import React from 'react';

const FAQPage = () => {
  return (
    <div className="max-auto mx-auto p-6 text-gray-200  bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Support för blad</h1>
      <p className="mb-6">
        Välkommen till supportsidan för blad! Här finner du information och resurser som hjälper dig med frågor eller problem som kan uppstå när du använder vår bokklubbsapplikation. Vi finns här för att assistera dig!
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Vanliga frågor (FAQ)</h2>

      <div className="mb-4">
        <h3 className="font-semibold">1.1. Hur registrerar jag mig för ett konto?</h3>
        <p className="mb-2">
          För att skapa ett konto på blad., följ dessa steg:
        </p>
        <ol className="list-decimal list-inside mb-2">
          <li>Gå till inloggningssidan.</li>
          <li>Klicka på "Registrera dig".</li>
          <li>Fyll i de obligatoriska fälten med din information.</li>
          <li>Bekräfta din registrering genom att följa länken i e-postmeddelandet du får.</li>
        </ol>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">1.2. Hur återställer jag mitt lösenord?</h3>
        <p className="mb-2">
          Om du har glömt ditt lösenord kan du återställa det genom att:
        </p>
        <ol className="list-decimal list-inside mb-2">
          <li>Klicka på "Glömt lösenord?" på inloggningssidan.</li>
          <li>Följ anvisningarna för att ange din registrerade e-postadress.</li>
          <li>Kontrollera din e-post för att få en återställningslänk.</li>
        </ol>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">1.3. Hur ändrar jag mina kontoinställningar?</h3>
        <p className="mb-2">
          Du kan ändra dina kontoinställningar genom att logga in och gå till "Kontoinställningar". Här kan du uppdatera din profil, ändra lösenord och justera dina kommunikationspreferenser.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">1.4. Vad gör jag om jag stöter på tekniska problem?</h3>
        <p className="mb-2">
          Om du upplever tekniska problem, försök följande:
        </p>
        <ul className="list-disc list-inside mb-2">
          <li>Rensa cache och cookies i din webbläsare.</li>
          <li>Kontrollera din internetanslutning.</li>
          <li>Prova en annan webbläsare eller enhet.</li>
        </ul>
        <p>
          Om problemet kvarstår, kontakta vår support.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">2. Kontakta oss</h2>
      <p className="mb-4">
        Har du frågor som inte besvaras i FAQ eller behöver du hjälp? Tveka inte att kontakta vårt supportteam:
      </p>
      <p className="mb-2">
        <strong>E-post:</strong> support@blad.com
      </p>
      <p className="mb-2">
        <strong>Telefon:</strong> +46 123 456 789
      </p>
      <p className="mb-4">
        <strong>Supporttjänster:</strong> Vi erbjuder support måndag till fredag, 09:00 - 17:00.
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Feedback och förslag</h2>
      <p className="mb-4">
        Vi uppskattar din feedback och dina förslag för att förbättra vår tjänst. Om du har några kommentarer eller idéer, skicka gärna dem till oss via e-post.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Användarvillkor och integritetspolicy</h2>
      <p>
        För mer information om våra användarvillkor och hur vi hanterar dina personuppgifter, vänligen se våra sidor för Användarvillkor och Integritetspolicy.
      </p>
    </div>
  );
};

export default FAQPage;