"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/config";
import { users, products, User as UserType } from "@/lib/mock-data";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Mail, Github, Twitter, Instagram, Youtube, Facebook } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/product-card";
import AiSuggestions from "@/components/ai-suggestions";
import { Skeleton } from "@/components/ui/skeleton";

const getInitials = (name: string | null | undefined) => {
  if (!name) return "U";
  return name.split(' ').map(n => n[0]).join('');
}

const socialIcons = {
  github: Github,
  x: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  facebook: Facebook,
};

export default function ProfilePage() {
  const params = useParams();
  const { userId } = params;
  const { user: currentUser } = useAuth();

  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;
      setLoading(true);

      const mockUser = users.find(u => u.id === userId);

      if (mockUser) {
        setUser(mockUser);
      } else if (typeof userId === 'string') {
        try {
          const userDoc = await getDoc(doc(firestore, "users", userId));
          if (userDoc.exists()) {
            setUser(userDoc.data() as UserType);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);
  
  if (loading) {
    return (
        <div className="space-y-8">
            <Card className="p-8 flex flex-col md:flex-row items-center gap-8">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="space-y-4 flex-grow">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <div className="flex gap-4 pt-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                </div>
            </Card>
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-64 w-full" />
        </div>
    );
  }

  if (!user) {
    return <div className="text-center py-10">User not found.</div>;
  }
  
  const allProductDescriptions = products.map(p => p.description);

  return (
    <div className="space-y-8 pb-16 sm:pb-0">
      <Card className="p-6 sm:p-8 flex flex-col md:flex-row items-center text-center md:text-left gap-6 md:gap-8 shadow-lg">
        <Avatar className="h-24 w-24 md:h-32 md:w-32 text-4xl border-4 border-primary/20">
          <AvatarImage src={user.avatarUrl || `https://placehold.co/128x128.png`} alt={user.name} data-ai-hint="person avatar"/>
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <h1 className="text-3xl sm:text-4xl font-bold font-headline">{user.name}</h1>
          <a href={`mailto:${user.email}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2 mt-1">
            <Mail className="h-4 w-4" />
            {user.email}
          </a>
          <p className="mt-4 text-foreground max-w-prose">{user.bio}</p>
          <div className="flex items-center justify-center md:justify-start flex-wrap gap-2 mt-4">
            {Object.entries(user.socials).map(([key, value]) => {
              const Icon = socialIcons[key as keyof typeof socialIcons];
              return Icon && value ? (
                <a key={key} href={value} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="icon">
                    <Icon className="h-5 w-5" />
                  </Button>
                </a>
              ) : null;
            })}
             {currentUser && currentUser.uid === userId && (
              <AiSuggestions userBio={user.bio} productDescriptions={allProductDescriptions} />
            )}
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="shared" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
          <TabsTrigger value="shared">Shared Products</TabsTrigger>
          <TabsTrigger value="saved">Saved Products</TabsTrigger>
        </TabsList>
        <TabsContent value="shared" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.filter(p => p.ownerId === user.id).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
            {products.filter(p => p.ownerId === user.id).length === 0 && (
                <p className="col-span-full text-center text-muted-foreground">This user hasn't shared any products yet.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {products.filter(p => p.isBookmarked).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
             {products.filter(p => p.isBookmarked).length === 0 && (
                <p className="col-span-full text-center text-muted-foreground">No saved products yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
