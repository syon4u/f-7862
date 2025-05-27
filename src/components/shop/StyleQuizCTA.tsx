
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StyleQuizCTA: React.FC = () => {
  return (
    <div className="mt-16 bg-kid-gradient-3 p-8 rounded-xl shadow-sm">
      <div className="text-center space-y-4">
        <h2 className="font-league-spartan text-2xl font-bold">Not sure what to choose?</h2>
        <p className="text-muted-foreground">Take our style quiz to help find the perfect clothing for your child</p>
        <Button asChild size="lg" className="rounded-full bg-secondary hover:bg-secondary/90 shadow-md">
          <Link to="/style-quiz">Take the Style Quiz</Link>
        </Button>
      </div>
    </div>
  );
};

export default StyleQuizCTA;
