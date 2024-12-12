// @ts-nocheck
import React, { useState, useContext, useReducer } from 'react';
import { Mail, Lock, User, Eye, EyeOff, BeanOff } from 'lucide-react';
import { AuthContext } from '../../contextproviders/Authcontext';
import { NavLink } from 'react-router-dom';
// import { Spinner } from "flowbite-react";
import { loadingReducer, initialState } from '../reducers/reducers';

const Signup = () => {
  const {  signup } = useContext(AuthContext)
  const [passwordCheck, setPasswordCheck] = useState('');
  const [emailCheck, setEmailCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    allergies: ''
  });


 const [loadingState, dispatch] = useReducer(loadingReducer, initialState);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    const validatePassword = (password) => {
      const minLength = 8;
      // const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      return password.length >= minLength  && hasLowerCase && hasNumber;
    };

    const validateEmail = (email) => {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }

    if (e.target.name === 'password') {
      const isValid = validatePassword(e.target.value);
      if (!isValid) {
        setPasswordCheck('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
      } else {
        setPasswordCheck('');
      }
    }

    if (e.target.name === "email") {
      const isValid = validateEmail(e.target.value);
      if (!isValid) {
        setEmailCheck('Enter a valid email address')
      } else {
        setEmailCheck('')
      }
    }
    
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOADING' });

    try {
   

      // Perform sign up
      // After sign up, you might want to log the user in
      signup({ email: formData.email, name: formData.name, allergies: formData.allergies, password: formData.password })
    
  } catch (e) {
   dispatch({ type: 'ERROR', payload: e.message})
    console.log(`An error occurred: ${e.toString()}`)
  }
    console.log('Form submitted:', formData);
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-white border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
           Sign Up
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            Welcome back! Please login to your account.
          
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
         
          
              <>
              <div>
                <label 
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {/* Allergies field  */}
            <div>
              <label 
                htmlFor="allergies" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Dietary Restrictions/Allergies
              </label>
              <div className="relative">
                <BeanOff className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="allergies"
                  name="allergies"
                  type="text"
                  placeholder="eg. groundnuts"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={formData.allergies}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            </>
        

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <p>{ emailCheck }</p>
            </div>


            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                >
                  {showPassword ? <Eye className="h-4 w-4"/> : <EyeOff className="h-4 w-4"/>}
                </button>
                <input
                  id="password"
                  name="password"
                  type= { showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className= { passwordCheck.length < 1 ? "w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors" : "w-full pl-10 pr-4 py-2 border border-red-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors" }
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <p>{ passwordCheck }</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
             Sign Up
          </button>

          {/* Toggle Link */}
          <p className="mt-4 text-sm text-gray-600 text-center">
            
             Already have an account? 
            <NavLink
              to="/"
              className="text-blue-600 hover:underline focus:outline-none pl-3"
            >
             Login
            </NavLink>
          </p>
          <p className='mt-4 mx-auto flex items-center justify-center w-full text-red-500'> { loadingState.error}</p>
        </form>
      </div>
    </div>
  );
};

export default Signup;