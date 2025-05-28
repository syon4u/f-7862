
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Question {
  id: number;
  question: string;
  options: { value: string; label: string; }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What's your child's preferred style?",
    options: [
      { value: "casual", label: "Casual & Comfortable" },
      { value: "trendy", label: "Trendy & Fashion-forward" },
      { value: "classic", label: "Classic & Timeless" },
      { value: "sporty", label: "Sporty & Active" }
    ]
  },
  {
    id: 2,
    question: "What colors does your child gravitate towards?",
    options: [
      { value: "bright", label: "Bright & Bold Colors" },
      { value: "pastels", label: "Soft Pastels" },
      { value: "neutrals", label: "Neutral Tones" },
      { value: "patterns", label: "Fun Patterns & Prints" }
    ]
  },
  {
    id: 3,
    question: "What's most important when choosing clothes?",
    options: [
      { value: "comfort", label: "Comfort & Ease of Movement" },
      { value: "durability", label: "Durability & Quality" },
      { value: "style", label: "Style & Appearance" },
      { value: "value", label: "Value for Money" }
    ]
  },
  {
    id: 4,
    question: "What occasions do you shop for most?",
    options: [
      { value: "everyday", label: "Everyday Wear" },
      { value: "school", label: "School & Activities" },
      { value: "special", label: "Special Occasions" },
      { value: "seasonal", label: "Seasonal Events" }
    ]
  }
];

const StyleQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const saveResults = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to save your quiz results",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    try {
      setIsSubmitting(true);

      // Get customer ID
      const { data: customer } = await supabase
        .from('customers')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!customer) {
        throw new Error('Customer record not found');
      }

      // Save quiz results
      const { error } = await supabase
        .from('style_preferences')
        .upsert({
          customer_id: customer.id,
          quiz_results: answers,
          preferences: generatePreferences(answers)
        });

      if (error) {
        console.error('Error saving quiz results:', error);
        toast({
          title: "Error",
          description: "Failed to save quiz results",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Your style preferences have been saved!"
        });
        navigate('/shop-clothing');
      }
    } catch (error) {
      console.error('Error saving quiz results:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generatePreferences = (answers: Record<number, string>) => {
    // Generate style preferences based on answers
    const preferences: Record<string, any> = {
      style: answers[1] || 'casual',
      colors: answers[2] || 'neutrals',
      priority: answers[3] || 'comfort',
      occasions: answers[4] || 'everyday'
    };

    // Add recommended categories based on answers
    const categories = [];
    if (preferences.style === 'sporty') categories.push('activewear');
    if (preferences.occasions === 'special') categories.push('formal');
    if (preferences.style === 'casual') categories.push('everyday');
    
    preferences.recommended_categories = categories;
    
    return preferences;
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <Card className="w-full max-w-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Complete!</CardTitle>
              <CardDescription>
                Thank you for completing our style quiz. We'll use your preferences to personalize your shopping experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Your Style Profile:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Preferred Style:</strong> {answers[1] || 'Not selected'}
                  </div>
                  <div>
                    <strong>Color Preference:</strong> {answers[2] || 'Not selected'}
                  </div>
                  <div>
                    <strong>Priority:</strong> {answers[3] || 'Not selected'}
                  </div>
                  <div>
                    <strong>Main Occasions:</strong> {answers[4] || 'Not selected'}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={saveResults} disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save & Shop Now'}
                </Button>
                <Button variant="outline" onClick={() => navigate('/shop-clothing')}>
                  Browse Products
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const currentAnswer = answers[currentQ.id];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-center mb-4">Style Quiz</h1>
            <p className="text-center text-muted-foreground mb-6">
              Help us understand your child's style preferences
            </p>
            <Progress value={progress} className="w-full" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
                {currentQ.options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  disabled={!currentAnswer}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StyleQuiz;
