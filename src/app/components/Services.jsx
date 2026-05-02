// components/Services.js
const Services = () => {
  const services = [
    {
      icon: "",
      title: "Des formations spécialisées et actualisées",
      description:
        "",
    },
    {
      icon: "",
      title: "Un accès à un réseau de professionnels, chercheurs et experts du domaine",
      description:
        "",
    },
    {
      icon: "",
      title: "Une veille scientifique et réglementaire",
      description: ""
    },
    {
      icon: "",
      title: "Des opportunités de collaboration et de valorisation des compétences",
      description:
        "",
    },
  ];

  return (
    <section className="py-16 px-6 bg-[#ddd3e6]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#4b2c5e]">
          Nos Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-[#4b2c5e]">
                {service.title}
              </h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
