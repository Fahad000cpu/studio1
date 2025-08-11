"use client";

import React, { useState } from 'react';
import { users } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const storiesData = users.map(user => ({
  userId: user.id,
  name: user.name,
  avatarUrl: user.avatarUrl,
  stories: [
    { type: 'image', url: 'https://placehold.co/1080x1920.png', duration: 5000, liked: false },
    { type: 'image', url: 'https://placehold.co/1080x1920.png', duration: 5000, liked: false },
  ]
}));

storiesData.push({
    userId: 'user_4',
    name: 'Tech Updates',
    avatarUrl: 'https://placehold.co/128x128.png',
    stories: [
        { type: 'image', url: 'https://placehold.co/1080x1920.png', duration: 5000, liked: false },
    ]
})

export default function StatusPage() {
  const [currentUserIndex, setCurrentUserIndex] = useState<number | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const openViewer = (index: number) => {
    setCurrentUserIndex(index);
    setCurrentStoryIndex(0);
  };

  const closeViewer = () => {
    setCurrentUserIndex(null);
  };
  
  const nextStory = () => {
    if (currentUserIndex === null) return;
    const currentUserStories = storiesData[currentUserIndex].stories;
    if (currentStoryIndex < currentUserStories.length - 1) {
        setCurrentStoryIndex(prev => prev + 1);
    } else if (currentUserIndex < storiesData.length - 1) {
        setCurrentUserIndex(prev => (prev !== null ? prev + 1 : 0));
        setCurrentStoryIndex(0);
    } else {
        closeViewer();
    }
  }

  const prevStory = () => {
     if (currentUserIndex === null) return;
     if (currentStoryIndex > 0) {
        setCurrentStoryIndex(prev => prev - 1);
    } else if (currentUserIndex > 0) {
        setCurrentUserIndex(prev => (prev !== null ? prev - 1 : 0));
        // This is a bit complex, we need to know the last story of the previous user
        setCurrentStoryIndex(storiesData[currentUserIndex - 1].stories.length - 1);
    }
  }


  return (
    <div className="p-4 sm:p-6 pb-20">
      <h1 className="text-2xl font-bold mb-4">Status</h1>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {storiesData.map((user, index) => (
          <div key={user.userId} className="flex flex-col items-center space-y-2 cursor-pointer" onClick={() => openViewer(index)}>
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-primary">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar"/>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs font-medium">{user.name}</span>
          </div>
        ))}
      </div>
      
      {currentUserIndex !== null && (
        <Dialog open={currentUserIndex !== null} onOpenChange={closeViewer}>
          <DialogContent className="p-0 m-0 bg-black border-0 w-screen h-screen max-w-full sm:max-w-md sm:h-[90vh] sm:rounded-lg">
             <div className="relative w-full h-full flex items-center justify-center">
                <div className="absolute top-0 left-0 right-0 p-4 z-10">
                    <div className="flex items-center gap-2 mb-2">
                        {storiesData[currentUserIndex].stories.map((_, idx) => (
                            <Progress key={idx} value={idx < currentStoryIndex ? 100 : (idx === currentStoryIndex ? 50: 0)} className="h-1 flex-1 bg-gray-500" />
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                            <Avatar className="w-8 h-8">
                                <AvatarImage src={storiesData[currentUserIndex].avatarUrl} alt={storiesData[currentUserIndex].name} />
                                <AvatarFallback>{storiesData[currentUserIndex].name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-white font-semibold text-sm">{storiesData[currentUserIndex].name}</span>
                         </div>
                        <Button variant="ghost" size="icon" onClick={closeViewer} className="text-white hover:bg-white/20 hover:text-white">
                            <X size={24} />
                        </Button>
                    </div>
                </div>

                <img 
                    src={storiesData[currentUserIndex].stories[currentStoryIndex].url} 
                    alt="Story" 
                    className="object-cover w-full h-full sm:rounded-lg"
                    data-ai-hint="social media story"
                />

                <div className="absolute left-0 top-0 h-full w-1/2" onClick={prevStory}></div>
                <div className="absolute right-0 top-0 h-full w-1/2" onClick={nextStory}></div>

                <Button variant="ghost" size="icon" onClick={prevStory} className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 hover:text-white">
                    <ChevronLeft />
                </Button>
                 <Button variant="ghost" size="icon" onClick={nextStory} className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 hover:text-white">
                    <ChevronRight />
                </Button>
             </div>
          </DialogContent>
        </Dialog>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Recent Updates</h2>
        <Card className="mt-2">
            <CardContent className="p-4">
                <p className="text-muted-foreground">No new updates to show right now.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}