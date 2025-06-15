
import { useState, useEffect } from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Check if user has admin role
        const { data: roleData, error: roleError } = await supabase
          .rpc('has_role', {
            _user_id: session.user.id,
            _role: 'admin'
          });

        if (!roleError && roleData) {
          setIsAuthenticated(true);
          localStorage.setItem('gallery_admin_auth', 'authenticated');
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('gallery_admin_auth');
        }
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem('gallery_admin_auth');
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        localStorage.removeItem('gallery_admin_auth');
      } else if (session?.user) {
        // Check admin role when signed in
        const { data: roleData, error: roleError } = await supabase
          .rpc('has_role', {
            _user_id: session.user.id,
            _role: 'admin'
          });

        if (!roleError && roleData) {
          setIsAuthenticated(true);
          localStorage.setItem('gallery_admin_auth', 'authenticated');
        } else {
          setIsAuthenticated(false);
          localStorage.removeItem('gallery_admin_auth');
          await supabase.auth.signOut();
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    localStorage.removeItem('gallery_admin_auth');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? (
    <AdminPanel onLogout={handleLogout} />
  ) : (
    <AdminLogin onLogin={handleLogin} />
  );
};

export default Admin;
