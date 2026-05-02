// components/About.js
import members from "../../../public/DSC02038.jpg";
const About = () => {
  return (
    <section id="about" className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#4b2c5e]">
          L’ASCo en action
        </h2>

        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <div className="bg-[#ddd3e6] rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-[#4b2c5e]">
                Nos missions
              </h3>
              <p>Former, informer pour transformer</p>
              <p className="mb-4">
                L’ASCo œuvre à renforcer les compétences, encadrer les acteurs du secteur et faire émerger le savoirfaire algérien en cosmétologie.
              </p>
              <p className="mb-4">Nous œuvrons pour :</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>
                  former, Informer, transformer :  Développer le savoir et les compétences des acteurs du secteur et moderniser les pratiques de la cosmétologie en Algérie.
                </li>
                <li>
                  Encadrer et accompagner :  Soutenir les professionnels dans leurs démarches de recherche et développement avec pour objectif l’efficacité, la sécurité et la qualité.
                </li>
                <li>
                  Valoriser le savoir-faire algérien :  Rassembler les compétences, structurer les efforts et promouvoir l’excellence locale à l’international. 
                </li>
                <li>
                  Promouvoir l’éthique et la sécurité :  Garantir des pratiques respectueuses des normes scientifiques et réglementaires. 
                </li>
                <li>
                  Créer des passerelles entre science, société et régulation :  Servir la science, le public et les autorités par une approche collaborative et rigoureuse.
                </li>
              </ul>
              <p>
                Rejoignez-nous pour contribuer au développement de notre secteur
                et bénéficier de nombreux avantages réservés à nos membres.
              </p>
            </div>
          </div>

          <div className="md:w-1/2">
            <div className=" rounded-lg h-50 flex items-center justify-center">
              <img className="rounded-lg" src={members.src} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
