import { useState, useEffect, ReactNode } from "react";
import { UserSurveyModal, UserSurveyData } from "./user-survey-modal";
import { hasSurveyCompleted, saveUserPreferences } from "@/lib/user-preferences";

interface SurveyProviderProps {
  children: ReactNode;
}

export function SurveyProvider({ children }: SurveyProviderProps) {
  const [showSurvey, setShowSurvey] = useState(false);
  
  useEffect(() => {
    // Check if the user has already completed the survey
    if (!hasSurveyCompleted()) {
      // Show the survey after a short delay on the first visit
      const timer = setTimeout(() => {
        setShowSurvey(true);
      }, 1500); // 1.5 seconds delay
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleSurveyClose = () => {
    setShowSurvey(false);
  };
  
  const handleSurveySubmit = (data: UserSurveyData) => {
    // Save the user preferences
    saveUserPreferences(data);
    setShowSurvey(false);
  };
  
  return (
    <>
      {children}
      
      <UserSurveyModal
        open={showSurvey}
        onClose={handleSurveyClose}
        onSubmit={handleSurveySubmit}
      />
    </>
  );
}