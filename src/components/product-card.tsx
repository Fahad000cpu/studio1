import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/mock-data";

interface ProductCardProps {
  product: Product;
}

const aiHints: { [key: string]: string } = {
  prod_1: "bluetooth speaker",
  prod_2: "desk lamp",
  prod_3: "water bottle",
  prod_4: "ergonomic keyboard",
  prod_5: "headphones",
  prod_6: "espresso maker",
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="w-full flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
      <CardHeader className="p-0">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="object-cover w-full h-48"
            data-ai-hint={aiHints[product.id] || "product"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold mb-2">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-lg font-semibold text-primary">${product.price.toFixed(2)}</p>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-pink-500">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <Bookmark className="h-5 w-5" />
            <span className="sr-only">Bookmark</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
