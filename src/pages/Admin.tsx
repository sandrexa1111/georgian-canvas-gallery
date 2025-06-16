
import { useState, useEffect } from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Admin component mounting, checking authentication...');
    
    let isMounted = true;

    // Check authentication state
    const checkAuth = async () => {
      try {
        setAuthError(null);
        console.log('Getting current session...');
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setAuthError('Failed to check authentication status');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.log('No active session found');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        console.log('Session found, checking admin role for user:', session.user.id);
        
        // Check if user has admin role with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Admin role check timeout')), 10000)
        );
        
        const roleCheckPromise = supabase.rpc('has_role', {
          _user_id: session.user.id,
          _role: 'admin'
        });

        const { data: roleData, error: roleError } = await Promise.race([
          roleCheckPromise,
          timeoutPromise
        ]) as any;

        if (!isMounted) return;

        if (roleError) {
          console.error('Role check error:', roleError);
          setAuthError('Failed to verify admin privileges');
          setIsAuthenticated(false);
          await supabase.auth.signOut();
        } else if (roleData) {
          console.log('Admin role confirmed');
          setIsAuthenticated(true);
          localStorage.setItem('gallery_admin_auth', 'authenticated');
        } else {
          console.log('User does not have admin role');
          setAuthError('Access denied: Admin privileges required');
          setIsAuthenticated(false);
          await supabase.auth.signOut();
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Authentication check failed:', error);
        setAuthError('Authentication check failed');
        setIsAuthenticated(false);
        await supabase.auth.signOut();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    // Listen for auth changes with simplified logic
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;
      
      console.log('Auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        setAuthError(null);
        localStorage.removeItem('gallery_admin_auth');
      } else if (event === 'SIGNED_IN' && session?.user) {
        // Re-check admin role for new sessions
        try {
          const { data: roleData, error: roleError } = await supabase.rpc('has_role', {
            _user_id: session.user.id,
            _role: 'admin'
          });

          if (isMounted) {
            if (!roleError && roleData) {
              setIsAuthenticated(true);
              setAuthError(null);
              localStorage.setItem('gallery_admin_auth', 'authenticated');
            } else {
              setIsAuthenticated(false);
              setAuthError('Access denied: Admin privileges required');
              await supabase.auth.signOut();
            }
          }
        } catch (error) {
          if (isMounted) {
            console.error('Role check failed during sign in:', error);
            setIsAuthenticated(false);
            setAuthError('Failed to verify admin privileges');
            await supabase.auth.signOut();
          }
        }
      }
    });

    return () => {
      console.log('Admin component unmounting');
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    console.log('Admin login successful');
    setIsAuthenticated(true);
    setAuthError(null);
  };

  const handleLogout = async () => {
    console.log('Admin logout initiated');
    try {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setAuthError(null);
      localStorage.removeItem('gallery_admin_auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
            <p className="text-destructive font-medium">{authError}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
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
