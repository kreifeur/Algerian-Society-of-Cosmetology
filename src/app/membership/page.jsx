"use client";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

export default function Membership() {
  const [selectedPlan, setSelectedPlan] = useState("individual");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dateOfBirth: "",
    nationality: "",
    wilaya: "",
    profession: "",
    professionalStatus: "",
    currentPosition: "",
    establishmentName: "",
    sectorActivity: "",
    professionalAddress: "",
    qualifications: "",
    domainOfInterest: [],
    acceptTerms: false,
    consentDataProtection: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [sslVerified, setSslVerified] = useState(false);

  const recaptchaRef = useRef(null);

  // Complete list of 59 Algerian Wilayas
  const algerianWilayas = [
    // Wilayas
    "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
    "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
    "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
    "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
    "M'Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj",
    "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
    "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
    "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
    "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair",
    "El Menia",
    // Additional cities/communes
    "Aflou", "Aïn Oussera", "Barika", "Bir el-Ater", "Bou Saâda", 
    "El Abiodh Sidi Cheikh", "El Aricha", "El Kantara", "Ksar Chellala", 
    "Ksar El Boukhari", "Messaad","Etranger",
  ];

  useEffect(() => {
    if (window.location.protocol === "https:") {
      setSslVerified(true);
    }
  }, []);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const membershipPlans = [
    {
      id: "student",
      title: "Étudiant",
      price: "2500",
      period: "an",
      description: "Pour les étudiants en pharmacie",
      recommended: false,
    },
    {
      id: "individual",
      title: "Pharmacien diplômé",
      price: "4000",
      period: "an",
      description: "Pour les pharmaciens diplômés",
      recommended: false,
    },
    {
      id: "specialist",
      title: "Pharmacien spécialiste",
      price: "6000",
      period: "an",
      description: "Pour les pharmaciens spécialistes",
      recommended: true,
    },
  ];

  const benefits = [
    {
      icon: "🎓",
      title: "Formations & webinaires",
      description: "Participez à des formations continues et webinaires pour renforcer vos compétences.",
    },
    {
      icon: "💸",
      title: "Tarifs préférentiels",
      description: "Bénéficiez de réductions sur les frais d'inscription à nos événements scientifiques et professionnels.",
    },
    {
      icon: "💼",
      title: "Opportunités professionnelles",
      description: "Accédez à des offres de stage et d'emploi dans le secteur de la cosmétologie.",
    },
    {
      icon: "🌐",
      title: "Espace membre dédié",
      description: "Profitez d'un accès exclusif à votre espace personnel sur le site de l'ASCo.",
    },
    {
      icon: "📰",
      title: "Newsletter & actualités",
      description: "Recevez régulièrement nos informations, publications et actualités du secteur.",
    },
  ];

  const getPlanAmount = () => {
    const plan = membershipPlans.find((p) => p.id === selectedPlan);
    return plan ? parseInt(plan.price) : 4000;
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Le prénom est requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Le nom est requis";
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
    }
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Veuillez confirmer votre mot de passe";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    }
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "La date de naissance est requise";
    if (!formData.nationality.trim()) newErrors.nationality = "La nationalité est requise";
    if (!formData.wilaya) newErrors.wilaya = "La wilaya de résidence est requise";
    if (!formData.profession.trim()) newErrors.profession = "La profession est requise";
    if (!formData.professionalStatus) newErrors.professionalStatus = "Le statut professionnel est requis";
    if (!formData.currentPosition.trim()) newErrors.currentPosition = "La fonction actuelle est requise";
    if (!formData.establishmentName.trim()) newErrors.establishmentName = "Le nom de l'établissement/entreprise est requis";
    if (!formData.sectorActivity) newErrors.sectorActivity = "Le secteur d'activité est requis";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Vous devez accepter les conditions générales";
    }
    if (!formData.consentDataProtection) {
      newErrors.consentDataProtection = "Vous devez accepter le traitement de vos données personnelles";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handlePayment = async () => {
    if (!recaptchaToken) {
      alert("Veuillez compléter le CAPTCHA pour continuer");
      recaptchaRef.current?.reset();
      return;
    }

    if (!sslVerified) {
      alert("Veuillez utiliser une connexion sécurisée (HTTPS) pour procéder au paiement");
      return;
    }

    setIsProcessing(true);

    try {
      const registerData = {
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        nationality: formData.nationality,
        wilaya: formData.wilaya,
        profession: formData.profession,
        professionalStatus: formData.professionalStatus,
        currentPosition: formData.currentPosition,
        establishmentName: formData.establishmentName,
        sectorActivity: formData.sectorActivity,
        professionalAddress: formData.professionalAddress,
        qualifications: formData.qualifications,
        domainOfInterest: formData.domainOfInterest,
        plan: selectedPlan,
        recaptchaToken: recaptchaToken,
        paymentMethod: selectedPaymentMethod,
        amount: getPlanAmount(),
        consentDataProtection: formData.consentDataProtection,
        acceptTerms: true,
      };

      console.log(registerData);

      const registerResponse = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });

      const registerResult = await registerResponse.json();

      if (!registerResult.success) {
        throw new Error(registerResult.message || "Erreur d'enregistrement");
      }

      if (selectedPaymentMethod === "cash") {
        setIsSubmitted(true);
        setIsProcessing(false);
      } else {
        try {
          const amount = getPlanAmount();
          const res = await axios.get(`/api/pay?amount=${amount}`);
          
          if (res.data.formUrl) {
            window.location.href = res.data.formUrl;
          } else if (res.data.error) {
            throw new Error(res.data.error);
          }
        } catch (err) {
          console.error("Payment API error:", err);
          alert(`Erreur lors de la redirection vers le paiement en ligne: ${err.message}`);
          setIsProcessing(false);
          recaptchaRef.current?.reset();
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(`Erreur: ${error.message}`);
      setIsProcessing(false);
      recaptchaRef.current?.reset();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      alert("Veuillez sélectionner un mode de paiement");
      return;
    }
    await handlePayment();
  };

  return (
    <div>
      <Head>
        <title>Adhésion - Algerian Society of Cosmetology</title>
        <meta name="description" content="Rejoignez Algerian Society of Cosmetology et bénéficiez d'avantages exclusifs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="min-h-screen bg-[#ddd3e6] py-12">
        <div className="container mx-auto px-4">
          {/* SSL Security Badge */}
          <div className="text-center mb-6">
            {sslVerified ? (
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Connexion sécurisée
              </div>
            ) : (
              <div className="inline-flex items-center bg-red-100 text-red-800 px-4 py-2 rounded-lg text-sm font-semibold">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Veuillez utiliser HTTPS pour une connexion sécurisée
              </div>
            )}
          </div>

          <h1 className="text-4xl font-bold text-center text-[#4b2c5e] mb-4">Devenez membre</h1>
          <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Rejoindre l'Algerian Society of Cosmetology (ASCo), c'est faire partie d'une communauté scientifique et professionnelle dédiée à l'évolution de la cosmétologie en Algérie.
          </p>

          {!isSubmitted ? (
            <>
              {/* Progress Steps */}
              <div className="max-w-3xl mx-auto mb-12">
                <div className="flex justify-between items-center">
                  <div className={`flex flex-col items-center ${currentStep >= 1 ? "text-[#4b2c5e]" : "text-gray-400"}`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-[#4b2c5e] text-white" : "bg-gray-200"}`}>1</div>
                    <span className="mt-2 text-sm font-medium">Informations personnelles</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${currentStep >= 2 ? "bg-[#4b2c5e]" : "bg-gray-200"}`}></div>
                  <div className={`flex flex-col items-center ${currentStep >= 2 ? "text-[#4b2c5e]" : "text-gray-400"}`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-[#4b2c5e] text-white" : "bg-gray-200"}`}>2</div>
                    <span className="mt-2 text-sm font-medium">Conditions</span>
                  </div>
                  <div className={`h-1 flex-1 mx-2 ${currentStep >= 3 ? "bg-[#4b2c5e]" : "bg-gray-200"}`}></div>
                  <div className={`flex flex-col items-center ${currentStep >= 3 ? "text-[#4b2c5e]" : "text-gray-400"}`}>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-[#4b2c5e] text-white" : "bg-gray-200"}`}>3</div>
                    <span className="mt-2 text-sm font-medium">Paiement</span>
                  </div>
                </div>
              </div>

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-semibold text-center text-[#4b2c5e] mb-8">Vos informations personnelles</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Prénom *</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.firstName ? "border-red-500" : "border-gray-300"}`} />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.lastName ? "border-red-500" : "border-gray-300"}`} />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.email ? "border-red-500" : "border-gray-300"}`} />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot de passe *</label>
                        <div className="relative">
                          <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.password ? "border-red-500" : "border-gray-300"}`} />
                          <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                          </button>
                        </div>
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe *</label>
                        <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`} />
                        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date de naissance *</label>
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"}`} />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationalité *</label>
                        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.nationality ? "border-red-500" : "border-gray-300"}`} />
                        {errors.nationality && <p className="text-red-500 text-sm mt-1">{errors.nationality}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Wilaya de résidence *</label>
                        <select name="wilaya" value={formData.wilaya} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.wilaya ? "border-red-500" : "border-gray-300"}`}>
                          <option value="">Sélectionnez votre wilaya</option>
                          {algerianWilayas.map((wilaya) => (
                            <option key={wilaya} value={wilaya}>{wilaya}</option>
                          ))}
                        </select>
                        {errors.wilaya && <p className="text-red-500 text-sm mt-1">{errors.wilaya}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Profession *</label>
                        <input type="text" name="profession" value={formData.profession} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.profession ? "border-red-500" : "border-gray-300"}`} />
                        {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Statut professionnel *</label>
                        <select name="professionalStatus" value={formData.professionalStatus} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.professionalStatus ? "border-red-500" : "border-gray-300"}`}>
                          <option value="">Sélectionnez votre statut</option>
                          <option value="Salarié(e)">Salarié(e)</option>
                          <option value="Indépendant">Indépendant</option>
                          <option value="Etudiant(e)">Etudiant(e)</option>
                          <option value="Sans activité">Sans activité</option>
                          <option value="Autre">Autre</option>
                        </select>
                        {errors.professionalStatus && <p className="text-red-500 text-sm mt-1">{errors.professionalStatus}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fonction actuelle *</label>
                      <input type="text" name="currentPosition" value={formData.currentPosition} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.currentPosition ? "border-red-500" : "border-gray-300"}`} />
                      {errors.currentPosition && <p className="text-red-500 text-sm mt-1">{errors.currentPosition}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'établissement/entreprise *</label>
                        <input type="text" name="establishmentName" value={formData.establishmentName} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.establishmentName ? "border-red-500" : "border-gray-300"}`} />
                        {errors.establishmentName && <p className="text-red-500 text-sm mt-1">{errors.establishmentName}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Secteur d'activité *</label>
                        <select name="sectorActivity" value={formData.sectorActivity} onChange={handleChange} className={`w-full px-4 py-2 border rounded-md ${errors.sectorActivity ? "border-red-500" : "border-gray-300"}`}>
                          <option value="">Sélectionnez votre secteur</option>
                          <option value="Académique">Académique (enseignants, doctorants,...)</option>
                          <option value="Professionnel de santé">Professionnel de santé (médecins, pharmaciens, chirurgiens-dentistes,...)</option>
                          <option value="Industries fabrication">Industries des produits cosmétiques (Fabrication/conditionnement)</option>
                          <option value="Industries importation">Industrie des produits cosmétiques (Importation/Distribution)</option>
                          <option value="Industries marketing">Industries des produits cosmétiques (Promotion/Marketing)</option>
                          <option value="Laboratoire contrôle qualité">Laboratoire de contrôle qualité</option>
                          <option value="Fabrication artisanale">Fabrication artisanale</option>
                          <option value="Organismes publics">Organismes et institutions publiques</option>
                          <option value="Soins esthétiques">Soins esthétiques et beauté</option>
                          <option value="Médias">Médias</option>
                          <option value="Etudiants">Etudiants</option>
                          <option value="Autre">Autre</option>
                        </select>
                        {errors.sectorActivity && <p className="text-red-500 text-sm mt-1">{errors.sectorActivity}</p>}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Adresse professionnelle</label>
                      <textarea name="professionalAddress" value={formData.professionalAddress} onChange={handleChange} rows="2" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Diplômes et qualifications</label>
                      <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-md" placeholder="Listez vos diplômes et qualifications pertinents..." />
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Domaines d'intérêt dans la cosmétologie</label>
                      <div className="space-y-2">
                        {[
                          "Qualité et BPF (Bonnes Pratiques de fabrication)",
                          "Formation et Recherche",
                          "Réglementation",
                          "Efficacité et Sécurité",
                          "Autre"
                        ].map((domain) => (
                          <label key={domain} className="flex items-center">
                            <input type="checkbox" value={domain} checked={formData.domainOfInterest.includes(domain)} onChange={(e) => {
                              const { value, checked } = e.target;
                              setFormData((prev) => ({
                                ...prev,
                                domainOfInterest: checked ? [...prev.domainOfInterest, value] : prev.domainOfInterest.filter((d) => d !== value)
                              }));
                            }} className="h-4 w-4 text-blue-600 rounded" />
                            <span className="ml-2 text-sm text-gray-700">{domain}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <button onClick={nextStep} className="px-8 py-3 bg-[#4b2c5e] text-white rounded-md hover:bg-[#4b2c5e] font-medium text-lg">Continuer</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Conditions */}
              {currentStep === 2 && (
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-semibold text-center text-[#4b2c5e] mb-8">Conditions d'adhésion</h2>
                  <form onSubmit={(e) => e.preventDefault()}>
                    {/* Membership Plan Selection */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-[#4b2c5e] mb-4">Choisissez votre formule d'adhésion</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {membershipPlans.map((plan) => (
                          <div key={plan.id} className={`bg-white rounded-lg border-2 p-4 cursor-pointer transition-all ${selectedPlan === plan.id ? "border-[#4b2c5e] bg-[#ddd3e6]" : "border-gray-200"} ${plan.recommended ? "ring-2 ring-yellow-500" : ""}`} onClick={() => handlePlanChange(plan.id)}>
                            {plan.recommended && <div className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-2">Recommandé</div>}
                            <h4 className="font-semibold text-[#4b2c5e]">{plan.title}</h4>
                            <div className="text-lg font-bold text-[#4b2c5e] mt-2">{plan.price} DA <span className="text-sm font-normal text-gray-600">/{plan.period}</span></div>
                            <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="flex flex-col gap-2 my-6">
                      <div className={`border p-3 cursor-pointer rounded-md ${selectedPaymentMethod === "cash" ? "border-[#4b2c5e] bg-[#ddd3e6]" : "border-gray-300"}`} onClick={() => handlePaymentMethodChange("cash")}>
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedPaymentMethod === "cash" ? "border-[#4b2c5e] bg-[#4b2c5e]" : "border-gray-400"}`}>
                            {selectedPaymentMethod === "cash" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="font-medium">Paiement par cash</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 ml-8">Payez en espèces lors de votre visite à notre siège</p>
                      </div>

                      <div className={`border p-3 cursor-pointer rounded-md ${selectedPaymentMethod === "online" ? "border-[#4b2c5e] bg-[#ddd3e6]" : "border-gray-300"}`} onClick={() => handlePaymentMethodChange("online")}>
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${selectedPaymentMethod === "online" ? "border-[#4b2c5e] bg-[#4b2c5e]" : "border-gray-400"}`}>
                            {selectedPaymentMethod === "online" && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="font-medium">Paiement en ligne par CIB/DHAHABIA</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 ml-8">Paiement sécurisé via la plateforme SATIM</p>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="mb-6">
                      <div className={`p-4 border rounded-md ${errors.acceptTerms ? "border-red-500 bg-red-50" : "border-gray-200"}`}>
                        <div className="flex items-start">
                          <input type="checkbox" id="acceptTerms" name="acceptTerms" checked={formData.acceptTerms} onChange={handleChange} className="h-4 w-4 text-blue-600 rounded mt-1" />
                          <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                            J'accepte les <a href="/conditions-generales" className="text-blue-600 hover:underline" target="_blank">conditions générales</a> et la <a href="/politique-confidentialite" className="text-blue-600 hover:underline" target="_blank">politique de confidentialité</a> *
                          </label>
                        </div>
                        {errors.acceptTerms && <p className="text-red-500 text-sm mt-1">{errors.acceptTerms}</p>}
                      </div>
                    </div>

                    {/* Data Protection Consent */}
                    <div className="mb-6">
                      <div className={`p-4 border rounded-md bg-gray-50 ${errors.consentDataProtection ? "border-red-500 bg-red-50" : "border-gray-200"}`}>
                        <div className="flex items-start">
                          <input type="checkbox" id="consentDataProtection" name="consentDataProtection" checked={formData.consentDataProtection} onChange={handleChange} className="h-4 w-4 text-blue-600 rounded mt-1" />
                          <label htmlFor="consentDataProtection" className="ml-2 block text-sm text-gray-700">
                            J'accepte le traitement de mes données personnelles conformément à la <a href="/protection-donnees" className="text-blue-600 hover:underline" target="_blank">loi n°18-07 relative à la protection des données à caractère personnel</a>, uniquement pour les besoins et activités de l'association. *
                          </label>
                        </div>
                        {errors.consentDataProtection && <p className="text-red-500 text-sm mt-1">{errors.consentDataProtection}</p>}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">Retour</button>
                      <button onClick={nextStep} className="px-6 py-2 bg-[#4b2c5e] text-white rounded-md hover:bg-[#4b2c5e] font-medium">Continuer vers le paiement</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-semibold text-center text-[#4b2c5e] mb-8">Finaliser votre adhésion</h2>

                  {/* Order Summary */}
                  <div className="bg-[#ddd3e6] p-6 rounded-lg mb-8">
                    <h3 className="text-lg font-semibold text-[#4b2c5e] mb-4">Récapitulatif</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span>Formule {membershipPlans.find((p) => p.id === selectedPlan)?.title}</span>
                        <span className="font-semibold">{getPlanAmount().toLocaleString()} DA</span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span>Mode de paiement</span>
                        <span className="font-medium">{selectedPaymentMethod === "cash" ? "Paiement par cash" : "Paiement en ligne"}</span>
                      </div>
                      <div className="pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-semibold">Total</span>
                          <div className="text-3xl font-bold text-[#4b2c5e]">{getPlanAmount().toLocaleString()} DA</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ReCAPTCHA */}
                  <div className="mb-8">
                    <div className="flex justify-center">
                      <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lf6VFgsAAAAAOS2vK0x_RDFSNPCq74QFxpBPn_u"} onChange={handleRecaptchaChange} />
                    </div>
                  </div>

                  {/* Payment Button */}
                  <div className="mb-8 text-center">
                    <button onClick={handleSubmit} disabled={isProcessing || !formData.acceptTerms || !formData.consentDataProtection || !recaptchaToken} className={`relative inline-flex items-center justify-center px-10 py-4 rounded-lg font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed min-w-[300px] ${selectedPaymentMethod === "cash" ? "bg-green-600 text-white" : "bg-[#4b2c5e] text-white"}`}>
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          Traitement en cours...
                        </>
                      ) : selectedPaymentMethod === "cash" ? (
                        "Finaliser l'adhésion (paiement par cash)"
                      ) : (
                        "Procéder au paiement sécurisé"
                      )}
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t">
                    <button onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100" disabled={isProcessing}>Retour</button>
                    <div className="text-xs text-gray-500 text-right">
                      <p>Connexion sécurisée SSL 256-bit • Certifié PCI-DSS</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-green-500 text-6xl mb-6">✅</div>
              <h2 className="text-2xl font-semibold text-[#4b2c5e] mb-4">Félicitations !</h2>
              <p className="text-lg text-gray-700 mb-6">Votre adhésion à Algerian Society of Cosmetology a été enregistrée avec succès.</p>
              <button onClick={() => (window.location.href = "/")} className="px-6 py-2 bg-[#4b2c5e] text-white rounded-md font-medium">Retour à l'accueil</button>
            </div>
          )}

          {/* Benefits Section */}
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-center text-[#4b2c5e] mb-12">Avantages exclusifs pour nos membres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-[#4b2c5e] mb-3">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}