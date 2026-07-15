"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export default function ArticleCreationModal({ onClose, onArticleCreated }) {
  const [articleForm, setArticleForm] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: ["tendances", "innovation"],
    isMemberOnly: false,
    isPublished: true,
  });

  const [tagInput, setTagInput] = useState("");
  const [articleLoading, setArticleLoading] = useState(false);
  const [articleMessage, setArticleMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Configuration Cloudinary
  const CLOUDINARY_CLOUD_NAME = "dlr034bds";
  const CLOUDINARY_UPLOAD_PRESET = "FapKREIFEUR";

  // Ref for focus management
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (titleInputRef.current) {
      setTimeout(() => titleInputRef.current.focus(), 100);
    }

    // Close on Escape key
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setArticleForm((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setArticleForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  const handleAddTag = useCallback(() => {
    if (tagInput.trim() && !articleForm.tags.includes(tagInput.trim())) {
      setArticleForm((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  }, [tagInput, articleForm.tags]);

  const handleRemoveTag = useCallback((tagToRemove) => {
    setArticleForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddTag();
      }
    },
    [handleAddTag],
  );

  const handleImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setArticleMessage("❌ L'image ne doit pas dépasser 5MB");
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!validTypes.includes(file.type)) {
      setArticleMessage(
        "❌ Veuillez sélectionner un fichier image valide (JPG, PNG, GIF, WebP)"
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    setSelectedImage(file);
    setArticleMessage("");
  }, []);

  const removeImage = useCallback(() => {
    setSelectedImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('article-image-upload');
    if (fileInput) fileInput.value = '';
  }, []);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("cloud_name", CLOUDINARY_CLOUD_NAME);

    setUploadProgress(30);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    setUploadProgress(70);

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error?.message || "Erreur lors de l'upload de l'image"
      );
    }

    setUploadProgress(100);
    return result.secure_url;
  };

  const handleCreateArticle = async (e) => {
    e.preventDefault();
    setArticleLoading(true);
    setArticleMessage("");
    setUploadProgress(0);

    try {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        throw new Error("Token d'authentification manquant");
      }

      // Validation des données
      if (!articleForm.title || !articleForm.content || !articleForm.excerpt) {
        throw new Error("Veuillez remplir tous les champs obligatoires.");
      }

      if (articleForm.excerpt.length > 200) {
        throw new Error("L'extrait ne doit pas dépasser 200 caractères.");
      }

      let featuredImageUrl = null;

      // Uploader l'image vers Cloudinary si elle existe
      if (selectedImage) {
        try {
          setArticleMessage("📤 Upload de l'image en cours...");
          featuredImageUrl = await uploadImageToCloudinary(selectedImage);
          setArticleMessage("✅ Image uploadée avec succès !");
        } catch (uploadError) {
          throw new Error(
            "Échec de l'upload de l'image: " + uploadError.message
          );
        }
      }

      const articleData = {
        title: articleForm.title,
        content: articleForm.content,
        excerpt: articleForm.excerpt,
        tags: articleForm.tags,
        isMemberOnly: articleForm.isMemberOnly,
        isPublished: articleForm.isPublished,
        featuredImage: featuredImageUrl, // Ajout de l'image featured
      };

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(articleData),
      });
      console.log(articleData)

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Erreur lors de la création de l'article"
        );
      }

      if (result.success) {
        setArticleMessage("✅ Article créé avec succès !");
        setArticleForm({
          title: "",
          content: "",
          excerpt: "",
          tags: ["tendances", "innovation"],
          isMemberOnly: false,
          isPublished: true,
        });
        setSelectedImage(null);
        setImagePreview(null);
        setUploadProgress(0);

        if (onArticleCreated) {
          onArticleCreated();
        }

        setTimeout(() => {
          onClose();
          setArticleMessage("");
        }, 2000);
      } else {
        throw new Error(
          result.message || "Erreur lors de la création de l'article"
        );
      }
    } catch (error) {
      setArticleMessage(`❌ ${error.message}`);
    } finally {
      setArticleLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#4b2c5e]">
              Créer un nouvel article
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
              disabled={articleLoading}
            >
              ✕
            </button>
          </div>

          {articleMessage && (
            <div
              className={`p-4 rounded-md mb-6 ${
                articleMessage.includes("✅") || articleMessage.includes("📤")
                  ? "bg-[#ddd3e6] text-[#4b2c5e] border border-blue-200"
                  : articleMessage.includes("❌")
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "bg-green-50 text-green-700 border border-green-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{articleMessage}</span>
                {uploadProgress > 0 && (
                  <span className="text-sm font-medium">{uploadProgress}%</span>
                )}
              </div>
              {uploadProgress > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleCreateArticle} className="space-y-6">
            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image à la une <span className="text-gray-400 text-xs">(Optionnel)</span>
              </label>
              {imagePreview ? (
                <div className="relative mb-3">
                  <img
                    src={imagePreview}
                    alt="Aperçu de l'image à la une"
                    className="w-full h-64 object-cover rounded-md border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    disabled={articleLoading}
                    aria-label="Supprimer l'image"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center hover:border-blue-400 transition-colors">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    Cliquez pour télécharger une image
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG, GIF, WebP jusqu'à 5MB
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageChange}
                className="hidden"
                id="article-image-upload"
                disabled={articleLoading}
              />
              <label
                htmlFor="article-image-upload"
                className={`block w-full mt-2 px-4 py-2 rounded-md text-center transition-colors ${
                  articleLoading
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "bg-[#ddd3e6] text-[#4b2c5e] hover:bg-blue-100 cursor-pointer"
                }`}
              >
                {articleLoading ? "Chargement..." : "Télécharger une image"}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre *
              </label>
              <input
                ref={titleInputRef}
                type="text"
                name="title"
                required
                value={articleForm.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                placeholder="Titre de l'article"
                disabled={articleLoading}
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Extrait *
              </label>
              <textarea
                name="excerpt"
                required
                value={articleForm.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                placeholder="Court résumé de l'article (max 200 caractères)"
                maxLength="200"
                disabled={articleLoading}
              />
              <p className="text-xs text-gray-500 mt-1">
                {articleForm.excerpt.length}/200 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contenu *
              </label>
              <textarea
                name="content"
                required
                value={articleForm.content}
                onChange={handleInputChange}
                rows="12"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                placeholder="Contenu complet de l'article"
                disabled={articleLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                  placeholder="Ajouter un tag"
                  disabled={articleLoading}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
                  disabled={articleLoading}
                >
                  Ajouter
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {articleForm.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-[#4b2c5e]"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-blue-600 hover:text-[#4b2c5e]"
                      disabled={articleLoading}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isMemberOnly"
                  checked={articleForm.isMemberOnly}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  disabled={articleLoading}
                  id="isMemberOnly"
                />
                <label htmlFor="isMemberOnly" className="ml-2 text-sm text-gray-700">
                  Réservé aux membres seulement
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={articleForm.isPublished}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                  disabled={articleLoading}
                  id="isPublished"
                />
                <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                  Publier immédiatement
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={articleLoading}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={articleLoading}
                className="px-4 py-2 bg-[#4b2c5e] text-white rounded-md hover:bg-[#3d234e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {articleLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                <span>
                  {articleLoading ? "Création en cours..." : "Créer l'article"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
