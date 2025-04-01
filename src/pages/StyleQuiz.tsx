
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecommendationResults from '../components/RecommendationResults';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { QuizResponse, getRecommendations } from '@/utils/styleRecommendations';
import { Product } from '@/types/product';

const StyleQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6; // Added one more step for recommendations
  const [quizResponses, setQuizResponses] = useState<QuizResponse>({
    stylePreferences: [],
    colorPreferences: [],
    patternPreferences: [],
    clothingNeeds: [],
    personality: [],
    activities: [],
  });
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  const handleInputChange = (field: keyof QuizResponse, value: string | number) => {
    setQuizResponses(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field: keyof QuizResponse, value: string, isChecked: boolean) => {
    setQuizResponses(prev => {
      const currentValues = prev[field] as string[] || [];
      if (isChecked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter(v => v !== value) };
      }
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Generate recommendations when moving to the last step
      if (currentStep === totalSteps - 1) {
        const personalizedRecommendations = getRecommendations(quizResponses);
        setRecommendations(personalizedRecommendations);
      }
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const submitQuiz = () => {
    // In a real app, we would submit the data to the backend
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-tertiary via-primary to-secondary bg-clip-text text-transparent">Style Quiz</h1>
        <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
          Help us understand your child's personality and style preferences so we can curate the perfect box for them.
        </p>
        
        {currentStep < totalSteps && (
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              {Array.from({ length: totalSteps - 1 }).map((_, index) => (
                <React.Fragment key={index}>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentStep > index + 1 
                        ? 'bg-primary text-primary-foreground' 
                        : currentStep === index + 1 
                          ? 'bg-secondary text-secondary-foreground' 
                          : 'bg-kid-blue/20 text-gray-600'
                    }`}
                  >
                    {index + 1}
                  </div>
                  {index < totalSteps - 2 && (
                    <div 
                      className={`w-12 h-1 ${
                        currentStep > index + 1 ? 'bg-primary' : 'bg-kid-blue/20'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
        
        <div className={`${currentStep === totalSteps ? 'bg-white/50 backdrop-blur-sm' : 'bg-white'} rounded-lg shadow-lg p-6 md:p-8 max-w-4xl mx-auto border-2 border-kid-blue/20`}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold text-tertiary">Child's Details</h2>
              
              <div>
                <label htmlFor="childName" className="block text-sm font-medium mb-1 text-quaternary">
                  Child's Name
                </label>
                <Input 
                  id="childName" 
                  type="text" 
                  placeholder="Enter child's name"
                  value={quizResponses.childName || ''} 
                  onChange={(e) => handleInputChange('childName', e.target.value)}
                  className="border-kid-blue/30 focus-visible:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">Gender</label>
                <RadioGroup 
                  value={quizResponses.gender || 'girl'}
                  onValueChange={(value) => handleInputChange('gender', value as 'girl' | 'boy' | 'both')}
                >
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="girl" id="girl" className="text-secondary border-kid-pink" />
                      <Label htmlFor="girl">Girl</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="boy" id="boy" className="text-primary border-kid-blue" />
                      <Label htmlFor="boy">Boy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" className="text-tertiary border-kid-purple" />
                      <Label htmlFor="both">Gender Neutral</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1 text-quaternary">
                  Age
                </label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Enter child's age"
                  value={quizResponses.age || ''} 
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                  className="border-kid-blue/30 focus-visible:ring-primary"
                />
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium mb-1 text-quaternary">
                  Current Clothing Size
                </label>
                <Input 
                  id="size" 
                  type="text" 
                  placeholder="e.g. 4T, 5, 6X"
                  value={quizResponses.size || ''} 
                  onChange={(e) => handleInputChange('size', e.target.value)}
                  className="border-kid-blue/30 focus-visible:ring-primary"
                />
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold text-tertiary">Style Preferences</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">Which styles does your child prefer?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Casual', 'Sporty', 'Dressy', 'Trendy', 'Classic', 'Fun/Playful'].map((style) => (
                    <div key={style} className="flex items-center space-x-2 bg-gradient-to-r from-white to-kid-blue/10 p-3 rounded-lg border border-kid-blue/20 hover:border-kid-blue/50 transition-all">
                      <Checkbox 
                        id={style.toLowerCase()} 
                        checked={(quizResponses.stylePreferences || []).includes(style)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('stylePreferences', style, checked === true)
                        }
                        className="data-[state=checked]:bg-quaternary data-[state=checked]:text-quaternary-foreground"
                      />
                      <Label htmlFor={style.toLowerCase()} className="w-full cursor-pointer">{style}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">Color preferences</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Blues', 'Greens', 'Reds', 'Pinks', 'Purples', 'Yellows', 'Orange', 'Neutrals', 'Bright colors', 'Pastels'].map((color) => (
                    <div key={color} className="flex items-center space-x-2 bg-gradient-to-r from-white to-kid-green/10 p-3 rounded-lg border border-kid-green/20 hover:border-kid-green/50 transition-all">
                      <Checkbox 
                        id={color.toLowerCase().replace(' ', '-')}
                        checked={(quizResponses.colorPreferences || []).includes(color)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('colorPreferences', color, checked === true)
                        }
                        className="data-[state=checked]:bg-quinary data-[state=checked]:text-quinary-foreground"
                      />
                      <Label htmlFor={color.toLowerCase().replace(' ', '-')} className="w-full cursor-pointer">{color}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">Pattern preferences</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {['Solid colors', 'Stripes', 'Polka dots', 'Floral', 'Character prints', 'Animal prints'].map((pattern) => (
                    <div key={pattern} className="flex items-center space-x-2 bg-gradient-to-r from-white to-kid-pink/10 p-3 rounded-lg border border-kid-pink/20 hover:border-kid-pink/50 transition-all">
                      <Checkbox 
                        id={pattern.toLowerCase().replace(' ', '-')}
                        checked={(quizResponses.patternPreferences || []).includes(pattern)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('patternPreferences', pattern, checked === true)
                        }
                        className="data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground"
                      />
                      <Label htmlFor={pattern.toLowerCase().replace(' ', '-')} className="w-full cursor-pointer">{pattern}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold text-tertiary">Clothing Needs</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">Which items does your child need most?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['T-shirts', 'Shirts/Blouses', 'Pants/Jeans', 'Shorts', 'Dresses/Skirts', 'Pajamas', 'Outerwear', 'Active wear'].map((item) => (
                    <div key={item} className="flex items-center space-x-2 bg-gradient-to-r from-white to-kid-yellow/20 p-3 rounded-lg border border-kid-yellow/30 hover:border-kid-yellow/60 transition-all">
                      <Checkbox 
                        id={item.toLowerCase().replace('/', '-')}
                        checked={(quizResponses.clothingNeeds || []).includes(item)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('clothingNeeds', item, checked === true)
                        }
                        className="data-[state=checked]:bg-quinary data-[state=checked]:text-quinary-foreground"
                      />
                      <Label htmlFor={item.toLowerCase().replace('/', '-')} className="w-full cursor-pointer">{item}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">Are there any items you'd like us to avoid?</label>
                <Textarea 
                  placeholder="Please list any specific items or styles you don't want"
                  value={quizResponses.avoidItems || ''} 
                  onChange={(e) => handleInputChange('avoidItems', e.target.value)}
                  className="border-kid-purple/30 focus-visible:ring-tertiary"
                />
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold text-tertiary">Personality & Activities</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">How would you describe your child's personality?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Active/Energetic', 'Quiet/Calm', 'Adventurous', 'Creative', 'Playful', 'Shy', 'Outgoing', 'Independent'].map((trait) => (
                    <div key={trait} className="flex items-center space-x-2 bg-gradient-to-r from-white to-kid-purple/10 p-3 rounded-lg border border-kid-purple/20 hover:border-kid-purple/50 transition-all">
                      <Checkbox 
                        id={trait.toLowerCase().replace('/', '-')}
                        checked={(quizResponses.personality || []).includes(trait)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('personality', trait, checked === true)
                        }
                        className="data-[state=checked]:bg-tertiary data-[state=checked]:text-tertiary-foreground"
                      />
                      <Label htmlFor={trait.toLowerCase().replace('/', '-')} className="w-full cursor-pointer">{trait}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-quaternary">What activities does your child enjoy?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {['Sports', 'Dancing', 'Arts & Crafts', 'Reading', 'Music', 'Outdoor play', 'Video games', 'Swimming'].map((activity) => (
                    <div key={activity} className="flex items-center space-x-2 bg-gradient-to-r from-white to-kid-orange/10 p-3 rounded-lg border border-kid-orange/20 hover:border-kid-orange/50 transition-all">
                      <Checkbox 
                        id={activity.toLowerCase().replace(' & ', '-').replace(' ', '-')}
                        checked={(quizResponses.activities || []).includes(activity)}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('activities', activity, checked === true)
                        }
                        className="data-[state=checked]:bg-quaternary data-[state=checked]:text-quaternary-foreground"
                      />
                      <Label htmlFor={activity.toLowerCase().replace(' & ', '-').replace(' ', '-')} className="w-full cursor-pointer">{activity}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="interests" className="block text-sm font-medium mb-1 text-quaternary">
                  Any specific interests or favorite characters?
                </label>
                <Textarea 
                  id="interests" 
                  placeholder="Tell us about your child's favorite shows, characters, animals, etc."
                  value={quizResponses.interests || ''} 
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                  className="border-kid-purple/30 focus-visible:ring-tertiary"
                />
              </div>
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold text-tertiary">Additional Information</h2>
              
              <div>
                <label htmlFor="allergies" className="block text-sm font-medium mb-1 text-quaternary">
                  Does your child have any fabric allergies or sensitivities?
                </label>
                <Textarea 
                  id="allergies" 
                  placeholder="Please specify any materials we should avoid"
                  value={quizResponses.allergies || ''} 
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  className="border-kid-purple/30 focus-visible:ring-tertiary"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1 text-quaternary">
                  Any additional notes or special requests?
                </label>
                <Textarea 
                  id="notes" 
                  placeholder="Share anything else that would help us style your child's box perfectly"
                  value={quizResponses.notes || ''} 
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="border-kid-purple/30 focus-visible:ring-tertiary"
                />
              </div>
            </div>
          )}

          {currentStep === 6 && (
            <RecommendationResults recommendations={recommendations} />
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                className="border-kid-blue hover:bg-kid-blue/10"
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                onClick={nextStep}
                className="bg-gradient-to-r from-primary to-tertiary hover:opacity-90 kid-button"
              >
                {currentStep === totalSteps - 1 ? "See Recommendations" : "Next"}
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={submitQuiz}
                className="bg-gradient-to-r from-secondary to-quinary hover:opacity-90 kid-button"
              >
                Complete Quiz
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default StyleQuiz;
