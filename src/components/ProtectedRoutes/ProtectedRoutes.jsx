// src/components/ProtectedRoutes/ProtectedRoutes.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoutes = () => {
  const { user, isAuthenticating } = useContext(AuthContext);
  
  // إذا كانت عملية التحقق من المصادقة جارية، اعرض شاشة تحميل
  if (isAuthenticating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-primary text-xl">جاري التحميل...</div>
      </div>
    );
  }
  
  // إذا لم يكن المستخدم مسجل الدخول، قم بتوجيهه إلى صفحة تسجيل الدخول
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // إذا كان المستخدم مسجل الدخول، اعرض المحتوى المحمي
  return <Outlet />;
};

export default ProtectedRoutes;