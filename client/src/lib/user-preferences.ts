import { UserSurveyData } from "@/components/survey/user-survey-modal";

const USER_PREFERENCES_KEY = "ecosense-user-preferences";
const SURVEY_COMPLETED_KEY = "ecosense-survey-completed";

/**
 * Save user survey data to local storage
 */
export function saveUserPreferences(data: UserSurveyData): void {
  localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(data));
  localStorage.setItem(SURVEY_COMPLETED_KEY, "true");
}

/**
 * Get user preferences from local storage
 */
export function getUserPreferences(): UserSurveyData | null {
  const data = localStorage.getItem(USER_PREFERENCES_KEY);
  if (!data) return null;
  
  try {
    return JSON.parse(data) as UserSurveyData;
  } catch (e) {
    console.error("Error parsing user preferences:", e);
    return null;
  }
}

/**
 * Check if the user has completed the survey
 */
export function hasSurveyCompleted(): boolean {
  return localStorage.getItem(SURVEY_COMPLETED_KEY) === "true";
}

/**
 * Reset survey completion status
 */
export function resetSurveyCompletion(): void {
  localStorage.removeItem(SURVEY_COMPLETED_KEY);
}

/**
 * Clear all user preferences
 */
export function clearUserPreferences(): void {
  localStorage.removeItem(USER_PREFERENCES_KEY);
  localStorage.removeItem(SURVEY_COMPLETED_KEY);
}

/**
 * Get user preferences as context for AI queries
 */
export function getUserPreferencesContext(): string {
  const prefs = getUserPreferences();
  if (!prefs) return "";
  
  const healthConditions = [];
  if (prefs.healthConsiderations.respiratorySensitivities) {
    healthConditions.push("respiratory sensitivities (asthma/allergies)");
  }
  if (prefs.healthConsiderations.heatSensitivity) {
    healthConditions.push("heat sensitivity");
  }
  if (prefs.healthConsiderations.uvSensitivity) {
    healthConditions.push("UV sensitivity");
  }
  
  const activities = [];
  if (prefs.outdoorActivities.running) activities.push("running/jogging");
  if (prefs.outdoorActivities.cycling) activities.push("cycling");
  if (prefs.outdoorActivities.walking) activities.push("walking/hiking");
  if (prefs.outdoorActivities.gardening) activities.push("gardening");
  if (prefs.outdoorActivities.parks) activities.push("visiting parks/nature");
  if (prefs.outdoorActivities.other && prefs.outdoorActivities.otherText) {
    activities.push(prefs.outdoorActivities.otherText);
  }
  
  const alertInterests = [];
  if (prefs.alertPreferences.airPollution) alertInterests.push("air pollution");
  if (prefs.alertPreferences.severeWeather) alertInterests.push("severe weather");
  if (prefs.alertPreferences.uvIndex) alertInterests.push("high UV index");
  
  // Build context string
  let context = "USER PREFERENCES:\n";
  
  if (healthConditions.length > 0) {
    context += `- Health considerations: ${healthConditions.join(", ")}\n`;
  }
  
  if (activities.length > 0) {
    context += `- Preferred activities: ${activities.join(", ")}\n`;
  }
  
  if (prefs.activityTiming && prefs.activityTiming !== "variable") {
    context += `- Typical activity time: ${prefs.activityTiming}\n`;
  }
  
  if (prefs.location && prefs.location !== "not-specified") {
    context += `- Location in Hanoi: ${prefs.location}\n`;
  }
  
  if (alertInterests.length > 0) {
    context += `- Alert interests: ${alertInterests.join(", ")}\n`;
  }
  
  return context;
}