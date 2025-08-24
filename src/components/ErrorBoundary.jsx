import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button.jsx';
import Card from '@/components/ui/Card.jsx';
import { useTranslation } from '@/hooks/useTranslation';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(_) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToMyService(error, errorInfo);
  }

  handleRetry = () => {
    // Reset the error boundary state
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <Card className="max-w-lg w-full p-8 text-center">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              <TranslationWrapper translationKey="errors.generic" />
            </h1>
            
            <p className="text-gray-600 mb-6">
              <TranslationWrapper translationKey="errors.notFound" />
            </p>

            <div className="space-y-4">
              <Button 
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center space-x-2"
                translationKey="common.tryAgain"
              >
                <RefreshCw className="h-4 w-4" />
                <span><TranslationWrapper translationKey="common.tryAgain" /></span>
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => window.location.reload()}
                className="w-full"
                translationKey="common.refreshPage"
              >
                <TranslationWrapper translationKey="common.refreshPage" />
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

// Functional component to use hooks inside class component
const TranslationWrapper = ({ translationKey }) => {
  const { t } = useTranslation();
  return t(translationKey);
};

export default ErrorBoundary;