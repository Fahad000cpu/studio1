"use client";

import { useState } from "react";
import { Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { suggestProducts, SuggestProductsInput } from "@/ai/flows/suggest-products";
import { useToast } from "@/hooks/use-toast";

interface AiSuggestionsProps {
  userBio: string;
  productDescriptions: string[];
}

export default function AiSuggestions({ userBio, productDescriptions }: AiSuggestionsProps) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const handleGetSuggestions = async () => {
    setLoading(true);
    setSuggestions([]);
    
    const input: SuggestProductsInput = {
      userBio,
      productDescriptions,
    };

    try {
      const result = await suggestProducts(input);
      setSuggestions(result);
    } catch (error) {
        console.error("AI suggestion failed:", error);
        toast({
            title: "AI Suggestion Failed",
            description: "Could not get suggestions at this time. Please try again later.",
            variant: "destructive",
        })
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={(open) => !open && setSuggestions([])}>
      <DialogTrigger asChild>
        <Button variant="default" onClick={handleGetSuggestions}>
          <Wand2 className="h-5 w-5 mr-2" />
          Get AI Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Personalized Product Suggestions</DialogTitle>
          <DialogDescription>
            Based on your bio, here are some products you might like.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 min-h-[10rem] flex items-center justify-center">
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Analyzing your profile...</span>
            </div>
          ) : (
            <ul className="space-y-2 list-disc list-inside w-full">
              {suggestions.length > 0 ? (
                suggestions.map((item, index) => <li key={index}>{item}</li>)
              ) : (
                <p className="text-muted-foreground text-center">No suggestions available right now.</p>
              )}
            </ul>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
