// // hooks/useSession.js
// 'use client'
// import { useState, useEffect } from 'react';

// export function useSession() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const specificemail = "abbtwd2019@gmail.com";

//   useEffect(() => {
//     const fetchSession = async () => {
//       try {
//         const res = await fetch('/api/login', {
//           credentials: 'include' // Important for cookies
//         });
//         const data = await res.json();
//         const isSpecificUser = data?.user?.email === specificEmail;
//         setUser({
//           ...data.user,
//           isSpecificUser // Add flag to user object
//         });
        
       
//       } catch (error) {
//         setUser(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSession();
//   }, []);

//   return { user, loading };
// }
// hooks/useSession.js
'use client'
import { useState, useEffect } from 'react';

export function useSession() {
  const [session, setSession] = useState({
    user: null,
    isSpecificUser: false,
    loading: true,
    error: null
  });
 
 const logout = async () => {
  try {
    const res = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
    
    if (!res.ok) throw new Error('Logout failed');
    
    // Clear local session state
    setSession({
      user: null,
      isSpecificUser: false,
      loading: false,
      error: null
    });
    
    // Optional: Refresh the page to ensure clean state
    window.location.reload();
    
  } catch (error) {
    setSession(prev => ({
      ...prev,
      error: error.message
    }));
  }
};

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/login', {
          credentials: 'include',
          cache: 'no-store'
        });

        if (!res.ok) throw new Error('Session check failed');
        
        const data = await res.json();
        
        setSession({
          user: data.user || null,
          isSpecificUser: data.user?.email === process.env.NEXT_PUBLIC_SPECIFIC_USER_EMAIL,
          loading: false,
          error: null
        });

      } catch (error) {
        setSession({
          user: null,
          isSpecificUser: false,
          loading: false,
          error: error.message
        });
      }
    };

    fetchSession();
  }, []);

  return  {...session, logout};
}