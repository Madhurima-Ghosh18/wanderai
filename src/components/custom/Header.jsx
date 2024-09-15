import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);
  const [openHelpDialog, setOpenHelpDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const GetUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href='/'>
        <img src='/logo.svg' alt="Logo" />
      </a>
      <div className='flex items-center gap-5'>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href='/create-trip'>
              <Button variant="outline" className="rounded-full">+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button variant="outline" className="rounded-full">My Trips</Button>
            </a>
            <button onClick={() => setOpenHelpDialog(true)} className="relative group">
              <img src='/help.png' alt="Help Icon" className="h-[36px] w-[36px]" />
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] w-max bg-[rgb(255,145,0)] text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Need Help?
              </span>
            </button>
            <Popover>
              <PopoverTrigger>
                <img src={`${user?.picture}`} className='h-[35px] w-[35px] rounded-full' alt="User Profile" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}

        {/* Help Dialog */}
        <Dialog open={openHelpDialog} onOpenChange={setOpenHelpDialog}>
          <DialogContent className="fixed right-0 top-0 mt-10 mr-5 max-w-md w-full">
            <DialogHeader>
              <DialogTitle>How can we help you?</DialogTitle>
              <DialogDescription>
                Please describe your issue or question, and we will assist you.
              </DialogDescription>
            </DialogHeader>
            {/* Add additional content or form here */}
          </DialogContent>
        </Dialog>
      </div>

      {/* Sign In Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In With Google</DialogTitle>
            <DialogDescription>
              <img src="/logo.svg" alt="Logo" />
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
