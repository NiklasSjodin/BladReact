import Image1 from '../../images/mainpageimages/Image1.jpg';
import Image2 from '../../images/mainpageimages/Image2.jpg';
import Image3 from '../../images/mainpageimages/Image3.jpg';
import Image4 from '../../images/mainpageimages/Image4.jpg';
import Image5 from '../../images/mainpageimages/Image5.jpg';
import Image6 from '../../images/mainpageimages/Image6.jpg';
import Image7 from '../../images/mainpageimages/Image7.jpg';
import Image8 from '../../images/mainpageimages/Image8.jpg';

const features = [
  {
    name: "Skapad av Blad",
    description:
      "Utvecklad med passion för läsning och gemenskap av bokälskare för bokälskare. Blad. är framtagen för att förena litteraturintresserade och skapa inspirerande samtal om böcker som formar oss.",
  },
  {
    name: "Starta eller gå med i bokklubbar",
    description:
      "Med Blad. kan du organisera dina böcker, ansluta dig till bokklubbar och delta i diskussioner med andra läsare. Håll koll på böcker du vill läsa, de du läser just nu, och dela dina tankar om böcker du har avslutat.",
  },
  {
    name: "Gemenskap",
    description:
      "I Blad. möts läsare av alla slag – från nya bokslukare till rutinerade kritiker. Skapa nya vänskaper genom böcker och bygg relationer som sträcker sig bortom sidorna.",
  },
  {
    name: "Bli inspirerad",
    description: "Få boktips baserat på dina intressen och tidigare läsningar",
  },
];

export default function Information() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Upplev en helt ny värld av böcker och diskussioner!
          </h2>
          <p className="mt-4 text-gray-500">
            Med Blad kan du skapa din egen bokhylla, ansluta till bokklubbar,
            och dela tankar och recensioner med andra bokälskare. Oavsett om du
            vill läsa, diskutera eller hitta nya favoriter, ger Blad dig allt du
            behöver för att göra din läsupplevelse ännu bättre.
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="image 1"
            src= {Image1}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="image 2"
            src= {Image8}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Image 7"
            src= {Image6}
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Image 4"
            src={Image2}
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
