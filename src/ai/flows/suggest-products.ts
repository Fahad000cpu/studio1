'use server';
/**
 * @fileOverview Provides product suggestions based on a user's profile bio.
 *
 * - suggestProducts - A function that suggests products based on the user's bio.
 * - SuggestProductsInput - The input type for the suggestProducts function.
 * - SuggestProductsOutput - The return type for the suggestProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProductsInputSchema = z.object({
  userBio: z.string().describe('The bio of the user.'),
  productDescriptions: z.array(z.string()).describe('A list of product descriptions.'),
});
export type SuggestProductsInput = z.infer<typeof SuggestProductsInputSchema>;

const SuggestProductsOutputSchema = z.array(z.string()).describe('A list of product names that might interest the user.');
export type SuggestProductsOutput = z.infer<typeof SuggestProductsOutputSchema>;

export async function suggestProducts(input: SuggestProductsInput): Promise<SuggestProductsOutput> {
  return suggestProductsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProductsPrompt',
  input: {schema: SuggestProductsInputSchema},
  output: {schema: SuggestProductsOutputSchema},
  prompt: `You are an AI assistant that suggests products to users based on their profile bio.

User Bio: {{{userBio}}}

Product Descriptions: {{{productDescriptions}}}

Based on the user's bio, suggest a list of product names that might interest the user.
Return only the list of product names.`,
});

const suggestProductsFlow = ai.defineFlow(
  {
    name: 'suggestProductsFlow',
    inputSchema: SuggestProductsInputSchema,
    outputSchema: SuggestProductsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
