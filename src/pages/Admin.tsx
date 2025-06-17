
import { useState, useEffect } from 'react';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { AdminPanel } from '@/components/admin/AdminPanel';
import { supabase } from '@/integrations/supabase/client';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Admin: Starting authentication check...');
    
    let isMounted = true;

    const checkAuth = async () => {
      try {
        setAuthError(null);
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        if (sessionError) {
          console.error('Admin: Session error:', sessionError);
          setAuthError('Failed to check authentication status');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        if (!session?.user) {
          console.log('Admin: No active session found');
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        console.log('Admin: Session found, checking admin role for user:', session.user.id);
        
        // Check admin role with error handling
        try {
          const { data: roleData, error: roleError } = await supabase.rpc('has_role', {
            _user_id: session.user.id,
            _role: 'admin'
          });

          if (!isMounted) return;

          if (roleError) {
            console.error('Admin: Role check error:', roleError);
            // If the function doesn't exist or fails, try direct role check
            const { data: roleCheck, error: directRoleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id)
              .eq('role', 'admin')
              .single();

            if (directRoleError && directRoleError.code !== 'PGRST116') {
              console.error('Admin: Direct role check failed:', directRoleError);
              setAuthError('Failed to verify admin privileges');
              setIsAuthenticated(false);
            } else if (roleCheck) {
              console.log('Admin: Admin role confirmed via direct check');
              setIsAuthenticated(true);
            } else {
              console.log('Admin: User does not have admin role');
              setAuthError('Access denied: Admin privileges required');
              setIsAuthenticated(false);
            }
          } else if (roleData) {
            console.log('Admin: Admin role confirmed via function');
            setIsAuthenticated(true);
          } else {
            console.log('Admin: User does not have admin role');
            setAuthError('Access denied: Admin privileges required');
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Admin: Role check failed with exception:', error);
          setAuthError('Failed to verify admin privileges');
          setIsAuthenticated(false);
        }
      } catch (error) {
        if (!isMounted) return;
        console.error('Admin: Authentication check failed:', error);
        setAuthError('Authentication check failed');
        setIsAuthenticated(false);
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
      
      console.log('Admin: Auth state changed:', event);
      
      if (event === 'SIGNED_OUT' || !session) {
        setIsAuthenticated(false);
        setAuthError(null);
        setIsLoading(false);
      } else if (event === 'SIGNED_IN' && session?.user) {
        // Re-run the full auth check
        setIsLoading(true);
        setTimeout(checkAuth, 100); // Small delay to ensure session is fully established
      }
    });

    return () => {
      console.log('Admin: Component unmounting');
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    console.log('Admin: Login successful, setting authenticated state');
    setIsAuthenticated(true);
    setAuthError(null);
  };

  const handleLogout = async () => {
    console.log('Admin: Logout initiated');
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      setIsAuthenticated(false);
      setAuthError(null);
    } catch (error) {
      console.error('Admin: Logout error:', error);
    } finally {
      setIsLoading(false);
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
            <p className="text-sm text-muted-foreground mt-2">
              Please contact the administrator to get admin privileges.
            </p>
          </div>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                setAuthError(null);
                setIsLoading(true);
                window.location.reload();
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
            >
              Sign Out
            </button>
          </div>
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
