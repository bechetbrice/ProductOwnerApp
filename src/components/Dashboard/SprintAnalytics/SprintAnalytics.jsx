import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { TrendingUp, TrendingDown, Activity, Target, Calendar, CheckCircle, AlertCircle, BarChart3, ArrowUp, Clock, Heart, PieChart as PieChartIcon } from 'lucide-react';
import { DASHBOARD_TEXT } from '../Common/DashboardConstants';
import { InfoTooltip } from '../../ui';

const SprintAnalytics = ({ 
  sprints = [], 
  userStories = [],
  products = []
}) => {
  const [selectedSprintId, setSelectedSprintId] = useState(null);

  // Sélectionner automatiquement le premier sprint actif ou le plus récent
  useMemo(() => {
    if (!selectedSprintId && sprints.length > 0) {
      const activeSprint = sprints.find(s => s.status === 'active');
      const latestSprint = sprints.sort((a, b) => 
        new Date(b.startDate) - new Date(a.startDate)
      )[0];
      setSelectedSprintId(activeSprint?.id || latestSprint?.id);
    }
  }, [sprints, selectedSprintId]);

  const selectedSprint = sprints.find(s => s.id === selectedSprintId);

  // Calculer les métriques du sprint sélectionné
  const getSprintMetrics = (sprint) => {
    if (!sprint) return null;

    const stories = userStories.filter(s => sprint.storyIds?.includes(s.id));
    
    const totalPoints = stories.reduce((sum, s) => sum + (s.estimation || 0), 0);
    const completedPoints = stories
      .filter(s => s.status === 'done')
      .reduce((sum, s) => sum + (s.estimation || 0), 0);
    const inProgressPoints = stories
      .filter(s => s.status === 'inProgress')
      .reduce((sum, s) => sum + (s.estimation || 0), 0);
    const todoPoints = stories
      .filter(s => s.status === 'todo')
      .reduce((sum, s) => sum + (s.estimation || 0), 0);

    const totalStories = stories.length;
    const completedStories = stories.filter(s => s.status === 'done').length;
    const inProgressStories = stories.filter(s => s.status === 'inProgress').length;
    const todoStories = stories.filter(s => s.status === 'todo').length;

    const progressPercentage = totalPoints > 0 
      ? Math.round((completedPoints / totalPoints) * 100) 
      : 0;

    // Calculs temporels
    const today = new Date();
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const elapsedDays = Math.min(totalDays, Math.max(0, Math.ceil((today - startDate) / (1000 * 60 * 60 * 24))));
    const remainingDays = Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));

    const timeProgressPercentage = sprint.status === 'completed' 
      ? 100 
      : Math.round((elapsedDays / totalDays) * 100);

    // Vélocité moyenne (points complétés par jour)
    const velocity = elapsedDays > 0 ? (completedPoints / elapsedDays).toFixed(1) : 0;

    // Prédiction de fin basée sur la vélocité
    const pointsRemaining = totalPoints - completedPoints;
    const predictedDaysToComplete = velocity > 0 ? Math.ceil(pointsRemaining / velocity) : 0;
    const predictedEndDate = new Date(today);
    predictedEndDate.setDate(predictedEndDate.getDate() + predictedDaysToComplete);

    const isOnTrack = sprint.status === 'completed' 
      ? true 
      : predictedEndDate <= endDate;

    return {
      totalPoints,
      completedPoints,
      inProgressPoints,
      todoPoints,
      totalStories,
      completedStories,
      inProgressStories,
      todoStories,
      progressPercentage,
      totalDays,
      elapsedDays,
      remainingDays,
      timeProgressPercentage,
      velocity,
      predictedEndDate,
      isOnTrack
    };
  };

  // Générer les données du Burndown Chart
  const generateBurndownData = (sprint, metrics) => {
    if (!sprint || !metrics) return [];

    const data = [];
    const startDate = new Date(sprint.startDate);
    const endDate = new Date(sprint.endDate);
    const today = new Date();

    // Burndown idéal (ligne de référence linéaire)
    const totalPoints = metrics.totalPoints;
    const totalDays = metrics.totalDays;
    const dailyIdealBurn = totalPoints / totalDays;

    for (let i = 0; i <= totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const idealRemaining = Math.max(0, totalPoints - (dailyIdealBurn * i));
      
      // Simulation réaliste du burndown actuel basé sur la progression
      let actualRemaining = null;
      if (currentDate <= today || sprint.status === 'completed') {
        const dayProgress = i / totalDays;
        const currentProgress = metrics.progressPercentage / 100;
        
        // Si le sprint est terminé, utiliser la progression finale
        if (sprint.status === 'completed') {
          actualRemaining = totalPoints - (totalPoints * currentProgress * (i / totalDays));
        } else if (currentDate <= today) {
          // Pour les jours passés, estimer le burndown basé sur la progression actuelle
          actualRemaining = totalPoints - (totalPoints * Math.min(1, currentProgress / dayProgress) * dayProgress);
        }
        
        actualRemaining = Math.max(0, Math.round(actualRemaining));
      }

      data.push({
        day: i,
        date: currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        ideal: Math.round(idealRemaining),
        actual: actualRemaining
      });
    }

    return data;
  };

  // PHASE 1 - BURNUP CHART
  const generateBurnupData = (sprint, metrics) => {
    if (!sprint || !metrics) return [];

    const data = [];
    const startDate = new Date(sprint.startDate);
    const totalDays = metrics.totalDays;
    const totalPoints = metrics.totalPoints;

    for (let i = 0; i <= totalDays; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const dayProgress = i / totalDays;
      const currentProgress = metrics.progressPercentage / 100;

      // Scope (total points planifiés)
      const scope = totalPoints;

      // Completed (points complétés au fil du temps)
      let completed = 0;
      if (currentDate <= new Date() || sprint.status === 'completed') {
        if (sprint.status === 'completed') {
          completed = totalPoints * currentProgress * (i / totalDays);
        } else if (currentDate <= new Date()) {
          completed = totalPoints * Math.min(1, currentProgress / Math.max(0.01, metrics.elapsedDays / totalDays)) * dayProgress;
        }
        completed = Math.min(scope, Math.round(completed));
      }

      data.push({
        day: i,
        date: currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        scope: scope,
        completed: completed || null
      });
    }

    return data;
  };

  // PHASE 2 - SPRINT HEALTH SCORE
  const calculateSprintHealth = (sprint, metrics, velocityData) => {
    if (!sprint || !metrics) return { score: 0, factors: [] };

    const factors = [];

    // Facteur 1 : Vélocité vs Moyenne (30%)
    let velocityScore = 0;
    if (velocityData.length > 0 && metrics.velocity > 0) {
      const avgVelocity = velocityData.reduce((sum, d) => sum + d.completed, 0) / velocityData.length;
      const velocityRatio = parseFloat(metrics.velocity) / avgVelocity;
      velocityScore = Math.min(30, Math.round(velocityRatio * 30));
      factors.push({
        name: 'Vélocité',
        score: velocityScore,
        max: 30,
        status: velocityScore >= 25 ? 'good' : velocityScore >= 15 ? 'warning' : 'danger'
      });
    } else {
      velocityScore = 20; // Score neutre si pas de données
      factors.push({
        name: 'Vélocité',
        score: 20,
        max: 30,
        status: 'neutral'
      });
    }

    // Facteur 2 : Burndown vs Idéal (30%)
    let burndownScore = 0;
    if (metrics.progressPercentage >= metrics.timeProgressPercentage) {
      burndownScore = 30; // En avance ou dans les temps
    } else {
      const gap = metrics.timeProgressPercentage - metrics.progressPercentage;
      burndownScore = Math.max(0, 30 - gap);
    }
    factors.push({
      name: 'Progression',
      score: Math.round(burndownScore),
      max: 30,
      status: burndownScore >= 25 ? 'good' : burndownScore >= 15 ? 'warning' : 'danger'
    });

    // Facteur 3 : Stories bloquées/en cours (20%)
    let flowScore = 20;
    if (metrics.totalStories > 0) {
      const inProgressRatio = metrics.inProgressStories / metrics.totalStories;
      if (inProgressRatio > 0.5) {
        flowScore = 10; // Trop de WIP
      } else if (inProgressRatio > 0.3) {
        flowScore = 15;
      }
    }
    factors.push({
      name: 'Flux de travail',
      score: flowScore,
      max: 20,
      status: flowScore >= 15 ? 'good' : flowScore >= 10 ? 'warning' : 'danger'
    });

    // Facteur 4 : Scope Creep (20%)
    let scopeScore = 20; // Par défaut bon (pas de détection de scope creep dans les données actuelles)
    factors.push({
      name: 'Stabilité scope',
      score: scopeScore,
      max: 20,
      status: 'good'
    });

    const totalScore = velocityScore + burndownScore + flowScore + scopeScore;

    return {
      score: Math.round(totalScore),
      factors: factors
    };
  };

  // Données CFD (Cumulative Flow Diagram)
  const getCFDData = (sprint, metrics) => {
    if (!sprint || !metrics) return [];

    const data = [];
    const startDate = new Date(sprint.startDate);
    const totalDays = metrics.totalDays;

    for (let i = 0; i <= Math.min(totalDays, metrics.elapsedDays); i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      const dayProgress = i / totalDays;
      const currentProgress = metrics.progressPercentage / 100;

      // Estimation de la distribution todo/inProgress/done au fil du temps
      const donePercentage = Math.min(1, (currentProgress / Math.max(0.01, metrics.elapsedDays / totalDays)) * dayProgress);
      const inProgressPercentage = Math.min(0.3, dayProgress * 0.4); // Max 30% en cours
      const todoPercentage = Math.max(0, 1 - donePercentage - inProgressPercentage);

      data.push({
        day: i,
        date: currentDate.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
        done: Math.round(metrics.totalStories * donePercentage),
        inProgress: Math.round(metrics.totalStories * inProgressPercentage),
        todo: Math.round(metrics.totalStories * todoPercentage)
      });
    }

    return data;
  };

  // Calculer la vélocité sur les derniers sprints (jusqu'à 6, minimum 1)
  const getVelocityData = () => {
    const completedSprints = sprints
      .filter(s => s.status === 'completed')
      .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
      .slice(-6);

    return completedSprints.map(sprint => {
      const stories = userStories.filter(s => sprint.storyIds?.includes(s.id));
      const completedPoints = stories
        .filter(s => s.status === 'done')
        .reduce((sum, s) => sum + (s.estimation || 0), 0);
      const totalPoints = stories.reduce((sum, s) => sum + (s.estimation || 0), 0);

      return {
        name: sprint.name,
        completed: completedPoints,
        planned: totalPoints,
        efficiency: totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0
      };
    });
  };

  const metrics = getSprintMetrics(selectedSprint);
  const burndownData = generateBurndownData(selectedSprint, metrics);
  const velocityData = getVelocityData();
  const cfdData = getCFDData(selectedSprint, metrics);
  const burnupData = generateBurnupData(selectedSprint, metrics);
  const healthData = calculateSprintHealth(selectedSprint, metrics, velocityData);

  if (sprints.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 sm:p-8 lg:p-12 text-center">
        <BarChart3 className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
        <p className="text-gray-500 text-sm sm:text-base lg:text-lg">Aucun sprint disponible pour l'analyse</p>
        <p className="text-gray-400 text-xs sm:text-sm mt-1.5 sm:mt-2">Créez votre premier sprint pour voir les analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
        {/* Sélecteur de sprint */}
        <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Sprint à analyser
              </label>
              <select
                value={selectedSprintId || ''}
                onChange={(e) => setSelectedSprintId(e.target.value)}
                className="w-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {sprints
                  .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
                  .map(sprint => {
                    const product = products.find(p => p.id === sprint.productId);
                    return (
                      <option key={sprint.id} value={sprint.id}>
                        {sprint.name} - {product ? `[${product.code}]` : ''} 
                        {sprint.status === 'active' ? ' 🟢 En cours' : ''}
                        {sprint.status === 'completed' ? ' ✓ Terminé' : ''}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>

        {selectedSprint && metrics && (
          <>
            {/* Grille 2 colonnes pour les graphiques - NOUVEL ORDRE */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              
              {/* Row 1 : Sprint Health Score + Distribution Stories */}
              <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
                <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
                  <Heart size={18} className="sm:w-5 sm:h-5 text-red-500 flex-shrink-0" />
                  <span className="truncate">Sprint Health Score</span>
                  <InfoTooltip text="Score global de santé du sprint sur 100 points, basé sur 4 facteurs : Vélocité (30%, comparée à la moyenne historique), Progression (30%, avance/retard par rapport au temps écoulé), Flux de travail (20%, limite WIP), et Stabilité du scope (20%, détection ajouts). Score vert ≥80 = excellent, orange 60-79 = attention, rouge <60 = risque." />
                </h3>
                <div className="flex flex-col items-center gap-3 sm:gap-6 lg:flex-row lg:gap-8">
                  {/* Jauge radiale */}
                  <div className="flex-shrink-0 relative">
                    <svg width="140" height="140" viewBox="0 0 200 200" className="sm:w-[160px] sm:h-[160px] lg:w-[200px] lg:h-[200px]">
                      {/* Fond gris */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="20"
                        strokeDasharray="220"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(180 100 100)"
                      />
                      {/* Jauge colorée */}
                      <circle
                        cx="100"
                        cy="100"
                        r="70"
                        fill="none"
                        stroke={
                          healthData.score >= 80 ? '#10B981' : 
                          healthData.score >= 60 ? '#F59E0B' : '#EF4444'
                        }
                        strokeWidth="20"
                        strokeDasharray="220"
                        strokeDashoffset={220 - (220 * healthData.score) / 100}
                        strokeLinecap="round"
                        transform="rotate(180 100 100)"
                        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className={`text-3xl sm:text-4xl font-bold ${
                          healthData.score >= 80 ? 'text-green-600' : 
                          healthData.score >= 60 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {healthData.score}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600">/ 100</p>
                      </div>
                    </div>
                  </div>

                  {/* Détail des facteurs */}
                  <div className="flex-1 w-full">
                    <div className="space-y-2 sm:space-y-3">
                      {healthData.factors.map((factor, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">{factor.name}</span>
                            <span className="text-xs sm:text-sm font-bold text-gray-900 ml-2 flex-shrink-0">{factor.score} / {factor.max}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                factor.status === 'good' ? 'bg-green-500' :
                                factor.status === 'warning' ? 'bg-orange-500' :
                                factor.status === 'danger' ? 'bg-red-500' : 'bg-gray-400'
                              }`}
                              style={{ width: `${(factor.score / factor.max) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
                <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
                  <Activity size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Distribution des Stories</span>
                  <InfoTooltip text="Visualisez la répartition de vos stories par statut (À faire, En cours, Terminé). Un sprint sain devrait voir la barre 'Terminé' progresser régulièrement, tandis que 'À faire' diminue. Si 'En cours' reste élevé, cela peut indiquer un goulot d'étranglement." />
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">À faire</span>
                      <span className="text-xs sm:text-sm font-bold text-gray-600">
                        {metrics.todoStories} ({metrics.todoPoints} pts)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                      <div
                        className="bg-gray-400 h-2.5 sm:h-3 rounded-full transition-all"
                        style={{ width: `${metrics.totalStories > 0 ? (metrics.todoStories / metrics.totalStories) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">En cours</span>
                      <span className="text-xs sm:text-sm font-bold text-orange-600">
                        {metrics.inProgressStories} ({metrics.inProgressPoints} pts)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                      <div
                        className="bg-orange-500 h-2.5 sm:h-3 rounded-full transition-all"
                        style={{ width: `${metrics.totalStories > 0 ? (metrics.inProgressStories / metrics.totalStories) * 100 : 0}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-medium text-gray-700">Terminé</span>
                      <span className="text-xs sm:text-sm font-bold text-green-600">
                        {metrics.completedStories} ({metrics.completedPoints} pts)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 sm:h-3">
                      <div
                        className="bg-green-500 h-2.5 sm:h-3 rounded-full transition-all"
                        style={{ width: `${metrics.progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2 : Burndown Chart + Burnup Chart */}
              <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
                <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
                  <TrendingDown size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Burndown Chart</span>
                  <InfoTooltip text="Le Burndown montre la diminution des story points restants jour après jour. La ligne grise pointillée représente le rythme idéal. Si la ligne bleue (réel) est au-dessus, vous êtes en retard. En dessous, vous êtes en avance. Objectif : terminer à 0 points le dernier jour du sprint." />
                </h3>
                <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] lg:h-[300px]">
                  <LineChart data={burndownData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10 }}
                      className="sm:text-xs"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tick={{ fontSize: 10 }}
                      className="sm:text-xs"
                      label={{ value: 'Story Points', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="ideal" 
                      stroke="#9CA3AF" 
                      strokeDasharray="5 5"
                      name="Burndown Idéal"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Burndown Réel"
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
                <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
                  <ArrowUp size={18} className="sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                  <span className="truncate">Burnup Chart</span>
                  <InfoTooltip text="Contrairement au Burndown, le Burnup montre la progression positive : les points complétés montent vers le scope total. La ligne grise (scope) devrait rester stable. Si elle monte, vous ajoutez du travail en cours de sprint (scope creep). Objectif : rejoindre la ligne scope avant la fin du sprint." />
                </h3>
                <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] lg:h-[300px]">
                  <LineChart data={burnupData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10 }}
                      className="sm:text-xs"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tick={{ fontSize: 10 }}
                      className="sm:text-xs"
                      label={{ value: 'Story Points', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line 
                      type="monotone" 
                      dataKey="scope" 
                      stroke="#9CA3AF" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Scope Total"
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="completed" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Points Complétés"
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Row 3 : Cumulative Flow Diagram (pleine largeur) */}
              <div className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6 lg:col-span-2">
                <h3 className={`${DASHBOARD_TEXT.h2} mb-3 sm:mb-4 flex items-center gap-2`}>
                  <Activity size={18} className="sm:w-5 sm:h-5 flex-shrink-0" />
                  <span className="truncate">Cumulative Flow Diagram</span>
                  <InfoTooltip text="Le CFD empile les zones 'À faire', 'En cours' et 'Terminé' pour montrer le flux de travail. Des zones parallèles indiquent un flux régulier. Une zone 'En cours' qui s'élargit signale trop de travail en parallèle (WIP). Une zone 'À faire' qui monte indique un scope creep (ajout de stories)." />
                </h3>
                <ResponsiveContainer width="100%" height={200} className="sm:h-[250px] lg:h-[300px]">
                  <AreaChart data={cfdData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 10 }}
                      className="sm:text-xs"
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis 
                      tick={{ fontSize: 10 }}
                      className="sm:text-xs"
                      label={{ value: 'Nombre de Stories', angle: -90, position: 'insideLeft', style: { fontSize: 10 } }}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc', fontSize: '12px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Area 
                      type="monotone" 
                      dataKey="done" 
                      stackId="1"
                      stroke="#10B981" 
                      fill="#10B981"
                      name="Terminé"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="inProgress" 
                      stackId="1"
                      stroke="#F59E0B" 
                      fill="#F59E0B"
                      name="En cours"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="todo" 
                      stackId="1"
                      stroke="#6B7280" 
                      fill="#6B7280"
                      name="À faire"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
  );
};

export default SprintAnalytics;
