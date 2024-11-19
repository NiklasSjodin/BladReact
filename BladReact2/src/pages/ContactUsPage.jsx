import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-auto mx-auto p-6 text-bladLightTextColor bg-bladLightBackground">
      <h1 className="text-2xl font-bold mb-4">Kontakta oss</h1>
      <p className="mb-6">
        Vi på blad. vill gärna höra från dig! Oavsett om du har frågor, kommentarer eller feedback, tveka inte att kontakta oss. Vårt team är här för att hjälpa dig.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Kontaktinformation</h2>
      <p className="mb-2">
        <strong>E-post:</strong> support@blad.com
      </p>
      <p className="mb-2">
        Vi svarar vanligtvis inom 24 timmar på vardagar.
      </p>
      <p className="mb-2">
        <strong>Telefon:</strong> +46 123 456 789
      </p>
      <p className="mb-2">
        Du kan nå oss måndag till fredag mellan 09:00 - 17:00.
      </p>
      <p className="mb-4">
        <strong>Postadress:</strong>
        <br />
        blad.
        <br />
        [Din företagsadress här]
        <br />
        [Postnummer och stad]
        <br />
        Sverige
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Kontaktsformulär</h2>
      <p className="mb-2">Fyll i formuläret nedan så återkommer vi till dig så snart som möjligt:</p>
      <form className="mb-4">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">Namn</label>
          <input
            type="text"
            id="name"
            placeholder="Ditt namn"
            className="border rounded-md w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">E-post</label>
          <input
            type="email"
            id="email"
            placeholder="Din e-post"
            className="border rounded-md w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="subject">Ämne</label>
          <input
            type="text"
            id="subject"
            placeholder="Ämnet för ditt meddelande"
            className="border rounded-md w-full p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="message">Meddelande</label>
          <textarea
            id="message"
            placeholder="Ditt meddelande"
            className="border rounded-md w-full p-2 h-32"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          Skicka meddelande
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">3. Följ oss på sociala medier</h2>
      <p className="mb-2">Håll dig uppdaterad om nyheter, evenemang och erbjudanden genom att följa oss på våra sociala medier:</p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Facebook:</strong> facebook.com/blad
        </li>
        <li>
          <strong>Instagram:</strong> instagram.com/blad
        </li>
        <li>
          <strong>Twitter:</strong> twitter.com/blad
        </li>
      </ul>

      <h2 className="text-xl font-semibold mb-2">4. Öppettider</h2>
      <p className="mb-4">Våra kontorstider är:</p>
      <ul className="list-disc list-inside">
        <li>Måndag - Fredag: 09:00 - 17:00</li>
        <li>Lördag - Söndag: Stängt</li>
      </ul>
    </div>
  );
};

export default ContactUs;