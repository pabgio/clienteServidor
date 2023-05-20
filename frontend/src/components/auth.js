import { useRouter } from 'next/router';
import { useEffect } from 'react';


export function useAuthentication() {
    const router = useRouter();

    
    useEffect(() => {

        const user = localStorage.getItem('user');


        
        if (!user) {
            router.push('/login');
        }

    }, []);

}
  