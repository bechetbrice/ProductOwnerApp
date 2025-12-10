import React, { useState, useRef } from 'react';
import { Download, Upload, FolderOpen, Sparkles } from 'lucide-react';
import { exportData, importData, loadSampleDataDirectly, getAllData } from '../../utils/exportImport';

/**
 * Menu Export/Import pour ProductOwnerApp
 * Version: 3.0 - Structure inspirée de NavigationMenu
 * 
 * ✅ Structure simple et efficace
 * ✅ Responsive naturel sans classes complexes
 */
const ExportImportMenu = ({ isOpen, onClose, buttonRef }) => {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Vérifier si File System Access API est disponible (Chrome/Edge)
  const isFileSystemAccessSupported = 'showSaveFilePicker' in window;

  /**
   * Télécharger (Classique) - Sauvegarde JSON dans dossier Téléchargements
   */
  const handleDownloadClassic = () => {
    setIsProcessing(true);
    
    try {
      exportData();
      alert(`✅ Export réussi !`);
      onClose();
    } catch (error) {
      alert(`❌ Erreur lors de l'export : ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Sauvegarder sous... - Choisir l'emplacement (Chrome/Edge uniquement)
   */
  const handleSaveAs = async () => {
    if (!isFileSystemAccessSupported) {
      alert('Cette fonctionnalité nécessite Chrome ou Edge récent');
      return;
    }

    setIsProcessing(true);

    try {
      const allData = getAllData();
      
      const exportData = {
        version: '2.0.0',
        exportDate: new Date().toISOString(),
        metadata: {
          appName: 'ProductOwnerApp',
          exportType: 'manual'
        },
        data: allData
      };

      const jsonStr = JSON.stringify(exportData, null, 2);
      const timestamp = new Date().toISOString().split('T')[0];
      const filename = `productownerapp-backup-${timestamp}.json`;

      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{
          description: 'ProductOwnerApp Backup',
          accept: { 'application/json': ['.json'] },
        }],
      });

      const writable = await handle.createWritable();
      await writable.write(jsonStr);
      await writable.close();

      alert('✅ Sauvegarde réussie !');
      onClose();
    } catch (error) {
      if (error.name !== 'AbortError') {
        alert(`❌ Erreur lors de la sauvegarde : ${error.message}`);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Ouvrir un fichier... - Importer une sauvegarde
   */
  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  /**
   * Traite le fichier importé
   */
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    
    if (!file) return;

    setIsProcessing(true);

    try {
      if (file.name.endsWith('.json')) {
        const result = await importData(file, { merge: false });
        
        if (result.success && !result.cancelled) {
          alert('✅ Import réussi !\nL\'application va recharger...');
          window.location.reload();
        }
      } else {
        alert('❌ Format de fichier non supporté.\nUtilisez uniquement des fichiers .json');
      }

    } catch (error) {
      alert(`❌ Erreur lors de l'import : ${error.message}`);
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  /**
   * Charger données exemple depuis public/sample-data.json
   */
  const handleLoadDemo = async () => {
    if (!confirm('⚠️ Charger les données exemple ?\n\nLes données actuelles seront remplacées par des exemples pré-remplis.\n\nVoulez-vous continuer ?')) {
      setIsProcessing(false);
      return;
    }

    setIsProcessing(true);

    try {
      // Charger le fichier depuis le dossier public/examples/
      const response = await fetch('./examples/sample-data.json');
      
      if (!response.ok) {
        throw new Error(`Impossible de charger les données exemple (${response.status})`);
      }

      const sampleData = await response.json();
      
      loadSampleDataDirectly(sampleData);
      alert('✅ Données exemple chargées avec succès !\nL\'application va recharger...');
      window.location.reload();

    } catch (error) {
      alert(`❌ Erreur lors du chargement des données exemple : ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay pour fermer */}
      <div 
        className="fixed inset-0 z-40 bg-transparent" 
        onClick={onClose}
      />

      {/* Menu déroulant - Structure identique à NavigationMenu */}
      <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
        
        {/* Section SAUVEGARDER */}
        <div className="py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <Download className="w-3.5 h-3.5 inline mr-2" />
            Sauvegarder
          </div>

          {/* Export JSON */}
          <button
            onClick={handleDownloadClassic}
            disabled={isProcessing}
            className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg flex-shrink-0">
              <Download size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Exporter (JSON)
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Sauvegarde complète
              </p>
            </div>
          </button>

          {/* Sauvegarder sous... */}
          <button
            onClick={handleSaveAs}
            disabled={isProcessing || !isFileSystemAccessSupported}
            className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg flex-shrink-0">
              <FolderOpen size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Sauvegarder sous...
                {isFileSystemAccessSupported && (
                  <span className="ml-2 px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-semibold rounded uppercase">
                    Chrome/Edge
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Choisir l'emplacement
              </p>
            </div>
          </button>
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200 dark:border-gray-700" />

        {/* Section CHARGER */}
        <div className="py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <Upload className="w-3.5 h-3.5 inline mr-2" />
            Charger
          </div>

          {/* Ouvrir un fichier... */}
          <button
            onClick={handleOpenFile}
            disabled={isProcessing}
            className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex-shrink-0">
              <FolderOpen size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Ouvrir un fichier...
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Import JSON uniquement
              </p>
            </div>
          </button>

          {/* Input file caché */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Charger données exemple */}
          <button
            onClick={handleLoadDemo}
            disabled={isProcessing}
            className="w-full px-4 py-3 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg flex-shrink-0">
              <Sparkles size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Charger données exemple
                <span className="ml-2 px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-[10px] font-semibold rounded uppercase">
                  Demo
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Données pré-remplies complètes
              </p>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default ExportImportMenu;
