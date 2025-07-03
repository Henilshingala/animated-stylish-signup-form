import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Lock, Phone, MapPin, Calendar, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    birthDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Registration successful! Welcome to our platform!");
    setIsSubmitting(false);
  };

  return (
    <div className="registration-container">
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
        <div className="floating-triangle triangle-1"></div>
        <div className="floating-triangle triangle-2"></div>
      </div>
      
      <Card className="registration-card">
        <CardHeader className="card-header">
          <CardTitle className="card-title">
            Create Your Account
          </CardTitle>
          <CardDescription className="card-description">
            Join our community and unlock amazing features
          </CardDescription>
        </CardHeader>
        
        <CardContent className="card-content">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="tabs-list">
              <TabsTrigger value="personal" className="tab-trigger">
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="contact" className="tab-trigger">
                Contact Details
              </TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="form-container">
              <TabsContent value="personal" className="tab-content">
                <div className="input-grid">
                  <div className="input-group">
                    <Label htmlFor="firstName" className="input-label">
                      <User className="label-icon" />
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <Label htmlFor="lastName" className="input-label">
                      <User className="label-icon" />
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <Label htmlFor="birthDate" className="input-label">
                      <Calendar className="label-icon" />
                      Birth Date
                    </Label>
                    <Input
                      id="birthDate"
                      name="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={handleInputChange}
                      className="animated-input"
                      required
                    />
                  </div>
                  
                  <div className="input-group password-group">
                    <Label htmlFor="password" className="input-label">
                      <Lock className="label-icon" />
                      Password
                    </Label>
                    <div className="password-input-container">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleInputChange}
                        className="animated-input password-input"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="password-toggle"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contact" className="tab-content">
                <div className="input-grid">
                  <div className="input-group">
                    <Label htmlFor="email" className="input-label">
                      <Mail className="label-icon" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <Label htmlFor="phone" className="input-label">
                      <Phone className="label-icon" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div className="input-group">
                    <Label htmlFor="address" className="input-label">
                      <MapPin className="label-icon" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="animated-input"
                      placeholder="Enter your address"
                      required
                    />
                  </div>
                  
                  <div className="input-group password-group">
                    <Label htmlFor="confirmPassword" className="input-label">
                      <Lock className="label-icon" />
                      Confirm Password
                    </Label>
                    <div className="password-input-container">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="animated-input password-input"
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="password-toggle"
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <Button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </Tabs>
        </CardContent>
      </Card>
      
      <style>{`
        .registration-container {
          position: relative;
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          perspective: 1000px;
        }
        
        .floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .floating-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, #002540, #0066cc);
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }
        
        .circle-1 {
          width: 100px;
          height: 100px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }
        
        .circle-2 {
          width: 150px;
          height: 150px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }
        
        .circle-3 {
          width: 80px;
          height: 80px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }
        
        .floating-triangle {
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
          opacity: 0.08;
          animation: rotate 8s linear infinite;
        }
        
        .triangle-1 {
          border-left: 40px solid transparent;
          border-right: 40px solid transparent;
          border-bottom: 70px solid #002540;
          top: 30%;
          right: 20%;
          animation-delay: 1s;
        }
        
        .triangle-2 {
          border-left: 30px solid transparent;
          border-right: 30px solid transparent;
          border-bottom: 50px solid #0066cc;
          bottom: 30%;
          right: 30%;
          animation-delay: 3s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.1); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .registration-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          box-shadow: 
            0 25px 50px rgba(0, 37, 64, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          transform: rotateX(5deg) rotateY(-5deg);
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
          animation: cardEntrance 1s ease-out;
        }
        
        .registration-card:hover {
          transform: rotateX(0deg) rotateY(0deg) translateY(-10px);
          box-shadow: 
            0 35px 70px rgba(0, 37, 64, 0.4),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
        
        @keyframes cardEntrance {
          0% {
            opacity: 0;
            transform: rotateX(15deg) rotateY(-15deg) translateY(50px);
          }
          100% {
            opacity: 1;
            transform: rotateX(5deg) rotateY(-5deg) translateY(0px);
          }
        }
        
        .card-header {
          text-align: center;
          padding: 2rem 2rem 1rem;
          background: linear-gradient(135deg, #002540 0%, #003d66 100%);
          border-radius: 24px 24px 0 0;
          position: relative;
          overflow: hidden;
        }
        
        .card-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .card-title {
          color: white;
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
        }
        
        .card-description {
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }
        
        .card-content {
          padding: 2rem;
        }
        
        .tabs-list {
          background: rgba(0, 37, 64, 0.1);
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 2rem;
        }
        
        .tab-trigger {
          border-radius: 8px;
          transition: all 0.3s ease;
          font-weight: 600;
        }
        
        .tab-trigger[data-state="active"] {
          background: #002540;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 37, 64, 0.3);
        }
        
        .form-container {
          animation: fadeInUp 0.6s ease-out 0.3s both;
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .tab-content {
          animation: slideIn 0.4s ease-out;
        }
        
        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(20px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .input-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .input-group {
          position: relative;
          animation: inputSlideIn 0.6s ease-out;
        }
        
        .input-group:nth-child(1) { animation-delay: 0.1s; }
        .input-group:nth-child(2) { animation-delay: 0.2s; }
        .input-group:nth-child(3) { animation-delay: 0.3s; }
        .input-group:nth-child(4) { animation-delay: 0.4s; }
        
        @keyframes inputSlideIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .input-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          color: #002540;
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }
        
        .label-icon {
          width: 18px;
          height: 18px;
          color: #002540;
        }
        
        .animated-input {
          border: 2px solid rgba(0, 37, 64, 0.2);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
        }
        
        .animated-input:focus {
          border-color: #002540;
          box-shadow: 
            0 0 0 4px rgba(0, 37, 64, 0.1),
            0 4px 12px rgba(0, 37, 64, 0.15);
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.95);
        }
        
        .password-group {
          position: relative;
        }
        
        .password-input-container {
          position: relative;
        }
        
        .password-input {
          padding-right: 3rem;
        }
        
        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #002540;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .password-toggle:hover {
          background: rgba(0, 37, 64, 0.1);
        }
        
        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, #002540 0%, #0066cc 100%);
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 8px 24px rgba(0, 37, 64, 0.3);
        }
        
        .submit-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }
        
        .submit-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0, 37, 64, 0.4);
        }
        
        .submit-button:hover::before {
          left: 100%;
        }
        
        .submit-button:active {
          transform: translateY(-1px);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .input-grid {
            grid-template-columns: 1fr;
          }
          
          .card-title {
            font-size: 2rem;
          }
          
          .registration-card {
            margin: 1rem;
            transform: none;
          }
          
          .registration-card:hover {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationForm;
