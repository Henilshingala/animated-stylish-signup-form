
import RegistrationForm from '../components/RegistrationForm';
import Scene3D from '../components/Scene3D';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4 relative overflow-hidden">
      <Scene3D />
      <div className="w-full max-w-6xl relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Welcome to Our Platform
          </h1>
          <p className="text-xl text-blue-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Join thousands of users in our amazing community
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default Index;
