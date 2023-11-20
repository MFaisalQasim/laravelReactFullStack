import { PlusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";

export default function SurveyQuestions({questions, onQuestionUpdate}) {

    const [surveyQuestions, setSurveyQuestions] = useState([...questions]);
    // document.getElementById("survey-question").innerHTML.reload
    const addQuestion = (index) => {
        index = index !== undefined? index : surveyQuestions.length
        surveyQuestions.splice(index,0,
            {
                id: uuidv4(),
                type: "text",
                question: '',
                description: '',
                data: {}
            })
        setSurveyQuestions([...surveyQuestions])
        onQuestionUpdate(surveyQuestions)
    }
    const changeQuestion = (question) => {
        if (!question) return;
        const newQuestions = surveyQuestions.map((q)=> {
            if (q.id == question.id) {
                return {...question};
            }
            return q;
        });
        setSurveyQuestions(newQuestions)
        onQuestionUpdate(newQuestions)
    }
    const deleteQuestion = (question) => {
        const newQuestions = surveyQuestions.filter((q) => q.id !== question.id);
        setSurveyQuestions(newQuestions)
        onQuestionUpdate(newQuestions)
    }
    useEffect(() => {
        setSurveyQuestions(surveyQuestions)
    },[surveyQuestions]);

  return (
    <>
    <div id='survey-question'>
    
        <div className="flex justify-between p-5" >
            <h3 className="text-2xl font-bold">Questions</h3>
            <button type="button"
                onClick={() => addQuestion()}
                className="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <PlusIcon className="w-4 mr-2"/>
                Add Question
            </button>
        </div>
            {
            surveyQuestions.length ?(
                surveyQuestions.map((q, ind) => (
                    <QuestionEditor
                        key={q.id}
                        index={ind}
                        question={q}
                        addQuestion={addQuestion}
                        changeQuestion={changeQuestion}
                        deleteQuestion={deleteQuestion}
                    />
                ))
            )
            :
            (
                <div className="text-gray-400 text-center py-4">You Have No Question Added</div>
            )
            }
     </div>
    </>
  )
}