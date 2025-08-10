// import { useState } from 'react';
// import { X, User, Lock, Eye, EyeOff } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const UserLogin = ({ isOpen, onClose }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
  
//   const { login } = useAuth();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setError(''); // Clear error when user types
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const result = await login(formData);
      
//       if (result.success) {
//         console.log('Login successful');
//         onClose();
//         // You can add a success notification here
//         alert('Login successful!');
//       } else {
//         setError(result.message);
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       setError(error.message || 'An error occurred during login');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 border-2 border-gray-600 rounded-lg shadow-xl w-full max-w-md mx-4">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-600">
//           <div className="flex items-center space-x-3">
//             <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
//               <div className="w-4 h-4 rounded-full bg-white"></div>
//             </div>
//             <h2 className="text-xl font-bold text-white">User Authentication</h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
//           >
//             <X className="w-5 h-5 text-white" />
//           </button>
//         </div>

//         {/* Login Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Error Message */}
//           {error && (
//             <div className="p-3 bg-red-900 border border-red-600 rounded-lg">
//               <p className="text-red-200 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Username Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Username
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter username"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-gray-300">
//               Password
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter password"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//           >
//             {isLoading ? (
//               <div className="flex items-center space-x-2">
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                 <span>Signing In...</span>
//               </div>
//             ) : (
//               'Sign In'
//             )}
//           </button>

//           {/* Demo Credentials */}
//           <div className="text-center">
//             <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
//             <p className="text-xs text-gray-500">
//               Username: <span className="text-gray-300">Admin User</span>
//             </p>
//             <p className="text-xs text-gray-500">
//               Password: <span className="text-gray-300">admin123</span>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserLogin; 