import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="text-center bg-white p-8 rounded-lg shadow-2xl max-w-md w-full mx-4">
        <h1 className="text-6xl font-bold text-gray-800 mb-4 animate-bounce">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <Button variant="outline" className="transition-all duration-300 ease-in-out transform hover:scale-105">
            <Home className="mr-2 h-4 w-4" />
            Back to Previous Page
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
