import Header from './Header';
import Footer from './Footer';
import { useNavigate } from '../../contexts/NavigateContext';

const PageWrapper = ({ currentView, children, onExport, onImport }) => {
  const navigate = useNavigate();

  return (
    // Content wrapper with independent scroll
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Scrollable content area including Header and Footer */}
      <div className="flex-1 overflow-y-auto scrollbar-invisible">
        <Header 
          currentView={currentView} 
          onNavigate={navigate}
          onExport={onExport}
          onImport={onImport}
        />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default PageWrapper;
