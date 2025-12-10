import { useState } from 'react';
import {
  Building2,
  Server,
  Shield,
  Copyright,
  AlertTriangle,
  Scale,
  Mail,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Check,
  User,
  MapPin,
  Phone,
  Linkedin
} from 'lucide-react';

/**
 * LegalSettings - Mentions Légales
 * Affiche toutes les informations légales conformes à la LCEN et au RGPD
 */
const LegalSettings = () => {
  const [expandedSections, setExpandedSections] = useState({
    editor: false,
    hosting: false,
    rgpd: false,
    copyright: false,
    liability: false,
    jurisdiction: false,
    contact: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Section Éditeur de l'application */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('editor')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-between hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900 dark:hover:to-teal-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Éditeur de l'application
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Informations légales conformes à l'article 6-III de la LCEN
              </p>
            </div>
          </div>
          {expandedSections.editor ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.editor && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Nom de l'éditeur</p>
                <p className="text-gray-900 dark:text-gray-100">Brice Béchet</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Statut</p>
                <p className="text-gray-900 dark:text-gray-100">Projet personnel - Usage non commercial</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Adresse</p>
                <p className="text-gray-900 dark:text-gray-100">
                  1 rue Charlier<br />
                  51100 Reims<br />
                  France
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Contact</p>
                <div className="space-y-2">
                  <a 
                    href="mailto:bechetbrice@hotmail.com"
                    className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    bechetbrice@hotmail.com
                  </a>
                  <a 
                    href="https://linkedin.com/in/brice-béchet-reims"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-teal-600 dark:text-teal-400 hover:underline"
                  >
                    <Linkedin className="w-4 h-4" />
                    linkedin.com/in/brice-béchet-reims
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section Hébergement */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('hosting')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 flex items-center justify-between hover:from-cyan-100 hover:to-blue-100 dark:hover:from-cyan-900 dark:hover:to-blue-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Server className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Hébergement
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Informations sur l'hébergeur (article 6-III-2 de la LCEN)
              </p>
            </div>
          </div>
          {expandedSections.hosting ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.hosting && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4 space-y-3 text-sm">
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Site web</p>
                <a 
                  href="https://coolabflow.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                >
                  coolabflow.fr
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Hébergeur</p>
                <p className="text-gray-900 dark:text-gray-100">OVH</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Raison sociale</p>
                <p className="text-gray-900 dark:text-gray-100">OVH SAS</p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Siège social</p>
                <p className="text-gray-900 dark:text-gray-100">
                  2 rue Kellermann<br />
                  59100 Roubaix<br />
                  France
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">Site web</p>
                <a 
                  href="https://www.ovh.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                >
                  www.ovh.com
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Section Protection des données (RGPD) */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('rgpd')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 flex items-center justify-between hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-900 dark:hover:to-emerald-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Protection des données (RGPD)
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Conformité au Règlement Général sur la Protection des Données
              </p>
            </div>
          </div>
          {expandedSections.rgpd ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.rgpd && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            {/* Responsable du traitement */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Responsable du traitement</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Brice Béchet<br />
                1 rue Charlier, 51100 Reims<br />
                Email : bechetbrice@hotmail.com
              </p>
            </div>

            {/* Nature des données collectées */}
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Nature des données collectées</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Aucune donnée personnelle n'est collectée</strong> par l'éditeur de l'application
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Stockage 100% local</strong> : Toutes vos données sont enregistrées uniquement sur votre appareil (localStorage)
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Aucune transmission</strong> : Aucune donnée n'est envoyée vers des serveurs externes
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Aucun cookie</strong> : L'application n'utilise aucun cookie
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Aucun tracker</strong> : Pas de Google Analytics ni autre outil de tracking
                  </p>
                </div>
              </div>
            </div>

            {/* Vos droits */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Vos droits (Articles 15 à 22 du RGPD)</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                <li><strong>Droit d'accès</strong> : Obtenir la confirmation que des données vous concernant sont traitées</li>
                <li><strong>Droit de rectification</strong> : Faire corriger des données inexactes</li>
                <li><strong>Droit à l'effacement</strong> : Demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité</strong> : Récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition</strong> : S'opposer au traitement de vos données</li>
              </ul>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 italic">
                Note : Ces droits ne sont pas applicables dans le cadre de cette application car aucune donnée personnelle n'est collectée ni traitée par l'éditeur.
              </p>
            </div>

            {/* Exercice des droits */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Exercice de vos droits</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Pour toute question relative à la protection des données, vous pouvez contacter :
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Email : bechetbrice@hotmail.com<br />
                Délai de réponse : 1 mois maximum (conformément à l'article 12 du RGPD)
              </p>
            </div>

            {/* Réclamation CNIL */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Réclamation auprès de la CNIL</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Vous disposez du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
              </p>
              <a 
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
              >
                www.cnil.fr
                <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Adresse : 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section Propriété intellectuelle & Licence */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('copyright')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-cyan-50 to-emerald-50 dark:from-cyan-950 dark:to-emerald-950 flex items-center justify-between hover:from-cyan-100 hover:to-emerald-100 dark:hover:from-cyan-900 dark:hover:to-emerald-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Copyright className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Propriété intellectuelle & Licence
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Droits d'auteur et conditions d'utilisation du code source
              </p>
            </div>
          </div>
          {expandedSections.copyright ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.copyright && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            {/* Copyright */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Copyright</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Copyright © 2025 Brice Béchet - Tous droits réservés
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Le code source, la conception, l'architecture et les fonctionnalités de BusinessPlanBuilder sont la propriété exclusive de Brice Béchet.
              </p>
            </div>

            {/* Licence MIT */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Licence Open Source - MIT</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Cette application est distribuée sous licence MIT, une licence libre et permissive.
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Vous êtes autorisé à :</p>
              <div className="space-y-1 text-sm">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">Utiliser le logiciel à des fins commerciales</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">Modifier le code source</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">Distribuer le logiciel</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">Accorder des sous-licences</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 dark:text-gray-300">Utiliser le logiciel à titre privé</p>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-3 mb-2">Conditions :</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                <li>Conserver la notice de copyright</li>
                <li>Inclure une copie de la licence MIT</li>
              </ul>
            </div>

            {/* Code source */}
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Code source</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Le code source complet est disponible sur GitHub :
              </p>
              <a 
                href="https://github.com/bechetbrice/BusinessPlanBuilder"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
              >
                github.com/bechetbrice/BusinessPlanBuilder
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Marques */}
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Marques et noms commerciaux</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Le nom "BusinessPlanBuilder" et le logo associé sont la propriété de Brice Béchet. Toute utilisation de ces marques à des fins commerciales nécessite une autorisation préalable écrite.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section Limitation de responsabilité */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-red-200 dark:border-red-800">
        <button
          onClick={() => toggleSection('liability')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 flex items-center justify-between hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900 dark:hover:to-red-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Limitation de responsabilité
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Clause de non-garantie et exclusion de responsabilité
              </p>
            </div>
          </div>
          {expandedSections.liability ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.liability && (
          <div className="p-4 sm:p-6 border-t border-red-200 dark:border-red-800 space-y-4">
            {/* Clause "en l'état" */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Clause "en l'état"</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Cette application est fournie "EN L'ÉTAT", sans garantie d'aucune sorte, expresse ou implicite, y compris, mais sans s'y limiter, les garanties de qualité marchande, d'adéquation à un usage particulier et d'absence de contrefaçon.
              </p>
            </div>

            {/* Exclusion de garantie */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Exclusion de garantie</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                L'éditeur ne garantit pas que l'application :
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                <li>Fonctionnera sans interruption ou sans erreur</li>
                <li>Sera exempte de virus ou autres composants nuisibles</li>
                <li>Répondra à vos besoins ou attentes spécifiques</li>
                <li>Sera compatible avec votre matériel ou configuration</li>
                <li>Produira des résultats exacts, fiables ou complets</li>
              </ul>
            </div>

            {/* Limitation de responsabilité */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Limitation de responsabilité</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                En aucun cas, l'éditeur ne saurait être tenu responsable de tout dommage, y compris mais sans s'y limiter :
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                <li>Perte de données, de chiffre d'affaires ou de profits</li>
                <li>Interruption d'activité</li>
                <li>Dommages directs, indirects, accessoires ou consécutifs</li>
                <li>Préjudice moral ou commercial</li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                Et ce, même si l'éditeur a été informé de la possibilité de tels dommages.
              </p>
            </div>

            {/* Responsabilité de l'utilisateur */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Responsabilité de l'utilisateur</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                L'utilisateur est seul responsable de :
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                <li>La sauvegarde régulière de ses données via la fonction d'export</li>
                <li>L'utilisation conforme et appropriée de l'application</li>
                <li>La protection de son appareil contre les virus et malwares</li>
                <li>La vérification de l'exactitude des données saisies</li>
                <li>Les décisions prises sur la base des informations générées</li>
              </ul>
            </div>

            {/* Force majeure */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Force majeure</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                L'éditeur ne saurait être tenu responsable de tout retard ou défaillance dans l'exécution de ses obligations résultant d'événements indépendants de sa volonté, notamment en cas de force majeure (catastrophe naturelle, guerre, grève, panne informatique, etc.).
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Section Droit applicable et juridiction */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('jurisdiction')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-teal-950 dark:to-cyan-950 flex items-center justify-between hover:from-teal-100 hover:to-cyan-100 dark:hover:from-teal-900 dark:hover:to-cyan-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Droit applicable et juridiction
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Loi applicable et tribunaux compétents
              </p>
            </div>
          </div>
          {expandedSections.jurisdiction ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.jurisdiction && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
            {/* Droit applicable */}
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Droit applicable</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Les présentes mentions légales sont régies par le droit français.
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Textes applicables :</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                <li>Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN)</li>
                <li>Règlement (UE) 2016/679 du 27 avril 2016 (RGPD)</li>
                <li>Loi n° 78-17 du 6 janvier 1978 Informatique et Libertés (modifiée)</li>
                <li>Code de la propriété intellectuelle</li>
                <li>Code de la consommation</li>
              </ul>
            </div>

            {/* Juridiction compétente */}
            <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Juridiction compétente</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                En cas de litige relatif à l'utilisation de cette application, les tribunaux français seront seuls compétents.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Tribunal compétent :</strong> Tribunal de Reims (51100)
              </p>
            </div>

            {/* Médiation */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Médiation</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Conformément aux articles L.611-1 et R.612-1 du Code de la consommation, l'utilisateur a le droit de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable du litige qui l'oppose à l'éditeur.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Le recours à la médiation peut s'effectuer :
              </p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 ml-4 list-disc">
                <li>
                  En ligne sur la plateforme européenne : 
                  <a 
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-400 hover:underline ml-1"
                  >
                    ec.europa.eu/consumers/odr
                  </a>
                </li>
                <li>Auprès d'un médiateur agréé par la CECMC (Centre Européen de la Consommation)</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Section Contact */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection('contact')}
          className="w-full p-4 sm:p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-between hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900 dark:hover:to-teal-900 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-800 dark:text-gray-200 flex-shrink-0" />
            <div className="text-left">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
                Contact
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">
                Pour toute question ou réclamation
              </p>
            </div>
          </div>
          {expandedSections.contact ? (
            <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
          )}
        </button>
        
        {expandedSections.contact && (
          <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Pour toute question, suggestion ou réclamation concernant BusinessPlanBuilder, vous pouvez contacter l'éditeur :
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Contact</p>
                <a 
                  href="mailto:bechetbrice@hotmail.com"
                  className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  bechetbrice@hotmail.com
                </a>
                <a 
                  href="https://linkedin.com/in/brice-béchet-reims"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <Linkedin className="w-4 h-4" />
                  linkedin.com/in/brice-béchet-reims
                </a>
              </div>

              <div className="pt-3 border-t border-emerald-200 dark:border-emerald-800">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">Par courrier :</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Brice Béchet<br />
                  1 rue Charlier<br />
                  51100 Reims<br />
                  France
                </p>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 pt-3 border-t border-emerald-200 dark:border-emerald-800">
                <strong>Délai de réponse :</strong> Nous nous efforçons de répondre à toutes les demandes dans un délai maximum de 30 jours.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer avec version */}
      <div className="text-center py-6 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        <p className="font-semibold mb-1">BusinessPlanBuilder - Version 1.0.0 Beta</p>
        <p>Dernière mise à jour des mentions légales : Novembre 2025</p>
        <p className="mt-1">Application gratuite - Projet personnel</p>
      </div>
    </div>
  );
};

export default LegalSettings;
