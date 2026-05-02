// components/Membership.js
const Membership = () => {
  const benefits = [
    "Intégrer une communauté de professionnels engagés",
    "Accéder à des événements scientifiques, formations et congrès",
    "Participer activement au développement de la cosmétologie en Algérie",
    "Contribuer à des projets à impact réel et durable",
  ];

  return (
    <section id="membership" className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#4b2c5e]">
          Devenez membre
        </h2>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-lg mb-6">
            La cosmétologie algérienne évolue, se structure et se
            professionnalise. Et vous pouvez en faire partie. Notre mission est
            d’accompagner le développement d’une cosmétologie algérienne fondée
            sur la rigueur scientifique, l’éthique et la sécurité, en mettant en
            avant la recherche, l’innovation et les compétences locales.
            Pourquoi adhérer ?
          </p>

          <ul className="list-disc list-inside text-left mb-8 space-y-2 mx-auto max-w-md">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-gray-700">
                {benefit}
              </li>
            ))}
          </ul>

          <a
            href="/membership"
            className="px-8 py-3 bg-yellow-500 text-[#4b2c5e] rounded-md hover:bg-yellow-400 transition-colors font-medium text-lg"
          >
            Adhérer en ligne
          </a>
        </div>
      </div>
    </section>
  );
};

export default Membership;
