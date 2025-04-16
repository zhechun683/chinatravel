'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Calendar, Package, User } from 'lucide-react';

import { Navbar } from '@/components/organisms/navbar';
import { Footer } from '@/components/organisms/footer';
import { Button } from '@/components/atoms/button';
import { BookingDataTypes, VacationItemTypes } from '@/services/types';
import { getUserBookings } from '@/services/user';
import { formatValueToCurrency } from '@/utils/currency';

interface BookingWithDetails extends BookingDataTypes {
  itemDetails?: VacationItemTypes;
  date?: string;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadBookings() {
      setIsLoading(true);
      try {
        const userBookings = await getUserBookings();
        setBookings(userBookings);
      } catch (error) {
        console.error('Failed to load booking records:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadBookings();
  }, []);

  return (
    <>
      <header className="container mt-[1.88rem]">
        <Navbar />
      </header>
      <main className="container my-10">
        <div className="mb-8 flex items-center gap-2">
          <Link href="/account">
            <Button variant="ghost" className="h-9 w-9 p-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-3xl font-semibold text-[#232631]">My Travels</h1>
        </div>
        
        {isLoading ? (
          <div className="flex h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-secondary border-t-transparent"></div>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package size={64} className="mb-4 text-gray-300" />
            <h2 className="mb-2 text-xl font-semibold text-[#232631]">You don&apos;t have any bookings yet</h2>
            <p className="mb-6 text-[#7B7B7B]">Start exploring amazing destinations and book your first trip</p>
            <Button asChild>
              <Link href="/">Browse Travel Packages</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map((booking) => (
              <div 
                key={booking.id} 
                className="overflow-hidden rounded-xl border border-gray-200 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="relative h-48 w-full">
                  {booking.itemDetails?.image ? (
                    <Image
                      src={booking.itemDetails.image.startsWith('/') ? booking.itemDetails.image : `/${booking.itemDetails.image}`}
                      alt={booking.itemDetails?.title || 'Travel Image'}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                      <Package size={48} className="text-gray-300" />
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-medium text-[#232631]">
                    {booking.itemDetails?.title || 'Travel Package'}
                  </h3>
                  <p className="mb-3 text-sm text-[#7B7B7B]">
                    {booking.itemDetails?.city}, {booking.itemDetails?.country}
                  </p>
                  
                  <div className="mb-3 flex items-center gap-2 text-sm text-[#7B7B7B]">
                    <Calendar size={16} />
                    <span>{booking.date || 'Booking date unavailable'}</span>
                  </div>
                  
                  <div className="mb-4 flex items-center gap-2 text-sm text-[#7B7B7B]">
                    <User size={16} />
                    <span>{booking.amount} {booking.amount > 1 ? 'people' : 'person'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-medium text-secondary">
                      {booking.itemDetails?.price 
                        ? formatValueToCurrency(booking.amount * booking.itemDetails.price)
                        : 'Price unavailable'
                      }
                    </div>
                    
                    <Button asChild size="sm">
                      <Link href={`/vacation/${booking.item_id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
} 