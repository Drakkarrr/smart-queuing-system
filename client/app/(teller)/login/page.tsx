// 'use client';

// import * as React from 'react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Logo from '@/assets/logo.png';
// import BgWaves from '@/assets/bg-waves.png';
// import { Button } from '@/components/ui/button';
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';

// export default function AdminLoginPage() {
//   const router = useRouter();

//   const handleSubmit = () => {
//     // TODO: Add authentication here
//     localStorage.setItem('isAuthenticated', 'true');

//     router.push('/admin/dashboard');
//   };

//   return (
//     <>
//       <div className='grid w-full h-full place-items-center'>
//         <div className='relative w-full h-52'>
//           <Image
//             src={BgWaves}
//             layout='fill'
//             objectPosition='bottom'
//             alt='Moelci-II waves'
//             className='rotate-180'
//           />
//         </div>
//         <div className='grid w-10/12 p-8 space-y-10 ring ring-black ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 place-items-center'>
//           <Image
//             src={Logo}
//             width={200}
//             height={200}
//             alt='Moelci-II logo'
//             className='absolute top-24'
//           />
//           <div className='w-full space-y-6'>
//             <Card className='w-[350px] mx-auto'>
//               <CardHeader className='text-center'>
//                 <CardTitle className='text-3xl font-bold font-heading'>
//                   Welcome Admin!
//                 </CardTitle>
//                 <CardDescription>Please login to continue</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <form>
//                   <div className='grid items-center w-full gap-4'>
//                     <div className='flex flex-col space-y-1.5'>
//                       <Label htmlFor='email'>Email</Label>
//                       <Input id='email' placeholder='admin@gmail.com' />
//                     </div>
//                     <div className='flex flex-col space-y-1.5'>
//                       <Label htmlFor='password'>Password</Label>
//                       <Input id='password' placeholder='*************' />
//                     </div>
//                   </div>
//                 </form>
//               </CardContent>
//               <CardFooter className='flex justify-between'>
//                 <Button variant='outline' onClick={() => router.push('/')}>
//                   Cancel
//                 </Button>
//                 <Button
//                   className='bg-[#F9D029] hover:bg-[#f9cf29b6]'
//                   onClick={handleSubmit}>
//                   Login
//                 </Button>
//               </CardFooter>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import BgWaves from '@/assets/bg-waves.png';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/app/api/api';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async () => {
    try {
      // const response = await fetch('http://localhost:8000/api/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });

      const response = await login({
              email: email,
              password: password,
            }
      );


      if (response.status != 200) {
        throw new Error('Invalid credentials');
      }

      const data = await response.data;

      // Assuming Laravel sends a token upon successful login
      localStorage.setItem('access_token', data['token']);

      // router.push('/admin/dashboard');
      router.push('/login/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <div className='grid w-full h-full place-items-center'>
        <div className='relative w-full h-52'>
          <Image
            src={BgWaves}
            layout='fill'
            objectPosition='bottom'
            alt='Moelci-II waves'
            className='rotate-180'
          />
        </div>
        <div className='grid w-10/12 p-8 space-y-10 ring ring-black ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-900 place-items-center'>
          <Image
            src={Logo}
            width={200}
            height={200}
            alt='Moelci-II logo'
            className='absolute top-24'
          />
          <div className='w-full space-y-6'>
            <Card className='w-[350px] mx-auto'>
              <CardHeader className='text-center'>
                <CardTitle className='text-3xl font-bold font-heading'>
                  Welcome Admin!
                </CardTitle>
                <CardDescription>Please login to continue</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className='grid items-center w-full gap-4'>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        placeholder='admin@gmail.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='password'>Password</Label>
                      <Input
                        id='password'
                        type='password'
                        placeholder='*************'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
              <CardFooter className='flex justify-between'>
                <Button variant='outline' onClick={() => router.push('/')}>
                  Cancel
                </Button>
                <Button
                  className='bg-[#F9D029] hover:bg-[#f9cf29b6]'
                  onClick={handleSubmit}>
                  Login
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
