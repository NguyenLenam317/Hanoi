import { useState } from "react";
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent, Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Define the type for survey data
export interface UserSurveyData {
  healthConsiderations: {
    respiratorySensitivities: boolean;
    heatSensitivity: boolean;
    uvSensitivity: boolean;
  };
  outdoorActivities: {
    running: boolean;
    cycling: boolean;
    walking: boolean;
    gardening: boolean;
    parks: boolean;
    other: boolean;
    otherText: string;
  };
  activityTiming: string;
  location: string;
  alertPreferences: {
    airPollution: boolean;
    severeWeather: boolean;
    uvIndex: boolean;
  };
}

// Default survey data
const defaultSurveyData: UserSurveyData = {
  healthConsiderations: {
    respiratorySensitivities: false,
    heatSensitivity: false,
    uvSensitivity: false,
  },
  outdoorActivities: {
    running: false,
    cycling: false,
    walking: false,
    gardening: false,
    parks: false,
    other: false,
    otherText: "",
  },
  activityTiming: "variable",
  location: "",
  alertPreferences: {
    airPollution: false,
    severeWeather: false,
    uvIndex: false,
  }
};

interface UserSurveyModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: UserSurveyData) => void;
}

export function UserSurveyModal({ open, onClose, onSubmit }: UserSurveyModalProps) {
  const [step, setStep] = useState(0);
  const [surveyData, setSurveyData] = useState<UserSurveyData>(defaultSurveyData);
  
  const totalSteps = 4;
  
  const handleNext = () => {
    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = () => {
    // Save data and close modal
    onSubmit(surveyData);
    onClose();
  };
  
  const updateHealthConsiderations = (key: keyof UserSurveyData["healthConsiderations"], value: boolean) => {
    setSurveyData({
      ...surveyData,
      healthConsiderations: {
        ...surveyData.healthConsiderations,
        [key]: value
      }
    });
  };
  
  const updateOutdoorActivities = (key: keyof UserSurveyData["outdoorActivities"], value: any) => {
    setSurveyData({
      ...surveyData,
      outdoorActivities: {
        ...surveyData.outdoorActivities,
        [key]: value
      }
    });
  };
  
  const updateAlertPreferences = (key: keyof UserSurveyData["alertPreferences"], value: boolean) => {
    setSurveyData({
      ...surveyData,
      alertPreferences: {
        ...surveyData.alertPreferences,
        [key]: value
      }
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Personalize Your EcoSense Experience
          </DialogTitle>
          <DialogDescription>
            Help us tailor EcoSense to your specific needs and preferences. Your responses will be used to provide personalized recommendations and alerts.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {/* Progress indicator */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 mb-6 rounded-full">
            <div 
              className="bg-primary-500 h-2 rounded-full" 
              style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
            ></div>
          </div>
          
          {/* Step 1: Health Considerations */}
          {step === 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Health Considerations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select any that apply to you:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="respiratory" 
                    checked={surveyData.healthConsiderations.respiratorySensitivities}
                    onCheckedChange={(checked) => 
                      updateHealthConsiderations("respiratorySensitivities", checked as boolean)
                    }
                  />
                  <Label htmlFor="respiratory">I have respiratory sensitivities (e.g., asthma, allergies)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="heat" 
                    checked={surveyData.healthConsiderations.heatSensitivity}
                    onCheckedChange={(checked) => 
                      updateHealthConsiderations("heatSensitivity", checked as boolean)
                    }
                  />
                  <Label htmlFor="heat">I am particularly sensitive to heat</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="uv" 
                    checked={surveyData.healthConsiderations.uvSensitivity}
                    onCheckedChange={(checked) => 
                      updateHealthConsiderations("uvSensitivity", checked as boolean)
                    }
                  />
                  <Label htmlFor="uv">I am particularly sensitive to UV radiation/sunburn</Label>
                </div>
              </div>
            </div>
          )}
          
          {/* Step 2: Outdoor Activities */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preferred Outdoor Activities</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select all that apply:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="running" 
                    checked={surveyData.outdoorActivities.running}
                    onCheckedChange={(checked) => 
                      updateOutdoorActivities("running", checked as boolean)
                    }
                  />
                  <Label htmlFor="running">Running/Jogging</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cycling" 
                    checked={surveyData.outdoorActivities.cycling}
                    onCheckedChange={(checked) => 
                      updateOutdoorActivities("cycling", checked as boolean)
                    }
                  />
                  <Label htmlFor="cycling">Cycling</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="walking" 
                    checked={surveyData.outdoorActivities.walking}
                    onCheckedChange={(checked) => 
                      updateOutdoorActivities("walking", checked as boolean)
                    }
                  />
                  <Label htmlFor="walking">Walking/Hiking</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="gardening" 
                    checked={surveyData.outdoorActivities.gardening}
                    onCheckedChange={(checked) => 
                      updateOutdoorActivities("gardening", checked as boolean)
                    }
                  />
                  <Label htmlFor="gardening">Gardening</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="parks" 
                    checked={surveyData.outdoorActivities.parks}
                    onCheckedChange={(checked) => 
                      updateOutdoorActivities("parks", checked as boolean)
                    }
                  />
                  <Label htmlFor="parks">Spending time in parks/nature</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="other" 
                    checked={surveyData.outdoorActivities.other}
                    onCheckedChange={(checked) => {
                      updateOutdoorActivities("other", checked as boolean);
                      if (!checked) updateOutdoorActivities("otherText", "");
                    }}
                  />
                  <Label htmlFor="other">Other</Label>
                </div>
                
                {surveyData.outdoorActivities.other && (
                  <div className="pl-6">
                    <Input 
                      placeholder="Please specify" 
                      value={surveyData.outdoorActivities.otherText}
                      onChange={(e) => updateOutdoorActivities("otherText", e.target.value)}
                      className="max-w-xs"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Step 3: Activity Timing and Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Typical Activity Timing</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  At what time of day are you most likely to engage in outdoor activities?
                </p>
                
                <RadioGroup 
                  value={surveyData.activityTiming}
                  onValueChange={(value) => setSurveyData({...surveyData, activityTiming: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="morning" id="morning" />
                    <Label htmlFor="morning">Morning</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="afternoon" id="afternoon" />
                    <Label htmlFor="afternoon">Afternoon</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="evening" id="evening" />
                    <Label htmlFor="evening">Evening</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="variable" id="variable" />
                    <Label htmlFor="variable">Variable</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Location in Hanoi (Optional)</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Which district or area of Hanoi do you primarily reside in or visit frequently?
                </p>
                
                <Select 
                  value={surveyData.location}
                  onValueChange={(value) => setSurveyData({...surveyData, location: value})}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="not-specified">Prefer not to say</SelectItem>
                    <SelectItem value="ba-dinh">Ba Đình</SelectItem>
                    <SelectItem value="hoan-kiem">Hoàn Kiếm</SelectItem>
                    <SelectItem value="tay-ho">Tây Hồ</SelectItem>
                    <SelectItem value="long-bien">Long Biên</SelectItem>
                    <SelectItem value="cau-giay">Cầu Giấy</SelectItem>
                    <SelectItem value="dong-da">Đống Đa</SelectItem>
                    <SelectItem value="hai-ba-trung">Hai Bà Trưng</SelectItem>
                    <SelectItem value="hoang-mai">Hoàng Mai</SelectItem>
                    <SelectItem value="thanh-xuan">Thanh Xuân</SelectItem>
                    <SelectItem value="ha-dong">Hà Đông</SelectItem>
                    <SelectItem value="bac-tu-liem">Bắc Từ Liêm</SelectItem>
                    <SelectItem value="nam-tu-liem">Nam Từ Liêm</SelectItem>
                    <SelectItem value="other">Other area</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Step 4: Alert Preferences */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Alert Preferences</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Select the alerts you would like to receive:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="air-pollution" 
                    checked={surveyData.alertPreferences.airPollution}
                    onCheckedChange={(checked) => 
                      updateAlertPreferences("airPollution", checked as boolean)
                    }
                  />
                  <Label htmlFor="air-pollution">High air pollution alerts</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="severe-weather" 
                    checked={surveyData.alertPreferences.severeWeather}
                    onCheckedChange={(checked) => 
                      updateAlertPreferences("severeWeather", checked as boolean)
                    }
                  />
                  <Label htmlFor="severe-weather">Severe weather warnings (e.g., heavy rain, heat waves)</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="uv-index" 
                    checked={surveyData.alertPreferences.uvIndex}
                    onCheckedChange={(checked) => 
                      updateAlertPreferences("uvIndex", checked as boolean)
                    }
                  />
                  <Label htmlFor="uv-index">High UV index alerts</Label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <div className="order-2 sm:order-1">
            {step > 0 && (
              <Button variant="outline" onClick={handlePrevious} className="mt-2 sm:mt-0">
                Previous
              </Button>
            )}
          </div>
          <div className="order-1 sm:order-2">
            <Button onClick={handleNext} className="w-full sm:w-auto">
              {step < totalSteps - 1 ? 'Next' : 'Submit'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}