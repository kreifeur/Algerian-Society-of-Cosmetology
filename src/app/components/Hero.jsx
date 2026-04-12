// components/Hero.js
const Hero = () => {
  return (
    <section className="relative  bg-[#4b2c5e] text-white py-20 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Bienvenue à Algerian Society of Cosmetology
        </h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Excellence, Engagement, Santé
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/events"
            className="px-6 py-3 bg-yellow-500 text-[#4b2c5e] rounded-md hover:bg-yellow-400 transition-colors font-medium text-lg"
          >
            Découvrir nos activités
          </a>
          <a
            href="/membership"
            className="px-6 py-3 border-2 border-white rounded-md hover:bg-white hover:text-[#4b2c5e] transition-colors font-medium text-lg"
          >
            Devenir membre
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
