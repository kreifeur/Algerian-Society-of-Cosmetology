// pages/about.js
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import member1 from "../../../public/Selka.jpg";
import member2 from "../../../public/Terguia.JPG";
import member3 from "../../../public/Touileb.JPG";
import member4 from "../../../public/Nehal.JPG";
import member5 from "../../../public/Fiala.JPG";
import member6 from "../../../public/Azrou.JPG";
import member7 from "../../../public/Boufateh.jpg";
import member8 from "../../../public/Daoud.JPG";
import member9 from "../../../public/Zebbiche.JPG";

export default function About() {
  // Données de l'équipe

  // Chiffres clés
  const keyFigures = [
    { number: "450+", label: "Membres actifs" },
    { number: "12", label: "Ans d'existence" },
    { number: "35", label: "Événements par an" },
    { number: "15", label: "Pays représentés" },
  ];

  // Partenaires
  const partners = [
    { name: "L'Oréal", logo: "/partners/loreal.png" },
    { name: "LVMH", logo: "/partners/lvmh.png" },
    { name: "Chanel", logo: "/partners/chanel.png" },
    { name: "Pierre Fabre", logo: "/partners/pierre-fabre.png" },
    { name: "ISIPCA", logo: "/partners/isipca.png" },
    { name: "Université de Paris", logo: "/partners/universite-paris.png" },
  ];

  return (
    <div>
      <Head>
        <title>À propos de la Fédération</title>
        <meta
          name="description"
          content="Découvrez l’histoire, la mission et les valeurs de Algerian Society of Cosmetology, acteur majeur du secteur pharmaceutique depuis sa création."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen bg-[#ddd3e6]">
        {/* Hero Section */}
        <section className="bg-[#4b2c5e] text-white py-20 px-6">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de l’ASCo
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Découvrez l’histoire, la mission et les valeurs de Algerian
              Society of Cosmetology, acteur majeur du secteur pharmaceutique
              depuis sa création.
            </p>
          </div>
        </section>

        {/* Histoire */}
        <section className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-[#4b2c5e] mb-6">
                  Notre histoire
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    En Algérie, l’industrie cosmétique connaît une croissance rapide : de nouveaux acteurs émergent, des marques locales se développent et la demande des consommateurs évolue vers plus de qualité, de transparence et de confiance. Pour accompagner cette dynamique, il devient essentiel de structurer la profession, d’harmoniser les pratiques et d’élever le niveau d’exigence scientifique et réglementaire. C’est dans ce contexte qu’est née l’Algerian Society of Cosmetology (ASCo) : une organisation indépendante, au service du savoir, de la sécurité et de l’innovation, qui place la science au cœur de la cosmétique algérienne
                  </p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="rounded-lg h-80 flex items-center justify-center">
                  <video
                  className="h-80 rounded-lg object-cover w-full"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                >
                  {/* ✅ Use a direct path string from the public folder */}
                  <source src="/video.mp4" type="video/mp4" />
                  Your browser does not support the video tag
                </video>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission et Valeurs */}
        <section className="py-16 px-6 bg-[#4b2c5e] text-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Notre mission et nos valeurs
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-yellow-300">
                  Nos Missions
                </h3>
                <h2>Former, informer pour transformer</h2>
                <h1>L’ASCo œuvre à renforcer les compétences, encadrer les acteurs du secteur et faire émerger le savoirfaire algérien en cosmétologie.  Nous agissons pour :</h1>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      former, Informer, transformer{" "}
                    </h4>
                    <p>
                      Développer le savoir et les compétences des acteurs du secteur et moderniser les pratiques de la cosmétologie en Algérie.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Encadrer et accompagner
                    </h4>
                    <p>
                      Soutenir les professionnels dans leurs démarches de recherche et développement avec pour objectif l’efficacité, la sécurité et la qualité.  
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Valoriser le savoir-faire algérien
                    </h4>
                    <p>
                      Rassembler les compétences, structurer les efforts et promouvoir l’excellence locale à l’international.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Promouvoir l’éthique et la sécurité
                    </h4>
                    <p>
                      Garantir des pratiques respectueuses des normes scientifiques et réglementaires. 
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Créer des passerelles entre science, société et régulation
                    </h4>
                    <p>
                      Servir la science, le public et les autorités par une approche collaborative et rigoureuse. 
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-6 text-yellow-300">
                  Nos valeurs
                </h3>
                <p>Rigueur. Indépendance. Ouverture. Au cœur de nos valeurs .</p>
                <p>Notre action repose sur des principes clairs et intransigeants :</p>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Rigueur scientifique</h4>
                    <p>
                      garante de crédibilité et de fiabilité avec la science et le savoir comme moteur de la démarche
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2"> Indépendance et transparence</h4>
                    <p>
                      pour préserver l’intégrité et la confiance du secteur.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Ancrage local et ouverture sur le monde</h4>
                    <p>
                      pour conjuguer authenticité et excellence internationale. 
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Chiffres clés */}
        {/* <section className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#4b2c5e] mb-12">
              L'association en chiffres
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {keyFigures.map((figure, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-[#4b2c5e] mb-2">
                    {figure.number}
                  </div>
                  <div className="text-gray-700">{figure.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Équipe */}
        <section className="py-16 px-6 bg-[#ddd3e6]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#4b2c5e] mb-4">
              Membres du bureau
            </h2>
            <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
              Voici les membres qui composent le bureau de Algerian Society of
              Cosmetology.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Président */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member9.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    Pr. Zebbiche Younes
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">Président</p>
                </div>
              </div>

              {/* Président */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member3.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    Touileb Chaimaa Neirouz
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">Chargée de communication</p>
                </div>
              </div>

              {/* Vice président 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member8.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    DAOUD Lamia
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">
                    Trésorière 
                  </p>
                </div>
              </div>

              {/* Vice président 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member7.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    Boufatah Feriel
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">
                    Trésorière adjointe
                  </p>
                </div>
              </div>

              {/* SG */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member6.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    Azrou Siham
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">
                    Secrétaire générale
                  </p>
                </div>
              </div>

              {/* SG adjoint */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member5.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    Fiala Sarah
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">
                    Vice-président
                  </p>
                </div>
              </div>

              {/* Trésorier Adjoint */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member2.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    Hadjene Targuia
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">
                    Vice-président
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member4.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    NEHAL Chahinez
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">
                    Vice-président
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div
                  style={{ backgroundImage: `url(${member1.src})` }}
                  className="h-48 bg-center bg-contain bg-no-repeat bg-white "
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-1">
                    Selka Adil
                  </h3>
                  <p className="text-yellow-600 font-medium mb-4">
                    Vice-président
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partenaires */}
        {/* <section className="py-16 px-6 bg-white">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-[#4b2c5e] mb-12">
              Nos partenaires
            </h2>
            <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
              Nous collaborons avec des acteurs majeurs du secteur pour offrir à
              nos membres des opportunités uniques et des contenus exclusifs.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center p-4 bg-gray-100 rounded-lg h-32"
                >
                  <span className="text-gray-500 text-center">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* CTA */}
        <section className="py-16 px-6 bg-[#6a4a7d] text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Rejoignez-nous</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Devenez membre de Algerian Society of Cosmetology et bénéficiez de
              tous nos services exclusifs, ressources privilégiées et d'un
              réseau de qualité.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/membership"
                className="px-8 py-3 bg-yellow-500 text-[#4b2c5e] rounded-md hover:bg-yellow-400 transition-colors font-medium text-lg"
              >
                Devenir membre
              </a>
              <a
                href="/contact"
                className="px-8 py-3 border-2 border-white rounded-md hover:bg-white hover:text-[#4b2c5e] transition-colors font-medium text-lg"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
