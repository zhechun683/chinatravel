'use client';

import { useState, useEffect, useRef } from 'react';
import { Camera, List, Upload, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/atoms/button';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { Footer } from '@/components/organisms/footer';
import { Navbar } from '@/components/organisms/navbar';
import { MemberTypes } from '@/services/types';
import { getUserProfile, updateUserProfile } from '@/services/user';

export default function AccountPage() {
  const [profile, setProfile] = useState<MemberTypes | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Form data
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
  });

  // Load user data
  useEffect(() => {
    async function loadUserProfile() {
      setIsLoading(true);
      try {
        // Try to get avatar from localStorage
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
          setAvatarSrc(savedAvatar);
        }
        
        // Get user profile
        const userData = await getUserProfile();
        if (userData) {
          setProfile(userData);
          setFormData({
            first_name: userData.first_name || '',
            last_name: userData.last_name || '',
            email: userData.email || '',
            phone_number: userData.phone_number?.toString() || '',
          });
        }
      } catch (error) {
        console.error('Failed to load user profile:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadUserProfile();
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save personal info
  const handleSave = async () => {
    try {
      if (!profile || !profile.id) {
        alert('Cannot save: User profile is incomplete');
        return;
      }
      
      const updatedProfile: MemberTypes = {
        id: profile.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone_number: formData.phone_number ? parseInt(formData.phone_number) : 0,
      };
      
      await updateUserProfile(updatedProfile);
      alert('Profile information saved successfully');
    } catch (error) {
      console.error('Failed to save profile information:', error);
      alert('Save failed, please try again later');
    }
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarSrc(result);
        localStorage.setItem('userAvatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open file selector
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Failed to access camera:', error);
      alert('Cannot access camera, please check permission settings');
    }
  };

  // Take photo
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const photoData = canvas.toDataURL('image/png');
        setAvatarSrc(photoData);
        localStorage.setItem('userAvatar', photoData);
        
        // Close camera
        const stream = video.srcObject as MediaStream;
        const tracks = stream?.getTracks() || [];
        tracks.forEach(track => track.stop());
        setCameraActive(false);
      }
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks() || [];
        tracks.forEach(track => track.stop());
      }
      setCameraActive(false);
    }
  };

  return (
    <>
      <header className="container mt-[1.88rem]">
        <Navbar />
      </header>
      <main className="container my-10">
        <h1 className="text-3xl font-semibold text-[#232631] mb-8">My Account</h1>
        
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left: Avatar and Upload */}
          <div className="flex flex-col items-center">
            <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-secondary/20 mb-4">
              {avatarSrc ? (
                <Image 
                  src={avatarSrc} 
                  alt="User Avatar" 
                  fill 
                  style={{ objectFit: 'cover' }} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <User size={64} className="text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="flex gap-2 mt-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={triggerFileInput}
                className="flex items-center gap-2"
              >
                <Upload size={16} />
                <span>Upload Avatar</span>
              </Button>
              
              <Button 
                size="sm" 
                variant="outline"
                onClick={cameraActive ? stopCamera : startCamera}
                className="flex items-center gap-2"
              >
                <Camera size={16} />
                <span>{cameraActive ? 'Close Camera' : 'Take Photo'}</span>
              </Button>
            </div>
            
            {/* Hidden file upload */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            
            {/* Camera interface */}
            {cameraActive && (
              <div className="mt-4 w-full">
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="w-full rounded-lg border border-gray-200" 
                />
                <Button 
                  onClick={takePhoto} 
                  className="mt-2 w-full bg-secondary text-white hover:bg-secondary/90"
                >
                  Take Photo
                </Button>
                <canvas ref={canvasRef} className="hidden" />
              </div>
            )}
            
            {/* My bookings link */}
            <div className="mt-6 w-full">
              <Link href="/account/bookings">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 font-medium"
                >
                  <List size={18} />
                  <span>My Travel Bookings</span>
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right: Personal info form */}
          <div className="flex-1 space-y-4">
            <h2 className="text-xl font-semibold text-[#232631] mb-4">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="Enter your first name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Enter your last name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone_number}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            
            <Button 
              className="mt-6 bg-secondary text-white hover:bg-secondary/90 font-medium py-3.5 text-xl w-full md:w-auto md:px-6" 
              onClick={handleSave}
            >
              Save Information
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 