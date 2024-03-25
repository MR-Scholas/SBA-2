// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
//  function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
//   console.log(result);

  // --------------------------------------------------------

  const isItDue=(ag)=>
  {
    let today="2024-03-24"
    today=today.split("-")
    today=today.join()
    let dueDate
    let dueAssignments={}
    dueAssignments.assignments=[]
    for(let i=0;i<ag.assignments.length;i++)
    {
        dueDate=ag.assignments[i].due_at.split("-")
        dueDate=dueDate.join()
        if(dueDate<today) {dueAssignments.assignments.push(ag.assignments[i])}
    }
    return dueAssignments;
  }

  console.log(isItDue(AssignmentGroup))

const submissionDue=(ag,submission)=>
{
    let submissionDate
    let assignmentDate
    let dueSubmissions=[]
    let today=20240323
    for(let i=0;i<ag.assignments.length;i++)
    {
        assignmentDate=ag.assignments[i].due_at.split("-")
        assignmentDate=assignmentDate.join()
        for(let j=0;j<submission.length;j++)
        {
            if(submission[j].assignment_id===ag.assignments[i].id)
            {
                submissionDate=submission[j].submission.submitted_at.split("-")
                submissionDate=submissionDate.join()
                if(assignmentDate<submissionDate) 
                {
                    dueSubmissions.push(submission[j])
                    dueSubmissions[dueSubmissions.length-1].submission.score-=15
                    dueSubmissions[dueSubmissions.length-1].isLate=true
                }
                else if (assignmentDate>=submissionDate)
                {
                    dueSubmissions.push(submission[j])
                    dueSubmissions[dueSubmissions.length-1].isLate=false
                }
            }
        }
    }
    return dueSubmissions;
}

console.log(submissionDue(AssignmentGroup,LearnerSubmissions))

function getLearnerData(course, ag, submission)
  {
    const result=[];
    let x=0;
    let y=0;
    let dueAssignment=isItDue(ag);
    let dueSubmission=submissionDue(dueAssignment,submission)
    let maxTotal=0;
    for(x=0;x<dueAssignment.assignments.length;x++)
    {
        maxTotal+=dueAssignment.assignments[x].points_possible
    }
    for(x=0;x<dueSubmission.length;x++)
    {
        let idExists=false;
        for (y = 0; y < result.length; y++) 
        {
            if (dueSubmission[x].learner_id === result[y].id) 
            {
                idExists = true;
                result[y][dueSubmission[x].assignment_id] = dueSubmission[x].submission.score;
                break;
            }
        }
        if (idExists==false) 
        {
            const newData = { id: dueSubmission[x].learner_id };
            newData[dueSubmission[x].assignment_id] = dueSubmission[x].submission.score;
            result.push(newData);
            result[result.length-1].id=dueSubmission[x].learner_id
            result[result.length-1][dueSubmission[x].assignment_id]=dueSubmission[x].submission.score
        }
        if(idExists==true)
        {
            result[y].id=dueSubmission[x].learner_id
            result[y][dueSubmission[x].assignment_id]=dueSubmission[x].submission.score
        }
    }

    for(x=0;x<result.length;x++)
    {
        let learnerTotal=0
        for(y=1;result[x][y]!==undefined;y++)
        {
            learnerTotal+=result[x][y]
            result[x][y]=result[x][y]/dueAssignment.assignments[y-1].points_possible
        }
        result[x].avg=learnerTotal/maxTotal
    }
    return result;
  } 

  console.log(getLearnerData(CourseInfo,AssignmentGroup,LearnerSubmissions))