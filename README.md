# SBA-2
The getLearnerData function processes the provided data and, theoretically, any additional data given via the provided objects and arrays into the format specified in the instructions. It uses the isItDue and submissionDue helper functions that use the provided arrays of assignments and submissions to create alternate arrays that do not contain assignments that aren't due yet and submissions for assignments that aren't due yet. These new arrays are then used in place of the provided arrays.

The submissionDue function also determines late submissions and, if it worked as intended, would deduct points accordingly. However, I realized late into the assignment that 10% of the maximum number of points are deducted from late submissions and not a flat 15 points, and I didn't have enough time to try to figure out how to get it to deduct 10% of the maximum. Additionally, it deducts points twice from late submissions, and I have been unable to figure out why.

The section of code that calculates each learner's average and converts scores into decimal values likely won't work as intended for assignments with IDs equal to or less than 0, or with assignments whose IDs are not equal to the assignment's index within the array + 1.

## Reflection
-What could you have done differently during the planning stages of your project to make the execution easier?
I started the assignment by making several functions, but over time it became exceedingly difficult to keep track of how each function would or could be used and I ultimately decided to use as few functions as I could manage.

-Were there any requirements that were difficult to implement? What do you think would make them easier to implement in future projects?
In general, I found the assignment much more complex than expected at almost every stage.

-What would you add to, or change about your application if given more time?
I would try to fix the point deduction for late submissions, both the 10% rather than flat deduction rate and the double deduction issue. I would also change how the maximum score for each assignment is determined when converting scores to decimals.

-Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:
I have been feeling exhausted for the past few days and it's been extremely difficult to focus on this assignment, leading to me losing track what my code does and needing to read it over several times over the course of the assignment. I likely would have done better on the assignment if not for this.
