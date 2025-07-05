import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { User, Mail, Lock, Phone, MapPin, Calendar, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const RegistrationForm = () => {
  const [mode, setMode] = useState<'register' | 'login' | 'otp' | 'forgot' | 'reset'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    streetNumber: '',
    streetName: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    birthDate: ''
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [resetData, setResetData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');

  // Form validation
  const getMissingFields = () => {
    const missing = [];
    if (!formData.firstName) missing.push('First Name');
    if (!formData.lastName) missing.push('Last Name');
    if (!formData.email) missing.push('Email');
    if (!formData.phone) missing.push('Phone');
    if (!formData.streetNumber) missing.push('Street Number');
    if (!formData.streetName) missing.push('Street Name');
    if (!formData.city) missing.push('City');
    if (!formData.state) missing.push('State');
    if (!formData.zipCode) missing.push('Zip Code');
    if (!formData.country) missing.push('Country');
    if (!formData.birthDate) missing.push('Birth Date');
    if (!formData.password) missing.push('Password');
    if (!formData.confirmPassword) missing.push('Confirm Password');
    return missing;
  };

  const isFormComplete = () => {
    return getMissingFields().length === 0 && formData.password === formData.confirmPassword;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendOTP = async (email: string) => {
    setIsSubmitting(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', generatedOTP); // In real app, this would be sent via email
    toast.success(`OTP sent to ${email}! (Check console for demo OTP)`);
    setOtpEmail(email);
    setIsSubmitting(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    await sendOTP(loginData.email);
    setMode('otp');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.email) {
      toast.error('Please enter your email address');
      return;
    }
    await sendOTP(loginData.email);
    setMode('forgot');
  };

  const handleOTPVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo OTP verification (in real app, verify against backend)
    if (otp.length === 6) {
      if (mode === 'otp') {
        toast.success("Login successful! Welcome back!");
        setMode('register');
      } else if (mode === 'forgot') {
        toast.success("OTP verified! Set your new password");
        setMode('reset');
      }
    } else {
      toast.error("Invalid OTP. Please try again.");
    }
    setIsSubmitting(false);
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetData.newPassword || !resetData.confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (resetData.newPassword !== resetData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success("Password reset successful! You can now login with your new password");
    setMode('login');
    setResetData({ newPassword: '', confirmPassword: '' });
    setOtp('');
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormComplete()) {
      const missing = getMissingFields();
      toast.error(`Please fill in missing fields: ${missing.join(', ')}`);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
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
            {mode === 'register' && 'Create Your Account'}
            {mode === 'login' && 'Welcome Back'}
            {mode === 'otp' && 'Verify OTP'}
            {mode === 'forgot' && 'Verify Email'}
            {mode === 'reset' && 'Reset Password'}
          </CardTitle>
          <CardDescription className="card-description">
            {mode === 'register' && 'Join our community and unlock amazing features'}
            {mode === 'login' && 'Sign in to access your account'}
            {mode === 'otp' && `Enter the OTP sent to ${otpEmail}`}
            {mode === 'forgot' && 'Enter OTP to reset your password'}
            {mode === 'reset' && 'Create a new password for your account'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="card-content">
          {/* Registration Form */}
          {mode === 'register' && (
            <form onSubmit={handleSubmit} className="form-container">
              <div className="input-grid">
                {/* Personal Information */}
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
                
                {/* Address Information */}
                <div className="input-group">
                  <Label htmlFor="streetNumber" className="input-label">
                    <MapPin className="label-icon" />
                    Street Number
                  </Label>
                  <Input
                    id="streetNumber"
                    name="streetNumber"
                    value={formData.streetNumber}
                    onChange={handleInputChange}
                    className="animated-input"
                    placeholder="Enter street number"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <Label htmlFor="streetName" className="input-label">
                    <MapPin className="label-icon" />
                    Street Name
                  </Label>
                  <Input
                    id="streetName"
                    name="streetName"
                    value={formData.streetName}
                    onChange={handleInputChange}
                    className="animated-input"
                    placeholder="Enter street name"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <Label htmlFor="city" className="input-label">
                    <MapPin className="label-icon" />
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="animated-input"
                    placeholder="Enter city"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <Label htmlFor="state" className="input-label">
                    <MapPin className="label-icon" />
                    State/Province
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="animated-input"
                    placeholder="Enter state or province"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <Label htmlFor="zipCode" className="input-label">
                    <MapPin className="label-icon" />
                    Zip Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="animated-input"
                    placeholder="Enter zip code"
                    required
                  />
                </div>
                
                <div className="input-group">
                  <Label htmlFor="country" className="input-label">
                    <MapPin className="label-icon" />
                    Country
                  </Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="animated-input"
                    placeholder="Enter country"
                    required
                  />
                </div>
                
                {/* Password Fields */}
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
              
              <Button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || !isFormComplete()}
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Create Account"
                )}
              </Button>
              
              <div className="auth-switch">
                <p>Already have an account? 
                  <Button 
                    type="button" 
                    variant="link" 
                    onClick={() => setMode('login')}
                    className="switch-button"
                  >
                    Sign In
                  </Button>
                </p>
              </div>
            </form>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="form-container">
              <div className="input-grid single-column">
                <div className="input-group">
                  <Label htmlFor="loginEmail" className="input-label">
                    <Mail className="label-icon" />
                    Email Address
                  </Label>
                  <Input
                    id="loginEmail"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="animated-input"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="input-group password-group">
                  <Label htmlFor="loginPassword" className="input-label">
                    <Lock className="label-icon" />
                    Password
                  </Label>
                  <div className="password-input-container">
                    <Input
                      id="loginPassword"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={handleLoginChange}
                      className="animated-input password-input"
                      placeholder="Enter your password"
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
              
              <Button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Sign In"
                )}
              </Button>
              
              <div className="auth-links">
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={handleForgotPassword}
                  className="forgot-button"
                  disabled={!loginData.email}
                >
                  Forgot Password?
                </Button>
                
                <div className="auth-switch">
                  <p>Don't have an account? 
                    <Button 
                      type="button" 
                      variant="link" 
                      onClick={() => setMode('register')}
                      className="switch-button"
                    >
                      Sign Up
                    </Button>
                  </p>
                </div>
              </div>
            </form>
          )}

          {/* OTP Verification Form */}
          {(mode === 'otp' || mode === 'forgot') && (
            <form onSubmit={handleOTPVerification} className="form-container">
              <div className="otp-container">
                <Label className="input-label otp-label">
                  Enter 6-digit OTP
                </Label>
                <InputOTP value={otp} onChange={setOtp} maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || otp.length !== 6}
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Verify OTP"
                )}
              </Button>
              
              <div className="auth-switch">
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={() => setMode('login')}
                  className="switch-button"
                >
                  Back to Login
                </Button>
              </div>
            </form>
          )}

          {/* Password Reset Form */}
          {mode === 'reset' && (
            <form onSubmit={handlePasswordReset} className="form-container">
              <div className="input-grid single-column">
                <div className="input-group password-group">
                  <Label htmlFor="newPassword" className="input-label">
                    <Lock className="label-icon" />
                    New Password
                  </Label>
                  <div className="password-input-container">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={resetData.newPassword}
                      onChange={handleResetChange}
                      className="animated-input password-input"
                      placeholder="Enter new password"
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
                
                <div className="input-group password-group">
                  <Label htmlFor="confirmNewPassword" className="input-label">
                    <Lock className="label-icon" />
                    Confirm New Password
                  </Label>
                  <div className="password-input-container">
                    <Input
                      id="confirmNewPassword"
                      name="confirmPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={resetData.confirmPassword}
                      onChange={handleResetChange}
                      className="animated-input password-input"
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="password-toggle"
                    >
                      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting || !resetData.newPassword || !resetData.confirmPassword}
              >
                {isSubmitting ? (
                  <div className="loading-spinner"></div>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
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
        
        .single-column {
          grid-template-columns: 1fr;
          max-width: 400px;
          margin: 0 auto;
        }
        
        .otp-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .otp-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #002540;
          text-align: center;
        }
        
        .auth-switch {
          text-align: center;
          margin-top: 1.5rem;
          color: #002540;
        }
        
        .auth-switch p {
          margin: 0;
          font-size: 0.95rem;
        }
        
        .switch-button {
          color: #0066cc;
          font-weight: 600;
          padding: 0;
          height: auto;
          text-decoration: none;
        }
        
        .switch-button:hover {
          color: #002540;
          text-decoration: underline;
        }
        
        .auth-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .forgot-button {
          color: #0066cc;
          font-weight: 500;
          padding: 0;
          height: auto;
          text-align: center;
        }
        
        .forgot-button:hover {
          color: #002540;
          text-decoration: underline;
        }
        
        .forgot-button:disabled {
          opacity: 0.5;
          color: #999;
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
