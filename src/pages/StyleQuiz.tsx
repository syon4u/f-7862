
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const StyleQuiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => {
    if (currentStep < totalSteps) {
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
        <h1 className="font-league-spartan text-3xl md:text-4xl font-bold text-center mb-2">Style Quiz</h1>
        <p className="text-center text-muted-foreground mb-6 max-w-3xl mx-auto">
          Help us understand your child's personality and style preferences so we can curate the perfect box for them.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index + 1 
                      ? 'bg-primary text-white' 
                      : currentStep === index + 1 
                        ? 'bg-secondary text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div 
                    className={`w-12 h-1 ${
                      currentStep > index + 1 ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 max-w-4xl mx-auto">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold">Child's Details</h2>
              
              <div>
                <label htmlFor="childName" className="block text-sm font-medium mb-1">
                  Child's Name
                </label>
                <Input id="childName" type="text" placeholder="Enter child's name" />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <RadioGroup defaultValue="girl">
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="girl" id="girl" />
                      <Label htmlFor="girl">Girl</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="boy" id="boy" />
                      <Label htmlFor="boy">Boy</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="both" id="both" />
                      <Label htmlFor="both">Gender Neutral</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                  Age
                </label>
                <Input id="age" type="number" placeholder="Enter child's age" />
              </div>
              
              <div>
                <label htmlFor="size" className="block text-sm font-medium mb-1">
                  Current Clothing Size
                </label>
                <Input id="size" type="text" placeholder="e.g. 4T, 5, 6X" />
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold">Style Preferences</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Which styles does your child prefer?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Casual', 'Sporty', 'Dressy', 'Trendy', 'Classic', 'Fun/Playful'].map((style) => (
                    <div key={style} className="flex items-center space-x-2">
                      <Checkbox id={style.toLowerCase()} />
                      <Label htmlFor={style.toLowerCase()}>{style}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Color preferences</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Blues', 'Greens', 'Reds', 'Pinks', 'Purples', 'Yellows', 'Orange', 'Neutrals', 'Bright colors', 'Pastels'].map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox id={color.toLowerCase().replace(' ', '-')} />
                      <Label htmlFor={color.toLowerCase().replace(' ', '-')}>{color}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Pattern preferences</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Solid colors', 'Stripes', 'Polka dots', 'Floral', 'Character prints', 'Animal prints'].map((pattern) => (
                    <div key={pattern} className="flex items-center space-x-2">
                      <Checkbox id={pattern.toLowerCase().replace(' ', '-')} />
                      <Label htmlFor={pattern.toLowerCase().replace(' ', '-')}>{pattern}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold">Clothing Needs</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">Which items does your child need most?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['T-shirts', 'Shirts/Blouses', 'Pants/Jeans', 'Shorts', 'Dresses/Skirts', 'Pajamas', 'Outerwear', 'Active wear'].map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox id={item.toLowerCase().replace('/', '-')} />
                      <Label htmlFor={item.toLowerCase().replace('/', '-')}>{item}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Are there any items you'd like us to avoid?</label>
                <Textarea placeholder="Please list any specific items or styles you don't want" />
              </div>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold">Personality & Activities</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2">How would you describe your child's personality?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Active/Energetic', 'Quiet/Calm', 'Adventurous', 'Creative', 'Playful', 'Shy', 'Outgoing', 'Independent'].map((trait) => (
                    <div key={trait} className="flex items-center space-x-2">
                      <Checkbox id={trait.toLowerCase().replace('/', '-')} />
                      <Label htmlFor={trait.toLowerCase().replace('/', '-')}>{trait}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">What activities does your child enjoy?</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Sports', 'Dancing', 'Arts & Crafts', 'Reading', 'Music', 'Outdoor play', 'Video games', 'Swimming'].map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox id={activity.toLowerCase().replace(' & ', '-').replace(' ', '-')} />
                      <Label htmlFor={activity.toLowerCase().replace(' & ', '-').replace(' ', '-')}>{activity}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="interests" className="block text-sm font-medium mb-1">
                  Any specific interests or favorite characters?
                </label>
                <Textarea 
                  id="interests" 
                  placeholder="Tell us about your child's favorite shows, characters, animals, etc."
                />
              </div>
            </div>
          )}
          
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="font-league-spartan text-2xl font-bold">Additional Information</h2>
              
              <div>
                <label htmlFor="allergies" className="block text-sm font-medium mb-1">
                  Does your child have any fabric allergies or sensitivities?
                </label>
                <Textarea 
                  id="allergies" 
                  placeholder="Please specify any materials we should avoid"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium mb-1">
                  Any additional notes or special requests?
                </label>
                <Textarea 
                  id="notes" 
                  placeholder="Share anything else that would help us style your child's box perfectly"
                />
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < totalSteps ? (
              <Button 
                type="button" 
                className="bg-primary hover:bg-primary/90"
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="button" 
                className="bg-secondary hover:bg-secondary/90"
                onClick={submitQuiz}
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
