import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchActivePolls, votePoll, fetchPollResults } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/queryClient";

export function SustainabilityPoll() {
  const { data: polls, isLoading, error } = useQuery({
    queryKey: ['/api/polls/active'],
    queryFn: fetchActivePolls,
  });
  
  const [selectedPoll, setSelectedPoll] = useState<number | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  
  const { data: pollResults, isLoading: resultsLoading } = useQuery({
    queryKey: ['/api/polls/results', selectedPoll],
    queryFn: () => selectedPoll !== null ? fetchPollResults(selectedPoll) : Promise.resolve(null),
    enabled: selectedPoll !== null && hasVoted,
  });
  
  const voteMutation = useMutation({
    mutationFn: ({ pollId, optionIndex }: { pollId: number; optionIndex: number }) => 
      votePoll(pollId, optionIndex),
    onSuccess: () => {
      setHasVoted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/polls/results', selectedPoll] });
    },
  });

  if (isLoading) return <SustainabilityPollSkeleton />;

  if (error) {
    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle>Community Poll</CardTitle>
          <CardDescription>Hanoi Sustainability Initiative</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4">
            <p className="text-red-500 dark:text-red-400">
              Error loading poll data. Please try again later.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Select the first poll if available and not already selected
  if (polls && polls.length > 0 && selectedPoll === null) {
    setSelectedPoll(polls[0].id);
  }
  
  const activePoll = polls?.find(poll => poll.id === selectedPoll);
  
  const handleVote = () => {
    if (selectedPoll !== null && selectedOption !== null) {
      voteMutation.mutate({ pollId: selectedPoll, optionIndex: selectedOption });
    }
  };

  const resetVote = () => {
    setHasVoted(false);
    setSelectedOption(null);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center">
          <span className="material-icons text-purple-600 dark:text-purple-500 mr-2">how_to_vote</span>
          Community Poll
        </CardTitle>
        <CardDescription>Hanoi Sustainability Initiative</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        {activePoll ? (
          <div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
              {activePoll.question}
            </h3>
            
            {!hasVoted ? (
              <>
                <div className="space-y-3 mb-4">
                  {activePoll.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border-2 transition-colors cursor-pointer ${
                        selectedOption === index
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-800'
                      }`}
                      onClick={() => setSelectedOption(index)}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-3 ${
                          selectedOption === index
                            ? 'bg-primary-500'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}></div>
                        <span className="text-gray-700 dark:text-gray-300">{option}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button
                  className="w-full"
                  onClick={handleVote}
                  disabled={selectedOption === null || voteMutation.isPending}
                >
                  {voteMutation.isPending ? (
                    <span className="material-icons animate-spin mr-2">sync</span>
                  ) : null}
                  Submit Vote
                </Button>
              </>
            ) : (
              <>
                {resultsLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : pollResults ? (
                  <div className="space-y-3 mb-4">
                    {pollResults.options.map((option, index) => {
                      const percentage = pollResults.totalVotes > 0 
                        ? Math.round((pollResults.votes[index] / pollResults.totalVotes) * 100) 
                        : 0;
                      
                      return (
                        <div key={index} className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{option}</span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div
                              className="bg-primary-500 h-2.5 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">
                            {pollResults.votes[index]} votes
                          </div>
                        </div>
                      );
                    })}
                    
                    <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Total votes: {pollResults.totalVotes}
                    </div>
                  </div>
                ) : null}
                
                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={resetVote}
                >
                  Back to Poll
                </Button>
              </>
            )}
            
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/10 rounded-md text-sm text-gray-600 dark:text-gray-400">
              <span className="material-icons text-blue-500 dark:text-blue-400 text-base align-text-bottom mr-1">info</span>
              Your participation helps shape sustainability initiatives in Hanoi. New polls are posted weekly.
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p className="text-gray-600 dark:text-gray-400">
              No active polls at the moment. Please check back later.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SustainabilityPollSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 border-b">
        <CardTitle className="flex items-center">
          <Skeleton className="h-6 w-6 rounded-full mr-2" />
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-48" />
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Skeleton className="h-8 w-full mb-4" />
        
        <div className="space-y-3 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-12 w-full rounded-lg" />
          ))}
        </div>
        
        <Skeleton className="h-10 w-full mb-5" />
        
        <Skeleton className="h-16 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}