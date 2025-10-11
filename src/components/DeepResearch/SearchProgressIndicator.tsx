import React from 'react';

type SearchStatus = 'idle' | 'planning' | 'researching' | 'analyzing' | 'generating' | 'completed' | 'error';

interface SearchProgress {
  currentStep?: string;
  totalSteps?: number;
  currentStepNumber?: number;
  estimatedTimeRemaining?: string;
  sourcesFound?: number;
  pagesAnalyzed?: number;
}

interface SearchProgressIndicatorProps {
  status: SearchStatus;
  progress?: SearchProgress;
}

export const SearchProgressIndicator: React.FC<SearchProgressIndicatorProps> = ({
  status,
  progress = {}
}) => {
  const getStatusMessage = () => {
    switch (status) {
      case 'planning': return '🧠 Creating comprehensive research plan...';
      case 'researching': return '🔍 Performing deep web search across multiple sources...';
      case 'analyzing': return '📊 Analyzing and cross-referencing findings...';
      case 'generating': return '✍️ Generating comprehensive research report...';
      case 'completed': return '✅ Research complete!';
      case 'error': return '❌ Research encountered an error';
      default: return '⏳ Preparing to start deep research...';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed': return 'text-green-600 dark:text-green-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      case 'idle': return 'text-greyChateau';
      default: return 'text-black dark:text-white';
    }
  };

  const getProgressPercentage = () => {
    if (!progress.totalSteps || !progress.currentStepNumber) return 0;
    return Math.min((progress.currentStepNumber / progress.totalSteps) * 100, 100);
  };

  const isActive = status !== 'idle' && status !== 'completed' && status !== 'error';

  return (
    <div className="search-progress bg-whiteSmoke dark:bg-blackRussian2 rounded-lg p-6 border-0 space-y-4 transition-all duration-500">
      {/* Status Header */}
      <div className="progress-header flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isActive && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
          )}
          <h3 className={`text-lg font-semibold ${getStatusColor()}`}>
            {getStatusMessage()}
          </h3>
        </div>
        {progress.estimatedTimeRemaining && isActive && (
          <span className="text-sm text-greyChateau bg-white dark:bg-blackRussian px-3 py-1 rounded-full border border-greyCharcoal/20 dark:border-greyCharcoal/40">
            ETA: {progress.estimatedTimeRemaining}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      {isActive && (
        <div className="progress-bar">
          <div className="flex justify-between text-sm text-greyChateau mb-2">
            <span>
              {progress.currentStep || 'Initializing...'}
            </span>
            {progress.totalSteps && progress.currentStepNumber && (
              <span>
                Step {progress.currentStepNumber} of {progress.totalSteps}
              </span>
            )}
          </div>
          <div className="w-full bg-greyCharcoal/20 dark:bg-greyCharcoal/40 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}

      {/* Research Statistics */}
      {(progress.sourcesFound !== undefined || progress.pagesAnalyzed !== undefined) && (
        <div className="research-stats">
          <div className="grid grid-cols-2 gap-4">
            {progress.sourcesFound !== undefined && (
              <div className="stat-card bg-white dark:bg-blackRussian rounded-lg p-3 text-center border-0">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {progress.sourcesFound}
                </div>
                <div className="text-xs text-greyChateau">
                  Sources Found
                </div>
              </div>
            )}
            {progress.pagesAnalyzed !== undefined && (
              <div className="stat-card bg-white dark:bg-blackRussian rounded-lg p-3 text-center border-0">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {progress.sourcesFound ?? 0 + progress.pagesAnalyzed}
                </div>
                <div className="text-xs text-greyChateau">
                  Pages Analyzed
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchProgressIndicator;